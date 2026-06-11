"""Tentativo NAIVE (la strada del primo istinto): sessionizza per chiave, ordina per t,
spezza sul gap. NESSUN watermark, NESSUN late-drop. Serve a dimostrare che il naive
fallisce l'oracolo."""
from collections import defaultdict


def solve(events, gap, lateness):
    by_key = defaultdict(list)
    for e in events:
        by_key[e["key"]].append((e["t"], e["v"]))
    sessions = []
    for key, lst in by_key.items():
        lst.sort()
        cur = None
        for t, v in lst:
            if cur is None:
                cur = {"key": key, "start": t, "end": t, "count": 1, "sum": v}
            elif t - cur["end"] <= gap:
                cur["end"] = t; cur["count"] += 1; cur["sum"] += v
            else:
                sessions.append(cur)
                cur = {"key": key, "start": t, "end": t, "count": 1, "sum": v}
        if cur:
            sessions.append(cur)
    sessions.sort(key=lambda s: (s["key"], s["start"]))
    return {"sessions": sessions, "late_dropped": 0}
