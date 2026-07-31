// observatory/usage.mjs — counts the tokens of ALL local Claude Code chats.
//
// Reads the transcripts in ~/.claude/projects/*/*.jsonl and generates in observatory/usage/:
//   DASHBOARD.md        recap, top costs, lessons, one link per project
//   dashboard.html       same numbers as an interactive, self-contained page (sortable tables
//                        + inline SVG bar charts, no CDN, dark/light aware)
//   per-project/*.md    one file per project: all its sessions with titles
//   usage.csv           raw data: project × model × month
//   sessions.csv        raw data: ONE ROW PER SESSION, with the operation title (searchable)
//   daily.csv           raw data: ONE ROW PER CALENDAR DAY (all projects/models folded together)
//
// LESSONS.md (same folder) is HAND-CURATED by the observatory: the dashboard embeds it.
// The script never touches it. (Italian original: versione-italiano/osservatorio/consumo/LEZIONI.md)
//
// REDACTION: projects with "pubblico": false in observatory/censura.local.json appear
// under an alias and without titles. That file is LOCAL ONLY (gitignored, never on GitHub).
//
// COST (API-equivalent, USD): prices.csv (same folder, hand-maintained, one row per model
// per validity window, each with a source URL + verified date — see SCHEMA.md) is used to
// price every message at the model+date that produced it. This is a LISTED-PRICE ESTIMATE
// of what the tokens would cost on the pay-as-you-go API, NOT what is actually billed on a
// flat Max/Pro plan (5-hour windows, not per-token) — the dashboard says so every time.
// A model/date with no verified row in prices.csv contributes $0 and marks the total
// "partial" (cost_partial column / '*' marker) — never an invented number.
//
// AGENT WORKFLOWS: registered by hand in usage/workflow.csv (one row per workflow). When
// a run executed on THIS machine, its per-agent transcripts (under <project>/<session>/
// subagents/workflows/wf_*/) are priced message-by-message and shown as a MEASURED cost,
// matched via the wf_... id in the row's `source`; runs that executed in the cloud leave
// nothing local and stay unpriced (never estimated). Workflow costs are shown as their own
// line/column and are NOT folded into the chats' total (see SCHEMA.md).
//
// BILINGUAL OUTPUT: the same numbers/tables are also written in Italian, to
// ITALIANO/osservatorio/uso/ (DASHBOARD.md + per-progetto/*.md). Only the template strings
// are translated (see the LANG table below) — the CSV/aggregation logic runs ONCE and feeds
// both renders, so there is no duplicated computation. Links to the raw CSVs in the Italian
// dashboard point at the English originals (the CSVs themselves are not duplicated); the
// Italian lessons section embeds ITALIANO/osservatorio/uso/LESSONS.md when it exists.
//
// Usage: node observatory/usage.mjs [--base <transcripts dir>] [--out <output dir>] [--out-it <dir>]
//   --base    where to read the *.jsonl transcripts (default: ~/.claude/projects) — used by tests
//   --out     where to write censura.local.json + usage/ (default: this script's folder)
//   --out-it  where to write the Italian dashboard/drilldowns (default: ITALIANO/osservatorio/uso
//             next to the repo root) — used by tests to avoid touching the real ITALIANO/ folder
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
// prices.csv: hand-maintained price list (USD per MTok), one row per model per validity
// window — see the "cost API-equivalent" block below and observatory/usage/SCHEMA.md.
const filePrezzi = opt('prices', path.join(dirOut, 'prices.csv'));

// Italian mirror: defaults to the real ITALIANO/ folder at the repo root (sibling of
// observatory/), but tests point --out at a scratch dir so --out-it must be derivable from
// it, never hardcoded to the real repo path.
const dirOutIT = opt('out-it', path.join(path.dirname(outBase), 'ITALIANO', 'osservatorio', 'uso'));
const dirProgIT = path.join(dirOutIT, 'per-progetto');
const fileLessonsIT = path.join(dirOutIT, 'LESSONS.md');

if (!fs.existsSync(base)) { console.error('Transcript folder not found:', base); process.exit(1); }
fs.rmSync(dirProg, { recursive: true, force: true });
fs.mkdirSync(dirProg, { recursive: true });
fs.rmSync(dirProgIT, { recursive: true, force: true });
fs.mkdirSync(dirProgIT, { recursive: true });

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
  if (/^weather.report(\s|$)/.test(alias)) return 'weather_report'; // worktree + old hyphen alias
  if (/^Studio(\s*\(|$)/.test(alias)) return 'Studio'; // "Studio (ponte)", "Studio (StudioQuest)" — AR-01
  return alias;
};

