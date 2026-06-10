# Implementation Plan: Bracket a eliminazione diretta

## Technical Context (istanza)
TypeScript, funzione pura, Vitest. Vale in qualunque linguaggio.

## Approccio
Costruisci l'ordine slot con lo "snake" (raddoppi successivi: `s` e `somma−s`), poi
accoppia a due a due; slot oltre N = BYE. Esempi-test su 4/8/6.

## Esito
**Validato** su `poker-copia`: 4/4 test verdi.

## 🔑 Il sapere che conta
Lo **snake seeding** (perché le teste alte si incontrino tardi) e il fatto che i **bye
vanno alle teste di serie alte** sono la parte non-ovvia. Un agente da zero spesso accoppia
"1 vs 2, 3 vs 4" (sbagliato) o mette i bye a caso.
