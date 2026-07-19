# Method CHANGELOG — the amendment history of the constitution

> A self-amending constitution without an amendment history would assert evolution without
> evidence. One entry per amendment, hand-written, newest first. Dates from git history of
> `COSTITUZIONE.md`; each version is also a git tag (`metodo-vX.Y`) from v1.5 onward.

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
