---
id: bracket-eliminazione
tassonomia: Pratiche
tag: [torneo, bracket, seeding, eliminazione-diretta, bye]
non_ovvieta: alta
esito: validato con test (4/4 verdi) su un'app reale (poker-copia)
provenienza: conoscenza del seeding sportivo (distillata)
versione: 0.1
speckit_compat: true
---

# Pacchetto — Bracket a eliminazione diretta (con teste di serie)

## Identità
Generare il tabellone a eliminazione: gli accoppiamenti del primo turno con **seeding** e
**bye** corretti.

## Quando forkarlo
Tornei a eliminazione (poker, sport, e-sport): vuoi un tabellone *giusto*, non a caso.

## Esito
**Validato** (funzione pura + Vitest, 4/4). `non_ovvieta: alta` — lo snake seeding e il
posizionamento dei bye sono sapere specifico che si sbaglia facilmente.

## I cardini (il sapere non-ovvio)
1. **Snake seeding**: ordine slot `[1,2] → [1,4,2,3] → [1,8,4,5,2,7,3,6] …` → le teste di
   serie alte si incontrano il più **tardi** possibile (1 e 2 in finale).
2. **N non potenza di 2** → arrotonda alla potenza di 2 superiore; i **BYE** vanno alle
   teste di serie **più alte** (slot oltre N = avversario nullo).

## Come adattarlo
`generaBracket(N) → { size, primoTurno: Match[] }`, con `Match.a/b` = numero di seed o
`null` (BYE).

## Provenienza
Conoscenza del seeding sportivo, distillata; validata su `poker-copia`.
