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
3. [x] **Method CHANGELOG + git tag** — DONE 2026-07-17: `plugins/metodo/CHANGELOG.md`
       (v1.0→v1.5.1, incl. one honestly-recorded unversioned amendment) + tag `metodo-v1.5`.
4. [~] **Link checker in CI** — DONE 2026-07-17 as a zero-dependency test
       (`tests/links.test.mjs`, runs with the suite): found and fixed 22+ stale links in the
       frozen banners after the English rename. **markdownlint: deferred** — on ~40 prose
       files it either screams or needs a config so lenient it certifies little; revisit if
       contributors arrive.
5. [x] **CSV data dictionary** — DONE 2026-07-17: `observatory/usage/SCHEMA.md` (columns,
       units, dedup/redaction caveats), linked from the dashboard header.
6. [x] **Drop-in cleanup** — DONE 2026-07-17 (v1.5.1): top HTML comment removed (Sync Impact
       Report slot freed), `_processo/*` paths depersonalized, fork governance ("your copy is
       now the master"), rationale claims linked to STRATEGIES/CHANGELOG. Principle IX was
       already vendor-neutral on inspection.
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

**Decision (Roberto, 2026-07-17)**: `versione-italiano/` stays **frozen** (originals + live
LEGGIMI). A live mirror would cost a double translation on every change for a near-zero
audience; the generated-dashboard-in-Italian option remains available on request.

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
