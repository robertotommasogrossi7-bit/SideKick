# Feature Specification: Punteggio della Briscola

**Status**: distillato · tech-agnostic · validato con test

## User Scenarios & Testing
### User Story 1 — Punteggio di fine mano (P1)
**Given** le carte prese dai due lati, **When** calcolo, **Then** ogni lato ha la somma dei valori; vince chi supera 60.

### Edge Cases
- 60-60 → **pareggio**.

## Requirements
- **FR-001**: sommare i valori carta (asso 11, tre 10, re 4, cavallo 3, fante 2; lisce 0).
- **FR-002**: vincitore = chi **supera** 60; parità = pareggio.

### Key Entities
- **Carta**: `valore` (1..10: 1=asso, 8=fante, 9=cavallo, 10=re), `seme`.

## Success Criteria
- **SC-001**: asso+tre+re+cavallo+fante = **30**.
- **SC-002**: carte lisce = 0; mazzo intero = **120**.
- **SC-003**: chi supera 60 vince; 60-60 pareggio.
