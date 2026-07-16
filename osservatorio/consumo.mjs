// osservatorio/consumo.mjs — conta i token di TUTTE le chat di Claude Code sul PC.
//
// Legge i transcript in ~/.claude/projects/*/*.jsonl e genera in osservatorio/consumo/:
//   consumo.csv    dati grezzi: progetto × modello × mese
//   sessioni.csv   dati grezzi: UNA RIGA PER SESSIONE, con titolo/operazione (cercabile)
//   CONSUMO.md     report leggibile (progetti, operazioni, modelli, mesi, agenti)
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
const fileWorkflow = path.join(dirOut, 'workflow.csv');

if (!fs.existsSync(base)) { console.error('Cartella transcript non trovata:', base); process.exit(1); }
fs.mkdirSync(dirOut, { recursive: true });

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

const modelloCorto = m => {
  if (!m || m.startsWith('<')) return null; // '<synthetic>' = messaggi di sistema, senza costo
  return m.replace(/^claude-/, '').replace(/-\d{8}$/, '');
};
const pulisci = (s, max) => String(s).replace(/\s+/g, ' ').trim().slice(0, max);

// ---------- scansione ----------
const agg = new Map();        // progetto \x1f modello \x1f mese -> tokens
const perProgetto = new Map();// progetto -> {sessioni:Set, primo, ultimo}
const sessioni = [];          // una voce per file di sessione
const vistiMsg = new Set();   // dedup: lo stesso message.id ricompare su resume/fork

for (const d of dirs) {
  const dir = path.join(base, d);
  const { alias: nome, pubblico } = censura[d];
  let info = perProgetto.get(nome);
  if (!info) { info = { sessioni: new Set(), primo: null, ultimo: null }; perProgetto.set(nome, info); }

  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.jsonl'))) {
    let testo;
    try { testo = fs.readFileSync(path.join(dir, f), 'utf8'); } catch { continue; }
    const s = {
      prog: nome, pubblico, id: f.replace('.jsonl', '').slice(0, 8),
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
      if (o.sessionId) info.sessioni.add(o.sessionId);
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
      const k = [nome, mod, mese].join('\x1f');
      let r = agg.get(k);
      if (!r) { r = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0 }; agg.set(k, r); }
      const inTok = u.input_tokens || 0, outTok = u.output_tokens || 0;
      const cR = u.cache_read_input_tokens || 0, cW = u.cache_creation_input_tokens || 0;
      r.msg++; r.input += inTok; r.output += outTok; r.cacheR += cR; r.cacheW += cW;
      s.msg++; s.input += inTok; s.output += outTok; s.cacheR += cR; s.cacheW += cW;
      s.modelli.set(mod, (s.modelli.get(mod) || 0) + outTok);
      if (ts) {
        if (!info.primo || ts < info.primo) info.primo = ts;
        if (!info.ultimo || ts > info.ultimo) info.ultimo = ts;
      }
    }
    if (s.msg > 0) sessioni.push(s);
  }
}

// descrizione di una sessione: titolo dato dall'utente > titolo AI > prima richiesta
const descrizione = s => {
  if (!s.pubblico) return '(censurato)';
  return s.titolo || s.aiTitolo || s.primoTesto || '(senza titolo)';
};
const modelliDi = s => {
  const ord = [...s.modelli.entries()].sort((a, b) => b[1] - a[1]).map(x => x[0]);
  return ord.length <= 2 ? ord.join(' + ') : `${ord[0]} +${ord.length - 1}`;
};

// ---------- CSV: progetto × modello × mese ----------
const righe = [...agg.entries()].map(([k, r]) => {
  const [prog, mod, mese] = k.split('\x1f');
  return { prog, mod, mese, ...r };
}).sort((a, b) => a.prog.localeCompare(b.prog) || a.mese.localeCompare(b.mese) || a.mod.localeCompare(b.mod));

fs.writeFileSync(path.join(dirOut, 'consumo.csv'),
  ['progetto,modello,mese,messaggi,token_input,token_output,cache_letta,cache_scritta']
    .concat(righe.map(r => [r.prog, r.mod, r.mese, r.msg, r.input, r.output, r.cacheR, r.cacheW].join(',')))
    .join('\n') + '\n');

// ---------- CSV: sessioni (operazioni, cercabile) ----------
const csvq = s => `"${String(s).replace(/"/g, '""')}"`;
sessioni.sort((a, b) => a.prog.localeCompare(b.prog) || String(a.primo).localeCompare(String(b.primo)));
fs.writeFileSync(path.join(dirOut, 'sessioni.csv'),
  ['progetto,sessione,inizio,fine,operazione,modelli,messaggi,token_input,token_output,cache_letta,cache_scritta']
    .concat(sessioni.map(s => [csvq(s.prog), s.id, s.primo, s.ultimo, csvq(descrizione(s)), csvq(modelliDi(s)), s.msg, s.input, s.output, s.cacheR, s.cacheW].join(',')))
    .join('\n') + '\n');

// ---------- workflow.csv (agenti cloud, tenuto a mano) ----------
let workflow = [];
if (fs.existsSync(fileWorkflow)) {
  const [testa, ...corpo] = fs.readFileSync(fileWorkflow, 'utf8').trim().split('\n');
  workflow = corpo.map(l => {
    // parsing CSV semplice con campi quotati
    const campi = l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map(c => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
    return { data: campi[0], prog: campi[1], operazione: campi[2], agenti: campi[3], token: +campi[4] || 0, fonte: campi[5] };
  });
}

// ---------- report MD ----------
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
const tot = sel => {
  const t = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0 };
  for (const r of righe) if (sel(r)) { t.msg += r.msg; t.input += r.input; t.output += r.output; t.cacheR += r.cacheR; t.cacheW += r.cacheW; }
  return t;
};
const mdEsc = s => String(s).replace(/\|/g, '\\|');

