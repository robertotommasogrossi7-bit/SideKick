# PLAN — l'unico backlog ordinato (aggiornato 2026-08-01; la data in testa si muove nello stesso commit che tocca il corpo)

> Deciso con Roberto nella chat-osservatorio. **Il backlog qui sotto È la lista**: si lavora
> dall'alto in basso, si spunta a lavoro fatto. Storico delle fasi completate in fondo.

## PROSSIMI — backlog ordinato (valore ÷ sforzo, dopo lo studio Spec Kit)

1. [x] **Correggere le due affermazioni pubblicate su Spec Kit** — VERIFICATO GIÀ FATTO
       (revisione finale 2026-07-25): entrambe le correzioni datate (2026-07-17) vivono in
       FINDINGS.md e spec-kit/README.md. Segue il testo originale del task. (dallo studio a doppio run,
       entrambe verificate alla fonte): (a) "la constitution si legge una volta sola ed è
       passiva" è FALSA — viene caricata da ogni comando core e rende `/analyze` automaticamente
       CRITICO; (b) "un metodo si distribuisce come drop-in, non come preset" era vero fino a
       Spec Kit v0.12.15 (2026-07-14), che permette a un preset di seminare la constitution
       verbatim. Correggere in FINDINGS.md, `plugins/metodo/spec-kit/README.md`, e la sezione
       "Parentela" di entrambe le costituzioni — **mostrando la correzione datata**, non
       nascondendola.
2. [x] **Correggere i tre bug del repo** trovati dallo studio — FATTO (verificato 2026-07-25):
       la CI ora gira `node --test tests/*.test.mjs` (un glob, non un singolo file hardcoded —
       confermato in `.github/workflows/ci.yml`); CONTRIBUTING.md ora dice che `cost-meter.mjs`
       "non ha ancora test" (non afferma più di averli); il `CLAUDE.md` in root non contiene più
       `consumo/`.
3. [x] **CHANGELOG del metodo + tag git** — FATTO 2026-07-17: `plugins/metodo/CHANGELOG.md`
       (v1.0→v1.5.1, incl. un emendamento non versionato registrato con onestà) + tag
       `metodo-v1.5`.
4. [~] **Controllo link in CI** — FATTO 2026-07-17 come test a zero dipendenze
       (`tests/links.test.mjs`, gira con la suite): trovati e corretti 22+ link morti nei
       banner congelati dopo la rinomina in inglese. **markdownlint: rimandato** — su ~40 file
       di prosa o urla o serve una config così permissiva da certificare poco; da rivedere se
       arrivano contributor.
5. [x] **Dizionario dati dei CSV** — FATTO 2026-07-17: `observatory/usage/SCHEMA.md` (colonne,
       unità, avvertenze su dedup/censura), linkato dall'intestazione del cruscotto.
6. [x] **Pulizia del drop-in** — FATTO 2026-07-17 (v1.5.1): rimosso il commento HTML in testa
       (liberato lo slot del Sync Impact Report), depersonalizzati i path `_processo/*`,
       governance del fork ("la tua copia ora è il master"), le affermazioni sul razionale
       collegate a STRATEGIES/CHANGELOG. Il Principio IX era già neutro rispetto al vendor a
       un'ispezione.
7. [x] **Test per `cost-meter.mjs`** — FATTO 2026-07-31: 5 test su fixture
       (`tests/cost-meter.test.mjs`, home finta via override USERPROFILE/HOME, totali
       calcolati a mano, limite senza-dedup dichiarato), suite 20/20; CONTRIBUTING EN+IT
       aggiornato.
8. [x] **Passata di tono "ipotesi operative"** — FATTA 2026-07-31 (ok di Roberto sulla
       proposta completa, 1 revisore Opus con 8 finding tutti recepiti): metodo **v1.9.3** —
       i claim misurati dichiarano fonte, N e limiti ("registro §N" = STRATEGIES.md);
       sistemato l'unico claim confutato da una misura (resume workflow best-effort, 0/46
       chiavi); direttive di comportamento intoccate; drop-in + preset.yml riallineati a
       1.9.3; CHANGELOG EN+IT; specchio risincronizzato.
9. [x] **Aggiornare il clone di spec-kit e TESTARE empiricamente il percorso preset** —
       FATTO 2026-07-31: clone in fast-forward (+562 commit, 0.15.2.dev0); `specify init
       --preset <cartella locale>` eseguito due volte (layout convenzionale `templates/` E
       layout flat), entrambe hanno seminato `.specify/memory/constitution.md` **identica
       byte a byte** (stesso SHA256) al drop-in → decisione: SI PUBBLICA —
       `plugins/metodo/spec-kit/preset.yml` pubblicato (punta a `constitution.md`, una
       copia sola), README EN+IT aggiornati col claim testato.
       `spec-kit-metodo/memory/constitution.md` riallineata al drop-in corrente — e
       ri-riallineata a ogni bump del metodo da allora (era v1.1.0; la cartella non ha
       `.git` locale — la pubblicazione di quel repo resta manuale).
