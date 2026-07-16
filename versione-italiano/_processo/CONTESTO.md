# CONTESTO — SideKick

> **Si legge per primo** (METODO). Per la strategia completa vedi `VISIONE.md`.

## Cos'è
SideKick = tool che cattura il *processo* di sviluppo AI di un'app e lo distilla in
**ricette riutilizzabili e condivisibili**. Pipeline di data engineering
(Extract → Transform → Load → Retrieval). Tesi e strategia: `VISIONE.md`. Brief
originale: `../cattura-processo-ai-brief.md`.

## Architettura a due cartelle (NON si fondono)
- **Cartella A = `poker`** (`C:\Users\rober\Desktop\Programmi\poker`): l'app-cavia,
  soggetto sperimentale. Si costruisce normalmente, non dipende da SideKick.
- **Cartella B = SideKick** (questa): osserva poker dall'esterno.
- Transcript di poker:
  `~/.claude/projects/C--Users-rober-Desktop-Programmi-poker[*-worktrees-*]/*.jsonl`.

## ⚠️ STATO: CONGELATO (2026-06-11) — strada unica = POKER
SideKick è **fermo a un checkpoint onesto** per decisione finale (vedi `DECISIONI.md`, ultima
voce): i test non hanno mostrato valore del pacchetto per un modello forte; la tesi vera
(scaffolding dell'umano) è progettata ma non eseguibile ora (mancano soggetti). Il lavoro
continua su **`poker/`** (auth/account → testbed e portfolio AWS). Una chat nuova su SideKick
serve solo per: pubblicare `FINDINGS.md` (già ricalibrato e presentabile) o un revival informato
(idee pronte in `IDEE.md`: specchio di processo, studio umano, whole-project-spec).

## Stato attuale (2026-06-11)
- **Repo PUBBLICA:** github.com/robertotommasogrossi7-bit/SideKick. Tutto committato/pushato.
- **Fatto:** F2 (motore `motore/distilla.py`, pipeline ELT). **Libreria: 10 pacchetti
  validati** (vedi `libreria/INDICE.md`). **Loop validato** su 7+ feature non-ovvie (165 test
  verdi) + **output reale** (gradino 2: `rating-elo` integrato in un'app scacchi esterna,
  build verde).
- **Banco di prova:** `_test/poker-copia` (copia di poker-react, gitignorata, deps
  installate) per adattare+testare feature via Vitest; `_test/_fonte-chess` = app scacchi del
  gradino 2; `_test/_fonte-budget` + `_test/_fonte-habit` = le due app vanilla (pristine) del
  test migrazione-grande.
- **CONCLUSIONE TEST (vedi `DECISIONI.md`, 2026-06-11):** 5 test con/senza su oracolo →
  **nessun valore netto del pacchetto** quando il modello già sa/deriva (anzi costa più token:
  migrazione ~2x; streaming risolto pulito; reverse *senza* spec risolto a +30%). **Svolta
  (intuizione utente):** il soggetto era un'**AI esperta** (anello *forte*); il valore vive
  **lato-umano** (anello debole, che chiede male) + nel **non-derivabile** (perché, dead-end,
  convenzioni, allineamento, accumulo). Spec Kit è virale perché scaffolda l'umano, non l'AI.
- **DECISIONE = C-F3:** SideKick = memoria del **non-derivabile**, Spec-Kit-native, **validata
  lato-umano** (non su oracolo). **README aggiornato** di conseguenza (onesto: nessun miglioramento
  netto coi modelli che già sanno; non escluso che pacchetti migliori diano spec ottimali a costo
  ridotto).
- **FATTO: test "richiesta vaga"** — il pacchetto ha **MISallineato** (imponeva "no redesign"
  contro il volere umano "fallo bello") e il **cieco ha fatto meglio** (+ pacchetto più caro).
  Lezione: forkare un processo nel contesto sbagliato **fa danno**. Tutti i test archiviati in
  `esperimenti/` (erano fuori dal repo apposta, per isolamento del cieco).
- **F3 IN CORSO (forma "metodo operazionalizzato"):** SideKick è ora un **marketplace**
  (`.claude-plugin/marketplace.json`) + plugin **`metodo`** (`plugins/metodo/`); prima disciplina
  spedita **`/metodo:idea`** (cattura idea in `_processo/IDEE.md`). Prossime: **design-first gate**,
  **micro-commit nudge** (hook), **constitution da METODO**. Validazione **dall'uso** (dogfooding),
  non da oracolo. Install: `/plugin marketplace add robertotommasogrossi7-bit/SideKick` →
  `/plugin install metodo@sidekick`. Poi #4 polish portfolio.
- **Apparato test riusabile:** `_test/streaming-oracle/` (grader hashed + property-test + reference
  privata), `_test/misura-token.mjs` (costo dai transcript), `_migr-test/` + `_stream-test/` (bracci).
- Spec Kit installato (`uv`+`specify`); sandbox in `Programmi/_spec-kit-sandbox`. GitHub Spec
  Kit = standard con cui restare compatibili (vedi `VISIONE.md` §4).

## Stack (proposta — da confermare)
**Python** per la pipeline (parsing JSONL, distillazione via LLM, embedding, storage).
Motivo: è data engineering, è la tua lingua, serve al portfolio AWS Data Engineer.
*Decisione aperta.*

## Workflow
`METODO.md` (sul desktop): multi-chat, design-prima-del-codice, micro-commit,
`_processo/` come memoria. Commit in italiano, **senza** `Co-Authored-By`.

## Distinzione da non dimenticare
`_processo/` di SideKick = memoria **privata** di sviluppo del progetto. La **libreria di
ricette condivisibili** sarà un **output separato** del prodotto.

## Puntatori
- `VISIONE.md` — tesi, posizionamento Spec Kit, tassonomia, staging, domande aperte.
- `../cattura-processo-ai-brief.md` — brief originale.
- `METODO.md` (desktop) — metodo di lavoro.
- `poker/_processo/` — processo reale già distillato a mano (materia prima per F1).
