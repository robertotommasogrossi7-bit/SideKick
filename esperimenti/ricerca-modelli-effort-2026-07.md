> Italian original: `../versione-italiano/esperimenti/ricerca-modelli-effort-2026-07.md`.

# Research - models, effort, ultracode (2026-07-03)

> **Provenance**: multi-agent research (4 Sonnet researchers on different angles + Opus
> synthesis, ~689k tokens, sources cited inline with stated data quality). Commissioned by the
> poker/who's-the-boss project to choose model+effort per phase; the derived RULES are in the
> method (CONSTITUTION, sect. 'The right model and effort for every step').
> **For the SideKick observatory**: to be reviewed when new models come out or better
> independent data appears (the Aider leaderboard didn't yet cover Opus 4.8/Sonnet 5;
> SWE-bench Verified is saturated).

# Opus 4.8 vs Sonnet 5 + effort levels + ultracode — verdict for your work

**Honest premise on data quality.** Opus 4.8 and Sonnet 5 are very recent models (announced
June 2026): the official benchmarks (SWE-bench Verified) are almost **saturated** and should be
taken with a grain of salt. Independent leaderboards with large N exist but **disagree with each
other** on the absolute numbers (see below). On **effort** and **ultracode** isolated numeric
data is scarce: there is good official qualitative documentation, but almost no public benchmark
that quantifies "how much each individual level pays off". I flag it case by case.

---

## 1. Opus 4.8 vs Sonnet 5 for your work — verdict with numbers

**Verdict: Sonnet 5 for (a) bug remediation, Opus 4.8 for (b) the delicate sync.** The gap is
real but modest; what matters more is where being wrong costs dearly.

**The quality gap (data that agree):**
- SWE-bench Verified: **Opus 4.8 88.6% vs Sonnet 5 85.2%** → gap ~3.4 points. Source:
  `https://llm-stats.com/benchmarks/swe-bench-verified` (independent leaderboard, N=103) and
  `https://www.anthropic.com/news/claude-opus-4-8` (official). *Quality: official benchmark +
  independent leaderboard, but the test is nearly saturated → the "true" gap on real work is
  probably smaller than this.*
- SWE-bench **Pro** (harder, less saturated, N=731 public, built by Scale AI, not Anthropic):
  **Opus 4.8 69.2% vs Sonnet 5 63.2%** → gap ~6 points. Sources:
  `https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro` (independent dataset) + numbers from
  the system card via `https://www.marktechpost.com/2026/06/30/...`. *Quality: the dataset is
  independent and large-N, but the scores are self-reported by Anthropic → consistent across
  sources, not independent verification.*
- Intelligence Index (Artificial Analysis, dozens of models): **Opus 4.8 = 61.4 vs Sonnet 5 =
  53** → gap ~8 points. Source:
  `https://artificialanalysis.ai/articles/claude-opus-4-8-analysis-and-benchmarks`. *Quality:
  independent large-N leaderboard — this is the clearest signal in favor of Opus.*
- Vals Index (independent, N=31): **Opus 4.8 70.36% vs Sonnet 5 68.61%** → gap only ~1.75
  points. Source: `https://www.vals.ai/models`. *Quality: independent, non-Anthropic
  leaderboard.*

**Honesty note: the independent leaderboards contradict each other.** The "true" gap oscillates
between ~1.75 (Vals) and ~8 points (Artificial Analysis) depending on how they weight tasks.
There isn't one reliable number. Aider Polyglot — which would have been excellent — **isn't
updated** for these models (stuck at Opus 4 / Sonnet 4, early 2025):
`https://aider.chat/docs/leaderboards/`. Not usable.

**Anomaly relevant to you (you work from the CLI):** on **Terminal-Bench 2.1**, **Sonnet 5 beats
Opus 4.8** (80.4% vs 74.6%). Source: `https://www.marktechpost.com/2026/06/30/...`. *Quality: to
be verified — reported by a secondary source, I didn't find it directly confirmed on the
official system card. Treat it as a clue, not a fact.* If it holds up, it's one more argument
for Sonnet 5 on work (a).

**The counterintuitive economic data (very important for your 5h budget):**
- Official prices: **Opus 4.8 $5/$25 per MTok, Sonnet 5 $3/$15** ($2/$10 on promo until
  08/31/2026). Nominally Sonnet costs ~40% less. Source:
  `https://www.anthropic.com/news/claude-sonnet-5` (official).
- **BUT** Sonnet 5 uses a **new tokenizer** that produces **1.0–1.35x more tokens** for the same
  text. Source: same (official system card).
- Empirical result: on the Intelligence Index **Sonnet 5 costs $2.29/task, ~15% MORE than Opus
  4.8** despite the halved price/token. Source:
  `https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost`. *Quality: independent
  leaderboard, empirical cost analysis.*

