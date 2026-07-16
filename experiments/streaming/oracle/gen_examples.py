"""Per il braccio REVERSE (semantica nascosta): genera examples.md (esempi input->output
VISIBILI, niente regole) + cases.json con etichette NEUTRE (case_01..), cosi' le label non
rivelano la regola. Scrive nella cartella del braccio reverse."""
import os, json
import reference

HERE = os.path.dirname(os.path.abspath(__file__))
ARM = r"C:\Users\rober\Desktop\Programmi\_stream-test\reverse"
os.makedirs(ARM, exist_ok=True)


def ev(seq):
    return [{"key": k, "t": t, "v": v} for (k, t, v) in seq]


# Esempi VISIBILI (diversi dai 11 casi nascosti), scelti per rendere deducibile la regola.
EXAMPLES = [
    {"gap": 20, "lateness": 100, "input": ev([("A", 0, 1), ("A", 10, 1)])},
    {"gap": 20, "lateness": 100, "input": ev([("A", 0, 1), ("A", 50, 1)])},
    {"gap": 15, "lateness": 100, "input": ev([("A", 30, 1), ("A", 10, 1), ("A", 20, 1)])},
    {"gap": 50, "lateness": 100, "input": ev([("A", 10, 1), ("B", 200, 1), ("A", 20, 1)])},
    {"gap": 200, "lateness": 60, "input": ev([("A", 100, 1), ("A", 40, 1)])},
    {"gap": 25, "lateness": 100, "input": ev([("A", 0, 1), ("A", 44, 2), ("A", 22, 3)])},
]

lines = ["# Esempi (input d'arrivo -> output). Deduci la regola.\n"]
for i, c in enumerate(EXAMPLES, 1):
    out = reference.solve(c["input"], c["gap"], c["lateness"])
    arr = ", ".join(f'{e["key"]}(t={e["t"]},v={e["v"]})' for e in c["input"])
    lines.append(f"\n## Esempio {i}  (gap={c['gap']}, lateness={c['lateness']})")
    lines.append(f"\n**Arrivi:** {arr}\n")
    lines.append(f"\n`late_dropped = {out['late_dropped']}`\n")
    if out["sessions"]:
        lines.append("\n| key | start | end | count | sum |")
        lines.append("\n|---|---|---|---|---|")
        for s in out["sessions"]:
            lines.append(f"\n| {s['key']} | {s['start']} | {s['end']} | {s['count']} | {s['sum']} |")
    else:
        lines.append("\n(nessuna sessione)")
    lines.append("\n")

with open(os.path.join(ARM, "examples.md"), "w", encoding="utf-8") as f:
    f.write("".join(lines))

# cases.json con label neutre
cases = json.load(open(os.path.join(HERE, "cases.json"), encoding="utf-8"))
neutral = []
for i, c in enumerate(cases, 1):
    neutral.append({"label": f"case_{i:02d}", "input": c["input"], "gap": c["gap"],
                    "lateness": c["lateness"], "expected_hash": c["expected_hash"]})
json.dump(neutral, open(os.path.join(ARM, "cases.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)

print(f"Scritti {ARM}\\examples.md ({len(EXAMPLES)} esempi) + cases.json (label neutre)")
