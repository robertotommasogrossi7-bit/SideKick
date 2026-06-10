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

## Stato attuale (2026-06-10)
- **Repo PUBBLICA:** github.com/robertotommasogrossi7-bit/SideKick. Tutto committato/pushato.
- **Fatto:** F2 (motore `motore/distilla.py`, pipeline ELT). **Libreria: 10 pacchetti
  validati** (vedi `libreria/INDICE.md`). **Loop validato** su 7+ feature non-ovvie (165 test
  verdi) + **output reale** (gradino 2: `rating-elo` integrato in un'app scacchi esterna,
  build verde).
- **Banco di prova:** `_test/poker-copia` (copia di poker-react, gitignorata, deps
  installate) per adattare+testare feature via Vitest; `_test/_fonte-chess` = app scacchi del
  gradino 2; `_test/_fonte-budget` + `_test/_fonte-habit` = le due app vanilla (pristine) del
  test migrazione-grande.
- **Prossimi passi:** (1) **TEST MIGRAZIONE GRANDE — ESEGUITO** (4 bracci, `_migr-test/`):
  ipotesi *non* confermata su app standard — i ciechi tengono la retrocompat da soli; il
  braccio-pacchetto habit l'ha pure **rotta** (wrapper zustand) e tutti i bracci-pacchetto sono
  costati **~2x token**. Pacchetto salito a **v0.3** (gotcha persist-wrapper). Dettagli in
  `DECISIONI.md` (2026-06-10/11). (2) **2° TEST TOSTO — IN CORSO**: sessionizzazione streaming
  *ruthless* (`_processo/test-streaming/SPEC.md`), oracolo **validato** (`_test/streaming-oracle/`,
  privato), nuova dimensione **costo** (`_test/misura-token.mjs`); mancano grader hashed + Fase 1
  discovery + quadruplo. (3) **F3** — preset/extension Spec Kit → proporlo; (4) #4 polish portfolio.
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
