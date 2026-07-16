# VISIONE — SideKick

> Direzione strategica del progetto. Si legge **dopo** `CONTESTO.md`. È un documento
> vivo: le decisioni aperte (§9) si chiudono man mano in `DECISIONI.md`.

## 1. Tesi
Il valore riutilizzabile dello sviluppo software con AI non è il **codice finale**
(quello si rigenera), ma il **processo** che l'ha prodotto: decisioni, vincoli, prompt
che hanno funzionato, loop di debug, l'ordine delle mosse. **SideKick condivide il
processo, non l'output.** Più persone condividono processi → nel tempo emergono i modi
più efficaci di costruire software.

Corollario di fondo: più l'AI scrive il codice, più l'asset durevole dell'umano si
sposta dal codice al **giudizio/metodo**. Una libreria di processi è una libreria di
giudizio.

**Modello di valore (chiarito 2026-06-04 con l'utente).** Il valore di un pacchetto NON è
"batte un agente a digiuno su un compito" (sui problemi standard non lo batte). È:
**allineamento** (segue il *tuo* modo), **accumulo** (una libreria che cresce) e
**auto-miglioramento** (ogni uso può *raffinare* il pacchetto — es. l'agente del test-2 ha
aggiunto i *centesimi interi* → quel miglioramento va riassorbito; nel tempo ogni feature
converge alla sua versione migliore). Anche le feature "da manuale" (il settlement) sono
**valide**: voci di catalogo che migliorano. **Framing:** un *package-manager di
feature-processi* — come npm/pip ma per **singole feature**, **non-tecnico** e
**AI-agnostico** (qualunque umano, qualunque AI). **Implicazione di design:** serve un
meccanismo di **curation/versioning** che riassorbe i miglioramenti (legato alla fitness
function: la versione migliore "sale").

**Stato della validazione (2026-06-10).** Loop provato su **7+ feature non-ovvie** (165 test
verdi sul banco) + **output reale** su un'app esterna vera (`rating-elo` integrato in un'app
scacchi React, build verde). Libreria: **10 pacchetti validati**, pubblici. Resta da provare
sui **processi grandi** (vedi `TEST_MIGRAZIONE_GRANDE.md`): ipotesi forte = **il valore del
pacchetto CRESCE con la dimensione del processo** — su una migrazione lunga la disciplina
non-ovvia (retrocompat dati, a fasi, comportamento identico) è proprio dove si fallisce,
quindi il pacchetto discrimina molto più che su una feature piccola/textbook. Dopo: **F3**
(preset/extension Spec Kit) → proporlo.

## 2. Il buco (vs GitHub e vs Spec Kit)
- **GitHub** condivide l'*esito*: codice + storia dei commit (il *cosa*). Non il
  *perché*, non i prompt vincenti, non i loop di debug.
- **GitHub Spec Kit** (lo standard emergente per lo "spec-driven development") fa
  scrivere *in avanti* il processo di **un** progetto: `constitution.md` → `spec.md` →
  `plan.md` → `tasks.md` → implementazione, come artefatti markdown letti dagli agenti
  AI. Ha **presets** ed **extensions** per personalizzare i template, ma **NON** ha: un
  registry/marketplace, né un modo per **distillare processi reali già vissuti** e
  riusarli/adattarli tra progetti e persone. La condivisione cross-repo è solo
  *discussa*, non spedita.

Il buco = **prendere processi reali e completati, smontarli, analizzarli, ricostruirli
in ricette astratte, taggate con l'esito, *forkabili* da altri.** È esattamente la tua
frase.

## 3. Cosa fa SideKick (la pipeline)
1. **Ingest** — legge un processo reale: transcript Claude Code (`*.jsonl`) + artefatti
   markdown (`_processo/` o `constitution/spec/plan/tasks`).
2. **Smonta / Analizza** — estrae la traiettoria: decisioni, prompt che hanno
   funzionato, diff, loop di debug, **esito**.
3. **Ricostruisce** — distilla in **ricette astratte** (niente nomi-file specifici):
   pattern, prompt-template generalizzato, contesto, esito, tag.
4. **Libreria** — organizza le ricette (tassonomia §5), pronte per essere **forkate** e
   **adattate dall'AI** a un progetto nuovo.
5. **Retrieval** — quando parti su un progetto nuovo, propone le ricette pertinenti.

