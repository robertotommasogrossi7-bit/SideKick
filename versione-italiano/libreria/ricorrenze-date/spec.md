# Feature Specification: Ricorrenze di date (tipo RRULE)

**Status**: distillato · tech-agnostic · validato con test

## User Scenarios & Testing
### User Story 1 — Ricorrenza settimanale (P1)
**Given** una data di partenza e un giorno della settimana, **When** chiedo le prossime N occorrenze, **Then** ottengo N date dello stesso giorno, a 7 giorni l'una dall'altra.

### User Story 2 — n-esimo giorno del mese (P1)
**Given** anno/mese/giorno-settimana/n, **When** calcolo, **Then** ottengo la data dell'n-esima occorrenza, oppure **null** se non esiste nel mese.

### Edge Cases
- Il **5° <giorno>** del mese spesso non esiste → `null`.
- Fuso orario → lavorare in **UTC**.

## Requirements
- **FR-001**: ricorrenza settimanale (count date, +7 giorni, dal giorno richiesto).
- **FR-002**: n-esimo giorno del mese con offset dal 1°; sforamento → `null`.
- **FR-003**: tutte le date in **UTC**.

### Key Entities
- `giornoSettimana`: 0=domenica … 6=sabato.

## Success Criteria
- **SC-001**: prossimi 4 venerdì → 4 date, tutte venerdì, +7 giorni.
- **SC-002**: 2° martedì → un martedì del mese, fra l'8 e il 14.
- **SC-003**: 5° giorno inesistente → `null`.
