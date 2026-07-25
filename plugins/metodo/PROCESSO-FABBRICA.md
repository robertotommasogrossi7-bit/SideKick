# La Fabbrica — processo multi-agente per lavori grandi e ripetibili

> **Stato**: adottato da Roberto il 2026-07-20 (chat `Studio-Ponte/Design_1`), dopo il giro
> "ponte-v2" sul progetto Studio: 34 agenti, ~4,1M token, 425 elementi generati + 167
> aggiornati, QC totale. Secondo run 2026-07-24/25 (fabbrica Python WR3: 229 agenti, 555
> domande, ~3 finestre-5h del piano Max 100 euro): lezioni A-01..A-06 incorporate qui sotto.
> Collegato alla COSTITUZIONE (v1.9, voce «La Fabbrica») dal 2026-07-25.

## Quando usarla

Operazioni **grandi e parallelizzabili** dove la singola unità di lavoro non richiede
ragionamento profondo ma il volume sì, e la qualità è verificabile pezzo per pezzo:
generare centinaia di domande/contenuti, **tradurre tutto in un'altra lingua**, etichettare,
migrare formati, riscritture di massa. NON per coding lineare (lì il singolo agente forte
vince — resta valida la regola della costituzione).

## La struttura (INVARIANTE a ogni livello di potenza)

1. **Playbook prima degli agenti** — un file unico fonte di verità (cosa leggere, dove
   scrivere, schema dei campi, regole di qualità, esempi calibrati fissi). Ogni agente lo
   legge come primo atto. (Es.: `Studio/inbox/PIANO-DOMANDE.md`.)
2. **Regole meccaniche, non a istinto** — tutto ciò che può diventare procedura va scritto
   come procedura calcolabile con esempi fissi (es. il tier 0-100 in 2 passi): così anche i
   modelli piccoli danno lo stesso risultato dei grandi.
3. **Validatore-script obbligatorio, e CRESCE a ogni run** — uno script (es. `valida.py`) che
   ogni produttore esegue sul proprio output prima di consegnare. Misurato: v1 senza validatore
   = 1 bug di integrazione tra agenti; v2 con validatore = 0. Regola di crescita: ogni difetto
   trovato dal QC a modello che si può meccanizzare (posizione della risposta corretta,
   bilancio Vero/Falso, esecuzione delle soluzioni) **diventa un check dello script**, che gira
   PRIMA del QC a modello — i controlli meccanici non si pagano a modello. (Run WR3: il tell
   posizionale era al 100% su 10 lotti su 10; un check gratuito lo fermava alla generazione.)
4. **Produttori paralleli, file separati** — ogni agente scrive SOLO i propri file;
   i file condivisi (manifest, registri) hanno **un solo scrittore**: l'assemblatore finale.
5. **Verifica per ESECUZIONE** — dove il contenuto è eseguibile, si esegue davvero
   (python, sqlite3), non si rilegge soltanto. Trova errori che la rilettura non vede
   (es. un traceback messo in stdout, un "fix" che non era rotto).
6. **QC multi-dimensione, modello per passata** — la passata di **correttezza** (codice/dato
   reale, ri-esecuzione degli esempi, stile) va sul modello alto con checklist esplicita; le
   passate a **rubrica meccanica** (tier/argomento, ricalcolo di regole scritte) vanno su
   **Sonnet con ombra Opus ~8%** (misurato WR3: 87% di concordanza sulla rubrica; l'ombra fa
   da guardia). Copertura totale o a campione a seconda del livello (v. sotto).
   **Ricontrollo post-fix solo sopra soglia** (>20% delle domande toccate, o correzioni di
   logica e non di forma): sotto soglia basta il validatore-script. (WR3: 16 ricontrolli
   Opus, ~12M di cache — circa metà evitabile.)
7. **Dimensione "niente per scontato"** — un revisore dedicato NON cerca errori ma **buchi**:
   prerequisiti usati dal corpus e mai spiegati da zero. I buchi diventano subito lavoro
   generato (loop di completezza).
8. **Assemblaggio finale unico** + report numerico (totali per categoria, problemi residui).
9. **Resume, mai ripartire — ma con la procedura sicura** (sezione sotto). Le interruzioni
   (limiti di sessione, crash) si riprendono; la cache del runtime però è **best-effort, non
   garantita**: misurato 2026-07-20 riuso 30/34 gratis, ma nel run WR3 (2026-07-24) il 2°
   resume ha riusato **0/46** — 46 agenti rifatti (30 Opus) con prompt identici byte-per-byte
   e journal completo. Il checkpoint vero sono i FILE, non la cache.

## Livelli di potenza (stessa struttura, modelli diversi)

