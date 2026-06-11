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

### 2026-06-04 — Repo pubblica + posizione motore + TODO guida
- **Repo aperta e PUBBLICA:** github.com/robertotommasogrossi7-bit/SideKick. Processo
  incluso (`_processo/` tracciato), README EN+IT, licenza MIT.
- **Posizione del motore (valutato):** per **ora monorepo** (`motore/` dentro SideKick) —
  semplice + dogfooding. **Split in futuro**: il **motore** (tool/CLI) e il **catalogo/
  registry** (i pacchetti) hanno cicli e pubblici diversi, come **npm-comando vs registro**.
  Engine → repo/tool suo; libreria → registry pubblico (repo o DB, il "piccolo DB di Roberto").
- **TODO (utente "segnati"):** scrivere una **guida d'uso** chiara —
  (a) prendere feature dai *propri* programmi (semplice/automatico),
  (b) prendere feature da **progetti Spec Kit** e salvarle sul PC,
  (c) usarle su un progetto reale. Da scrivere **quando esiste F2** (così "automatico" è reale).

### 2026-06-04 — F2 costruito e collaudato (branch motore-f2)
- **Il motore funziona end-to-end.** `motore/distilla.py` = pipeline ELT
  (extract → scrub → assemble → distill → load), backend pluggable (prompt-only gratis sul
  Max / claude-cli). Branch `motore-f2`, 4 commit, pushati.
- **Collaudo riuscito:** rigenerato `settlement-equo` dal materiale di poker → ora in
  **formato Spec Kit** (User Scenarios/FR/SC + front-matter metadati), con il miglioramento
  "centesimi interi" **assorbito** (la libreria si auto-migliora). Il `--load` parsa
  correttamente i file delimitati.
- **Da fare:** merge `motore-f2`→`main` (via review separata, **non** da questa chat —
  METODO); rigenerare anche `migrazione-a-componenti` in formato Spec Kit; scrivere la
  **guida d'uso** (TODO); eventuale backend `claude-cli` full-auto; **F3** (estensione Spec
  Kit / condivisione).

### 2026-06-04 — F2 mergiato + piano (crescere libreria, chiarito registry, #4 differito)
- **Fatto:** `motore-f2` **mergiato in `main`** (override METODO, su richiesta utente).
  Rigenerati settlement + migrazione in formato Spec Kit. Scritta `GUIDA.md` (TODO chiuso).
- **Direzione scelta (#2):** crescere la libreria distillando più feature reali riutilizzabili
  → serve a **validare F3** prima di proporla. Piano utente: *cresci → valida F3 → proponi*.
- **Chiarito #3 (registry):** `libreria/` = catalogo **personale** nel repo (già mini-fonte
  condivisa via GitHub). Il **registry/DB** vero = pool **multi-contributore** con
  pubblicazione/ricerca/curation (npm-registro vs cartella). Serve **solo a scala** → futuro.
  Il repo pubblico è già un registry minimale.
- **#4 (polish portfolio: README+demo+writeup) DIFFERITO** a dopo libreria + F3.

### 2026-06-04 — Multigioco distillato + catalogo base
- **Pacchetto #3:** `architettura-multi-contenuto` (Progettazione, `non_ovvieta: alta`),
  distillato da `MULTIGIOCO_SPEC`. Cuore non-ovvio: "default = istanza speciale del gruppo"
  (zero codice doppio) · "tipo ricco speciale + N generici su schermata comune" · estensione
  retrocompat idempotente · componenti condivisi · a fasi.
- **Catalogo base ("terreno"):** `libreria/INDICE.md` (per tassonomia) + `CONTRIBUIRE.md`
  (come aggiungere/migliorare un pacchetto). Forma base ma chiara da ampliare; il **registry
  vero** (multi-contributore, ricerca, curation) resta futuro.
- **GitHub (in corso):** ricerca app React complesse open-source → 1ª passata = repo
  "didattici" generici (RealWorld, HospitalRun, Spectrum…). Serve **targettizzare** sulla
  feature che l'utente vuole aggiungere alla SUA app prima di scegliere cosa scaricare.

### 2026-06-04 — LOOP VALIDATO su feature altrui non-ovvia (scopa) ⭐
- **Banco di prova:** `_test/poker-copia` (copia gitignorata di poker-react, deps installate).
- **Test:** distillata la CONOSCENZA dello scoring scopa da **OMerkel/Scopa (GPLv3)** →
  adattata su poker-copia (funzione pura TS + Vitest) → **4/4 verdi al primo colpo**.