10. [x] **Sweep de-Claude** dei documenti restanti — FATTO 2026-07-31: grep completo di
        Claude/Anthropic su tutti i `.md` tracciati (33 file); esito: 1 generalizzazione
        (DATA.md "più si usa l'agente di coding", EN+IT) — tutto il resto è fatto portante
        e resta per le regole stesse dello sweep: path `~/.claude/`, URL delle fonti
        prezzi, il dossier di ricerca, i verdetti del red team, le voci storiche di
        CHANGELOG/audit, i nomi dei modelli nei dati, le dashboard generate e il
        "Claude Code è lo strumento attuale, non il punto" voluto del README.
11. [x] **Rilascio dataset v0.1** — FATTO 2026-07-31: tag `dataset-v0.1` pushato + note di
        release versionate in `observatory/usage/RELEASES.md` (specchio EN+IT); dashboard
        rigenerata lo stesso giorno (70 sessioni, 12 progetti, 19,4M token di output +
        51,6M da agenti cloud); novità citate: `prices.csv`, `cost_usd_equiv`, `daily.csv`,
        `dashboard.html`, costi workflow misurati dai transcript locali; limiti ribaditi
        (equivalente API ≠ bolletta del piano, costi parziali mai inventati, censura).
        RESTA MANUALE per Roberto (niente CLI `gh` su questa macchina): su GitHub, tag →
        *Create release from tag* → incolla la sezione di RELEASES.md. Rinnovo screenshot
        dei PNG del README rimandato al rituale dell'osservatorio (procedura solo locale).
12. [ ] **MANUALE (Roberto)**: descrizione del repo + topic su GitHub; decidere sulla rinomina
        dello username.
12-bis. [ ] **Verifica-ombra: consolidare le prove, darle una vera casa VISIVA e (se
        reggono) promuoverla a regola del metodo** (Roberto, 2026-08-07, subito dopo
        l'audit del motore T-SQL — «annota queste informazioni, è molto utile»). Il pattern
        «un'ombra indipendente trova ciò che il verificatore primario manca» ha ora **N≥6
        episodi** in `~/.claude/ESPERIMENTI.md` (Tabella 1), l'ultimo è il più forte:
        un'ombra Opus con mandato adversariale ha trovato 2 bug ALTA veri sotto un
        orchestratore Fable di tier più alto che non ne aveva trovato nessuno (registro §2,
        aggiornato). Compiti: (a) raccogliere TUTTI gli episodi in un'unica tabella delle
        prove — direzione (ombra sopra/sotto la base), mandato, classi di difetti
        trovate/mancate, costo, tasso confermati-vs-falsi all'arbitrato; (b) costruire la
        **sezione visiva** chiesta da Roberto (dashboard o pagina dedicata del registro:
        card per episodio, matrice classi-per-tier, costo per finding vero) invece della
        prosa sepolta nel §2; (c) disegnare il **test controllato** mancante — l'N attuale
        confonde tre variabili (mandato, indipendenza, assegnazione delle corsie): es.
        stesso artefatto, stesso mandato adversariale, auto-verifica dell'orchestratore vs
        agente indipendente; (d) se le prove reggono, portare a Roberto l'emendamento:
        *controlli scrupolosi post-consegna = verifica confermativa per esecuzione
        dell'orchestratore + ≥1 agente adversariale indipendente (Opus di default),
        mandato di confutazione, verità-campione esterna all'artefatto («l'harness può
        essere un giudice corrotto»), ogni finding ri-verificato per esecuzione prima del
        fix* — raffinando la regola esistente «2 revisori Opus indipendenti a fine fase
        grossa» ed estendendola esplicitamente ai DELIVERABLE DI VERIFICA (harness,
        validatori, gate).
