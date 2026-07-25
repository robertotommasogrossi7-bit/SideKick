# Sessionizzazione robusta a eventi tardivi — specifica

Implementa `solve(events, gap, lateness)` in `solution.py` seguendo questa specifica.
Verìficati con `python grader.py` (gira la tua `solve` su casi di test nascosti e ti dice
quanti passano; **non** mostra gli output attesi). Obiettivo: **11/11**.

## Contratto
- `events`: lista di `{key, t, v}` in **ordine d'ARRIVO** (lo stream; **NON** ordinato per `t`).
  `t` intero, `v` numerico, `key` stringa.
- ritorna `{"sessions": [ {key, start, end, count, sum}, ... ], "late_dropped": int}`,
  con le sessioni ordinate per `(key, start)`.

## Semantica
1. **Watermark GLOBALE.** Prima di incorporare l'evento in posizione *n* (0-based),
   `W = (max t fra gli arrivi 0..n-1, su TUTTE le chiavi) − lateness`. Per il primo evento `W` è
   indefinito. Il `max` include anche eventi che poi vengono scartati.
2. **Late-drop.** L'evento `e` è **scartato** se `t_e < W` (confine **stretto**). Si conta in
   `late_dropped`. Gli altri sono *sopravvissuti*.
3. **Sessione** (per chiave, sui soli sopravvissuti). Ordina per `t` (tie-break: **indice
   d'arrivo**), poi spezza in blocchi **massimali** dove ogni coppia consecutiva ha
   `t_succ − t_prec ≤ gap`.
4. **Aggregati:** `start=min t`, `end=max t`, `count=#eventi`, `sum=Σv`.
5. **Output** ordinato per `(key, start)`; più `late_dropped`.
6. **Funzione pura** (stessa input → stesso output; idempotente).

## Esempio (per capire) — `gap=15, lateness=60`
Arrivi: `A10, A20, B100, A40, A30, B110, A5, B130, A200, A38`

Output: `late_dropped = 3`; sessioni:

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 10 | 20 | 2 | 2 |
| A | 40 | 40 | 1 | 1 |
| A | 200 | 200 | 1 | 1 |
| B | 100 | 110 | 2 | 2 |
| B | 130 | 130 | 1 | 1 |

## Verifica
`python grader.py` → `PASSATI k/11` + le etichette dei casi falliti (suggeriscono l'**area** del
problema, non la risposta). Punta a **11/11**.