- **Conclusione:** il loop SideKick **funziona su una feature non-ovvia e di altri** (la
  tabella primiera è sapere specifico). A differenza del settlement (textbook), qui il
  pacchetto **trasferisce valore reale** → **la tesi regge.**
- **Bonus licenza:** distillare la *conoscenza* (regole = fatti) e non il *codice* evita la
  contaminazione GPL → vantaggio strutturale del "processo, non codice".
- **Pacchetto:** `libreria/punteggio-scopa` (Pratiche, `non_ovvieta: alta`, esito=validato).
  Libreria ora: **4 pacchetti**.

### 2026-06-10 — Libreria a 10: 6 pacchetti nuovi validati
- Aggiunti e validati (funzione pura + Vitest sul banco `_test/poker-copia`):
  **punteggio-briscola, punteggio-tressette, bracket-eliminazione, rating-elo,
  girone-italiana, ricorrenze-date**.
- **Suite completa del banco: 19 file, 165 test verdi** (i 6 nuovi + scopa + i test poker
  esistenti → niente rotto).
- Tutti su sapere **non-ovvio** (terzi/floor del tressette, snake-seeding+bye, formula Elo,
  metodo del cerchio, n-esimo giorno del mese). Confermano: il sapere distillato si
  trasferisce **corretto**, ripetutamente.
- Libreria: **10 pacchetti**, tutti su GitHub.
- **PROSSIMO: il "pezzo difficile" (gradino 2)** — test duro su un'app complessa **esterna**,
  end-to-end (feature piena, output reale *girato*), **con-vs-senza**, per chiudere il dubbio
  "nessun test sull'output reale". Poi F3.

### 2026-06-10 — Gradino 2 (OUTPUT REALE) ✅ su app esterna complessa
- **Bersaglio:** `szabolcsthedeveloper/React-Chess` (app scacchi React+TS reale, ~25 file,
  regole complete, **nessun rating**). Clonata in `_test/_fonte-chess` (gitignorato).
- **Integrato `rating-elo`** nel flusso REALE (`Referee.tsx`): stato 2 giocatori + rating,
  aggiornamento Elo a fine partita (`useEffect` su `winningTeam`), display. Moduli
  `giocatori.ts` + `elo.ts`.
- **Prova output reale:** test sulla logica **integrata** 3/3 verdi (1500/1500 + vittoria
  Bianco → 1516/1484) **+ build di produzione VERDE** → la feature è cablata nell'app vera e
  compila/gira. **Chiude il dubbio "nessun test sull'output reale".**
- **Onestà:** valida "il sapere si integra e funziona nell'app reale", NON "il pacchetto era
  necessario" (Elo borderline-textbook → A/B debole qui). La necessità si vede su feature più
  strane (terzi del tressette, primiera, snake seeding).
- **PROSSIMO: F3** (preset/extension Spec Kit) → poi proporlo. Libreria provata + output reale = pronti.

### 2026-06-10 — Test migrazione-grande: ALLESTITO (2 app, 2×2 pieno)
- **Decisione (utente "fai come pensi"):** test **con-vs-senza pieno 2×2** su **due** app vanilla
  complementari, non una sola. Scelta dei bersagli delegata a Claude.
- **Bersagli** (cercati + verificati su GitHub: vanilla puro, localStorage, taglia giusta):
  - **budget** `AmirhosseinLN/advanced-finance-tracker` — 2 chiavi (`financeTrackerData`,
    `financeTrackerTheme`) + `amount` con segno → probe retrocompat **multi-chiave/flat**.
  - **habit** `justind-dev/habit-tracker` — chiave `habitTrackerHabits` **nidificata** + streak
    **derivate dal tempo** (render-time + updater) → probe **shape nidificata + gotcha del tempo**.
- **Isolamento:** root di lavoro **fuori da SideKick** (`Programmi/_migr-test/`), arm-B **senza**
  pacchetto (applicata la lezione del fork-test v1 contaminato). Pristine in `_test/_fonte-*`.
