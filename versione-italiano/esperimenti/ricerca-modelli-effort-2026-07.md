# Ricerca - modelli, effort, ultracode (2026-07-03)

> **Provenienza**: ricerca multi-agente (4 ricercatori Sonnet su angoli diversi + sintesi Opus,
> ~689k token, fonti citate inline con qualita del dato dichiarata). Commissionata dal progetto
> poker/who's-the-boss per scegliere modello+effort per fase; le REGOLE derivate sono nel metodo
> (COSTITUZIONE, sez. 'Modello e effort giusti per ogni passo').
> **Per l'osservatorio SideKick**: da rivedere quando escono modelli nuovi o dati indipendenti
> migliori (Aider leaderboard non copriva ancora Opus 4.8/Sonnet 5; SWE-bench Verified saturo).

# Opus 4.8 vs Sonnet 5 + effort levels + ultracode — verdetto per il tuo lavoro

**Premessa onesta sulla qualità dei dati.** Opus 4.8 e Sonnet 5 sono modelli recentissimi (annunci giugno 2026): i benchmark ufficiali (SWE-bench Verified) sono quasi **saturi** e vanno presi con le pinze. I leaderboard indipendenti a N grande esistono ma **discordano tra loro** sui numeri assoluti (vedi sotto). Su **effort** e **ultracode** i dati numerici isolati sono scarsi: c'è buona documentazione ufficiale qualitativa, ma quasi nessun benchmark pubblico che quantifichi "quanto rende ogni singolo livello". Segnalo caso per caso.

---

## 1. Opus 4.8 vs Sonnet 5 per il tuo lavoro — verdetto con numeri

**Verdetto: Sonnet 5 per (a) la bonifica bug, Opus 4.8 per (b) il sync delicato.** Il gap è reale ma modesto; conta più dove sbagliare costa caro.

**Il gap di qualità (dati che concordano):**
- SWE-bench Verified: **Opus 4.8 88.6% vs Sonnet 5 85.2%** → gap ~3.4 punti. Fonte: `https://llm-stats.com/benchmarks/swe-bench-verified` (leaderboard indipendente, N=103) e `https://www.anthropic.com/news/claude-opus-4-8` (ufficiale). *Qualità: benchmark ufficiale + leaderboard indipendente, ma test quasi saturo → il gap "vero" su lavoro reale è probabilmente più piccolo di così.*
- SWE-bench **Pro** (più duro, meno saturo, N=731 pubblico costruito da Scale AI, non da Anthropic): **Opus 4.8 69.2% vs Sonnet 5 63.2%** → gap ~6 punti. Fonti: `https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro` (dataset indipendente) + numeri da system card via `https://www.marktechpost.com/2026/06/30/...`. *Qualità: il dataset è indipendente e a N grande, ma i punteggi sono auto-riportati Anthropic → coerenti tra fonti, non verifica indipendente.*
- Intelligence Index (Artificial Analysis, decine di modelli): **Opus 4.8 = 61.4 vs Sonnet 5 = 53** → gap ~8 punti. Fonte: `https://artificialanalysis.ai/articles/claude-opus-4-8-analysis-and-benchmarks`. *Qualità: leaderboard indipendente N grande — questo è il segnale più netto a favore di Opus.*
- Vals Index (indipendente, N=31): **Opus 4.8 70.36% vs Sonnet 5 68.61%** → gap solo ~1.75 punti. Fonte: `https://www.vals.ai/models`. *Qualità: leaderboard indipendente non-Anthropic.*

**Nota di onestà: i leaderboard indipendenti si contraddicono.** Il gap "vero" oscilla tra ~1.75 (Vals) e ~8 punti (Artificial Analysis) a seconda di come pesano i task. Non c'è un numero unico affidabile. Aider Polyglot — che sarebbe stato ottimo — **non è aggiornato** a questi modelli (fermo a Opus 4 / Sonnet 4, inizio 2025): `https://aider.chat/docs/leaderboards/`. Non usabile.

