# Contribuire un pacchetto

Un **pacchetto** = il *processo* di una feature reale e funzionante, **distillato** e reso
riusabile (non il codice: il ragionamento, le decisioni, l'esito, le trappole).

## Come aggiungerne uno
1. **Distilla** col motore (vedi `GUIDA.md`): da una feature di un tuo progetto, o di un
   progetto open-source (meglio se usa Spec Kit). Ottieni `libreria/<id>/{PACCHETTO,spec,plan}.md`.
2. **Formato** (lo produce già il motore, **Spec-Kit-compatibile**):
   - `PACCHETTO.md` → front-matter (`id, tassonomia, tag, non_ovvieta, esito, provenienza,
     versione, speckit_compat`) + manifesto (identità, quando forkarlo, esito, come adattarlo,
     i cardini).
   - `spec.md` → il *cosa* (User Scenarios, `FR-###`, Key Entities, `SC-###`, Edge Cases).
   - `plan.md` → il *come* (Technical Context, approccio, esito, il bug/le decisioni non-ovvie).
3. **Tassonomia** (scegline una):
   - **Progettazione** — metodologie/architetture (es. migrazione, multi-contenuto).
   - **Pratiche** — feature di dominio (es. settlement).
   - **Pronte-per-l'AI** — artefatti esecutivi (prompt-template, task).
4. **Aggiorna `libreria/INDICE.md`** con la riga del nuovo pacchetto.
5. **Onestà sulla `non_ovvieta`**: i problemi *da manuale* valgono meno (un agente li risolve
   da solo). Il valore sta nel sapere **non-ovvio** e nell'**accumulo + auto-miglioramento**.

## Migliorare un pacchetto esistente
Se adattandolo trovi una soluzione migliore (è successo coi *centesimi interi* del
settlement), **aggiorna il pacchetto e alza la `versione`**. È la libreria che si auto-migliora.

> Forma base, da ampliare: in futuro un **registry** condiviso (pubblicazione, ricerca,
> curation, "la versione migliore sale"). Per ora: questo repo.
