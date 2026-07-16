# Implementation Plan: Settlement equo

## Technical Context (istanza originale, non vincolo)
**Stack**: React + TypeScript. **Test**: Vitest sugli esempi-tabella. **Forma**: funzione
**pura** `calcolaSettlement(partecipanti) -> Trasferimento[]`, separata dalla UI. In un
altro stack: tieni la funzione pura + i test sugli stessi esempi.

## Approccio che ha funzionato
1. **Design-first**: spec come contratto con esempi numerici, prima del codice (logica di soldi).
2. **Test-first** su funzione pura (verde prima della UI).
3. **Due viste** separate: fondo (passivo) vs trasferimenti (contante reale) — nato da un fallimento del modello a liste separate.
4. **Override + check non bloccante.**

## Esito
In produzione, mergiato; coperto da test. Esteso poi da "chiusura alla cieca" a "review live" **senza cambiare la math** (segno di buona astrazione).

## 🐞 Il bug che insegna
Variante torneo: un vincitore che non aveva versato risultava **insieme debitore e creditore** → trasferimento verso sé stesso (V→V) + debito fittizio. **Fix**: auto-compensazione (`min(quota_residua, valore_residuo)`) **prima** dell'abbinamento. *Nel modello a saldo-netto il bug non può nemmeno presentarsi — per questo conta la scelta di modellazione.*

## Constitution Check (i cardini come principi)
Saldo netto + auto-compensazione · Fondo ≠ contante reale · Check non bloccante + override.
