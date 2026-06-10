---
id: punteggio-briscola
tassonomia: Pratiche
tag: [gioco-di-carte, briscola, punteggio]
non_ovvieta: media
esito: validato con test (4/4 verdi) su un'app reale (poker-copia)
provenienza: conoscenza dei giochi di carte italiani (distillata, NON codice)
versione: 0.1
speckit_compat: true
---

# Pacchetto — Punteggio della Briscola

## Identità
Punteggio di una mano di **Briscola**: somma dei valori delle carte prese; vince chi supera 60.

## Quando forkarlo
Briscola nativa in un'app di giochi di carte.

## Esito
**Validato** (funzione pura + Vitest, 4/4 verdi). `non_ovvieta: media` — i valori non sono
ovvi (il *tre* vale 10, le carte lisce 0).

## I cardini
1. **Valori**: asso 11, tre 10, re 4, cavallo 3, fante 2; carte 2/4/5/6/7 = 0. Mazzo = 120.
2. Vince chi **supera 60**; 60-60 = pareggio.

## Come adattarlo
`Carta { valore 1..10, seme }`; `punteggio(preseA, preseB)` somma i valori e confronta a 60.

## Provenienza
Conoscenza dei giochi italiani, distillata (non il codice); validata su `poker-copia`.
