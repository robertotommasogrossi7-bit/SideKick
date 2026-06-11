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
- **IN CORSO: test "richiesta vaga"** (`_vague-test/budget-arm{A,B}`): prompt da **non-esperto**,
  pacchetto come **rete** → primo test nel **regime giusto** (anello debole). Poi **F3**
  (preset/extension Spec Kit); #4 polish portfolio.
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
