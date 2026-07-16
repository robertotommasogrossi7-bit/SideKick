"""Grader LEAK-PROOF. Esegue solution.solve sui casi nascosti e confronta l'HASH
dell'output con quello atteso, senza mai rivelare l'output atteso. Verifica anche
l'idempotenza (doppia esecuzione). Uso: python grader.py [modulo_solution]  (default: solution)
Le etichette dei casi falliti sono SUGGERIMENTI sulla trappola, non le risposte."""
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
            if ok:  # idempotenza
                ok = h(solmod.solve(c["input"], c["gap"], c["lateness"])) == c["expected_hash"]
        except Exception:
            ok = False
        if ok:
            passed += 1
        else:
            fails.append(c["label"])
    print(f"PASSATI {passed}/{len(cases)}")
    print("FALLITI:", ", ".join(fails) if fails else "(nessuno) - tutti verdi")
    return 0 if not fails else 1


if __name__ == "__main__":
    raise SystemExit(main())
