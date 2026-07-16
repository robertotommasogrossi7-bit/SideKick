# DATA OBSERVATORY — what the numbers say (reading page)

> **What it is**: the page the observatory chat updates at every review. On one page: what data
> we have, what it says, and what changes to the method it suggests. Same honesty as
> FINDINGS.md: **small N = clues, not proof.**
> Italian original: `../versione-italiano/osservatorio/DATI.md` (frozen copy).
> Redaction (Roberto's choice, 2026-07-16): **only 3 reserved projects** appear with an alias
> (`progetto-15`, `progetto-16`, `progetto-22` — legend in `censura.local.json`, local only);
> all others use the real name. New projects start redacted until decided otherwise.
> **Last review: 2026-07-16.**

## The ritual (when the observatory chat opens)
1. `node osservatorio/consumo.mjs` → updates the `consumo/CONSUMO.md` dashboard, a detail file
   per project in `consumo/per-progetto/`, and the raw data `consumo.csv` +
   `sessioni.csv` (one row per session with the **operation title**, searchable).
   The lessons at the top of the dashboard are hand-curated in `consumo/LESSONS.md`.
1b. If a **multi-agent workflow** has run since last time (audit, research…), add
   its row to `consumo/workflow.csv` (cloud workflows leave no transcript on the PC).
2. Compare the active copy of the method (`~/.claude/CLAUDE.md`) with the **master**
   (`plugins/metodo/COSTITUZIONE.md`): if they diverge, decide which one wins and re-sync.
3. Read the new lines of `~/.claude/ESPERIMENTI.md` and of the active projects' METRICHE.md.
4. Update the **verdicts** below and the **`STRATEGIES.md`** register (costs/gains of every
   method choice — red team, research, audit…), and propose (don't impose) changes to the
   method.

## The data sources (census 2026-07-16)
| Source | What it contains | Status |
|---|---|---|
| `osservatorio/consumo/` | tokens per project × model × month **and per operation/session** (chat titles), from ALL local chats (23 chat folders → 11 grouped projects, 53 sessions since May 2026) + cloud workflow register | ✅ auto-generated (workflow.csv by hand) |
| `~/.claude/ESPERIMENTI.md` | cross-model A/B and same-model repetitions | 2 A/B lines · 0 repetitions |
| poker: `_processo/METRICHE.md` | per phase: model+effort, duration (git), volume, workflow tokens | ✅ the richest series |
| progetto-15: process docs at root | DECISIONI + audits, but **no METRICHE.md** | ⚠️ uncovered arm |
| Audits (poker `AUDIT_R6_R7.md`, progetto-15 `AUDIT_ALTO_2026-07-03.md`) | confirmed/refuted findings + cost | ✅ 2 data points |
| `osservatorio/STRATEGIES.md` | cost/gain register of EVERY method strategy (audit, red team, research, shadow…) | ✅ created 2026-07-16 |
| `FINDINGS.md` + `esperimenti/` | with/without process-package probes (N=1 per arm) | ✅ historical, already analyzed |
| DECISIONI.md (poker, progetto-15) | options, choice, why | ⚠️ missing the **outcome observed later** |

**Known limitation of consumption data**: cloud workflows (multi-agent audits) leave no
transcript on the PC → their tokens (2.6M + 1.1M across the two audits + 0.7M of research) must
be added by hand from the METRICHE. The Anthropic dashboard remains the only source for cost in
money.

## Verdicts (updated 2026-07-16)
- **Does the heavy process (audit) pay off?** Strong clue **yes**: 2 audits out of 2 found
  real critical bugs (3 HIGH on poker; on progetto-15 the root cause of a blocking bug
  + 3 critical flaws) at a known and sustainable cost. N=2 → clue.
- **Cross-model shadow verification**: 2 data points. On **code** findings the models are
  equivalent; on **process/config** findings the higher model falsifies better.
  Hypothesis to confirm: targeted shadow only on process/config findings.
- **Same-model repetitions**: **zero data** — the rule in the constitution is still faith.
- **Which models for which agents**: the method's table comes from external research
  (2026-07 dossier); our data so far only covers the "verification" function.
- **Where the tokens go** (first read of CONSUMO): the 2 big app-projects dominate
  (poker ~6.7M output incl. worktree, progetto-15 ~3.6M); the read cache (~2.8 billion) is ~170×
  the live tokens (~16.5M input+output) → the warm cache is what makes the plan sustainable.
  Opus generated ~83% of historical output; Sonnet/Fable came in from July with the
  model-per-step rule.
- **Poker's process A/B (full build) vs progetto-15 (incremental)**:
  today **not measurable** because the second doesn't log phases. Either add a lightweight
  METRICHE.md, or declare it closed. (The new per-session table helps: poker's phases already
  have titles like `WTB/Base_4`, `Poker_App/Feature_6`, etc.)

## Minimum data contract (for all chats — ~zero cost)
1. **Experiments** → one line in `~/.claude/ESPERIMENTI.md`, format already fixed there. Holds up.
2. **Important choices** → one line in the project's DECISIONI.md (options · choice · why)
   **+ "Observed outcome" column** to fill in when the outcome becomes visible (even months
   later).
3. **Token consumption** → **nobody writes anything by hand**: `consumo.mjs` extracts it from
   the transcripts. The more Claude is used, the more data accumulates, for free.
