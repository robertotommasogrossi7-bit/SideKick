# IDEE

Ragionamenti aperti / feature future (METODO). Cattura al volo con **`/metodo:idea <testo>`**.

- [2026-06-11] Plugin `metodo` — prossima disciplina: **design-first gate** (skill che invita a
  spec/ragionamento prima di scrivere codice; eventuale aggancio al plan-mode).
- [2026-06-11] Plugin `metodo` — **micro-commit nudge** come **hook** (PostToolUse su Edit/Write →
  ricorda di committare per step logico).
- [2026-06-11] **Constitution da `METODO.md`**: trasformare METODO in una skill/constitution
  Spec-Kit-compatibile, caricabile a inizio progetto.
- [2026-06-11] **Validazione lato-umano del plugin**: misurare "attrito tolto" dall'**uso**
  (dogfooding su SideKick stesso → poi adozione esterna). È la prova che cercavamo, non l'oracolo.
- [2026-06-11] Test parcheggiato: l'unica nicchia oracolo-abile per un "positivo" =
  **conoscenza esterna/nascosta** non derivabile dal problema (quirk non documentato di un sistema).
- [2026-06-11] **Dogfooding / "traccia fantasma"** (VISIONE §10): strumentare lo sviluppo di
  SideKick con le proprie discipline → il progetto si auto-documenta.
- [2026-06-11] **Auto-miglioramento del metodo** (il riscatto del motore F2): `/metodo:riflessione`
  (o routine schedulata) che **mina i tuoi transcript recenti** e propone tweak a constitution/skill.
  È il "flusso continuo + miglioramento automatico" richiesto dall'utente.
- [2026-06-11] **Raffinamento METODO (da Max):** multi-chat **per-feature obsoleto** (il costo non è
  più il vincolo); tenere solo la **rotazione della chat base**. Aggiornare `METODO.md`.
- [2026-06-11] **FUTURO (non ora): "intero progetto → spec" per riuso** — tutto poker incl. le parti
  delicate (**auth, account**). Diverso dalle single-feature (composizione + concern trasversali).
  Testare **quando poker è completo**.
- [2026-06-11] **"Specchio di processo"** — tool che mina i *propri* transcript e restituisce
  metriche sul *come lavori*: richieste vaghe e quanto costano, loop di rework, disciplina
  (commit/design-first), trend settimanali. Dashboard di **costo** esistono già (es. ccusage);
  specchi di **qualità del processo** no. Diverso dai pivot precedenti perché: (a) si testa su
  se stessi legittimamente (il prodotto È uno specchio personale, non un claim su altri);
  (b) è **data engineering puro** (JSONL→metriche→dashboard = obiettivo AWS); (c) i dati si
  accumulano da soli mentre si sviluppa poker → si può riprendere quando si vuole, senza perdere nulla.
- [2026-06-11] **Contribuibile a Spec Kit / community** (in ordine di valore):
  (a) **il writeup del finding** — metodo con/senza + costo (da transcript) + reverse-engineering →
  "il processo aiuta l'**umano/anello debole**, non il modello esperto; ecco come si misura". Raro e
  forte; va come blog/discussion, non come grosso PR.
  (b) **pattern "constitution proattiva e auto-evolvente"** — la `constitution.md` di Spec Kit è
  *passiva* (principi letti una volta); la nostra **guida la condotta** e **si auto-modifica** →
  proposta di estensione/preset.
  (c) **due tool riusabili**: `misura-token` (costo di una sessione dai transcript) e il **grader
  hashed leak-proof** (valutare se un processo aiuta senza rivelare le risposte). Utili a chiunque
  voglia testare "il mio processo serve?".
