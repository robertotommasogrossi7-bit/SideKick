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

const out = fs.mkdtempSync(path.join(os.tmpdir(), 'sidekick-usage-'));
execFileSync(process.execPath, [script, '--base', fixture, '--out', out], { encoding: 'utf8' });

const usageCsv = fs.readFileSync(path.join(out, 'usage', 'usage.csv'), 'utf8').trim().split('\n');
const sessionsCsv = fs.readFileSync(path.join(out, 'usage', 'sessions.csv'), 'utf8').trim().split('\n');
const dashboard = fs.readFileSync(path.join(out, 'usage', 'DASHBOARD.md'), 'utf8');
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
  assert.ok(usageCsv.some(r => r.includes('opus-4-8') && r.endsWith(',10,20,0,0')));
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
  assert.match(dashboard, /\| 2026-07 \| 2 \| 110 \| 220 \| 1k \|/); // month,msgs,in,out,cacheR
  assert.match(dashboard, /\*\*220 output tokens\*\*/);
});