- **Chiarimento metodologico (richiesto dall'utente):** i test scacchi/feature erano **a un
  braccio** ("il sapere si integra e gira?") → nessun gruppo di controllo da proteggere, quindi
  la contaminazione era irrilevante e potevano vivere dentro SideKick. La migrazione è **A/B**:
  arm-B è il **controllo** e deve restare **ignaro del pacchetto**, altrimenti il confronto è
  nullo → da qui l'isolamento (e il motivo per cui *questa* chat base, che ha letto il pacchetto,
  non può fare da arm-B).
- **Dimensione fitness (input utente):** misurare anche **dove zoppica il mio processo** e se c'è
  un modo migliore di progettarlo → se emerge, riassorbire e **alzare la `versione`** del pacchetto.
- **Kit:** `_processo/test-migrazione/` (COME-FARE + rubrica + seed dati + 4 PROMPT). **Da fare
  (utente):** aprire 4 chat pulite e lanciare (habit prima). **Poi:** ragionare su un *secondo*
  test finale con un **processo diverso** (anche inventato o preso da Spec Kit) prima di F3.

### 2026-06-10 — ESITO test migrazione-grande (4 bracci) + pacchetto a v0.3
- **Eseguito** il 2×2 (budget/habit × con/senza) dall'utente in chat pulite; review da questa chat
  base con **prova retrocompat empirica nel browser** (seed dei dati ORIGINALI → reload → snapshot)
  su tutti e 4.
- **🔑 Retrocompat:** budget-A ✅, budget-B ✅, habit-B ✅, **habit-A ❌**. Il segnale-killer atteso
  ("il cieco perde i dati") **non è scattato**: entrambi i ciechi hanno preservato chiave **e**
  shape da soli. L'unico fallimento è il braccio **col pacchetto** (habit-armA): seguendo il
  cardine "store con persist" ha usato zustand `persist` di default, il cui wrapper `{state,version}`
  non combacia con l'array nudo originale → dati vecchi non caricati (verificato: dato intatto in
  localStorage, UI "No habits"). budget-armA, stesso cardine, l'ha gestito con un `PersistStorage`
  **custom** → retrocompat perfetta ($767.50, tema dark).
- **Altri segnali:** comportamento identico ovunque (no scope-creep); **processo** più disciplinato
  nei bracci-pacchetto (habit-A 5 commit fasati, traduzione 1:1, intento retrocompat dichiarato)
  vs big-bang in budget-B; build verde / app gira su tutti e 4; streak time-derived corretta
  (habit-B verificata live: "2 days, 13 hrs…").
- **Verdetto:** come il settlement, questi probe erano ancora abbastanza **standard** che l'agente
  cieco azzecca la retrocompat da solo → il pacchetto **non discrimina sull'esito** qui, e la sua
  best-practice ha pure *introdotto* il bug se applicata senza adattatore. Valore osservato =
  **disciplina di processo**, non retrocompat. **Ipotesi "valore ∝ dimensione" NON confermata** su
  app multi-schermata ma standard.
