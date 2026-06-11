# Can captured "processes" help AI-assisted development? I tried to measure it — and couldn't build a fair test (yet)

A lot of AI-dev tooling rests on an untested assumption: that handing the AI a captured process —
a spec, a recipe, a "package" distilled from a previous build — **improves the outcome**. I set out
to test that assumption on my own project. This is an honest account of what I ran, what it can and
cannot support, and what a real test would take.

**The honest summary, up front:**

- What I ran is a handful of **small, single-shot probes** (N=1 per condition). They are
  **anecdotes with numbers attached, not measurements.** LLMs are stochastic; without 20–30 runs
  per arm and dispersion statistics, a "72 vs 50 turns" difference proves nothing by itself.
- That said, every probe pointed the same way: **a strong model *without* the captured process
  matched or beat the arm that had it**, and the with-process arm consistently consumed more
  tokens. In one probe the process actively steered against what the user wanted.
- These probes **cannot answer the question that matters**, because they test the wrong subject:
  an *expert AI*, while the plausible beneficiary of process-scaffolding is the *human* who asks
  the wrong things. That hypothesis — the real one — **remains untested.**
- A first version of this writeup claimed "we measured it." I had it **adversarially reviewed by
  independent AI models** prompted as skeptical senior engineers; their convergent verdict
  (rigor ≈ 3/10, *"sells a level of rigor it doesn't have"*) led to this rewrite. The full
  review log is public in this repo.

## What I ran (single-shot probes — read as anecdotes)

Each row is **one run per arm**, same task, isolated arms (the "blind" arm could not read the
package; an early contaminated attempt was redone). Cost measured from Claude Code transcripts.

| Probe | With package | Blind | What happened |
|---|---|---|---|
| Vanilla→React migration, budget app | 72 turns, 4.9M in-tok, data ✅ | 50 turns, 2.2M, data ✅ | Blind preserved the stored data unaided; package cost ~2× in this run |
| Migration, habit app | 132 turns, 9.1M, **data ❌** | 62 turns, 3.6M, data ✅ | Package arm followed "use a persist store" and broke old-data loading; blind got it right |
| Bespoke streaming rule, full spec given | 13 turns → 11/11 hidden tests, 5000/5000 random | — | A clear spec was enough |
| Same rule, 6 examples only (no spec) | 17 turns → 11/11, 5000/5000 | — | The model **re-derived** a non-obvious rule (global watermarks, retroactive merges) at +30% cost |
| Vague human-style request ("modernize it, make it nicer") | 94 turns, data ✅, judged worse | 85 turns, data ✅, judged better | The package imposed "no redesign" against the request's intent. **Caveat: single, non-blind human judgment** |

(An earlier probe on a textbook settlement algorithm had the same shape: blind matched or beat the package.)

## Why these probes can't answer the real question

1. **N=1 per cell.** Run-to-run variance alone could explain the cost gaps. Fatal for any general claim.
2. **Wrong subject.** The "blind" arm is an expert AI that asks itself the right questions. The
   tool's plausible user is a human who doesn't. I tested the strong link and concluded about the
   weak one — that's a gap words can't close.
3. **Single non-blind judge** on the only probe showing active harm (the vague request). No rubric,
   no second rater.
4. **Task selection is structurally biased.** Anything with a clean objective oracle is, by
   construction, derivable/verifiable — exactly the regime where a strong model needs no help. My
   probes were rigged to lose before they started; I understood this only afterwards.
5. **Confound.** The habit-app failure shows *that package* carried *one bad instruction* for *that
   context* — it doesn't separate "process-capture hurts" from "this package had a bug." A
   corrected-package arm was never run.

## What I'd still defend (weakly, as informed hunches)

- For tasks a strong model already knows or can derive — most standard CRUD/migration/algorithm
  work — packaged process knowledge is **overhead at best**. (Consistent across all probes; also
  consistent with what experienced LLM users already report.)
- A forked process **carries its origin's constraints** and can conflict with a new user's intent.
  (One example, but mechanically obvious once seen.)
- **Cost (tokens/turns) is a real outcome dimension** that almost nobody reports. "Got it right
  but at 2× spend" should count.

## The hypothesis that remains untested

**Process-scaffolding helps the *human* — the one who asks wrong, in the wrong order, and can't
always recognize a wrong answer — and helps most at entry level and on new projects.** Every probe
I ran is silent on this. It is *not disproven*; it has simply never been tested here.

## What a fair test would take

- **20–30+ runs per arm**, distributions, variance, effect sizes — not single runs.
- **Human subjects** (entry-level), with/without the method, on tasks with delicate parts
  (auth, accounts, money), outcomes scored by **blind judges with a rubric** (data loss, security
  holes via checklist, time, cost) — not by the author.
- **Non-derivable tasks**: proprietary domains or cross-cutting concerns, not textbook migrations.
- **A corrected-package arm**, to separate process structure from package content.
- **Longitudinal measures**: bugs, regressions, onboarding time after days/weeks, not just at delivery.

**Status: designed, not run.** I currently lack test subjects. If you'd like to participate in a
small with/without study, open an issue on this repo.

## What survives this exercise

- **Two reusable evaluation tools**: a transcript **cost-meter** (`esperimenti/misura-token.mjs`)
  and a **leak-proof hidden-test grader** (`esperimenti/streaming/oracolo/`) for testing whether a
  process artifact helps, without revealing answers.
- **The full, public experiment log** — including the contaminated first attempt, the negative
  results, and the adversarial external review (`_processo/`).
- **A proposal, clearly labeled as untested:** a proactive, self-amending working-method
  constitution (`plugins/metodo/`), also in Spec Kit drop-in format
  (`plugins/metodo/spec-kit/constitution.md`, placed at `.specify/memory/constitution.md`). Spec
  Kit's own constitution is read-once and passive; this one instructs the agent to evolve it. No
  evidence yet that self-amendment improves anything — that's the human study above.

## Relation to Spec Kit

[GitHub Spec Kit](https://github.com/github/spec-kit) ritualizes spec-first development — which is
plausibly why it's adopted: it scaffolds the *human's* process, not the model's capability. That
reading is consistent with my probes, but on this evidence it's an interpretation, not a result.
(Mechanical note for anyone shipping method-content to Spec Kit: presets/extensions override
*templates* (`spec`/`plan`/`tasks`); a constitution is *memory* (`.specify/memory/`), so a method
ships as a constitution drop-in, not a preset.)

---

*Part of [SideKick](https://github.com/robertotommasogrossi7-bit/SideKick). Experiment log:
`_processo/DECISIONI.md` · external review verdicts: `_processo/VALUTAZIONE-ESTERNA.md` ·
the probes themselves: `esperimenti/`.*
