from collections import defaultdict


def solve(events, gap, lateness):
    """Vedi SPEC.md. Verìficati con: python grader.py  (obiettivo 11/11).

    events: lista di {"key": str, "t": int, "v": number} in ordine d'arrivo.
    ritorna {"sessions": [{"key","start","end","count","sum"}, ...], "late_dropped": int}
    """
    survivors = []
    late_dropped = 0
    max_t_so_far = None  # max t seen in arrivals 0..i-1 (ALL keys, including dropped)

    for i, e in enumerate(events):
        t = e["t"]

        # Compute watermark W before processing event i
        # W is undefined for the first event (i=0, no prior arrivals)
        if max_t_so_far is not None:
            W = max_t_so_far - lateness
            if t < W:  # strict: drop iff t_e < W
                late_dropped += 1
                # Dropped events still count toward max (per spec)
                if t > max_t_so_far:
                    max_t_so_far = t
                continue

        survivors.append({"arrival_idx": i, "key": e["key"], "t": t, "v": e["v"]})

        if max_t_so_far is None or t > max_t_so_far:
            max_t_so_far = t

    # Group survivors by key
    groups = defaultdict(list)
    for s in survivors:
        groups[s["key"]].append(s)

    sessions = []
    for key, evts in groups.items():
        # Sort by (t, arrival_idx) for tie-breaking
        evts.sort(key=lambda e: (e["t"], e["arrival_idx"]))

        # Sessionize: split into maximal blocks where consecutive gap <= gap
        current = [evts[0]]
        for j in range(1, len(evts)):
            if evts[j]["t"] - evts[j - 1]["t"] <= gap:
                current.append(evts[j])
            else:
                sessions.append({
                    "key": key,
                    "start": current[0]["t"],
                    "end": current[-1]["t"],
                    "count": len(current),
                    "sum": sum(e["v"] for e in current),
                })
                current = [evts[j]]

        sessions.append({
            "key": key,
            "start": current[0]["t"],
            "end": current[-1]["t"],
            "count": len(current),
            "sum": sum(e["v"] for e in current),
        })

    sessions.sort(key=lambda s: (s["key"], s["start"]))

    return {"sessions": sessions, "late_dropped": late_dropped}
