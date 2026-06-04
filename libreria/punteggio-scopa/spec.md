# Feature Specification: Punteggio della Scopa (classica)

**Status**: distillato (riusabile) · tech-agnostic · **validato con test**

## User Scenarios & Testing

### User Story 1 — Punteggio di fine mano (P1)
Come app, voglio assegnare i punti di una mano di scopa ai due lati.
**Acceptance**
1. **Given** le carte prese dai due lati (+ le scope fatte), **When** calcolo, **Then** ogni lato riceve: carte, denari, primiera (se le vince), settebello (se ce l'ha), +1 per scopa.

### User Story 2 — Pareggio (P1)
**Acceptance**
1. **Given** due lati con lo stesso numero di carte (o di denari, o stessa primiera), **When** calcolo, **Then** **nessuno** prende quel punto.

### Edge Cases
- Pareggio su carte/denari/primiera → punto a nessuno.
- Settebello: punto **certo** a chi ha il 7 di denari.
- Scope: +1 ciascuna, sempre.

## Requirements
- **FR-001**: assegnare **carte** al lato con più carte prese (pareggio → nessuno).
- **FR-002**: assegnare **denari** al lato con più carte di denari (pareggio → nessuno).
- **FR-003**: assegnare **settebello** a chi prende il 7 di denari.
- **FR-004**: assegnare **primiera** al lato con somma primiera più alta (pareggio → nessuno).
- **FR-005**: sommare **+1 per ogni scopa**.

### Key Entities
- **Carta**: `valore` (1..10: 1=asso, 8=fante, 9=cavallo, 10=re), `seme` (denari/coppe/bastoni/spade).
- **Tabella primiera**: `7→21, 6→18, 5→15, 4→14, 3→13, 2→12, 1→16, 8/9/10→10`.

## Success Criteria (esempi-test, verdi su un'app reale)
- **SC-001**: lato con più carte + denari + settebello + primiera, 0 scope → **totale 4**; l'altro **0**.
- **SC-002**: carte 5-5 e denari 2-2 → entrambi **false** su carte e denari.
- **SC-003**: quattro 7 (primiera 84) battono quattro 6 (72) → primiera al primo.
- **SC-004**: 3 scope → +3 nel totale.

## Assumptions
- Mazzo da 40 carte napoletane; partita a 2 lati (giocatori o squadre).
