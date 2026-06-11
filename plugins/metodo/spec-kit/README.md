# Usare il metodo con GitHub Spec Kit

Il nostro metodo **è una constitution** → la forma Spec-Kit-nativa corretta è il file
[`constitution.md`](constitution.md) messo dove Spec Kit tiene la sua: **`.specify/memory/constitution.md`**.

## Come si installa in un progetto Spec Kit
In un progetto già inizializzato con Spec Kit (`specify init …`):

```bash
cp plugins/metodo/spec-kit/constitution.md  <progetto>/.specify/memory/constitution.md
```
oppure incolla il contenuto rispondendo al comando **`/constitution`** del tuo agente.

Da lì l'agente (che legge `.specify/memory/constitution.md` come contesto) segue il metodo
**proattivamente**, e — grazie al **Principio VI (Self-Amending)** — può **aggiornarlo da solo**.

## Perché una *constitution* e non un preset/extension
In Spec Kit **preset ed extension fanno override dei *template*** (`spec`/`plan`/`tasks`), risolti
per priorità (`.specify/templates/overrides/` > `presets/` > `extensions/` > core). La constitution
**non** è un template: è memoria (`.specify/memory/`). Quindi il metodo va consegnato come
**constitution drop-in**, non come preset. *(Un preset avrebbe senso solo per riflettere il metodo
anche nei template — es. un gate "design-first" nel `plan-template.md`: è un'estensione futura,
non il cuore.)*

## Differenza dalla constitution di Spec Kit
La loro è **letta una volta e passiva**. La nostra aggiunge il **Principio VI**: l'agente la
**fa evolvere**. È il contributo concreto che proponiamo al loro concetto di constitution.
