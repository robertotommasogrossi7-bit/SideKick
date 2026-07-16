# Implementation Plan: Estendere un'app mono-scopo a multi-contenuto

## Technical Context (istanza originale, non vincolo)
**Stack**: React + TypeScript + Zustand (persist), localStorage, routing per scope/tipo.
In un altro stack: cambia framework/store, **tieni i cardini**.

## Approccio che ha funzionato — a fasi
1. **Modello dati + statistiche** (NO UI): tipi generici (`Gioco/Sessione/Partita`), estensione del modello esistente (+ flag scope), **funzioni pure** di statistica con test. Migrazione idempotente (pura, agganciata dopo).
2. **Shell + routing + scope default**: navigazione, "barra tipo" che ri-tema, ambito default; il tipo ricco **spostato** sotto la sua route (logica invariata).
3. **Schermata comune del tipo generico**: crea/avvia sessione, partite, esiti, storico.
4. **Aggregazioni**: classifiche per-tipo + globale filtrabile, componenti condivisi.
Ogni fase: branch, micro-commit, test, review prima del merge.

## Esito
M1-M4 in produzione, **57 test verdi**, build pulita, tipo ricco (poker) intatto e migrazioni idempotenti.

## 🧠 Le decisioni non-ovvie (il valore)
- **"Personale = gruppo speciale"**: invece di un secondo flusso, una *lega speciale* `personale:true` → riuso totale. *Questa è la mossa che un agente da zero non fa.*
- **"Sei tu" calcolato, non salvato**: niente flag da corrompere; robusto a login demo e nomi uguali.
- **Componenti condivisi** per classifica/storico: nasce da un fallimento ("ogni cosa sta da 4 parti") → un componente, quattro contesti.
- **Identità cross-contesto best-effort per nome** (pre-backend) con avviso: si rimanda l'esattezza a quando ci sono utenti veri.

## Constitution Check (i cardini come principi)
Default = istanza speciale del gruppo · Tipo ricco + tipi generici · Estensione retrocompat idempotente · Componenti condivisi · A fasi.