- **Auto-miglioramento (il regalo del test):** budget-armA ha prodotto il pattern corretto
  (`PersistStorage` custom che legge l'array grezzo). **Assorbito** → `migrazione-a-componenti`
  **v0.2 → v0.3**: aggiunto il gotcha "persist-middleware = wrapper di shape" + soluzione, in
  PACCHETTO/spec/plan. Il loop fitness ha funzionato: un braccio ha migliorato il pacchetto.
- **Implicazione per il 2° test (utente):** serve un processo **davvero tosto** — sapere non-ovvio
  che *morde*, con **oracolo oggettivo** di correttezza, dove il cieco **fallisce**. Idea utente:
  loop *discovery→redo* (fai la cosa difficile senza pista, vedi gli errori, rifalla da zero con
  le soluzioni). Quadruplo (2 bersagli) per robustezza. Direzione in ragionamento.

### 2026-06-11 — Dimensione COSTO (token) + design test tosto (streaming, ruthless)
- **Nuovo segnale: costo.** Misurati i token dei 4 bracci migrazione leggendo i loro transcript
  (`~/.claude/projects/...`, dogfooding di SideKick) con `_test/misura-token.mjs` (riusabile):
  - **budget** A(con) vs B(cieco): turns 72/50, tool 45/31, out 160k/70k, in 4.9M/2.2M →
    **pacchetto ~2x più caro a parità di esito**.
  - **habit** A(con) vs B(cieco): turns 132/62, tool 84/37, in **9.07M**/3.58M →
    **~2.5x più caro E esito peggiore** (A ha rotto la retrocompat; 132 turni = thrashing).
  - **Lettura:** la disciplina del pacchetto (leggere spec/plan, fasi, traduzione 1:1) ha un
    **costo in token**; su problemi facili è **overhead puro**. Conferma: su task standard il
    pacchetto non aiuta l'esito e fa lavorare di più. Paga solo se il problema è abbastanza duro.
- **Rubrica permanente +1 riga: 💰 Costo** (turns, tool_calls, out_tok, in_tok; opz. debug-loop),
  estratto dai transcript. Lega alla fitness function (VISIONE §9.1: "meno giri di debug? tempo?").
- **Reframe success del test tosto:** il pacchetto **vince** sse è **corretto (passa l'oracolo)
  E più economico** del cieco (che thrasha o fallisce caro). Discriminazione su 2 assi: correttezza + costo.
- **Design test streaming = RUTHLESS (confermato dall'utente "il più spietato possibile"):**
  - Problema: sessionizzazione per-chiave con **watermark GLOBALE** (tenuto: è la leva spietata,
    accoppia le chiavi e fa cadere i naive), late-drop `t<W`, **merge retroattivo** dei tardivi
    non-scartati, aggregati, exactly-once (idempotenza).
  - Default `G=15 / L=60`, ma **hidden test con più (G,L)** (no tuning).
  - Suite **avversaria**: minimal-failing per ogni trappola; stream random grandi vs reference;
    **idempotenza** (doppia esecuzione identica); edge (vuoto / singolo / tutti-scartati /
    t-uguali con tie-break su indice d'arrivo). Grading **binario** (qualunque mismatch = fail) +
    quanto-lontano + costo. **Reference privata = oracolo** (in `_test/streaming-oracle/`, gitignored).
  - Apparato pubblico (record): `_processo/test-streaming/SPEC.md`. Fasi: discovery→distilla→quadruplo.

### 2026-06-11 — Discovery streaming: risolto pulito → SPEC troppo completa (META-LEZIONE)
- L'agente cieco ha risolto in **13 turni / 6 tool / 32k out / 371k in**: grader **11/11** +
  **property-test 5000/5000** vs reference → soluzione *genuinamente* corretta. **Zero sofferenza**
  (≈ one-shot). (Costo misurato dal transcript; conferma l'utilità della dimensione costo: 13
  turni qui vs 132 del thrashing di habit-A.)
- **Diagnosi:** lo SPEC specificava *tutta* la semantica (watermark globale, confine stretto,
  merge via sessionizzazione dei sopravvissuti). Un agente che legge lo spec lo implementa giusto;
  il naive falliva (6/11) solo perché *ignorava* lo spec. Non era "senza pista": la pista era nello spec.
- **META-LEZIONE (3 su 3, ora netta):** settlement, migrazione, streaming — ogni volta che la
  conoscenza è **scrivibile in uno spec (o è prassi standard)**, l'agente non ha bisogno del
  pacchetto. Il pacchetto vale **solo** per conoscenza **non spec-abile**: hard-won, non-ovvia
  anche conoscendo l'obiettivo, imparata *fallendo*. È la caratterizzazione più affilata e onesta
  del valore di SideKick (= cattura ciò che NON metti in uno spec). Coerente col reframe utente del
  2026-06-04: valore = accumulo + allineamento + auto-miglioramento, NON one-shot.
- **Implicazione test (per la metà positiva):** serve un problema dato come **goal + oracolo, NON
  come algoritmo**, dove l'agente fallisce *pur* conoscendo l'obiettivo. Strade: (A) ri-lanciare lo
  *stesso* oracolo streaming con la **semantica NASCOSTA** (solo esempi I/O + grader →
  reverse-engineering; riusa l'apparato); (B) correttezza non-enumerabile (scacchi perft);
  (C) accettare la meta-lezione + il modello di valore del 4/6 e portare F3 su quella tesi onesta.
- **Apparato riusabile:** grader hashed leak-proof, property-test, misura-token (in `_test/streaming-oracle/`).
- **Archiviazione chat di test:** OK — il `.jsonl` **persiste** dopo l'archivio (verificato sul
  discovery). Serve solo non **cancellarli** (F0 li copre).

### 2026-06-11 — Reverse (SENZA spec): risolto a ~pari costo → LA VERITÀ sul valore
- Dati **solo 6 esempi I/O + grader** (niente regole, label neutre `case_NN`), l'agente ha dedotto
  la regola bespoke (watermark globale, confine, merge) e fatto **11/11**; **property-test 5000/5000**
  vs reference, **zero hardcoding** → soluzione *genuinamente generale*. (Il "11" lo stampa il grader,
  `PASSATI k/11`: di design, non un leak; gli attesi restano solo hash.)
- **Costo:** reverse **17 turni / 9 tool / 43k out** vs discovery-con-spec **13 / 6 / 33k** → solo
  **~30% in più SENZA la specifica**. Togliere l'informazione **non** ha dato valore al sapere
  raccolto: il modello l'ha **ri-derivato da 6 esempi quasi gratis**.
- **CONCLUSIONE (la più importante):** il valore di un pacchetto-processo richiede conoscenza **non
  ri-derivabile** dal problema. "Difficile-ma-deducibile-da-esempi" NON basta. Punto metodologico:
  **ogni test con oracolo oggettivo sonda solo conoscenza derivabile/verificabile = proprio dove un
  modello forte non ha bisogno di noi.** I 5 test hanno misurato nell'unico regime sfavorevole.
- **Dove vive il valore (NON oracolo-abile):** rationale/trade-off, **vicoli ciechi** (negativo,
  invisibile nel codice finale), contesto esterno/proprietario, **allineamento** (il *tuo* modo),
  **accumulo** (corpus che cresce). = reframe utente 4/6, NON "battere il modello".
- **DECISIONE → C riformulata:** SideKick non è "far risolvere all'AI compiti duri" (l'AI è troppo
  brava perché *quello* sia il valore); è **memoria condivisa, allineata e crescente delle parti NON
  derivabili del costruire** (perché, dead-end, convenzioni, esiti), servita Spec-Kit-native,
  giudicata **dall'uso** non da un oracolo. Spec Kit = tubatura; prodotto = distillazione-dalla-realtà
  + registry + segnale d'esito sul non-derivabile. **Stop ai test con/senza su oracolo** (non
  aggiungono informazione). Unica eccezione che *potrebbe* dare un positivo oracolo-abile: conoscenza
  **esterna/nascosta** non derivabile dal problema (es. quirk non documentato di un sistema).
- **Prossimo:** F3 inquadrata su C, oppure (se si vuole un ultimo positivo) un test su conoscenza esterna.

### 2026-06-11 — LA chiave (intuizione utente): il SOGGETTO era sbagliato
- **Svolta:** tutti i 5 test usavano come "cieco" un'**AI esperta** — che si fa le domande giuste,
  conosce i gotcha, riconosce la risposta corretta. Ma l'utente reale di Spec Kit/SideKick è un
  **umano** che **chiede le cose sbagliate** e non sa cosa non sa. → Questi strumenti **scaffoldano
  l'anello debole (l'umano), non l'anello forte (l'AI).**
- **Spiega tutto:** (a) i 5 null result = abbiamo misurato l'anello forte (l'AI *è già* lo scaffold);
  (b) la viralità di Spec Kit "pur cambiando poco" = cambia poco per un'AI esperta su task chiaro,
  **molto per un umano** (disciplina spec-first, struttura condivisa, evita vago→output-plausibile-
  ma-sbagliato-che-l'umano-non-vede). NB: viralità = anche brand/hype/senso-di-controllo, non solo
  efficacia provata.
- **Valore riformulato:** non "l'AI non ce la fa senza" (falso), ma "**l'umano non saprebbe cosa
  chiedere / in che ordine / come riconoscere il giusto**, e il pacchetto/spec gliela fornisce".
- **C'è un modo per saperlo? Sì, cambiando il SOGGETTO:** (A) proxy runnable = test a **"richiesta
  vaga da umano"** (prompt da non-esperto: "rendi la mia app moderna con React", senza dire
  dati/comportamento; pacchetto = rete che tiene la rotta vs cieco che va in scope-creep/dati persi);
  (B) gold standard = **umano vero** (Roberto su dominio che non conosce) con/senza pacchetto, N=1.
