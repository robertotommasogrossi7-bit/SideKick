# I "processi" catturati aiutano lo sviluppo assistito da AI? Ho provato a misurarlo — e non sono riuscito a costruire un test equo (ancora)

Molti strumenti AI-dev poggiano su un'assunzione mai testata: che dare all'AI un processo catturato —
una spec, una ricetta, un "pacchetto" distillato da una build precedente — **migliori il risultato**.
Ho provato a testare questa assunzione sul mio progetto. Questo è un resoconto onesto di cosa ho
eseguito, cosa può e non può dimostrare, e cosa servirebbe per un test vero.

**Il riassunto onesto, subito:**

- Quello che ho eseguito è una manciata di **probe piccole e single-shot** (N=1 per condizione). Sono
  **aneddoti con numeri attaccati, non misurazioni.** Gli LLM sono stocastici; senza 20-30 run
  per braccio e statistiche di dispersione, una differenza "72 vs 50 turni" non dimostra nulla da sola.
- Detto questo, ogni probe è andata nella stessa direzione: **un modello forte *senza* il processo
  catturato ha eguagliato o battuto il braccio che lo aveva**, e il braccio con-processo ha
  consumato costantemente più token. In una probe il processo ha attivamente sviato da ciò che
  l'utente voleva.
- Queste probe **non possono rispondere alla domanda che conta**, perché testano il soggetto
  sbagliato: un'*AI esperta*, mentre il beneficiario plausibile dell'impalcatura-processo è
  l'*umano* che fa le domande sbagliate. Quell'ipotesi — quella vera — **resta non testata.**
- Una prima versione di questo resoconto affermava "l'abbiamo misurato". L'ho fatto **rivedere
  adversarialmente da modelli AI indipendenti** impersonando ingegneri senior scettici; il loro
  verdetto convergente (rigore ≈ 3/10, *"vende un livello di rigore che non ha"*) ha portato a
  questa riscrittura. Il log completo della revisione è pubblico in questo repo.

## Cosa ho eseguito (probe single-shot — da leggere come aneddoti)

Ogni riga è **un run per braccio**, stesso task, bracci isolati (il braccio "alla cieca" non poteva
leggere il pacchetto; un primo tentativo contaminato è stato rifatto). Costo misurato dai transcript
di Claude Code.

| Probe | Con pacchetto | Alla cieca | Cosa è successo |
|---|---|---|---|
| Migrazione Vanilla→React, app budget | 72 turni, 4.9M in-tok, dati ✅ | 50 turni, 2.2M, dati ✅ | La cieca ha preservato i dati salvati senza aiuto; il pacchetto è costato ~2× in questo run |
| Migrazione, app abitudini | 132 turni, 9.1M, **dati ❌** | 62 turni, 3.6M, dati ✅ | Il braccio col pacchetto ha seguito "usa uno store persist" e ha rotto il caricamento dei dati vecchi; la cieca ha fatto giusto |
| Regola di streaming su misura, spec completa fornita | 13 turni → 11/11 test nascosti, 5000/5000 casuali | — | Una spec chiara è bastata |
| Stessa regola, solo 6 esempi (nessuna spec) | 17 turni → 11/11, 5000/5000 | — | Il modello ha **ri-derivato** una regola non ovvia (watermark globali, merge retroattivi) a +30% di costo |
| Richiesta vaga in stile umano ("modernizzalo, rendilo più bello") | 94 turni, dati ✅, giudicato peggiore | 85 turni, dati ✅, giudicato migliore | Il pacchetto ha imposto "niente redesign" contro l'intento della richiesta. **Attenzione: giudizio umano singolo, non cieco** |

(Una probe precedente su un algoritmo di conguaglio da manuale aveva la stessa forma: la cieca ha
eguagliato o battuto il pacchetto.)

## Perché queste probe non possono rispondere alla domanda vera

1. **N=1 per cella.** La sola varianza run-a-run potrebbe spiegare i gap di costo. Fatale per
   qualunque affermazione generale.
2. **Soggetto sbagliato.** Il braccio "alla cieca" è un'AI esperta che si fa da sola le domande
   giuste. L'utente plausibile dello strumento è un umano che non lo fa. Ho testato l'anello forte
   e ho tratto conclusioni su quello debole — è un gap che le parole non colmano.
3. **Giudice singolo, non cieco** sull'unica probe che mostra un danno attivo (la richiesta vaga).
   Nessuna rubrica, nessun secondo valutatore.
4. **La selezione dei task è strutturalmente distorta.** Qualunque cosa abbia un oracolo obiettivo
   pulito è, per costruzione, derivabile/verificabile — esattamente il regime in cui un modello
   forte non ha bisogno di aiuto. Le mie probe erano truccate per perdere prima ancora di iniziare;
   l'ho capito solo dopo.
5. **Confondimento.** Il fallimento dell'app abitudini mostra che *quel pacchetto* portava *una
   cattiva istruzione* per *quel contesto* — non separa "catturare il processo fa male" da "quel
   pacchetto aveva un bug". Un braccio con pacchetto corretto non è mai stato eseguito.

