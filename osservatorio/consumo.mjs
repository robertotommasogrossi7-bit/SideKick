// osservatorio/consumo.mjs — conta i token di TUTTE le chat di Claude Code sul PC.
//
// Legge i transcript in ~/.claude/projects/*/*.jsonl e genera in osservatorio/consumo/:
//   CONSUMO.md          il CRUSCOTTO: recap, top costi, lezioni, un link per progetto
//   per-progetto/*.md   un file per progetto: tutte le sue sessioni con titolo
//   consumo.csv         dati grezzi: progetto × modello × mese
//   sessioni.csv        dati grezzi: una riga per sessione (cercabile)
//
// LEZIONI.md (nella stessa cartella) è CURATO A MANO dall'osservatorio: il cruscotto lo
// incorpora in testa. Lo script non lo tocca mai.
//
// CENSURA: i progetti con "pubblico": false in osservatorio/censura.local.json escono
// con l'alias e senza titoli. Quel file è SOLO locale (gitignorato, mai su GitHub).
//
// AGENTI/WORKFLOW CLOUD: non lasciano transcript sul PC. I loro numeri si tengono a mano
// in consumo/workflow.csv (una riga per workflow); lo script li rende nel report.
//
// Uso: node osservatorio/consumo.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const qui = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'projects');
const fileCensura = path.join(qui, 'censura.local.json');
const dirOut = path.join(qui, 'consumo');
const dirProg = path.join(dirOut, 'per-progetto');
const fileWorkflow = path.join(dirOut, 'workflow.csv');
const fileLezioni = path.join(dirOut, 'LEZIONI.md');

if (!fs.existsSync(base)) { console.error('Cartella transcript non trovata:', base); process.exit(1); }
fs.rmSync(dirProg, { recursive: true, force: true });
fs.mkdirSync(dirProg, { recursive: true });

// ---------- censura ----------
let censura = {};
if (fs.existsSync(fileCensura)) censura = JSON.parse(fs.readFileSync(fileCensura, 'utf8'));
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());
let prossimo = Object.values(censura).filter(v => /^progetto-\d+$/.test(v.alias)).length + 1;
for (const d of dirs) {
  if (!censura[d]) {
    // i progetti NUOVI nascono censurati: si scopre il nome mettendo "pubblico": true nel file locale
    censura[d] = { alias: `progetto-${String(prossimo++).padStart(2, '0')}`, pubblico: false };
  }
}
fs.writeFileSync(fileCensura, JSON.stringify(censura, null, 2));

// le chat dello stesso progetto si mettono INSIEME (worktree col progetto madre, test in un gruppo)
const gruppoDi = alias => {
  if (/^esperimento /.test(alias)) return 'esperimenti (test del metodo)';
  if (alias === 'poker (worktree)') return "poker (Who's the Boss)";
  if (alias === 'weather-report (worktree)') return 'weather-report';
  return alias;
};

const modelloCorto = m => {
  if (!m || m.startsWith('<')) return null; // '<synthetic>' = messaggi di sistema, senza costo
  return m.replace(/^claude-/, '').replace(/-\d{8}$/, '');
};
const pulisci = (s, max) => String(s).replace(/\s+/g, ' ').trim().slice(0, max);
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
const mdEsc = s => String(s).replace(/\|/g, '\\|');

// ---------- scansione ----------
const agg = new Map();      // alias \x1f modello \x1f mese -> tokens (per il CSV)
const sessioni = [];        // una voce per file di sessione
const vistiMsg = new Set(); // dedup: lo stesso message.id ricompare su resume/fork

