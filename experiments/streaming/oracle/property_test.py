"""Property test: confronta la solution del braccio con la reference su molti input random.
Se combaciano sempre, la solution e' davvero corretta (non solo sui 11 casi nascosti)."""
import sys, os, json, random

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)  # reference.py
ARM = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\rober\Desktop\Programmi\_stream-test\discovery"
sys.path.insert(0, ARM)   # solution.py del braccio

import reference
import solution  # noqa: E402


def _num(x):
    f = float(x)
    return int(f) if f.is_integer() else round(f, 9)


def canon(r):
    rows = sorted([[str(s["key"]), int(s["start"]), int(s["end"]), int(s["count"]), _num(s["sum"])]
                   for s in r.get("sessions", [])], key=lambda r: (r[0], r[1]))
    return json.dumps({"sessions": rows, "late_dropped": int(r.get("late_dropped", -1))},
                      separators=(",", ":"))


rng = random.Random(12345)
N = 5000
bad = 0
first = None
for _ in range(N):
    n = rng.randint(0, 30)
    keys = ["A", "B", "C", "D"]
    ev = [{"key": rng.choice(keys), "t": rng.randint(0, 400), "v": rng.randint(-3, 6)} for _ in range(n)]
    gap = rng.choice([1, 5, 10, 15, 20, 40, 80])
    lat = rng.choice([0, 5, 10, 30, 60, 100, 200])
    a = solution.solve(ev, gap, lat)
    b = reference.solve(ev, gap, lat)
    if canon(a) != canon(b):
        bad += 1
        if first is None:
            first = {"events": ev, "gap": gap, "lateness": lat, "got": a, "exp": b}

print(f"property-test: {N - bad}/{N} combaciano con la reference")
if first:
    print("PRIMO MISMATCH:", json.dumps(first, ensure_ascii=False)[:400])
else:
    print("Nessun mismatch: la solution e' corretta anche fuori dai casi nascosti.")
