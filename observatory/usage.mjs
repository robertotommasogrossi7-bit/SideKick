// observatory/usage.mjs — counts the tokens of ALL local Claude Code chats.
//
// Reads the transcripts in ~/.claude/projects/*/*.jsonl and generates in observatory/usage/:
//   DASHBOARD.md        recap, top costs, lessons, one link per project
//   per-project/*.md    one file per project: all its sessions with titles
//   usage.csv           raw data: project × model × month
//   sessions.csv        raw data: ONE ROW PER SESSION, with the operation title (searchable)
//
// LESSONS.md (same folder) is HAND-CURATED by the observatory: the dashboard embeds it.
// The script never touches it. (Italian original: versione-italiano/osservatorio/consumo/LEZIONI.md)
//
// REDACTION: projects with "pubblico": false in observatory/censura.local.json appear
// under an alias and without titles. That file is LOCAL ONLY (gitignored, never on GitHub).
//
// CLOUD AGENT WORKFLOWS: they leave no transcripts on the PC. Their numbers are kept by
// hand in usage/workflow.csv (one row per workflow); the script renders them.
//
// Usage: node observatory/usage.mjs [--base <transcripts dir>] [--out <output dir>]
//   --base  where to read the *.jsonl transcripts (default: ~/.claude/projects) — used by tests
//   --out   where to write censura.local.json + usage/ (default: this script's folder)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const qui = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const base = opt('base', path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'projects'));
const outBase = opt('out', qui);
const fileCensura = path.join(outBase, 'censura.local.json');
const dirOut = path.join(outBase, 'usage');
const dirProg = path.join(dirOut, 'per-project');
const fileWorkflow = path.join(dirOut, 'workflow.csv');
const fileLessons = path.join(dirOut, 'LESSONS.md');

if (!fs.existsSync(base)) { console.error('Transcript folder not found:', base); process.exit(1); }
fs.rmSync(dirProg, { recursive: true, force: true });
fs.mkdirSync(dirProg, { recursive: true });

// ---------- redaction ----------
let censura = {};
if (fs.existsSync(fileCensura)) censura = JSON.parse(fs.readFileSync(fileCensura, 'utf8'));
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());
let prossimo = Object.values(censura).filter(v => /^progetto-\d+$/.test(v.alias)).length + 1;
for (const d of dirs) {
  if (!censura[d]) {
    // NEW projects are born redacted: reveal one by setting "pubblico": true in the local file
    censura[d] = { alias: `progetto-${String(prossimo++).padStart(2, '0')}`, pubblico: false };
  }
}
fs.writeFileSync(fileCensura, JSON.stringify(censura, null, 2));

// chats of the same project are grouped TOGETHER (worktrees with their parent, tests in one group)
const gruppoDi = alias => {
  if (/^experiment /.test(alias)) return 'experiments (method tests)';
  if (alias === 'poker (worktree)') return "poker (Who's the Boss)";
  if (alias === 'weather-report (worktree)') return 'weather-report';
  return alias;
};

const modelloCorto = m => {
  if (!m || m.startsWith('<')) return null; // '<synthetic>' = system messages, no cost
  return m.replace(/^claude-/, '').replace(/-\d{8}$/, '');
};
const pulisci = (s, max) => String(s).replace(/\s+/g, ' ').trim().slice(0, max);
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
const mdEsc = s => String(s).replace(/\|/g, '\\|');

// ---------- scan ----------
const agg = new Map();      // alias \x1f model \x1f month -> tokens (for the CSV)
const sessioni = [];        // one entry per session file
const vistiMsg = new Set(); // dedup: the same message.id reappears on resume/fork

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
      modelli: new Map(), // model -> output
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
      const mese = o.timestamp ? o.timestamp.slice(0, 7) : 'unknown';
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
  if (!s.pubblico) return '(redacted)';
  return s.titolo || s.aiTitolo || s.primoTesto || '(untitled)';
};
const modelliDi = s => {
  const ord = [...s.modelli.entries()].sort((a, b) => b[1] - a[1]).map(x => x[0]);
  return ord.length <= 2 ? ord.join(' + ') : `${ord[0]} +${ord.length - 1}`;
};

// ---------- raw CSVs (alias granularity, NOT group) ----------
const righe = [...agg.entries()].map(([k, r]) => {
  const [prog, mod, mese] = k.split('\x1f');
  return { prog, mod, mese, ...r };
}).sort((a, b) => a.prog.localeCompare(b.prog) || a.mese.localeCompare(b.mese) || a.mod.localeCompare(b.mod));

