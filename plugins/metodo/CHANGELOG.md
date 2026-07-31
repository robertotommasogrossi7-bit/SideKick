# Method CHANGELOG — the amendment history of the constitution

> A self-amending constitution without an amendment history would assert evolution without
> evidence. One entry per amendment, hand-written, newest first. Dates from git history of
> `COSTITUZIONE.md`; each version is also a git tag (`metodo-vX.Y`) from v1.5 onward.

## v1.9.4 — 2026-08-01 (the adopter pass + single-source numbers, from two red teams)
- **Stale inline numbers replaced by live pointers** (an external red team caught the
  ≈170× cache ratio fossilized in all three constitution copies while the dashboard read
  ≈192×, and the Factory's "N=3" went stale within 24 hours of being written): the
  handoff-economics ratio and the Factory N now point at the observatory (dashboard +
  register §) instead of carrying a number that rots.
- **Drop-in, adopter fixes** (external red team, "Spec Kit adopter" hat): **Scope tags**
  at the top — Principles I–IV, VI–VIII, X, XII, XIV declared universal; V, IX, XI, XIII,
  XV–XVI declared context-shaped (solo dev, one provider's caching, home observatory,
  mass generation) with explicit permission to prune; **honest caveat inside Principle
  VI** — self-amendment is the core thesis and still untested on the outcome that matters
  (was previously stated only in the observatory, not in the file being copied);
  spec-kit README now warns that the CLI documents `--preset` as registry-ID only (the
  local-path form is verified but undocumented upstream).
- Kinship section now mentions the tested `preset.yml` next to the drop-in.
- Repo-wide same day (outside the method files, same red-team wave): single-source rule
  for live totals, `estimated` column in workflow.csv, no-git test fallback — see the
  repo history.

## v1.9.3 — 2026-07-31 (the "operating hypotheses" tone pass)
- **Measured claims now state their N and their limits** (PLAN item 8; 1 Opus reviewer, 8
  findings, all applied): a new header line frames it — *rules born from measurements are
  operating hypotheses*, register = `observatory/STRATEGIES.md`, cited as "register §N".
  Concretely: "never `max` on long tasks" and "NEVER multi-agent for linear coding" (plus
  its twin in Orchestrate-first) become external-source hypotheses with "our own
  measurement: none"; the 2-reviewers rule cites its N=2 (§1); the cross-model
  equal-quality claim is qualified as the register has it (equal on **code** findings, the
  higher model falsifies process/config better — N=4, §2); the internal-red-team field
  measure declares N=1 pair; external-eyes gains declare N≈5 (§5); handoff economics points
  at §3; the Factory yield cites N=3 runs (§8).
- **The one claim a measurement had refuted is fixed** (reviewer's top finding): audit
  resume "from cache — zero rework" → workflow cache reuse is **best-effort, not
  guaranteed** (one measured resume at 0/46 keys, §3): keep outcomes on file.
- Behavioral directives (golden rule, "always propose", the data-contract "never"s)
  deliberately untouched — preferences, not claims. The reviewer's check confirmed the
  split and killed a draft edit that would have weakened the research-first directive.
- **Drop-in realigned to 1.9.3** (and `preset.yml` version with it): the three rationales
  carrying the same claims now state their N; the linear-coding line is declared an
  external-sources hypothesis. Mirror `~/.claude/CLAUDE.md` re-synced.

## v1.9.2 — 2026-07-25 (glossary moves to Studio and fills itself)
- **Glossary relocated**: from SideKick (`versione-italiano/glossario/`) to the **Studio
  repo** (`Studio/glossario/`, still gitignored/local-only) — Roberto's decision, since the
  study app is where terms are actually learned.
- **New filling mechanism** (spec: `Studio/inbox/SPEC-GLOSSARIO.md`): the study app marks
  terms **acquired** when covered by correctly-answered questions/exams, leaves the rest
  "in progress"; the Factory in agent mode measures term **coverage** with a cheap-agent
  importance score and recommends questions-per-rank; cheap research agents hunt **missing**
  fundamentals that harder questions take for granted. Implementation planned in a dedicated
  Studio session.
- Repo housekeeping (same decision wave): `versione-italiano/` fully removed (useful leftovers
  in local `old/`, originals in git history); `OSSERVATORIO.md` (the observatory's standing
  tasks) now lives at the repo root, gitignored; README restructured — SideKick's role and
  measured results first, the honest failed-measurement story in its own section below
  (Roberto's editorial call, superseding audit finding AR-11's "leave as is").

## v1.9.1 — 2026-07-25 (same-day catch-up + full propagation)
- **Master catch-up caught by the fidelity reviewer** (multi-agent clarity/English pass, 10
  agents): the `5h_windows` data-contract line documented in v1.9 was present in SCHEMA.md and
  this changelog but missing from COSTITUZIONE.md's "Contratto dati" and from the drop-in's
  Principle XI — added to both; mirror re-synced.
- **Propagation completed** (was pending since v1.6): `CONSTITUTION.md` (EN) synced to v1.9
  section by section — its governance banner also corrected: it wrongly declared itself the
  master; **`FACTORY-PROCESS.md` created** (EN version of PROCESSO-FABBRICA.md); spec-kit
  drop-in realigned to **1.9.1** (new depersonalized principles XII–XVI, plus the
  data-contract windows line in Principle XI).
- English/clarity pass over the public docs (fresh-eyes + native-English + fact-coherence
  analysts, then 2 Opus reviewers): stale ~170× cache figure refreshed to ~187× with dated
  notes, drop-in version race in README fixed, calques cleaned (details in git history).
- **Post-audit fixes, same day** (full-repo audit `observatory/AUDIT-REPO-2026-07-25.md`,
  Roberto's approval): version header added to COSTITUZIONE/CONSTITUTION and CHANGELOG linked
  from the READMEs (AR-05); drop-in version reconciled at **1.9.1** everywhere (AR-04);
  `versione-italiano/` removed from the public tree — `ITALIANO/` is the single Italian
  mirror, originals preserved in git history (Roberto's call on AR-02/03).

## v1.9 — 2026-07-25 (master + mirror re-synced)
- New section **"The Factory"** (mass generation with QC): playbook as single source of truth,
  **growing script validator** (every mechanizable defect found by model-QC becomes a free
  script check), execution-based verification, per-pass QC models (correctness on the high
  model; mechanical rubrics on Sonnet with ~8% Opus shadow), and a **safe-resume procedure**
  with file-persisted verdicts. Details in `plugins/metodo/PROCESSO-FABBRICA.md` (adopted
  2026-07-20, hardened after run WR3's incident A-01: the runtime resume cache measured
  **best-effort** — 0/46 reuse with byte-identical prompts and a complete journal — so files,
  not the cache, are the real checkpoints; the on-the-spot diagnosis "journal missing results"
  was refuted by the observatory on the actual journal).
- **Shadow verification generalized**: the shadow runs one model step AWAY from the baseline
  (above a cheap baseline, below a capped one — never Fable). Measured on 54 pairs
  (2026-07-24): defect classes are **complementary** (batch-level vs point-level); mechanical
  defects (positional tell) belong to script validators, not models.
- Data contract: `workflow.csv` gains a **`5h_windows`** column — the observed-with-certainty
  count of 5-hour plan windows a run consumed, with the plan named (e.g. `~3 (Max 100 euro)`).
  Only observed credit-block counts, never token estimates.
- Propagation: mirror `~/.claude/CLAUDE.md` re-synced (was stuck at v1.5); tags
  `metodo-v1.6`…`metodo-v1.9` created. Still pending: `CONSTITUTION.md` (EN) and the spec-kit
  drop-in realignment.

## v1.8 — 2026-07-19 (master only — propagation pending)
- New section **"Orchestrate first, then delegate (agents are not just for audits)"**, requested by
  Roberto: the order **research → mini-spec → my OK → execution** is binding, and agents are
  launched *after* the plan exists (a fan-out without a spec parallelizes the wrong direction);
  then, for genuinely divisible work, delegate with the right model per task (Haiku mechanical /
  Sonnet scoped fixes+tests / Opus synthesis and delicate judgment), staying single-agent for
  linear work; and **at least 2 independent Opus reviewers with different lenses** at the end of a
  big phase, their findings verified before being accepted.
- ⏳ **Not propagated yet**: mirror, `CONSTITUTION.md`, spec-kit drop-in, tag `metodo-v1.8`
  (v1.6 and v1.7 also still pending).

## v1.7 — 2026-07-19 (master only — propagation pending)
- New section **"Minimum standards of EVERY app (from the first build)"**, requested by Roberto
  after the WTB phone test: (1) **build version visible in-app** (date + commit, evaluated at
  bundling) in a standard "Assistenza"-like spot — lesson: a cached bundle (Expo Go/APK without a
  reachable dev server) silently impersonates the new one, so "the app updates by itself" must
  never be claimed; (2) **support contact always visible** (Roberto's name + email, tappable).
  First implementation: Who's the Boss `app.config.js` + Profilo → Assistenza.
- ⏳ **Not propagated yet** (for the observatory): mirror `~/.claude/CLAUDE.md`,
  `CONSTITUTION.md`, `spec-kit/constitution.md`, git tag `metodo-v1.7` (v1.6 also still pending).

## v1.6 — 2026-07-17 (master only — propagation pending)
- New section **"Red team: internal agent (with the code) or external chat (blind)?"**, born from a
  measured comparison (Poker_App R7.2 vs R7.3, logged in `~/.claude/ESPERIMENTI.md`). For reviewing
  **our own** design/code, an internal agent with repo access beats blind external chats: findings
  arrive **pre-verified at `file:line`** (source re-verification is the real cost of an external red
  team), and it can **refute** a suspicion by reading the code instead of guessing. External chats
  keep two jobs only: the uncontaminated opinion **before going public**, and **meta-review of the
  dossier** before launching the real red team. The internal agent must always be given calibration
  (project scale, what's out of scope), a findings cap, and the order to discard theoretical risks
  itself — otherwise it produces the enterprise list.
- ⏳ **Not propagated yet** (for the observatory): `CONSTITUTION.md` (depersonalized variant),
  `spec-kit/constitution.md` drop-in, git tag `metodo-v1.6`.

## v1.5.1 — 2026-07-17 (Spec Kit drop-in only)
- Drop-in depersonalized for real: removed leaked `_processo/*` project paths; install notes
  moved out of the file top (that slot belongs to Spec Kit's Sync Impact Report); Governance
  clarified for forks (on adoption, the adopter's copy becomes the master).
- Post Spec Kit double-run study, "Kinship" corrected in both constitutions: the delta is
  **proactive** self-amendment (Spec Kit already amends on request, with versioning and sync
  reports).

## v1.5 — 2026-07-16 (tag `metodo-v1.5`)
- Governance flipped: the **repo file is the master**, `~/.claude/CLAUDE.md` is a read-only
  mirror protected by a permissions deny rule.
- New **data contract** section (chat titles `Project/Phase_N`, one-line experiment/decision/
  workflow records, token usage never logged by hand).
- Handoff economics rewritten on measured data (cache reads ≈170× live tokens; switch at
  milestones, resume instead of restarting).
- New "Kinship with GitHub Spec Kit" section; drop-in realigned to 1.5.0 (principles
  VIII–XI added).
- 2026-07-16/17 factual fixes after external red team: 5-hour **usage window** ≠ context
  window; Sonnet 5 tokenizer claim sourced inline (anthropic.com/news/claude-sonnet-5);
  "Spotify" rule generalized to industry leaders; glossary made local-only.

## (unversioned) — 2026-07-11
- Glossary section (personal learning terms) + SideKick observatory role extended.
  *Recorded here honestly: this amendment shipped without a version bump.*

## v1.4 — 2026-07-03
- Supabase/SQL discipline: one versioned folder for ALL migrations, numbered inventory as
  single source of truth, "applied" only on explicit confirmation.

## v1.3 — 2026-07-03
- **Model + effort per step**: the agent proposes the best model/effort for every step, with
  a sourced default table (research dossier with URLs in `experiments/`).

## v1.2 — 2026-07-03
- Six sections synced from field use on a real app build (multi-agent audits with
  adversarial verification, model experiments/shadow checks, research-before-choosing,
  code map, progress reporting, CI-from-day-one note).

## v1.1 — 2026-06-12
- New principle: **external eyes before going public** (cynical red-team dossier for fresh
  AI chats + verify reviewers' claims at the source).

## v1.0 — 2026-06-11
- Initial constitution: proactive standing conduct with no commands (idea capture,
  design-before-code, micro-commits, verify-before-done, handoffs, self-amendment, golden
  rule). First Spec Kit drop-in.
