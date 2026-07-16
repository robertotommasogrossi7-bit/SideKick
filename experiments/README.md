# experiments/ — the with/without tests (where a process package helps, and where it doesn't)

This folder collects the **with/without** experiments used to put SideKick's thesis to the
test: *does giving an AI a process package improve the result, compared to not giving it one?*

## Why they weren't here before (important)
During testing these folders lived **outside the repo** (in `Programmi/_migr-test`,
`_stream-test`, `_vague-test`), as separate git projects. **On purpose, for reliability:** the
**"blind"** arm (without the package) must not be able to read either the package or
SideKick's library, otherwise the comparison is **contaminated** (this actually happened, see
`DECISIONI.md` 2026-06-04, fork-test v1). Each arm was therefore an isolated root. Once tests
concluded, we **archived them here** for transparency (source, without `node_modules`/`dist`;
each arm's commit history is in `_git-history.txt`).

## What's here
- `migrazione/` — `{budget,habit}-{armA,armB}`: vanilla→React migration, with/without the
  `migrazione-a-componenti` package.
- `streaming/` — `discovery/` (with a full spec) and `reverse/` (examples only, rule to be
  inferred) of a bespoke sessionization problem; `oracle/` = reference + **leak-proof** grader
  (hash) + generators + property-tests.
- `richiesta-vaga/` — `budget-arm{A,B}`: **same vague request from a non-expert**, arm-A with
  the environmental package (CLAUDE.md), arm-B bare. The "human-side" test.
- `cost-meter.mjs` — measures the **cost** (turns/tokens) of an arm from its transcripts.

## What we found (summary; detail in `../_processo/DECISIONI.md`)
- When the model **already knows or can derive it**, the package **doesn't improve** the
  outcome and **costs more** (migration ~2x; streaming solved cleanly; reverse, *without* a
  spec, +30%).
- In the **human-side** test the package even **misaligned**: the human wanted a redesign, the
  package imposed "identical behavior" → the blind arm did **better**.
- Lesson: the value isn't imposing a process (it can do harm in the wrong context), but
  offering **non-derivable**, **relevant** knowledge, chosen by the human. That's what F3
  aims at.
