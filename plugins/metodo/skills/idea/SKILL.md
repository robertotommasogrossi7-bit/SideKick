---
description: Salva al volo un'idea in _processo/IDEE.md senza interrompere il lavoro corrente. Invocala con /metodo:idea <testo dell'idea>.
disable-model-invocation: true
---

# Cattura idea (frictionless)

L'utente vuole **salvare un'idea senza perdere il filo** di ciò che sta facendo. L'idea è:

"$ARGUMENTS"

Fai **solo** questo, in modo non invasivo e veloce:

1. Determina il file idee del progetto: `_processo/IDEE.md` se nella root esiste la cartella
   `_processo/`, altrimenti `IDEE.md` nella root del progetto.
2. Se il file non esiste, crealo con l'intestazione `# IDEE` su una riga, seguita da una riga vuota.
3. **Appendi** in fondo una riga sola: `- [AAAA-MM-GG] $ARGUMENTS` usando la data di oggi.
   Non riordinare né riscrivere il resto del file.
4. Rispondi con **una sola riga** di conferma (es. `💡 salvata in _processo/IDEE.md`).

Non modificare codice, non aprire discussioni, non proporre azioni: l'utente sta lavorando ad
altro e questa è solo una cattura al volo. Se `$ARGUMENTS` è vuoto, chiedi in una riga qual è l'idea.
