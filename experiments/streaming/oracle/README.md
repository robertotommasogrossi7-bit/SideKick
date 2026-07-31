# oracle/ — the leak-proof grader behind the streaming experiments

This folder is the **answer key** for the "robust sessionization" test used by the
`discovery/` and `reverse/` arms. It never ships an expected output in the open: every
grader compares a **SHA-256 hash** of the candidate's (canonicalized) result against a
stored hash, so a solution can be scored without ever revealing what the correct answer
looks like.

## How the leak-proof design works
1. `reference.py` is the **private oracle**: a from-scratch, spec-faithful implementation
   of `solve(events, gap, lateness)`. It never gets copied into an arm's folder.
2. `gen_oracle.py` runs the reference on a fixed set of hidden cases and writes two files:
   `cases.json` (input + params + `expected_hash` — safe to ship to an arm) and
   `expected_full.json` (the full expected output — kept private, for diagnosing failures).
3. `grader.py` (copied into each arm's folder) loads `cases.json`, runs the arm's own
   `solution.py` on every case, hashes the result, and compares it to `expected_hash`. It
   also re-runs each case once more to check idempotence. Only pass/fail and the case
   **labels** of failures are shown — the labels are hints about the trap, not the answer.
4. `property_test.py` cross-checks an arm's `solution.py` against `reference.py` on
   thousands of random inputs, to catch bugs the 11 hidden cases don't happen to trigger.
5. `naive_solution.py` is the deliberately-wrong "first instinct" implementation (no
   watermark, no late-drop), kept here to demonstrate that the oracle actually rejects it.
6. `gen_examples.py` builds the `reverse/` arm's `examples.md` (visible input→output pairs,
   no rules stated) and a copy of `cases.json` with neutral labels (`case_01`, `case_02`, …)
   so the labels can't leak the rule.

## Files
- `reference.py` — the private oracle implementation (the correctness source of truth).
- `naive_solution.py` — the naive attempt, used to prove the oracle has teeth.
- `gen_oracle.py` — generates `cases.json` (hashes, shippable) and `expected_full.json`
  (full expected output, private).
- `gen_examples.py` — generates the `reverse/` arm's `examples.md` and neutral-label
  `cases.json`.
- `property_test.py` — randomized differential test: arm's `solution.py` vs. `reference.py`.
- `grader.py` — the leak-proof grader itself (also copied verbatim into `discovery/` and
  `reverse/`).
- `cases.json` — the hidden test cases (input + params + expected hash only).

## Running it
```
python gen_oracle.py                 # regenerate cases.json + expected_full.json
python gen_examples.py [arm_dir]     # regenerate the reverse arm's examples.md + cases.json
python property_test.py [arm_dir]    # differential-test an arm's solution.py
python grader.py [solution_module]   # score a solution against the hidden cases
```

Note: `grader.py` expects a `solution` module **supplied by the adopting arm** — it is
deliberately absent from this folder, since `oracle/` is the grading machinery, not a
contestant.