const modelloCorto = m => {
  if (!m || m.startsWith('<')) return null; // '<synthetic>' = system messages, no cost
  return m.replace(/^claude-/, '').replace(/\[1m\]$/, '').replace(/-\d{8}$/, '');
};
const pulisci = (s, max) => String(s).replace(/\s+/g, ' ').trim().slice(0, max);
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
const mdEsc = s => String(s).replace(/\|/g, '\\|');
// quoted-CSV field splitter, shared by workflow.csv and prices.csv parsing below
const campiCSV = riga => riga.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map(c => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
const fmtUSD = n => n == null ? '—' : n >= 1000 ? '$' + (n / 1000).toFixed(1) + 'k' : n >= 1 ? '$' + n.toFixed(2) : '$' + n.toFixed(4);
// costoParziale=true means "at least one contributing model/date had no verified price":
// if the known-priced sum is 0 the cost is fully unknown (shown as em-dash); otherwise the
// known portion is shown with a '*' so it reads as an undercount, never as a full number.
const fmtCosto = (costo, parziale) => !parziale ? fmtUSD(costo) : costo > 0 ? fmtUSD(costo) + '*' : '—';

// ---------- prices.csv (hand-maintained, USD per MTok — see SCHEMA.md) ----------
// One row per model per validity window (effective_from/effective_until, both YYYY-MM-DD or
// empty = open-ended); a model can have several rows when its price changed over time (e.g.
// sonnet-5's introductory price expires 2026-08-31). Only status=verified rows price
// anything — unverified/missing models contribute $0 and mark the total "partial".
// cache_write_per_mtok is priced at the 5-MINUTE cache-write rate: the transcripts only
// report one aggregate "cache creation" number, not a 5m/1h split, so a message that used
// the (pricier, 2x) 1-hour cache is under-priced here — a declared limit, see SCHEMA.md.
let listinoPrezzi = [];
if (fs.existsSync(filePrezzi)) {
  const [, ...corpo] = fs.readFileSync(filePrezzi, 'utf8').trim().split('\n');
  listinoPrezzi = corpo.filter(Boolean).map(l => {
    const c = campiCSV(l);
    return {
      mod: c[0], input: +c[1], output: +c[2], cacheR: +c[3], cacheW: +c[4],
      da: c[5] || null, a: c[6] || null, status: c[7], url: c[8], verificato: c[9],
    };
  });
}
const listinoPerModello = new Map();
for (const r of listinoPrezzi) {
  if (!listinoPerModello.has(r.mod)) listinoPerModello.set(r.mod, []);
  listinoPerModello.get(r.mod).push(r);
}
// most recent verified_date across the price list — shown in the dashboard disclaimer
const dataPrezzi = listinoPrezzi.filter(r => r.status === 'verified' && r.verificato)
  .map(r => r.verificato).sort().at(-1) || null;

const prezzoPer = (mod, data) => {
  if (!data) return null;
  const righeP = listinoPerModello.get(mod);
  if (!righeP) return null;
  for (const r of righeP) {
    if (r.status !== 'verified') continue;
    if (r.da && data < r.da) continue;
    if (r.a && data > r.a) continue;
    return r;
  }
  return null;
};
// costo of ONE message, priced at the model+day it was produced (dates matter: e.g.
// sonnet-5 has two different prices before/after 2026-09-01 — see prices.csv)
const costoMessaggio = (mod, data, inTok, outTok, cR, cW) => {
  const p = prezzoPer(mod, data);
  if (!p) return { usd: 0, sconosciuto: true, comp: null };
  const comp = { inp: inTok * p.input / 1e6, out: outTok * p.output / 1e6,
                 cR: cR * p.cacheR / 1e6, cW: cW * p.cacheW / 1e6 };
  return { usd: comp.inp + comp.out + comp.cR + comp.cW, sconosciuto: false, comp };
};

// running composition of the chats' API-equivalent by token kind — feeds the
// "where the money would go" line in the dashboards (only priced messages contribute)
const costoTipi = { inp: 0, out: 0, cR: 0, cW: 0 };

// ---------- scan ----------
const agg = new Map();      // alias \x1f model \x1f month -> tokens (for the CSV)
const aggGiorno = new Map(); // YYYY-MM-DD -> tokens/cost, ALL projects/models folded (for daily.csv)
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
      costo: 0, costoParziale: false, // API-equivalent USD (see prices.csv); see fmtCosto
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
      if (!r) { r = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, costo: 0, costoParziale: false }; agg.set(k, r); }
      const inTok = u.input_tokens || 0, outTok = u.output_tokens || 0;
      const cR = u.cache_read_input_tokens || 0, cW = u.cache_creation_input_tokens || 0;
      const { usd, sconosciuto, comp } = costoMessaggio(mod, ts, inTok, outTok, cR, cW);
      if (comp) { costoTipi.inp += comp.inp; costoTipi.out += comp.out; costoTipi.cR += comp.cR; costoTipi.cW += comp.cW; }
      r.msg++; r.input += inTok; r.output += outTok; r.cacheR += cR; r.cacheW += cW;
      r.costo += usd; r.costoParziale = r.costoParziale || sconosciuto;
      s.msg++; s.input += inTok; s.output += outTok; s.cacheR += cR; s.cacheW += cW;
      s.costo += usd; s.costoParziale = s.costoParziale || sconosciuto;
      s.modelli.set(mod, (s.modelli.get(mod) || 0) + outTok);
      if (ts) {
        let giorno = aggGiorno.get(ts);
        if (!giorno) { giorno = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, costo: 0, costoParziale: false }; aggGiorno.set(ts, giorno); }
        giorno.msg++; giorno.input += inTok; giorno.output += outTok; giorno.cacheR += cR; giorno.cacheW += cW;
        giorno.costo += usd; giorno.costoParziale = giorno.costoParziale || sconosciuto;
      }
    }
    if (s.msg > 0) sessioni.push(s);
  }
}