## 4. Posizionamento vs Spec Kit — costruisci SOPRA, non CONTRO
Rendersi **compatibili con Spec Kit** (che "usano tutti") abbassa l'attrito d'adozione e
apre la porta a contribuire upstream / farsi notare. Il tuo METODO è già *quasi* Spec
Kit, fatto a mano:

| Livello | Spec Kit | Tuo METODO (poker) |
|---|---|---|
| Principi / meta-processo | `constitution.md` | `METODO.md` |
| Spec di feature | `spec.md` | `*_SPEC.md` |
| Piano di fase | `plan.md` | `*_PROMPT.md` |
| Task per l'AI | `tasks.md` | micro-step / commit |
| Mappa del codice | (supporting docs) | `POKER_MAP.md` |
| Log decisioni | (clarify) | `DECISIONI.md` |

**Strategia di integrazione:** SideKick **ingerisce ed emette artefatti Spec
Kit-nativi**. Una ricetta forkata da SideKick atterra dritta nel progetto Spec Kit di
chiunque (e potrebbe vivere come **extension** Spec Kit + il **registry/distillazione**
che a loro manca). È il "mi integro così tutti possono usare il mio".

**Il moat** non è il formato (è di Spec Kit): è il **motore di distillazione da
traiettorie reali + il segnale di esito.** Difficile, e fuori dalla loro roadmap core.

## 5. Tassonomia della libreria (la tua divisione)
- **Progettazione** — meta-processo e design (≈ `constitution` + `spec`/`plan`): come si
  imposta un tipo di app, principi, scelte d'architettura.
- **Pratiche** — feature di dominio già costruite (≈ il `_LIBRERIA_FEATURE/` del
  METODO): es. settlement, auth, bracket torneo.
- **Pronte-per-l'AI** — artefatti direttamente esecutivi (≈ `tasks` + prompt-template
  provati) da dare a un agente.

## 6. L'atomo: il "pacchetto di processo" forkabile
L'unità minima del prodotto. Spec Kit-nativo (markdown), abbastanza astratto da essere
adottato da un *altro* progetto, con: contesto/stack, pattern, prompt-template
generalizzato, casi limite, dipendenze, **esito**, tag, "come si adatta". **Definire e
validare questo atomo è il primo obiettivo concreto.**

## 7. Staging (ordine di costruzione)
- **F0 — sicurezza dati** ✅ fatto (backup transcript + retention estesa).
- **F1 — atomo + prova personale:** distillo il processo di `poker` in 1 pacchetto;
  **fork test** su un'idea di app diversa (chat pulita): riparte meglio? Se sì, il
  formato regge. *(Prossimo passo.)*
- **F2 — motore:** pipeline ripetibile (ingest → distilla → libreria) sulle altre
  traiettorie di poker.
- **F3 — distribuzione:** Spec Kit-compat (extension/preset) + eventuale registry;
  condivisione. (La parte "GitHub".)

## 8. Cosa NON è (scope)
- Non è un editor di codice né un agente che "fa tutto da solo a pulsante": l'autonomia
  totale è l'anello debole → build **guidato** dall'AI, non magico.
- Non è (ancora) community/piattaforma pubblica: è F3.
- **Nota da non dimenticare:** il `_processo/` *di SideKick* è la sua memoria **privata**
  di sviluppo. La libreria di ricette **condivisibili** è un **output separato** del
  prodotto — non confondere i due.

## 9. Domande aperte (da chiudere in DECISIONI.md)
1. **Fitness function** — cosa rende un processo "buono"/da promuovere? (meno giri di
   debug? funziona al primo colpo? tempo? leggibilità?) Senza un segnale di esito, la
   "convergenza all'ottimo" resta intuizione. **È il nodo centrale.**
2. **Distillazione** — secondo passaggio LLM, regole, o mix?
3. **Storage** — file nella cartella vs DB locale vs servizio.
4. **Scrubbing segreti** — regole automatiche *prima* di salvare qualunque cosa.
5. **Trigger retrieval** — a inizio sessione (hook) o su richiesta?
6. **Build-vs-extend timing** — quando agganciarsi a Spec Kit come extension vs restare
   standalone.

## 10. Idee parcheggiate
- **Dogfooding / "traccia fantasma":** instrumentare lo sviluppo *di SideKick stesso*
  con la cattura, così il progetto si auto-documenta. (Tua idea — da valutare dopo F1.)
