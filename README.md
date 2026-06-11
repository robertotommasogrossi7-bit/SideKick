# SideKick

**A shareable, self-improving *working method* for building software with AI.** The reusable
asset of AI-assisted dev isn't the code (the AI regenerates it) — it's the **method**: the
disciplines that keep a human+AI collaboration organized and aligned (capture ideas without
losing focus, design before code, micro-commits). SideKick operationalizes that method as
**Claude Code tooling you install, use, fork, and re-share**, and refines it from your own
real sessions.

> *We started as a "package manager for feature-processes" and tested it hard.* The honest result:
> when the model already knows or can derive the work, a feature-package adds **no net value**
> (see **What we've learned**). So the **live product is the method**; feature-packaging stays a
> **secondary, explored** idea — with a possible future for **whole-project** specs, not single
> functions.

Built to be **compatible with [GitHub Spec Kit](https://github.com/github/spec-kit)**: every
package ships Spec-Kit-shaped `spec.md` / `plan.md` (drop-in), plus a `PACCHETTO.md`
manifest carrying what Spec Kit doesn't — the **outcome**, the **hard-won decisions**, and
the **bug that teaches**.

## Why
As AI writes more of the code, the durable human asset shifts from *code* to *process and
judgment*. GitHub shares outcomes (code + commits). SideKick shares the **reasoning** —
portable across stacks, usable by any human with any AI.

## What we've learned so far (honest status)
We stress-tested our own thesis: does handing an AI a captured process-package actually help,
versus not? Across several controlled **with/without** experiments (objective oracles + token-
**cost** measurement + a reverse-engineering probe), the evidence is clear and nuanced:

- **For problems a current model already knows — or can derive from the task itself — a package
  brings no net improvement, and can cost *more* tokens.** The AI is already the expert; it
  doesn't need the scaffold. (Our tests used an expert AI as the subject — the *strong* link.)
- **The value lives where AI-vs-AI tests can't look:** the **human** (the weak link, who asks
  the wrong things, in the wrong order, and can't always tell a wrong answer), and **non-
  derivable** knowledge — rationale, dead-ends, conventions, alignment, and the compounding
  value of a growing library. This is also *why* Spec Kit gets adopted: it scaffolds the
  human's process, not the model's raw capability.
- **Open and promising:** we **do not exclude** that *better* packages/features can produce
  near-**optimal specs that cut effort/cost significantly** — especially for non-experts or
  unfamiliar domains. That's exactly what we're validating next, **human-side**.

We publish these results — positive and negative — on purpose. The rigor *is* the product.

## Use it (standing behavior — no commands)
The method is a **constitution**: copy
[`plugins/metodo/COSTITUZIONE.md`](plugins/metodo/COSTITUZIONE.md) into your `~/.claude/CLAUDE.md`
(user-level → every project) or a project's `CLAUDE.md`. From then on the AI **proactively** stewards
your method — captures ideas without breaking your focus and re-proposes them, nudges design-first
and micro-commits *when it matters*, **without forcing you** — and **updates the method itself** as
it evolves. **No slash commands to remember.**

*(Optional plugin packaging — `/plugin marketplace add robertotommasogrossi7-bit/SideKick` →
`/plugin install metodo@sidekick` — adds an explicit `/metodo:idea` capture, but the constitution
is the heart.)* Validated **by use** (does it remove friction?), starting with us dogfooding it.

## Structure
- `libreria/` — the catalog of distilled feature-processes (10 packages so far).
- `motore/` — the distillation engine that turns a real build's process into a package.
- `_processo/` — the project's own working memory (vision, decisions, **the full experiment
  log**). **Public on purpose: we share our process too.**
- `esperimenti/` — the **with/without experiments** that map where a process-package helps (and
  where it doesn't). *They lived outside this repo during testing, on purpose:* the "blind" arm
  must not be able to read the package, or the comparison is contaminated. Archived here for
  transparency.

## Status
Research in progress. 10 distilled packages; honest finding above; **validating the human-side
value next** (does a package keep a vague, non-expert request on the rails?).

## License
MIT.

---

# SideKick (Italiano)

**Un *metodo di lavoro* condivisibile e auto-migliorante per costruire software con l'AI.**
L'asset riutilizzabile dello sviluppo con l'AI non è il codice (l'AI lo rigenera) — è il
**metodo**: le discipline che tengono ordinata e allineata la collaborazione human+AI
(catturare idee senza perdere il filo, design prima del codice, micro-commit). SideKick lo
operazionalizza come **strumento di Claude Code da installare, usare, forkare e ri-condividere**,
e lo affina dalle tue sessioni reali.

> *Siamo partiti come "package manager di feature-processi" e l'abbiamo testato a fondo.* Esito
> onesto: quando il modello già sa o sa derivare, un feature-package **non aggiunge valore netto**
> (vedi **Cosa abbiamo imparato**). Quindi il **prodotto vivo è il metodo**; il feature-packaging
> resta un'idea **secondaria** ed esplorata — con un possibile futuro per gli spec di **interi
> progetti**, non singole funzioni.

Costruito per essere **compatibile con [GitHub Spec Kit](https://github.com/github/spec-kit)**:
ogni pacchetto produce `spec.md` / `plan.md` in formato Spec Kit (drop-in), più un manifesto
`PACCHETTO.md` con ciò che Spec Kit non ha — l'**esito**, le **decisioni sudate** e il **bug
che insegna**.

## Perché
Più l'AI scrive il codice, più l'asset umano che dura si sposta dal *codice* al *processo e
giudizio*. GitHub condivide gli esiti (codice + commit). SideKick condivide il **ragionamento**
— portabile tra stack, usabile da qualunque umano con qualunque AI.

## Cosa abbiamo imparato finora (stato onesto)
Abbiamo messo alla prova la nostra stessa tesi: dare a un'AI un pacchetto-processo aiuta
davvero, oppure no? In diversi esperimenti controllati **con/senza** (oracoli oggettivi +
misura del **costo** in token + una prova di reverse-engineering), l'evidenza è netta e
sfumata:

- **Per problemi che un modello attuale già conosce — o sa derivare dal compito stesso — il
  pacchetto non dà miglioramento netto, e può costare *più* token.** L'AI è già l'esperto: non
  ha bisogno dello scaffold. (I nostri test usavano come soggetto un'AI esperta — l'anello
  *forte*.)
- **Il valore vive dove i test AI‑vs‑AI non possono guardare:** l'**umano** (l'anello debole,
  che chiede le cose sbagliate, nell'ordine sbagliato, e non sempre riconosce una risposta
  errata), e la conoscenza **non derivabile** — il perché, i vicoli ciechi, le convenzioni,
  l'allineamento, e il valore che si accumula in una libreria che cresce. È anche il *motivo*
  per cui Spec Kit viene adottato: scaffolda il processo dell'umano, non la capacità del modello.
- **Aperto e promettente:** **non escludiamo** che pacchetti/feature *migliori* possano produrre
  **spec quasi ottimali che riducano di molto sforzo/costo** — specie per non‑esperti o domini
  sconosciuti. È esattamente ciò che validiamo adesso, **lato‑umano**.

Pubblichiamo questi risultati — positivi e negativi — apposta. Il rigore *è* il prodotto.

## Usalo (condotta permanente — niente comandi)
Il metodo è una **costituzione**: copia
[`plugins/metodo/COSTITUZIONE.md`](plugins/metodo/COSTITUZIONE.md) nel tuo `~/.claude/CLAUDE.md`
(livello utente → ogni progetto) o nel `CLAUDE.md` di un progetto. Da quel momento l'AI, **da sola**,
gestisce il tuo metodo: cattura le idee senza farti perdere il filo e te le ripropone, ti tiene su
design-first e micro-commit *quando serve*, **senza forzarti**, e **aggiorna il metodo stesso**
mentre evolve. **Nessuno slash command da ricordare.**

*(Packaging opzionale come plugin — `/plugin marketplace add robertotommasogrossi7-bit/SideKick` →
`/plugin install metodo@sidekick` — aggiunge una cattura esplicita `/metodo:idea`, ma la costituzione
è il cuore.)* Validato **dall'uso** (toglie attrito?), a partire da noi che lo dogfoodiamo.

## Struttura
- `libreria/` — il catalogo dei feature-processi distillati (10 pacchetti finora).
- `motore/` — il motore di distillazione che trasforma il processo di un build reale in un
  pacchetto.
- `_processo/` — la memoria di lavoro del progetto (visione, decisioni, **il log completo
  degli esperimenti**). **Pubblica apposta: condividiamo anche il nostro processo.**
- `esperimenti/` — gli **esperimenti con/senza** che mappano dove un pacchetto-processo aiuta (e
  dove no). *Durante i test vivevano fuori da questo repo, apposta:* il braccio "cieco" non deve
  poter leggere il pacchetto, o il confronto è contaminato. Archiviati qui per trasparenza.

## Stato
Ricerca in corso. 10 pacchetti distillati; il risultato onesto qui sopra; **prossimo: validare
il valore lato‑umano** (un pacchetto tiene sulla rotta una richiesta vaga da non‑esperto?).

## Licenza
MIT.