// ---------- EN/IT string table (template strings only — the aggregation logic above/below
// runs once and is shared by both renders; see the BILINGUAL OUTPUT note at the top) ----------
const LANG = {
  en: {
    redacted: '(redacted)', untitled: '(untitled)',
    projectSuffix: 'token usage (generated)',
    backToDashboard: '> Back to the dashboard: [`../DASHBOARD.md`](../DASHBOARD.md). Do not edit by hand.',
    sessionsWord: 'sessions', from: 'from', to: 'to',
    outputWord: 'output', inputWord: 'input', cacheReadWord: 'cache read', messagesWord: 'messages',
    cloudAgentTokens: 'cloud-agent tokens',
    workflowWord: n => n === 1 ? 'workflow' : 'workflows',
    sessionsHeader: 'Sessions (in time order — the title says what was done)',
    colPeriod: 'Period', colOperation: 'Operation', colModels: 'Models', colModel: 'Model', colMsg: 'Msg',
    colInput: 'Input', colOutput: 'Output', colCacheRead: 'Cache read', colMonth: 'Month',
    cloudWorkflowsHeader: 'Cloud agent workflows on this project',
    colDate: 'Date', colAgents: 'Agents', colAgentTokens: 'Agent tokens', colSource: 'Source',
    dashboardTitle: 'TOKEN USAGE — dashboard (generated)',
    headNote: (data) => `> Generated by \`observatory/usage.mjs\` on ${data}. **Do not edit by
> hand** (except \`LESSONS.md\`, which is curated by the observatory and embedded below).
> Each project's detail is in \`per-project/\` (one file per project, one table row per session).
> Raw data: \`usage.csv\` · \`sessions.csv\` · \`daily.csv\` · \`prices.csv\` (searchable: grep
> "react", "audit", "Feature_6"…) — column-by-column schema in \`SCHEMA.md\`. Same numbers as
> an interactive page: [\`dashboard.html\`](dashboard.html) (sortable tables, bar charts).
> Reserved projects are redacted (legend kept local only). *Output* = generated tokens (the
> heaviest); *input* = tokens read at full price; *cache read* = context re-read (~1/10 of input).`,
    atGlanceHeader: 'At a glance',
    summaryLine1: o => `- **${o.output} output tokens** (+ **${o.totW}** from cloud agents) across **${o.nSessions} sessions**
  in **${o.nProjects} projects**, from ${o.firstMonth} to today. ${o.msg} messages in total.`,
    summaryLine2: o => `- The **cache** re-read ${o.cacheR} tokens (≈${o.ratio}× the live tokens): resuming a chat
  on a warm cache is what keeps the plan sustainable — restarting from scratch throws it away.`,
    summaryLine3: o => `- **API cost-equivalent: ${o.totCosto}**${o.parziale ? ' (partial — some model/dates have no verified price yet, marked with \\*)' : ''}, computed at the prices verified ${o.dataPrezzi ? `on ${o.dataPrezzi}` : '(no verified price found)'} in \`prices.csv\`. **This is NOT what is actually billed** on the Max/Pro plan
  (flat 5-hour usage windows, not pay-per-token) — it only estimates what the same tokens would cost on the pay-as-you-go API, useful to compare models/workflows. Cloud-agent workflow tokens have
  no per-model breakdown and are **excluded** from this total (see the cloud agent section below).`,
    summaryComp: o => `- **Where the API-equivalent goes** (local chats): cache read ${o.cr} (${o.crPct}%) + cache write ${o.cw} (${o.cwPct}%) + output ${o.out} (${o.outPct}%) + input ${o.inp} — the cache IS the
  working style (long chats, resumes, agents re-reading context), and it is affordable
  precisely because the flat plan makes re-reading free.`,
    summaryWf: o => `- **Agent workflows measured from local transcripts: ${o.usd} across ${o.n} of ${o.tot} registered runs** — priced message-by-message from the per-agent transcripts this machine kept;
  the other runs executed in the cloud and stay unpriced ('—'), never estimated.`,
    wfMeasuredNote: `Cost is **measured** from the local per-agent transcripts when a run left them on this
machine (matched via the \`wf_...\` id in Source); '—' = no local transcripts (cloud run),
never an estimate.`,
    expensiveHeader: 'The most expensive things',
    colHash: '#', colWhat: 'What', colType: 'Type', colWhen: 'When', colTokens: 'Tokens', colCost: 'Cost (API-equiv.)',
    typeChat: 'chat', typeCloudAgents: 'cloud agents',
    lessonsHeader: 'What we learned about cost (and actually reduced)',
    lessonsPlaceholder: '*(write `LESSONS.md` in this folder: the dashboard embeds it here)*',
    byProjectHeader: 'By project (click for the per-session detail)',
    colProject: 'Project', colSessions: 'Sessions',
    projectDir: 'per-project',
    cloudWorkHeader: 'Cloud agent work (workflows — hand-maintained register)',
    cloudWorkNote: `Multi-agent workflows run in the cloud and **leave no transcripts on the PC**: these numbers
come from the projects' METRICHE/report files. **After every new workflow, add one row to
\`workflow.csv\`** (the observatory ritual includes the reminder). No per-model breakdown means
no USD column here — see \`SCHEMA.md\` for the declared limit. Tokens marked **~** are
**estimates from run reports** (\`estimated\` column in the register), not measured counts —
any total containing them is marked ~ too.`,
    noneRegistered: '*(none registered)*',
    byModelHeader: 'By model (local chats only)',
    byMonthHeader: 'By month',
    byDayHeader: 'By day (local chats only)',
    byWeekHeader: 'By week, ISO week numbers (local chats only)',
    colDay: 'Day', colWeek: 'Week',
    dayWindowNote: (shown, total) => shown < total ? `*(showing the last ${shown} of ${total} recorded days; the full series is in \`daily.csv\`)*` : '*(the full recorded history)*',
    weekWindowNote: (shown, total) => shown < total ? `*(showing the last ${shown} of ${total} recorded weeks)*` : '*(the full recorded history)*',
    costPartialLegend: '\\* cost known only in part (some model/date in that row has no verified price — see `prices.csv`)',
  },
  it: {
    redacted: '(oscurato)', untitled: '(senza titolo)',
    projectSuffix: 'utilizzo token (generato)',
    backToDashboard: '> Torna al cruscotto: [`../DASHBOARD.md`](../DASHBOARD.md). Non modificare a mano.',
    sessionsWord: 'sessioni', from: 'dal', to: 'al',
    outputWord: 'output', inputWord: 'input', cacheReadWord: 'cache letta', messagesWord: 'messaggi',
    cloudAgentTokens: 'token di agenti cloud',
    workflowWord: () => 'workflow',
    sessionsHeader: 'Sessioni (in ordine di tempo — il titolo dice cosa è stato fatto)',
    colPeriod: 'Periodo', colOperation: 'Operazione', colModels: 'Modelli', colModel: 'Modello', colMsg: 'Msg',
    colInput: 'Input', colOutput: 'Output', colCacheRead: 'Cache letta', colMonth: 'Mese',
    cloudWorkflowsHeader: 'Workflow cloud su questo progetto',
    colDate: 'Data', colAgents: 'Agenti', colAgentTokens: 'Token agenti', colSource: 'Fonte',
    dashboardTitle: 'UTILIZZO TOKEN — cruscotto (generato)',
    headNote: (data) => `> Generato da \`observatory/usage.mjs\` il ${data}. **Non modificare a
> mano** (eccetto \`LESSONS.md\`, curato dall'osservatorio e incorporato qui sotto).
> Il dettaglio di ogni progetto è in \`per-progetto/\` (un file per progetto, una riga di tabella per sessione).
> Dati grezzi (originali inglesi): [\`usage.csv\`](../../../observatory/usage/usage.csv) ·
> [\`sessions.csv\`](../../../observatory/usage/sessions.csv) · [\`daily.csv\`](../../../observatory/usage/daily.csv) ·
> [\`prices.csv\`](../../../observatory/usage/prices.csv) (cercabili: grep "react", "audit", "Feature_6"…) —
> schema colonna per colonna in [\`SCHEMA.md\`](SCHEMA.md). Stessi numeri come pagina interattiva:
> [\`dashboard.html\`](dashboard.html) (tabelle ordinabili, grafici a barre).
> I progetti riservati sono oscurati (la legenda resta solo in locale). *Output* = token generati (i
> più pesanti); *input* = token letti a prezzo pieno; *cache letta* = contesto riletto (~1/10 dell'input).`,
    atGlanceHeader: 'Colpo d\'occhio',
    summaryLine1: o => `- **${o.output} token di output** (+ **${o.totW}** da agenti cloud) su **${o.nSessions} sessioni**
  in **${o.nProjects} progetti**, dal ${o.firstMonth} a oggi. ${o.msg} messaggi in totale.`,
    summaryLine2: o => `- La **cache** ha riletto ${o.cacheR} token (≈${o.ratio}× i token vivi): riprendere una chat
  su una cache calda è ciò che rende sostenibile il piano — ripartire da zero li butta via.`,
    summaryLine3: o => `- **Costo API-equivalente: ${o.totCosto}**${o.parziale ? ' (parziale — alcuni modelli/date non hanno ancora un prezzo verificato, segnati con \\*)' : ''}, calcolato coi prezzi verificati ${o.dataPrezzi ? `il ${o.dataPrezzi}` : '(nessun prezzo verificato trovato)'} in \`prices.csv\`. **NON è ciò che si paga davvero** sul piano
  Max/Pro (finestre da 5 ore flat, non a consumo per token) — stima solo quanto costerebbero quegli stessi token sull'API a consumo, utile per confrontare modelli/workflow. I token dei workflow cloud
  non hanno un dettaglio per modello e sono **esclusi** da questo totale (vedi la sezione agenti cloud sotto).`,
    summaryComp: o => `- **Dove va l'equivalente API** (chat locali): cache letta ${o.cr} (${o.crPct}%) + cache scritta ${o.cw} (${o.cwPct}%) + output ${o.out} (${o.outPct}%) + input ${o.inp} — la cache È lo stile
  di lavoro (chat lunghe, resume, agenti che rileggono il contesto), ed è sostenibile proprio
  perché il piano flat rende gratis rileggere.`,
    summaryWf: o => `- **Workflow di agenti misurati dai transcript locali: ${o.usd} su ${o.n} dei ${o.tot} run registrati** — prezzati messaggio per messaggio dai transcript per-agente rimasti su questa macchina;
  gli altri run sono girati nel cloud e restano senza prezzo ('—'), mai stimati.`,
    wfMeasuredNote: `Il costo è **misurato** dai transcript per-agente locali quando un run li ha lasciati su
questa macchina (aggancio tramite l'id \`wf_...\` nella Fonte); '—' = niente transcript
locali (run nel cloud), mai una stima.`,
    expensiveHeader: 'Le cose più costose',
    rawDataNote: `> Nota: le descrizioni delle operazioni restano in **inglese** — sono log tecnici copiati
> tali e quali dal registro \`workflow.csv\` e dai titoli delle sessioni (dati, non prosa).`,
    colHash: '#', colWhat: 'Cosa', colType: 'Tipo', colWhen: 'Quando', colTokens: 'Token', colCost: 'Costo (API-equiv.)',
    typeChat: 'chat', typeCloudAgents: 'agenti cloud',
    lessonsHeader: 'Cosa abbiamo imparato sul costo (e ridotto davvero)',
    lessonsPlaceholder: '*(scrivi `LESSONS.md` in questa cartella: il cruscotto lo incorpora qui)*',
    byProjectHeader: 'Per progetto (clicca per il dettaglio per sessione)',
    colProject: 'Progetto', colSessions: 'Sessioni',
    projectDir: 'per-progetto',
    cloudWorkHeader: 'Lavoro degli agenti cloud (workflow — registro curato a mano)',
    cloudWorkNote: `I workflow multi-agente girano nel cloud e **non lasciano transcript sul PC**: questi numeri
vengono dai file METRICHE/report dei progetti. **Dopo ogni nuovo workflow, aggiungi una riga a
\`workflow.csv\`** (il rituale dell'osservatorio include il promemoria). Nessun dettaglio per modello
significa nessuna colonna USD qui — vedi \`SCHEMA.md\` per il limite dichiarato. I token marcati
**~** sono **stime dai report dei run** (colonna \`estimated\` del registro), non conteggi
misurati — ogni totale che li contiene è marcato ~ a sua volta.`,
    noneRegistered: '*(nessuno registrato)*',
    byModelHeader: 'Per modello (solo chat locali)',
    byMonthHeader: 'Per mese',
    byDayHeader: 'Per giorno (solo chat locali)',
    byWeekHeader: 'Per settimana, numeri di settimana ISO (solo chat locali)',
    colDay: 'Giorno', colWeek: 'Settimana',
    dayWindowNote: (shown, total) => shown < total ? `*(mostrati gli ultimi ${shown} di ${total} giorni registrati; la serie completa è in \`daily.csv\`)*` : '*(tutta la cronologia registrata)*',
    weekWindowNote: (shown, total) => shown < total ? `*(mostrate le ultime ${shown} di ${total} settimane registrate)*` : '*(tutta la cronologia registrata)*',
    costPartialLegend: '\\* costo noto solo in parte (qualche modello/data di quella riga non ha un prezzo verificato — vedi `prices.csv`)',
  },
};

