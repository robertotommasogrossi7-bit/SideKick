---
id: punteggio-tressette
tassonomia: Pratiche
tag: [gioco-di-carte, tressette, punteggio, terzi]
non_ovvieta: alta
esito: validato con test (5/5 verdi) su un'app reale (poker-copia)
provenienza: conoscenza dei giochi di carte italiani (distillata, NON codice)
versione: 0.1
speckit_compat: true
---

# Pacchetto — Punteggio del Tressette

## Identità
Punteggio di una smazzata di **Tressette**: sistema dei "terzi" con **arrotondamento per
difetto**, più l'ultima presa.

## Quando forkarlo
Tressette nativo in un'app di giochi di carte.

## Esito
**Validato** (funzione pura + Vitest, 5/5 verdi). `non_ovvieta: alta` — il sistema dei terzi
col floor è la trappola classica (un agente conta i punti come frazioni e sbaglia).

## I cardini (il sapere non-ovvio)
1. **Terzi**: asso = 3 terzi (1 punto); due/tre/figure(re,cavallo,fante) = 1 terzo; lisce = 0.
2. **Arrotondamento per difetto**: punti del lato = `floor(somma terzi / 3)` → **i terzi
   avanzati si perdono** (2 terzi = 0 punti!).
3. **Ultima presa**: +1 punto. Totale smazzata = **11**.

## Come adattarlo
`Carta { valore 1..10, seme }`; `punteggio(preseA, preseB, ultimaPresaDi)`.

## Provenienza
Conoscenza dei giochi italiani, distillata (non il codice); validata su `poker-copia`.
