// Tests for experiments/cost-meter.mjs — runs the real script against a JSONL fixture
// posing as a user home (tests/fixtures/cost-meter-home/.claude/projects), selected by
// overriding USERPROFILE/HOME in the child env: the script has no --base flag on purpose
// (it is a quick effort meter for A/B arms, not the accounting tool — that is usage.mjs).
// Known simplification, deliberately NOT asserted away: the meter does not dedup by
// message.id, so resumed/forked transcripts count their replayed messages again.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const script = path.join(repo, 'experiments', 'cost-meter.mjs');
const home = path.join(repo, 'tests', 'fixtures', 'cost-meter-home');

function run(args = [], homeDir = home) {
  return execFileSync(process.execPath, [script, ...args], {
    encoding: 'utf8',
    env: { ...process.env, USERPROFILE: homeDir, HOME: homeDir },
  });
}

test('default filter (migr-test): one row with the fixture totals', () => {
  const out = run();
  // fixture: 2 assistant turns WITH usage (a third has none and a line is broken JSON —
  // both must be skipped): out = 200+20, in = (100+10) + 1000 cache-read + 50 cache-write,
  // tool_calls = 2, files = 1. Columns: progetto | files | turns | tool_calls | out_tok | in_tok
  assert.match(out, /'C--demo-migr-test-alpha'\s*│\s*1\s*│\s*2\s*│\s*2\s*│\s*220\s*│\s*1160\s*│/,
    'row totals must match the hand-computed fixture numbers');
  assert.match(out, /out_tok = tokens generated/, 'the reading-key note is printed');
});

test('projects that do not match the filter are excluded', () => {
  const out = run();
  assert.ok(!out.includes('altro-progetto'), 'non-matching project dir must not appear');
  assert.ok(!out.includes('999'), 'its tokens must not leak into the table');
});

test('the argv filter selects other projects (case-insensitive regex)', () => {
  const out = run(['ALTRO']);
  assert.match(out, /'C--demo-altro-progetto'\s*│\s*1\s*│\s*1\s*│\s*1\s*│\s*999\s*│\s*1\s*│/);
  assert.ok(!out.includes('migr-test-alpha'));
});

test('no matching project: friendly message, clean exit', () => {
  const out = run(['progetto-che-non-esiste']);
  assert.match(out, /Nessun progetto che matcha/);
});

test('missing ~/.claude/projects: friendly message, clean exit', () => {
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'sidekick-costmeter-'));
  const out = run([], empty);
  assert.match(out, /NESSUNA cartella projects/);
});
