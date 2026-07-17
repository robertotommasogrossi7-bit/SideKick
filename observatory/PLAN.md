# PLAN — the single ordered backlog (updated 2026-07-17)

> Decided with Roberto in the observatory chat. **The backlog below is THE list**: work top
> to bottom, check off when done. History of completed phases at the bottom.

## NEXT — ordered backlog (value ÷ effort, post Spec Kit study)

1. [ ] **Fix the two published claims about Spec Kit** (from the double-run study, both
       verified at the source): (a) "constitution is read-once and passive" is FALSE — it is
       loaded by every core command and gates `/analyze` as automatically-CRITICAL;
       (b) "a method ships as a drop-in, not a preset" was true until Spec Kit v0.12.15
       (2026-07-14), which lets a preset seed the constitution verbatim. Fix in FINDINGS.md,
       `plugins/metodo/spec-kit/README.md`, and the "Kinship" section of both constitutions —
       **showing the dated correction**, not hiding it.
2. [ ] **Fix the three repo bugs** found by the study: CI runs a hardcoded single test file
       (new tests would silently never run); CONTRIBUTING claims `cost-meter.mjs` has tests
       (it doesn't); CLAUDE.md still says `consumo/`.
3. [ ] **Method CHANGELOG + git tag** (`plugins/metodo/CHANGELOG.md`, tag `metodo-v1.5`):
       a self-amending constitution with no amendment history asserts evolution without
       evidence. Hand-written, one line per amendment.
4. [ ] **markdownlint + link checker in CI**: the repo is ~90% prose and ≥1 cross-folder link
       broke in the rename; today the badge certifies only the JS. (Copy Spec Kit's lint
       escape hatches; adopt the link-check principle, not their config.)
5. [ ] **CSV data dictionary** (`observatory/usage/SCHEMA.md`): the headline dataset ships
       with no column/units documentation.
6. [ ] **Drop-in cleanup** (`plugins/metodo/spec-kit/constitution.md`): move the top HTML
       comment to the README (it squats on the slot where `/speckit.constitution` writes its
       Sync Impact Report); remove leaked `_processo/*` Italian paths from the
       "depersonalized" variant; fix Governance for forks (on adoption, the fork is the
       master); soften vendor-specific Principle IX for their ~30-integration ecosystem.
7. [ ] **Tests for `cost-meter.mjs`** (fixture-based, like usage.mjs) — then the CONTRIBUTING
       sentence becomes true again in its stronger form.
8. [ ] **"Operating hypotheses" tone pass** on CONSTITUTION/COSTITUZIONE: soften NEVER/ALWAYS
       into hypotheses with N; link claims to `observatory/STRATEGIES.md`.
9. [ ] **Update the spec-kit clone and TEST the preset path empirically** (`specify init`
       with a preset on ≥0.12.15, diff `.specify/memory/constitution.md`): only then decide
       whether to ship `plugins/metodo/spec-kit/preset.yml` alongside the drop-in. Also copy
       the current constitution to the `spec-kit-metodo` repo.
10. [ ] **De-Claude sweep** of remaining docs (README title/intro already reframed to
        "AI coding agent").
11. [ ] **Dataset release v0.1** (git tag + release notes) once the SCHEMA.md exists.
12. [ ] **MANUAL (Roberto)**: repo description + topics on GitHub; decide on username rename.
13. [ ] Later, data-driven: METRICHE for progetto-15 (full-vs-incremental A/B) · API
        cost-equivalent per model (prices verified at source) · CSV→SQLite at hundreds of
        rows · ccusage-as-input if its exports ever cover redaction + per-operation needs.

**Open decision (Roberto)**: keep `versione-italiano/` as frozen originals + live LEGGIMI
(observatory recommendation: yes — a live full mirror means translating every change twice
and the two dashboards already drifted apart within a day), or invest in a live mirror.

## Done (compressed history)
- **2026-07-16** — Method master in repo + read-only mirror with deny rule · COSTITUZIONE
  v1.5 (data contract, handoff economics, Spec Kit kinship) · red team round 1 → repository
  repositioned as "case study with real data + reusable tools" (verdicts in
  `redteam/VERDICTS.md`) · progetto-15 kept generic; Spotify rule generalized.
- **2026-07-17** — Full English facade (11 docs translated incl. CONSTITUTION v1.5; Italian
  originals frozen in `versione-italiano/`) · red team round 2 worked (ccusage claim
  rewritten, N=2 degraded, sources linked, 21 FROZEN banners) · English names everywhere
  (`observatory/`, `experiments/`, `usage/`…) · tests (4 green) + CI badge + English
  CONTRIBUTING + real screenshots in README · glossary removed from public · **Spec Kit
  double-run study** (Opus ×2 — first Table-2 data point: union > single run; reports in
  scratchpad `speckit-run-A/B.md`).
