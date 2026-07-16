# Feature Specification: Migrazione vanilla → framework a componenti

**Status**: distillato (riusabile) · tech-agnostic · tipo *metodologia*

## User Scenarios & Testing

### User Story 1 — Non perdere i dati salvati (P1)
Come utente esistente, dopo la migrazione voglio ritrovare i miei dati come prima.
**Acceptance**
1. **Given** un'app con dati in localStorage (chiave + shape note), **When** la migro al framework, **Then** la nuova app legge **la stessa chiave e la stessa shape** e i dati vecchi si caricano intatti.
2. **Given** un cambio di shape necessario, **When** parte l'app, **Then** una migrazione **idempotente** converte i dati senza perdita, a ogni avvio.

### User Story 2 — Comportamento identico (P1)
Come utente, voglio che l'app migrata faccia *esattamente* ciò che faceva prima.
**Acceptance**
1. **Given** la app vanilla, **When** migro, **Then** nessuna feature nuova né redesign: stesso comportamento (verificabile a specchio).

### User Story 3 — Migrazione incrementale (P2)
Come sviluppatore, voglio migrare a fasi indipendenti, non in un big-bang.
**Acceptance**
1. **Given** il progetto, **When** migro, **Then** ogni fase è piccola, su un branch da `main`, testabile da sola e mergeabile; il merge è solo alla fine.

### Edge Cases
- Lo store persiste troppo → persistere **solo i dati** (un `partialize`), non lo stato UI.
- Stato derivato dal tempo (timer) → recovery dal **timestamp salvato** dopo un refresh.
- Cambio shape storage → migrazione **idempotente** obbligatoria.
- Bug ai confini tra moduli → **grep dei call-site** prima di toccare una funzione.

## Requirements
- **FR-001**: la app migrata MUST avere comportamento identico (niente feature nuove durante la migrazione).
- **FR-002**: lo storage MUST restare invariato (stessa chiave e shape; migrazioni preservate ed eseguite all'avvio).
- **FR-003**: la migrazione MUST procedere a fasi indipendentemente testabili, branch da `main`.
- **FR-004**: ogni unità vanilla MUST tradursi 1:1 (funzione→hook/componente, pura→pura, render-HTML→componente).
- **FR-005**: lo stato globale MUST stare nello store con persistenza; persistere solo i dati.
- **FR-006**: imporre vincoli pro-futuro (es. niente stili inline; nomi di dominio invariati).

### Key Entities
- **Store persistito**: chiave + shape (invariate); `partialize` (solo dati).
- **Migrazione dati**: funzione idempotente all'avvio.
- **Mappa del codice**: doc-bussola (dati + funzioni + chi-chiama-chi).

## Success Criteria
- **SC-001**: parità verificata **a specchio** (vecchia vs nuova, per ogni fase).
- **SC-002**: dati vecchi caricati intatti (migrazioni idempotenti).
- **SC-003**: build/lint/tipi puliti e test verdi a fine di ogni fase.
- **SC-004**: ogni fase mergeabile da sola (nessun big-bang).

## Assumptions
- L'app esistente persiste su localStorage (o equivalente).
- Il target è un framework a componenti.
