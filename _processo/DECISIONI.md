# DECISIONI — SideKick

> Log delle decisioni **prese** (per non ri-discuterle). Append-only, datato. Le
> esplorazioni ancora aperte stanno in `VISIONE.md` §9.

## 2026-06-04
- **D1 — Ordine: personale-prima.** v1 dimostra il loop su di me / `poker`; la
  condivisione pubblica è il fine ma è F3.
- **D2 — Compatibilità Spec Kit.** SideKick si costruisce **compatibile con GitHub Spec
  Kit** (formato standard: `constitution`/`spec`/`plan`/`tasks`). Adottare/installare
  Spec Kit per impararlo e dare la forma all'atomo. Non reinventare il formato: il valore
  sta nella **distillazione**, non nei template.
- **D3 — Fitness function (v1, parziale).** Segnale di qualità "stile GitHub": stelle /
  upvote / condivisioni (validazione sociale).
  - *Controllo (Claude):* due limiti — (a) **cold-start**: in fase personale (F1/F2) non
    c'è ancora community → zero segnale; (b) popolarità ≠ codice buono.
  - *Sintesi proposta (da confermare):* segnale **sociale** per la fase pubblica (F3);
    segnale **automatico** per la fase personale (F1/F2) = esito del *fork test* (l'app
    forkata funziona? in quanti giri di debug?).
- **D4 — Stack: Python** (proposto, da confermare). Motivo: data engineering + portfolio
  AWS Data Engineer.
- **D5 — Metodo di lavoro.** Claude fa da **controllo su ogni cosa**; si **documenta
  sempre tutto** (questo file); si **discute prima di implementare**; molti controlli e
  test. È "il processo giusto" per l'utente.

### 2026-06-04 — Findings dopo installazione + ispezione Spec Kit
- **Setup fatto:** `uv 0.11.19` + `specify 0.9.4.dev0` installati (`specify` in
  `~/.local/bin`, **fuori dal PATH** → richiamarla col percorso pieno). Sandbox
  inizializzata in `Programmi/_spec-kit-sandbox` (integrazione `claude`, script ps, no
  git) — usa-e-getta, tenuta come reference della forma; eliminabile.
- **Forma reale di Spec Kit** (artefatti markdown, per-feature): `constitution.md`
  (principi non-negoziabili) → `spec.md` (User Story prioritate P1/P2/P3 indip.
  testabili, scenari Given/When/Then, requisiti `FR-###`, **Success Criteria misurabili
  `SC-###`**, **tech-agnostic**, marker `[NEEDS CLARIFICATION]`) → `plan.md` (Technical
  Context, **Constitution Check come GATE**, struttura, complexity tracking) → `tasks.md`
  (task per-story con path file, fasi Setup→Foundational→story→Polish, paralleli `[P]`).
  Workflow `specify → [gate review umano] → plan → [gate review umano] → tasks →
  implement`. Sistema di **extensions + presets** (es. extension `agent-context`).
- **Parallelo col METODO (validazione):** Spec Kit ≈ il METODO reso standard —
  constitution≈`METODO.md`, spec≈`*_SPEC`, plan≈`*_PROMPT`, gate-review≈"review separata
  prima del merge", MVP/story-indip≈micro-step. I processi di poker mappano bene sul
  formato → ingestione fattibile.
- **D-chiarita — definizione affilata di SideKick:** Spec Kit è *in avanti, template
  vuoti, per-progetto, tech-agnostic, **senza feedback di esito***. SideKick è la **metà
  mancante + il verso opposto**: prende un build **completato** (transcript + artefatti +
  **esito**) → lo distilla in ricetta riusabile → la **re-inietta** come artefatti Spec
  Kit per un progetto nuovo. Il segnale di esito (la nostra fitness function) è proprio
  ciò che a loro manca.
- **D6 (APERTA) — Distribuzione come preset/extension Spec Kit.** L'atomo di SideKick può
  diventare un **preset** Spec Kit (pacchetto template pre-riempito da un build reale,
  astratto) e/o SideKick una **extension**. Via naturale per "atterra dritto nel progetto
  di chiunque" + farsi notare. Candidato per F3, da confermare.

### 2026-06-04 — F1: primo pacchetto + fork-test allestito
- **Primo pacchetto distillato (a mano):** `libreria/settlement-equo/` (PACCHETTO + spec +
  plan), astratto dal settlement di poker, taggato con esito + il bug auto-compensazione.
