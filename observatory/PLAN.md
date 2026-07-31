# PLAN — the single ordered backlog (updated 2026-07-17)

> Decided with Roberto in the observatory chat. **The backlog below is THE list**: work top
> to bottom, check off when done. History of completed phases at the bottom.

## NEXT — ordered backlog (value ÷ effort, post Spec Kit study)

1. [x] **Fix the two published claims about Spec Kit** — VERIFIED ALREADY DONE (2026-07-25
       final review): both dated corrections (2026-07-17) live in FINDINGS.md and
       spec-kit/README.md. Original task text follows. (from the double-run study, both
       verified at the source): (a) "constitution is read-once and passive" is FALSE — it is
       loaded by every core command and gates `/analyze` as automatically-CRITICAL;
       (b) "a method ships as a drop-in, not a preset" was true until Spec Kit v0.12.15
       (2026-07-14), which lets a preset seed the constitution verbatim. Fix in FINDINGS.md,
       `plugins/metodo/spec-kit/README.md`, and the "Kinship" section of both constitutions —
       **showing the dated correction**, not hiding it.
2. [x] **Fix the three repo bugs** found by the study — DONE (verified 2026-07-25): CI now
       runs `node --test tests/*.test.mjs` (a glob, not a hardcoded single file — confirmed in
       `.github/workflows/ci.yml`); CONTRIBUTING.md now says `cost-meter.mjs` "doesn't have
       tests yet" (no longer claims it does); root `CLAUDE.md` no longer contains `consumo/`.
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
7. [x] **Tests for `cost-meter.mjs`** — DONE 2026-07-31: 5 fixture-based tests
       (`tests/cost-meter.test.mjs`, fake home via USERPROFILE/HOME override, hand-computed
       totals, declared no-dedup limitation), suite 20/20; CONTRIBUTING EN+IT updated.
8. [x] **"Operating hypotheses" tone pass** — DONE 2026-07-31 (Roberto's OK on the full
       proposal, 1 Opus reviewer with 8 findings all applied): method **v1.9.3** — measured
       claims state source, N and limits ("register §N" = STRATEGIES.md); the one
       measurement-refuted claim fixed (workflow resume best-effort, 0/46 keys); behavioral
       directives untouched; drop-in + preset.yml realigned to 1.9.3; CHANGELOG EN+IT;
       mirror re-synced.
9. [x] **Update the spec-kit clone and TEST the preset path empirically** — DONE 2026-07-31:
       clone fast-forwarded (+562 commits, 0.15.2.dev0); `specify init --preset <local dir>`
       run twice (conventional `templates/` layout AND flat layout), both seeded
       `.specify/memory/constitution.md` **byte-identical** (equal SHA256) to the drop-in →
       decision: SHIP — `plugins/metodo/spec-kit/preset.yml` published (points at
       `constitution.md`, one copy), README EN+IT updated with the tested claim.
       `spec-kit-metodo/memory/constitution.md` realigned to drop-in v1.9.1 (was v1.1.0;
       folder has no local `.git` — publishing that repo stays manual).
10. [x] **De-Claude sweep** of remaining docs — DONE 2026-07-31: full grep of
        Claude/Anthropic across all tracked `.md` (33 files); outcome: 1 generalization
        (DATA.md "the more the coding agent is used", EN+IT) — everything else is
        load-bearing fact and stays by the sweep's own rules: `~/.claude/` paths, price
        source URLs, the research dossier, red-team verdicts, historical
        CHANGELOG/audit entries, model names in data, generated dashboards, and the
        README's deliberate "Claude Code is the current instrument, not the point".
11. [x] **Dataset release v0.1** — DONE 2026-07-31: tag `dataset-v0.1` pushed + release
        notes versioned in `observatory/usage/RELEASES.md` (EN+IT mirror); dashboard
        regenerated same day (70 sessions, 12 projects, 19.4M output + 51.6M cloud-agent
        tokens); novelties cited: `prices.csv`, `cost_usd_equiv`, `daily.csv`,
        `dashboard.html`, workflow costs measured from local transcripts; limits restated
        (API-equivalent ≠ plan bill, partial costs never invented, redaction).
        MANUAL leftover for Roberto (no `gh` CLI on this machine): on GitHub, tag →
        *Create release from tag* → paste the RELEASES.md section. Screenshot renewal for
        the README PNGs deferred to the observatory ritual (local-only procedure).
12. [ ] **MANUAL (Roberto)**: repo description + topics on GitHub; decide on username rename.
13. [ ] Later, data-driven: METRICHE for progetto-15 (full-vs-incremental A/B) · API
        cost-equivalent per model — DONE 2026-07-25 (`prices.csv`, sources+dates per row) · CSV→SQLite at hundreds of
        rows · ccusage-as-input if its exports ever cover redaction + per-operation needs.

**Decision (Roberto, 2026-07-17)**: `versione-italiano/` stays **frozen** (originals + live
LEGGIMI). A live mirror would cost a double translation on every change for a near-zero
audience; the generated-dashboard-in-Italian option remains available on request.
**Update (Roberto, 2026-07-25)**: reversed — an exact translated copy of the main English
docs now lives in **`ITALIANO/`** (14 files; kept in sync at each observatory review), and
after the repo audit (AR-02/03) Roberto chose to keep **only one** Italian tree:
`versione-italiano/` was removed from the public repo the same day (it survives locally,
untracked, with OSSERVATORIO.md and the glossary, and in git history for the originals).

## Done (compressed history)
- **2026-07-25** — The marathon day: WR3 resume-incident forensics (on-the-spot diagnosis
  refuted on the journal; safe-resume procedure into PROCESSO-FABBRICA) · method v1.9→v1.9.2
  (Factory section, bidirectional shadow, 5h_windows contract, glossary moved to Studio) ·
  full EN propagation (CONSTITUTION synced, FACTORY-PROCESS.md created, drop-in 1.9.1 with
  principles XII–XVI) · 24-agent repo audit (14 confirmed, 1 HIGH usage.mjs bug fixed:
  ~20.5M Studio tokens were invisible) · README restructured (role+results first) ·
  **ITALIANO/ total translation** (Italian folder names, bilingual usage.mjs, dashboards
  auto-generated in both languages) · one Italian tree only (versione-italiano removed) ·
  final 3-red-team + 2-Opus-reviewer pass, all 7 findings applied. 5 workflows, ~3.9M agent
  tokens, all in workflow.csv.
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