for (const d of dirs) {
  const dir = path.join(base, d);
  const { alias, pubblico } = censura[d];
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.jsonl'))) {
    let testo;
    try { testo = fs.readFileSync(path.join(dir, f), 'utf8'); } catch { continue; }
    const s = {
      alias, gruppo: gruppoDi(alias), pubblico, id: f.replace('.jsonl', '').slice(0, 8),
      titolo: null, aiTitolo: null, primoTesto: null,
      primo: null, ultimo: null, msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0,
      modelli: new Map(), // modello -> output
    };
    for (const ln of testo.split('\n')) {
      if (!ln) continue;
      let o; try { o = JSON.parse(ln); } catch { continue; }
      if (o.type === 'custom-title' && o.customTitle) { s.titolo = o.customTitle; continue; }
      if (o.type === 'ai-title' && o.aiTitle) { s.aiTitolo = o.aiTitle; continue; }
      const ts = o.timestamp ? o.timestamp.slice(0, 10) : null;
      if (ts) {
        if (!s.primo || ts < s.primo) s.primo = ts;
        if (!s.ultimo || ts > s.ultimo) s.ultimo = ts;
      }
      if (o.type === 'user' && !o.isSidechain && !s.primoTesto) {
        const c = (o.message || {}).content;
        let t = typeof c === 'string' ? c : Array.isArray(c) ? (c.find(x => x.type === 'text') || {}).text : null;
        if (t && !t.startsWith('<') && !t.startsWith('Caveat:')) s.primoTesto = pulisci(t, 90);
        continue;
      }
      if (o.type !== 'assistant') continue;
      const msg = o.message || {};
      const u = msg.usage;
      const mod = modelloCorto(msg.model);
      if (!u || !mod) continue;
      const id = msg.id || o.uuid;
      if (id) { if (vistiMsg.has(id)) continue; vistiMsg.add(id); }
      const mese = o.timestamp ? o.timestamp.slice(0, 7) : 'sconosciuto';
      const k = [alias, mod, mese].join('\x1f');
      let r = agg.get(k);
      if (!r) { r = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0 }; agg.set(k, r); }
      const inTok = u.input_tokens || 0, outTok = u.output_tokens || 0;
      const cR = u.cache_read_input_tokens || 0, cW = u.cache_creation_input_tokens || 0;
      r.msg++; r.input += inTok; r.output += outTok; r.cacheR += cR; r.cacheW += cW;
      s.msg++; s.input += inTok; s.output += outTok; s.cacheR += cR; s.cacheW += cW;
      s.modelli.set(mod, (s.modelli.get(mod) || 0) + outTok);
    }
    if (s.msg > 0) sessioni.push(s);
  }
}

const descrizione = s => {
  if (!s.pubblico) return '(censurato)';
  return s.titolo || s.aiTitolo || s.primoTesto || '(senza titolo)';
};
const modelliDi = s => {
  const ord = [...s.modelli.entries()].sort((a, b) => b[1] - a[1]).map(x => x[0]);
  return ord.length <= 2 ? ord.join(' + ') : `${ord[0]} +${ord.length - 1}`;
};

// ---------- CSV grezzi (granularità alias, NON gruppo) ----------
const righe = [...agg.entries()].map(([k, r]) => {
  const [prog, mod, mese] = k.split('\x1f');
  return { prog, mod, mese, ...r };
}).sort((a, b) => a.prog.localeCompare(b.prog) || a.mese.localeCompare(b.mese) || a.mod.localeCompare(b.mod));

fs.writeFileSync(path.join(dirOut, 'consumo.csv'),
  ['progetto,modello,mese,messaggi,token_input,token_output,cache_letta,cache_scritta']
    .concat(righe.map(r => [r.prog, r.mod, r.mese, r.msg, r.input, r.output, r.cacheR, r.cacheW].join(',')))
    .join('\n') + '\n');

const csvq = s => `"${String(s).replace(/"/g, '""')}"`;
sessioni.sort((a, b) => a.gruppo.localeCompare(b.gruppo) || String(a.primo).localeCompare(String(b.primo)));
fs.writeFileSync(path.join(dirOut, 'sessioni.csv'),
  ['gruppo,progetto,sessione,inizio,fine,operazione,modelli,messaggi,token_input,token_output,cache_letta,cache_scritta']
    .concat(sessioni.map(s => [csvq(s.gruppo), csvq(s.alias), s.id, s.primo, s.ultimo, csvq(descrizione(s)), csvq(modelliDi(s)), s.msg, s.input, s.output, s.cacheR, s.cacheW].join(',')))
    .join('\n') + '\n');

