---
id: punteggio-scopa
tassonomia: Pratiche
tag: [gioco-di-carte, scopa, punteggio, primiera, regole]
non_ovvieta: alta
esito: VALIDATO con test (4/4 verdi) adattando la feature su un'app reale (poker-copia)
provenienza: OMerkel/Scopa (GPLv3) — distillata la CONOSCENZA (regole), NON il codice
versione: 0.1
speckit_compat: true
---

# Pacchetto — Punteggio della Scopa (classica)

## Identità
Calcolare il punteggio di una mano di **Scopa**: 5 categorie (carte, denari, settebello,
primiera, scope) tra due lati, con la regola del pareggio.

## Quando forkarlo
Vuoi una **scopa nativa** (non generica) nella tua app di giochi di carte, o un riferimento
sicuro alle regole del punteggio.

## Esito
**VALIDATO**: adattato su un'app reale come funzione pura + test Vitest → **4/4 verdi al
primo colpo**. `non_ovvieta: alta` — la *tabella primiera* e la regola del pareggio sono
sapere specifico che un agente da zero sbaglia.

## Nota licenza (importante)
La fonte è **GPLv3**, ma qui si distilla la **conoscenza** (le regole del gioco = fatti, non
coperti da copyright), **non il codice**. Reimplementando da zero → **niente contaminazione
di licenza**. È il vantaggio strutturale del "processo, non codice".

## Come adattarlo
Modella `Carta { valore 1..10, seme }`; implementa la funzione pura
`punteggio(preseA, preseB, scopeA, scopeB)`; tieni i cardini (tabella primiera + pareggio).

## I cardini (il sapere non-ovvio)
1. **Tabella primiera**: `7→21, 6→18, 5→15, 4→14, 3→13, 2→12, asso→16, figure(8/9/10)→10`.
   La primiera di un lato = somma del **miglior valore per seme**.
2. **Categorie contese** (carte, denari, primiera): le vince chi ne ha **di più**; in
   **pareggio NESSUNO** prende il punto.
3. **Settebello** (7 di denari) e **scope** sono **certi** (di chi ce l'ha / quante fatte).

## Contenuto
`spec.md` (regole + esempi-test) · `plan.md` (approccio + esito + nota licenza).

## Provenienza
Distillato (conoscenza) da OMerkel/Scopa col flusso SideKick; **validato** su `poker-copia`.
