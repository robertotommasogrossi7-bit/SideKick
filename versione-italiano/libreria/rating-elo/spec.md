# Feature Specification: Rating Elo

**Status**: distillato · tech-agnostic · validato con test

## User Scenarios & Testing
### User Story 1 — Aggiornare il rating dopo una partita (P1)
**Given** i rating dei due sfidanti e il risultato, **When** calcolo, **Then** ottengo i nuovi rating: chi batte un più forte guadagna di più.

### Edge Cases
- Pareggio tra pari → nessun cambio.
- Upset (debole batte forte) → scambio ampio.

## Requirements
- **FR-001**: `atteso_A = 1 / (1 + 10^((rating_B − rating_A)/400))`.
- **FR-002**: `nuovo_A = rating_A + K·(risultato_A − atteso_A)` (K configurabile, default 32).
- **FR-003**: `risultato_A` ∈ {1, 0.5, 0}; `risultato_B = 1 − risultato_A`.

### Key Entities
- **Risultato**: 1 vittoria · 0.5 pareggio · 0 sconfitta.

## Success Criteria
- **SC-001**: parità, A vince (K=32) → +16 / −16.
- **SC-002**: parità, pareggio → invariato.
- **SC-003**: upset 1400 batte 1600 → ~+24 / −24.
- **SC-004**: favorito 1600 batte 1400 → guadagno piccolo (~+8).
