# DATA OBSERVATORY — what the numbers say (reading page)

> **What it is**: the page the observatory chat updates at every review. On one page: what data
> we have, what it says, and what changes to the method it suggests. Same honesty as
> FINDINGS.md: **small N = clues, not proof.**
> Italian original: `../versione-italiano/osservatorio/DATI.md` (frozen copy).
> Redaction (Roberto's choice, 2026-07-16): **only 3 reserved projects** appear with an alias
> (`progetto-15`, `progetto-16`, `progetto-22` — legend in `censura.local.json`, local only);
> all others use the real name. New projects start redacted until decided otherwise.
> **Last review: 2026-07-25.**

## The ritual (when the observatory chat opens)
1. `node observatory/usage.mjs` → updates the `usage/DASHBOARD.md` dashboard, a detail file
   per project in `usage/per-project/`, and the raw data `usage.csv` +
   `sessions.csv` (one row per session with the **operation title**, searchable).
   The lessons at the top of the dashboard are hand-curated in `usage/LESSONS.md`.
1b. If a **multi-agent workflow** has run since last time (audit, research…), add
   its row to `usage/workflow.csv` (cloud workflows leave no transcript on the PC).
2. Compare the active copy of the method (`~/.claude/CLAUDE.md`) with the **master**
   (`plugins/metodo/COSTITUZIONE.md`): if they diverge, decide which one wins and re-sync.
3. Read the new lines of `~/.claude/ESPERIMENTI.md` and of each active project's METRICHE.md.
4. Update the **verdicts** below and the **`STRATEGIES.md`** register (costs/gains of every
   method choice — red team, research, audit…), and propose (don't impose) changes to the
   method.

## The data sources (table created 2026-07-16, contents refreshed 2026-07-25)
| Source | What it contains | Status |
|---|---|---|
| `observatory/usage/` | tokens per project × model × month **and per operation/session** (chat titles), from ALL local chats (25 chat folders → 13 grouped projects, 64 sessions since May 2026) + cloud workflow register (now with `5h_windows` column) | ✅ auto-generated (workflow.csv by hand) |
| `~/.claude/ESPERIMENTI.md` | cross-model A/B and same-model repetitions | 6 A/B lines · 1 repetition (+1 hybrid red-team note) |
| poker: `_processo/METRICHE.md` | per phase: model+effort, duration (git), volume, workflow tokens | ✅ the richest series |
| progetto-15: process docs at root | DECISIONI + audits, but **no METRICHE.md** | ⚠️ uncovered arm |
| Audits (poker `AUDIT_R6_R7.md`, progetto-15 `AUDIT_ALTO_2026-07-03.md`) | confirmed/refuted findings + cost | ✅ 2 data points |
| `observatory/STRATEGIES.md` | cost/gain register of EVERY method strategy (audit, red team, research, shadow…) | ✅ created 2026-07-16 |
| `FINDINGS.md` + `experiments/` | with/without process-package probes (N=1 per arm) | ✅ historical, already analyzed |
| DECISIONI.md (poker, progetto-15) | options, choice, why | ⚠️ missing the **outcome observed later** |

**Known limitation of consumption data**: cloud workflows (multi-agent audits) leave no
transcript on the PC → their tokens (2.6M + 1.1M across the two audits + 0.7M of research) must
be added by hand from the METRICHE. The Anthropic dashboard remains the only source for cost in
money.

## Verdicts (updated 2026-07-25)
- **Does the heavy process (audit) pay off?** Strong clue **yes**: 2 audits out of 2 found
  real critical bugs (3 HIGH on poker; on progetto-15 the root cause of a blocking bug
  + 3 critical flaws) at a known and sustainable cost. N=2 → clue.
- **Cross-model shadow verification**: 4 experiments, incl. one 54-pair batch (2026-07-24,
  Sonnet shadow under an Opus baseline — the inverted direction): 87% agreement, and the
  disagreements revealed **complementary defect classes** — the high model sees batch-level
  defects, the cheap shadow catches point-level slips (3/4 confirmed at arbitration). Verdict:
  keep the ~8% shadow, one model step AWAY from the baseline in either direction (method v1.9);
  mechanical defects (positional tell) go to script validators, not models.
- **Workflow resume cache: best-effort, not guaranteed** (measured 2026-07-24, run WR3):
  one resume reused 32/48 keys, the next reused **0/46** despite byte-identical prompts and a
  complete journal — waste ~0.59M live + ~39M cache tokens. The real checkpoints are files;
  safe-resume procedure (file-persisted verdicts + 2-minute stop-loss) now in
  `plugins/metodo/PROCESSO-FABBRICA.md`. Note: the incident's on-the-spot diagnosis was wrong —
  the observatory's journal forensics corrected it (a reminder that live diagnoses need
  post-hoc verification).
- **Same-model repetitions**: **zero data** — the rule in the constitution is still faith.
- **Which models for which agents**: the method's table comes from external research
  (2026-07 dossier); our data so far only covers the "verification" function.
- **Where the tokens go** (refreshed 2026-07-25): 18.0M output + **26.3M cloud-agent tokens**
  (the Factory runs now outweigh every audit: WR3 alone 11.0M ≈ **~3 five-hour windows of the
  Max 100-euro plan**, observed via credit blocks); the read cache (~3.5 billion) is ~187× the
  live tokens → the warm cache is what makes the plan sustainable. Opus generated ~83% of
  historical output; Sonnet/Fable came in from July with the model-per-step rule.
- **Poker's process A/B (full build) vs progetto-15 (incremental)**:
  today **not measurable** because the second doesn't log phases. Either add a lightweight
  METRICHE.md, or declare it closed. (The new per-session table helps: poker's phases already
  have titles like `WTB/Base_4`, `Poker_App/Feature_6`, etc.)

## Minimum data contract (for all chats — ~zero cost)
1. **Experiments** → one line in `~/.claude/ESPERIMENTI.md`, format already fixed there. Holds up.
2. **Important choices** → one line in the project's DECISIONI.md (options · choice · why)
   **+ "Observed outcome" column** to fill in when the outcome becomes visible (even months
   later).
3. **Token consumption** → **nobody writes anything by hand**: `usage.mjs` extracts it from
   the transcripts. The more Claude is used, the more data accumulates, for free.