**Anomalia rilevante per te (lavori da CLI):** su **Terminal-Bench 2.1**, **Sonnet 5 batte Opus 4.8** (80.4% vs 74.6%). Fonte: `https://www.marktechpost.com/2026/06/30/...`. *Qualità: da verificare — riportato da fonte secondaria, non l'ho trovato confermato direttamente sul system card ufficiale. Trattalo come indizio, non come fatto.* Se regge, è un argomento in più per Sonnet 5 sul lavoro (a).

**Il dato economico controintuitivo (importantissimo per il tuo budget 5h):**
- Prezzi ufficiali: **Opus 4.8 $5/$25 per MTok, Sonnet 5 $3/$15** ($2/$10 in promo fino al 31/08/2026). Nominalmente Sonnet costa il ~40% in meno. Fonte: `https://www.anthropic.com/news/claude-sonnet-5` (ufficiale).
- **MA** Sonnet 5 usa un **nuovo tokenizer** che produce **1.0–1.35x più token** a parità di testo. Fonte: stessa (system card ufficiale).
- Risultato empirico: sull'Intelligence Index **Sonnet 5 costa $2.29/task, ~15% IN PIÙ di Opus 4.8** nonostante il prezzo/token dimezzato. Fonte: `https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost`. *Qualità: leaderboard indipendente, analisi costo empirica.*

**Conclusione punto 1:** il risparmio di Sonnet 5 sul budget è **molto minore del 40% nominale** — su alcuni task è addirittura più caro per-task. Quindi la scelta non va fatta sul prezzo ma sulla **posta in gioco**: dove un errore costa (il sync soldi/dati), pesa la qualità → Opus 4.8. Dove il task è scoped e verificabile con test (bug fix, migration, unit test), Sonnet 5 basta.

---

## 2. Quanto cambia tra i livelli di effort — dove sono i rendimenti decrescenti

Qui c'è il segnale più forte e insieme il buco di dati più grande. **I 5 livelli** (low/medium/high/xhigh/max) sono documentati ufficialmente: `high` è il default; `xhigh` per coding/agentic lungo (>30 min, budget token nell'ordine dei milioni); `max` capacità massima senza vincoli di token. Fonte: `https://platform.claude.com/docs/en/build-with-claude/effort`.

**Il salto meglio quantificato è medium→high (dati ufficiali, ma su generazione precedente Opus 4.5):**
- A effort **medium**, Opus 4.5 eguaglia il miglior SWE-bench di Sonnet 4.5 usando **il 76% di token in meno**.
- A effort **high** (default), lo **supera di 4.3 punti** usando **il 48% di token in meno**.
- Fonte: `https://www.anthropic.com/news/claude-opus-4-5`. *Qualità: benchmark ufficiale con cifre esatte — ma è Opus 4.5, generazione precedente. Il meccanismo regge, i numeri esatti no.*

**Stima costo per salto (fonte secondaria, non benchmark controllato):**
- low→medium: ~**+10 punti** a costo ~$0.046/call.
- medium→high: altri ~**+10 punti** a costo solo ~$0.007/call (economicamente il salto migliore).
- xhigh→max: **spesso trascurabile** su coding ("se non trovi un task che max risolve e xhigh no, non hai margine misurabile").
- Fonte: `https://www.mindstudio.ai/blog/claude-opus-4-8-effort-levels-explained`. *Qualità: aneddoto/blog, non benchmark pubblicato. Prendi la forma della curva, non i decimali.*

