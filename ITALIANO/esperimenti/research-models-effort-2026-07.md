> Originale inglese: `../../experiments/research-models-effort-2026-07.md` (questo file ne è la
> traduzione).

# Ricerca - modelli, effort, ultracode (2026-07-03)

> **Provenienza**: ricerca multi-agente (4 ricercatori Sonnet su angolazioni diverse + sintesi
> Opus, ~689k token, fonti citate inline con la qualità del dato dichiarata). Commissionata dal
> progetto poker/who's-the-boss per scegliere modello+effort per fase; le REGOLE derivate sono
> nel metodo (COSTITUZIONE, sez. "Modello e effort giusti per OGNI passo").
> **Per l'osservatorio di SideKick**: da rivedere quando escono nuovi modelli o compaiono dati
> indipendenti migliori (l'Aider leaderboard non copriva ancora Opus 4.8/Sonnet 5; SWE-bench
> Verified è saturo).

# Opus 4.8 vs Sonnet 5 + livelli di effort + ultracode — verdetto per il tuo lavoro

**Premessa onesta sulla qualità dei dati.** Opus 4.8 e Sonnet 5 sono modelli molto recenti
(annunciati giugno 2026): i benchmark ufficiali (SWE-bench Verified) sono quasi **saturi** e
vanno presi con cautela. Esistono leaderboard indipendenti con N ampio ma **in disaccordo tra
loro** sui numeri assoluti (vedi sotto). Su **effort** e **ultracode** i dati numerici isolati
sono scarsi: c'è una buona documentazione qualitativa ufficiale, ma quasi nessun benchmark
pubblico che quantifichi "quanto rende ogni singolo livello". Lo segnalo caso per caso.

---

## 1. Opus 4.8 vs Sonnet 5 per il tuo lavoro — verdetto coi numeri

**Verdetto: Sonnet 5 per (a) la bonifica dei bug, Opus 4.8 per (b) la sync delicata.** Il
divario è reale ma modesto; conta di più *dove* sbagliare costa caro.

**Il divario di qualità (dati che concordano):**
- SWE-bench Verified: **Opus 4.8 88,6% vs Sonnet 5 85,2%** → divario ~3,4 punti. Fonte:
  `https://llm-stats.com/benchmarks/swe-bench-verified` (leaderboard indipendente, N=103) e
  `https://www.anthropic.com/news/claude-opus-4-8` (ufficiale). *Qualità: benchmark ufficiale +
  leaderboard indipendente, ma il test è quasi saturo → il divario "vero" sul lavoro reale è
  probabilmente più piccolo di questo.*
- SWE-bench **Pro** (più difficile, meno saturo, N=731 pubblico, costruito da Scale AI, non
  Anthropic): **Opus 4.8 69,2% vs Sonnet 5 63,2%** → divario ~6 punti. Fonti:
  `https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro` (dataset indipendente) + numeri dalla
  system card via `https://www.marktechpost.com/2026/06/30/...`. *Qualità: il dataset è
  indipendente e con N ampio, ma i punteggi sono auto-riportati da Anthropic → coerenti tra
  fonti, non una verifica indipendente.*
- Intelligence Index (Artificial Analysis, decine di modelli): **Opus 4.8 = 61,4 vs Sonnet 5 =
  53** → divario ~8 punti. Fonte:
  `https://artificialanalysis.ai/articles/claude-opus-4-8-analysis-and-benchmarks`. *Qualità:
  leaderboard indipendente con N ampio — è il segnale più chiaro a favore di Opus.*
- Vals Index (indipendente, N=31): **Opus 4.8 70,36% vs Sonnet 5 68,61%** → divario di soli
  ~1,75 punti. Fonte: `https://www.vals.ai/models`. *Qualità: leaderboard indipendente, non
  Anthropic.*

**Nota di onestà: le leaderboard indipendenti si contraddicono tra loro.** Il divario "vero"
oscilla tra ~1,75 (Vals) e ~8 punti (Artificial Analysis) a seconda di come pesano i task. Non
c'è un numero unico affidabile. Aider Polyglot — che sarebbe stato ottimo — **non è aggiornato**
per questi modelli (fermo a Opus 4 / Sonnet 4, inizio 2025):
`https://aider.chat/docs/leaderboards/`. Non utilizzabile.

