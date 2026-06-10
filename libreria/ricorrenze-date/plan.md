# Implementation Plan: Ricorrenze di date

## Technical Context (istanza)
TypeScript, funzioni pure, Vitest. Date in **UTC** (`Date.UTC`).

## Approccio
Settimanale: avanza al primo giorno giusto, poi +7. n-esimo del mese: offset dal 1° +
(n−1)·7, controlla che non sfori il mese (→ null). Test property-based (niente date
hard-coded fragili).

## Esito
**Validato** su `poker-copia`: 3/3 test verdi.

## 🔑 Il sapere che conta
Il calcolo dell'**n-esimo giorno del mese** (con l'overflow → `null`) e l'uso di **UTC**
contro i bug di fuso sono la parte non-ovvia. La ricorrenza settimanale è banale.
