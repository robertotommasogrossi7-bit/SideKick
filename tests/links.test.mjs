// Link checker for all tracked Markdown files: every relative [text](target) link must
// point to a file or folder that exists. External links (http/mailto) and pure anchors
// are skipped. This exists because the 2026-07 English rename broke at least one link.
// File list comes from `git ls-files` when a git checkout is available, with a filesystem
// fallback otherwise: GitHub's "Download ZIP" artifact has no .git, and the suite must
// pass there too (external red-team finding, 2026-07-31: the zip crashed at 19/20).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Filesystem fallback for the no-git case: walk the tree, skipping what .gitignore
// would skip. Keep SKIP_DIRS and isLocalOnly in sync with .gitignore.
const SKIP_DIRS = new Set(['.git', 'node_modules', 'old', '_test', '.venv', 'venv', '__pycache__', 'dist']);
const isLocalOnly = f => f === 'OSSERVATORIO.md' || f.endsWith('.local.md');
function walkMarkdownFiles() {
  const out = [];
  const walk = rel => {
    for (const e of fs.readdirSync(path.join(repo, rel), { withFileTypes: true })) {
      const relPath = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(relPath); }
      else if (e.name.endsWith('.md') && !isLocalOnly(relPath)) out.push(relPath);
    }
  };
  walk('');
  return out;
}

function listMarkdownFiles() {
  try {
    return execFileSync('git', ['ls-files', '*.md'], { cwd: repo, encoding: 'utf8' })
      .trim().split('\n').filter(Boolean);
  } catch {
    return walkMarkdownFiles();
  }
}

const files = listMarkdownFiles();

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

test('no-git fallback (Download ZIP scenario) finds the same core docs and skips local-only files', () => {
  // exercised on every run, not just when .git is absent
  const walked = new Set(walkMarkdownFiles());
  for (const a of ['README.md', 'FINDINGS.md', 'observatory/PLAN.md']) {
    assert.ok(walked.has(a), `${a} missing from the fallback walk`);
  }
  assert.ok(!walked.has('OSSERVATORIO.md'), 'local-only file must be skipped');
  assert.ok(![...walked].some(f => f.endsWith('.local.md')), 'local registries must be skipped');
});
