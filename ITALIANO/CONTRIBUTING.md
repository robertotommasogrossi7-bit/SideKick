# Come contribuire

Grazie per essere passato di qui. I contributi più utili ora, in ordine:

1. **Unisciti allo studio con/senza.** L'ipotesi centrale (l'impalcatura di processo aiuta
   l'*umano*, non il modello esperto) è progettata ma non ha ancora soggetti di test — vedi
   [FINDINGS.md](FINDINGS.md). Se vuoi partecipare a un piccolo studio,
   **apri una issue**.
2. **Attacca i dati o le affermazioni.** Se un numero in [`observatory/`](observatory/DATA.md)
   non torna, o un'affermazione non è supportata dall'N dichiarato, apri una issue — l'intero
   senso di questo repo è essere verificabile. (Due round di red team AI esterni sono già
   pubblici in [`observatory/redteam/VERDICTS.md`](observatory/redteam/VERDICTS.md).)
3. **Migliora gli strumenti.** [`observatory/usage.mjs`](../observatory/usage.mjs) ha test in
   [`tests/`](../tests/) e la CI li esegue a ogni push
   ([`experiments/cost-meter.mjs`](../experiments/cost-meter.mjs) non ha ancora test —
   aggiungerli sarebbe un'ottima prima PR). Le PR con un test sono le più facili da mergiare.

Issue e PR sono benvenute **in inglese o in italiano**. Il percorso legacy (contribuire un
pacchetto-feature distillato) è documentato in italiano in
[`versione-italiano/CONTRIBUIRE.md`](../versione-italiano/CONTRIBUIRE.md).
