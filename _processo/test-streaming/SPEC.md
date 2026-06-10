# Test TOSTO — Sessionizzazione robusta a eventi tardivi (streaming)

> Il 2° test finale prima di F3. Dominio **streaming/data-eng** (doppia utilità: validare SideKick
> su un processo *davvero* duro + pezzo di portfolio AWS Data Engineer). Vedi `../DECISIONI.md`
> (2026-06-11) per il perché e il design ruthless. Oracolo privato + reference in
> `_test/streaming-oracle/` (gitignorato).

## Perché questo problema
Soddisfa i 3 criteri di un probe che **discrimina**: (1) la strada naive è **sbagliata** in modo
non-ovvio; (2) c'è un **oracolo oggettivo** (output attesi deterministici); (3) **non è
lookup-abile** (semantica bespoke). E con la nuova dimensione **costo**: il pacchetto vince solo
se è **corretto E più economico** del cieco (che deve thrashare o fallire caro).

## Il contratto
`solve(events, gap, lateness) -> {"sessions": [...], "late_dropped": int}`
- `events`: lista di `{key, t, v}` in **ordine d'ARRIVO** (lo stream; NON ordinato per `t`).
  `t` intero (event-time), `v` numerico, `key` stringa.
- ritorna le sessioni `{key, start, end, count, sum}` ordinate per `(key, start)` + il conteggio
  degli eventi scartati come tardivi.

## Semantica (deterministica)
1. **Watermark GLOBALE.** Prima di incorporare l'evento in posizione *n* (0-based),
   `W = (max t fra gli arrivi 0..n-1, su TUTTE le chiavi) − lateness`. Per il primo evento `W` è
   indefinito (nessun arrivo precedente). Il `max` include anche eventi poi scartati.
2. **Late-drop.** L'evento `e` è **scartato** se `t_e < W` (confine **stretto**). Si conta in
   `late_dropped`. Altrimenti è un *sopravvissuto*.
3. **Sessione** (per chiave, sui soli sopravvissuti). Ordina per `t` (tie-break: **indice
   d'arrivo**), poi spezza in blocchi **massimali** dove ogni coppia consecutiva ha
   `t_succ − t_prec ≤ gap`.
4. **Aggregati** per sessione: `start=min t`, `end=max t`, `count=#eventi`, `sum=Σv`.
5. **Output** ordinato per `(key, start)`; più `late_dropped`.
6. **Exactly-once / idempotenza.** È una funzione pura: due esecuzioni sullo stesso input
   danno lo **stesso** output.

## Le trappole (dove il cieco cade)
- 🪤 **Merge retroattivo:** un evento tardivo-ma-non-scartato fa da *ponte* e fonde due sessioni
  già separate. Chi finalizza in modo incrementale lo perde.
- 🪤 **Watermark GLOBALE:** un evento alto su una chiave alza il watermark e fa **scartare** un
  evento basso su un'altra chiave — che il naive (ragionando per-chiave) terrebbe, fondendo
  sessioni che invece **non** vanno fuse.
- 🪤 **Confini:** `<` (non `≤`) nel drop; `max` sugli arrivi **strettamente precedenti**; tie-break
  per indice d'arrivo. Off-by-one classici.

## Esempio (oracolo, derivato a mano — `G=15, L=60`)
Arrivi: `A10, A20, B100, A40, A30, B110, A5, B130, A200, A38`
→ scartati: `A30` (30<40, per il watermark di B!), `A5`, `A38` → `late_dropped=3`.

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 10 | 20 | 2 | 2 |
| A | 40 | 40 | 1 | 1 |
| A | 200 | 200 | 1 | 1 |
| B | 100 | 110 | 2 | 2 |
| B | 130 | 130 | 1 | 1 |

(Il naive per-chiave senza drop terrebbe A5/A30/A38 e collasserebbe A in una mega-sessione
`[5,40] count5` → output completamente diverso. La reference è validata contro questo esempio.)

## Come si corregge (ruthless)
- **Reference privata** (`_test/streaming-oracle/reference.py`) = oracolo. Genera gli output attesi.
- **Sample pubblico** (questo esempio) ai bracci, per capire. **Test nascosti** (input senza
  output) per la correzione → niente hardcoding; con **più (G, L)** → niente tuning.
- Suite **avversaria**: minimal-failing per ogni trappola; stream random grandi vs reference;
  **idempotenza** (doppia esecuzione identica); edge (vuoto / 1 evento / tutti-scartati /
  t-uguali con tie). Grading **binario** (qualunque mismatch su qualunque test = fail) + quanto
  lontano è arrivato.
- **💰 Costo** per braccio dai transcript (`_test/misura-token.mjs`): turns, tool_calls, out_tok,
  in_tok, debug-loop.

## Fasi
1. **Discovery** — un braccio cieco risolve da zero, sbatte sull'oracolo, trova le soluzioni →
   si cattura il dolore (vicoli ciechi + fix).
2. **Distilla** — pacchetto nuovo `streaming-sessionizzazione-robusta` (tassonomia trappole,
   ordine d'attacco, disciplina oracolo).
3. **Quadruplo** — 2 bersagli della classe × {con, senza}; il pacchetto vince se corretto **e**
   più economico. (Bersaglio 2: 2ª semantica streaming, da fissare.)
