"""Genera la suite nascosta: per ogni caso, calcola l'output con reference.solve e
salva cases.json (input + gap + lateness + HASH atteso, leak-proof, per il grader nelle
cartelle dei bracci) + expected_full.json (output completo, PRIVATO, per la mia diagnosi)."""
import os, json, hashlib
import reference

HERE = os.path.dirname(os.path.abspath(__file__))


def _num(x):
    f = float(x)
    return int(f) if f.is_integer() else round(f, 9)


def canonical(result):
    rows = sorted(
        [[str(s["key"]), int(s["start"]), int(s["end"]), int(s["count"]), _num(s["sum"])]
         for s in result.get("sessions", [])],
        key=lambda r: (r[0], r[1]),
    )
    obj = {"sessions": rows, "late_dropped": int(result.get("late_dropped", -1))}
    return json.dumps(obj, separators=(",", ":"), ensure_ascii=False)


def h(result):
    return hashlib.sha256(canonical(result).encode("utf-8")).hexdigest()


def ev(seq):
    return [{"key": k, "t": t, "v": v} for (k, t, v) in seq]


CASES = [
    {"label": "esempio-spec", "gap": 15, "lateness": 60, "input": ev([
        ("A", 10, 1), ("A", 20, 1), ("B", 100, 1), ("A", 40, 1), ("A", 30, 1),
        ("B", 110, 1), ("A", 5, 1), ("B", 130, 1), ("A", 200, 1), ("A", 38, 1)])},
    {"label": "merge-retroattivo-tenuto", "gap": 25, "lateness": 100, "input": ev([
        ("A", 0, 1), ("A", 40, 1), ("A", 20, 1)])},
    {"label": "merge-ucciso-da-watermark-globale", "gap": 25, "lateness": 100, "input": ev([
        ("A", 0, 1), ("A", 40, 1), ("B", 500, 1), ("A", 20, 1)])},
    {"label": "confine-stretto", "gap": 1000, "lateness": 10, "input": ev([
        ("A", 100, 1), ("A", 90, 1)])},
    {"label": "ties-stesso-t", "gap": 15, "lateness": 60, "input": ev([
        ("A", 10, 1), ("A", 10, 2)])},
    {"label": "v-negativi-zero", "gap": 15, "lateness": 60, "input": ev([
        ("A", 10, -5), ("A", 20, 3), ("A", 60, 0)])},
    {"label": "vuoto", "gap": 15, "lateness": 60, "input": []},
    {"label": "singolo", "gap": 15, "lateness": 60, "input": ev([("A", 42, 7)])},
    {"label": "tutti-scartati-tranne-spike", "gap": 10, "lateness": 5, "input": ev([
        ("A", 100, 1), ("A", 10, 1), ("A", 12, 1), ("A", 14, 1)])},
    {"label": "misto-grande", "gap": 20, "lateness": 80, "input": ev([
        ("X", 0, 1), ("X", 200, 1), ("Y", 5, 1), ("X", 50, 1), ("Y", 10, 1), ("X", 100, 1),
        ("X", 30, 1), ("Y", 210, 1), ("X", 205, 1), ("Y", 15, 1), ("X", 8, 1), ("Y", 400, 1),
        ("X", 250, 1), ("X", 246, 1), ("Y", 405, 1), ("X", 900, 1)])},
    {"label": "misto-grande-altri-parametri", "gap": 60, "lateness": 150, "input": ev([
        ("X", 0, 1), ("X", 200, 1), ("Y", 5, 1), ("X", 50, 1), ("Y", 10, 1), ("X", 100, 1),
        ("X", 30, 1), ("Y", 210, 1), ("X", 205, 1), ("Y", 15, 1), ("X", 8, 1), ("Y", 400, 1),
        ("X", 250, 1), ("X", 246, 1), ("Y", 405, 1), ("X", 900, 1)])},
]

public, full = [], []
for c in CASES:
    expected = reference.solve(c["input"], c["gap"], c["lateness"])
    public.append({"label": c["label"], "input": c["input"], "gap": c["gap"],
                   "lateness": c["lateness"], "expected_hash": h(expected)})
    full.append({"label": c["label"], "expected": expected})

json.dump(public, open(os.path.join(HERE, "cases.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
json.dump(full, open(os.path.join(HERE, "expected_full.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print(f"Generati {len(CASES)} casi -> cases.json (hash) + expected_full.json (privato)")
