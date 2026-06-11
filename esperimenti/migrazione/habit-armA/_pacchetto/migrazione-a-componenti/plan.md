# Implementation Plan: Migrazione vanilla → framework a componenti

## Technical Context (istanza originale, non vincolo)
**Stack**: Vite + React + TypeScript (strict) + Zustand (`persist`) + React Router.
**Bussola**: un doc-mappa del codice (qui `POKER_MAP.md`). In un altro stack: cambia
framework/store, **tieni le regole**.

## Approccio che ha funzionato — playbook a fasi
Dalle fondamenta alla UI, ognuna testabile:
1. **Fondamenta**: scaffolding, tipi/modello (dalla mappa), funzioni pure 1:1, migrazioni dati, **store con persist sulla chiave esistente**. *Test: legge i dati vecchi.*
2. Auth + navigazione + schermate "indice".
3. Layout + viste di sola lettura.
4. Viste di setup/creazione.
5. Il cuore "live"/interattivo (più stato: hook, timer).
6. Chiusura/flussi finali + build + verifica end-to-end.

Ogni fase: 3-6 commit, push dopo ognuno, branch da `main`, mai merge in main dalla chat che implementa.

## Esito
~3500 righe / 16 moduli → React+TS, mergiato, **48 test verdi**, build pulita, **dati
intatti e migrazioni idempotenti**. Ha poi abilitato nuove feature senza riscritture.

## 🧰 I gotcha che insegnano
- Store che persiste troppo → `partialize` (solo dati).
- Recovery dello stato-tempo dal timestamp salvato.
- Stessa chiave di storage = salvezza (i dati si caricano) e trappola (cambio shape → migrazione idempotente).
- Bug ai confini tra moduli → grep dei call-site prima.

## Constitution Check (i 7 cardini come principi)
Comportamento identico · Retrocompat dati sacra · A fasi · Mappa-bussola · Traduzione 1:1 · Verifica a specchio · Migra-pensando-al-passo-dopo.
