# poker (Who's the Boss) — utilizzo token (generato)

> Torna al cruscotto: [`../DASHBOARD.md`](../DASHBOARD.md). Non modificare a mano.

**23 sessioni** dal 2026-05-14 al 2026-07-22 · **7.6M output** ·
333k input · 1685.2M cache letta · 5k messaggi · **+4.4M token di agenti cloud** (3 workflow)

## Sessioni (in ordine di tempo — il titolo dice cosa è stato fatto)
| Periodo | Operazione | Modelli | Msg | Input | Output | Cache letta | Costo (API-equiv.) |
|---|---|---|---|---|---|---|---|
| 2026-05-14 | Poker_app/HTML_Split | opus-4-7 | 146 | 572 | 209k | 33.0M | $27.40 |
| 2026-05-15→05-16 | Poker_app/HTML->React *(poker (worktree))* | sonnet-4-6 | 280 | 1k | 259k | 25.1M | $14.91 |
| 2026-05-19 | Poker_app/Feature_1 *(poker (worktree))* | sonnet-4-6 | 130 | 134 | 68k | 15.3M | $6.22 |
| 2026-05-19 | Poker_app/Feature *(poker (worktree))* | opus-4-7 | 102 | 204 | 277k | 30.1M | $26.23 |
| 2026-05-20 | Poker_app/Feature_2 | sonnet-4-6 | 89 | 6k | 53k | 9.8M | $4.24 |
| 2026-05-20 | Poker_App/Feature_3 | sonnet-4-6 | 40 | 2k | 14k | 2.1M | $1.04 |
| 2026-05-20→05-31 | Poker_App/Base_2 | opus-4-7 + opus-4-8 | 344 | 24k | 677k | 75.7M | $80.75 |
| 2026-05-22→05-24 | Poker_App/Feature_4 | sonnet-4-6 | 77 | 12k | 157k | 7.0M | $5.92 |
| 2026-05-22 | Unify duplicate tournament cleanup functions | sonnet-4-6 | 31 | 2k | 12k | 1.9M | $0.9492 |
| 2026-05-31→06-01 | Poker_App/Feature_5 | opus-4-8 | 19 | 5k | 155k | 1.3M | $6.63 |
| 2026-05-31→06-04 | Poker_app/Base_3 | opus-4-8 | 184 | 16k | 630k | 77.8M | $81.44 |
| 2026-06-01→06-02 | Poker_App/Feature_6 | opus-4-8 | 150 | 26k | 253k | 45.6M | $46.16 |
| 2026-06-03 | Poker_App/Feature_7 | opus-4-8 | 140 | 22k | 129k | 30.6M | $23.37 |
| 2026-06-03 | Poker_app/Feature_8 | sonnet-4-6 | 61 | 11k | 45k | 7.2M | $3.41 |
| 2026-06-04→07-01 | WTB/Base_4 | opus-4-8 | 675 | 72k | 1.6M | 290.9M | $337.51 |
| 2026-06-04→06-10 | WTB/Feature_9 | opus-4-8 | 379 | 38k | 334k | 126.2M | $85.71 |
| 2026-06-30→07-01 | WTB/Base_4 | opus-4-8 | 177 | 8k | 249k | 76.7M | $76.00 |
| 2026-07-01→07-10 | WTB/Base_5 | opus-4-8 +2 | 586 | 35k | 795k | 313.8M | $152.07 |
| 2026-07-03→07-11 | WTB/Base_5 | sonnet-5 + opus-4-8 | 512 | 33k | 519k | 207.1M | $99.07 |
| 2026-07-11→07-17 | WTB/Base_6 | opus-4-8 +2 | 355 | 11k | 497k | 121.7M | $121.26 |
| 2026-07-17→07-22 | WTB/Base_8 | fable-5 | 147 | 7k | 252k | 49.8M | $92.10 |
| 2026-07-17 | WTB/Base_7 | opus-4-8 | 354 | 651 | 330k | 112.1M | $82.80 |
| 2026-07-17→07-22 | WTB/Base_8 | opus-4-8 | 55 | 101 | 72k | 24.6M | $19.72 |

## Workflow cloud su questo progetto
> Nota: le descrizioni delle operazioni restano in **inglese** — sono log tecnici copiati
> tali e quali dal registro `workflow.csv` e dai titoli delle sessioni (dati, non prosa).
| Data | Operazione | Agenti | Token agenti | Fonte |
|---|---|---|---|---|
| 2026-07-03 | Multi-agent HIGH audit on R6+R7.1 (45 findings confirmed, 11 refuted) | 67 | 2.6M | _processo/METRICHE.md |
| 2026-07-03 | Model/effort research for the method (dossier in experiments/) | 5 | 689k | _processo/METRICHE.md |
| 2026-07-18 | Multi-agent MEDIO audit on R7.4 delta-sync (5 confirmed [1 ALTA], 1 refuted) | 10 | 1.0M | chat WTB/Base_8 |

\* costo noto solo in parte (qualche modello/data di quella riga non ha un prezzo verificato — vedi `prices.csv`)