# PLAN — steps agreed on 2026-07-16 (for upcoming sessions)

> Decided with Roberto in the observatory chat. Recommended order top to bottom.
> Check off when done.

## 1. Method master in the repo — ✅ DONE 2026-07-16
- [x] The source of truth is `plugins/metodo/COSTITUZIONE.md` (v1.5); `~/.claude/CLAUDE.md` is
      the **mirror** regenerated from the master.
- [x] Protected mirror: `deny` rule on Edit/Write of `~/.claude/CLAUDE.md` in
      `~/.claude/settings.json` (every chat reads it, none touches it).
- [x] The observatory ritual compares mirror ↔ master and flags drift.

## 2. CONSTITUTION update — v1.5 DONE 2026-07-16, foreign copies remain
- [x] Data contract integrated (chat titles · ESPERIMENTI · Observed outcome · workflow.csv ·
      automatic consumption) + handoff-with-numbers rule (cache/window) + Spec Kit section.
- [x] Spec Kit drop-in `plugins/metodo/spec-kit/constitution.md` realigned (v1.5.0,
      new principles VIII-XI).
- [x] `CONSTITUTION.md` (English, stuck at ~v1.0): translate the full v1.5 —
      **task for a Sonnet chat, effort high** (scoped translation) — DONE 2026-07-17
      (this translation).
- [ ] `spec-kit-metodo` repo: copy the v1.5.0 constitution just translated/verified.

## 3. GitHub repositioning — line UPDATED by the 2026-07-16 red team
Double red team (Claude+ChatGPT) done: verdicts and verifications in
`osservatorio/redteam/VERDICTS.md`. New line: **not "method laboratory"
but "case study with real data + reusable tools"** — the method is an appendix.
- [x] External pre-publication red team (2026-07-16) + verifications at the source + fixes.
- [x] Root README in ENGLISH (2026-07-16): (1) what you take away — tool + dataset + FINDINGS —
      (2) the laboratory — (3) method in appendix as "operating hypotheses". Italian facade
      in `versione-italiano/LEGGIMI.md`; Italian docs (GUIDA, glossary, library, engine,
      OSSERVATORIO, CONTRIBUIRE) moved to `versione-italiano/`.
- [x] Roberto's decisions (2026-07-16): (a) progetto-15 stays as-is, reassessed at launch;
      (b) Spotify rule → reworded as "industry leader" in the CONSTITUTION.
- [ ] GitHub repo description + topics (claude-code, spec-kit, token-usage, case-study…).
- [ ] Budget from here on: ~80% experiments / 20% method maintenance (ROI verdict).

## 4. Alignment with GitHub Spec Kit (study, then decisions)
Why: they're further ahead on organization, and speaking their language makes SideKick
interesting for those who already use Spec Kit.
- [ ] Study the spec-kit repo structure (local clone in `Programmi/spec-kit`):
      `.specify/memory/` (constitution), templates (spec/plan/tasks), commands.
- [ ] Map our artifacts onto their concepts (COSTITUZIONE→constitution;
      mini-spec→spec template; roadmap/phases→plan/tasks) and adopt what's worthwhile.
- [ ] Keep the `plugins/metodo/spec-kit/` drop-in always in sync with the master (point 2).

## 5. Consumption data — possible evolutions (as the data grows)
- [ ] Lightweight METRICHE.md for progetto-15, if we want to save the full-vs-incremental A/B.
- [ ] Add the estimated API cost-equivalent per model to the report (with prices
      verified at the source, never from memory).
- [ ] Move from CSV to SQLite once rows are counted in the hundreds (trivial migration).

## 6. Workshop block (from red team round 2 — dedicated Sonnet session, effort high)
Ordered by ROI (reviewers' consensus):
- [ ] Dashboard screenshot in the README (the most sellable artifact is invisible today).
- [ ] CI (GitHub Actions) with badge: run script tests on push — the constitution preaches
      "CI from day one" and this repo lacks it.
- [ ] 2–3 tests for `consumo.mjs` / `misura-token.mjs` (JSONL parsing on a fixture).
- [ ] English CONTRIBUTING.md (FINDINGS invites participation in English; the guide is Italian).
- [ ] Full "operating hypotheses" tone pass on CONSTITUTION/COSTITUZIONE (soften NEVER/ALWAYS,
      N next to each claim).
- [ ] De-Claude sweep: frame as AI-assisted software engineering throughout (Claude = current
      instrument).
- [ ] Dataset release/tag (v0.1) + documented CSV schema (columns, units).
- [ ] MANUAL (Roberto): repo description + topics on GitHub; decide on username rename.
