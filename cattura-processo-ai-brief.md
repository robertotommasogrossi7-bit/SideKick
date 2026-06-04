# v1 — Tool di cattura del processo di sviluppo AI (istruzioni operative)

> Documento operativo per Claude Code. Code lavorerà in una **cartella vuota** (questo tool) e leggerà i dati da un **progetto già esistente** (l'app, ~30% completata), il cui percorso verrà fornito all'inizio.

## Pitch
Un layer sopra Claude Code che salva il *processo* di costruzione di un'app — decisioni, cambiamenti, loop di debug/test, esito — e lo trasforma in "ricette" riutilizzabili nei progetti futuri.

## Obiettivo
Il progetto attuale è già al ~30%, costruito interamente con Claude Code. La v1 ha due fasi:
1. **Recuperare** il processo già prodotto nei primi 30% (decisioni, prompt che hanno funzionato, metodologie) e strutturarlo.
2. **Catturare in automatico** il processo da qui in avanti.

Fine ultimo: riusare metodologie e decisioni di questo progetto nei prossimi, senza ricostruirle a memoria.

## Architettura: due progetti separati, NON si fondono
Punto chiave per non fare confusione: i due progetti non si uniscono.
- **Cartella A — l'app** (già iniziata, ~30%): si continua a costruirla normalmente, nella sua chat e nella sua cartella. Non cambia nulla.
- **Cartella B — questo tool** (vuota): qui vive la logica di cattura, backfill, strutturazione e retrieval.
- Legame unico: il tool **osserva l'app dall'esterno**. Ne legge i transcript e vi installa gli hook che scrivono la traiettoria. L'app non dipende dal tool.

Conseguenza pratica: se il tool è incompleto o rotto, **l'app procede uguale e non si perde nulla**, perché Claude Code salva i transcript da solo. Per questo lo Step 0 viene prima di tutto.

### Come il tool trova i dati dell'app
Claude Code salva i transcript di ogni progetto in `~/.claude/projects/<percorso-codificato>/`, dove il percorso assoluto dell'app diventa il nome della cartella sostituendo ogni `/` con `-`.
Esempio: app in `/Users/bob/dev/app` → transcript in `~/.claude/projects/-Users-bob-dev-app/*.jsonl`.
Dato il percorso dell'app, il tool ricava da sé la cartella dei transcript.

## Step 0 — Metti in sicurezza i dati (PRIMA DI TUTTO)
Questi tre passi proteggono il processo dei primi 30% **a prescindere dallo stato del tool**. Da eseguire per primi.

1. Trova e verifica i transcript dell'app (sostituisci il percorso codificato):
```bash
ls -la ~/.claude/projects/<percorso-codificato>/
```
2. Backup immediato:
```bash
mkdir -p ~/claude-trajectory-backup
cp ~/.claude/projects/<percorso-codificato>/*.jsonl ~/claude-trajectory-backup/
```
3. Estendi la retention. Default = 30 giorni, con cancellazione **silenziosa e definitiva** (niente cestino, niente recupero). In `~/.claude/settings.json`:
```json
{ "cleanupPeriodDays": 3650 }
```
**Mai `0`**: per un bug noto, `0` non conserva per sempre — impedisce del tutto il salvataggio dei transcript.

## Cattura: automatica, mai manuale
Non aprire una seconda chat ogni sera per "aggiornare": sarebbe un'altra incombenza, l'opposto dello scopo del tool. La cattura è passiva — gli hook scattano durante le normali sessioni sull'app e appendono alla traiettoria da soli.
- Prima di installare gli hook: i transcript automatici + retention estesa (Step 0) sono già la rete di sicurezza.
- Dopo gli hook: zero lavoro manuale di cattura.
- L'unica cosa manuale, **a lotti e non ogni giorno**: la distillazione (rivedere il grezzo e trasformarlo in ricette).

## Cosa cattura — la "traiettoria"
Per ogni sessione di build:
- Decisioni iniziali / pianificazione (cosa volevi, vincoli, scelte di architettura).
- Ogni prompt dell'utente e la risposta dell'agente.
- Ogni modifica al codice (diff) e il motivo.
- I cicli di debug/test: cosa si è rotto, cosa l'ha risolto, esito dei test.
- Risultato finale (funziona / non funziona, eventuali metriche).

## Come si aggancia a Claude Code (hook)
- **Transcript automatico**: ogni sessione è già salvata in JSONL in `~/.claude/projects/.../*.jsonl`, senza setup.
- **Hook sugli eventi**, per estrarre/strutturare in tempo reale:
  - `UserPromptSubmit` → logga ogni prompt.
  - `PostToolUse` → logga il diff dei file e l'output dei test.
  - `Stop` → logga l'esito di fine turno.
  - `PreCompact` → salva il transcript prima della compattazione del contesto.
- Un hook può lanciare uno script **oppure** fare una `POST` a un endpoint (utile se più avanti i dati vanno a un servizio/DB).

## Da traiettoria a "ricetta" (il cuore del lavoro)
Il transcript grezzo non è riutilizzabile per copia-incolla: è incollato al contesto di quel progetto (nomi file, architettura, turni precedenti). Il passo centrale è la **distillazione**: trasformarlo in una ricetta astratta. Schema indicativo:
```json
{
  "id": "...",
  "titolo": "Setup debug per app React Native",
  "contesto": "stack, tipo di progetto",
  "pattern": "descrizione astratta della tecnica (non i nomi-file specifici)",
  "prompt_template": "versione generalizzata del prompt che ha funzionato",
  "esito": "cosa ha prodotto / metriche",
  "tag": ["debug", "react-native", "test"]
}
```

## Mentre l'app è in corso: concentrati sulla strutturazione
Non serve aspettare l'output finale dell'app: il tool cattura il *percorso*, che sta avvenendo ora. Con l'app al 30% puoi già costruire e testare **tutto** il tool — backfill, parser, hook, distillazione, storage, retrieval. Le traiettorie incomplete sono comunque utili (catturano decisioni e pattern di debug); il campo `esito` si riempie man mano.

E la priorità è chiara: **il valore è la strutturazione, non la cattura.** Catturare è gratis (lo fa già Claude Code) e non è un vantaggio competitivo; l'ingegneria vera è trasformare il grezzo in ricette astratte e riutilizzabili. Lì va lo sforzo.

## Perché per te è un progetto di data engineering
È una pipeline, non "un altro tool AI":
- **Extract**: hook + transcript JSONL.
- **Transform**: parsing, scrubbing di chiavi/segreti, distillazione in ricette.
- **Load**: storage strutturato (PostgreSQL? file store?).
- **Retrieval**: embedding delle ricette + ricerca semantica per riproporle su progetti simili.

Per il portfolio / AWS Data Engineer vale più di una dashboard generica: tocca ELT, modellazione dati, embedding e retrieval.

## Scope della v1 — e cosa NON è
- **È**: recupero del lavoro già fatto + cattura + distillazione + retrieval *per te*.
- **Non è (ancora)**: condivisione, community, database pubblico, adattamento "a un altro utente". Quella è la v2 — prima si dimostra che il loop funziona per te.

## Decisioni aperte
1. Dove vive lo storage? (file nella cartella del tool vs DB locale vs servizio)
2. Distillazione: secondo passaggio LLM, regole, o un mix?
3. Scrubbing dei segreti: regole automatiche *prima* di salvare qualunque cosa.
4. Trigger del retrieval: a inizio sessione (hook `SessionStart`)? Su richiesta?

## Ordine di costruzione
1. **Step 0** (sopra): metti in sicurezza i transcript dell'app.
2. Un hook `PostToolUse` che appende `{prompt, diff, timestamp}` a `trajectory.jsonl`. Verifica solo che la cattura sia fluida.
3. Parser + backfill dei primi 30% dai transcript salvati.
4. Distillazione in ricette.
5. Storage + retrieval.
