# Does giving an AI a captured "process" actually help? We measured it.

The premise of a lot of AI-dev tooling — share specs, share processes, fork a "recipe" into a new
project — rests on an untested assumption: that handing the AI a captured process **improves the
outcome**. We tested that assumption on ourselves, with controlled experiments and real numbers.

The short version: **for problems a current model already knows or can derive, a captured process
adds no net value — and usually costs more. The value, if any, is for the *human* (the weak link)
and for *new* projects, not for a strong model on work it already understands.** In the wrong
context a forked process can actively *hurt*.

This is an honest, negative-leaning result. We publish it because the rigor is the point.

## How we tested

- **With / without (A/B).** Same task, two isolated arms: one with the captured process package,
  one blind. The blind arm lives in a separate repo so it can't even read the package (a first
  attempt got contaminated; we fixed the isolation).
- **Cost, not just correctness.** We measured each arm's effort from its Claude Code transcript:
  assistant turns, tool calls, tokens. "Got it right but spent 2× the tokens" is a real outcome.
- **Objective oracles.** Where possible, a deterministic checker (e.g. localStorage data must
  reload; a hidden test suite verified by output hashes, leak-proof).
- **A reverse-engineering probe.** We also gave an arm only input→output examples (no spec) to see
  if a model can *re-derive* the hard knowledge by itself.
- **A human-style prompt.** Finally, a vague, non-expert request ("modernize my app, make it
  nicer") to test whether the package rescues a bad ask.

## What happened

| Experiment | With package | Blind | Result |
|---|---|---|---|
| **Vanilla→React migration, budget app** | 72 turns, 4.9M in-tok, data ✅ | 50 turns, 2.2M, data ✅ | Blind kept the data unaided; package **~2× cost, no benefit** |
| **Migration, habit app** | 132 turns, 9.1M, **data ❌** | 62 turns, 3.6M, data ✅ | Package arm followed "use a persist store" and **broke** old-data loading; blind got it right, cheaper |
| **Bespoke streaming rule, full spec** | 13 turns → 11/11 + 5000/5000 random | — | A clear spec is enough; the model implements it correctly |
| **Same rule, examples only (no spec)** | 17 turns → 11/11 + 5000/5000 | — | The model **re-derived** a non-obvious rule (global watermarks, retroactive merges) from 6 examples, +30% cost |
| **Vague human request** | 94 turns, data ✅, judged **worse** | 85 turns, data ✅, judged **better** | Package imposed "no redesign" against what the human actually wanted; blind did the nicer job |

(An earlier textbook task — a debt-settlement algorithm — gave the same shape: the blind arm
matched or beat the package.)

## What it means

1. **Spec-able or model-known knowledge needs no package.** If the knowledge can be written in a
   clear spec — or the model already has it from training, or can derive it from the task — a
   captured package adds nothing and costs more.
2. **Objective-oracle tests are structurally biased against showing value.** Anything with a clean
   checker is, by construction, *derivable/verifiable* — exactly the regime where a strong model
   doesn't need help. We spent five tests measuring the one regime where the package was bound to
   lose.
3. **We tested the wrong subject.** The "blind" arm was an expert AI — it asks itself the right
   questions and recognizes a correct answer. The real user of these tools is a *human* who asks
   the wrong things. These tools scaffold the **human (the weak link)**, not the model.
4. **A forked process carries its origin's constraints.** It isn't neutral overhead: in a context
   where the new person's intent differs, it can steer *away* from what they want (the vague-request
   arm). "Alignment" is to the package's author, which can conflict with the new user.
5. **So the durable, shareable asset is the *method*, not the feature.** The disciplines that keep a
   human+AI collaboration organized — capture ideas without losing focus, design before code,
   micro-commits, fresh handoffs — plus the judgment a model won't volunteer. And, crucially, that
   value shows up for **non-experts and brand-new projects**, and as a **shared standard that
   evolves**, not for an expert running a strong model on a trained project.

## So where's the value?

Not in "the AI couldn't do it without us" (false). It's in:

- **Onboarding a good method instantly** — for people who don't have one, and for new projects
  before you've "trained" them.
- **A shared, self-improving method** — a constitution others fork, improve, and re-share; the
  better version rises.
- **The finding itself** — a measured map of where AI-process-capture helps and where it doesn't.
  Most projects assert; this one tested.

That reframes the product from "a package manager of features" to **a shareable, self-evolving
working method for building with AI** — delivered as standing AI behavior (a constitution the AI
follows proactively and updates itself), not as commands you press.

## Honest limitations

- Strong models (Opus/Sonnet) and small N. A weaker model, or a true beginner, might show more
  package value — untested.
- The apps were our own, mostly standard. The one regime we expect to matter — **whole projects
  with delicate cross-cutting concerns (auth, accounts, money)** — is still untested, deferred to
  when our test app is complete.
- "Better job" on the vague request is a single human's judgment, not a metric.

## Relation to Spec Kit

[GitHub Spec Kit](https://github.com/github/spec-kit) makes the spec-first discipline a ritual —
which is exactly why it's adopted: it scaffolds the *human's* process, not the model's capability.
Our contribution sits next to it, and is now **Spec-Kit-native**:

- A drop-in **`constitution.md`** in Spec Kit's format
  ([`plugins/metodo/spec-kit/constitution.md`](plugins/metodo/spec-kit/constitution.md)) that you
  place at `.specify/memory/constitution.md`. It adds the principle Spec Kit's constitution lacks —
  **self-amendment** (the agent evolves the method instead of reading a passive doc once).
- The empirical **finding** above (the honest map of where process-capture helps).
- Two small reusable evaluation tools: a transcript **cost-meter** and a **leak-proof hidden-test
  grader**.

(In Spec Kit, *presets/extensions* override the `spec`/`plan`/`tasks` **templates**; a constitution
is **memory**, not a template — so the method ships as a constitution drop-in, not a preset.)

---

*Part of [SideKick](https://github.com/robertotommasogrossi7-bit/SideKick). The full experiment log
lives in `_processo/DECISIONI.md`; the experiments themselves in `esperimenti/`.*