- **Fork-test A/B allestito** in `fork-test/`: app HTML "Anticipi tra amici" a cui *manca*
  la feature di saldo, in due arm identici (`arm-A-con-pacchetto` contiene
  `pacchetto/settlement-equo/`, `arm-B-senza-pacchetto` no) + `PROMPT-arm-A/B.md` +
  `COME-FARE-IL-TEST.md`. Variabile controllata = il pacchetto. Segnale-killer = l'arm
  senza pacchetto produce trasferimenti ridondanti / non compensa i reciproci; quello con
  pacchetto netta e minimizza.
- **Scelta**: base-codice (app già fatta, manca solo la feature) invece di partire dal
  nulla, per isolare la variabile.
- **Da fare (utente):** aprire due chat pulite (una per arm), incollare i rispettivi
  prompt, non aiutarle, poi confrontare. Esito → se A meglio: F2 (automatizzare la
  distillazione); se pari: arricchire il pacchetto e ri-testare.

### 2026-06-04 — Fork-test v1: contaminato + lezione sul valore
- **Confound (trovato dall'arm-B stesso):** gli arm vivevano DENTRO SideKick → la chat
  "arm-B" girava con SideKick come root e ha letto `libreria/.../PACCHETTO.md` in
  orientamento. Quindi conosceva già i 3 cardini → arm-B **non pulito**. **Fix
  metodologico:** gli arm devono essere **progetti isolati FUORI da SideKick** (root
  separati), così il senza-pacchetto non ha accesso né al pacchetto né alla strategia.
- **Lezione sul prodotto (la più importante finora):** il settlement è un problema **da
  manuale** ("minimum cash flow" / debt simplification): un agente competente ci arriva
  **da solo**. Era un **probe debole**. → **Il valore di un pacchetto è ∝ alla NON-ovvietà
  del sapere che porta.** Per problemi standard, modello + Spec Kit bastano; il pacchetto
  rende dove il sapere è **non-ovvio, specifico del dominio, fatto di fallimenti/bug/
  giudizio**. *Raffina la fitness function: conta la **novità** del sapere, non solo la
  popolarità.*
- **Prossimo:** testare su una feature **non-ovvia/dolorosa**, idealmente trovata cercando
  nei transcript dove i **loop di debug** sono stati più lunghi (= proprio il segnale che
  SideKick userebbe). Clean re-run del settlement solo se serve confermare la convergenza.

### 2026-06-04 — Mining transcript poker (per scegliere la prossima feature)
- **Densità debug bassa:** ~108 segnali errore/frustrazione su ~29MB, concentrati in 2
  sessioni (≈44 e ≈20), resto trascurabile. **Conferma l'intuizione dell'utente**: poker
  ha pochi casi *algoritmicamente* tosti.
- **Meta-lezione:** il METODO è fatto apposta per *evitare* i loop di debug (design-first,
  test-first) → un progetto ben condotto produce poche "war story" di bug. **La gold
  riutilizzabile è la metodologia, non i bug.** (SideKick deve catturare anche/soprattutto
  *processo/metodo*, non solo "debug risolti".)
- **Le 2 sessioni più calde**: (1) **migrazione React** (attrito da tooling:
  tsc/lint/Vite/build + retrocompat Storage); (2) **multigioco/tavoli** (architettura).
  Il dolore era **integrazione/architettura**, non algoritmi.
- **Conclusione → prossimo pacchetto:** non un'altra feature-algoritmo (rischio textbook),
  ma un pacchetto di **Progettazione/meta-processo**: la **metodologia di migrazione
  React** (incrementale, dati retrocompat, test verdi). Non-ovvia, ricca di giudizio,
  riusabile ovunque. Fonte: `_processo/archivio/REACT_MIGRATION_PROMPT.md` + sessioni
  calde. **GitHub** (autorizzato dall'utente) resta backup per un caso *tecnico* davvero
  difficile, se servisse.

### 2026-06-04 — Secondo pacchetto distillato: migrazione-a-componenti
- **`libreria/migrazione-a-componenti/`** (PACCHETTO + spec + plan): metodologia di
  migrazione vanilla → framework a componenti, distillata da
  `poker/_processo/archivio/REACT_MIGRATION_PROMPT.md`. Tipo **Progettazione/meta-processo**
  (diverso layer dal settlement). Cardini: parità di comportamento, retrocompat storage
  sacra, a fasi, mappa-bussola, traduzione 1:1, verifica a specchio, migra-pensando-al-passo-dopo.
- **Perché probe migliore:** è giudizio non-ovvio (un agente "migra a React" da zero salta
  la retrocompat dati e va big-bang) → schiva la trappola textbook del settlement.
- **Nota commit:** colto in poker/DECISIONI che il 2026-06-04 l'utente ha **invertito** la
  regola Co-Authored-By → ora AI dichiarata apertamente. Aggiornata la memoria.

### 2026-06-04 — Esito TEST-2 (settlement, arm-B pulito isolato)
- **Risultato:** l'arm-B pulito (cartella isolata fuori da SideKick, **senza** pacchetto)
  ha prodotto una soluzione **pari o superiore** al pacchetto: saldo netto per persona
  (auto-compensa reciproci + cicli), greedy minimo (≤ n−1), trasferimenti **editabili**,
  **check non-bloccante** di quadratura, e — più rigoroso del pacchetto — **centesimi
  interi** con distribuzione del resto (zero float dust).
- **Verdetto:** conferma empirica → **settlement è textbook; il pacchetto ha aggiunto ~0.**
  Anche la "conoscenza del bug" (V→V) non trasferisce: nasceva dal modello poker a *liste
  separate*; l'approccio standard a saldo-netto lo evita per costruzione.
- **Implicazione:** la tesi "valore ∝ non-ovvietà" regge. Si procede col **test A**
  (migrazione, caso di giudizio non-ovvio) per cercare la differenza attesa.

### 2026-06-04 — Reframe del modello di valore + via libera a F2
- **L'utente chiarisce (e corregge il mio "settlement = inutile"):** anche le feature
  *textbook* sono valide. Il valore è **accumulo + allineamento + auto-miglioramento**, non
  il one-shot. Il *centesimi interi* dell'arm-B pulito è **il meccanismo**: la libreria
  riassorbe i miglioramenti → ogni feature converge alla versione migliore.
- **Framing definitivo:** *package-manager di feature-processi* — npm/pip ma per **singole
  feature**, **non-tecnico**, **AI-agnostico** (qualunque umano + qualunque AI).
- **Implicazione:** serve **curation/versioning** (riassorbire i miglioramenti); si lega
  alla fitness function (la versione migliore "sale" via segnale sociale).
- **Decisione:** stop ai fork-test (hanno chiarito cosa vogliamo) → **via a F2** = motore
  di distillazione automatica.

### 2026-06-04 — Chiarimenti F2 (formato, scope, perché-non-codice, API)
- **"Tarato su Spec Kit?"** No, *ispirato* non *letterale*: il pacchetto ha un layer suo
  (manifesto: esito/cardini/non_ovvieta) che Spec Kit non ha. Allineare all'output Spec Kit
  *esatto* = lavoro da **F3** (l'estensione); forzarlo ora toglierebbe il nostro valore.
- **Migrazione React = in scope:** pacchetto di tipo **Progettazione** (metodologia). La
  libreria è "feature + ragionamenti + processi" → entrambi i tipi.
- **Perché processo+AI e non il codice diretto:** il codice vince quando lo **stack
  coincide** (= npm, esiste già). Processo+AI vince quando i **contesti differiscono**
  (stack/app/dati) o l'utente è **non-tecnico**: il processo è la **forma portabile** di una
  feature. È il buco che npm non copre.
- **Vision "milioni di feature → app veloce":** coerente. Nodi duri = **composizione**
  (assemblare molte feature in una app coerente) + **curation/discovery**, non la premessa.
- **API:** **Max ≠ API** (separata, a consumo, console.anthropic.com). F2 userà il Max via
  **Claude Code headless** / agente → **zero costi extra**, niente key necessaria. API =
  opzione futura per la pipeline 100% automatica.

### 2026-06-04 — Spec Kit compat ORA (override) + API utenti
- **Override richiesto dall'utente:** output del motore **compatibile con Spec Kit da
  subito** (non rimandato a F3). → Aggiornato `motore/PROMPT_DISTILLAZIONE.md`: `spec.md`/
  `plan.md` con **sezioni Spec Kit** (User Scenarios + Given/When/Then, `FR-###`, `SC-###`,
  Edge Cases, Technical Context, opz. Constitution Check) + `PACCHETTO.md` manifesto
  SideKick (esito/cardini/non_ovvieta). Drop-in Spec Kit + preset in F3 quasi gratis.
- **API utenti:** gli utenti **NON** useranno l'API di Roberto — consumo **AI-agnostico**
  (portano la loro AI; il pacchetto è solo testo). Punto di forza. API solo per eventuale
  servizio hosted futuro. Engine F2 free (Max) + pluggable.
- **GTM/registry/monetizzazione/paura-furto:** in memoria (futuro, non ora).
