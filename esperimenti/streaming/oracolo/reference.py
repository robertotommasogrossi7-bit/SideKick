"""Reference implementation (ORACOLO PRIVATO) per il test 'sessionizzazione robusta'.
NON va nelle cartelle dei bracci: è la chiave di correzione.

Semantica (vedi _processo/test-streaming/SPEC.md):
- Input: lista di eventi {key, t, v} in ordine d'ARRIVO (non per t).
- Watermark GLOBALE: prima di incorporare l'evento n, W = max(t degli arrivi 0..n-1) - lateness.
- Late-drop: l'evento e e' scartato se t_e < W (strettamente). I dropped si contano.
- Sessione (per chiave, sui SOPRAVVISSUTI): ordinati per t (tie-break: indice d'arrivo),
  blocchi massimali con gap consecutivo <= G.
- Output: sessioni {key, start, end, count, sum} ordinate per (key, start) + late_dropped.
- Funzione pura => idempotente.
"""
from collections import defaultdict


def solve(events, gap, lateness):
    survivors = []
    late_dropped = 0
    max_t_before = None  # max t sugli arrivi strettamente precedenti (inclusi gli scartati)
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
    # Esempio dello SPEC, derivato a mano: G=15, L=60
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
    # idempotenza
    assert solve(ev, 15, 60) == got
    print("OK: reference combacia con l'oracolo derivato a mano (5 sessioni, 3 scartati)")
