// Tests for observatory/usage.mjs — runs the real script against a small JSONL fixture
// in an isolated output dir, then checks the numbers that matter:
// dedup by message.id, redaction of unknown projects, model/token totals, session titles.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const script = path.join(repo, 'observatory', 'usage.mjs');
const fixture = path.join(repo, 'tests', 'fixtures', 'projects');
// Fixture prices.csv on purpose prices ONLY sonnet-5 (round numbers, easy to check by hand)
// and leaves opus-4-8 unpriced, so the tests also cover the "no verified price" path
// (cost_partial=true, never an invented number — see costoMessaggio/fmtCosto in usage.mjs).
const prezzi = path.join(repo, 'tests', 'fixtures', 'prices.csv');

const out = fs.mkdtempSync(path.join(os.tmpdir(), 'sidekick-usage-'));
// --out-it keeps the Italian mirror inside the same scratch dir — otherwise the script's
// default (repo-root/ITALIANO next to --out) would land outside it since --out is a tmpdir.
const outIT = path.join(out, 'ITALIANO', 'osservatorio', 'uso');
// a hand-kept workflow register whose `source` cites the fixture wf id: the script must
// price it from the fixture agent transcript (growing-usage records -> last one wins)
fs.mkdirSync(path.join(out, 'usage'), { recursive: true });
fs.writeFileSync(path.join(out, 'usage', 'workflow.csv'),
  'date,project,operation,agents,agent_tokens,source,5h_windows,estimated\n' +
  '2026-07-01,demo,"Fixture wf run",1,300,"transcript wf_fixt01",,\n' +
  // estimated=yes: report-estimated tokens, must be ~-prefixed and taint the cloud total
  '2026-07-02,demo,"Estimated cloud run",2,4000,"report only",,yes\n');
execFileSync(process.execPath, [script, '--base', fixture, '--out', out, '--out-it', outIT, '--prices', prezzi], { encoding: 'utf8' });

const usageCsv = fs.readFileSync(path.join(out, 'usage', 'usage.csv'), 'utf8').trim().split('\n');
const sessionsCsv = fs.readFileSync(path.join(out, 'usage', 'sessions.csv'), 'utf8').trim().split('\n');
const dailyCsv = fs.readFileSync(path.join(out, 'usage', 'daily.csv'), 'utf8').trim().split('\n');
const dashboard = fs.readFileSync(path.join(out, 'usage', 'DASHBOARD.md'), 'utf8');
const dashboardHTML = fs.readFileSync(path.join(out, 'usage', 'dashboard.html'), 'utf8');
const legend = JSON.parse(fs.readFileSync(path.join(out, 'censura.local.json'), 'utf8'));

test('duplicated message.id is counted once (resume/fork dedup)', () => {
  // fixture has msg_A twice (100 in / 200 out) + msg_B once (10 in / 20 out)
  const sonnet = usageCsv.find(r => r.includes('sonnet-5'));
  assert.ok(sonnet, 'sonnet row exists');
  const [, , , messages, input, output] = sonnet.split(',');
  assert.equal(Number(messages), 1);
  assert.equal(Number(input), 100);
  assert.equal(Number(output), 200);
});

test('synthetic model rows are ignored, real models each get a row', () => {
  assert.equal(usageCsv.filter(r => r.includes('<synthetic>')).length, 0);
  assert.ok(usageCsv.some(r => r.includes('opus-4-8') && r.endsWith(',10,20,0,0,0.000000,true')));
});

test('cost is computed from prices.csv at the message model+date (known-number fixture)', () => {
  // fixture prices.csv: sonnet-5 = $2/$10/$0.2/$2.5 per MTok (in/out/cache-read/cache-write).
  // aggregated sonnet-5 row: 100 in, 200 out, 1000 cache-read, 50 cache-write (dedup applied).
  // cost = (100*2 + 200*10 + 1000*0.2 + 50*2.5) / 1e6 = (200+2000+200+125)/1e6 = 0.002525
  const sonnetRow = usageCsv.find(r => r.includes('sonnet-5'));
  const cols = sonnetRow.split(',');
  assert.equal(cols[8], '0.002525', 'exact cost from the known fixture prices, not an estimate');
  assert.equal(cols[9], 'false', 'sonnet-5 has a verified price in the fixture -> not partial');
});

test('a model missing from prices.csv contributes $0 and marks the row partial (never invented)', () => {
  // fixture prices.csv deliberately has NO row for opus-4-8
  const opusRow = usageCsv.find(r => r.includes('opus-4-8'));
  const cols = opusRow.split(',');
  assert.equal(cols[8], '0.000000');
  assert.equal(cols[9], 'true');
});

test('unknown projects are born redacted, with alias and hidden title', () => {
  const entry = Object.values(legend)[0];
  assert.equal(entry.pubblico, false);
  assert.match(entry.alias, /^progetto-\d+$/);
  assert.ok(!sessionsCsv[1].includes('Demo/Fase_1'), 'session title must be hidden');
  assert.ok(sessionsCsv[1].includes('(redacted)'));
  assert.ok(!dashboard.includes('progetto-segreto'), 'real folder name must not leak');
});

