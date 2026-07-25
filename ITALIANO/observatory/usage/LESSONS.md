# LESSONS (curate a mano dall'osservatorio — incorporate nella dashboard)

- **Audit multi-agente: il secondo è costato meno della metà.** Primo audit ALTO (poker):
  **67 agenti / 2,6M token**; secondo (progetto-15, con le regole di efficienza: dedup dei
  finding PRIMA delle verifiche, verifica adversariale solo su ALTO/MEDIO, cacce mirate):
  **21 agenti / 1,1M**, trovando comunque i bug critici reali. ⚠️ Onestà: progetti e ambito
  **diversi** — è un'indicazione (N=1+1), non un confronto pulito dello stesso audit.
- **Ripartire da zero è lo spreco più grande.** Nei nostri dati le letture di cache erano
  ~187× i token vivi (aggiornamento 2026-07-25; era ~170× al conteggio precedente — stessa
  meccanica, più dati accumulati da allora) — è la normale meccanica del prompt caching nelle
  chat lunghe (il punto attuabile è nostro): riprendere una chat/audit interrotto **riusando
  la cache** (la ripresa dell'audit poker ha riusato il 100% dei passi completati) costa
  ~1/10; ripartire da zero butta via tutto.
- **Fable sui lavori lunghi non ripaga**: l'audit poker su Fable si è fermato per la
  **finestra di utilizzo di cinque ore** del piano Max (il limite d'uso, non la finestra di
  contesto) → regola: lavori pesanti su Opus, **Fable solo per le decisioni che contano e i
  recap** (poco e bene).
- **Il modello grosso non serve dappertutto.** Dai dati A/B: sulla verifica del codice, la
  qualità tra Haiku/Sonnet/Opus era pari — quello che ripaga è il disegno del processo, non
  il modello caro ovunque. Da luglio, i fix mirati girano su **Sonnet high** invece che su
  Opus (blocco R6-B: 6 fasi, tutto verde al primo tentativo).
- **Imporre un processo a un modello forte costa e non ripaga** (sonda 2026-06: il braccio
  col pacchetto ha usato ~2× i token del braccio cieco, stesso esito o peggiore) → il metodo
  ora *propone* invece di imporre, e il multi-agente si usa SOLO per audit/sweep, mai per
  coding lineare.
