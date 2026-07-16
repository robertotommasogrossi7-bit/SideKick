# Implementation Plan: Girone all'italiana

## Technical Context (istanza)
TypeScript, funzione pura, Vitest. Vale in qualunque linguaggio.

## Approccio
Metodo del cerchio: array di squadre (+ fantasma se dispari), accoppia i ↔ n−1−i, poi ruota
le posizioni 1..n−1. Test: nessuna coppia ripetuta = C(N,2) paia.

## Esito
**Validato** su `poker-copia`: 3/3 test verdi.

## 🔑 Il sapere che conta
Il **metodo del cerchio** (la rotazione tenendo fissa la prima) e il **fantasma per N
dispari** sono la parte non-ovvia. Un agente da zero spesso genera coppie con ripetizioni o
sbaglia i riposi.
