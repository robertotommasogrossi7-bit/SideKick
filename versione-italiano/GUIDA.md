# Guida d'uso — SideKick

Tre cose: **distillare** una feature (dai tuoi programmi o da progetti Spec Kit) e **usarla**
su un progetto reale.

---

## 1. Distillare una feature da un TUO programma

Hai un'app con i doc di processo (una cartella `_processo/`, o anche solo uno SPEC + le
decisioni). Punta il motore ai file della feature:

```bash
python motore/distilla.py --id <slug> \
  --dominio "<che app è>" --stack "<stack originale>" --esito "<com'è andata>" \
  --fonte <path/FEATURE_SPEC.md> --fonte <path/DECISIONI.md>
```

Di default (backend `prompt-only`) scrive `libreria/<slug>/_PROMPT_PRONTO.md`. Distillalo in
una chat Claude (**gratis sul tuo Max**), salva l'output (i 3 file delimitati da
`=== FILE: ... ===`), poi caricalo:

```bash
python motore/distilla.py --id <slug> --load output_distillato.txt
```

→ scrive `libreria/<slug>/{PACCHETTO,spec,plan}.md`.
*(Con `--backend claude-cli` la distillazione gira da sola via Claude Code, niente passaggio manuale.)*

---

## 2. Distillare una feature da un progetto Spec Kit (e salvarla sul PC)

1. **Clona** il progetto: `git clone <repo>` in una cartella.
2. Le fonti migliori sono i suoi file Spec Kit:
   `.specify/memory/constitution.md`, `specs/<feature>/spec.md`, `plan.md`, `tasks.md`.
   *(Se non usa Spec Kit: README, design doc/ADR, e i file di codice della feature.)*
3. Punta il motore a quei file:
   ```bash
   python motore/distilla.py --id <slug> --dominio "<...>" --stack "<...>" \
     --fonte <clone>/specs/<feature>/spec.md \
     --fonte <clone>/specs/<feature>/plan.md
   ```
4. Distilla (come al §1) → il pacchetto finisce in `libreria/<slug>/` **sul tuo PC**.

> Più processo c'è nella fonte (spec, decisioni, storia), più ricco il pacchetto. Un repo
> di solo codice dà un pacchetto più sottile.

---

## 3. Usare un pacchetto su un progetto reale

Il pacchetto è **testo, AI-agnostico**. Due modi:

- **Con Spec Kit:** copia `libreria/<slug>/spec.md` in `specs/<feature>/spec.md` del tuo
  progetto, poi `/speckit.plan` → `/speckit.implement`. I cardini di `PACCHETTO.md` → la
  `constitution`.
- **Con qualunque AI (più semplice):** apri Claude Code (o Cursor, …) nel tuo progetto e di':
  > *"Implementa questa feature adattandola alla mia app; segui questo pacchetto: `<incolla o path>`"*

  L'AI la cala nel tuo stack e nel tuo modello dati.

---

## Note
- Lo **scrub** toglie segreti/chiavi/email/percorsi prima di distillare. Controlla comunque l'output.
- I **metadati** nel front-matter di `PACCHETTO.md` (`non_ovvieta`, `tag`, `versione`)
  servono a cercare e **curare** la libreria.
- Un pacchetto **migliora nel tempo**: se l'AI che lo adatta trova una soluzione migliore,
  aggiorna il pacchetto e alza la `versione`. (È la libreria auto-migliorante.)
