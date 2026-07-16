// osservatorio/consumo.mjs — conta i token di TUTTE le chat di Claude Code sul PC.
//
// Legge i transcript in ~/.claude/projects/*/*.jsonl e genera:
//   osservatorio/consumo/consumo.csv   (dati grezzi: progetto × modello × mese)
//   osservatorio/consumo/CONSUMO.md    (report leggibile, nomi censurati)
//
// CENSURA: i progetti NON pubblici escono con un alias (progetto-01, ...).
// La legenda vera sta SOLO in osservatorio/censura.local.json (gitignorato, mai su GitHub).
// Al primo giro il file viene creato da solo; per rendere pubblico un progetto,
// aprire il file e mettere "pubblico": true su quella riga.
//
// Uso: node osservatorio/consumo.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const qui = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'projects');
const fileCensura = path.join(qui, 'censura.local.json');
const dirOut = path.join(qui, 'consumo');

if (!fs.existsSync(base)) { console.error('Cartella transcript non trovata:', base); process.exit(1); }
fs.mkdirSync(dirOut, { recursive: true });

// ---------- censura: alias stabili per i progetti privati ----------
let censura = {};
if (fs.existsSync(fileCensura)) censura = JSON.parse(fs.readFileSync(fileCensura, 'utf8'));
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());
let prossimo = Object.values(censura).filter(v => /^progetto-\d+$/.test(v.alias)).length + 1;
for (const d of dirs) {
  if (!censura[d]) {
    const pubblico = /sidekick/i.test(d);
    censura[d] = {
      alias: pubblico ? d.split('-').pop() : `progetto-${String(prossimo++).padStart(2, '0')}`,
      pubblico,
    };
  }
}
fs.writeFileSync(fileCensura, JSON.stringify(censura, null, 2));

const nomePubblico = d => {
  const c = censura[d];
  if (c.pubblico) return c.alias;
  return c.alias; // alias già censurato
};

// ---------- modello: nome corto ----------
const modelloCorto = m => {
  if (!m || m.startsWith('<')) return null; // '<synthetic>' = messaggi di sistema, senza costo
  return m.replace(/^claude-/, '').replace(/-\d{8}$/, '');
};

// ---------- scansione ----------
// chiave aggregato: progetto \x1f modello \x1f mese
const agg = new Map();
const perProgetto = new Map(); // progetto -> {sessioni:Set, primo, ultimo, righeUtente}
const vistiMsg = new Set();    // dedup: lo stesso message.id può ricomparire su resume/fork

const somma = (k, u, sidechain) => {
  let r = agg.get(k);
  if (!r) { r = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, outAgenti: 0 }; agg.set(k, r); }
  r.msg++;
  r.input += u.input_tokens || 0;
  r.output += u.output_tokens || 0;
  r.cacheR += u.cache_read_input_tokens || 0;
  r.cacheW += u.cache_creation_input_tokens || 0;
  if (sidechain) r.outAgenti += u.output_tokens || 0;
};

for (const d of dirs) {
  const dir = path.join(base, d);
  const nome = nomePubblico(d);
  let info = perProgetto.get(nome);
  if (!info) { info = { sessioni: new Set(), primo: null, ultimo: null, utente: 0 }; perProgetto.set(nome, info); }
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.jsonl'))) {
    let testo;
    try { testo = fs.readFileSync(path.join(dir, f), 'utf8'); } catch { continue; }
    for (const ln of testo.split('\n')) {
      if (!ln) continue;
      let o; try { o = JSON.parse(ln); } catch { continue; }
      const ts = o.timestamp ? o.timestamp.slice(0, 10) : null;
      if (ts) {
        if (!info.primo || ts < info.primo) info.primo = ts;
        if (!info.ultimo || ts > info.ultimo) info.ultimo = ts;
      }
      if (o.sessionId) info.sessioni.add(o.sessionId);
      if (o.type === 'user' && !o.isSidechain) { info.utente++; continue; }
      if (o.type !== 'assistant') continue;
      const msg = o.message || {};
      const u = msg.usage;
      const mod = modelloCorto(msg.model);
      if (!u || !mod) continue;
      const id = msg.id || o.uuid;
      if (id) { if (vistiMsg.has(id)) continue; vistiMsg.add(id); }
      const mese = o.timestamp ? o.timestamp.slice(0, 7) : 'sconosciuto';
      somma([nome, mod, mese].join('\x1f'), u, !!o.isSidechain);
    }
  }
}

