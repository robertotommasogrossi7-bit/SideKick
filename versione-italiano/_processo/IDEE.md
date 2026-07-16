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
- [2026-06-11] **TESI CHIARITA (il vero punto di SideKick, mai testato bene):** non "forka una
  *feature*", ma **condividi l'intera traiettoria di build di un'APP** (prompt + decisioni + output
  finito da *vedere prima di scegliere*) e **supervisiona l'AI mentre la ri-costruisce, adattandola**.
  Buco reale: GitHub = solo codice; tutorial = processo non eseguibile/non forkabile; v0/bolt/Lovable
  = build *nuovo dal tuo prompt*, NON *fork della traiettoria di un'app specifica*.
  - **Due killer da ricordare:** (1) corri contro il modello (v0/bolt migliorano ogni mese a
    "fammi l'app e adattala"); (2) ancora non provato.
  - **IL TEST GIUSTO (finalmente a fuoco):** app **complessa vera** (auth/account/soldi) → catturane
    la build-trace (il transcript `.jsonl` *è* già la traccia) → due costruttori, idealmente **umani**:
    uno con la **traiettoria completa**, uno con **solo descrizione/codice finito** → misura esito +
    costo + bug. Tesi forte = persone + N (i "30/40 run"). Substrato = **poker con auth** (lo si sta
    già costruendo → poker-first NON abbandona l'idea, fabbrica il banco di prova).
  - **Prodotto (se mai):** (a) cattura transcript→trace; (b) galleria di app finite da scegliere;
    (c) replay adattabile con punti-di-fork. Pezzi duri: rendere la traccia *replayabile* + curation.
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
- [2026-06-12] **⭐ PIVOT — D: "la constitution non è solo del software".** È il punto cercato da
  tre chat. Design doc: `_speckit-contrib/D-CONSTITUTION-PROCESS.md`. D diventa primario; tutto il
  resto (sotto) → **legacy/secondo piano**. Pipeline: repo GitHub di Roberto (preset funzionante) →
  PR grande al core (probabile rifiuto) → commento civile linkando il repo.
- [2026-06-12] **Post LinkedIn** — bozza in `_speckit-contrib/POST-LINKEDIN.md`. Roberto vuole
  pubblicarlo a breve; ordine: **dopo** extension. **Ricordarglielo a ogni inizio sessione.**
  Red-team del post prima di pubblicare.
- [2026-06-12] **Commento nelle discussion Spec Kit** — Roberto VUOLE farlo, ma **solo se abbiamo
  roba veramente OP** (linkando il repo D). Tenere in caldo, non forzare.
- [2026-06-12] **Cleanup repo SideKick con un "legacy"** — spostare tutto il fatto finora (test,
  package-manager, redteam, le scoperte "già presenti e forse peggiori") in una sezione legacy:
  **preservare tutto**, ma in secondo piano; D in primo piano. Da fare dopo che D è chiaro.
- [2026-06-12] **Extension metodo — comando `/review` "state of the project"** (suggerito dal
  red-team ChatGPT): scansiona TODO/idee/contesto-stale/test-mancanti/diff-grosse/attrito → "stato
  del progetto". L'unica aggiunta che darebbe una *capability*. Solo SE l'extension (ora legacy)
  va avanti.
- [2026-06-12] **bolt.diy — codice scritto da Roberto, da recuperare e organizzare.** Su disco non
  c'è traccia: il clone `Programmi/bolt.diy` è pulito e allineato a upstream, niente zip in
  Downloads. Se scritto *dentro* l'app bolt.diy, vive nello storage del browser → va **esportato**
  prima di poterlo organizzare nelle cartelle. **Secondario per ora** (focus: spec-kit), ma da
  riproporre ogni tanto finché non è messo al sicuro.