// ---------- workflow.csv (agenti cloud, tenuto a mano) ----------
let workflow = [];
if (fs.existsSync(fileWorkflow)) {
  const [, ...corpo] = fs.readFileSync(fileWorkflow, 'utf8').trim().split('\n');
  workflow = corpo.map(l => {
    const campi = l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map(c => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
    return { data: campi[0], prog: campi[1], operazione: campi[2], agenti: campi[3], token: +campi[4] || 0, fonte: campi[5] };
  });
}
const totW = workflow.reduce((a, w) => a + w.token, 0);

// ---------- aggregati per GRUPPO (il cruscotto ragiona per progetto vero) ----------
const gruppi = new Map(); // gruppo -> {sess:[], t:{...}, primo, ultimo}
for (const s of sessioni) {
  let g = gruppi.get(s.gruppo);
  if (!g) { g = { sess: [], msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, primo: null, ultimo: null, pubblico: s.pubblico }; gruppi.set(s.gruppo, g); }
  g.sess.push(s);
  g.msg += s.msg; g.input += s.input; g.output += s.output; g.cacheR += s.cacheR; g.cacheW += s.cacheW;
  if (!g.primo || (s.primo && s.primo < g.primo)) g.primo = s.primo;
  if (!g.ultimo || (s.ultimo && s.ultimo > g.ultimo)) g.ultimo = s.ultimo;
}
const ordGruppi = [...gruppi.entries()].sort((a, b) => (b[1].input + b[1].output) - (a[1].input + a[1].output));

// ---------- file per progetto ----------
const rigaSess = s => `| ${s.primo}${s.ultimo !== s.primo ? '→' + String(s.ultimo).slice(5) : ''} | ${mdEsc(descrizione(s))}${s.alias !== s.gruppo ? ` *(${mdEsc(s.alias)})*` : ''} | ${modelliDi(s)} | ${fmt(s.msg)} | ${fmt(s.input)} | ${fmt(s.output)} | ${fmt(s.cacheR)} |`;

for (const [nome, g] of ordGruppi) {
  const wf = workflow.filter(w => gruppoDi(w.prog) === nome);
  const sess = [...g.sess].sort((a, b) => String(a.primo).localeCompare(String(b.primo)));
  const testo = `# ${nome} — consumo token (generato)

> Torna al cruscotto: [\`../CONSUMO.md\`](../CONSUMO.md). Non modificare a mano.

**${g.sess.length} sessioni** dal ${g.primo} al ${g.ultimo} · **${fmt(g.output)} output** ·
${fmt(g.input)} input · ${fmt(g.cacheR)} cache letta · ${fmt(g.msg)} messaggi${wf.length ? ` · **+${fmt(wf.reduce((a, w) => a + w.token, 0))} di agenti cloud** (${wf.length} workflow)` : ''}

## Le sessioni (in ordine di tempo — il titolo dice cosa si è fatto)
| Periodo | Operazione | Modelli | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|
${sess.map(rigaSess).join('\n')}
${wf.length ? `
## Workflow di agenti cloud su questo progetto
| Data | Operazione | Agenti | Token agenti | Fonte |
|---|---|---|---|---|
${wf.map(w => `| ${w.data} | ${mdEsc(w.operazione)} | ${w.agenti} | ${fmt(w.token)} | ${mdEsc(w.fonte)} |`).join('\n')}
` : ''}`;
  fs.writeFileSync(path.join(dirProg, slug(nome) + '.md'), testo);
}

// ---------- cruscotto ----------
const T = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0 };
for (const [, g] of ordGruppi) { T.msg += g.msg; T.input += g.input; T.output += g.output; T.cacheR += g.cacheR; T.cacheW += g.cacheW; }

const totPer = sel => {
  const t = { msg: 0, input: 0, output: 0, cacheR: 0 };
  for (const r of righe) if (sel(r)) { t.msg += r.msg; t.input += r.input; t.output += r.output; t.cacheR += r.cacheR; }
  return t;
};
const modelli = [...new Set(righe.map(r => r.mod))].map(m => ({ m, t: totPer(r => r.mod === m) })).sort((a, b) => b.t.output - a.t.output);
const mesi = [...new Set(righe.map(r => r.mese))].sort().map(m => ({ m, t: totPer(r => r.mese === m) }));