**Conclusion, point 1:** Sonnet 5's saving on the budget is **much smaller than the nominal
40%** — on some tasks it's even more expensive per-task. So the choice shouldn't be made on
price but on **what's at stake**: where an error costs (money/data sync), quality matters →
Opus 4.8. Where the task is scoped and verifiable with tests (bug fix, migration, unit test),
Sonnet 5 is enough.

---

## 2. How much changes between effort levels — where the diminishing returns are

Here is both the strongest signal and the biggest data gap. **The 5 levels**
(low/medium/high/xhigh/max) are officially documented: `high` is the default; `xhigh` for
long coding/agentic work (>30 min, token budget in the order of millions); `max` maximum
capability with no token constraints. Source:
`https://platform.claude.com/docs/en/build-with-claude/effort`.

**The best-quantified jump is medium→high (official data, but on the previous Opus 4.5
generation):**
- At effort **medium**, Opus 4.5 matches Sonnet 4.5's best SWE-bench score using **76% fewer
  tokens**.
- At effort **high** (default), it **beats it by 4.3 points** using **48% fewer tokens**.
- Source: `https://www.anthropic.com/news/claude-opus-4-5`. *Quality: official benchmark with
  exact figures — but it's Opus 4.5, the previous generation. The mechanism holds, the exact
  numbers don't.*

**Cost estimate per jump (secondary source, not a controlled benchmark):**
- low→medium: ~**+10 points** at a cost of ~$0.046/call.
- medium→high: another ~**+10 points** at a cost of only ~$0.007/call (economically the best
  jump).
- xhigh→max: **often negligible** on coding ("if you can't find a task that max solves and
  xhigh doesn't, you have no measurable margin").
- Source: `https://www.mindstudio.ai/blog/claude-opus-4-8-effort-levels-explained`. *Quality:
  anecdote/blog, not a published benchmark. Take the shape of the curve, not the decimals.*

**Where the diminishing returns are — and where MAX does WORSE (strong finding):**
- Anthropic itself: `max` "on many workloads adds significant cost for small gains, and on
  structured tasks can lead to **overthinking**". Recommends starting from **xhigh** for
  coding/agentic work. Source:
  `https://platform.claude.com/docs/en/build-with-claude/effort` (official).
- **Independent study (the most important data point in this section):** Andon Labs
  (Vending-Bench, long-horizon) measured **Opus 4.8 at MAX worse than at HIGH**, and both worse
  than Opus 4.7. Cause: at Max it uses ~5x the reasoning tokens → more than double the context
  "compactions" → the agent loses coherence on long tasks. Source:
  `https://andonlabs.com/blog/opus-4-8-vending-bench`. *Quality: independent third-party study,
  clear and reproducible methodology, BUT a single long-horizon benchmark — don't generalize to
  everything.*
- **Academic study** ("When More Thinking Hurts", arXiv 2604.10739, Apr 2026): beyond a
  threshold, extended reasoning makes the model **abandon correct answers** ("overthinking");
  the optimal length depends on difficulty (easy problems saturate sooner, ~2K tokens; hard ones
  ~8K). Source: `https://arxiv.org/abs/2604.10739`. *Quality: preprint not yet peer-reviewed, on
  math/science not coding — but the mechanism is directly relevant.*

**The data gap, stated clearly:** **no public benchmark isolates the quantitative impact of
each individual level** on SWE-bench for Opus 4.8/Sonnet 5. The "+10 points per jump" figures
come from blogs. What's **solid**: (1) medium→high pays off a lot and is cheap; (2)
high→xhigh pays off less; (3) xhigh→max often doesn't pay off **or gets worse** on long tasks.

---

## 3. Ultracode / multi-agent — when it pays off, when it wastes

**What it actually is:** ultracode is **not a separate API effort level**. It sends
`effort=xhigh` AND gives Claude Code permanent permission to orchestrate multi-agent workflows
(up to **16 concurrent agents**, 1000 total per run, no mid-run input). Source:
`https://platform.claude.com/docs/en/build-with-claude/effort` (official).

**When it PAYS OFF (numbers):**
- Multi-agent beats single-agent by **90.2%** on an internal Anthropic research eval (BrowseComp
  style) — **but uses ~15x the tokens** of a single chat (single-agents use ~4x). Source:
  `https://www.anthropic.com/engineering/multi-agent-research-system` (official). *Key: that
  gain is on **parallelizable research**, not on coding.*
- In the same study: **token use alone explains 80% of the variance** in performance; tokens +
  tool calls + model explain 95%. That is, the gain comes from **"more compute"**, not from
  clever architecture.

**When it WASTES (numbers) — and this is your case:**
- **Anthropic itself says explicitly** that multi-agent **is NOT suited to linear coding**
  ("most coding tasks involve fewer truly parallelizable tasks than research") nor to domains
  with shared dependencies/common context → leave those to a single agent. Source: same
  (limitations section, official).
- **Two 2026 papers** show that **at equal token budget, a single strong agent matches or beats
  multi-agent**, even on coding:
  - HumanEval: **92.1% single vs 91.6% multi-agent**, with multi costing 37–50% more. Source:
    `https://arxiv.org/html/2601.12307v1`.
  - Multi-hop reasoning: single ≥ multi at equal tokens. Source:
    `https://arxiv.org/html/2604.02460v1`.
  - *Quality: 2026 arXiv preprint, not peer-reviewed, but explicit methodology with stated
    benchmarks (incl. HumanEval/MBPP).*
- Real observed cost: 5 parallel subagents ≈ 5x tokens; extreme case with 49 subagents
  estimated at **$8,000–15,000 for a 2.5h session**. Sources:
  `https://getclaudekit.com/blog/guide/performance/parallelism-and-subagents` and
  `https://www.aicosts.ai/blog/claude-code-subagent-cost-explosion-887k-tokens-minute-crisis`.
  *Quality: anecdotes/blog, single extreme case — risk signal, not average.*
- Heuristic: only worth it if the task would take a single agent **>20–30 sequential minutes**.
  Source: `https://www.developersdigest.tech/blog/ultracode-effort-level-explained`. *Quality:
  unvalidated anecdote/blog.*

**Conclusion, point 3:** for **targeted fixes on known files, a SQL migration, unit tests**
ultracode is a **net waste** — linear tasks, single context, verifiable with tests. On the
**Max plan with the 5h window**, ultracode can burn through the window in one go. It's worth it
only for a **codebase-wide bug sweep** or an **audit** that touches dozens/hundreds of files in
parallel — not the work you described.

---

## 4. Practical recommendation for you (Max, 5h, solo dev)

**(a) Targeted bug remediation / SQL migration / unit tests → Sonnet 5, effort `high`
(default), go up to `xhigh` only if a specific fix resists.**
- Why: scoped tasks on known files, verifiable with tests. The Opus↔Sonnet gap doesn't pay off
  here; on Terminal-Bench (CLI work) Sonnet 5 might even be ahead (data to verify). `high` is
  already the default and is where medium→high paid off the most (+4.3 points Opus 4.5,
  official). **No ultracode.**
- Budget caution: Sonnet's saving vs Opus is much smaller than the nominal 40% (tokenizer +
  verbosity → ~15% more expensive per-task on some workloads). Don't count on a big discount —
  count on the fact that you don't need Opus's power here.

