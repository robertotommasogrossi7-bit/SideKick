# Feature Specification: Settlement equo tra partecipanti

**Status**: distillato (riusabile) · tech-agnostic

## User Scenarios & Testing

### User Story 1 — Saldare col minimo dei passaggi (P1)
Come organizzatore, voglio la lista minima di trasferimenti di contante per azzerare i conti.
**Acceptance**
1. **Given** N partecipanti con `dovuto`/`versato`/`valore`, **When** chiudo, **Then** ottengo trasferimenti `{from,to,importo}` la cui somma azzera tutti i saldi.
2. **Given** debiti reciproci A↔B, **When** calcolo, **Then** compaiono compensati (solo la differenza).

### User Story 2 — Auto-compensazione (P1)
Come partecipante con un debito ma con una vincita, non devo "pagare me stesso".
**Acceptance**
1. **Given** `mancante>0` e `valore>0` per la stessa persona, **When** calcolo, **Then** `min(mancante, valore)` si elide prima dell'abbinamento; quella persona non è insieme `from` e `to`.

### User Story 3 — Correzione manuale (P2)
Come organizzatore, voglio modificare i trasferimenti e vedere se i conti tornano.
**Acceptance**
1. **Given** una lista calcolata, **When** modifico/aggiungo/elimino un trasferimento, **Then** la quadratura si ricalcola e mi avvisa se non torna — **senza bloccare**.

### Edge Cases
- < 2 partecipanti → bloccato.
- `somma(netti) ≠ 0` (conteggio umano errato) → segnala, non blocca.
- Eccedenza (`versato > dovuto`) → restituita dal fondo.
- Pareggio con debito (`mancante = valore`) → si annulla, esce dai trasferimenti.

## Requirements
- **FR-001**: il sistema MUST richiedere ≥ 2 partecipanti.
- **FR-002**: il sistema MUST distinguere il **fondo comune** (ridistribuzione passiva) dai **trasferimenti** di contante reale.
- **FR-003**: il sistema MUST restituire l'eccedenza dal fondo.
- **FR-004**: il sistema MUST permettere l'override manuale di ogni trasferimento.
- **FR-005**: il check di quadratura MUST avvisare ma NON bloccare.

### Key Entities
- **Partecipante**: `dovuto`, `versato`, `valore`; derivati `mancante = max(0, dovuto−versato)`, `eccedenza = max(0, versato−dovuto)`, `netto = valore − dovuto`.
- **Trasferimento**: `from`, `to`, `importo`.

## Success Criteria
- **SC-001**: `somma(trasferimenti) = somma(mancante')` esattamente.
- **SC-002**: nessun trasferimento "verso sé stessi".
- **SC-003**: numero trasferimenti ≤ numero debitori (greedy).
- **SC-004**: calcoli in **interi (centesimi)** con distribuzione del resto → zero errori di virgola. *(miglioramento assorbito, v0.2)*

## Assumptions
- `valore` è inserito da un umano (può non quadrare: vedi FR-005).
- Importi a 2 decimali.
