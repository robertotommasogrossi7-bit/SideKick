# Implementation Plan: Punteggio del Tressette

## Technical Context (istanza)
TypeScript, funzione pura, testata con Vitest. Vale in qualunque linguaggio.

## Approccio
Tabella dei **terzi** → somma → `floor(/3)` → + ultima presa. Esempi-test centrati sul floor.

## Esito
**Validato** su `poker-copia`: 5/5 test verdi.

## 🔑 Il sapere che conta
Il **sistema dei terzi con arrotondamento per difetto** è la vera trappola: i punti NON sono
frazioni, sono `floor(terzi/3)`, e i terzi avanzati **si perdono**. È esattamente ciò che un
agente da zero (o una persona) sbaglia.