// ---------- CSV ----------
const righe = [...agg.entries()].map(([k, r]) => {
  const [prog, mod, mese] = k.split('\x1f');
  return { prog, mod, mese, ...r };
}).sort((a, b) => a.prog.localeCompare(b.prog) || a.mese.localeCompare(b.mese) || a.mod.localeCompare(b.mod));

const csv = ['progetto,modello,mese,messaggi,token_input,token_output,cache_letta,cache_scritta,output_subagenti']
  .concat(righe.map(r => [r.prog, r.mod, r.mese, r.msg, r.input, r.output, r.cacheR, r.cacheW, r.outAgenti].join(',')))
  .join('\n') + '\n';
fs.writeFileSync(path.join(dirOut, 'consumo.csv'), csv);

// ---------- report MD ----------
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
const tot = sel => {
  const t = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, outAgenti: 0 };
  for (const r of righe) if (sel(r)) { t.msg += r.msg; t.input += r.input; t.output += r.output; t.cacheR += r.cacheR; t.cacheW += r.cacheW; t.outAgenti += r.outAgenti; }
  return t;
};

const progetti = [...new Set(righe.map(r => r.prog))]
  .map(p => ({ p, t: tot(r => r.prog === p), info: perProgetto.get(p) }))
  .sort((a, b) => (b.t.input + b.t.output) - (a.t.input + a.t.output));
const modelli = [...new Set(righe.map(r => r.mod))].map(m => ({ m, t: tot(r => r.mod === m) }))
  .sort((a, b) => b.t.output - a.t.output);
const mesi = [...new Set(righe.map(r => r.mese))].sort().map(m => ({ m, t: tot(r => r.mese === m) }));
const T = tot(() => true);

let md = `# CONSUMO — token di tutte le chat Claude Code (generato)

> Generato da \`osservatorio/consumo.mjs\` il ${new Date().toISOString().slice(0, 10)}.
> **Non modificare a mano**: rilanciare lo script per aggiornare.
> Nomi dei progetti privati censurati (legenda solo locale, mai su GitHub).
> Nota lettura: *input/output* = token "vivi" pagati pieni; *cache letta* = contesto riletto
> (costa ~1/10 dell'input).
>
> **Limite noto**: qui ci sono SOLO le chat locali. Gli agenti dei **workflow cloud**
> (es. i due audit multi-agente di luglio: 2,6M e 1,1M token) non lasciano transcript sul
> PC: quei numeri vivono nei METRICHE.md dei progetti e nella dashboard Anthropic.

## Totale assoluto
| Messaggi | Input | Output | Cache letta | Cache scritta |
|---|---|---|---|---|
| ${fmt(T.msg)} | ${fmt(T.input)} | ${fmt(T.output)} | ${fmt(T.cacheR)} | ${fmt(T.cacheW)} |

## Per progetto (ordinati per token vivi)
| Progetto | Periodo | Sessioni | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|
${progetti.map(({ p, t, info }) => `| ${p} | ${info?.primo || '?'} → ${info?.ultimo || '?'} | ${info?.sessioni.size || '?'} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}

## Per modello
| Modello | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
${modelli.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}

## Per mese
| Mese | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
${mesi.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}

I dati grezzi (progetto × modello × mese) sono in \`consumo.csv\`.
`;
fs.writeFileSync(path.join(dirOut, 'CONSUMO.md'), md);

console.log(`OK: ${dirs.length} progetti, ${vistiMsg.size} messaggi unici conteggiati.`);
console.log('Scritti:', path.join(dirOut, 'consumo.csv'), 'e CONSUMO.md');
console.log('Legenda censura (LOCALE, non committare):', fileCensura);
