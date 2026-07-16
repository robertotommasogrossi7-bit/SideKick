---
id: ricorrenze-date
tassonomia: Pratiche
tag: [date, ricorrenze, rrule, calendario, scheduling]
non_ovvieta: alta
esito: validato con test (3/3 verdi) su un'app reale (poker-copia)
provenienza: conoscenza delle regole di ricorrenza (distillata)
versione: 0.1
speckit_compat: true
---

# Pacchetto — Ricorrenze di date (tipo RRULE)

## Identità
Espandere regole di ricorrenza: "ogni venerdì", "il 2° martedì del mese" → le date concrete.

## Quando forkarlo
Eventi/serate programmate, promemoria, calendari ricorrenti.

## Esito
**Validato** (funzioni pure + Vitest, 3/3). `non_ovvieta: alta` — il calcolo dell'"n-esimo
giorno del mese" e i bug di fuso orario sono trappole classiche.

## I cardini (il sapere non-ovvio)
1. **n-esimo giorno del mese**: `1 + ((giorno − giornoDel1°+7)%7) + (n−1)·7`; se sfora il
   mese → **non esiste** (il 5° spesso non c'è → `null`).
2. **Lavora in UTC**: costruisci le date con `Date.UTC(...)` per evitare i bug di fuso orario.

## Come adattarlo
`ricorrenzaSettimanale(dal, giornoSettimana, count) → Date[]` ·
`nthGiornoDelMese(anno, mese, giornoSettimana, n) → Date | null`.

## Provenienza
Regole di ricorrenza, distillate; validate su `poker-copia`.