13. [x] Più avanti, guidato dai dati — **tutti e quattro i trigger verificati sui dati,
        2026-08-01**:
        · **A/B completo-vs-incrementale di progetto-15 → CHIUSO come non misurabile**
          (l'opzione che il backlog stesso offriva): 5 sessioni in tutto, mai un titolo di
          fase (operazioni censurate E senza fasi — una sessione va dal 2026-05-29 al
          07-01), nessuna attività dal 2026-07-17. Reversibile: se il progetto riparte coi
          titoli `Progetto/Fase_N`, il contratto dati lo rende misurabile da solo.
        · equivalente in costo API per modello — FATTO 2026-07-25 (`prices.csv`, fonte+data
          per riga).
        · **CSV→SQLite → soglia non raggiunta** (contate 2026-08-01: usage 45 · sessions 70
          · daily 63 · workflow 20 · prices 7 righe — max 70 per file, la soglia è
          "centinaia"). Nota per quando scatterà: Node ≥22.5 ha `node:sqlite` nativo,
          quindi resterà zero-dipendenze.
        · **ccusage come input → trigger non scattato** (verificato alla fonte 2026-08-01:
          niente operazioni titolate, niente censura, niente registro workflow nei suoi
          export — assenti tutte e tre le capacità necessarie). Da ricontrollare a un
          rituale futuro se il loro set di funzioni si muove.

**Decisione (Roberto, 2026-07-17)**: `versione-italiano/` resta **congelata** (originali +
LEGGIMI vivo). Uno specchio vivo costerebbe una doppia traduzione a ogni modifica per un
pubblico quasi nullo; l'opzione del cruscotto generato in italiano resta disponibile a
richiesta.
**Aggiornamento (Roberto, 2026-07-25)**: rovesciata — una copia esatta tradotta dei
principali doc inglesi vive ora in **`ITALIANO/`** (14 file all'epoca — l'albero è cresciuto
da allora; tenuta in sync a ogni revisione
dell'osservatorio), e dopo l'audit del repo (AR-02/03) Roberto ha scelto di tenere **una
sola** cartella italiana: `versione-italiano/` è stata rimossa dal repo pubblico lo stesso
giorno (sopravvive in locale, non tracciata, con OSSERVATORIO.md e il glossario, e nella
cronologia git per gli originali).

## Fatto (storico compresso)
- **2026-08-01 — Blocco bonifica RB-1 (due red team, tutto applicato in giornata, ordine
  di Roberto "falle tutte")**: red team interno (10 finding) + esterno (cappelli senior +
  adottante Spec Kit, 12). Consegnato: regola fonte-unica per i totali vivi (la dashboard
  è l'unica autorità, ogni pagina linka; LESSONS/DATA/README senza numeri ricopiati) ·
  colonna `estimated` in workflow.csv con marcatura `~` lungo tutta la filiera (+2 test) ·
  fallback senza-.git nel link checker (l'artefatto Download-ZIP ora passa la suite) ·
  metodo **v1.9.4** (puntatori al posto dei numeri stantii, Scope tags nel drop-in +
  caveat al Principio VI) · SCHEMA ITALIANO risincronizzato per intero · passata lingua
  sull'albero EN (cost-meter/oracle/streaming tradotti, nato il README di oracle,
  puntatori `_processo` rotti resi veri) · `.gitattributes` linguist-vendored · manifest
  del plugin onesti (0.1.1, via il "coming next") · Esito dell'audit corretto con nota
  datata (gli screenshot non erano mai stati rimossi) · screenshot rigenerati headless
  dopo il push · nato il registro locale delle posizioni (`POSIZIONI.local.md`,
  gitignorato) + le date in testa si muovono col corpo per regola. Multi-agente: 5
  scanner + 2 fixer + 1 revisore + 1 red team interno, transcript locali (contati da soli).
- **2026-07-25** — Il giorno della maratona: forensics sull'incidente resume WR3 (diagnosi a
  caldo smentita sul journal; procedura di resume sicura in PROCESSO-FABBRICA) · metodo
  v1.9→v1.9.2 (sezione Fabbrica, ombra bidirezionale, contratto 5h_windows, glossario
  spostato in Studio) · propagazione inglese completa (CONSTITUTION sincronizzata,
  FACTORY-PROCESS.md creato, drop-in 1.9.1 coi principi XII–XVI) · audit del repo da 24
  agenti (14 confermati, 1 ALTA: bug di usage.mjs corretto — ~20,5M token di Studio erano
  invisibili) · README ristrutturato (ruolo+risultati in cima) · **traduzione TOTALE di
  ITALIANO/** (cartelle in italiano, usage.mjs bilingue, dashboard autogenerate in entrambe
  le lingue) · un solo albero italiano (versione-italiano rimossa) · passata finale 3 red
  team + 2 revisori Opus, tutti e 7 i finding applicati. 5 workflow, ~3,9M token di agenti,
  tutti in workflow.csv.
- **2026-07-16** — Master del metodo nel repo + specchio in sola lettura con regola deny ·
  COSTITUZIONE v1.5 (contratto dati, economia dell'handoff, parentela con Spec Kit) · red team
  round 1 → repository riposizionato come "case study con dati reali + strumenti riusabili"
  (verdetti in `redteam/VERDICTS.md`) · progetto-15 mantenuto generico; regola Spotify
  generalizzata.
- **2026-07-17** — Facciata inglese completa (11 documenti tradotti incl. CONSTITUTION v1.5;
  originali italiani congelati in `versione-italiano/`) · red team round 2 recepito (claim su
  ccusage riscritto, N=2 degradato, fonti collegate, 21 banner CONGELATO) · nomi inglesi
  ovunque (`observatory/`, `experiments/`, `usage/`…) · test (4 verdi) + badge CI + CONTRIBUTING
  in inglese + screenshot reali nel README · glossario rimosso dal pubblico · **studio a doppio
  run di Spec Kit** (Opus ×2 — primo punto dati della Tabella 2: unione > singolo run; report
  nello scratchpad `speckit-run-A/B.md`).
