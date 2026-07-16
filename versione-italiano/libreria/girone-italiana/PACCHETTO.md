---
id: girone-italiana
tassonomia: Pratiche
tag: [calendario, round-robin, girone, metodo-del-cerchio]
non_ovvieta: alta
esito: validato con test (3/3 verdi) su un'app reale (poker-copia)
provenienza: conoscenza del "metodo del cerchio" (distillata)
versione: 0.1
speckit_compat: true
---

# Pacchetto — Girone all'italiana (round-robin)

## Identità
Generare il **calendario** di un girone: tutti contro tutti **una volta sola**, senza
ripetizioni, una giornata alla volta.

## Quando forkarlo
Leghe, campionati, tornei a girone (anche andata/ritorno raddoppiando).

## Esito
**Validato** (funzione pura + Vitest, 3/3). `non_ovvieta: alta` — il metodo del cerchio e il
fantasma per N dispari sono sapere specifico.

## I cardini (il sapere non-ovvio)
1. **Metodo del cerchio**: fissa la prima squadra, **ruota** le altre di una posizione a
   ogni giornata → tutte le coppie, nessuna ripetizione.
2. **N dispari** → aggiungi un "fantasma" (null) → ogni giornata una squadra **riposa**.

## Come adattarlo
`generaGirone(N) → Incontro[][]` (le giornate; `Incontro.casa/ospite`, `null` = riposo).

## Provenienza
Metodo del cerchio, distillato; validato su `poker-copia`.
