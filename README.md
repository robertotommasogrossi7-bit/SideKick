# SideKick — a real-world lab on building software with Claude Code

One beginner developer, several real apps, **every transcript measured**. This repo collects
real experiments, real token data, and honest negative results about *how* to work with an AI
coding agent — plus the small tools used to measure it all.

> **What this is:** exploratory case studies with the sample sizes always stated (usually
> N=1–2). **What this is not:** benchmarks or proven best practices. Negative results are
> published on purpose.

## What you can take away

| Thing | Where | Why it's rare |
|---|---|---|
| **Per-session token telemetry for Claude Code** | [`osservatorio/consumo.mjs`](osservatorio/consumo.mjs) → dataset in [`osservatorio/consumo/`](osservatorio/consumo/) (CSV + dashboard) | Scans every local transcript and attributes tokens to each project, model, month **and named operation** (session titles). Private projects redacted. Very little real Claude Code consumption data is public — this grows automatically with use. |
| **Cost meter for A/B experiment arms** | [`esperimenti/misura-token.mjs`](esperimenti/misura-token.mjs) | Measures turns/tokens of a with/without experiment from its transcripts. |
| **Leak-proof hidden-test grader** | [`esperimenti/streaming/oracolo/`](esperimenti/streaming/oracolo/) | Tests whether a process artifact helps, without revealing the answers to the model. |
| **The writeup** | [`FINDINGS.md`](FINDINGS.md) | *"I tried to measure whether captured process helps AI-assisted dev — and couldn't build a fair test (yet)."* Includes the contaminated first attempt and the external adversarial review that tore up v1. |
| **A Spec Kit constitution drop-in** | [`plugins/metodo/spec-kit/constitution.md`](plugins/metodo/spec-kit/constitution.md) | A self-amending working-method constitution in Spec Kit format (v1.5.0). |

## The lab (live data)

[`osservatorio/`](osservatorio/) is the observatory (English; Italian originals in
[`versione-italiano/`](versione-italiano/LEGGIMI.md)):

- [`consumo/CONSUMO.md`](osservatorio/consumo/CONSUMO.md) — the cost dashboard: totals, the
  most expensive operations, per-project drilldowns (one file per project).
- [`STRATEGIES.md`](osservatorio/STRATEGIES.md) — cost/benefit register of every working-method
  strategy under test: multi-agent audits, cross-model shadow checks, red teams, **including
  the strategies that failed and were dropped**.
- [`redteam/VERDICTS.md`](osservatorio/redteam/VERDICTS.md) — before this repo went public in
  its current form, two independent AI reviewers tore the dossier apart; the verdicts, the
  claim-by-claim verification (one reviewer "correction" turned out to be wrong), and the
  fixes are all in the open.
- [`DATA.md`](osservatorio/DATA.md) / [`PLAN.md`](osservatorio/PLAN.md) — what the data can
  and cannot say yet, and what's next.

A few sampled findings (details and caveats inside): a heavy multi-agent audit found real
critical bugs on both projects it ran on, at a known cost; on code-verification tasks small
and large models tied (process design paid, not model size); cache reads were ~170× the live
tokens across all chats, so resuming beats restarting.

## The method (appendix — operating hypotheses, not proven rules)

We also maintain a **working-method constitution** for human+AI collaboration: idea capture,
design-before-code, research-before-choosing, model+effort per step, a "data contract" so
every chat leaves measurable traces. It lives in [`plugins/metodo/`](plugins/metodo/)
(Italian master · English version · Spec Kit drop-in) and is **self-amending**: the method is
expected to change as the data comes in. Every rule in it is an operating hypothesis backed
by small N.

To use it: copy [`plugins/metodo/COSTITUZIONE.md`](plugins/metodo/COSTITUZIONE.md) (or the
[English version](plugins/metodo/CONSTITUTION.md)) into your `~/.claude/CLAUDE.md`, or drop
the [Spec Kit constitution](plugins/metodo/spec-kit/constitution.md) into
`.specify/memory/constitution.md`.

Relation to [GitHub Spec Kit](https://github.com/github/spec-kit): Spec Kit organizes the
*work* (constitution → spec → plan → tasks); SideKick measures the *collaboration* — what
each method choice costs and returns — and ships its method as a Spec Kit constitution
drop-in.

## Honesty rules of this repo

1. Sample sizes stated next to every claim; small N is called an *indication*, never proof.
2. Negative results and dropped strategies stay published (`FINDINGS.md`, the raw Italian
   logs in `versione-italiano/_processo/`, the "dropped" section of `STRATEGIES.md`).
3. Anything public goes through an external AI red team first — and the reviewers' claims get
   verified at the source too (they're sometimes wrong).

## Italiano

Tutta la documentazione di lavoro in italiano è in
[`versione-italiano/`](versione-italiano/LEGGIMI.md) (guida, libreria dei pacchetti,
motore di distillazione, compiti dell'osservatorio).

## License

[MIT](LICENSE)
