# Feature Specification: Punteggio del Tressette

**Status**: distillato · tech-agnostic · validato con test

## User Scenarios & Testing
### User Story 1 — Punteggio di fine smazzata (P1)
**Given** le carte prese dai due lati + chi ha fatto l'ultima presa, **When** calcolo, **Then** ogni lato ha `floor(terzi/3)` + (1 se ha l'ultima presa).

### Edge Cases
- **Terzi avanzati si perdono**: 2 terzi → 0 punti (non 0,67).
- Ultima presa → +1 punto certo.

## Requirements
- **FR-001**: terzi per carta — asso 3; due/tre/figure 1; lisce 0.
- **FR-002**: punti del lato = **floor(somma terzi / 3)** (resto perso).
- **FR-003**: +1 punto a chi fa l'**ultima presa**.

### Key Entities
- **Carta**: `valore` (1..10), `seme`.

## Success Criteria
- **SC-001**: 3 assi = 9 terzi = **3 punti**.
- **SC-002**: due "due" = 2 terzi = **0 punti** (floor).
- **SC-003**: asso + 2 figure = 5 terzi = **1 punto**.
- **SC-004**: un lato prende tutto = 10 (carte) + 1 (ultima) = **11**.
