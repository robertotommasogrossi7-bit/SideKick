# Studio — utilizzo token (generato)

> Torna al cruscotto: [`../DASHBOARD.md`](../DASHBOARD.md). Non modificare a mano.

**9 sessioni** dal 2026-07-20 al 2026-07-31 · **1.9M output** ·
13k input · 615.4M cache letta · 2k messaggi · **+~40.9M token di agenti cloud** (8 workflow)

## Sessioni (in ordine di tempo — il titolo dice cosa è stato fatto)
| Periodo | Operazione | Modelli | Msg | Input | Output | Cache letta | Costo (API-equiv.) |
|---|---|---|---|---|---|---|---|
| 2026-07-20→07-22 | STUDIO/Base_1 | fable-5 + opus-4-8 | 520 | 2k | 640k | 292.7M | $343.80 |
| 2026-07-20 | Consumo crediti Claude anomalo | sonnet-5 | 3 | 6 | 1k | 165k | $0.1145 |
| 2026-07-20 | STUDIO/Base_1 | fable-5 | 1 | 1 | 4k | 32k | $4.06 |
| 2026-07-22→07-24 | STUDIO/Base_2 | fable-5 + opus-4-8 | 229 | 1k | 227k | 61.0M | $67.15 |
| 2026-07-25→07-26 | STUDIO/Base_3 | fable-5 | 151 | 726 | 185k | 39.3M | $59.91 |
| 2026-07-26 | Studio/Fabbrica_Python_2 | fable-5 | 157 | 8k | 166k | 38.7M | $61.28 |
| 2026-07-28→07-30 | STUDIO/SQL_1 | fable-5 | 182 | 1k | 206k | 45.8M | $79.84 |
| 2026-07-29→07-30 | STUDIO/SQL_2 | opus-5 | 166 | 389 | 125k | 29.8M | — |
| 2026-07-29→07-31 | STUDIO/Fabbrica_SQL1 | fable-5 | 236 | 471 | 341k | 108.0M | $175.42 |

## Workflow cloud su questo progetto
> Nota: le descrizioni delle operazioni restano in **inglese** — sono log tecnici copiati
> tali e quali dal registro `workflow.csv` e dai titoli delle sessioni (dati, non prosa).
| Data | Operazione | Agenti | Token agenti | Costo (API-equiv.) | Fonte |
|---|---|---|---|---|---|
| 2026-07-20 | Bridge F1: auto-import into 2 apps + 167 questions generated from weather_report (12 batches, QC 3x Opus, Haiku shadow) | 21 | 1.5M | $12.21 | chat Studio-Ponte/Design_1 + transcript wf_b1d56344-00a |
| 2026-07-20 | Factory v2 MAXIMUM: 447 new elements + retrofit of 167 + SQL runner + full QC 4x Opus + take-nothing-for-granted (25 gaps -> 22 fundamentals). OBSERVATORY NOTE: run interrupted by session end with a ~2h gap ON A RUNNING CLOCK (duration inflated); resumed from cache: 30/34 agents reused free, real tokens only for the 4 missing | 34 | 5.8M | — | chat Studio-Ponte/Design_1 |
| 2026-07-21 | Single sq/ app built from the 17 mockups (9 agents: foundations + 4 modules + integration + 2 Opus QC; +2 bugs found by the orchestrator's E2E test) | 9 | 1.8M | — | chat Studio-Ponte/Design_1 |
| 2026-07-21 | Polish 1: P0 bugs + Constellation + Home v2 + Training/Exams/Pomodoro + Progress v2. NOTE: interrupted twice by Roberto (out of tokens); resumed from cache with 6/8 agents reused free - real tokens only 427,713 across the 3 launches | 8 | 428k | — | chat Studio-Ponte/Design_1 |
| 2026-07-25 | Python question factory WR3: 555 questions/16 batches (Haiku extraction, 16 Sonnet generators, dedup, full QC 2 Opus passes + 8% shadow, fixes, final verification). RESUME INCIDENT (root cause verified by the observatory 2026-07-25 on the journal): at the 3rd relaunch the cache matched NO keys (0/46) despite 30/32 QC prompts byte-identical and a COMPLETE journal - the on-the-spot diagnosis 'journal missing results' was wrong (cache keys not content-addressed in the runtime) -> 46 agents redone (30 Opus + 16 Sonnet), waste ~0.59M live + ~39M cache; stopped by hand; closed with 3 direct agents. Live tokens from transcripts: 1.17M+0.88M+0.65M; cache read ~225M (dominant item). Duration stretched by the 2 credit gaps (~2h and ~3h on a running clock), not the cost | 229 | 11.0M | $137.79 | chat weather_report/Fabbrica_Domande_Python + transcript wf_62401bd0-f1e |
| 2026-07-26 | Books factory run 1 (Effective Python): 628 new questions with total QC (fused Opus + 8% Sonnet shadow + rechecks) + file remediation on 355 old ones + 194 positional rotations + post-run glossary update | 78 | 9.9M | $131.50 | inbox/REPORT-FABBRICA-LIBRI-2026-07-26.md + transcript wf_0e41ef9f-169 wf_27dc2374-d6c wf_477a2395-b6f wf_e3c57cb0-b4d wf_f0a996c1-83f |
| 2026-07-27 | Repair R-06 run 1: realignment of the term field to the glossary (117 of 283 candidates, gaps closed 17->37) | 5 | 530k | $3.15 | inbox/REPORT-FABBRICA-LIBRI-2026-07-26.md + transcript wf_1a24e505-e3e |
| 2026-07-31 | SQL practice factory: PHASE 0 corpus remediation + 523 new questions (298 executable practices actually run on sakila/weather, 130 T-SQL, 95 theory) + QC 17/17 with targeted shadow + 5 new mechanical checks; agents and tokens ESTIMATED from the run report (cloud run, no local transcripts) | 85 | ~10.0M | — | inbox/REPORT-FABBRICA-SQL-2026-07-31.md |

\* costo noto solo in parte (qualche modello/data di quella riga non ha un prezzo verificato — vedi `prices.csv`)