const progetti = [...new Set(righe.map(r => r.prog))]
  .map(p => ({ p, t: tot(r => r.prog === p), info: perProgetto.get(p) }))
  .sort((a, b) => (b.t.input + b.t.output) - (a.t.input + a.t.output));
const modelli = [...new Set(righe.map(r => r.mod))].map(m => ({ m, t: tot(r => r.mod === m) }))
  .sort((a, b) => b.t.output - a.t.output);
const mesi = [...new Set(righe.map(r => r.mese))].sort().map(m => ({ m, t: tot(r => r.mese === m) }));
const T = tot(() => true);

// sessioni nel MD: le significative (output >= 5k) per esteso, le altre sommate per progetto
const SOGLIA = 5000;
const grandi = sessioni.filter(s => s.output >= SOGLIA);
const piccolePer = new Map();
for (const s of sessioni.filter(s => s.output < SOGLIA)) {
  let r = piccolePer.get(s.prog);
  if (!r) { r = { n: 0, msg: 0, input: 0, output: 0, cacheR: 0 }; piccolePer.set(s.prog, r); }
  r.n++; r.msg += s.msg; r.input += s.input; r.output += s.output; r.cacheR += s.cacheR;
}
const ordineProg = new Map(progetti.map(({ p }, i) => [p, i]));
grandi.sort((a, b) => (ordineProg.get(a.prog) - ordineProg.get(b.prog)) || String(a.primo).localeCompare(String(b.primo)));

let righeSess = [];
let ultimoProg = null;
for (const s of grandi) {
  if (s.prog !== ultimoProg && ultimoProg !== null) righeSess.push('| | | | | | | | |');
  ultimoProg = s.prog;
  righeSess.push(`| ${mdEsc(s.prog)} | ${s.primo}${s.ultimo !== s.primo ? '→' + s.ultimo.slice(5) : ''} | ${mdEsc(descrizione(s))} | ${modelliDi(s)} | ${fmt(s.msg)} | ${fmt(s.input)} | ${fmt(s.output)} | ${fmt(s.cacheR)} |`);
}
const righePiccole = [...piccolePer.entries()]
  .sort((a, b) => (ordineProg.get(a[0]) ?? 99) - (ordineProg.get(b[0]) ?? 99))
  .map(([p, r]) => `| ${mdEsc(p)} | — | *(${r.n} sessioni minori sommate)* | — | ${fmt(r.msg)} | ${fmt(r.input)} | ${fmt(r.output)} | ${fmt(r.cacheR)} |`);

const totW = workflow.reduce((a, w) => a + w.token, 0);

let md = `# CONSUMO — token di tutte le chat Claude Code (generato)

> Generato da \`osservatorio/consumo.mjs\` il ${new Date().toISOString().slice(0, 10)}.
> **Non modificare a mano**: rilanciare lo script per aggiornare.
> Progetti riservati censurati (legenda solo locale, mai su GitHub).
> Nota lettura: *input/output* = token "vivi" pagati pieni; *cache letta* = contesto riletto
> (costa ~1/10 dell'input). I dati grezzi sono in \`consumo.csv\` (progetto × modello × mese)
> e \`sessioni.csv\` (una riga per sessione, col titolo dell'operazione: **cercabile**).

## Totale assoluto (chat locali)
| Messaggi | Input | Output | Cache letta | Cache scritta |
|---|---|---|---|---|
| ${fmt(T.msg)} | ${fmt(T.input)} | ${fmt(T.output)} | ${fmt(T.cacheR)} | ${fmt(T.cacheW)} |

## Per progetto (ordinati per token vivi)
| Progetto | Periodo | Sessioni | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|
${progetti.map(({ p, t, info }) => `| ${mdEsc(p)} | ${info?.primo || '?'} → ${info?.ultimo || '?'} | ${info?.sessioni.size || '?'} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}

## Per operazione (una riga per sessione — il titolo dice cosa si è fatto)
Le sessioni con meno di ${fmt(SOGLIA)} token di output sono sommate in fondo al progetto.
Per cercare (es. "react native", "audit", "Feature_6"): Ctrl+F qui o grep su \`sessioni.csv\`.

| Progetto | Periodo | Operazione | Modelli | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|---|
${righeSess.join('\n')}
${righePiccole.join('\n')}

## Lavoro degli agenti (workflow cloud — tenuto a mano)
I workflow multi-agente girano nel cloud e **non lasciano transcript sul PC**: questi numeri
vengono dai METRICHE/report dei progetti. **Dopo ogni nuovo workflow, aggiungere una riga a
\`consumo/workflow.csv\`** (il rituale dell'osservatorio lo ricorda).

| Data | Progetto | Operazione | Agenti | Token agenti | Fonte |
|---|---|---|---|---|---|
${workflow.map(w => `| ${w.data} | ${mdEsc(w.prog)} | ${mdEsc(w.operazione)} | ${w.agenti} | ${fmt(w.token)} | ${mdEsc(w.fonte)} |`).join('\n') || '| — | — | *(nessun workflow registrato)* | — | — | — |'}

**Totale agenti cloud: ${fmt(totW)}** (da sommare a parte rispetto alle chat locali).

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

console.log(`OK: ${dirs.length} progetti, ${sessioni.length} sessioni, ${vistiMsg.size} messaggi unici.`);
console.log('Scritti in osservatorio/consumo/: CONSUMO.md, consumo.csv, sessioni.csv');
console.log('Legenda censura (LOCALE, non committare):', fileCensura);
