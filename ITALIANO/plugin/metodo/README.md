# metodo — il metodo di lavoro human+AI di SideKick

Trasforma il tuo **metodo di lavoro** in istruzioni permanenti su cui l'AI agisce da sola —
registra le idee al volo, propone le spec prima del codice delicato ed emenda la propria
costituzione (col tuo ok) — in ogni progetto, senza comandi da ricordare. Versione: vedi il
[CHANGELOG](CHANGELOG.md) — nota: il drop-in Spec Kit può restare una versione indietro
quando un emendamento non riguarda la variante spersonalizzata. **Vuoi adottarlo per te?** Parti dal [drop-in Spec Kit
spersonalizzato](../../../plugins/metodo/spec-kit/constitution.md) — i file qui sotto
nominano l'autore e i file di questo repo.

## Il cuore: la costituzione (nessun comando)
[`COSTITUZIONE.md`](../../../plugins/metodo/COSTITUZIONE.md) (IT) — inglese:
[`CONSTITUTION.md`](../../../plugins/metodo/CONSTITUTION.md) — è il metodo reso **istruzioni
permanenti**. Copiala in `~/.claude/CLAUDE.md` (livello utente → vale per **tutti** i progetti)
o nel `CLAUDE.md` di un progetto. Da quel momento l'AI, **da sola**:
- cattura le idee in `_processo/IDEE.md` **senza farti perdere il filo**, e te le **ripropone**;
- ti tiene su **design-first** e **micro-commit** *quando serve*, **senza forzarti**;
- **aggiorna la costituzione stessa** quando il metodo cambia.

→ **Come si usa:** incolli un file, e l'AI *si comporta* così. Niente `/comandi`.

## Opzionale: cattura esplicita
Per chi la vuole, il plugin offre anche `/metodo:idea <testo>` (salva un'idea al volo). Ma la
costituzione lo fa già **proattivamente**, quindi è secondario.

## Installa il plugin (opzionale)
```
/plugin marketplace add robertotommasogrossi7-bit/SideKick
/plugin install metodo@sidekick
```

## Migliora / condividi
È pensato per una **community che condivide e fa evolvere il proprio metodo con l'AI**: forka,
migliora la tua `COSTITUZIONE.md`, apri una PR. La versione migliore vince.
