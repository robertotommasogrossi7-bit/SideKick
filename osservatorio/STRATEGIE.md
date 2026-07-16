# STRATEGIE del metodo — costi e guadagni (registro onesto)

> **Cos'è**: ogni scelta di metodo/processo che stiamo testando, con **quanto ci costa** (token,
> misurati dove possibile) e **quanto ci ha reso** (benefici osservati, concreti). Stessa onestà
> di FINDINGS.md: N piccoli = indizi; dove il costo non è misurabile lo diciamo, non lo inventiamo.
> Lo aggiorna la chat-osservatorio al rituale. Ultima revisione: **2026-07-16**.

## Strategie MISURATE (costo e beneficio con numeri)

### 1. Audit multi-agente (verifica pesante a fine fase)
- **Costo misurato**: 2,6M token (poker, 67 agenti) + 1,1M (progetto-15, 21 agenti).
- **Guadagno osservato**: poker → 45 finding veri di cui **3 ALTA che rompevano flussi vivi**
  (crash su azioni store, montepremi sbagliato, funzione inclusione rotta); progetto-15 →
  causa radice di un **bug bloccante** + **3 falle critiche** sulla promessa centrale del
  prodotto, trovate **prima degli utenti**.
- **Efficienza appresa**: le regole (dedup prima, verifica solo ALTA/MEDIA, cacce mirate)
  hanno tagliato il **−60%** dal primo al secondo audit.
- **Verdetto**: indizio forte che paga a fine fase grande. N=2.

### 2. Verifica-ombra cross-modello (dentro gli audit)
- **Costo misurato**: ~39k token per 1 agente duplicato (≈8% delle verifiche).
- **Guadagno osservato**: 1 finding su 2 declassato con **4 errori fattuali scoperti** dentro
  il finding → evitato lavoro di bonifica inutile. Pattern emerso: sui finding di **codice**
  i modelli si equivalgono; su quelli di **processo/config** il modello alto falsifica meglio.
- **Verdetto**: costo minimo, dati utili. N=2 — continuare.

### 3. Cambio chat / cache (economia del contesto)
- **Costo misurato**: cache riletta ≈**170×** i token vivi (2,8 miliardi vs 16,5M) — è la
  voce più grande di tutte; il resume dell'audit interrotto ha riusato il **100%** dei passi
  completati (zero rilavorazione).
- **Verdetto**: regola in costituzione v1.5 (handoff ai milestone, resume quando possibile).

### 4. Processo IMPOSTO a un modello forte (pacchetti-processo) — strategia SCARTATA
- **Costo misurato**: braccio col pacchetto ~**2×** token del braccio cieco (probe 2026-06),
  esito uguale o peggiore; in un caso il pacchetto ha remato **contro** l'intento.
- **Verdetto**: negativo → il metodo *propone*, non impone. (N=1 per cella: indizi convergenti.)

## Strategie con GUADAGNO documentato ma COSTO non ancora separabile

### 5. Red team (interno + esterno) prima di esporsi
- **Guadagno osservato (episodi concreti)**:
  - FINDINGS di SideKick: i revisori esterni hanno dato **rigore 3/10** («vende un rigore che
    non ha») → riscrittura onesta **prima** della pubblicazione: figuraccia pubblica evitata.
  - Contributi OSS: una **PR duplicata evitata** prima di aprirla.
  - poker R7.0: red team (mio + esterno "data engineer") → **schema v2** (UUID, movimenti
    append-only, ospiti, fallback) **prima** di scrivere l'SQL: rifare lo schema dopo sarebbe
    costato una migrazione.
  - progetto-15 e poker R7.2: altri 2 red team a verbale (REDTEAM su sync).
- **Costo**: quasi zero sul piano — le chat esterne girano **fuori** (Claude/ChatGPT base);
  il costo interno è la preparazione del dossier, oggi **non separabile** nei transcript
  (era dentro le chat di fase). **Da ora**: le sessioni di red team si titolano
  `Progetto/RedTeam_N`, così il costo diventa misurabile.
- **Verdetto onesto**: benefici concreti e ripetuti (N≈5 episodi) a costo di piano quasi
  nullo → probabilmente il miglior rapporto guadagno/costo del metodo. Il guadagno in token
  "risparmiati" non è quantificabile (non sappiamo cosa sarebbe successo senza), quindi non
  lo quantifichiamo.

### 6. Ricerca prima di scegliere (feature e UX)
- **Guadagno osservato (episodio concreto)**: R7.2b — l'aggancio al boot toccava il gate auth;
  la ricerca (docs zustand, PowerSync, articoli) ha fatto **buttare il design custom** per le
  API native `setOptions`+`rehydrate`: meno codice nostro da mantenere, meno bug possibili.
  Le scelte del sync sono uscite **allineate riga-per-riga** allo standard (verificato
  dall'audit con fonti).
- **Costo**: dentro le chat di fase, non separabile. **Da ora**: `Progetto/Ricerca_X` quando
  la ricerca è una sessione a sé.
- **Verdetto**: aneddoti positivi, mai misurato sistematicamente. Da tenere d'occhio.

### 7. Modello + effort per passo
- **Guadagno osservato**: blocco R6-B (6 fasi di fix su **Sonnet high** invece di Opus):
  tutte verdi al primo colpo, zero regressioni sui 9 scenari soldi.
- **Costo**: zero (è una scelta, non un'attività). Il risparmio esatto Sonnet-vs-Opus non è
  quantificabile senza il controfattuale; il tokenizer di Sonnet è più verboso (trappola nota).
- **Verdetto**: indizio buono; la tabella resta basata sulla ricerca esterna finché i nostri
  numeri non bastano.

## Strategie ANCORA SENZA DATI (dichiarato)
- **Ripetizioni stesso-modello** (N run sullo stesso compito): 0 esperimenti.
- **Micro-commit, CI, mappa del codice, inventario SQL**: benefici qualitativi evidenti
  (1 regressione YAML documentata e risolta; inventario nato dopo un quasi-pasticcio SQL),
  ma nessuna misura — e probabilmente non ne varrà mai la pena: costano ~zero.
- **Costituzione auto-emendante** (la tesi di fondo di SideKick): resta **non testata**
  sull'esito che conta (aiuta l'umano?). Vedi FINDINGS.md — serve lo studio con soggetti.

## Come misuriamo da qui in avanti (contratto dati v1.5)
Titoli di sessione dedicati (`Progetto/RedTeam_N`, `Progetto/Ricerca_X`, `Progetto/Audit_prep`)
→ il consumo per strategia esce da solo dal contatore · workflow.csv per gli agenti cloud ·
colonna "Esito osservato" nei DECISIONI · 1 riga in ESPERIMENTI.md per ogni esperimento.