const descrizione = (s, L = LANG.en) => {
  if (!s.pubblico) return L.redacted;
  return s.titolo || s.aiTitolo || s.primoTesto || L.untitled;
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
  ['project,model,month,messages,input_tokens,output_tokens,cache_read,cache_written,cost_usd_equiv,cost_partial']
    .concat(righe.map(r => [r.prog, r.mod, r.mese, r.msg, r.input, r.output, r.cacheR, r.cacheW, r.costo.toFixed(6), r.costoParziale].join(',')))
    .join('\n') + '\n');

const csvq = s => `"${String(s).replace(/"/g, '""')}"`;
sessioni.sort((a, b) => a.gruppo.localeCompare(b.gruppo) || String(a.primo).localeCompare(String(b.primo)));
fs.writeFileSync(path.join(dirOut, 'sessions.csv'),
  ['group,project,session,start,end,operation,models,messages,input_tokens,output_tokens,cache_read,cache_written,cost_usd_equiv,cost_partial']
    .concat(sessioni.map(s => [csvq(s.gruppo), csvq(s.alias), s.id, s.primo, s.ultimo, csvq(descrizione(s)), csvq(modelliDi(s)), s.msg, s.input, s.output, s.cacheR, s.cacheW, s.costo.toFixed(6), s.costoParziale].join(',')))
    .join('\n') + '\n');

// ---------- daily.csv (ALL projects/models folded together, one row per calendar day) ----------
const giorniOrdinati = [...aggGiorno.entries()].sort((a, b) => a[0].localeCompare(b[0]));
fs.writeFileSync(path.join(dirOut, 'daily.csv'),
  ['date,messages,input_tokens,output_tokens,cache_read,cache_written,cost_usd_equiv,cost_partial']
    .concat(giorniOrdinati.map(([data, t]) => [data, t.msg, t.input, t.output, t.cacheR, t.cacheW, t.costo.toFixed(6), t.costoParziale].join(',')))
    .join('\n') + '\n');

