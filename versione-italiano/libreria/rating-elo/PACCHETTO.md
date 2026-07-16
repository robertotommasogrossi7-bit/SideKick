---
id: rating-elo
tassonomia: Pratiche
tag: [rating, elo, classifica, matchmaking]
non_ovvieta: alta
esito: validato con test (4/4 verdi) su un'app reale (poker-copia)
provenienza: conoscenza del sistema Elo (formula standard, distillata)
versione: 0.1
speckit_compat: true
---

# Pacchetto — Rating Elo

## Identità
Aggiornare il punteggio **Elo** di due sfidanti dopo una partita (vittoria/pareggio/sconfitta).

## Quando forkarlo
Classifiche "per forza" (non per vittorie assolute): scacchi, e-sport, leghe, matchmaking.

## Esito
**Validato** (funzione pura + Vitest, 4/4). `non_ovvieta: alta` — la formula del punteggio
atteso (logistica, scala 400) e il fattore K non sono ovvi.

## I cardini (il sapere non-ovvio)
1. **Punteggio atteso**: `atteso_A = 1 / (1 + 10^((rating_B − rating_A) / 400))`.
2. **Aggiornamento**: `nuovo_A = rating_A + K · (risultato_A − atteso_A)` (K tipico = 32).
3. **Conseguenza giusta**: battere un più forte fa guadagnare molto; battere un più debole
   poco. A parità, vittoria = ±16 (K=32).

## Come adattarlo
`aggiornaElo(ratingA, ratingB, risultatoA, k?) → { nuovoA, nuovoB }` (risultatoA: 1/0.5/0).

## Provenienza
Formula Elo standard, distillata; validata su `poker-copia`.
