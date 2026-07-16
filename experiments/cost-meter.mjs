// Misura l'effort dei bracci di un test leggendo i transcript di Claude Code.
// Uso: node misura-token.mjs <regex-filtro-progetto>   (default: migr-test)
import fs from 'fs';
import path from 'path';

const filter = new RegExp(process.argv[2] || 'migr-test', 'i');
const base = path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'projects');

if (!fs.existsSync(base)) { console.log('NESSUNA cartella projects:', base); process.exit(0); }

const dirs = fs.readdirSync(base).filter(d => filter.test(d));
if (!dirs.length) { console.log('Nessun progetto che matcha', filter); process.exit(0); }

const rows = [];
for (const d of dirs) {
  const dir = path.join(base, d);
  let turns = 0, out = 0, inp = 0, cr = 0, cc = 0, files = 0, tools = 0, userMsgs = 0;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.jsonl'))) {
    files++;
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n').filter(Boolean);
    for (const ln of lines) {
      let o; try { o = JSON.parse(ln); } catch { continue; }
      const msg = o?.message;
      const u = msg?.usage || o?.usage;
      const isAsst = o?.type === 'assistant' || msg?.role === 'assistant';
      if (isAsst && u) {
        turns++;
        out += u.output_tokens || 0;
        inp += u.input_tokens || 0;
        cr += u.cache_read_input_tokens || 0;
        cc += u.cache_creation_input_tokens || 0;
        const content = Array.isArray(msg?.content) ? msg.content : [];
        tools += content.filter(c => c?.type === 'tool_use').length;
      }
      if ((o?.type === 'user' || msg?.role === 'user') && !Array.isArray(msg?.content)?.some?.(c=>c?.type==='tool_result')) userMsgs++;
    }
  }
  rows.push({ progetto: d, files, turns, tool_calls: tools, out_tok: out, in_tok: inp + cr + cc });
}
rows.sort((a, b) => a.progetto.localeCompare(b.progetto));
console.table(rows);
console.log('\nNota: out_tok = token generati (proxy dello sforzo di ragionamento);',
  'in_tok = input totale incl. cache (proxy del contesto processato);',
  'tool_calls = azioni; turns = messaggi assistant.');
