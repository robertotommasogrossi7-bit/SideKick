# Feature Specification: Bracket a eliminazione diretta

**Status**: distillato · tech-agnostic · validato con test

## User Scenarios & Testing
### User Story 1 — Tabellone del primo turno (P1)
**Given** il numero di giocatori (con teste di serie 1..N), **When** genero il bracket, **Then** ottengo gli accoppiamenti del primo turno con seeding standard.

### User Story 2 — Numeri non potenza di 2 (P1)
**Given** N non potenza di 2, **When** genero, **Then** il bracket sale alla potenza di 2 superiore e i **bye** vanno alle teste di serie più alte.

### Edge Cases
- N < 2 → errore.
- 5°+ slot inesistenti → BYE.

## Requirements
- **FR-001**: snake seeding (le teste alte si incontrano tardi).
- **FR-002**: per N non potenza di 2, bye alle teste più alte.

### Key Entities
- **Match**: `a`, `b` (numero di seed, oppure `null` = BYE).

## Success Criteria
- **SC-001**: 4 → `1v4, 2v3`.
- **SC-002**: 8 → `1v8, 4v5, 2v7, 3v6`.
- **SC-003**: 6 → bracket da 8, bye alle teste 1 e 2.
