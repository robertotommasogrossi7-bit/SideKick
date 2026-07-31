# PLAN — l'unico backlog ordinato (aggiornato 2026-07-17)

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
8. [ ] **Passata di tono "ipotesi operative"** su CONSTITUTION/COSTITUZIONE: ammorbidire
       MAI/SEMPRE in ipotesi con N; collegare le affermazioni a `observatory/STRATEGIES.md`.
9. [x] **Aggiornare il clone di spec-kit e TESTARE empiricamente il percorso preset** —
       FATTO 2026-07-31: clone in fast-forward (+562 commit, 0.15.2.dev0); `specify init
       --preset <cartella locale>` eseguito due volte (layout convenzionale `templates/` E
       layout flat), entrambe hanno seminato `.specify/memory/constitution.md` **identica
       byte a byte** (stesso SHA256) al drop-in → decisione: SI PUBBLICA —
       `plugins/metodo/spec-kit/preset.yml` pubblicato (punta a `constitution.md`, una
       copia sola), README EN+IT aggiornati col claim testato.
       `spec-kit-metodo/memory/constitution.md` riallineata al drop-in v1.9.1 (era v1.1.0;
       la cartella non ha `.git` locale — la pubblicazione di quel repo resta manuale).
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
13. [ ] Più avanti, guidato dai dati: METRICHE per progetto-15 (A/B completo-vs-incrementale) ·
        equivalente in costo API per modello — FATTO 2026-07-25 (`prices.csv`, fonte+data per riga) · CSV→SQLite oltre
        alcune centinaia di righe · ccusage come input se i suoi export coprissero mai censura
        + esigenze per-operazione.

**Decisione (Roberto, 2026-07-17)**: `versione-italiano/` resta **congelata** (originali +
LEGGIMI vivo). Uno specchio vivo costerebbe una doppia traduzione a ogni modifica per un
pubblico quasi nullo; l'opzione del cruscotto generato in italiano resta disponibile a
richiesta.
**Aggiornamento (Roberto, 2026-07-25)**: rovesciata — una copia esatta tradotta dei
principali doc inglesi vive ora in **`ITALIANO/`** (14 file; tenuta in sync a ogni revisione
dell'osservatorio), e dopo l'audit del repo (AR-02/03) Roberto ha scelto di tenere **una
sola** cartella italiana: `versione-italiano/` è stata rimossa dal repo pubblico lo stesso
giorno (sopravvive in locale, non tracciata, con OSSERVATORIO.md e il glossario, e nella
cronologia git per gli originali).

## Fatto (storico compresso)
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
