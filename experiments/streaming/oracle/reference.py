"""Reference implementation (PRIVATE ORACLE) for the 'robust sessionization' test.
Does NOT go into the arms' folders: it is the answer key.

Semantics (see experiments/streaming/discovery/SPEC.md):
- Input: list of events {key, t, v} in ARRIVAL order (not sorted by t).
- GLOBAL watermark: before incorporating event n, W = max(t over arrivals 0..n-1) - lateness.
- Late-drop: event e is dropped if t_e < W (strictly). Dropped events are counted.
- Session (per key, over SURVIVORS): sorted by t (tie-break: arrival index),
  maximal blocks with consecutive gap <= G.
- Output: sessions {key, start, end, count, sum} sorted by (key, start) + late_dropped.
- Pure function => idempotent.
"""
from collections import defaultdict


def solve(events, gap, lateness):
    survivors = []
    late_dropped = 0
    max_t_before = None  # max t over strictly preceding arrivals (including dropped ones)
    for e in events:
        w = None if max_t_before is None else max_t_before - lateness
        if w is not None and e["t"] < w:
            late_dropped += 1
        else:
            survivors.append(e)
        max_t_before = e["t"] if max_t_before is None else max(max_t_before, e["t"])

    by_key = defaultdict(list)
    for i, e in enumerate(survivors):
        by_key[e["key"]].append((e["t"], i, e["v"]))

    sessions = []
    for key, lst in by_key.items():
        lst.sort(key=lambda x: (x[0], x[1]))
        cur = None
        for t, _, v in lst:
            if cur is None:
                cur = {"key": key, "start": t, "end": t, "count": 1, "sum": v}
            elif t - cur["end"] <= gap:
                cur["end"] = t
                cur["count"] += 1
                cur["sum"] += v
            else:
                sessions.append(cur)
                cur = {"key": key, "start": t, "end": t, "count": 1, "sum": v}
        if cur is not None:
            sessions.append(cur)

    sessions.sort(key=lambda s: (s["key"], s["start"]))
    return {"sessions": sessions, "late_dropped": late_dropped}


if __name__ == "__main__":
    # Example from the SPEC, derived by hand: G=15, L=60
    ev = [
        {"key": "A", "t": 10, "v": 1}, {"key": "A", "t": 20, "v": 1},
        {"key": "B", "t": 100, "v": 1}, {"key": "A", "t": 40, "v": 1},
        {"key": "A", "t": 30, "v": 1}, {"key": "B", "t": 110, "v": 1},
        {"key": "A", "t": 5, "v": 1}, {"key": "B", "t": 130, "v": 1},
        {"key": "A", "t": 200, "v": 1}, {"key": "A", "t": 38, "v": 1},
    ]
    got = solve(ev, gap=15, lateness=60)
    expected = {
        "late_dropped": 3,
        "sessions": [
            {"key": "A", "start": 10, "end": 20, "count": 2, "sum": 2},
            {"key": "A", "start": 40, "end": 40, "count": 1, "sum": 1},
            {"key": "A", "start": 200, "end": 200, "count": 1, "sum": 1},
            {"key": "B", "start": 100, "end": 110, "count": 2, "sum": 2},
            {"key": "B", "start": 130, "end": 130, "count": 1, "sum": 1},
        ],
    }
    assert got == expected, f"MISMATCH\n got={got}\n exp={expected}"
    # idempotence
    assert solve(ev, 15, 60) == got
    print("OK: reference matches the hand-derived oracle (5 sessions, 3 dropped)")
