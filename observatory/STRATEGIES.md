# METHOD STRATEGIES — costs and gains (honest register)

> **What it is**: every method/process choice we're testing, with **how much it costs us**
> (tokens, measured where possible) and **how much it has paid off** (benefits observed,
> concrete). Same honesty as FINDINGS.md: small N = clues; where the cost isn't measurable we
> say so, we don't make it up. Updated by the observatory chat at the ritual. Last review:
> **2026-07-16**.

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

### 2. Cross-model shadow verification (inside audits)
- **Measured cost**: ~39k tokens for 1 duplicated agent (≈8% of the verifications).
- **Observed gain**: 1 finding out of 2 downgraded with **4 factual errors discovered**
  inside the finding → wasted remediation work avoided. Pattern found: on **code**
  findings the models are equivalent; on **process/config** findings the higher model
  falsifies better.
- **Verdict**: minimum cost, useful data. N=2 — continue.

### 3. Switching chats / cache (context economics)
- **Measured cost**: read cache ≈**170×** the live tokens (2.8 billion vs 16.5M) — it's the
  biggest cost item of all; resuming the interrupted audit reused **100%** of the completed
  steps (zero rework).
- **Verdict**: rule in constitution v1.5 (handoff at milestones, resume when possible).

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