- **Impatto su F3 (scelta = C-F3):** F3 si progetta e si **valida lato-umano** (anello debole), non
  lato-oracolo. Il "modo per saperlo" diventa parte della validazione di F3.

### 2026-06-11 — Test "richiesta vaga" (lato-umano): il pacchetto ha MISallineato
- Setup: **stessa** richiesta vaga da non-esperto ("modernizza in React, falla più bella, fai tu")
  ai due bracci budget; arm-A col pacchetto **ambientale** (CLAUDE.md → migrazione-a-componenti),
  arm-B nudo. (`_vague-test/budget-arm{A,B}`.)
- **Retrocompat:** ENTRAMBI hanno preservato `financeTrackerData`/`Theme` (array nudo) → i dati
  vecchi si caricano in tutti e due, **anche se l'umano NON l'ha chiesto.** L'AI lo fa da sola.
- **Costo:** arm-A **94 turni / 122k out / 7.1M in** vs arm-B **85 / 95k / 5.9M** → pacchetto di
  nuovo **più caro**.
- **Esito (giudizio utente): arm-B ha fatto MEGLIO.** Motivo strutturale: l'umano voleva un
  **redesign** ("più bella e moderna"); il pacchetto impone "comportamento identico, niente
  redesign/scope-creep" → arm-A ha **seguito il pacchetto e NON ha abbellito** (contro il volere
  reale dell'umano), costando di più. arm-B, libero, ha fatto ciò che l'umano chiedeva.