fs.mkdirSync(dirOut, { recursive: true });
fs.writeFileSync(path.join(dirOut, 'usage.csv'),
  ['project,model,month,messages,input_tokens,output_tokens,cache_read,cache_written']
    .concat(righe.map(r => [r.prog, r.mod, r.mese, r.msg, r.input, r.output, r.cacheR, r.cacheW].join(',')))
    .join('\n') + '\n');

const csvq = s => `"${String(s).replace(/"/g, '""')}"`;
sessioni.sort((a, b) => a.gruppo.localeCompare(b.gruppo) || String(a.primo).localeCompare(String(b.primo)));
fs.writeFileSync(path.join(dirOut, 'sessions.csv'),
  ['group,project,session,start,end,operation,models,messages,input_tokens,output_tokens,cache_read,cache_written']
    .concat(sessioni.map(s => [csvq(s.gruppo), csvq(s.alias), s.id, s.primo, s.ultimo, csvq(descrizione(s)), csvq(modelliDi(s)), s.msg, s.input, s.output, s.cacheR, s.cacheW].join(',')))
    .join('\n') + '\n');

// ---------- workflow.csv (cloud agents, hand-maintained) ----------
let workflow = [];
if (fs.existsSync(fileWorkflow)) {
  const [, ...corpo] = fs.readFileSync(fileWorkflow, 'utf8').trim().split('\n');
  workflow = corpo.map(l => {
    const campi = l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map(c => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
    return { data: campi[0], prog: campi[1], operazione: campi[2], agenti: campi[3], token: +campi[4] || 0, fonte: campi[5] };
  });
}
const totW = workflow.reduce((a, w) => a + w.token, 0);

// ---------- per-GROUP aggregates (the dashboard thinks in real projects) ----------
const gruppi = new Map();
for (const s of sessioni) {
  let g = gruppi.get(s.gruppo);
  if (!g) { g = { sess: [], msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, primo: null, ultimo: null, pubblico: s.pubblico }; gruppi.set(s.gruppo, g); }
  g.sess.push(s);
  g.msg += s.msg; g.input += s.input; g.output += s.output; g.cacheR += s.cacheR; g.cacheW += s.cacheW;
  if (!g.primo || (s.primo && s.primo < g.primo)) g.primo = s.primo;
  if (!g.ultimo || (s.ultimo && s.ultimo > g.ultimo)) g.ultimo = s.ultimo;
}
const ordGruppi = [...gruppi.entries()].sort((a, b) => (b[1].input + b[1].output) - (a[1].input + a[1].output));

// ---------- per-project files ----------
const rigaSess = s => `| ${s.primo}${s.ultimo !== s.primo ? '→' + String(s.ultimo).slice(5) : ''} | ${mdEsc(descrizione(s))}${s.alias !== s.gruppo ? ` *(${mdEsc(s.alias)})*` : ''} | ${modelliDi(s)} | ${fmt(s.msg)} | ${fmt(s.input)} | ${fmt(s.output)} | ${fmt(s.cacheR)} |`;

for (const [nome, g] of ordGruppi) {
  const wf = workflow.filter(w => gruppoDi(w.prog) === nome);
  const sess = [...g.sess].sort((a, b) => String(a.primo).localeCompare(String(b.primo)));
  const testo = `# ${nome} — token usage (generated)

> Back to the dashboard: [\`../DASHBOARD.md\`](../DASHBOARD.md). Do not edit by hand.

**${g.sess.length} sessions** from ${g.primo} to ${g.ultimo} · **${fmt(g.output)} output** ·
${fmt(g.input)} input · ${fmt(g.cacheR)} cache read · ${fmt(g.msg)} messages${wf.length ? ` · **+${fmt(wf.reduce((a, w) => a + w.token, 0))} cloud-agent tokens** (${wf.length} workflows)` : ''}

## Sessions (in time order — the title says what was done)
| Period | Operation | Models | Msg | Input | Output | Cache read |
|---|---|---|---|---|---|---|
${sess.map(rigaSess).join('\n')}
${wf.length ? `
## Cloud agent workflows on this project
| Date | Operation | Agents | Agent tokens | Source |
|---|---|---|---|---|
${wf.map(w => `| ${w.data} | ${mdEsc(w.operazione)} | ${w.agenti} | ${fmt(w.token)} | ${mdEsc(w.fonte)} |`).join('\n')}
` : ''}`;
  fs.writeFileSync(path.join(dirProg, slug(nome) + '.md'), testo);
}

// ---------- dashboard ----------
const T = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0 };
for (const [, g] of ordGruppi) { T.msg += g.msg; T.input += g.input; T.output += g.output; T.cacheR += g.cacheR; T.cacheW += g.cacheW; }

