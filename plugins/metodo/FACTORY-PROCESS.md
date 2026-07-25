# The Factory — multi-agent process for large, repeatable jobs

> **Governance:** the Italian master `PROCESSO-FABBRICA.md` (same folder) is the **source of
> truth** for this process — versioned by git, same relationship as `CONSTITUTION.md` to
> `COSTITUZIONE.md`. This file is the English version, synced 2026-07-25; if the two ever
> disagree, the Italian master wins.

> **Status**: adopted by Roberto on 2026-07-20 (chat `Studio-Ponte/Design_1`), after the
> "ponte-v2" run on the Studio project: 34 agents, ~4.1M tokens, 425 items generated + 167
> updated, full QC. Second run 2026-07-24/25 (Python WR3 factory: 229 agents, 555 questions,
> ~3 five-hour windows of the 100-euro Max plan): lessons A-01..A-06 folded in below.
> Linked to the CONSTITUTION (v1.9, "The Factory" entry) as of 2026-07-25.

## When to use it

Jobs that are **large and parallelizable**, where each individual unit of work doesn't need
deep reasoning but the volume does, and quality is checkable piece by piece: generating
hundreds of questions/pieces of content, **translating everything into another language**,
labeling, migrating formats, mass rewrites. NOT for linear coding (there the single strong
agent wins — the constitution's rule on that still holds).

## The structure (INVARIANT at every power level)

1. **Playbook before agents** — a single file that is the source of truth (what to read,
   where to write, the field schema, quality rules, fixed calibrated examples). Every agent
   reads it as its first act. (E.g. `Studio/inbox/PIANO-DOMANDE.md`.)
2. **Mechanical rules, not gut feel** — anything that can become a procedure gets written as a
   computable procedure with fixed examples (e.g. the 0-100 tier in 2 steps): that way even
   small models produce the same result as the big ones.
3. **A validator script is mandatory, and it GROWS with every run** — a script (e.g.
   `valida.py`) that every producer runs on its own output before handing it in. Measured: v1
   without a validator = 1 integration bug between agents; v2 with a validator = 0. Growth
   rule: every defect the model-based QC finds that can be mechanized (position of the
   correct answer, True/False balance, running the solutions) **becomes a check in the
   script**, which runs BEFORE the model QC — mechanical checks don't get paid for in model
   tokens. (WR3 run: the positional tell was at 100% on 10 out of 10 batches; a free check
   would have stopped it at generation time.)
4. **Parallel producers, separate files** — each agent writes ONLY its own files; shared files
   (manifests, registries) have **a single writer**: the final assembler.
5. **Verification by EXECUTION** — where the content is executable, it actually gets executed
   (python, sqlite3), not just re-read. This catches errors that re-reading misses (e.g. a
   traceback sitting in stdout, a "fix" that wasn't broken to begin with).
6. **Multi-dimension QC, one model per pass** — the **correctness** pass (real code/data,
   re-running the examples, style) goes to the high-tier model with an explicit checklist;
   the **mechanical-rubric** passes (tier/topic, recomputing written rules) go to **Sonnet
   with an Opus shadow at ~8%** (measured on WR3: 87% agreement on the rubric; the shadow acts
   as a guard). Full or sampled coverage depending on the level (see below). **Post-fix
   re-checks only above a threshold** (>20% of the questions touched, or logic fixes rather
   than formatting): below the threshold the validator script is enough. (WR3: 16 Opus
   re-checks, ~12M of cache — roughly half of them avoidable.)
7. **The "take nothing for granted" dimension** — a dedicated reviewer does NOT look for
   errors but for **gaps**: prerequisites the corpus relies on but never explains from
   scratch. Gaps immediately become generation work (a completeness loop).
8. **A single final assembly** + a numeric report (totals per category, remaining issues).
9. **Resume, never restart from zero — but with the safe procedure** (section below).
   Interruptions (session limits, crashes) get picked back up; the runtime's cache, though,
   is **best-effort, not guaranteed**: measured 2026-07-20, 30/34 reused for free, but on the
   WR3 run (2026-07-24) the 2nd resume reused **0/46** — 46 agents redone (30 of them Opus)
   with byte-for-byte identical prompts and a complete journal. The real checkpoint is the
   FILES, not the cache.

## Power levels (same structure, different models)

| Level | Producers | Execution check | QC | Assembly | When to use it |
|---|---|---|---|---|---|
| **MAXIMUM** | Sonnet medium | Sonnet | correctness: **Opus high, FULL coverage** · mechanical rubrics (tier/topic): **Sonnet + ~8% Opus shadow** + "take nothing for granted" dimension | Sonnet low | content Roberto will use for months (e.g. the study questions) |
| **MEDIUM** | Sonnet low / Haiku | Sonnet | Opus sampled ~20% + full coverage only on the critical pieces | Haiku | large volumes at medium risk (e.g. translating the questions into another language) |
| **LIGHT** | Haiku | Haiku (smoke test) | Sonnet sampled | Haiku | mechanical, easily reversible transformations |

**Iron rule**: you can step down a level on MODELS, never below what's necessary in
STRUCTURE — playbook, validator script, single-writer, and verification-by-execution never
get dropped at any level. "A few fewer agents is fine, but not less than the minimum needed."

## Resume: the safe procedure (from the A-01 incident on the WR3 run, 2026-07-24/25)

1. **Results on file, always** (the real defense): producers and QC write their outcome to a
   per-batch file too (e.g. `qc/<batch>.json`), and their prompt includes: *"if the file
   exists and is valid, verify it and return it WITHOUT redoing the work."* That way any
   redo — from lost cache or a crash — costs a few tokens instead of a whole phase.
2. **Journal = state, not a guarantee**: before every resume, inspect `journal.jsonl` (result
   vs started) to know what counts as done — but a complete journal does NOT guarantee reuse:
   in the A-01 incident every result was there and the cache didn't hook onto a single key
   (the runtime's key derivation isn't content-addressed).
3. **Stop-loss at relaunch**: in the first 2 minutes, watch /workflows — steps that are
   already done should come back INSTANTLY from cache; if agents from already-closed phases
   start running live, **stop the run immediately** and close it out with a few targeted
   agents. On the WR3 run, missing this stop-loss cost ~0.59M live tokens + ~39M of re-read
   cache (46 agents redone, 30 of them Opus).

## "Minimal direction" rule for the flagship model (Roberto, 2026-07-20)

When the best available model **eats too much of the plan** (today: Fable on the Max plan,
which "gulps" the usage window), it should be used ONLY for: setting up agents with the
right instructions, checking results, deciding. ALL the execution work — research,
generation, code, QC — goes to agents on sustainable models (Sonnet/Haiku/targeted Opus).
The rule applies to Fable **as long as it stays usable but costly**, and in general to any
future flagship model that will be the best but will consume too much: tip of the pyramid =
direction, workforce = the fleet. (This aligns with the constitution's "Fable, a little and
well.")

## Operational notes

- Orchestration from the chat (even Fable: most of the tokens are the agents', the chat just
  directs); the real cost sits in producers+QC → that's where the level gets chosen.
- Session limits stretch the measured DURATION, not the cost: log the time gaps in the
  `observatory/usage/workflow.csv` row (the workflow's clock keeps running).
- In that same row, also note, **only when certain** (an observed count of credit blocks), how
  many **5-hour windows** of the plan the run consumed, with the plan for comparison — column
  `5h_windows`, e.g. `~3 (Max 100 euro)`. Never estimate it from tokens: only from windows
  actually observed.
- The permission requests Roberto sees during runs (one-liner python scripts, dumps,
  validations) are the process's mechanical checks: perfect material for the shell section of
  the study app (idea logged in `Studio/IDEE.md`).

## Lessons from the WR3 run (anomaly log A-01..A-06, 2026-07-24/25)

- **A-01 resume redoing finished work** → the safe procedure above. The on-the-spot diagnosis
  ("journal without result") was **disproved** by the observatory checking the real journal:
  every result was there; the 2nd resume didn't hook onto a single cache key (0/46, with
  30/32 byte-for-byte identical prompts). Moral: trust the files, not the runtime's cache.
- **A-02 positional tell** (correct answer always at the same index, 10/10 batches in theory
  questions) → positional check added to the validator. **Per-batch** defects are found by
  mechanical scanning, not by paying models.
- **A-03 unbalanced True/False** (8/10 "True" in one batch) → balance check added to the
  validator.
- **A-04 solutions that aren't self-contained** (29/32 without the starter's imports/data:
  fine in-app, but off-standard) → validator `--esegui` flag: solutions are actually
  executed, stdout compared against `expected`.
- **A-05 stray files in the work area** → the factory's inbox is kept clean; files that
  aren't tracked and aren't ours get flagged to Roberto, never touched or deleted.
- **A-06 thin base of the pyramid** (few easy questions despite the volume) → the generation
  plan declares the **expected tier distribution** and QC checks against the plan, not by
  eye.