**Anomalia rilevante per te (lavori da CLI):** su **Terminal-Bench 2.1**, **Sonnet 5 batte
Opus 4.8** (80,4% vs 74,6%). Fonte: `https://www.marktechpost.com/2026/06/30/...`. *Qualità: da
verificare — riportato da una fonte secondaria, non l'ho trovato confermato direttamente sulla
system card ufficiale. Trattalo come un indizio, non un fatto.* Se si conferma, è un argomento
in più per Sonnet 5 sul lavoro (a).

**Il dato economico controintuitivo (molto importante per il tuo budget di 5h):**
- Prezzi ufficiali: **Opus 4.8 $5/$25 per MTok, Sonnet 5 $3/$15** ($2/$10 in promo fino al
  31/08/2026). Nominalmente Sonnet costa ~40% in meno. Fonte:
  `https://www.anthropic.com/news/claude-sonnet-5` (ufficiale).
- **MA** Sonnet 5 usa un **nuovo tokenizer** che produce **1,0–1,35x più token** a parità di
  testo. Fonte: stessa (system card ufficiale).
- Risultato empirico: sull'Intelligence Index **Sonnet 5 costa $2,29/task, ~15% IN PIÙ di Opus
  4.8** nonostante il prezzo/token dimezzato. Fonte:
  `https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost`. *Qualità: leaderboard
  indipendente, analisi empirica dei costi.*

**Conclusione, punto 1:** il risparmio di Sonnet 5 sul budget è **molto più piccolo del 40%
nominale** — su alcuni task è addirittura più caro per-task. Quindi la scelta non va fatta sul
prezzo ma su **cosa è in gioco**: dove un errore costa (soldi/sync dei dati), la qualità conta →
Opus 4.8. Dove il compito è delimitato e verificabile con i test (fix di bug, migration, unit
test), Sonnet 5 basta.

---

## 2. Quanto cambia tra i livelli di effort — dove sono i rendimenti decrescenti

