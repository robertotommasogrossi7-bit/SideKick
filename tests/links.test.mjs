// Link checker for all tracked Markdown files: every relative [text](target) link must
// point to a file or folder that exists. External links (http/mailto) and pure anchors
// are skipped. This exists because the 2026-07 English rename broke at least one link.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// DOSSIER.md is a paste-artifact (files concatenated for external red-team chats):
// its inherited relative links are not meant to resolve from its location.
const EXCLUDE = ['versione-italiano/osservatorio/redteam/DOSSIER.md'];
const files = execFileSync('git', ['ls-files', '*.md'], { cwd: repo, encoding: 'utf8' })
  .trim().split('\n').filter(Boolean).filter(f => !EXCLUDE.includes(f));

const broken = [];
for (const f of files) {
  const dir = path.dirname(path.join(repo, f));
  const testo = fs.readFileSync(path.join(repo, f), 'utf8');
  // markdown links [..](target) — skip images' outer ! automatically (same syntax)
  for (const m of testo.matchAll(/\]\(([^)\s]+)\)/g)) {
    let target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    target = decodeURI(target.split('#')[0]);
    if (!target) continue;
    if (!fs.existsSync(path.resolve(dir, target))) broken.push(`${f} -> ${m[1]}`);
  }
}

test('all relative Markdown links point to existing files', () => {
  assert.deepEqual(broken, []);
});
