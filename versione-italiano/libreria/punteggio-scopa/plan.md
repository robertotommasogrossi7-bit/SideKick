# Implementation Plan: Punteggio della Scopa

## Technical Context (istanza: il test reale)
**Linguaggio**: qualunque (qui adattato in **TypeScript**, funzione pura, testata con
**Vitest** dentro un'app React reale). Forma:
`punteggioScopa(preseA, preseB, scopeA, scopeB) → { A, B }`.

## Approccio
1. **Funzione pura** carte → punteggio (niente UI/stato).
2. **Esempi-test** che codificano il sapere non-ovvio (tabella primiera, regola del pareggio).
3. Integri poi nel flusso del tuo gioco (chi prende cosa durante la mano).

## Esito
**VALIDATO**: adattato su `poker-copia` (app reale) e **4/4 test verdi al primo colpo**. È la
prova che il sapere distillato (tabella primiera + categorie + pareggio) produce una feature
**corretta** in un'app diversa.

## 🔑 Il sapere che conta (+ la licenza)
- La **tabella primiera** (`7=21, 6=18, asso=16, figure=10, …`) è la conoscenza che un agente
  da zero sbaglia. È il valore del pacchetto.
- La fonte è **GPLv3**: si distilla la **regola** (fatto, non copyright), **non il codice** →
  reimplementando, **nessuna contaminazione di licenza**.