| Livello | Produttori | Verifica-esecuzione | QC | Assemblaggio | Quando usarlo |
|---|---|---|---|---|---|
| **MASSIMA** | Sonnet medium | Sonnet | correttezza: **Opus high, copertura TOTALE** · rubriche meccaniche (tier/argomento): **Sonnet + ombra Opus ~8%** + dimensione "scontato" | Sonnet low | contenuti che Roberto userà per mesi (es. le domande di studio) |
| **MEDIA** | Sonnet low / Haiku | Sonnet | Opus a campione ~20% + totale solo sui pezzi critici | Haiku | volumi grandi a rischio medio (es. tradurre le domande in un'altra lingua) |
| **LEGGERA** | Haiku | Haiku (smoke test) | Sonnet a campione | Haiku | trasformazioni meccaniche facilmente reversibili |

**Regola ferrea**: si può scendere di livello sui MODELLI, mai sotto il necessario di
STRUTTURA — playbook, validatore-script, un-solo-scrittore e verifica-per-esecuzione non si
tolgono a nessun livello. "Qualche agente in meno va bene, ma non meno del necessario."

## Resume: procedura sicura (dall'incidente A-01 del run WR3, 2026-07-24/25)

1. **Esiti su file, sempre** (la difesa vera): produttori e QC scrivono il proprio esito anche
   su un file per lotto (es. `qc/<lotto>.json`), e il loro prompt include: *"se il file esiste
   ed è valido, verificalo e restituiscilo SENZA rifare il lavoro"*. Così qualunque
   rifacimento — per cache persa o crash — costa pochi token invece di una fase intera.
2. **Journal = stato, non garanzia**: prima di ogni resume ispeziona `journal.jsonl` (result
   vs started) per sapere cosa risulta completato — ma un journal completo NON assicura il
   riuso: nell'incidente A-01 i result c'erano tutti e la cache non ha agganciato nessuna
   chiave (derivazione delle chiavi non content-addressed nel runtime).
3. **Stop-loss al rilancio**: nei primi 2 minuti guarda /workflows — i passi completati devono
   tornare ISTANTANEI dalla cache; se agenti di fasi già chiuse partono live, **ferma subito**
   il run e chiudi con pochi agenti mirati. Nel run WR3 il mancato stop-loss è costato ~0,59M
   token vivi + ~39M di cache riletta (46 agenti rifatti, 30 Opus).

## Regola "regia minima" per il modello di punta (Roberto, 2026-07-20)

Quando il modello migliore disponibile **consuma troppo piano** (oggi: Fable sul piano Max,
che "ciuccia" la finestra di utilizzo), va usato SOLO per: impostare gli agenti con le
istruzioni giuste, controllare i risultati, decidere. TUTTO il lavoro esecutivo — ricerche,
generazione, codice, QC — va agli agenti su modelli sostenibili (Sonnet/Haiku/Opus mirato).
La regola vale per Fable **finché resta usabile ma costoso**, e in generale per ogni futuro
modello di punta che sarà il migliore ma consumerà troppo: punta di piramide = regia,
manovalanza = flotta. (Si riallinea alla costituzione: «Fable, poco e bene».)

## Note operative

- Orchestrazione dalla chat (anche Fable: il grosso dei token è degli agenti, la chat fa da
  regia); il costo vero sta nei produttori+QC → è lì che si sceglie il livello.
- I limiti di sessione allungano la DURATA misurata, non il costo: annotare i buchi orari
  nella riga di `observatory/usage/workflow.csv` (l'orologio del workflow continua a correre).
- Nella stessa riga annota anche, **quando è certo** (conteggio dei blocchi-crediti osservato),
  quante **finestre-5h** del piano ha consumato il run, col piano di paragone — colonna
  `5h_windows`, es. `~3 (Max 100 euro)`. Mai stimarlo dai token: solo blocchi visti davvero.
- Le richieste di permesso che Roberto vede durante i run (script python one-liner, dump,
  validazioni) sono i controlli meccanici del processo: materiale perfetto per la sezione
  shell dell'app di studio (idea registrata in `Studio/IDEE.md`).

## Lezioni dal run WR3 (registro anomalie A-01..A-06, 2026-07-24/25)

- **A-01 resume che rifà lavoro finito** → procedura sicura qui sopra. La diagnosi a caldo
  ("journal senza result") è stata **smentita** dall'osservatorio sul journal vero: i result
  c'erano tutti; il 2° resume non ha agganciato nessuna chiave di cache (0/46, con 30/32
  prompt identici byte-per-byte). Morale: fidarsi dei file, non della cache del runtime.
- **A-02 tell posizionale** (risposta corretta sempre allo stesso indice, 10/10 lotti teoria)
  → check posizionale nel validatore. I difetti **di lotto** si trovano con la scansione
  meccanica, non pagando modelli.
- **A-03 Vero/Falso sbilanciati** (8/10 "Vero" in un lotto) → check di bilancio nel validatore.
- **A-04 soluzioni non autocontenute** (29/32 senza import/dati dello starter: in-app ok, ma
  fuori standard) → flag `--esegui` del validatore: le soluzioni si eseguono DAVVERO,
  stdout confrontato con `expected`.
- **A-05 file spuri nell'area di lavoro** → l'inbox della fabbrica si tiene pulita; file non
  tracciati e non nostri si segnalano a Roberto, non si toccano né si cancellano.
- **A-06 base della piramide sottile** (poche domande facili nonostante il volume) → il piano
  di generazione dichiara la **distribuzione tier attesa** e il QC la verifica contro il
  piano, non a occhio.
