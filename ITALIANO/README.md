> Questa è la versione in Italiano, una copia ESATTA ma tradotta della repository.
> Originale: [README.md](../README.md).

# SideKick — un laboratorio nel mondo reale su come costruire software con un agente AI di coding

[![CI](https://github.com/robertotommasogrossi7-bit/SideKick/actions/workflows/ci.yml/badge.svg)](https://github.com/robertotommasogrossi7-bit/SideKick/actions/workflows/ci.yml)

*"Ho provato a misurare se un processo catturato aiuta lo sviluppo assistito da AI — e non
sono riuscito a costruire un test equo (ancora)."* — [l'articolo da cui è nato questo
repo](FINDINGS.md)

Uno sviluppatore alle prime armi, diverse app reali, **ogni transcript misurato**. Questo
repo raccoglie esperimenti reali, dati reali sui token e risultati negativi onesti su
*come* lavorare con un agente AI di coding — più i piccoli strumenti usati per misurare
tutto questo. Claude Code è lo strumento attuale, non il punto: le domande (quanto costa e
cosa restituisce ogni scelta di collaborazione?) valgono per lo sviluppo software assistito
da AI in generale.

> **Cos'è questo:** prima di tutto il laboratorio di lavoro personale dell'autore — i dati
> vengono pubblicati perché possono essere utili, non perché sono un prodotto. Case study
> esplorativi con le dimensioni del campione sempre dichiarate (di solito N=1–2). **Cosa non
> è:** benchmark o best practice comprovate. I risultati negativi sono pubblicati apposta.

## Cosa puoi portarti a casa

| Cosa | Dove | Perché è raro |
|---|---|---|
| **Un dataset pubblicato e redatto di uso reale dell'agente** | [`observatory/usage/`](../observatory/usage/) (CSV + dashboard), generato da [`observatory/usage.mjs`](../observatory/usage.mjs) | Gli *strumenti* per l'uso sono abbondanti — [ccusage](https://github.com/ryoppippi/ccusage) e il suo ecosistema analizzano gli stessi transcript JSONL locali, e lo fanno con più funzioni del nostro piccolo script. Ciò che pubblichiamo e che abbiamo raramente visto altrove (*per quanto ne sappiamo*) sono i **dati stessi**: mesi di uso reale di un principiante, sessione per sessione, con **operazioni nominate** (titoli di sessione come `WTB/Base_4` — WTB = Who's the Boss, una delle app reali, vedi l'approfondimento per progetto), progetti privati oscurati, più un registro tenuto a mano dei workflow degli agenti cloud — tutto in un'unica dashboard, che cresce finché i transcript locali restano abilitati. |
| **Contametro dei costi per i bracci di esperimenti A/B** | [`experiments/cost-meter.mjs`](../experiments/cost-meter.mjs) | Misura i turni/token di un esperimento con/senza dai suoi transcript. |
| **Correttore a prova di fuga per test nascosti** | [`experiments/streaming/oracle/`](../experiments/streaming/oracle/) | Verifica se un artefatto di processo aiuta, senza rivelare le risposte al modello. |
| **L'articolo** | [`FINDINGS.md`](../FINDINGS.md) | *"Ho provato a misurare se un processo catturato aiuta lo sviluppo assistito da AI — e non sono riuscito a costruire un test equo (ancora)."* Include il primo tentativo contaminato e la revisione avversariale esterna che ha smontato la v1. |
| **Un drop-in di constitution per Spec Kit** | [`plugins/metodo/spec-kit/constitution.md`](../plugins/metodo/spec-kit/constitution.md) | Una constitution di metodo di lavoro auto-emendante in formato Spec Kit (v1.9.0) — la variante spersonalizzata e riusabile del nostro metodo. |

Avvio rapido per il generatore del dataset (nessuna dipendenza, Node 18+):

```
node observatory/usage.mjs
# reads ~/.claude/projects/**/*.jsonl (your local Claude Code transcripts)
# writes observatory/usage/: DASHBOARD.md (dashboard) + usage.csv + sessions.csv + per-project/
```

La [dashboard](../observatory/usage/DASHBOARD.md) committata è esattamente ciò che appare
in output.

## Il laboratorio (dati live)

[![La dashboard di utilizzo: totali a colpo d'occhio e le operazioni più costose](../docs/img/DASHBOARD.png)](../observatory/usage/DASHBOARD.md)

[`observatory/`](../observatory/) è l'osservatorio (inglese; originali italiani in
[`versione-italiano/`](../versione-italiano/LEGGIMI.md)):

- [`usage/DASHBOARD.md`](../observatory/usage/DASHBOARD.md) — la dashboard dei costi:
  totali, le operazioni più costose, approfondimenti per progetto (un file per progetto).
- [`STRATEGIES.md`](observatory/STRATEGIES.md) — il registro costi/benefici di ogni
  strategia di metodo di lavoro sotto verifica: audit multi-agente, verifiche-ombra
  cross-model, red team, **incluse le strategie che sono fallite e sono state abbandonate**.
- [`redteam/VERDICTS.md`](observatory/redteam/VERDICTS.md) — prima che questo repo
  diventasse pubblico nella sua forma attuale, due revisori AI indipendenti hanno fatto le
  pulci al dossier; i verdetti, la verifica affermazione per affermazione (una "correzione"
  di un revisore si è rivelata sbagliata) e le correzioni sono tutti alla luce del sole.
- [`DATA.md`](observatory/DATA.md) / [`PLAN.md`](observatory/PLAN.md) — cosa i dati possono
  e non possono ancora dire, e cosa viene dopo.

Ogni progetto ha il suo approfondimento — ecco la cronologia di build di un'app reale,
sessione per sessione, operazione nominata per operazione nominata:

[![La sessioni di un progetto: periodo, titolo dell'operazione, modelli, token](../docs/img/WTB.png)](../observatory/usage/per-project/poker-who-s-the-boss.md)

Alcuni risultati campione (dettagli e avvertenze all'interno): un audit multi-agente pesante
ha trovato bug critici reali su entrambi i progetti su cui è girato, a un costo noto (N=2);
in un'unica verifica-ombra cross-model (N=2) modelli piccoli e grandi hanno pareggiato sulla
verifica del codice — un'indicazione che continuiamo a testare, non una tendenza; le letture
di cache erano ~187× i token vivi su tutte le chat (conteggio del 2026-07-25; ~170× nel
conteggio precedente) — la nostra regola operativa ("riprendi il lavoro interrotto invece di
ripartire da zero") viene da questa meccanica più una ripresa misurata che ha riusato il
100% dei passi completati, non da un test A/B.

## Il metodo (appendice — ipotesi operative, non regole comprovate)

Manteniamo anche una **costituzione del metodo di lavoro** per la collaborazione umano+AI:
cattura delle idee, design-prima-del-codice, ricerca-prima-di-scegliere, modello+effort per
passo, un "contratto dati" così che ogni chat lasci tracce misurabili. Vive in
[`plugins/metodo/`](../plugins/metodo/) (master italiano · versione inglese · drop-in Spec
Kit) ed è **auto-emendante**: il metodo è destinato a cambiare man mano che arrivano i dati.
Ogni regola al suo interno è un'ipotesi operativa sostenuta da N piccolo.

Per usarlo: copia
[`plugins/metodo/COSTITUZIONE.md`](../plugins/metodo/COSTITUZIONE.md) (o la [versione
inglese](../plugins/metodo/CONSTITUTION.md)) nel tuo `~/.claude/CLAUDE.md`, oppure metti la
[constitution Spec Kit](../plugins/metodo/spec-kit/constitution.md) in
`.specify/memory/constitution.md`.

Relazione con [GitHub Spec Kit](https://github.com/github/spec-kit): Spec Kit organizza il
*lavoro* (constitution → spec → plan → tasks); SideKick misura la *collaborazione* — quanto
costa e cosa restituisce ogni scelta di metodo — e distribuisce il proprio metodo come
drop-in di constitution per Spec Kit.

## Regole di onestà di questo repo

1. Le dimensioni del campione sono dichiarate accanto a ogni affermazione; un N piccolo è
   chiamato *indicazione*, mai prova.
2. I risultati negativi e le strategie abbandonate restano pubblicati (`FINDINGS.md`, i log
   grezzi in italiano in `versione-italiano/_processo/`, la sezione "abbandonate" di
   `STRATEGIES.md`).
3. Qualunque cosa pubblica passa prima da un red team AI esterno — e le affermazioni dei
   revisori vengono verificate anche alla fonte (a volte sbagliano).

## Italiano

Tutta la documentazione di lavoro in italiano è in
[`versione-italiano/`](../versione-italiano/LEGGIMI.md) (guida, libreria dei pacchetti,
motore di distillazione, compiti dell'osservatorio).

## Licenza

[MIT](../LICENSE)
