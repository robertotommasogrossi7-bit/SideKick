# esperimenti/ — i test con/senza (dove un pacchetto-processo aiuta, e dove no)

> ⚠️ **COPIA CONGELATA (2026-07-17)** — originale italiano storico, non più aggiornato.
> La versione viva è in inglese: [../../experiments/README.md](../../experiments/README.md)

Questa cartella raccoglie gli esperimenti **con/senza** con cui abbiamo messo alla prova la tesi
di SideKick: *dare a un'AI un pacchetto-processo migliora il risultato, rispetto a non darglielo?*

## Perché prima NON erano qui (importante)
Durante i test queste cartelle vivevano **fuori dal repo** (in `Programmi/_migr-test`,
`_stream-test`, `_vague-test`), come progetti git separati. **Apposta, per affidabilità:** il
braccio **"cieco"** (senza pacchetto) non deve poter leggere né il pacchetto né la libreria di
SideKick, altrimenti il confronto è **contaminato** (è successo davvero, vedi `DECISIONI.md`
2026-06-04, fork-test v1). Ogni braccio era quindi un root isolato. A test conclusi li
**archiviamo qui** per trasparenza (sorgente, senza `node_modules`/`dist`; lo storico dei commit
di ogni braccio è in `_git-history.txt`).

## Cosa c'è
- `migrazione/` — `{budget,habit}-{armA,armB}`: migrazione vanilla→React, con/senza il pacchetto
  `migrazione-a-componenti`.
- `streaming/` — `discovery/` (con spec completa) e `reverse/` (solo esempi, regola da dedurre) di
  un problema bespoke di sessionizzazione; `oracolo/` = reference + grader **leak-proof** (hash) +
  generatori + property-test.
- `richiesta-vaga/` — `budget-arm{A,B}`: **stessa richiesta vaga da non-esperto**, arm-A col
  pacchetto ambientale (CLAUDE.md), arm-B nudo. Il test "lato-umano".
- `misura-token.mjs` — misura il **costo** (turni/token) di un braccio dai suoi transcript.

## Cosa abbiamo trovato (sintesi; dettaglio in `../_processo/DECISIONI.md`)
- Quando il modello **già sa o sa derivare**, il pacchetto **non migliora** l'esito e **costa di
  più** (migrazione ~2x; streaming risolto pulito; reverse, *senza* spec, +30%).
- Nel test **lato-umano** il pacchetto ha pure **misallineato**: l'umano voleva un redesign, il
  pacchetto imponeva "comportamento identico" → il braccio cieco ha fatto **meglio**.
- Lezione: il valore non è imporre un processo (può fare danno nel contesto sbagliato), ma offrire
  conoscenza **non-derivabile**, **pertinente**, scelta dall'umano. È ciò su cui punta F3.
