# CHANGELOG del metodo — la storia degli emendamenti della costituzione

> Una costituzione auto-emendante senza una storia degli emendamenti affermerebbe un'evoluzione
> senza prove. Una voce per emendamento, scritta a mano, la più recente per prima. Date dalla
> cronologia git di `COSTITUZIONE.md`; ogni versione è anche un tag git (`metodo-vX.Y`) dalla
> v1.5 in poi.

## v1.9.1 — 2026-07-25 (aggiornamento in giornata + propagazione completa)
- **Aggiornamento del master colto dal revisore di fedeltà** (passata multi-agente di
  chiarezza/inglese, 10 agenti): la riga del contratto dati `5h_windows` documentata nella v1.9
  era presente in SCHEMA.md e in questo changelog ma mancava dal "Contratto dati" di
  COSTITUZIONE.md e dal Principio XI del drop-in — aggiunta a entrambi; specchio risincronizzato.
- **Propagazione completata** (era in sospeso dalla v1.6): `CONSTITUTION.md` (EN) sincronizzato
  alla v1.9 sezione per sezione — corretto anche il suo banner di governance: dichiarava
  erroneamente di essere il master; **creato `FACTORY-PROCESS.md`** (versione EN di
  PROCESSO-FABBRICA.md); drop-in spec-kit riallineato a **1.9.1** (nuovi principi
  depersonalizzati XII–XVI, più la riga finestre-di-utilizzo del contratto dati nel
  Principio XI).
- Passata di inglese/chiarezza sui documenti pubblici (analisti fresh-eyes + madrelingua
  inglese + coerenza fattuale, poi 2 revisori Opus): cifra obsoleta ~170× della cache
  aggiornata a ~187× con note datate, corsa alle versioni del drop-in nel README sistemata,
  calchi ripuliti (dettagli nella cronologia git).
- **Correzioni post-audit, stesso giorno** (audit completo del repo
  `observatory/AUDIT-REPO-2026-07-25.md`, approvazione di Roberto): header di versione
  aggiunto a COSTITUZIONE/CONSTITUTION e CHANGELOG linkato dai README (AR-05); versione del
  drop-in riconciliata a **1.9.1** ovunque (AR-04); `versione-italiano/` rimossa dall'albero
  pubblico — `ITALIANO/` è l'unico specchio italiano, originali conservati nella cronologia
  git (decisione di Roberto su AR-02/03).

