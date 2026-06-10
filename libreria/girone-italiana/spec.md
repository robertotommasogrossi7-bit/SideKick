# Feature Specification: Girone all'italiana (round-robin)

**Status**: distillato · tech-agnostic · validato con test

## User Scenarios & Testing
### User Story 1 — Calendario completo (P1)
**Given** N squadre, **When** genero il girone, **Then** ottengo N−1 giornate (N pari) in cui ognuno incontra tutti gli altri esattamente una volta.

### User Story 2 — Numero dispari (P1)
**Given** N dispari, **When** genero, **Then** ogni giornata una squadra **riposa** (avversario nullo).

### Edge Cases
- N < 2 → errore.

## Requirements
- **FR-001**: metodo del cerchio (prima fissa, le altre ruotano) → nessuna coppia ripetuta.
- **FR-002**: N dispari → fantasma (null) → un riposo per giornata.

### Key Entities
- **Incontro**: `casa`, `ospite` (numero squadra o `null` = riposo).

## Success Criteria
- **SC-001**: 4 squadre → 3 giornate, 6 coppie (= C(4,2)), nessuna ripetizione.
- **SC-002**: 5 squadre → 5 giornate, 1 riposo per giornata, 10 coppie.
