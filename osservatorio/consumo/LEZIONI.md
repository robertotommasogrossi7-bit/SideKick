# LEZIONI (curato a mano dall'osservatorio — incorporato nel cruscotto)

- **Audit multi-agente: −60% dal primo al secondo.** Il primo audit ALTO (poker) è costato
  **67 agenti / 2,6M token**; applicando le lezioni di efficienza (dedup dei finding PRIMA
  delle verifiche, verifica adversariale solo su ALTA/MEDIA, cacce mirate) il secondo audit
  ALTO è sceso a **21 agenti / 1,1M** trovando comunque i bug critici veri.
- **Ripartire da zero è lo spreco più grosso.** La cache ha riletto ~170× i token vivi:
  riprendere una chat/audit interrotto **riusando la cache** (il resume dell'audit poker ha
  riusato il 100% dei passi completati) costa ~1/10; ricominciare butta tutto.
- **Fable sui lavori lunghi non conviene**: l'audit poker su Fable si è interrotto per il
  limite delle 5h → regola: lavori pesanti su Opus, **Fable solo per le decisioni che
  contano e i recap** (poco e bene).
- **Il modello grosso non serve ovunque.** Dai dati A/B: sulla verifica di codice la qualità
  Haiku/Sonnet/Opus era pari — paga il disegno del processo, non il modello caro ovunque.
  Da luglio i fix scoped girano su **Sonnet high** invece che Opus (blocco R6-B: 6 fasi,
  tutte verdi al primo colpo).
- **Imporre un processo a un modello forte costa e non rende** (probe 2026-06: braccio col
  pacchetto ~2× token del braccio cieco, esito uguale o peggiore) → il metodo ora *propone*
  invece di imporre, e il multi-agente si usa SOLO per audit/sweep, mai per coding lineare.