test('dashboard totals add up (live tokens = input+output of unique messages)', () => {
  // month,msgs,in,out,cacheR,cost — the month mixes sonnet-5 (priced) + opus-4-8 (unpriced),
  // so the total cost is the known partial sum ($0.0025 from sonnet-5 only) marked with '*'
  assert.match(dashboard, /\| 2026-07 \| 2 \| 110 \| 220 \| 1k \| \$0\.0025\* \|/);
  assert.match(dashboard, /\*\*220 output tokens\*\*/);
});

test('dashboard states the cost disclaimer: API-equivalent, not what the plan bills', () => {
  assert.match(dashboard, /API cost-equivalent/);
  assert.match(dashboard, /NOT what is actually billed/);
  assert.ok(dashboard.includes('2026-07-25'), 'the prices.csv verified_date is surfaced');
});

test('daily.csv has one row per calendar day, folding all projects/models together', () => {
  assert.ok(dailyCsv[0].startsWith('date,messages,input_tokens,output_tokens,cache_read,cache_written,cost_usd_equiv,cost_partial'));
  const day1 = dailyCsv.find(r => r.startsWith('2026-07-01,'));
  const day2 = dailyCsv.find(r => r.startsWith('2026-07-02,'));
  assert.equal(day1, '2026-07-01,1,100,200,1000,50,0.002525,false');
  assert.equal(day2, '2026-07-02,1,10,20,0,0,0.000000,true');
});

test('dashboard has By week and By day sections', () => {
  assert.match(dashboard, /## By week/);
  assert.match(dashboard, /## By day/);
});

test('dashboard.html is a self-contained sortable page with the same cost figure', () => {
  assert.ok(dashboardHTML.startsWith('<!doctype html>'));
  assert.ok(dashboardHTML.includes('function sortTable'), 'tables are click-sortable, inline JS, no CDN');
  assert.ok(!dashboardHTML.includes('cdn.'), 'zero CDN dependency');
  assert.ok(dashboardHTML.includes('$0.0025'), 'same cost figure as the Markdown dashboard');
  assert.ok(dashboardHTML.includes('prefers-color-scheme'), 'dark/light aware');
});

test('Italian mirror: same numbers, translated labels, redaction preserved', () => {
  const dashboardIT = fs.readFileSync(path.join(outIT, 'DASHBOARD.md'), 'utf8');
  assert.match(dashboardIT, /\| 2026-07 \| 2 \| 110 \| 220 \| 1k \| \$0\.0025\* \|/, 'same numbers as the English dashboard');
  assert.match(dashboardIT, /\*\*220 token di output\*\*/, 'template strings are translated');
  assert.ok(dashboardIT.includes('## Colpo d\'occhio'), 'section headers are translated');
  assert.ok(!dashboardIT.includes('progetto-segreto'), 'real folder name must not leak in the Italian mirror either');
  assert.ok(dashboardIT.includes('(oscurato)'), 'redaction placeholder is translated');
  assert.ok(dashboardIT.includes('../../../observatory/usage/usage.csv'), 'CSV links point at the English originals');
  assert.match(dashboardIT, /Costo API-equivalente/, 'the cost disclaimer is translated too');
});

test('Italian mirror: per-progetto drilldown exists with translated table headers', () => {
  const dirProgIT = path.join(outIT, 'per-progetto');
  const files = fs.readdirSync(dirProgIT);
  assert.ok(files.length > 0, 'at least one per-progetto file was written');
  const testo = fs.readFileSync(path.join(dirProgIT, files[0]), 'utf8');
  assert.ok(testo.includes('| Periodo | Operazione | Modelli |'), 'session table header is translated');
});

test('workflow cost is measured from local agent transcripts, last record per id wins', () => {
  // fixture agent transcript has the SAME message.id twice with GROWING usage (streaming
  // snapshots): 100in/5out then 100in/200out. Only the last must be priced:
  // (100*2 + 200*10)/1e6 = 0.0022 -> "$0.0022" (sonnet-5 fixture prices).
  assert.ok(dashboard.includes('$0.0022'), 'measured workflow cost from the FINAL snapshot');
  assert.ok(!dashboard.includes('$0.0032'), 'first+last summed would be 0.00305-ish: must not happen');
  assert.match(dashboard, /measured from local transcripts: \$0\.0022 across 1 of 2/);
});

test('estimated workflow rows are marked ~ and taint every total they enter', () => {
  assert.match(dashboard, /\| Estimated cloud run \| 2 \| ~4k \| — \|/,
    'estimated row: ~-prefixed tokens, no invented cost');
  assert.match(dashboard, /\+ \*\*~4k\*\* from cloud agents/,
    'a cloud total containing an estimate is ~-prefixed too');
  assert.match(dashboard, /\| Fixture wf run \| 1 \| 300 \| /,
    'measured rows stay unprefixed');
});

test('cost composition line is present and consistent in both languages', () => {
  assert.ok(dashboard.includes('Where the API-equivalent goes'), 'EN composition line');
  const dashIT = fs.readFileSync(path.join(outIT, 'DASHBOARD.md'), 'utf8');
  assert.ok(dashIT.includes("Dove va l'equivalente API"), 'IT composition line');
});
