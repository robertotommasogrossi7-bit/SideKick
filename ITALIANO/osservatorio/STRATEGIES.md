# STRATEGIE DEL METODO — costi e guadagni (registro onesto)

> **Cos'è**: ogni scelta di metodo/processo che stiamo testando, con **quanto ci costa**
> (token, misurati dove possibile) e **quanto ha ripagato** (benefici osservati, concreti).
> Stessa onestà di FINDINGS.md: N piccolo = indizi; dove il costo non è misurabile lo diciamo,
> non ce lo inventiamo. Aggiornato dalla chat-osservatorio al rituale. Ultima revisione:
> **2026-08-01** (la data in testa si muove nello stesso commit che tocca il corpo).

## Strategie MISURATE (costo e beneficio con numeri)

### 1. Audit multi-agente (verifica pesante a fine fase)
- **Costo misurato**: 2,6M token (poker, 67 agenti) + 1,1M (progetto-15, 21 agenti).
- **Guadagno osservato**: poker → 45 finding reali di cui **3 ALTI che rompevano flussi live**
  (crash sulle azioni dello store, montepremi sbagliato, funzione di inclusione rotta);
  progetto-15 → causa radice di un **bug bloccante** + **3 falle critiche** sulla promessa
  centrale del prodotto, trovate **prima degli utenti**.
- **Efficienza appresa**: con il secondo audit (regole: dedup prima, verifica solo su
  ALTO/MEDIO, cacce mirate) il costo è sceso da 2,6M a 1,1M — ⚠️ su un progetto più piccolo:
  un'indicazione, non un confronto pulito.
- **Anti-circolarità** (la conferma non è solo "agenti che verificano agenti"): dei 45 finding
  confermati su poker, **oltre 30 sono poi stati corretti e validati da test verdi e
  typecheck** (blocchi R6-B1→B6, +46 test nuovi); il resto è assegnato a fasi future nel
  registro.
- **Verdetto**: forte indizio che ripaghi a fine di una fase grande. N=2.

### 2. Verifica-ombra cross-modello (dentro audit e QC di massa)
- **Costo misurato**: ~39k token per 1 agente duplicato (≈8% delle verifiche); nella run
  fabbrica WR3, ~16 agenti-ombra Sonnet dentro una run da 11,0M token.
- **Guadagno osservato**: 1 finding su 2 declassato con **4 errori di fatto scoperti**
  dentro il finding → lavoro di correzione sprecato evitato. Pattern sugli audit: sui finding
  di **codice** i modelli sono equivalenti; sui finding di **processo/configurazione** il
  modello più alto falsifica meglio. Nuovo (2026-07-24, 54 coppie, **direzione invertita** —
  ombra Sonnet sotto una base Opus): 87% di accordo, e i disaccordi mostrano **classi di
  difetto complementari** — il modello alto vede difetti a livello di batch, l'ombra economica
  scopre gli scivoloni puntuali (3/4 confermati in arbitrato, es. un a-capo di troppo, un
  conteggio righe sbagliato).
- **Verdetto**: costo minimo, utile in ENTRAMBE le direzioni → il metodo v1.9 lo generalizza
  (ombra = un modello di distanza dalla base; i difetti meccanici vanno ai validatori a
  script). N=4 esperimenti — continuare.

### 3. Cambio chat / cache (economia del contesto)
- **Costo misurato** (al conteggio del 2026-07-25 — il rapporto vivo sta nella dashboard
  generata): la cache in lettura costa ≈**187×** i token vivi (3,5 miliardi contro ~18,8M) —
  la voce di costo più grande di tutte; riprendere l'audit interrotto ha riusato il **100%**
  dei passi completati (zero rilavorazione in quell'occasione — vedi l'avvertenza sotto).
- **⚠️ Nuova avvertenza (2026-07-24, run WR3): la cache di ripresa del WORKFLOW è a
  best-effort, non garantita** — una ripresa ha riusato 32/48 chiavi, la successiva **0/46**
  nonostante prompt identici byte per byte e un journal completo (spreco: ~0,59M token vivi +
  ~39M token cache, 46 agenti rifatti). L'economia della ripresa-chat resta valida, le riprese
  di workflow ora richiedono la procedura sicura (verdetti persistiti su file + stop-loss di
  2 minuti) in `plugins/metodo/PROCESSO-FABBRICA.md`.
- **Verdetto**: regola nella costituzione v1.5 (passaggio di testimone ai milestone, ripresa
  quando possibile), irrobustita per i workflow in v1.9.

