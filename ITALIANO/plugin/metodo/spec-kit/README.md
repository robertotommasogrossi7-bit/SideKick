# Usare il metodo con GitHub Spec Kit

Il nostro metodo **è una constitution** → la forma nativa di Spec Kit corretta è il file
[`constitution.md`](../../../../plugins/metodo/spec-kit/constitution.md) messo dove Spec Kit
tiene la sua: **`.specify/memory/constitution.md`**.

## Come installarla in un progetto Spec Kit
In un progetto già inizializzato con Spec Kit (`specify init …`):

```bash
cp plugins/metodo/spec-kit/constitution.md  <project>/.specify/memory/constitution.md
```
oppure incolla il contenuto rispondendo al comando **`/constitution`** del tuo agente.

Da lì l'agente (che legge `.specify/memory/constitution.md` come contesto) segue il metodo
**proattivamente**, e — grazie al **Principio VI (Self-Amending)** — può **aggiornarla da
sola**.

## Perché un drop-in *constitution* (e, dalla v0.12.15, anche un preset)
La costituzione vive in **memory** (`.specify/memory/`) e **sopravvive a `specify init`**:
lasciare questo file lì è il modo più semplice e indipendente dalla versione per consegnare un
metodo. Da **Spec Kit v0.12.15 (2026-07-14)** anche un *preset* può seminare la costituzione
verbatim nella memory al momento dell'init — e ora consegniamo anche quel secondo percorso,
come [`preset.yml`](../../../../plugins/metodo/spec-kit/preset.yml) in quella cartella
(punta direttamente a `constitution.md`, così il repo tiene una copia sola):

```bash
specify init <project> --integration <agent> --preset path/to/SideKick/plugins/metodo/spec-kit
```

**Testato empiricamente il 2026-07-31** su spec-kit 0.15.2.dev0: dopo l'init,
`.specify/memory/constitution.md` è risultata **identica byte a byte** (stesso SHA256) al
drop-in, sia col layout convenzionale `templates/` sia con quello flat che consegniamo.
Caveat: abbiamo testato solo quella versione; il minimo `>=0.12.15` viene dal loro
changelog, non da nostre prove su versioni più vecchie.

> **Correzione (2026-07-17).** Una versione precedente di questa pagina affermava "preset ed
> extension fanno override solo dei *template*; una constitution non è un preset". Era vero per
> Spec Kit fino alla v0.12.14 ed è **obsoleto** dalla v0.12.15 (changelog: *"fix(presets): seed
> constitution from preset constitution-template"*). L'abbiamo scoperto noi stessi durante uno
> studio a doppio run sul loro repo; dettagli nell'osservatorio.

## Differenza dalla constitution di Spec Kit
La constitution di Spec Kit è **applicata attivamente** — ogni comando core la carica, `/plan`
ci fa gate sopra, e `/analyze` tratta i conflitti con essa come automaticamente **CRITICI** — e
ha già un meccanismo di emendamento (versioning semantico, sync impact report). Quello che
aggiunge la nostra è più stretto e preciso: **il Principio VI rende l'emendamento
*iniziato dall'agente*** — l'agente propone i cambiamenti senza che gli venga chiesto, invece
di aspettare di essere interpellato.

> **Correzione (2026-07-17).** Una versione precedente definiva la loro constitution "letta una
> volta e passiva". Sbagliato: è caricata e applicata da ogni comando core. Ciò che le manca è
> solo la parte **proattiva**.