Qui c'è sia il segnale più forte sia il buco di dati più grande. I **5 livelli**
(low/medium/high/xhigh/max) sono documentati ufficialmente: `high` è il default; `xhigh` per
lavoro di coding/agentico lungo (>30 min, budget di token nell'ordine dei milioni); `max`
massima capacità senza vincoli di token. Fonte:
`https://platform.claude.com/docs/en/build-with-claude/effort`.

**Il salto meglio quantificato è medium→high (dato ufficiale, ma sulla generazione precedente
Opus 4.5):**
- All'effort **medium**, Opus 4.5 eguaglia il miglior punteggio SWE-bench di Sonnet 4.5 usando
  il **76% di token in meno**.
- All'effort **high** (default), lo **batte di 4,3 punti** usando il **48% di token in meno**.
- Fonte: `https://www.anthropic.com/news/claude-opus-4-5`. *Qualità: benchmark ufficiale con
  cifre esatte — ma è Opus 4.5, la generazione precedente. Il meccanismo regge, i numeri esatti
  no.*

**Stima del costo per salto (fonte secondaria, non un benchmark controllato):**
- low→medium: ~**+10 punti** a un costo di ~$0,046/chiamata.
- medium→high: altri ~**+10 punti** a un costo di soli ~$0,007/chiamata (economicamente il
  salto migliore).
- xhigh→max: **spesso trascurabile** sul coding ("se non trovi un task che max risolve e xhigh
  no, non hai un margine misurabile").
- Fonte: `https://www.mindstudio.ai/blog/claude-opus-4-8-effort-levels-explained`. *Qualità:
  aneddoto/blog, non un benchmark pubblicato. Prendi la forma della curva, non i decimali.*

**Dove sono i rendimenti decrescenti — e dove MAX fa PEGGIO (dato forte):**
- La stessa Anthropic: `max` "su molti carichi di lavoro aggiunge costo significativo per
  guadagni piccoli, e su task strutturati può portare a **overthinking**". Consiglia di partire
  da **xhigh** per lavoro di coding/agentico. Fonte:
  `https://platform.claude.com/docs/en/build-with-claude/effort` (ufficiale).
- **Studio indipendente (il dato più importante di questa sezione):** Andon Labs
  (Vending-Bench, orizzonte lungo) ha misurato **Opus 4.8 a MAX peggiore che a HIGH**, ed
  entrambi peggiori di Opus 4.7. Causa: a Max usa ~5x i token di ragionamento → più del doppio
  delle "compaction" del contesto → l'agente perde coerenza su task lunghi. Fonte:
  `https://andonlabs.com/blog/opus-4-8-vending-bench`. *Qualità: studio indipendente di terze
  parti, metodologia chiara e riproducibile, MA un solo benchmark a orizzonte lungo — non
  generalizzare a tutto.*
- **Studio accademico** ("When More Thinking Hurts", arXiv 2604.10739, apr 2026): oltre una
  soglia, il ragionamento esteso fa **abbandonare al modello risposte corrette**
  ("overthinking"); la lunghezza ottimale dipende dalla difficoltà (problemi facili saturano
  prima, ~2K token; quelli difficili ~8K). Fonte: `https://arxiv.org/abs/2604.10739`. *Qualità:
  preprint non ancora peer-reviewed, su matematica/scienze non coding — ma il meccanismo è
  direttamente rilevante.*

**Il buco di dati, detto chiaramente:** **nessun benchmark pubblico isola l'impatto
quantitativo** di ogni singolo livello su SWE-bench per Opus 4.8/Sonnet 5. Le cifre "+10 punti
per salto" vengono da blog. Ciò che è **solido**: (1) medium→high rende molto ed è economico;
(2) high→xhigh rende meno; (3) xhigh→max spesso non rende **o peggiora** su task lunghi.

---

## 3. Ultracode / multi-agente — quando rende, quando spreca

**Cos'è davvero:** ultracode **non è un livello di effort API separato**. Manda
`effort=xhigh` E dà a Claude Code il permesso permanente di orchestrare workflow multi-agente
(fino a **16 agenti concorrenti**, 1000 totali per run, nessun input a metà run). Fonte:
`https://platform.claude.com/docs/en/build-with-claude/effort` (ufficiale).

**Quando RENDE (numeri):**
- Il multi-agente batte il singolo-agente del **90,2%** su una eval interna di ricerca
  Anthropic (stile BrowseComp) — **ma usa ~15x i token** di una singola chat (i singoli-agenti
  usano ~4x). Fonte: `https://www.anthropic.com/engineering/multi-agent-research-system`
  (ufficiale). *Chiave: quel guadagno è sulla **ricerca parallelizzabile**, non sul coding.*
- Nello stesso studio: **il solo uso di token spiega l'80% della varianza** nella
  performance; token + chiamate a tool + modello spiegano il 95%. Cioè, il guadagno viene da
  **"più compute"**, non da un'architettura intelligente.

**Quando SPRECA (numeri) — ed è il tuo caso:**
- **La stessa Anthropic dice esplicitamente** che il multi-agente **NON è adatto al coding
  lineare** ("la maggior parte dei task di coding coinvolge meno sotto-task davvero
  parallelizzabili della ricerca") né a domini con dipendenze/contesto condiviso → lasciali a
  un singolo agente. Fonte: la stessa (sezione limitazioni, ufficiale).
- **Due paper del 2026** mostrano che **a parità di budget di token, un singolo agente forte
  eguaglia o batte il multi-agente**, anche sul coding:
  - HumanEval: **92,1% singolo vs 91,6% multi-agente**, con multi che costa il 37–50% in più.
    Fonte: `https://arxiv.org/html/2601.12307v1`.
  - Ragionamento multi-hop: singolo ≥ multi a parità di token. Fonte:
    `https://arxiv.org/html/2604.02460v1`.
  - *Qualità: preprint arXiv 2026, non peer-reviewed, ma metodologia esplicita con benchmark
    dichiarati (incl. HumanEval/MBPP).*
- Costo reale osservato: 5 subagenti paralleli ≈ 5x token; caso estremo con 49 subagenti stimato
  a **$8.000–15.000 per una sessione di 2,5h**. Fonti:
  `https://getclaudekit.com/blog/guide/performance/parallelism-and-subagents` e
  `https://www.aicosts.ai/blog/claude-code-subagent-cost-explosion-887k-tokens-minute-crisis`.
  *Qualità: aneddoti/blog, un solo caso estremo — segnale di rischio, non media.*
- Euristica: conviene solo se il task richiederebbe a un singolo agente **>20–30 minuti
  sequenziali**. Fonte: `https://www.developersdigest.tech/blog/ultracode-effort-level-explained`.
  *Qualità: aneddoto/blog non validato.*

**Conclusione, punto 3:** per **fix mirati su file noti, una migration SQL, unit test**
ultracode è uno **spreco netto** — task lineari, contesto singolo, verificabili con test. Sul
**piano Max con la finestra di 5h**, ultracode può bruciare la finestra in un colpo solo. Vale
solo per una **caccia ai bug su tutto il repo** o un **audit** che tocca decine/centinaia di
file in parallelo — non il lavoro che hai descritto.

---

## 4. Raccomandazione pratica per te (Max, 5h, dev solo)

**(a) Bonifica bug mirata / migration SQL / unit test → Sonnet 5, effort `high`
(default), sali a `xhigh` solo se un fix specifico resiste.**
- Perché: task delimitati su file noti, verificabili con i test. Il divario Opus↔Sonnet qui non
  rende; su Terminal-Bench (lavoro da CLI) Sonnet 5 potrebbe essere addirittura avanti (dato da
  verificare). `high` è già il default ed è dove medium→high ha reso di più (+4,3 punti Opus
  4.5, ufficiale). **Nessun ultracode.**
- Attenzione al budget: il risparmio di Sonnet vs Opus è molto più piccolo del 40% nominale
  (tokenizer + verbosità → ~15% più caro per-task su alcuni carichi di lavoro). Non contare su
  uno sconto grosso — conta sul fatto che qui non ti serve la potenza di Opus.

**(b) Layer di sync delicato (soldi/dati) → Opus 4.8, effort `xhigh`. NON `max`.**
- Perché Opus: correttezza critica, errore costoso, ambiguità reale. Qui contano gli ~8 punti
  Intelligence Index / ~6 punti SWE-bench Pro. `https://artificialanalysis.ai/...`,
  `https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro`.
- Perché `xhigh` e non `max`: Andon Labs mostra **max peggiore di high** su task lunghi per
  overthinking/compaction; Anthropic consiglia xhigh come punto di partenza. Usa `max` solo su
  un singolo problema di frontiera che xhigh non risolve, e verifica che aiuti davvero.
  `https://andonlabs.com/blog/opus-4-8-vending-bench`,
  `https://platform.claude.com/docs/en/build-with-claude/effort`.
- **Ultracode: no**, a meno che la sync diventi un refactor su tutto il repo su decine di file
  paralleli. Un layer ben delimitato non lo giustifica (e i paper mostrano singolo ≥ multi a
  parità di budget).

**Dove spendere Fable 5 (quando disponibile, budget permettendo):** sulla **mini-spec della
sync PRIMA di scrivere codice** — è la fase di ragionamento architetturale a orizzonte lungo su
una decisione delicata, coerente con la tua regola "design prima del codice" da CLAUDE.md. È il
modello più forte per quello, e il costo alto lì è giustificato perché lo usi poco e per la
decisione che conta di più. Poi passa a Opus 4.8/xhigh per l'implementazione.

**Regola concisa da tenere a mente:**
> La leva **effort** conta più della scelta di **modello** tra modelli adiacenti; e la leva
> **"un buon modello + verifica"** conta più della leva **"più agenti"** sul coding lineare.
> Entrambe sono documentate ufficialmente da Anthropic
> (`https://platform.claude.com/docs/en/about-claude/models/choosing-a-model`: "tuning effort is
> often a better lever than changing model").

**Cosa non posso dirti con dati solidi (onestà finale):**
- Il divario "vero" Opus↔Sonnet sul lavoro reale: le leaderboard vanno da 1,75 a 8 punti,
  SWE-bench Verified è saturo. Un intervallo, non un numero.
- Quanto rende ogni singolo livello di effort su Opus 4.8/Sonnet 5: **nessun benchmark
  pubblico lo isola**. Le cifre per-salto vengono da blog. Solo il trend è solido (medium→high
  ottimo, poi decrescente, max rischioso).
- Il beneficio quantitativo dell'ultracode: nessun benchmark ufficiale sul guadagno; solo la
  regola generale "il multi-agente aiuta sul lavoro parallelizzabile, non sul coding lineare"
  (questa è ufficiale Anthropic).