### 4. Processo IMPOSTO a un modello forte (pacchetti di processo) — strategia SCARTATA
- **Costo misurato**: il braccio col pacchetto ha usato ~**2×** i token del braccio cieco
  (sonda 2026-06), esito uguale o peggiore; in un caso il pacchetto ha remato **contro**
  l'intento.
- **Verdetto**: negativo → il metodo *propone*, non impone. (N=1 per cella: indizi
  convergenti.)

## Strategie con GUADAGNO documentato ma costo non ancora separabile

### 5. Red team (interno + esterno) prima di esporsi
- **Guadagno osservato (episodi concreti)**:
  - FINDINGS di SideKick: i revisori esterni hanno dato **rigore 3/10** ("vende un rigore che
    non ha") → riscrittura onesta **prima** della pubblicazione: imbarazzo pubblico evitato.
  - Contributi OSS: una **PR duplicata evitata** prima di aprirla.
  - poker R7.0: red team (mio + esterno "data engineer") → **schema v2** (UUID, movimenti
    append-only, ospiti, fallback) **prima** di scrivere l'SQL: rifare lo schema dopo sarebbe
    costato una migration.
  - progetto-15 e poker R7.2: altri 2 red team a verbale (REDTEAM su sync).
- **Costo**: quasi zero sul piano — le chat esterne girano **fuori** (Claude/ChatGPT base);
  il costo interno di preparare il dossier oggi **non è separabile** nei transcript (era dentro
  le chat di fase). **Da ora in poi**: le sessioni di red team si titolano `Progetto/RedTeam_N`,
  così il costo diventa misurabile.
- **Verdetto onesto**: benefici concreti e ripetuti (N≈5 episodi) a costo di piano quasi zero →
  probabilmente il miglior rapporto guadagno/costo del metodo. Il guadagno in token "risparmiati"
  non è quantificabile (non sappiamo cosa sarebbe successo senza), quindi non lo quantifichiamo.

### 6. Ricerca prima di scegliere (feature e UX)
- **Guadagno osservato (episodio concreto)**: R7.2b — il boot hook toccava il gate di auth;
  la ricerca (doc zustand, PowerSync, articoli) ha portato ad **abbandonare il design custom**
  per le API native `setOptions`+`rehydrate`: meno codice nostro da mantenere, meno bug
  possibili. Le scelte di sync sono uscite **allineate riga per riga** allo standard (verificato
  dall'audit con fonti).
- **Costo**: dentro le chat di fase, non separabile. **Da ora in poi**: `Progetto/Ricerca_X`
  quando la ricerca è una sessione a sé.
- **Verdetto**: aneddoti positivi, mai misurati sistematicamente. Da tenere d'occhio.

### 7. Modello + effort per passo
- **Guadagno osservato**: blocco R6-B (6 fasi di fix su **Sonnet high** invece di Opus): tutto
  verde al primo tentativo, zero regressioni sui 9 scenari di soldi.
- **Costo**: zero (è una scelta, non un'attività). Il risparmio esatto Sonnet-contro-Opus non è
  quantificabile senza il controfattuale; trappola nota: il tokenizer aggiornato di Sonnet 5
  produce 1,0–1,35× token a parità di testo (fonte ufficiale, ri-verificata 2026-07-16).
- **Verdetto**: buon indizio; la tabella resta basata sulla ricerca esterna finché i nostri
  numeri non bastano.

### 8. La Fabbrica (generazione di massa con QC totale)
- **Costo misurato**: 2 run grandi — ponte-v2 (2026-07-20): 34 agenti / 5,8M token; WR3
  (2026-07-24/25): 229 agenti / 11,0M token ≈ **~3 finestre di utilizzo da cinque ore** del
  piano Max da 100 euro (osservato via blocchi di credito — prima riga della nuova colonna
  `5h_windows`).
- **Guadagno osservato**: 447+555 elementi di studio prodotti con soluzioni eseguite per
  davvero (188/188 su WR3); la QC ha trovato famiglie di difetti reali (tell posizionale
  sull'intero corpus, vero/falso sbilanciato, soluzioni non autosufficienti) **prima
  dell'uso**; il validatore a script ha tenuto i bug di integrazione a 0 (contro 1 nella run
  pre-validatore).
- **Efficienza appresa (applicata al processo)**: controlli meccanici PRIMA della QC a
  modello; rubriche meccaniche su Sonnet con ~8% di ombra Opus; ricontrollo post-fix solo
  sopra una soglia di cambiamento; ripresa sicura con verdetti persistiti su file.
- **Run 3 = la prova dell'ottimizzazione (fabbrica libri, 2026-07-26)**: 78 agenti / 9,9M
  token / **$131,50 misurati** per 628 domande nuove + 355 riparate + 194 rotazioni
  posizionali + aggiornamento glossario — contro i 229 agenti / 11,0M / **$137,79 misurati**
  di WR3 per 555 domande nuove (incidente incluso). L'irrobustimento del 2026-07-25 è stato
  applicato per intero: esiti su file (nessun incidente di resume), validatore cresciuto con
  `--files-strict`, ricontrollo solo sopra soglia (11 gruppi). Ha anche FUSO le passate QC
  (oltre quanto il metodo aveva approvato) e l'ombra 8% ha beccato il costo della fusione:
  5/69 near-miss deboli, tutti sulla stessa dimensione → ipotesi per il run 2: ombra mirata
  sui near-miss o passata near-miss dedicata economica. Avvertenza onesta: libro/dominio
  diversi, non è un A/B pulito — ma agenti −66%, costo per domanda nuova −16%, incidenti
  zero è una direzione consistente.
- **Run 4 = fabbrica SQL pratiche (2026-07-30/31, livello MEDIO-ALTO)**: ~85 agenti / **~10M
  token STIMATI** (run cloud, niente transcript locali — a differenza dei run 2-3 questo non
  ha un costo misurato) per 523 domande nuove, 298 delle quali **verificate per esecuzione**
  (esecuzioni reali python+sqlite3 su un dataset deterministico costruito apposta, expected
  congelati dai risultati veri) + una bonifica FASE 0 del corpus + 5 check permanenti nuovi
  nel validatore. Cosa ha tenuto: gli esiti su file hanno superato **2 tagli di finestra del
  piano con 0 lotti persi** (di nuovo l'irrobustimento v1.9); l'ombra **mirata** near-miss
  (42 campioni, applicata l'ipotesi del run 3) ha trovato 8 problemi veri, incluso uno in
  cui l'ombra economica aveva *promosso* distrattori difettosi che il modello alto ha
  smontato — il pattern classi-complementari di §2, nella direzione attesa. Neo onesto: il
  run è **partito** con 16 QC Opus paralleli — contro la lezione di consolidamento del
  run 3 — ed è stato corretto a metà corsa su richiesta di Roberto (QC consolidato 2 Opus +
  4 Sonnet, seconda passata QC ~85% più economica): l'ottimizzazione è stata recuperata a
  mano, non pianificata. Costo grezzo per domanda nuova ~19k token (stima) contro i ~15,8k
  misurati del run 3 — ma questo run ha comprato anche la verifica per esecuzione, un
  dataset nuovo e la crescita del validatore che al run libri non servivano: i numeri non
  sono confrontabili alla pari.
- **Verdetto**: ripaga per contenuti che Roberto userà per mesi; il costo è dominato dalle
  letture di cache (~225M su WR3) → le leve sopra puntano esattamente lì. Il processo
  irrobustito ha reso in modo misurabile già al run successivo; il run 4 mostra che le
  lezioni reggono all'impatto ma solo se il PIANO del run parte da esse (la squadra QC non
  lo faceva, ed è stata corretta in corsa). N=4.

## Strategie ANCORA SENZA DATI (dichiarate)
- **Ripetizioni stesso-modello** (N run sullo stesso task): 0 esperimenti.
- **Micro-commit, CI, mappa del codice, inventario SQL**: benefici qualitativi evidenti
  (1 regressione YAML documentata e risolta; inventario nato dopo un quasi-disastro SQL),
  ma nessuna misura — e probabilmente non varrà mai la pena misurarli: costano ~zero.
- **Costituzione auto-emendante** (tesi centrale di SideKick): resta **non testata** sull'esito
  che conta (aiuta l'essere umano?). Vedi FINDINGS.md — serve lo studio con soggetti.

## Come misuriamo da qui in avanti (contratto dati v1.5)
Titoli di sessione dedicati (`Progetto/RedTeam_N`, `Progetto/Ricerca_X`, `Progetto/Audit_prep`)
→ il consumo per strategia esce dal contatore da solo · workflow.csv per gli agenti cloud ·
colonna "Esito osservato" in DECISIONI · 1 riga in ESPERIMENTI.md per ogni esperimento.
