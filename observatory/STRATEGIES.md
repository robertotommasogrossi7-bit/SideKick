# METHOD STRATEGIES — costs and gains (honest register)

> **What it is**: every method/process choice we're testing, with **how much it costs us**
> (tokens, measured where possible) and **how much it has paid off** (benefits observed,
> concrete). Same honesty as FINDINGS.md: small N = clues; where the cost isn't measurable we
> say so, we don't make it up. Updated by the observatory chat at the ritual. Last review:
> **2026-07-25**.

## MEASURED strategies (cost and benefit with numbers)

### 1. Multi-agent audit (heavy verification at the end of a phase)
- **Measured cost**: 2.6M tokens (poker, 67 agents) + 1.1M (progetto-15, 21 agents).
- **Observed gain**: poker → 45 real findings of which **3 HIGH that broke live flows**
  (crash on store actions, wrong prize pool, broken inclusion function); progetto-15 →
  root cause of a **blocking bug** + **3 critical flaws** on the product's central promise,
  found **before the users**.
- **Learned efficiency**: with the second audit (rules: dedup first, verification only on
  HIGH/MEDIUM, targeted hunts) the cost dropped from 2.6M to 1.1M — ⚠️ on a smaller project:
  an indication, not a clean comparison.
- **Anti-circularity** (the confirmation isn't just "agents verifying agents"): of the 45
  findings confirmed on poker, **over 30 were then fixed and validated by green tests and
  typecheck** (blocks R6-B1→B6, +46 new tests); the rest are assigned to future phases in the
  register.
- **Verdict**: strong clue that it pays off at the end of a big phase. N=2.

### 2. Cross-model shadow verification (inside audits and mass QC)
- **Measured cost**: ~39k tokens for 1 duplicated agent (≈8% of the verifications); in the
  WR3 factory run, ~16 Sonnet shadow agents inside an 11.0M-token run.
- **Observed gain**: 1 finding out of 2 downgraded with **4 factual errors discovered**
  inside the finding → wasted remediation work avoided. Pattern on audits: on **code**
  findings the models are equivalent; on **process/config** findings the higher model
  falsifies better. New (2026-07-24, 54 pairs, **inverted direction** — Sonnet shadow under
  an Opus baseline): 87% agreement, and the disagreements show **complementary defect
  classes** — the high model sees batch-level defects, the cheap shadow catches point-level
  slips (3/4 confirmed at arbitration, e.g. a stray newline, a wrong line count).
- **Verdict**: minimum cost, useful in BOTH directions → method v1.9 generalizes it (shadow
  = one model step away from the baseline; mechanical defects go to script validators).
  N=4 experiments — continue.

### 3. Switching chats / cache (context economics)
- **Measured cost**: read cache ≈**187×** the live tokens (3.5 billion vs ~18.8M) — it's the
  biggest cost item of all; resuming the interrupted audit reused **100%** of the completed
  steps (zero rework).
- **⚠️ New caveat (2026-07-24, run WR3): the WORKFLOW resume cache is best-effort, not
  guaranteed** — one resume reused 32/48 keys, the next **0/46** despite byte-identical
  prompts and a complete journal (waste: ~0.59M live + ~39M cache tokens, 46 agents redone).
  Chat-resume economics still hold; workflow resumes now require the safe procedure
  (file-persisted verdicts + 2-minute stop-loss) in `plugins/metodo/PROCESSO-FABBRICA.md`.
- **Verdict**: rule in constitution v1.5 (handoff at milestones, resume when possible),
  hardened for workflows in v1.9.

### 4. Process IMPOSED on a strong model (process packages) — DISCARDED strategy
- **Measured cost**: the arm with the package used ~**2×** the tokens of the blind arm
  (2026-06 probe), same or worse outcome; in one case the package rowed **against** the intent.
- **Verdict**: negative → the method *proposes*, it doesn't impose. (N=1 per cell: converging
  clues.)

## Strategies with documented GAIN but cost not yet separable

### 5. Red team (internal + external) before going public
- **Observed gain (concrete episodes)**:
  - SideKick's FINDINGS: external reviewers gave **rigor 3/10** ("it sells a rigor it doesn't
    have") → honest rewrite **before** publication: public embarrassment avoided.
  - OSS contributions: a **duplicate PR avoided** before opening it.
  - poker R7.0: red team (mine + external "data engineer") → **schema v2** (UUID, append-only
    movements, guests, fallback) **before** writing the SQL: redoing the schema afterward would
    have cost a migration.
  - progetto-15 and poker R7.2: 2 more red teams on record (REDTEAM on sync).
- **Cost**: nearly zero on the plan — the external chats run **outside** (base Claude/ChatGPT);
  the internal cost is preparing the dossier, today **not separable** in the transcripts (it was
  inside the phase chats). **From now on**: red team sessions are titled `Project/RedTeam_N`, so
  the cost becomes measurable.
