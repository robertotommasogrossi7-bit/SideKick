# Implementation Plan: Rating Elo

## Technical Context (istanza)
TypeScript, funzione pura, Vitest. Vale in qualunque linguaggio.

## Approccio
Calcola il punteggio atteso (logistica base 10, scala 400), poi aggiorna con K. Esempi-test
su parità, upset, favorito.

## Esito
**Validato** su `poker-copia`: 4/4 test verdi.

## 🔑 Il sapere che conta
La **formula del punteggio atteso** (la scala 400, la base 10) e il **K-factor** sono la
parte che non si indovina. Il resto (arrotondamento, risultato 1/0.5/0) è banale.
