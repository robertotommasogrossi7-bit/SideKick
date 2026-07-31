# Robust sessionization under late events — specification

Implement `solve(events, gap, lateness)` in `solution.py` following this specification.
Check yourself with `python grader.py` (runs your `solve` on hidden test cases and tells
you how many pass; it **does not** show the expected outputs). Target: **11/11**.

## Contract
- `events`: list of `{key, t, v}` in **ARRIVAL order** (the stream; **NOT** sorted by `t`).
  `t` is an integer, `v` is numeric, `key` is a string.
- returns `{"sessions": [ {key, start, end, count, sum}, ... ], "late_dropped": int}`,
  with the sessions sorted by `(key, start)`.

## Semantics
1. **GLOBAL watermark.** Before incorporating the event at position *n* (0-based),
   `W = (max t among arrivals 0..n-1, across ALL keys) − lateness`. For the first event `W`
   is undefined. The `max` also includes events that later get dropped.
2. **Late-drop.** Event `e` is **dropped** if `t_e < W` (**strict** boundary). It is counted
   in `late_dropped`. The others are *survivors*.
3. **Session** (per key, over survivors only). Sort by `t` (tie-break: **arrival
   index**), then split into **maximal** blocks where every consecutive pair has
   `t_next − t_prev ≤ gap`.
4. **Aggregates:** `start=min t`, `end=max t`, `count=#events`, `sum=Σv`.
5. **Output** sorted by `(key, start)`; plus `late_dropped`.
6. **Pure function** (same input → same output; idempotent).

## Example (to understand it) — `gap=15, lateness=60`
Arrivals: `A10, A20, B100, A40, A30, B110, A5, B130, A200, A38`

Output: `late_dropped = 3`; sessions:

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 10 | 20 | 2 | 2 |
| A | 40 | 40 | 1 | 1 |
| A | 200 | 200 | 1 | 1 |
| B | 100 | 110 | 2 | 2 |
| B | 130 | 130 | 1 | 1 |

## Verification
`python grader.py` → `PASSED k/11` + the labels of the failed cases (they suggest the
**area** of the problem, not the answer). Aim for **11/11**.
