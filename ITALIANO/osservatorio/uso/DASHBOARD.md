# UTILIZZO TOKEN — cruscotto (generato)

> Generato da `observatory/usage.mjs` il 2026-07-25. **Non modificare a
> mano** (eccetto `LESSONS.md`, curato dall'osservatorio e incorporato qui sotto).
> Il dettaglio di ogni progetto è in `per-progetto/` (un file per progetto, una riga di tabella per sessione).
> Dati grezzi (originali inglesi): [`usage.csv`](../../../observatory/usage/usage.csv) ·
> [`sessions.csv`](../../../observatory/usage/sessions.csv) · [`daily.csv`](../../../observatory/usage/daily.csv) ·
> [`prices.csv`](../../../observatory/usage/prices.csv) (cercabili: grep "react", "audit", "Feature_6"…) —
> schema colonna per colonna in [`SCHEMA.md`](SCHEMA.md). Stessi numeri come pagina interattiva:
> [`dashboard.html`](dashboard.html) (tabelle ordinabili, grafici a barre).
> I progetti riservati sono oscurati (la legenda resta solo in locale). *Output* = token generati (i
> più pesanti); *input* = token letti a prezzo pieno; *cache letta* = contesto riletto (~1/10 dell'input).

## Colpo d'occhio
- **18.3M token di output** (+ **31.2M** da agenti cloud) su **65 sessioni**
  in **12 progetti**, dal 2026-05 a oggi. 11k messaggi in totale.
- La **cache** ha riletto 3596.4M token (≈188× i token vivi): riprendere una chat
  su una cache calda è ciò che rende sostenibile il piano — ripartire da zero li butta via.
- **Costo API-equivalente: $3.6k**, calcolato coi prezzi verificati il 2026-07-25 in `prices.csv`. **NON è ciò che si paga davvero** sul piano
  Max/Pro (finestre da 5 ore flat, non a consumo per token) — stima solo quanto costerebbero quegli stessi token sull'API a consumo, utile per confrontare modelli/workflow. I token dei workflow cloud
  non hanno un dettaglio per modello e sono **esclusi** da questo totale (vedi la sezione agenti cloud sotto).

## Le cose più costose
> Nota: le descrizioni delle operazioni restano in **inglese** — sono log tecnici copiati
> tali e quali dal registro `workflow.csv` e dai titoli delle sessioni (dati, non prosa).
| # | Cosa | Tipo | Quando | Token | Costo (API-equiv.) |
|---|---|---|---|---|---|
| 1 | Python question factory WR3: 555 questions/16 batches (Haiku extraction, 16 Sonnet generators, dedup, full QC 2 Opus passes + 8% shadow, fixes, final verification). RESUME INCIDENT (root cause verified by the observatory 2026-07-25 on the journal): at the 3rd relaunch the cache matched NO keys (0/46) despite 30/32 QC prompts byte-identical and a COMPLETE journal - the on-the-spot diagnosis 'journal missing results' was wrong (cache keys not content-addressed in the runtime) -> 46 agents redone (30 Opus + 16 Sonnet), waste ~0.59M live + ~39M cache; stopped by hand; closed with 3 direct agents. Live tokens from transcripts: 1.17M+0.88M+0.65M; cache read ~225M (dominant item). Duration stretched by the 2 credit gaps (~2h and ~3h on a running clock), not the cost — Studio | agenti cloud | 2026-07-25 | 11.0M | — |
| 2 | Factory v2 MAXIMUM: 447 new elements + retrofit of 167 + SQL runner + full QC 4x Opus + take-nothing-for-granted (25 gaps -> 22 fundamentals). OBSERVATORY NOTE: run interrupted by session end with a ~2h gap ON A RUNNING CLOCK (duration inflated); resumed from cache: 30/34 agents reused free, real tokens only for the 4 missing — Studio | agenti cloud | 2026-07-20 | 5.8M | — |
| 3 | Multi-agent HIGH audit on R6+R7.1 (45 findings confirmed, 11 refuted) — poker (Who's the Boss) | agenti cloud | 2026-07-03 | 2.6M | — |
| 4 | Single sq/ app built from the 17 mockups (9 agents: foundations + 4 modules + integration + 2 Opus QC; +2 bugs found by the orchestrator's E2E test) — Studio | agenti cloud | 2026-07-21 | 1.8M | — |
| 5 | WTB/Base_4 — poker (Who's the Boss) | chat | 2026-06-04 | 1.6M | $337.51 |
| 6 | Bridge F1: auto-import into 2 apps + 167 questions generated from weather_report (12 batches, QC 3x Opus, Haiku shadow) — Studio | agenti cloud | 2026-07-20 | 1.5M | — |
| 7 | Full repo audit REPORT-ONLY (Roberto): 3 cheap red-team personas (recruiter/adopter/visitor, 17 findings) -> 5 subsystem reviewers (30) -> Haiku dedup (29 unique) -> adversarial verification on HIGH/MEDIUM -> Opus synthesis. Outcome: 14 confirmed (1 HIGH: usage.mjs misses Studio's workflows in the drilldown, ~20.5M tokens invisible; 8 medium incl. the unexplained double Italian folder and inconsistent drop-in versions), 4 low unverified, 0 refuted; 5 severities downgraded by verification. Report: observatory/AUDIT-REPO-2026-07-25.md, no fix applied in THIS run (all fixes were applied later the same day - see the report's Outcome section) — SideKick | agenti cloud | 2026-07-25 | 1.5M | — |
| 8 | (oscurato) — progetto-15 | chat | 2026-05-29 | 1.5M | $479.69 |

## Cosa abbiamo imparato sul costo (e ridotto davvero)
- **Audit multi-agente: il secondo è costato meno della metà.** Primo audit ALTO (poker):
  **67 agenti / 2,6M token**; secondo (progetto-15, con le regole di efficienza: dedup dei
  finding PRIMA delle verifiche, verifica adversariale solo su ALTO/MEDIO, cacce mirate):
  **21 agenti / 1,1M**, trovando comunque i bug critici reali. ⚠️ Onestà: progetti e ambito
  **diversi** — è un'indicazione (N=1+1), non un confronto pulito dello stesso audit.
- **Ripartire da zero è lo spreco più grande.** Nei nostri dati le letture di cache erano
  ~187× i token vivi (aggiornamento 2026-07-25; era ~170× al conteggio precedente — stessa
  meccanica, più dati accumulati da allora) — è la normale meccanica del prompt caching nelle
  chat lunghe (il punto attuabile è nostro): riprendere una chat/audit interrotto **riusando
  la cache** (la ripresa dell'audit poker ha riusato il 100% dei passi completati) costa
  ~1/10; ripartire da zero butta via tutto.
- **Fable sui lavori lunghi non ripaga**: l'audit poker su Fable si è fermato per la
  **finestra di utilizzo di cinque ore** del piano Max (il limite d'uso, non la finestra di
  contesto) → regola: lavori pesanti su Opus, **Fable solo per le decisioni che contano e i
  recap** (poco e bene).
- **Il modello grosso non serve dappertutto.** Dai dati A/B: sulla verifica del codice, la
  qualità tra Haiku/Sonnet/Opus era pari — quello che ripaga è il disegno del processo, non
  il modello caro ovunque. Da luglio, i fix mirati girano su **Sonnet high** invece che su
  Opus (blocco R6-B: 6 fasi, tutto verde al primo tentativo).
- **Imporre un processo a un modello forte costa e non ripaga** (sonda 2026-06: il braccio
  col pacchetto ha usato ~2× i token del braccio cieco, stesso esito o peggiore) → il metodo
  ora *propone* invece di imporre, e il multi-agente si usa SOLO per audit/sweep, mai per
  coding lineare.

## Per progetto (clicca per il dettaglio per sessione)
| Progetto | Periodo | Sessioni | Output | Input | Cache letta | Costo (API-equiv.) |
|---|---|---|---|---|---|---|
| [poker (Who's the Boss)](per-progetto/poker-who-s-the-boss.md) | 2026-05-14 → 2026-07-22 | 23 | 7.6M | 333k | 1685.2M | $1.4k |
| [progetto-15](per-progetto/progetto-15.md) | 2026-05-29 → 2026-07-17 | 5 | 3.6M | 233k | 921.0M | $935.06 |
| [SideKick](per-progetto/sidekick.md) | 2026-06-03 → 2026-07-25 | 12 | 2.2M | 117k | 288.2M | $399.78 |
| [Libri-Organizzazione](per-progetto/libri-organizzazione.md) | 2026-05-07 → 2026-05-31 | 2 | 1.3M | 11k | 121.4M | $138.83 |
| [Programmi (root)](per-progetto/programmi-root.md) | 2026-05-31 → 2026-06-27 | 3 | 997k | 45k | 96.4M | $175.54 |
| [Studio](per-progetto/studio.md) | 2026-07-20 → 2026-07-25 | 5 | 962k | 3k | 363.7M | $431.96 |
| [Text-Adventure-Engine](per-progetto/text-adventure-engine.md) | 2026-05-28 → 2026-05-29 | 1 | 466k | 370 | 54.3M | $46.54 |
| [experiments (method tests)](per-progetto/experiments-method-tests.md) | 2026-06-04 → 2026-06-11 | 9 | 375k | 5k | 19.1M | $14.64 |
| [progetto-16](per-progetto/progetto-16.md) | 2026-06-28 → 2026-06-30 | 1 | 308k | 17k | 10.9M | $23.88 |
| [Idee](per-progetto/idee.md) | 2026-06-11 → 2026-06-12 | 1 | 270k | 6k | 12.8M | $23.17 |
| [weather_report](per-progetto/weather-report.md) | 2026-05-07 → 2026-07-25 | 2 | 199k | 251 | 21.2M | $38.08 |
| [progetto-22](per-progetto/progetto-22.md) | 2026-06-17 → 2026-06-17 | 1 | 52k | 8k | 2.2M | $2.87 |

## Lavoro degli agenti cloud (workflow — registro curato a mano)
I workflow multi-agente girano nel cloud e **non lasciano transcript sul PC**: questi numeri
vengono dai file METRICHE/report dei progetti. **Dopo ogni nuovo workflow, aggiungi una riga a
`workflow.csv`** (il rituale dell'osservatorio include il promemoria). Nessun dettaglio per modello
significa nessuna colonna USD qui — vedi `SCHEMA.md` per il limite dichiarato.

> Nota: le descrizioni delle operazioni restano in **inglese** — sono log tecnici copiati
> tali e quali dal registro `workflow.csv` e dai titoli delle sessioni (dati, non prosa).

| Data | Progetto | Operazione | Agenti | Token agenti |
|---|---|---|---|---|
| 2026-07-03 | poker (Who's the Boss) | Multi-agent HIGH audit on R6+R7.1 (45 findings confirmed, 11 refuted) | 67 | 2.6M |
| 2026-07-03 | poker (Who's the Boss) | Model/effort research for the method (dossier in experiments/) | 5 | 689k |
| 2026-07-03 | progetto-15 | Multi-agent HIGH audit (12 confirmed, 1 refuted + Sonnet-vs-Opus shadow check) | 21 | 1.1M |
| 2026-07-17 | SideKick | English translation of the public facade (11 docs incl. CONSTITUTION v1.5) | 1 | 119k |
| 2026-07-17 | SideKick | Spec Kit double-run study (Opus x2, identical prompt) + claim verification | 2 | 293k |
| 2026-07-18 | poker (Who's the Boss) | Multi-agent MEDIO audit on R7.4 delta-sync (5 confirmed [1 ALTA], 1 refuted) | 10 | 1.0M |
| 2026-07-20 | Studio | Bridge F1: auto-import into 2 apps + 167 questions generated from weather_report (12 batches, QC 3x Opus, Haiku shadow) | 21 | 1.5M |
| 2026-07-20 | Studio | Factory v2 MAXIMUM: 447 new elements + retrofit of 167 + SQL runner + full QC 4x Opus + take-nothing-for-granted (25 gaps -> 22 fundamentals). OBSERVATORY NOTE: run interrupted by session end with a ~2h gap ON A RUNNING CLOCK (duration inflated); resumed from cache: 30/34 agents reused free, real tokens only for the 4 missing | 34 | 5.8M |
| 2026-07-21 | Studio | Single sq/ app built from the 17 mockups (9 agents: foundations + 4 modules + integration + 2 Opus QC; +2 bugs found by the orchestrator's E2E test) | 9 | 1.8M |
| 2026-07-21 | Studio | Polish 1: P0 bugs + Constellation + Home v2 + Training/Exams/Pomodoro + Progress v2. NOTE: interrupted twice by Roberto (out of tokens); resumed from cache with 6/8 agents reused free - real tokens only 427,713 across the 3 launches | 8 | 428k |
| 2026-07-25 | Studio | Python question factory WR3: 555 questions/16 batches (Haiku extraction, 16 Sonnet generators, dedup, full QC 2 Opus passes + 8% shadow, fixes, final verification). RESUME INCIDENT (root cause verified by the observatory 2026-07-25 on the journal): at the 3rd relaunch the cache matched NO keys (0/46) despite 30/32 QC prompts byte-identical and a COMPLETE journal - the on-the-spot diagnosis 'journal missing results' was wrong (cache keys not content-addressed in the runtime) -> 46 agents redone (30 Opus + 16 Sonnet), waste ~0.59M live + ~39M cache; stopped by hand; closed with 3 direct agents. Live tokens from transcripts: 1.17M+0.88M+0.65M; cache read ~225M (dominant item). Duration stretched by the 2 credit gaps (~2h and ~3h on a running clock), not the cost | 229 | 11.0M |
| 2026-07-25 | SideKick | Repo clarity+English (3 phases): 3 Sonnet analysts (fresh eyes, native English, fact coherence; 26 findings) -> 5 Sonnet executors on disjoint files (CONSTITUTION.md brought to v1.9, FACTORY-PROCESS.md created, spec-kit drop-in with new principles XII-XVI, facade, observatory docs) -> 2 Opus reviewers with different lenses (8 findings, 5 real: drop-in version race in README between parallel agents, 170x->187x, 5h_windows line MISSING FROM THE MASTER then added, untranslated 'Assistenza', dashboard to regenerate; 1 refuted: the generator has no hardcoded 170x). Integration and commits by the director | 10 | 838k |
| 2026-07-25 | SideKick | Italian copy ITALIANO/: 5 Sonnet translators on disjoint blocks (14 docs, ~880 lines) + 1 verifier (completeness, number fidelity, terminology, links). 2 cross-agent slips fixed by the director: README intro note removed by an overzealous verifier (context lost between agents) and FINDINGS link pointed at the original instead of the copy | 6 | 405k |
| 2026-07-25 | SideKick | Full repo audit REPORT-ONLY (Roberto): 3 cheap red-team personas (recruiter/adopter/visitor, 17 findings) -> 5 subsystem reviewers (30) -> Haiku dedup (29 unique) -> adversarial verification on HIGH/MEDIUM -> Opus synthesis. Outcome: 14 confirmed (1 HIGH: usage.mjs misses Studio's workflows in the drilldown, ~20.5M tokens invisible; 8 medium incl. the unexplained double Italian folder and inconsistent drop-in versions), 4 low unverified, 0 refuted; 5 severities downgraded by verification. Report: observatory/AUDIT-REPO-2026-07-25.md, no fix applied in THIS run (all fixes were applied later the same day - see the report's Outcome section) | 24 | 1.5M |
| 2026-07-25 | SideKick | ITALIANO total translation (6 Sonnet agents): tree restructured with Italian folder names (osservatorio/uso/per-progetto/esperimenti/plugin/documenti), usage.mjs made BILINGUAL (Italian dashboard+drilldowns generated on every run, +2 tests), missing experiment docs translated, audit report turned English in the main tree (Italian original kept in ITALIANO/), full resync with the restructured README; verifier fixed 2 real bugs (4 links pointing at English dashboards instead of the generated Italian ones; degraded accents in one file) and flagged the v1.9.1->v1.9.2 README drift (fixed by the director) | 6 | 685k |
| 2026-07-25 | SideKick | Final day red-team (Roberto): 3 Sonnet personas on the CURRENT repo state (recruiter on the new README, method adopter, Italian visitor) -> 2 Opus reviewers (bilingual fidelity+method artifacts, whole-repo navigation) with red-team findings as seeds. 16 findings, all small and real, dedup to 7: DATA.md hand-written totals stale vs same-day dashboard (fixed), Italian dashboard cells in English without notice (fixed in the generator: permanent note), PLAN item 1 unticked though done (ticked), missing language markers on drop-in links (added), audit report orphaned from README navigation (linked), drop-in version-lag note (added), register wording (clarified). All applied by the director same day | 5 | 460k |
| 2026-07-25 | SideKick | C1+C3 done well (Roberto): 3 research agents (official Anthropic prices per model VERIFIED AT SOURCE with URL+date each, incl. sonnet-5 two-tier intro/standard price switching 2026-09-01; how ccusage/LiteLLM convert costs; dashboard-presentation comparison -> self-contained HTML viewer recommended over Power BI/markdown-only) -> 1 implementer (prices.csv hand-maintained with validity windows, cost_usd_equiv/cost_partial columns, daily.csv, By day/By week views, bilingual dashboard.html with sortable tables + SVG charts, 6 new tests, limits DECLARED: API-equivalent is not the plan bill, cloud workflows never priced, cache-write at 5m rate) -> 2 Opus verifiers (independent recompute matched to the cent; 4 small real findings, all fixed by the director + 1 visual wrap bug found in the director own browser check). Totals now visible: ~$3.6k API-equivalent for 18.3M output + cache across 65 sessions | 6 | 926k |

## Per modello (solo chat locali)
| Modello | Msg | Input | Output | Cache letta | Costo (API-equiv.) |
|---|---|---|---|---|---|
| opus-4-8 | 6k | 628k | 11.8M | 2300.2M | $2.3k |
| fable-5 | 1k | 53k | 2.3M | 502.2M | $861.75 |
| opus-4-7 | 1k | 15k | 2.2M | 259.4M | $277.90 |
| sonnet-4-6 | 2k | 38k | 1.5M | 137.6M | $79.57 |
| sonnet-5 | 801 | 43k | 602k | 397.1M | $107.47 |

## Per mese
| Mese | Msg | Input | Output | Cache letta | Costo (API-equiv.) |
|---|---|---|---|---|---|
| 2026-05 | 2k | 82k | 4.0M | 396.6M | $382.42 |
| 2026-06 | 4k | 536k | 9.0M | 1557.8M | $1.7k |
| 2026-07 | 4k | 159k | 5.3M | 1641.9M | $1.6k |

## Per settimana, numeri di settimana ISO (solo chat locali)
*(tutta la cronologia registrata)*

| Settimana | Msg | Input | Output | Cache letta | Costo (API-equiv.) |
|---|---|---|---|---|---|
| 2026-W19 | 517 | 712 | 425k | 48.0M | $29.18 |
| 2026-W20 | 771 | 12k | 1.1M | 115.0M | $111.55 |
| 2026-W21 | 752 | 29k | 1.2M | 154.3M | $154.36 |
| 2026-W22 | 453 | 41k | 1.2M | 79.4M | $87.33 |
| 2026-W23 | 1k | 161k | 2.3M | 276.4M | $263.59 |
| 2026-W24 | 1k | 118k | 2.6M | 337.2M | $377.08 |
| 2026-W25 | 433 | 63k | 986k | 146.6M | $194.73 |
| 2026-W26 | 870 | 104k | 1.5M | 475.0M | $442.44 |
| 2026-W27 | 2k | 186k | 3.6M | 907.6M | $822.34 |
| 2026-W28 | 559 | 44k | 599k | 219.0M | $121.55 |
| 2026-W29 | 1k | 15k | 1.4M | 351.3M | $422.15 |
| 2026-W30 | 1k | 4k | 1.5M | 486.7M | $598.98 |

## Per giorno (solo chat locali)
*(mostrati gli ultimi 30 di 58 giorni registrati; la serie completa è in `daily.csv`)*

| Giorno | Msg | Input | Output | Cache letta | Costo (API-equiv.) |
|---|---|---|---|---|---|
| 2026-06-15 | 41 | 8k | 98k | 3.7M | $6.57 |
| 2026-06-16 | 9 | 147 | 28k | 1.5M | $2.83 |
| 2026-06-17 | 258 | 35k | 354k | 80.3M | $68.56 |
| 2026-06-19 | 89 | 13k | 389k | 38.4M | $68.07 |
| 2026-06-21 | 36 | 7k | 118k | 22.8M | $48.70 |
| 2026-06-22 | 45 | 9k | 71k | 17.6M | $15.85 |
| 2026-06-23 | 285 | 45k | 451k | 182.7M | $178.93 |
| 2026-06-24 | 192 | 11k | 220k | 44.2M | $36.96 |
| 2026-06-27 | 118 | 11k | 250k | 68.6M | $67.54 |
| 2026-06-28 | 230 | 28k | 488k | 161.9M | $143.14 |
| 2026-06-29 | 272 | 45k | 753k | 107.6M | $130.37 |
| 2026-06-30 | 520 | 45k | 988k | 215.0M | $254.47 |
| 2026-07-01 | 702 | 75k | 1.3M | 315.5M | $314.44 |
| 2026-07-02 | 52 | 3k | 128k | 21.2M | $40.51 |
| 2026-07-03 | 400 | 17k | 339k | 248.3M | $82.55 |
| 2026-07-10 | 248 | 15k | 189k | 71.8M | $19.92 |
| 2026-07-11 | 265 | 20k | 329k | 135.4M | $79.17 |
| 2026-07-12 | 46 | 9k | 80k | 11.8M | $22.46 |
| 2026-07-13 | 108 | 2k | 154k | 22.1M | $25.84 |
| 2026-07-14 | 39 | 852 | 85k | 13.4M | $13.38 |
| 2026-07-16 | 139 | 3k | 263k | 38.8M | $76.90 |
| 2026-07-17 | 621 | 8k | 742k | 232.9M | $226.21 |
| 2026-07-18 | 84 | 668 | 144k | 30.2M | $51.85 |
| 2026-07-19 | 28 | 51 | 28k | 13.8M | $27.97 |
| 2026-07-20 | 201 | 911 | 325k | 73.1M | $128.29 |
| 2026-07-21 | 283 | 528 | 238k | 188.9M | $181.21 |
| 2026-07-22 | 197 | 1k | 225k | 74.4M | $70.61 |
| 2026-07-23 | 63 | 117 | 102k | 17.5M | $26.45 |
| 2026-07-24 | 101 | 189 | 174k | 31.6M | $47.90 |
| 2026-07-25 | 311 | 1k | 442k | 101.2M | $144.52 |

\* costo noto solo in parte (qualche modello/data di quella riga non ha un prezzo verificato — vedi `prices.csv`)
