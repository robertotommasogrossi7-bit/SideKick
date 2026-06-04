# SideKick

**A package manager for *feature-processes*.** Share the *process* of building software —
decisions, reasoning, gotchas, outcomes — not just the code. Distill a feature from a real,
finished build into a reusable, **AI-agnostic** package; then fork it to bootstrap the same
feature in a *different* project, in *any* stack.

Built to be **compatible with [GitHub Spec Kit](https://github.com/github/spec-kit)**: every
package ships Spec-Kit-shaped `spec.md` / `plan.md` (drop-in), plus a `PACCHETTO.md`
manifest carrying what Spec Kit doesn't — the **outcome**, the **hard-won decisions**, and
the **bug that teaches**.

## Why
As AI writes more of the code, the durable human asset shifts from *code* to *process and
judgment*. GitHub shares outcomes (code + commits). SideKick shares the **reasoning** —
portable across stacks, usable by any human with any AI.

## Structure
- `libreria/` — the catalog of distilled feature-processes (the packages).
- `motore/` — the distillation engine that turns a real build's process into a package.
- `_processo/` — the project's own working memory (vision, decisions). **Public on purpose:
  we share our process too.**
- `fork-test/` — experiments that validated the idea.

## Status
Early. Two hand-distilled packages (`settlement-equo`, `migrazione-a-componenti`); the
automated engine is next.

## License
MIT.

---

# SideKick (Italiano)

**Un package manager di *feature-processi*.** Condividi il *processo* con cui si costruisce
software — decisioni, ragionamenti, trappole, esiti — non solo il codice. Distilla una
feature da un progetto reale e finito in un pacchetto riutilizzabile e **AI-agnostico**;
poi lo forki per ripartire con quella stessa feature in un progetto *diverso*, in *qualsiasi*
stack.

Costruito per essere **compatibile con [GitHub Spec Kit](https://github.com/github/spec-kit)**:
ogni pacchetto produce `spec.md` / `plan.md` in formato Spec Kit (drop-in), più un manifesto
`PACCHETTO.md` con ciò che Spec Kit non ha — l'**esito**, le **decisioni sudate** e il **bug
che insegna**.

## Perché
Più l'AI scrive il codice, più l'asset umano che dura si sposta dal *codice* al *processo e
giudizio*. GitHub condivide gli esiti (codice + commit). SideKick condivide il **ragionamento**
— portabile tra stack, usabile da qualunque umano con qualunque AI.

## Struttura
- `libreria/` — il catalogo dei feature-processi distillati (i pacchetti).
- `motore/` — il motore di distillazione che trasforma il processo di un build reale in un
  pacchetto.
- `_processo/` — la memoria di lavoro del progetto (visione, decisioni). **Pubblica
  apposta: condividiamo anche il nostro processo.**
- `fork-test/` — gli esperimenti che hanno validato l'idea.

## Stato
Iniziale. Due pacchetti distillati a mano (`settlement-equo`, `migrazione-a-componenti`); il
motore automatico è il prossimo passo.

## Licenza
MIT.
