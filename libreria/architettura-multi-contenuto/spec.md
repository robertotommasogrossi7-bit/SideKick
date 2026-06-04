# Feature Specification: Estendere un'app mono-scopo a multi-contenuto

**Status**: distillato (riusabile) · tech-agnostic · tipo *architettura*

## User Scenarios & Testing

### User Story 1 — Aggiungere tipi senza rompere l'esistente (P1)
Come proprietario dell'app, voglio aggiungere nuovi tipi di contenuto senza toccare quello che già funziona.
**Acceptance**
1. **Given** un'app mono-tipo funzionante, **When** la estendo a multi-tipo, **Then** il tipo originale resta intatto (stessi test verdi) e i nuovi tipi riusano la stessa macchina (sessioni/partite/statistiche).

### User Story 2 — Default e gruppi sullo stesso flusso (P1)
Come utente, voglio usare l'app "da solo coi miei amici" o "in un gruppo vero" con lo **stesso** flusso.
**Acceptance**
1. **Given** due ambiti (default personale, gruppi), **When** li implemento, **Then** il "personale" è un'**istanza speciale** del gruppo (riusa tutto, nessun codice doppio); cambia solo la presentazione e, in futuro, i permessi.

### User Story 3 — Tipo ricco + tipi generici (P2)
Come utente, voglio che il dominio "ricco" (con la sua schermata) conviva con tipi "generici" su una schermata comune.
**Acceptance**
1. **Given** un tipo ricco e N tipi generici, **When** apro un tipo, **Then** il ricco mostra la sua schermata dedicata e i generici una schermata comune (sessione → partite → vincitori/esito).

### User Story 4 — Viste condivise tra contesti (P2)
Come manutentore, voglio che classifica e storico siano gli stessi ovunque.
**Acceptance**
1. **Given** più contesti (default, gruppo, ricco-in-default, ricco-in-gruppo), **When** modifico classifica/storico, **Then** la modifica vale in **tutti** i contesti (componente unico).

### Edge Cases
- Identità della persona cross-contesto **pre-backend** → best-effort **per nome** (+ avviso UI).
- "Sei tu" (chi sei) **calcolato**, non salvato → robusto a login demo / nomi uguali.
- Stati diversi tra tipo ricco e generici → mapping esplicito, non condiviso a forza.

## Requirements
- **FR-001**: il tipo originale MUST restare invariato (modello + logica); può cambiare solo *dove vive* (route).
- **FR-002**: lo scope default MUST essere modellato come **istanza speciale** dello scope gruppo (es. `personale: true`).
- **FR-003**: i tipi generici MUST condividere una schermata/flusso comune; il tipo ricco tiene la sua.
- **FR-004**: la migrazione dati MUST essere **idempotente**; i dati del tipo ricco mai toccati.
- **FR-005**: classifica e storico MUST essere **componenti condivisi** tra tutti i contesti.

### Key Entities
- **Scope**: `default` (istanza speciale) | `gruppo`.
- **Tipo**: `ricco` (speciale) | `generico`.
- **Gerarchia**: `Scope → Tipo → Sessione → Partita`.

## Success Criteria
- **SC-001**: il tipo originale passa i suoi test **invariato**.
- **SC-002**: zero codice duplicato tra default e gruppo (stessa macchina).
- **SC-003**: aggiungere un tipo generico = **zero modifiche** al motore (solo dati di catalogo).
- **SC-004**: migrazione idempotente (rieseguibile senza effetti).

## Assumptions
- Esiste già un dominio "ricco" funzionante da preservare.
- Persistenza locale (o equivalente); identità utenti esatta solo post-backend.
