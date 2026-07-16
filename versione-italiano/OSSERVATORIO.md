# OSSERVATORIO — compiti permanenti di SideKick

> **Leggi questo file all'avvio di ogni sessione in SideKick.** Elenca ciò che SideKick deve
> controllare/aggiornare da solo, oltre al lavoro puntuale che Roberto chiede.

## Cos'è SideKick (ruolo in espansione)
SideKick è il posto dove Roberto **ottimizza, controlla, testa e analizza Claude Code e le sue
sessioni**, per renderle **più efficienti nel tempo**. Non è (solo) la libreria di feature distillate:
è il **banco di lavoro sul metodo stesso**.
- **Metodo canonico**: `../plugins/metodo/COSTITUZIONE.md` (master; lo specchio in sola lettura è `~/.claude/CLAUDE.md`).
- **Esperimenti sui modelli / processo**: `../experiments/` + log globale `~/.claude/ESPERIMENTI.md`.
- **Libreria di feature distillate**: `libreria/` (vedi `GUIDA.md`).
- **Glossario dei termini che Roberto impara**: `glossario/` (indice: `glossario/INDICE.md`).

## Compiti permanenti (controllali ad ogni avvio)

### 1. Glossario — aggiornalo dai materiali di studio
Roberto è agli inizi e accumula i termini che non conosce in `glossario/` (cartella **solo
locale, gitignorata — mai su GitHub**; categorie: data-engineering, sviluppo-app, java…).
**Compito di SideKick**: prendere periodicamente i **termini nuovi dai materiali di studio di
Roberto** — in particolare la sua **app/note di studio AWS** — e aggiungerli al glossario,
spiegati semplici, aggiornando `glossario/INDICE.md`.
- ⚠️ **Path dei materiali AWS: NON ancora noto.** La prima volta **chiedilo a Roberto** e **annotalo
  qui sotto**, così le volte dopo lo trovi da solo.
  - Path materiali di studio AWS: _(da compilare)_
- Categorie AWS attese dentro `data-engineering/`: ingestion, staging, database, servizi AWS.

### 2. Osservatorio dati — consumo token + revisione del metodo
La chat-osservatorio segue il **rituale in `../observatory/DATA.md`** (in inglese; l'originale
italiano congelato è in `osservatorio/DATI.md` qui accanto): rigenera il consumo token di TUTTE
le chat (`node observatory/usage.mjs` dalla root del repo — nomi privati censurati, legenda
solo locale), confronta lo specchio del metodo col master del repo, rilegge ESPERIMENTI/METRICHE
nuovi e aggiorna i verdetti. I passi già decisi con Roberto sono in `../observatory/PLAN.md`.

### 3. (spazio per altri compiti osservatorio)
Es. rivedere il metodo quando escono modelli nuovi (già previsto nella COSTITUZIONE), consolidare gli
esperimenti, ecc. Aggiungere qui man mano.
