# LEZIONI (curato a mano dall'osservatorio — incorporato nel cruscotto)

> ⚠️ **COPIA CONGELATA (2026-07-17)** — originale italiano storico, non più aggiornato.
> La versione viva è in inglese: [../../../observatory/usage/LESSONS.md](../../../observatory/usage/LESSONS.md)

- **Audit multi-agente: il secondo è costato meno della metà.** Primo audit ALTO (poker):
  **67 agenti / 2,6M token**; secondo (progetto-15, con le regole di efficienza: dedup dei
  finding PRIMA delle verifiche, verifica adversariale solo su ALTA/MEDIA, cacce mirate):
  **21 agenti / 1,1M**, trovando comunque i bug critici veri. ⚠️ Onestà: progetti e scope
  **diversi** — è un'indicazione (N=1+1), non un confronto pulito dello stesso audit.
- **Ripartire da zero è lo spreco più grosso.** Sui nostri dati la cache ha riletto ~170× i
  token vivi (è la normale meccanica del prompt caching nelle chat lunghe — il punto
  azionabile è nostro): riprendere una chat/audit interrotto **riusando la cache** (il resume
  dell'audit poker ha riusato il 100% dei passi completati) costa ~1/10; ricominciare butta tutto.
- **Fable sui lavori lunghi non conviene**: l'audit poker su Fable si è fermato per la
  **finestra di utilizzo di 5 ore** del piano Max (il limite d'uso, non la finestra di
  contesto) → regola: lavori pesanti su Opus, **Fable solo per le decisioni che contano e i
  recap** (poco e bene).
- **Il modello grosso non serve ovunque.** Dai dati A/B: sulla verifica di codice la qualità
  Haiku/Sonnet/Opus era pari — paga il disegno del processo, non il modello caro ovunque.
  Da luglio i fix scoped girano su **Sonnet high** invece che Opus (blocco R6-B: 6 fasi,
  tutte verdi al primo colpo).
- **Imporre un processo a un modello forte costa e non rende** (probe 2026-06: braccio col
  pacchetto ~2× token del braccio cieco, esito uguale o peggiore) → il metodo ora *propone*
  invece di imporre, e il multi-agente si usa SOLO per audit/sweep, mai per coding lineare.