**Dove sono i rendimenti decrescenti — e dove MAX fa PEGGIO (finding forte):**
- Anthropic stessa: `max` "su molti workload aggiunge costo significativo per guadagni piccoli, e su task strutturati può portare a **overthinking**". Raccomanda di partire da **xhigh** per coding/agentic. Fonte: `https://platform.claude.com/docs/en/build-with-claude/effort` (ufficiale).
- **Studio indipendente (il dato più importante di questa sezione):** Andon Labs (Vending-Bench, long-horizon) ha misurato **Opus 4.8 a MAX peggiore che a HIGH**, e entrambi peggiori di Opus 4.7. Causa: a Max usa ~5x i token di ragionamento → più del doppio delle "compaction" del contesto → l'agente perde coerenza su task lunghi. Fonte: `https://andonlabs.com/blog/opus-4-8-vending-bench`. *Qualità: studio indipendente di terze parti, metodologia chiara e riproducibile, MA singolo benchmark long-horizon — non generalizzare a tutto.*
- **Studio accademico** ("When More Thinking Hurts", arXiv 2604.10739, apr 2026): oltre una soglia il ragionamento esteso fa **abbandonare risposte corrette** ("overthinking"); la lunghezza ottimale dipende dalla difficoltà (problemi facili saturano prima, ~2K token; difficili ~8K). Fonte: `https://arxiv.org/abs/2604.10739`. *Qualità: preprint non ancora peer-reviewed, su math/scienza non coding — ma il meccanismo è direttamente rilevante.*

**Il buco di dati, detto chiaro:** **nessun benchmark pubblico isola l'impatto quantitativo di ogni singolo livello su SWE-bench** per Opus 4.8/Sonnet 5. Le cifre "+10 punti a salto" vengono da blog. Quello che è **solido**: (1) medium→high rende molto ed è economico; (2) high→xhigh rende meno; (3) xhigh→max spesso non rende **o peggiora** su task lunghi.

---

## 3. Ultracode / multi-agente — quando paga, quando spreca

**Cos'è davvero:** ultracode **non è un livello di effort API separato**. Invia `effort=xhigh` E dà a Claude Code il permesso permanente di orchestrare workflow multi-agente (fino a **16 agenti concorrenti**, 1000 totali per run, nessun input a metà run). Fonte: `https://platform.claude.com/docs/en/build-with-claude/effort` (ufficiale).

**Quando PAGA (numeri):**
- Multi-agente batte il single-agente del **90.2%** su un eval di ricerca interna Anthropic (stile BrowseComp) — **ma usa ~15x i token** di una singola chat (i single-agent ne usano ~4x). Fonte: `https://www.anthropic.com/engineering/multi-agent-research-system` (ufficiale). *Chiave: quel guadagno è su **ricerca parallelizzabile**, non su coding.*
- Nello stesso studio: **il solo uso di token spiega l'80% della varianza** di performance; token + tool call + modello spiegano il 95%. Cioè il guadagno viene da **"più calcolo"**, non da architettura furba.

**Quando SPRECA (numeri) — ed è il tuo caso:**
- **Anthropic stessa dice esplicitamente** che il multi-agente **NON è adatto al coding lineare** ("most coding tasks involve fewer truly parallelizable tasks than research") né ai domini con dipendenze condivise/contesto comune → lasciali a un singolo agente. Fonte: stessa (sezione limitazioni, ufficiale).
- **Due paper 2026** mostrano che **a parità di budget di token, un singolo agente forte eguaglia o batte il multi-agente**, anche su coding:
  - HumanEval: **92.1% single vs 91.6% multi-agente**, con il multi che costa il 37–50% in più. Fonte: `https://arxiv.org/html/2601.12307v1`.
  - Multi-hop reasoning: single ≥ multi a parità di token. Fonte: `https://arxiv.org/html/2604.02460v1`.
  - *Qualità: preprint arXiv 2026, non peer-reviewed, ma metodologia esplicita con benchmark dichiarati (incl. HumanEval/MBPP).*
- Costo reale osservato: 5 subagent paralleli ≈ 5x token; caso estremo con 49 subagent stimato **$8.000–15.000 per una sessione di 2.5h**. Fonti: `https://getclaudekit.com/blog/guide/performance/parallelism-and-subagents` e `https://www.aicosts.ai/blog/claude-code-subagent-cost-explosion-887k-tokens-minute-crisis`. *Qualità: aneddoti/blog, caso singolo estremo — segnale di rischio, non media.*
- Euristica: conviene solo se il task richiederebbe a un singolo agente **>20–30 minuti sequenziali**. Fonte: `https://www.developersdigest.tech/blog/ultracode-effort-level-explained`. *Qualità: aneddoto/blog non validato.*