## Cosa difenderei ancora (debolmente, come intuizioni informate)

- Per i task che un modello forte già conosce o può derivare — la maggior parte del lavoro
  standard CRUD/migrazione/algoritmi — la conoscenza di processo impacchettata è **overhead nel
  migliore dei casi**. (Coerente in tutte le probe; coerente anche con quanto riportano già gli
  utenti LLM esperti.)
- Un processo forkato **porta con sé i vincoli della sua origine** e può entrare in conflitto con
  l'intento di un nuovo utente. (Un solo esempio, ma meccanicamente ovvio una volta visto.)
- **Il costo (token/turni) è una dimensione di risultato reale** che quasi nessuno riporta. "Ha
  fatto giusto ma a 2× la spesa" dovrebbe contare.

## L'ipotesi che resta non testata

**L'impalcatura di processo aiuta l'*umano* — quello che fa domande sbagliate, nell'ordine
sbagliato, e non sempre riconosce una risposta sbagliata — e aiuta di più a livello entry e sui
progetti nuovi.** Ogni probe che ho eseguito è muta su questo. *Non è confutata*; semplicemente non
è mai stata testata qui.

## Cosa servirebbe per un test equo

- **20-30+ run per braccio**, distribuzioni, varianza, effect size — non run singoli.
- **Soggetti umani** (entry-level), con/senza il metodo, su task con parti delicate (auth, account,
  soldi), risultati valutati da **giudici ciechi con una rubrica** (perdita dati, falle di sicurezza
  via checklist, tempo, costo) — non dall'autore.
- **Task non derivabili**: domini proprietari o preoccupazioni trasversali, non migrazioni da
  manuale.
- **Un braccio con pacchetto corretto**, per separare la struttura del processo dal contenuto del
  pacchetto.
- **Misure longitudinali**: bug, regressioni, tempo di onboarding dopo giorni/settimane, non solo
  alla consegna.

**Stato: progettato, non eseguito.** Al momento mi mancano soggetti di test. Se vuoi partecipare a
un piccolo studio con/senza, apri una issue su questo repo.

## Cosa sopravvive a questo esercizio

- **Due strumenti di valutazione riusabili**: un **misuratore di costo** su transcript
  (`experiments/cost-meter.mjs`) e un **valutatore a test nascosti a prova di leak**
  (`experiments/streaming/oracle/`) per verificare se un artefatto di processo aiuta, senza
  rivelare le risposte.
- **Il log completo e pubblico dell'esperimento** — incluso il primo tentativo contaminato, i
  risultati negativi e la revisione esterna adversariale (`versione-italiano/_processo/`, log
  grezzi in italiano).
- **Una proposta, chiaramente etichettata come non testata:** una costituzione di metodo di lavoro
  proattiva e auto-emendante (`plugins/metodo/`), anche in formato drop-in per Spec Kit
  (`plugins/metodo/spec-kit/constitution.md`, da posizionare in
  `.specify/memory/constitution.md`). La costituzione di Spec Kit è attivamente applicata e ha già
  un meccanismo di emendamento (versionamento semantico, sync impact report); ciò che la nostra
  aggiunge è solo che l'emendamento è *iniziato dall'agente* — proposto senza sollecitazione.
  Ancora nessuna prova che questo migliori qualcosa — è lo studio umano di cui sopra. *(Corretto
  2026-07-17: una versione precedente definiva la loro costituzione "letta una volta e passiva" —
  sbagliato; ogni comando core di Spec Kit la carica e `/analyze` tratta i conflitti come
  automaticamente CRITICI.)*

## Relazione con GitHub Spec Kit

[GitHub Spec Kit](https://github.com/github/spec-kit) ritualizza lo sviluppo spec-first — il che è
plausibilmente il motivo della sua adozione: fa da impalcatura al processo *dell'umano*, non alla
capacità del modello. Questa lettura è coerente con le mie probe, ma su questa evidenza è
un'interpretazione, non un risultato. (Nota meccanica per chi porta contenuti di metodo su Spec Kit:
una costituzione vive in *memory* (`.specify/memory/`) e sopravvive a `init`, quindi un drop-in di
costituzione funziona sempre; da Spec Kit v0.12.15 (2026-07-14) un *preset* può inoltre seminare la
costituzione testualmente all'init. *Corretto 2026-07-17 — la nota precedente diceva "non un
preset", vero fino alla v0.12.14 e poi smentito a monte; l'abbiamo scoperto durante uno studio a
doppio run del loro repo.*)

---

*Parte di [SideKick](https://github.com/robertotommasogrossi7-bit/SideKick). Log dell'esperimento:
`versione-italiano/_processo/DECISIONI.md` · verdetti della revisione esterna:
`versione-italiano/_processo/VALUTAZIONE-ESTERNA.md` ·
le probe stesse: `experiments/`.*