- **INSIGHT (inverte l'ipotesi del test lato-umano):** un pacchetto forkato porta i **vincoli/
  assunzioni del contesto d'origine**. Se l'intento del nuovo umano differisce, il pacchetto **non
  è neutro: steera ATTIVAMENTE lontano da ciò che l'umano vuole.** L'"allineamento" è verso
  l'**autore** del pacchetto e può **confliggere** col nuovo utente → il forking-di-processo, nel
  contesto sbagliato, **fa danno**. Conferma "il cieco ha fatto meglio" + "Sonnet troppo OP".
- **Implicazione per F3/valore:** il valore NON è **imporre** un processo (misallinea); è semmai
  **offrire** conoscenza *opzionale e pertinente* che l'umano sceglie. La **curation/pertinenza**
  diventa centrale: applicare il pacchetto sbagliato nel contesto sbagliato è peggio che non averlo.

### 2026-06-11 — LA direzione che regge: il META-PROCESSO operazionalizzato (input utente)
- **Osservazione utente:** usando Code vede sempre lo stesso *schema personale*: (1) **micro-commit**,
  (2) **cattura ordinata delle idee in qualsiasi momento**, (3) **fasi di design/ragionamento prima
  di scrivere**. "Vanno condivise, e va trovato il metodo migliore in assoluto per usarle."
- **Chiude il cerchio:** non è feature-knowledge (l'AI ce l'ha → provato 6 volte), è **meta-processo /
  metodo di lavoro** = il valore **non-derivabile + lato-umano + allineamento** a cui siamo arrivati.
  L'AI *conosce* questi concetti ma **non li fa da sola** in sessione → vanno **operazionalizzati**
  (automatici, senza attrito) o l'umano se li dimentica. Spec Kit è virale perché operazionalizza lo
  "spec-first" (una disciplina resa rituale). Il valore non è *imporre* (fa danno, vedi richiesta-vaga)
  ma **togliere l'attrito** alle discipline buone.
- **Mappa abitudine → tooling:** micro-commit → hook/skill commit-per-step; cattura idee →
  slash-command "salva in IDEE.md"; design-prima → gate di fase (plan-mode/design-doc); + cattura
  esito/processo (la "traccia").
- **FORMA VERA DI F3 (sharpening di C):** SideKick = **metodo di lavoro condivisibile e best-in-class
  per dev human+AI** = una **constitution** (il `METODO.md`, già il seme, Spec-Kit-compatibile) +
  **automazione** (hook/skill/settings di Claude Code) che rende le discipline automatiche. **Validato
  dall'uso** (sessioni più ordinate/efficaci) = validazione lato-umano. **Dogfooding** su noi stessi
  (VISIONE §10 "traccia fantasma").
- **Sposta il baricentro:** dal "package manager di feature" (evidenza debole) al **metodo di lavoro
  operazionalizzato e condiviso** (dove puntano TUTTI i risultati). È la forma che prende F3.
