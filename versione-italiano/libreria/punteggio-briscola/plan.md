# Implementation Plan: Punteggio della Briscola

## Technical Context (istanza)
TypeScript, funzione pura, testata con Vitest. Vale in qualunque linguaggio.

## Approccio
Tabella valori → somma per lato → confronto a 60. Esempi-test sui valori non-ovvi.

## Esito
**Validato** su `poker-copia`: 4/4 test verdi.

## 🔑 Il sapere che conta
I valori (il **tre vale 10**, le **lisce 0**) sono la parte che un agente da zero può
sbagliare. Tutto il resto è banale.
