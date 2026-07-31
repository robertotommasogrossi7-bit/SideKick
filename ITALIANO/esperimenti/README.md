# experiments/ — i test con/senza (dove un pacchetto di processo aiuta, e dove no)

Questa cartella raccoglie gli esperimenti **con/senza** usati per mettere alla prova la tesi di
SideKick: *dare a un'AI un pacchetto di processo migliora il risultato, rispetto a non darglielo?*

## Perché non erano qui prima (importante)
Durante i test queste cartelle vivevano **fuori dal repo** (in `Programmi/_migr-test`,
`_stream-test`, `_vague-test`), come progetti git separati. **Di proposito, per affidabilità:**
il braccio **"cieco"** (senza il pacchetto) non deve poter leggere né il pacchetto né la
libreria di SideKick, altrimenti il confronto è **contaminato** (è successo davvero, vedi
`DECISIONI.md` 2026-06-04, fork-test v1). Ogni braccio era quindi una root isolata. Conclusi i
test, li abbiamo **archiviati qui** per trasparenza (sorgente, senza `node_modules`/`dist`; la
cronologia commit di ogni braccio è in `_git-history.txt`).

## Cosa c'è qui
- `migrazione/` — `{budget,habit}-{armA,armB}`: migrazione vanilla→React, con/senza il
  pacchetto `migrazione-a-componenti`.
- `streaming/` — `discovery/` (con una spec completa) e `reverse/` (solo esempi, regola da
  inferire) di un problema di sessionizzazione su misura; `oracle/` = riferimento + grader
  **a prova di leak** (hash) + generatori + property-test.
- `richiesta-vaga/` — `budget-arm{A,B}`: **stessa richiesta vaga da un non esperto**, braccio A
  con il pacchetto ambientale (CLAUDE.md), braccio B nudo. Il test "lato umano".
- `cost-meter.mjs` — misura il **costo** (turni/token) di un braccio dai suoi transcript.

## Cosa abbiamo trovato (riassunto; il dettaglio vive nei repo privati dei progetti)
- Quando il modello **lo sa già o può derivarlo**, il pacchetto **non migliora** il risultato e
  **costa di più** (migrazione ~2x; streaming risolto in modo pulito; reverse, *senza* una
  spec, +30%).
- Nel test **lato umano** il pacchetto ha perfino **disallineato**: l'umano voleva un redesign,
  il pacchetto imponeva "comportamento identico" → il braccio cieco ha fatto **meglio**.
- Lezione: il valore non è imporre un processo (può fare danno nel contesto sbagliato), ma
  offrire conoscenza **non derivabile** e **rilevante**, scelta dall'umano. È la direzione a
  cui punta la prossima iterazione della libreria del pacchetto.
