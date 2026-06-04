# Plan — il "come" che ha funzionato (+ esito)

> Spec Kit-shaped, ma di un build **completato**: l'approccio che ha funzionato, lo stack
> *come un'istanza* (non un obbligo), e — la parte che un repo finito non ti dà — **cosa
> si è rotto e come si è risolto**.

## Approccio (riusabile)
1. **Design-first**: scrivi lo SPEC come **contratto** con esempi numerici PRIMA del
   codice (logica di soldi → zero "aggiusto a caso").
2. **Test-first su funzione pura**: gli esempi diventano test; la funzione di calcolo è
   **pura e separata dalla UI**, testabile in isolamento. Verde prima di proseguire.
3. **Separazione concettuale nell'UI**: due viste — "il fondo" (ridistribuzione passiva)
   e "i trasferimenti" (contante reale). Nasce da un **fallimento del modello vecchio**
   (debiti e vincite come liste separate → uno poteva apparire sia tra chi paga sia tra
   chi riceve, e i soldi già nel fondo finivano tra i trasferimenti).
4. **Override + check non bloccante**: l'algoritmo è un punto di partenza, non un dogma.

## Esito
Mergiato in `main`. Coperto da test (tabella esempi + suite torneo). Il modello è stato
poi esteso da "chiusura alla cieca" a "review live pre-compilata" **senza cambiare la
math** (`saldo = valore − mancante` ne è una riformulazione): segno che l'astrazione era
quella giusta.

## 🐞 Il bug che insegna (auto-compensazione)
In una variante (torneo), un vincitore che **non aveva versato** la sua quota risultava
**insieme debitore e creditore** → l'abbinamento generava un trasferimento **verso sé
stesso** (V→V) + un **debito fittizio** nello storico.
**Fix**: prima dell'abbinamento greedy, elidi `min(quota_residua, valore_residuo)` dello
*stesso* partecipante (è il §4.2 dello spec). Esempio: vince 100 senza aver versato 25 →
quota_residua 0, valore_residuo 75 → riceve 75 dagli altri, nessun V→V.
*Chi forka questo pacchetto si risparmia di scoprire il bug sul campo.*

## Stack originale (UN'istanza, non un vincolo)
React + TypeScript; funzioni pure `calcolaSettlement` / `calcolaSettlementTorneo`; test
Vitest sugli esempi. In un altro stack: tieni **la funzione pura + i test sugli stessi
esempi**; cambia solo linguaggio e UI.
