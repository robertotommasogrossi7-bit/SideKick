# Come contribuire

Grazie per essere passato di qui. I contributi più utili ora, in ordine:

1. **Unisciti allo studio con/senza.** L'ipotesi centrale (l'impalcatura di processo aiuta
   l'*umano*, non il modello esperto) è progettata ma non ha ancora soggetti di test — vedi
   [FINDINGS.md](FINDINGS.md). Se vuoi partecipare a un piccolo studio,
   **apri una issue**.
2. **Attacca i dati o le affermazioni.** Se un numero in [`observatory/`](osservatorio/DATA.md)
   non torna, o un'affermazione non è supportata dall'N dichiarato, apri una issue — l'intero
   senso di questo repo è essere verificabile. (Due round di red team AI esterni sono già
   pubblici in [`observatory/redteam/VERDICTS.md`](osservatorio/redteam/VERDICTS.md).)
3. **Migliora gli strumenti.** Sia [`observatory/usage.mjs`](../observatory/usage.mjs) sia
   [`experiments/cost-meter.mjs`](../experiments/cost-meter.mjs) hanno test su fixture in
   [`tests/`](../tests/) e la CI li esegue a ogni push. Le PR con un test sono le più facili
   da mergiare.

Issue e PR sono benvenute **in inglese o in italiano**. Questa guida in inglese è
[`CONTRIBUTING.md`](../CONTRIBUTING.md); i doc italiani storici (pre-2026-07-25) sono
conservati nella cronologia git del repo.