**Conclusione punto 3:** per **fix puntuali a file noti, una migration SQL, unit test** ultracode è **spreco netto** — task lineari, contesto singolo, verificabili con test. Sul **piano Max con finestra 5h**, ultracode può bruciarti la finestra in un colpo. Vale solo per uno **sweep di bug codebase-wide** o un **audit** che tocca decine/centinaia di file in parallelo — non è il tuo lavoro descritto.

---

## 4. Raccomandazione pratica per te (Max, 5h, dev solista)

**(a) Bonifica bug mirati / migration SQL / unit test → Sonnet 5, effort `high` (default), sali a `xhigh` solo se un fix specifico resiste.**
- Perché: task scoped su file noti, verificabili con test. Il gap Opus↔Sonnet qui non ripaga; su Terminal-Bench (lavoro CLI) Sonnet 5 potrebbe persino essere avanti (dato da verificare). `high` è già il default ed è dove medium→high ha reso di più (+4.3 punti Opus 4.5, ufficiale). **Niente ultracode.**
- Attenzione budget: il risparmio di Sonnet vs Opus è molto minore del 40% nominale (tokenizer + verbosità → ~15% più caro per-task su alcuni carichi). Non contare su un grosso sconto — conta sul fatto che non ti serve la potenza di Opus qui.

**(b) Layer di sync delicato (soldi/dati) → Opus 4.8, effort `xhigh`. NON `max`.**
- Perché Opus: correttezza critica, errore costoso, ambiguità reale. Qui gli ~8 punti Intelligence Index / ~6 punti SWE-bench Pro contano. `https://artificialanalysis.ai/...`, `https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro`.
- Perché `xhigh` e non `max`: Andon Labs mostra **max peggiore di high** su task lunghi per overthinking/compaction; Anthropic raccomanda xhigh come punto di partenza. Usa `max` solo su un singolo problema frontiera che xhigh non risolve, e verifica che aiuti davvero. `https://andonlabs.com/blog/opus-4-8-vending-bench`, `https://platform.claude.com/docs/en/build-with-claude/effort`.
- **Ultracode: no**, a meno che il sync non diventi un refactor codebase-wide su decine di file paralleli. Un layer ben scoped non lo giustifica (e i paper mostrano single ≥ multi a parità di budget).

**Dove spendere Fable 5 (quando disponibile, budget permettendo):** sulla **mini-spec del sync PRIMA di scrivere codice** — è la fase di ragionamento architetturale long-horizon su decisione delicata, coerente con la tua regola "design prima del codice" del CLAUDE.md. È il modello più forte per quello, e lì il costo alto è giustificato perché lo usi poco e per la decisione che conta di più. Poi passa a Opus 4.8/xhigh per l'implementazione.

**Regola sintetica da tenere a mente:**
> La leva **effort** conta più della scelta **modello** tra modelli adiacenti; e la leva **"un buon modello + verifica"** conta più della leva **"più agenti"** sul coding lineare. Entrambe sono documentate ufficialmente da Anthropic (`https://platform.claude.com/docs/en/about-claude/models/choosing-a-model`: "tuning effort è spesso una leva migliore che cambiare modello").

**Cosa NON so dirti con dati solidi (onestà finale):**
- Il gap "vero" Opus↔Sonnet su lavoro reale: i leaderboard vanno da 1.75 a 8 punti, SWE-bench Verified è saturo. Range, non numero.
- Quanto rende ogni singolo livello di effort su Opus 4.8/Sonnet 5: **nessun benchmark pubblico lo isola**. Le cifre per-salto sono da blog. Solido solo l'andamento (medium→high ottimo, poi decrescente, max rischioso).
- Il beneficio quantitativo di ultracode: nessun benchmark ufficiale sul guadagno; solo la regola generale "multi-agente aiuta su lavoro parallelizzabile, non su coding lineare" (questa sì, ufficiale Anthropic).