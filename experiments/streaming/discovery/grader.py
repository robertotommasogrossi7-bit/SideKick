"""LEAK-PROOF grader. Runs solution.solve on the hidden cases and compares the output's
HASH against the expected one, without ever revealing the expected output. Also checks
idempotence (double execution). Usage: python grader.py [solution_module]  (default: solution)
The labels of failed cases are HINTS about the trap, not the answers."""
import os, sys, json, hashlib, importlib

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


def main():
    modname = sys.argv[1] if len(sys.argv) > 1 else "solution"
    sys.path.insert(0, HERE)
    solmod = importlib.import_module(modname)
    cases = json.load(open(os.path.join(HERE, "cases.json"), encoding="utf-8"))
    passed, fails = 0, []
    for c in cases:
        try:
            ok = h(solmod.solve(c["input"], c["gap"], c["lateness"])) == c["expected_hash"]
            if ok:  # idempotence
                ok = h(solmod.solve(c["input"], c["gap"], c["lateness"])) == c["expected_hash"]
        except Exception:
            ok = False
        if ok:
            passed += 1
        else:
            fails.append(c["label"])
    print(f"PASSED {passed}/{len(cases)}")
    print("FAILED:", ", ".join(fails) if fails else "(none) - all green")
    return 0 if not fails else 1


if __name__ == "__main__":
    raise SystemExit(main())