- **Honest verdict**: concrete and repeated benefits (N≈5 episodes) at nearly-zero plan cost →
  probably the method's best gain/cost ratio. The gain in "saved" tokens isn't quantifiable (we
  don't know what would have happened without it), so we don't quantify it.

### 6. Research before choosing (features and UX)
- **Observed gain (concrete episode)**: R7.2b — the boot hook touched the auth gate;
  the research (zustand docs, PowerSync, articles) led to **dropping the custom design** for
  the native `setOptions`+`rehydrate` APIs: less of our own code to maintain, fewer possible
  bugs. The sync choices came out **aligned line-for-line** with the standard (verified by the
  audit with sources).
- **Cost**: inside the phase chats, not separable. **From now on**: `Project/Research_X` when
  the research is a session on its own.
- **Verdict**: positive anecdotes, never measured systematically. To keep an eye on.

### 7. Model + effort per step
- **Observed gain**: block R6-B (6 fix phases on **Sonnet high** instead of Opus): all green
  on the first try, zero regressions on the 9 money scenarios.
- **Cost**: zero (it's a choice, not an activity). The exact Sonnet-vs-Opus saving isn't
  quantifiable without the counterfactual; known trap: Sonnet 5's updated tokenizer produces
  1.0–1.35× tokens for the same text (official source, re-verified 2026-07-16).
- **Verdict**: good clue; the table stays based on external research until our own numbers
  are enough.

### 8. The Factory (mass generation with total QC)
- **Measured cost**: 2 big runs — ponte-v2 (2026-07-20): 34 agents / 5.8M tokens; WR3
  (2026-07-24/25): 229 agents / 11.0M tokens ≈ **~3 five-hour windows of the Max 100-euro
  plan** (observed via credit blocks — first row of the new `5h_windows` column).
- **Observed gain**: 447+555 study elements produced with executed-for-real solutions
  (188/188 on WR3); the QC found real defect families (corpus-wide positional tell,
  unbalanced true/false, non-self-contained solutions) **before use**; the script validator
  kept integration bugs at 0 (vs 1 in the pre-validator run).
- **Learned efficiency (applied to the process)**: mechanical checks BEFORE model QC;
  mechanical rubrics on Sonnet with ~8% Opus shadow; post-fix recheck only above a change
  threshold; safe-resume with file-persisted verdicts.
- **Run 3 = the optimization check (books factory, 2026-07-26)**: 78 agents / 9.9M tokens /
  **$131.50 measured** for 628 new questions + 355 repaired + 194 positional rotations +
  glossary update — vs WR3's 229 agents / 11.0M / **$137.79 measured** for 555 new questions
  (incident included). The 2026-07-25 hardening was applied end-to-end: results-on-file
  (no resume incident), grown validator with `--files-strict`, recheck only above threshold
  (11 groups). It also FUSED the QC passes (further than the method had approved) and the 8%
  shadow caught the fusion's quality cost: 5/69 weak near-misses, all on the same dimension
  → run-2 hypothesis: targeted near-miss shadow or a dedicated cheap near-miss pass.
  Honest caveat: different book/domain, so not a clean A/B — but agents −66%, cost per new
  question −16%, incidents zero is a consistent direction.
- **Run 4 = SQL practice factory (2026-07-30/31, MEDIUM-HIGH level)**: ~85 agents / **~10M
  tokens ESTIMATED** (cloud run, no local transcripts — unlike runs 2-3 this one has no
  measured cost) for 523 new questions, 298 of them **execution-verified** (real
  python+sqlite3 runs against a purpose-built deterministic dataset, expected outputs
  frozen from actual results) + a FASE 0 corpus remediation + 5 new permanent validator
  checks. What held: file-persisted outcomes survived **2 plan-window cuts with 0 lost
  batches** (the v1.9 hardening again); the **targeted** near-miss shadow (42 samples,
  run 3's hypothesis applied) found 8 real problems, incl. one where the cheap shadow had
  *promoted* defective distractors the high model dismantled — §2's complementary-classes
  pattern, in the expected direction. Honest ding: the run **started** with 16 parallel
  Opus QC agents — against run 3's consolidation lesson — and was corrected mid-run on
  Roberto's request (consolidated QC 2 Opus + 4 Sonnet, second QC pass ~85% cheaper): the
  optimization was recovered by hand, not planned in. Rough cost per new question ~19k
  tokens (estimate) vs run 3's ~15.8k measured — but this run also bought execution
  verification, a new dataset and validator growth the books run didn't need, so the
  numbers are not directly comparable.
- **Verdict**: pays off for content Roberto will use for months; the cost is dominated by
  cache reads (~225M on WR3) → the levers above target exactly that. The process-hardening
  measurably paid on the very next run; run 4 shows the lessons survive contact but only
  if the run PLAN starts from them (the QC roster didn't, and had to be corrected live).
  N=4.

## Strategies STILL WITHOUT DATA (declared)
- **Same-model repetitions** (N runs on the same task): 0 experiments.
- **Micro-commits, CI, code map, SQL inventory**: obvious qualitative benefits
  (1 documented and resolved YAML regression; inventory born after a near-miss SQL mess),
  but no measurement — and probably never worth it: they cost ~zero.
- **Self-amending constitution** (SideKick's core thesis): remains **untested** on the outcome
  that matters (does it help the human?). See FINDINGS.md — needs the study with subjects.

## How we measure from here on (data contract v1.5)
Dedicated session titles (`Project/RedTeam_N`, `Project/Research_X`, `Project/Audit_prep`)
→ per-strategy consumption comes out of the counter by itself · workflow.csv for cloud agents ·
"Observed outcome" column in DECISIONI · 1 line in ESPERIMENTI.md for every experiment.
