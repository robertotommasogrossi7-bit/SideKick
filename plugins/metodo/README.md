# metodo — il plugin di SideKick

Operazionalizza il **metodo di lavoro human+AI** di SideKick: rende le buone discipline
**automatiche e senza attrito**, perché l'anello debole è l'umano che se le dimentica, non l'AI.

> Perché un plugin? Perché è il modo **reale** di rendere condivisibile un metodo: lo **installi**
> in un comando, lo **forki** per migliorarlo, fai **PR** per ri-condividerlo. Niente di etereo.

## Installa
```
/plugin marketplace add robertotommasogrossi7-bit/SideKick
/plugin install metodo@sidekick
```
(In locale: `/plugin marketplace add <percorso-della-cartella-SideKick>`.)

## Discipline
- ✅ **`/metodo:idea <testo>`** — cattura un'idea in `_processo/IDEE.md` (o `IDEE.md`) **senza
  perdere il filo** del lavoro corrente. Una riga datata, una riga di conferma, stop.
- 🔜 **design-first** — un gate che invita a ragionare/spec prima di scrivere codice.
- 🔜 **micro-commit** — un nudge a committare per step logico.

## Validazione
Non si valida con un oracolo (lo abbiamo imparato): si valida **dall'uso** — riduce l'attrito e
rende le sessioni più ordinate? Lo proviamo prima **su noi stessi** (dogfooding), poi su chi lo adotta.

## Migliora / contribuisci
Forka il repo, modifica `plugins/metodo/skills/...`, apri una PR. Ogni miglioramento torna a tutti.