const totPer = sel => {
  const t = { msg: 0, input: 0, output: 0, cacheR: 0 };
  for (const r of righe) if (sel(r)) { t.msg += r.msg; t.input += r.input; t.output += r.output; t.cacheR += r.cacheR; }
  return t;
};
const modelli = [...new Set(righe.map(r => r.mod))].map(m => ({ m, t: totPer(r => r.mod === m) })).sort((a, b) => b.t.output - a.t.output);
const mesi = [...new Set(righe.map(r => r.mese))].sort().map(m => ({ m, t: totPer(r => r.mese === m) }));

// top costs: sessions + workflows together, by output/agent tokens
const top = [
  ...sessioni.map(s => ({ tipo: 'chat', nome: `${descrizione(s)} — ${s.gruppo}`, quando: s.primo, tok: s.output })),
  ...workflow.map(w => ({ tipo: 'cloud agents', nome: `${w.operazione} — ${gruppoDi(w.prog)}`, quando: w.data, tok: w.token })),
].sort((a, b) => b.tok - a.tok).slice(0, 8);

const lezioni = fs.existsSync(fileLessons)
  ? fs.readFileSync(fileLessons, 'utf8').replace(/^# .*\n/, '').trim()
  : '*(write `LESSONS.md` in this folder: the dashboard embeds it here)*';

const md = `# TOKEN USAGE — dashboard (generated)

> Generated by \`observatory/usage.mjs\` on ${new Date().toISOString().slice(0, 10)}. **Do not edit by
> hand** (except \`LESSONS.md\`, which is curated by the observatory and embedded below).
> Each project's detail is in \`per-project/\` (one file per project, one table row per session).
> Raw data: \`usage.csv\` · \`sessions.csv\` (searchable: grep "react", "audit", "Feature_6"…) —
> column-by-column schema in \`SCHEMA.md\`.
> Reserved projects are redacted (legend kept local only). *Output* = generated tokens (the
> heaviest); *input* = tokens read at full price; *cache read* = context re-read (~1/10 of input).

## At a glance
- **${fmt(T.output)} output tokens** (+ **${fmt(totW)}** from cloud agents) across **${sessioni.length} sessions**
  in **${ordGruppi.length} projects**, from ${mesi[0]?.m || '?'} to today. ${fmt(T.msg)} messages in total.
- The **cache** re-read ${fmt(T.cacheR)} tokens (≈${Math.round(T.cacheR / (T.input + T.output))}× the live tokens): resuming a chat
  on a warm cache is what keeps the plan sustainable — restarting from scratch throws it away.

## The most expensive things
| # | What | Type | When | Tokens |
|---|---|---|---|---|
${top.map((t, i) => `| ${i + 1} | ${mdEsc(t.nome)} | ${t.tipo} | ${t.quando} | ${fmt(t.tok)} |`).join('\n')}

## What we learned about cost (and actually reduced)
${lezioni}

## By project (click for the per-session detail)
| Project | Period | Sessions | Output | Input | Cache read |
|---|---|---|---|---|---|
${ordGruppi.map(([nome, g]) => `| [${mdEsc(nome)}](per-project/${slug(nome)}.md) | ${g.primo} → ${g.ultimo} | ${g.sess.length} | ${fmt(g.output)} | ${fmt(g.input)} | ${fmt(g.cacheR)} |`).join('\n')}

## Cloud agent work (workflows — hand-maintained register)
Multi-agent workflows run in the cloud and **leave no transcripts on the PC**: these numbers
come from the projects' METRICHE/report files. **After every new workflow, add one row to
\`workflow.csv\`** (the observatory ritual includes the reminder).

| Date | Project | Operation | Agents | Agent tokens |
|---|---|---|---|---|
${workflow.map(w => `| ${w.data} | ${mdEsc(gruppoDi(w.prog))} | ${mdEsc(w.operazione)} | ${w.agenti} | ${fmt(w.token)} |`).join('\n') || '| — | — | *(none registered)* | — | — |'}

## By model (local chats only)
| Model | Msg | Input | Output | Cache read |
|---|---|---|---|---|
${modelli.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}

## By month
| Month | Msg | Input | Output | Cache read |
|---|---|---|---|---|
${mesi.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} |`).join('\n')}
`;
fs.writeFileSync(path.join(dirOut, 'DASHBOARD.md'), md);

console.log(`OK: ${dirs.length} folders, ${ordGruppi.length} projects, ${sessioni.length} sessions, ${vistiMsg.size} unique messages.`);
console.log('Written: DASHBOARD.md, per-project/ (' + ordGruppi.length + ' files), usage.csv, sessions.csv');
console.log('Redaction legend (LOCAL, do not commit):', fileCensura);