## v1.9 — 2026-07-25 (master + specchio risincronizzati)
- Nuova sezione **"La Fabbrica"** (generazione di massa con controllo qualità): playbook come
  unica fonte di verità, **validatore a script in crescita** (ogni difetto meccanizzabile
  trovato dal controllo qualità del modello diventa un controllo a script gratuito), verifica
  basata sull'esecuzione, modelli di controllo qualità per passata (correttezza sul modello
  alto; rubriche meccaniche su Sonnet con ~8% di verifica-ombra Opus), e una **procedura di
  ripresa sicura** con verdetti persistiti su file. Dettagli in
  `plugins/metodo/PROCESSO-FABBRICA.md` (adottata il 2026-07-20, indurita dopo l'incidente A-01
  del run WR3: la cache di ripresa a runtime misurata **best-effort** — 0/46 di riuso con
  prompt identici byte per byte e un journal completo — quindi sono i file, non la cache, i
  veri checkpoint; la diagnosi a caldo "risultati mancanti nel journal" è stata confutata
  dall'osservatorio sul journal reale).
- **Verifica-ombra generalizzata**: la verifica-ombra gira un modello DI DISTANZA dal baseline
  (sopra un baseline economico, sotto uno con un tetto — mai Fable). Misurata su 54 coppie
  (2026-07-24): le classi di difetto sono **complementari** (a livello di batch vs a livello di
  punto); i difetti meccanici (segnale posizionale) spettano ai validatori a script, non ai
  modelli.
- Contratto dati: `workflow.csv` guadagna una colonna **`5h_windows`** — il conteggio osservato
  con certezza delle finestre di 5 ore del piano consumate da un run, con il piano nominato
  (es. `~3 (Max 100 euro)`). Solo conteggi di blocchi di credito osservati, mai stime a token.
- Propagazione: specchio `~/.claude/CLAUDE.md` risincronizzato (era fermo alla v1.5); creati i
  tag `metodo-v1.6`…`metodo-v1.9`. Ancora in sospeso: `CONSTITUTION.md` (EN) e il riallineamento
  del drop-in spec-kit.

## v1.8 — 2026-07-19 (solo master — propagazione in sospeso)
- Nuova sezione **"Prima orchestra, poi delega (gli agenti non servono solo per gli audit)"**,
  richiesta da Roberto: l'ordine **ricerca → mini-spec → mio ok → esecuzione** è vincolante, e
  gli agenti vengono lanciati *dopo* che il piano esiste (un fan-out senza una spec parallelizza
  la direzione sbagliata); poi, per lavoro genuinamente divisibile, delega con il modello giusto
  per compito (Haiku meccanico / fix mirati+test su Sonnet / sintesi e giudizio delicato su
  Opus), restando single-agent per il lavoro lineare; e **almeno 2 revisori Opus indipendenti
  con lenti diverse** a fine di una fase grande, con i loro finding verificati prima di essere
  accettati.
- ⏳ **Non ancora propagato**: specchio, `CONSTITUTION.md`, drop-in spec-kit, tag `metodo-v1.8`
  (anche v1.6 e v1.7 ancora in sospeso).

## v1.7 — 2026-07-19 (solo master — propagazione in sospeso)
- Nuova sezione **"Standard minimi di OGNI app (dal primo build)"**, richiesta da Roberto dopo
  il test su telefono di WTB: (1) **versione build visibile in-app** (data + commit, valutata al
  bundling) in un punto standard tipo "Assistenza" — lezione: un bundle in cache (Expo Go/APK
  senza un dev server raggiungibile) impersona silenziosamente quello nuovo, quindi
  "l'app si aggiorna da sola" non va mai affermato; (2) **contatto assistenza sempre visibile**
  (nome + email di Roberto, cliccabile). Prima implementazione: Who's the Boss `app.config.js` +
  Profilo → Assistenza.
- ⏳ **Non ancora propagato** (per l'osservatorio): specchio `~/.claude/CLAUDE.md`,
  `CONSTITUTION.md`, `spec-kit/constitution.md`, tag git `metodo-v1.7` (anche v1.6 ancora in
  sospeso).

## v1.6 — 2026-07-17 (solo master — propagazione in sospeso)
- Nuova sezione **"Red team: agente interno (col codice) o chat esterna (cieca)?"**, nata da un
  confronto misurato (Poker_App R7.2 vs R7.3, loggato in `~/.claude/ESPERIMENTI.md`). Per
  rivedere il **nostro** design/codice, un agente interno con accesso al repo batte le chat
  esterne cieche: i finding arrivano **già verificati a `file:riga`** (la riverifica alla fonte
  è il vero costo di un red team esterno), e può **confutare** un sospetto leggendo il codice
  invece di indovinare. Le chat esterne mantengono solo due compiti: l'opinione non
  contaminata **prima di andare pubblici**, e la **meta-revisione del dossier** prima di
  lanciare il vero red team. All'agente interno va sempre data una calibrazione (scala del
  progetto, cosa è fuori scope), un tetto ai finding, e l'ordine di scartare da solo i rischi
  teorici — altrimenti produce la lista da enterprise.
- ⏳ **Non ancora propagato** (per l'osservatorio): `CONSTITUTION.md` (variante
  depersonalizzata), drop-in `spec-kit/constitution.md`, tag git `metodo-v1.6`.

## v1.5.1 — 2026-07-17 (solo drop-in Spec Kit)
- Drop-in depersonalizzato per davvero: rimossi i path di progetto `_processo/*` trapelati; le
  note di installazione spostate fuori dalla testa del file (quello slot appartiene al Sync
  Impact Report di Spec Kit); Governance chiarita per i fork (all'adozione, la copia
  dell'adottante diventa il master).
- Dopo lo studio a doppio run di Spec Kit, "Parentela" corretta in entrambe le costituzioni: il
  delta è l'auto-emendamento **proattivo** (Spec Kit già emenda su richiesta, con versioning e
  sync report).

## v1.5 — 2026-07-16 (tag `metodo-v1.5`)
- Governance ribaltata: il **file del repo è il master**, `~/.claude/CLAUDE.md` è uno specchio
  in sola lettura protetto da una regola deny sui permessi.
- Nuova sezione **contratto dati** (titoli chat `Progetto/Fase_N`, registrazioni in una riga di
  esperimento/decisione/workflow, uso token mai loggato a mano).
- Economia dell'handoff riscritta su dati misurati (letture cache ≈170× i token vivi; cambio ai
  milestone, ripresa invece di ripartire).
- Nuova sezione "Parentela con GitHub Spec Kit"; drop-in riallineato a 1.5.0 (aggiunti i
  principi VIII–XI).
- Correzioni fattuali 2026-07-16/17 dopo il red team esterno: **finestra di utilizzo** di 5 ore
  ≠ finestra di contesto; claim sul tokenizer di Sonnet 5 fontato in linea
  (anthropic.com/news/claude-sonnet-5); regola "Spotify" generalizzata ai leader di settore;
  glossario reso solo locale.

## (senza versione) — 2026-07-11
- Sezione glossario (termini di apprendimento personale) + ruolo dell'osservatorio SideKick
  esteso. *Registrato qui onestamente: questo emendamento è uscito senza un bump di versione.*

## v1.4 — 2026-07-03
- Disciplina Supabase/SQL: una cartella versionata sola per TUTTE le migration, inventario
  numerato come unica fonte di verità, "applicato" solo su conferma esplicita.

## v1.3 — 2026-07-03
- **Modello + effort per passo**: l'agente propone il modello/effort migliore per ogni passo,
  con una tabella di default fontata (dossier di ricerca con URL in `experiments/`).

## v1.2 — 2026-07-03
- Sei sezioni sincronizzate dall'uso sul campo su un build di app reale (audit multi-agente con
  verifica adversariale, esperimenti sui modelli/verifiche-ombra, ricerca-prima-di-scegliere,
  mappa del codice, rendicontazione del progresso, nota CI-dal-primo-giorno).

## v1.1 — 2026-06-12
- Nuovo principio: **sguardo esterno prima di esporsi** (dossier red-team cinico per chat AI
  fresche + verifica alla fonte le affermazioni dei revisori).

## v1.0 — 2026-06-11
- Costituzione iniziale: condotta permanente proattiva senza comandi (cattura idee,
  design-prima-del-codice, micro-commit, verifica-prima-di-dire-fatto, handoff,
  auto-emendamento, regola d'oro). Primo drop-in Spec Kit.
