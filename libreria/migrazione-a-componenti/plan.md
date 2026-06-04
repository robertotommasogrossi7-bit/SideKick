# Plan — il playbook a fasi (+ esito e gotcha)

> Spec Kit-shaped, da un build **completato**: il template delle fasi, i gotcha reali,
> l'esito, e lo stack originale come *istanza*.

## Playbook a fasi (template — adatta i confini al tuo dominio)
Dall'**fondamenta** alla **UI**, ognuna testabile:
1. **Fondamenta**: scaffolding, config strict dei tipi, **tipi/modello dati** (dalla
   mappa), **funzioni pure** (calcoli/format) tradotte 1:1, **migrazioni dati**, **store con
   persistenza sulla chiave esistente**. *Test: l'app legge i dati vecchi.*
2. **Auth + navigazione + schermate "indice"** (liste/home).
3. **Layout + viste di sola lettura** (storico, classifiche, dettagli).
4. **Viste di setup/creazione.**
5. **Il cuore "live"/interattivo** (la parte con più stato: hook dedicati, timer, ecc.).
6. **Chiusura/flussi finali + build di produzione + verifica end-to-end.**

Ogni fase: 3-6 commit logici, **push dopo ogni commit** (se finisci i token non perdi
nulla), branch da `main`, **mai merge in `main` dalla chat che implementa**.

## Esito (perché ha funzionato)
~3500 righe / 16 moduli JS → React+TS, mergiato in `main`, **48 test verdi, build pulita**,
verificato nel browser con **dati vecchi intatti e migrazioni idempotenti**. Ha poi
**abilitato** nuove feature senza riscritture: segno che la struttura era giusta.

## 🧰 I gotcha che insegnano
- **Lo store persiste troppo.** Con la persistenza, salva *solo i dati* (un `partialize`),
  non lo stato UI temporaneo — altrimenti "congeli" UI vecchia nel localStorage.
- **Recovery dopo refresh** per lo stato derivato dal tempo (es. timer): ricalcola dal
  **timestamp salvato**, non da un contatore in memoria.
- **Stessa chiave di storage = trappola e salvezza.** Salvezza perché i dati si caricano da
  soli; trappola se cambi la shape → serve la migrazione **idempotente** a ogni avvio.
- **I confini tra moduli** sono dove nascono i bug: una funzione è spesso chiamata da file
  che non stai guardando → **grep dei call-site prima** di toccarla.

## Stack originale (un'istanza, non un vincolo)
Vite + React + TypeScript (strict) + Zustand (middleware `persist`) + React Router v6.
Mappa del codice = un doc dedicato (qui `POKER_MAP.md`) come bussola di ogni fase. In un
altro stack: cambia framework/store, **tieni le regole** (parità, retrocompat, fasi, mappa,
verifica a specchio).