// ---------- weekly fold (in-memory only, ISO week — no re-scan of transcripts) ----------
// ISO 8601 week number: Thursday-of-the-week trick (Monday=start of week, week 1 = the
// week containing the year's first Thursday). Zero dependencies, matches date -u +%V.
const settimanaISO = dataStr => {
  const d = new Date(dataStr + 'T00:00:00Z');
  const giornoLun = (d.getUTCDay() + 6) % 7; // Mon=0 .. Sun=6
  d.setUTCDate(d.getUTCDate() - giornoLun + 3); // move to this week's Thursday
  const primoGennaio = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const settimana = 1 + Math.round(((d - primoGennaio) / 86400000 - 3 + ((primoGennaio.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(settimana).padStart(2, '0')}`;
};
const aggSettimana = new Map();
for (const [data, gg] of giorniOrdinati) {
  const w = settimanaISO(data);
  let t = aggSettimana.get(w);
  if (!t) { t = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, costo: 0, costoParziale: false }; aggSettimana.set(w, t); }
  t.msg += gg.msg; t.input += gg.input; t.output += gg.output; t.cacheR += gg.cacheR; t.cacheW += gg.cacheW;
  t.costo += gg.costo; t.costoParziale = t.costoParziale || gg.costoParziale;
}
const settimaneOrdinate = [...aggSettimana.entries()].sort((a, b) => a[0].localeCompare(b[0]));
// dashboard windowing (older history stays in daily.csv / recomputable from it — nothing lost)
const FINESTRA_GIORNI = 30, FINESTRA_SETTIMANE = 12;
const giorniVista = giorniOrdinati.slice(-FINESTRA_GIORNI);
const settimaneVista = settimaneOrdinate.slice(-FINESTRA_SETTIMANE);

// ---------- local workflow-agent transcripts (exact cost where they exist) ----------
// Multi-agent workflows are registered by hand in workflow.csv (aggregate tokens, no
// per-model breakdown). BUT when a run executed on THIS machine, its per-agent transcripts
// sit under <project>/<session>/subagents/workflows/wf_*/agent-*.jsonl — here they are
// priced message-by-message (same prices.csv, same dedup idea) and keyed by wf id, then
// matched to workflow.csv rows via the `wf_...` reference in their `source` column.
// Runs that executed in the cloud leave nothing local and stay unpriced ('—'), never estimated.
const wfMisurati = new Map(); // wf id -> { usd, sconosciuto }
const vistiMsgWf = new Set();
for (const d of dirs) {
  const dir = path.join(base, d);
  for (const sub of fs.readdirSync(dir)) {
    const wfRoot = path.join(dir, sub, 'subagents', 'workflows');
    let ok = false;
    try { ok = fs.statSync(path.join(dir, sub)).isDirectory() && fs.existsSync(wfRoot); } catch { ok = false; }
    if (!ok) continue;
    for (const wfDir of fs.readdirSync(wfRoot).filter(x => x.startsWith('wf_'))) {
      const acc = wfMisurati.get(wfDir) || { usd: 0, sconosciuto: false };
      let file;
      try { file = fs.readdirSync(path.join(wfRoot, wfDir)).filter(f => f.startsWith('agent-') && f.endsWith('.jsonl')); } catch { continue; }
      // AGENT transcripts differ from chat transcripts: the same message.id shows up in
      // several records with GROWING usage (streaming snapshots) — the LAST one is the real
      // total. So dedup here is last-wins per id. (Chat transcripts repeat ids with
      // IDENTICAL usage — verified 2026-07-25 on a 679-id chat, 0 divergent — so the main
      // scan's first-wins stays correct there.)
      const perId = new Map();
      for (const f of file) {
        let testo;
        try { testo = fs.readFileSync(path.join(wfRoot, wfDir, f), 'utf8'); } catch { continue; }
        for (const ln of testo.split('\n')) {
          if (!ln) continue;
          let o; try { o = JSON.parse(ln); } catch { continue; }
          if (o.type !== 'assistant') continue;
          const msg = o.message || {};
          const u = msg.usage;
          const mod = modelloCorto(msg.model);
          if (!u || !mod) continue;
          const id = msg.id || o.uuid;
          if (!id || vistiMsgWf.has(id)) continue; // cross-run safety only
          const ts = o.timestamp ? o.timestamp.slice(0, 10) : null;
          perId.set(id, { mod, ts, u }); // last record per id wins (final snapshot)
        }
      }
      for (const [id, r] of perId) {
        vistiMsgWf.add(id);
        const { usd, sconosciuto } = costoMessaggio(r.mod, r.ts, r.u.input_tokens || 0, r.u.output_tokens || 0, r.u.cache_read_input_tokens || 0, r.u.cache_creation_input_tokens || 0);
        acc.usd += usd; acc.sconosciuto = acc.sconosciuto || sconosciuto;
      }
      wfMisurati.set(wfDir, acc);
    }
  }
}

// ---------- workflow.csv (cloud agents, hand-maintained) ----------
let workflow = [];
if (fs.existsSync(fileWorkflow)) {
  const [, ...corpo] = fs.readFileSync(fileWorkflow, 'utf8').trim().split('\n');
  workflow = corpo.map(l => {
    const campi = campiCSV(l);
    // estimated (8th column, added 2026-08-01): non-empty = the tokens are an estimate from
    // a run report, not a measured count -> displayed with a '~' prefix everywhere
    return { data: campi[0], prog: campi[1], operazione: campi[2], agenti: campi[3], token: +campi[4] || 0, fonte: campi[5], stima: !!(campi[7] || '').trim() };
  });
}
for (const w of workflow) {
  // a row's source can cite SEVERAL wf ids (multi-launch runs): sum the measured dirs
  const rifs = String(w.fonte).match(/wf_[a-z0-9-]+/g) || [];
  let mis;
  for (const rif of rifs) {
    const m = wfMisurati.get(rif);
    if (m) { if (!mis) mis = { usd: 0, sconosciuto: false }; mis.usd += m.usd; mis.sconosciuto = mis.sconosciuto || m.sconosciuto; }
  }
  w.mis = mis; // undefined = no local transcripts -> '—'
}
const totW = workflow.reduce((a, w) => a + w.token, 0);
// any estimated row taints the aggregate: the total is then shown as '~N', never as exact
const totWStima = workflow.some(w => w.stima);
const fmtTokWf = w => `${w.stima ? '~' : ''}${fmt(w.token)}`;
const wfConMisura = workflow.filter(w => w.mis);
const totWfUsd = wfConMisura.reduce((a, w) => a + w.mis.usd, 0);
const fmtCostoWf = w => w.mis ? fmtCosto(w.mis.usd, w.mis.sconosciuto) : '—';

// ---------- per-GROUP aggregates (the dashboard thinks in real projects) ----------
const gruppi = new Map();
for (const s of sessioni) {
  let g = gruppi.get(s.gruppo);
  if (!g) { g = { sess: [], msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, costo: 0, costoParziale: false, primo: null, ultimo: null, pubblico: s.pubblico }; gruppi.set(s.gruppo, g); }
  g.sess.push(s);
  g.msg += s.msg; g.input += s.input; g.output += s.output; g.cacheR += s.cacheR; g.cacheW += s.cacheW;
  g.costo += s.costo; g.costoParziale = g.costoParziale || s.costoParziale;
  if (!g.primo || (s.primo && s.primo < g.primo)) g.primo = s.primo;
  if (!g.ultimo || (s.ultimo && s.ultimo > g.ultimo)) g.ultimo = s.ultimo;
}
const ordGruppi = [...gruppi.entries()].sort((a, b) => (b[1].input + b[1].output) - (a[1].input + a[1].output));

// ---------- per-project files (rendered once per language, same data) ----------
const rigaSess = (s, L = LANG.en) => `| ${s.primo}${s.ultimo !== s.primo ? '→' + String(s.ultimo).slice(5) : ''} | ${mdEsc(descrizione(s, L))}${s.alias !== s.gruppo ? ` *(${mdEsc(s.alias)})*` : ''} | ${modelliDi(s)} | ${fmt(s.msg)} | ${fmt(s.input)} | ${fmt(s.output)} | ${fmt(s.cacheR)} | ${fmtCosto(s.costo, s.costoParziale)} |`;

const renderProjectMD = (nome, g, wf, sess, L) => {
  const wfLine = wf.length
    ? ` · **+${wf.some(w => w.stima) ? '~' : ''}${fmt(wf.reduce((a, w) => a + w.token, 0))} ${L.cloudAgentTokens}** (${wf.length} ${L.workflowWord(wf.length)})`
    : '';
  const wfSection = wf.length ? `
## ${L.cloudWorkflowsHeader}
${L.rawDataNote ? L.rawDataNote + '\n' : ''}| ${L.colDate} | ${L.colOperation} | ${L.colAgents} | ${L.colAgentTokens} | ${L.colCost} | ${L.colSource} |
|---|---|---|---|---|---|
${wf.map(w => `| ${w.data} | ${mdEsc(w.operazione)} | ${w.agenti} | ${fmtTokWf(w)} | ${fmtCostoWf(w)} | ${mdEsc(w.fonte)} |`).join('\n')}
` : '';
  return `# ${nome} — ${L.projectSuffix}

${L.backToDashboard}

**${g.sess.length} ${L.sessionsWord}** ${L.from} ${g.primo} ${L.to} ${g.ultimo} · **${fmt(g.output)} ${L.outputWord}** ·
${fmt(g.input)} ${L.inputWord} · ${fmt(g.cacheR)} ${L.cacheReadWord} · ${fmt(g.msg)} ${L.messagesWord}${wfLine}

## ${L.sessionsHeader}
| ${L.colPeriod} | ${L.colOperation} | ${L.colModels} | ${L.colMsg} | ${L.colInput} | ${L.colOutput} | ${L.colCacheRead} | ${L.colCost} |
|---|---|---|---|---|---|---|---|
${sess.map(s => rigaSess(s, L)).join('\n')}
${wfSection}
${L.costPartialLegend}`;
};

for (const [nome, g] of ordGruppi) {
  const wf = workflow.filter(w => gruppoDi(w.prog) === nome);
  const sess = [...g.sess].sort((a, b) => String(a.primo).localeCompare(String(b.primo)));
  fs.writeFileSync(path.join(dirProg, slug(nome) + '.md'), renderProjectMD(nome, g, wf, sess, LANG.en));
  fs.writeFileSync(path.join(dirProgIT, slug(nome) + '.md'), renderProjectMD(nome, g, wf, sess, LANG.it));
}

// ---------- dashboard ----------
const T = { msg: 0, input: 0, output: 0, cacheR: 0, cacheW: 0, costo: 0, costoParziale: false };
for (const [, g] of ordGruppi) { T.msg += g.msg; T.input += g.input; T.output += g.output; T.cacheR += g.cacheR; T.cacheW += g.cacheW; T.costo += g.costo; T.costoParziale = T.costoParziale || g.costoParziale; }
// The '*' marker means exactly one thing: "some priced row had no verified price". The
// cloud-workflow exclusion is a SEPARATE declared limit, already spelled out in words in
// summaryLine3 — folding it into the same marker made the legend lie (final-review finding).
const totCostoParziale = T.costoParziale;

const totPer = sel => {
  const t = { msg: 0, input: 0, output: 0, cacheR: 0, costo: 0, costoParziale: false };
  for (const r of righe) if (sel(r)) { t.msg += r.msg; t.input += r.input; t.output += r.output; t.cacheR += r.cacheR; t.costo += r.costo; t.costoParziale = t.costoParziale || r.costoParziale; }
  return t;
};
const modelli = [...new Set(righe.map(r => r.mod))].map(m => ({ m, t: totPer(r => r.mod === m) })).sort((a, b) => b.t.output - a.t.output);
const mesi = [...new Set(righe.map(r => r.mese))].sort().map(m => ({ m, t: totPer(r => r.mese === m) }));

// top costs: sessions + workflows together, by output/agent tokens (selection/order is
// language-independent — only the display strings are picked per language at render time)
const top = [
  ...sessioni.map(s => ({ kind: 'chat', s, quando: s.primo, tok: s.output })),
  ...workflow.map(w => ({ kind: 'cloud', w, quando: w.data, tok: w.token })),
].sort((a, b) => b.tok - a.tok).slice(0, 8);

const topRow = (t, i, L) => {
  const tipo = t.kind === 'chat' ? L.typeChat : L.typeCloudAgents;
  const nome = t.kind === 'chat' ? `${descrizione(t.s, L)} — ${t.s.gruppo}` : `${t.w.operazione} — ${gruppoDi(t.w.prog)}`;
  // cloud rows: measured from local agent transcripts when available, '—' otherwise
  const costo = t.kind === 'chat' ? fmtCosto(t.s.costo, t.s.costoParziale) : fmtCostoWf(t.w);
  return `| ${i + 1} | ${mdEsc(nome)} | ${tipo} | ${t.quando} | ${t.kind === 'cloud' && t.w.stima ? '~' : ''}${fmt(t.tok)} | ${costo} |`;
};

const lezioniEN = fs.existsSync(fileLessons)
  ? fs.readFileSync(fileLessons, 'utf8').replace(/^# .*\n/, '').trim()
  : null;
const lezioniIT = fs.existsSync(fileLessonsIT)
  ? fs.readFileSync(fileLessonsIT, 'utf8').replace(/^# .*\n/, '').trim()
  : lezioniEN !== null
    ? `*(nota: \`LESSONS.md\` italiano non trovato in questa cartella — mostrata la versione inglese)*\n\n${lezioniEN}`
    : null;

const compPer = () => {
  const tot = costoTipi.inp + costoTipi.out + costoTipi.cR + costoTipi.cW;
  const pct = v => tot > 0 ? Math.round(v / tot * 100) : 0;
  return { cr: fmtUSD(costoTipi.cR), crPct: pct(costoTipi.cR), cw: fmtUSD(costoTipi.cW), cwPct: pct(costoTipi.cW),
           out: fmtUSD(costoTipi.out), outPct: pct(costoTipi.out), inp: fmtUSD(costoTipi.inp) };
};
const renderDashboard = (L, o) => `# ${L.dashboardTitle}

${L.headNote(new Date().toISOString().slice(0, 10))}

## ${L.atGlanceHeader}
${L.summaryLine1({ output: fmt(T.output), totW: (totWStima ? '~' : '') + fmt(totW), nSessions: sessioni.length, nProjects: ordGruppi.length, firstMonth: mesi[0]?.m || '?', msg: fmt(T.msg) })}
${L.summaryLine2({ cacheR: fmt(T.cacheR), ratio: Math.round(T.cacheR / (T.input + T.output)) })}
${L.summaryLine3({ totCosto: fmtCosto(T.costo, totCostoParziale), parziale: totCostoParziale, dataPrezzi })}
${L.summaryComp(compPer())}
${L.summaryWf({ usd: fmtUSD(totWfUsd), n: wfConMisura.length, tot: workflow.length })}

## ${L.expensiveHeader}
${L.rawDataNote ? L.rawDataNote + '\n' : ''}| ${L.colHash} | ${L.colWhat} | ${L.colType} | ${L.colWhen} | ${L.colTokens} | ${L.colCost} |
|---|---|---|---|---|---|
${top.map((t, i) => topRow(t, i, L)).join('\n')}

## ${L.lessonsHeader}
${o.lezioni ?? L.lessonsPlaceholder}

## ${L.byProjectHeader}
| ${L.colProject} | ${L.colPeriod} | ${L.colSessions} | ${L.colOutput} | ${L.colInput} | ${L.colCacheRead} | ${L.colCost} |
|---|---|---|---|---|---|---|
${ordGruppi.map(([nome, g]) => `| [${mdEsc(nome)}](${L.projectDir}/${slug(nome)}.md) | ${g.primo} → ${g.ultimo} | ${g.sess.length} | ${fmt(g.output)} | ${fmt(g.input)} | ${fmt(g.cacheR)} | ${fmtCosto(g.costo, g.costoParziale)} |`).join('\n')}

## ${L.cloudWorkHeader}
${L.cloudWorkNote}
${L.rawDataNote ? '\n' + L.rawDataNote : ''}

${L.wfMeasuredNote}

| ${L.colDate} | ${L.colProject} | ${L.colOperation} | ${L.colAgents} | ${L.colAgentTokens} | ${L.colCost} |
|---|---|---|---|---|---|
${workflow.map(w => `| ${w.data} | ${mdEsc(gruppoDi(w.prog))} | ${mdEsc(w.operazione)} | ${w.agenti} | ${fmtTokWf(w)} | ${fmtCostoWf(w)} |`).join('\n') || `| — | — | ${L.noneRegistered} | — | — | — |`}

## ${L.byModelHeader}
| ${L.colModel} | ${L.colMsg} | ${L.colInput} | ${L.colOutput} | ${L.colCacheRead} | ${L.colCost} |
|---|---|---|---|---|---|
${modelli.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} | ${fmtCosto(t.costo, t.costoParziale)} |`).join('\n')}

## ${L.byMonthHeader}
| ${L.colMonth} | ${L.colMsg} | ${L.colInput} | ${L.colOutput} | ${L.colCacheRead} | ${L.colCost} |
|---|---|---|---|---|---|
${mesi.map(({ m, t }) => `| ${m} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} | ${fmtCosto(t.costo, t.costoParziale)} |`).join('\n')}

## ${L.byWeekHeader}
${L.weekWindowNote(settimaneVista.length, settimaneOrdinate.length)}

| ${L.colWeek} | ${L.colMsg} | ${L.colInput} | ${L.colOutput} | ${L.colCacheRead} | ${L.colCost} |
|---|---|---|---|---|---|
${settimaneVista.map(([w, t]) => `| ${w} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} | ${fmtCosto(t.costo, t.costoParziale)} |`).join('\n')}

## ${L.byDayHeader}
${L.dayWindowNote(giorniVista.length, giorniOrdinati.length)}

| ${L.colDay} | ${L.colMsg} | ${L.colInput} | ${L.colOutput} | ${L.colCacheRead} | ${L.colCost} |
|---|---|---|---|---|---|
${giorniVista.map(([d, t]) => `| ${d} | ${fmt(t.msg)} | ${fmt(t.input)} | ${fmt(t.output)} | ${fmt(t.cacheR)} | ${fmtCosto(t.costo, t.costoParziale)} |`).join('\n')}

${L.costPartialLegend}
`;

fs.writeFileSync(path.join(dirOut, 'DASHBOARD.md'), renderDashboard(LANG.en, { lezioni: lezioniEN }));
fs.writeFileSync(path.join(dirOutIT, 'DASHBOARD.md'), renderDashboard(LANG.it, { lezioni: lezioniIT }));

// ---------- dashboard.html (same numbers, interactive: sortable tables + inline SVG bars) ----------
// Zero CDN / zero dependencies (same spirit as the rest of this script): everything —
// data, CSS, JS — is inlined in the file, so it works offline and needs no build step.
const mdLite = s => String(s)
  .replace(/^>\s?/gm, '')
  .replace(/^-\s+/gm, '')
  .replace(/\n\s*/g, ' ') // collapse newlines FIRST: bold/em spans can wrap across template lines
  .replace(/\\\*/g, '\x00') // protect markdown-escaped literal asterisks from the em/strong rules
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\x00/g, '*')
  .trim();
const tdN = (v, testo) => `<td data-v="${v}">${testo}</td>`;
const tdT = testo => `<td>${testo}</td>`;
const tdL = testo => `<td class="l">${testo}</td>`; // long wrapping description cell
const tabellaHTML = (titolo, headers, righeArr) => `<h3>${titolo}</h3>
<div class="tw"><table><thead><tr>${headers.map(h => `<th onclick="sortTable(this)">${h}</th>`).join('')}</tr></thead>
<tbody>${righeArr.map(r => `<tr>${r.join('')}</tr>`).join('')}</tbody></table></div>`;
// small inline SVG bar chart — no library, hover shows the exact value via <title> (tooltip)
const svgBarre = (dati, { w = 640, h = 180, colore = 'var(--accent)' } = {}) => {
  if (!dati.length) return '<p><em>—</em></p>';
  const max = Math.max(...dati.map(d => d.v), 0.0001);
  const padL = 8, padB = 22, padT = 8, padR = 8;
  const areaW = w - padL - padR, areaH = h - padT - padB;
  const bw = areaW / dati.length;
  const barre = dati.map((d, i) => {
    const bh = Math.max((d.v / max) * areaH, d.v > 0 ? 1 : 0);
    const x = padL + i * bw + bw * 0.15, y = padT + areaH - bh, bwReal = bw * 0.7;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bwReal.toFixed(1)}" height="${bh.toFixed(1)}" fill="${colore}" rx="2"><title>${mdEsc(d.l)}: ${mdEsc(d.t)}</title></rect>` +
      `<text x="${(x + bwReal / 2).toFixed(1)}" y="${h - 6}" font-size="10" text-anchor="middle" fill="currentColor">${mdEsc(d.l)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;height:auto" role="img" aria-label="bar chart">
<line x1="${padL}" y1="${padT + areaH}" x2="${w - padR}" y2="${padT + areaH}" stroke="currentColor" opacity="0.25"/>
${barre}</svg>`;
};

const renderDashboardHTML = (L, o) => {
  const modelRows = modelli.map(({ m, t }) => [tdT(mdEsc(m)), tdN(t.msg, fmt(t.msg)), tdN(t.input, fmt(t.input)), tdN(t.output, fmt(t.output)), tdN(t.cacheR, fmt(t.cacheR)), tdN(t.costo, fmtCosto(t.costo, t.costoParziale))]);
  const monthRows = mesi.map(({ m, t }) => [tdT(m), tdN(t.msg, fmt(t.msg)), tdN(t.input, fmt(t.input)), tdN(t.output, fmt(t.output)), tdN(t.cacheR, fmt(t.cacheR)), tdN(t.costo, fmtCosto(t.costo, t.costoParziale))]);
  const weekRows = settimaneVista.map(([w, t]) => [tdT(w), tdN(t.msg, fmt(t.msg)), tdN(t.input, fmt(t.input)), tdN(t.output, fmt(t.output)), tdN(t.cacheR, fmt(t.cacheR)), tdN(t.costo, fmtCosto(t.costo, t.costoParziale))]);
  const dayRows = giorniVista.map(([d, t]) => [tdT(d), tdN(t.msg, fmt(t.msg)), tdN(t.input, fmt(t.input)), tdN(t.output, fmt(t.output)), tdN(t.cacheR, fmt(t.cacheR)), tdN(t.costo, fmtCosto(t.costo, t.costoParziale))]);
  const projectRows = ordGruppi.map(([nome, g]) => [tdT(`<a href="${L.projectDir}/${slug(nome)}.md">${mdEsc(nome)}</a>`), tdT(`${g.primo} → ${g.ultimo}`), tdN(g.sess.length, g.sess.length), tdN(g.output, fmt(g.output)), tdN(g.input, fmt(g.input)), tdN(g.cacheR, fmt(g.cacheR)), tdN(g.costo, fmtCosto(g.costo, g.costoParziale))]);
  const topRows = top.map((t, i) => {
    const tipo = t.kind === 'chat' ? L.typeChat : L.typeCloudAgents;
    const nome = t.kind === 'chat' ? `${descrizione(t.s, L)} — ${t.s.gruppo}` : `${t.w.operazione} — ${gruppoDi(t.w.prog)}`;
    const costoTxt = t.kind === 'chat' ? fmtCosto(t.s.costo, t.s.costoParziale) : fmtCostoWf(t.w);
    return [tdN(i + 1, i + 1), tdL(mdEsc(nome)), tdT(tipo), tdT(t.quando), tdN(t.tok, fmt(t.tok)), tdN(t.kind === 'chat' ? t.s.costo : 0, costoTxt)];
  });
  const cloudRows = workflow.map(w => [tdT(w.data), tdT(mdEsc(gruppoDi(w.prog))), tdL(mdEsc(w.operazione)), tdN(w.agenti, w.agenti), tdN(w.token, fmtTokWf(w)), tdN(w.mis ? w.mis.usd : 0, fmtCostoWf(w))]);

  return `<!doctype html>
<html lang="${L === LANG.it ? 'it' : 'en'}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${mdEsc(L.dashboardTitle)}</title>
<style>
:root{--bg:#ffffff;--fg:#111827;--muted:#6b7280;--border:#e5e7eb;--accent:#6366f1;--accent2:#10b981;--card:#f9fafb;}
@media (prefers-color-scheme: dark){:root{--bg:#0b0f19;--fg:#e5e7eb;--muted:#9ca3af;--border:#243042;--accent:#818cf8;--accent2:#34d399;--card:#111827;}}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;margin:0;padding:24px;line-height:1.55;max-width:1000px}
h1{font-size:1.4rem;margin:0 0 8px} h2{font-size:1.1rem;margin:32px 0 4px;border-bottom:1px solid var(--border);padding-bottom:6px} h3{font-size:0.95rem;color:var(--muted);margin:18px 0 6px}
p{margin:6px 0} .note{color:var(--muted);font-size:13px}
.card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px 16px;margin:10px 0}
.tw{overflow-x:auto}
table{border-collapse:collapse;width:100%;font-size:13.5px;margin:4px 0 18px}
th,td{padding:5px 9px;border-bottom:1px solid var(--border);text-align:right;white-space:nowrap}
/* long description cells (operation titles, workflow notes) wrap instead of forcing a
   kilometre-wide table layer — numbers/dates stay nowrap (final visual check) */
td.l{white-space:normal;min-width:22em;text-align:left}
th:first-child,td:first-child{text-align:left}
th{cursor:pointer;user-select:none;color:var(--muted);font-weight:600} th:hover{color:var(--fg)}
a{color:var(--accent)}
.charts{display:flex;flex-wrap:wrap;gap:24px}
.charts>div{flex:1 1 300px}
footer{margin-top:32px;color:var(--muted);font-size:12px}
</style>
</head><body>
<h1>${mdEsc(L.dashboardTitle)}</h1>
<p class="note">${mdLite(L.headNote(o.data))}</p>

<h2>${L.atGlanceHeader}</h2>
<div class="card">
<p>${mdLite(L.summaryLine1({ output: fmt(T.output), totW: (totWStima ? '~' : '') + fmt(totW), nSessions: sessioni.length, nProjects: ordGruppi.length, firstMonth: mesi[0]?.m || '?', msg: fmt(T.msg) }))}</p>
<p>${mdLite(L.summaryLine2({ cacheR: fmt(T.cacheR), ratio: Math.round(T.cacheR / (T.input + T.output)) }))}</p>
<p>${mdLite(L.summaryLine3({ totCosto: fmtCosto(T.costo, totCostoParziale), parziale: totCostoParziale, dataPrezzi }))}</p>
<p>${mdLite(L.summaryComp(compPer()))}</p>
<p>${mdLite(L.summaryWf({ usd: fmtUSD(totWfUsd), n: wfConMisura.length, tot: workflow.length }))}</p>
</div>

<h2>${L.byMonthHeader} / ${L.byWeekHeader}</h2>
<div class="charts">
<div><h3>${L.byMonthHeader} — ${L.colOutput}</h3>${svgBarre(mesi.map(({ m, t }) => ({ l: m, v: t.output, t: fmt(t.output) })), { colore: 'var(--accent)' })}</div>
<div><h3>${L.byWeekHeader} — ${L.colCost}</h3>${svgBarre(settimaneVista.map(([w, t]) => ({ l: w, v: t.costo, t: fmtCosto(t.costo, t.costoParziale) })), { colore: 'var(--accent2)' })}</div>
</div>

<h2>${L.expensiveHeader}</h2>
${tabellaHTML('', [L.colHash, L.colWhat, L.colType, L.colWhen, L.colTokens, L.colCost], topRows)}

<h2>${L.byProjectHeader}</h2>
${tabellaHTML('', [L.colProject, L.colPeriod, L.colSessions, L.colOutput, L.colInput, L.colCacheRead, L.colCost], projectRows)}

<h2>${L.cloudWorkHeader}</h2>
<p class="note">${mdLite(L.cloudWorkNote)}</p>
<p class="note">${mdLite(L.wfMeasuredNote)}</p>
${cloudRows.length ? tabellaHTML('', [L.colDate, L.colProject, L.colOperation, L.colAgents, L.colAgentTokens, L.colCost], cloudRows) : `<p class="note">${L.noneRegistered}</p>`}

<h2>${L.byModelHeader}</h2>
${tabellaHTML('', [L.colModel, L.colMsg, L.colInput, L.colOutput, L.colCacheRead, L.colCost], modelRows)}

<h2>${L.byMonthHeader}</h2>
${tabellaHTML('', [L.colMonth, L.colMsg, L.colInput, L.colOutput, L.colCacheRead, L.colCost], monthRows)}

<h2>${L.byWeekHeader}</h2>
<p class="note">${mdLite(L.weekWindowNote(settimaneVista.length, settimaneOrdinate.length))}</p>
${tabellaHTML('', [L.colWeek, L.colMsg, L.colInput, L.colOutput, L.colCacheRead, L.colCost], weekRows)}

<h2>${L.byDayHeader}</h2>
<p class="note">${mdLite(L.dayWindowNote(giorniVista.length, giorniOrdinati.length))}</p>
${tabellaHTML('', [L.colDay, L.colMsg, L.colInput, L.colOutput, L.colCacheRead, L.colCost], dayRows)}

<p class="note">${mdLite(L.costPartialLegend)}</p>
<footer><a href="DASHBOARD.md">DASHBOARD.md</a> · <a href="SCHEMA.md">SCHEMA.md</a> · <a href="usage.csv">usage.csv</a> · <a href="sessions.csv">sessions.csv</a> · <a href="daily.csv">daily.csv</a> · <a href="prices.csv">prices.csv</a></footer>

<script>
function sortTable(th){
  var table = th.closest('table');
  var idx = Array.prototype.indexOf.call(th.parentNode.children, th);
  var tbody = table.tBodies[0];
  var rows = Array.prototype.slice.call(tbody.rows);
  var asc = th.dataset.asc !== '1';
  rows.sort(function(a, b){
    var ac = a.cells[idx], bc = b.cells[idx];
    var av = ac.dataset.v !== undefined ? parseFloat(ac.dataset.v) : ac.textContent;
    var bv = bc.dataset.v !== undefined ? parseFloat(bc.dataset.v) : bc.textContent;
    var an = parseFloat(av), bn = parseFloat(bv);
    var cmp = (!isNaN(an) && !isNaN(bn) && ac.dataset.v !== undefined) ? an - bn : String(av).localeCompare(String(bv));
    return asc ? cmp : -cmp;
  });
  rows.forEach(function(r){ tbody.appendChild(r); });
  Array.prototype.forEach.call(th.parentNode.children, function(h){ h.dataset.asc = ''; });
  th.dataset.asc = asc ? '1' : '0';
}
</script>
</body></html>
`;
};

fs.writeFileSync(path.join(dirOut, 'dashboard.html'), renderDashboardHTML(LANG.en, { data: new Date().toISOString().slice(0, 10) }));
fs.writeFileSync(path.join(dirOutIT, 'dashboard.html'), renderDashboardHTML(LANG.it, { data: new Date().toISOString().slice(0, 10) }));

console.log(`OK: ${dirs.length} folders, ${ordGruppi.length} projects, ${sessioni.length} sessions, ${vistiMsg.size} unique messages.`);
console.log('Written: DASHBOARD.md, dashboard.html, per-project/ (' + ordGruppi.length + ' files), usage.csv, sessions.csv, daily.csv');
console.log('Written (Italian mirror): ' + dirOutIT.replace(/\\/g, '/') + '/DASHBOARD.md, dashboard.html, per-progetto/ (' + ordGruppi.length + ' files)');
console.log('Redaction legend (LOCAL, do not commit):', fileCensura);
console.log(dataPrezzi ? `Prices loaded from ${filePrezzi.replace(/\\/g, '/')} (verified ${dataPrezzi})` : `No prices.csv found at ${filePrezzi.replace(/\\/g, '/')} — all costs will show as unknown ('—')`);