// top costi: sessioni + workflow insieme, per token di output/agenti
const top = [
  ...sessioni.map(s => ({ tipo: 'chat', nome: `${descrizione(s)} — ${s.gruppo}`, quando: s.primo, tok: s.output })),
  ...workflow.map(w => ({ tipo: 'agenti cloud', nome: `${w.operazione} — ${gruppoDi(w.prog)}`, quando: w.data, tok: w.token })),
].sort((a, b) => b.tok - a.tok).slice(0, 8);

const lezioni = fs.existsSync(fileLezioni)
  ? fs.readFileSync(fileLezioni, 'utf8').replace(/^# .*\n/, '').trim()
  : '*(scrivere `LEZIONI.md` in questa cartella: il cruscotto lo incorpora qui)*';

const md = `# CONSUMO — cruscotto token (generato)

> Generato da \`osservatorio/consumo.mjs\` il ${new Date().toISOString().slice(0, 10)}. **Non modificare a
> mano** (tranne \`LEZIONI.md\`, che è curato dall'osservatorio e viene incorporato qui sotto).
> Il dettaglio di ogni progetto è in \`per-progetto/\` (un file a progetto, tabella per sessione).
> Dati grezzi: \`consumo.csv\` · \`sessioni.csv\` (cercabile: grep "react", "audit", "Feature_6"…).
> Progetti riservati censurati (legenda solo locale). *Output* = token generati (i più pesanti);
> *input* = token letti pieni; *cache letta* = contesto riletto (~1/10 dell'input).

## In breve
- **${fmt(T.output)} token di output** (+ **${fmt(totW)}** di agenti cloud) in **${sessioni.length} sessioni**
  su **${ordGruppi.length} progetti**, da ${mesi[0]?.m || '?'} a oggi. ${fmt(T.msg)} messaggi totali.
- La **cache** ha riletto ${fmt(T.cacheR)} token (≈${Math.round(T.cacheR / (T.input + T.output))}× i token vivi): riprendere una
  chat con la cache calda è ciò che rende sostenibile il piano — ricominciare da zero la butta.

## Le cose che sono costate di più
| # | Cosa | Tipo | Quando | Token |
|---|---|---|---|---|
${top.map((t, i) => `| ${i + 1} | ${mdEsc(t.nome)} | ${t.tipo} | ${t.quando} | ${fmt(t.tok)} |`).join('\n')}

## Cosa abbiamo imparato sul costo (e ridotto davvero)
${lezioni}

## Per progetto (clicca per il dettaglio delle sessioni)
| Progetto | Periodo | Sessioni | Output | Input | Cache letta |
|---|---|---|---|---|---|
${ordGruppi.map(([nome, g]) => `| [${mdEsc(nome)}](per-progetto/${slug(nome)}.md) | ${g.primo} → ${g.ultimo} | ${g.sess.length} | ${fmt(g.output)} | ${fmt(g.input)} | ${fmt(g.cacheR)} |`).join('\n')}

## Lavoro degli agenti (workflow cloud — registro a mano)
I workflow multi-agente girano nel cloud e **non lasciano transcript sul PC**: questi numeri
vengono dai METRICHE/report dei progetti. **Dopo ogni nuovo workflow, aggiungere una riga a
\`workflow.csv\`** (il rituale dell'osservatorio lo ricorda).

| Data | Progetto | Operazione | Agenti | Token agenti |
|---|---|---|---|---|
${workflow.map(w => `| ${w.data} | ${mdEsc(gruppoDi(w.prog))} | ${mdEsc(w.operazione)} | ${w.agenti} | ${fmt(w.token)} |`).join('\n') || '| — | — | *(nessuno registrato)* | — | — |'}

## Per modello (solo chat locali)
| Modello | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
${modelli.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}

## Per mese
| Mese | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
${mesi.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}
`;
fs.writeFileSync(path.join(dirOut, 'CONSUMO.md'), md);

console.log(`OK: ${dirs.length} cartelle, ${ordGruppi.length} progetti, ${sessioni.length} sessioni, ${vistiMsg.size} messaggi unici.`);
console.log('Scritti: CONSUMO.md (cruscotto), per-progetto/ (' + ordGruppi.length + ' file), consumo.csv, sessioni.csv');
console.log('Legenda censura (LOCALE, non committare):', fileCensura);
