# UTILIZZO TOKEN — cruscotto (generato)

> Generato da `observatory/usage.mjs` il 2026-07-25. **Non modificare a
> mano** (eccetto `LESSONS.md`, curato dall'osservatorio e incorporato qui sotto).
> Il dettaglio di ogni progetto è in `per-progetto/` (un file per progetto, una riga di tabella per sessione).
> Dati grezzi (originali inglesi): [`usage.csv`](../../../observatory/usage/usage.csv) ·
> [`sessions.csv`](../../../observatory/usage/sessions.csv) (cercabili: grep "react", "audit", "Feature_6"…) —
> schema colonna per colonna in [`SCHEMA.md`](SCHEMA.md).
> I progetti riservati sono oscurati (la legenda resta solo in locale). *Output* = token generati (i
> più pesanti); *input* = token letti a prezzo pieno; *cache letta* = contesto riletto (~1/10 dell'input).

## Colpo d'occhio
- **18.2M token di output** (+ **29.8M** da agenti cloud) su **64 sessioni**
  in **12 progetti**, dal 2026-05 a oggi. 11k messaggi in totale.
- La **cache** ha riletto 3551.8M token (≈187× i token vivi): riprendere una chat
  su una cache calda è ciò che rende sostenibile il piano — ripartire da zero li butta via.

## Le cose più costose
| # | Cosa | Tipo | Quando | Token |
|---|---|---|---|---|
| 1 | Python question factory WR3: 555 questions/16 batches (Haiku extraction, 16 Sonnet generators, dedup, full QC 2 Opus passes + 8% shadow, fixes, final verification). RESUME INCIDENT (root cause verified by the observatory 2026-07-25 on the journal): at the 3rd relaunch the cache matched NO keys (0/46) despite 30/32 QC prompts byte-identical and a COMPLETE journal - the on-the-spot diagnosis 'journal missing results' was wrong (cache keys not content-addressed in the runtime) -> 46 agents redone (30 Opus + 16 Sonnet), waste ~0.59M live + ~39M cache; stopped by hand; closed with 3 direct agents. Live tokens from transcripts: 1.17M+0.88M+0.65M; cache read ~225M (dominant item). Duration stretched by the 2 credit gaps (~2h and ~3h on a running clock), not the cost — Studio | agenti cloud | 2026-07-25 | 11.0M |
| 2 | Factory v2 MAXIMUM: 447 new elements + retrofit of 167 + SQL runner + full QC 4x Opus + take-nothing-for-granted (25 gaps -> 22 fundamentals). OBSERVATORY NOTE: run interrupted by session end with a ~2h gap ON A RUNNING CLOCK (duration inflated); resumed from cache: 30/34 agents reused free, real tokens only for the 4 missing — Studio | agenti cloud | 2026-07-20 | 5.8M |
| 3 | Multi-agent HIGH audit on R6+R7.1 (45 findings confirmed, 11 refuted) — poker (Who's the Boss) | agenti cloud | 2026-07-03 | 2.6M |
| 4 | Single sq/ app built from the 17 mockups (9 agents: foundations + 4 modules + integration + 2 Opus QC; +2 bugs found by the orchestrator's E2E test) — Studio | agenti cloud | 2026-07-21 | 1.8M |
| 5 | WTB/Base_4 — poker (Who's the Boss) | chat | 2026-06-04 | 1.6M |
| 6 | Bridge F1: auto-import into 2 apps + 167 questions generated from weather_report (12 batches, QC 3x Opus, Haiku shadow) — Studio | agenti cloud | 2026-07-20 | 1.5M |
| 7 | Full repo audit REPORT-ONLY (Roberto): 3 cheap red-team personas (recruiter/adopter/visitor, 17 findings) -> 5 subsystem reviewers (30) -> Haiku dedup (29 unique) -> adversarial verification on HIGH/MEDIUM -> Opus synthesis. Outcome: 14 confirmed (1 HIGH: usage.mjs misses Studio's workflows in the drilldown, ~20.5M tokens invisible; 8 medium incl. the unexplained double Italian folder and inconsistent drop-in versions), 4 low unverified, 0 refuted; 5 severities downgraded by verification. Report: observatory/AUDIT-REPO-2026-07-25.md, no fix applied — SideKick | agenti cloud | 2026-07-25 | 1.5M |
| 8 | (oscurato) — progetto-15 | chat | 2026-05-29 | 1.5M |

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
| Progetto | Periodo | Sessioni | Output | Input | Cache letta |
|---|---|---|---|---|---|
| [poker (Who's the Boss)](per-progetto/poker-who-s-the-boss.md) | 2026-05-14 → 2026-07-22 | 23 | 7.6M | 333k | 1685.2M |
| [progetto-15](per-progetto/progetto-15.md) | 2026-05-29 → 2026-07-17 | 5 | 3.6M | 233k | 921.0M |
| [SideKick](per-progetto/sidekick.md) | 2026-06-03 → 2026-07-25 | 12 | 2.1M | 117k | 253.5M |
| [Libri-Organizzazione](per-progetto/libri-organizzazione.md) | 2026-05-07 → 2026-05-31 | 2 | 1.3M | 11k | 121.4M |
| [Programmi (root)](per-progetto/programmi-root.md) | 2026-05-31 → 2026-06-27 | 3 | 997k | 45k | 96.4M |
| [Studio](per-progetto/studio.md) | 2026-07-20 → 2026-07-24 | 4 | 873k | 3k | 353.8M |
| [Text-Adventure-Engine](per-progetto/text-adventure-engine.md) | 2026-05-28 → 2026-05-29 | 1 | 466k | 370 | 54.3M |
| [experiments (method tests)](per-progetto/experiments-method-tests.md) | 2026-06-04 → 2026-06-11 | 9 | 375k | 5k | 19.1M |
| [progetto-16](per-progetto/progetto-16.md) | 2026-06-28 → 2026-06-30 | 1 | 308k | 17k | 10.9M |
| [Idee](per-progetto/idee.md) | 2026-06-11 → 2026-06-12 | 1 | 270k | 6k | 12.8M |
| [weather_report](per-progetto/weather-report.md) | 2026-05-07 → 2026-07-25 | 2 | 199k | 251 | 21.2M |
| [progetto-22](per-progetto/progetto-22.md) | 2026-06-17 → 2026-06-17 | 1 | 52k | 8k | 2.2M |

## Lavoro degli agenti cloud (workflow — registro curato a mano)
I workflow multi-agente girano nel cloud e **non lasciano transcript sul PC**: questi numeri
vengono dai file METRICHE/report dei progetti. **Dopo ogni nuovo workflow, aggiungi una riga a
`workflow.csv`** (il rituale dell'osservatorio include il promemoria).

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
| 2026-07-25 | SideKick | Full repo audit REPORT-ONLY (Roberto): 3 cheap red-team personas (recruiter/adopter/visitor, 17 findings) -> 5 subsystem reviewers (30) -> Haiku dedup (29 unique) -> adversarial verification on HIGH/MEDIUM -> Opus synthesis. Outcome: 14 confirmed (1 HIGH: usage.mjs misses Studio's workflows in the drilldown, ~20.5M tokens invisible; 8 medium incl. the unexplained double Italian folder and inconsistent drop-in versions), 4 low unverified, 0 refuted; 5 severities downgraded by verification. Report: observatory/AUDIT-REPO-2026-07-25.md, no fix applied | 24 | 1.5M |
| 2026-07-25 | SideKick | ITALIANO total translation (6 Sonnet agents): tree restructured with Italian folder names (osservatorio/uso/per-progetto/esperimenti/plugin/documenti), usage.mjs made BILINGUAL (Italian dashboard+drilldowns generated on every run, +2 tests), missing experiment docs translated, audit report turned English in the main tree (Italian original kept in ITALIANO/), full resync with the restructured README; verifier fixed 2 real bugs (4 links pointing at English dashboards instead of the generated Italian ones; degraded accents in one file) and flagged the v1.9.1->v1.9.2 README drift (fixed by the director) | 6 | 685k |

## Per modello (solo chat locali)
| Modello | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| opus-4-8 | 6k | 628k | 11.8M | 2300.2M |
| fable-5 | 1k | 52k | 2.2M | 457.7M |
| opus-4-7 | 1k | 15k | 2.2M | 259.4M |
| sonnet-4-6 | 2k | 38k | 1.5M | 137.6M |
| sonnet-5 | 801 | 43k | 602k | 397.1M |

## Per mese
| Mese | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| 2026-05 | 2k | 82k | 4.0M | 396.6M |
| 2026-06 | 4k | 536k | 9.0M | 1557.8M |
| 2026-07 | 4k | 159k | 5.2M | 1597.3M |
