def solve(events, gap, lateness):
    max_t = float('-inf')
    accepted = {}
    late_dropped = 0

    for event in events:
        t = event["t"]
        k = event["key"]
        v = event["v"]

        if t > max_t:
            max_t = t

        if t < max_t - lateness:
            late_dropped += 1
            continue

        if k not in accepted:
            accepted[k] = []
        accepted[k].append((t, v))

    sessions = []
    for k, evts in accepted.items():
        evts_sorted = sorted(evts, key=lambda x: x[0])

        sess_start = evts_sorted[0][0]
        sess_end = evts_sorted[0][0]
        sess_count = 1
        sess_sum = evts_sorted[0][1]

        for i in range(1, len(evts_sorted)):
            t, v = evts_sorted[i]
            prev_t = evts_sorted[i - 1][0]
            if t - prev_t > gap:
                sessions.append({
                    "key": k,
                    "start": sess_start,
                    "end": sess_end,
                    "count": sess_count,
                    "sum": sess_sum,
                })
                sess_start = t
                sess_end = t
                sess_count = 1
                sess_sum = v
            else:
                sess_end = t
                sess_count += 1
                sess_sum += v

        sessions.append({
            "key": k,
            "start": sess_start,
            "end": sess_end,
            "count": sess_count,
            "sum": sess_sum,
        })

    return {"sessions": sessions, "late_dropped": late_dropped}