**(b) Delicate sync layer (money/data) → Opus 4.8, effort `xhigh`. NOT `max`.**
- Why Opus: critical correctness, costly error, real ambiguity. Here the ~8 Intelligence Index
  points / ~6 SWE-bench Pro points matter. `https://artificialanalysis.ai/...`,
  `https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro`.
- Why `xhigh` and not `max`: Andon Labs shows **max worse than high** on long tasks due to
  overthinking/compaction; Anthropic recommends xhigh as the starting point. Use `max` only on
  a single frontier problem that xhigh doesn't solve, and verify it actually helps.
  `https://andonlabs.com/blog/opus-4-8-vending-bench`,
  `https://platform.claude.com/docs/en/build-with-claude/effort`.
- **Ultracode: no**, unless the sync becomes a codebase-wide refactor across dozens of parallel
  files. A well-scoped layer doesn't justify it (and the papers show single ≥ multi at equal
  budget).

**Where to spend Fable 5 (when available, budget permitting):** on the **sync's mini-spec
BEFORE writing code** — it's the long-horizon architectural reasoning phase on a delicate
decision, consistent with your "design before code" rule from CLAUDE.md. It's the strongest
model for that, and the high cost there is justified because you use it little and for the
decision that matters most. Then move to Opus 4.8/xhigh for the implementation.

**Concise rule to keep in mind:**
> The **effort** lever matters more than the **model** choice between adjacent models; and the
> **"a good model + verification"** lever matters more than the **"more agents"** lever on
> linear coding. Both are officially documented by Anthropic
> (`https://platform.claude.com/docs/en/about-claude/models/choosing-a-model`: "tuning effort is
> often a better lever than changing model").

**What I can't tell you with solid data (final honesty):**
- The "true" Opus↔Sonnet gap on real work: the leaderboards range from 1.75 to 8 points,
  SWE-bench Verified is saturated. A range, not a number.
- How much each individual effort level pays off on Opus 4.8/Sonnet 5: **no public benchmark
  isolates it**. The per-jump figures are from blogs. Only the trend is solid (medium→high
  excellent, then diminishing, max risky).
- The quantitative benefit of ultracode: no official benchmark on the gain; only the general
  rule "multi-agent helps on parallelizable work, not on linear coding" (this one is official
  Anthropic).
