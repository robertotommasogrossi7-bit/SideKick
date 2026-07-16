# CONSUMO — token di tutte le chat Claude Code (generato)

> Generato da `osservatorio/consumo.mjs` il 2026-07-16.
> **Non modificare a mano**: rilanciare lo script per aggiornare.
> Progetti riservati censurati (legenda solo locale, mai su GitHub).
> Nota lettura: *input/output* = token "vivi" pagati pieni; *cache letta* = contesto riletto
> (costa ~1/10 dell'input). I dati grezzi sono in `consumo.csv` (progetto × modello × mese)
> e `sessioni.csv` (una riga per sessione, col titolo dell'operazione: **cercabile**).

## Totale assoluto (chat locali)
| Messaggi | Input | Output | Cache letta | Cache scritta |
|---|---|---|---|---|
| 9k | 764k | 15.7M | 2798.0M | 156.5M |

## Per progetto (ordinati per token vivi)
| Progetto | Periodo | Sessioni | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|
| poker (Who's the Boss) | 2026-05-14 → 2026-07-14 | 19 | 4k | 322k | 6.1M | 1346.2M |
| progetto-15 | 2026-05-29 → 2026-07-12 | 8 | 2k | 233k | 3.6M | 914.4M |
| SideKick | 2026-06-03 → 2026-07-16 | 9 | 510 | 116k | 1.6M | 143.0M |
| Libri-Organizzazione | 2026-05-07 → 2026-05-31 | 2 | 837 | 11k | 1.3M | 121.4M |
| Programmi (root) | 2026-05-31 → 2026-06-27 | 3 | 253 | 45k | 997k | 96.4M |
| poker (worktree) | 2026-05-15 → 2026-05-19 | 3 | 512 | 2k | 604k | 70.5M |
| Text-Adventure-Engine | 2026-05-28 → 2026-05-29 | 1 | 174 | 370 | 466k | 54.3M |
| progetto-16 | 2026-06-28 → 2026-06-30 | 1 | 55 | 17k | 308k | 10.9M |
| Idee | 2026-06-11 → 2026-06-12 | 1 | 90 | 6k | 270k | 12.8M |
| esperimento vague-test armB | 2026-06-11 → 2026-06-11 | 1 | 47 | 65 | 72k | 3.2M |
| progetto-22 | 2026-06-17 → 2026-06-17 | 1 | 34 | 8k | 52k | 2.2M |
| esperimento migr-test habit-armB | 2026-06-10 → 2026-06-10 | 1 | 38 | 46 | 57k | 2.2M |
| esperimento migr-test budget-armB | 2026-06-10 → 2026-06-10 | 1 | 27 | 33 | 48k | 1.2M |
| esperimento vague-test armA | 2026-06-11 → 2026-06-11 | 1 | 47 | 65 | 48k | 3.7M |
| esperimento test2-anticipi | 2026-06-04 → 2026-06-04 | 1 | 19 | 4k | 42k | 963k |
| esperimento migr-test budget-armA | 2026-06-10 → 2026-06-10 | 1 | 27 | 31 | 45k | 1.8M |
| weather-report (worktree) | 2026-05-07 → 2026-05-07 | 1 | 80 | 137 | 42k | 6.8M |
| esperimento migr-test habit-armA | 2026-06-10 → 2026-06-10 | 1 | 81 | 93 | 30k | 5.6M |
| esperimento stream-test reverse | 2026-06-11 → 2026-06-11 | 1 | 8 | 10 | 21k | 249k |
| esperimento stream-test discovery | 2026-06-10 → 2026-06-11 | 1 | 5 | 7 | 11k | 138k |

## Per operazione (una riga per sessione — il titolo dice cosa si è fatto)
Le sessioni con meno di 5k token di output sono sommate in fondo al progetto.
Per cercare (es. "react native", "audit", "Feature_6"): Ctrl+F qui o grep su `sessioni.csv`.

| Progetto | Periodo | Operazione | Modelli | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|---|
| poker (Who's the Boss) | 2026-05-14 | Poker_app/HTML_Split | opus-4-7 | 146 | 572 | 209k | 33.0M |
| poker (Who's the Boss) | 2026-05-20 | Poker_app/Feature_2 | sonnet-4-6 | 89 | 6k | 53k | 9.8M |
| poker (Who's the Boss) | 2026-05-20 | Poker_App/Feature_3 | sonnet-4-6 | 40 | 2k | 14k | 2.1M |
| poker (Who's the Boss) | 2026-05-20→05-31 | Poker_App/Base_2 | opus-4-7 + opus-4-8 | 344 | 24k | 677k | 75.7M |
| poker (Who's the Boss) | 2026-05-22→05-24 | Poker_App/Feature_4 | sonnet-4-6 | 77 | 12k | 157k | 7.0M |
| poker (Who's the Boss) | 2026-05-22 | Unify duplicate tournament cleanup functions | sonnet-4-6 | 31 | 2k | 12k | 1.9M |
| poker (Who's the Boss) | 2026-05-31→06-01 | Poker_App/Feature_5 | opus-4-8 | 19 | 5k | 155k | 1.3M |
| poker (Who's the Boss) | 2026-05-31→06-04 | Poker_app/Base_3 | opus-4-8 | 184 | 16k | 630k | 77.8M |
| poker (Who's the Boss) | 2026-06-01→06-02 | Poker_App/Feature_6 | opus-4-8 | 150 | 26k | 253k | 45.6M |
| poker (Who's the Boss) | 2026-06-03 | Poker_App/Feature_7 | opus-4-8 | 140 | 22k | 129k | 30.6M |
| poker (Who's the Boss) | 2026-06-03 | Poker_app/Feature_8 | sonnet-4-6 | 61 | 11k | 45k | 7.2M |
| poker (Who's the Boss) | 2026-06-04→07-01 | WTB/Base_4 | opus-4-8 | 675 | 72k | 1.6M | 290.9M |
| poker (Who's the Boss) | 2026-06-04→06-10 | WTB/Feature_9 | opus-4-8 | 379 | 38k | 334k | 126.2M |
| poker (Who's the Boss) | 2026-06-30→07-01 | WTB/Base_4 | opus-4-8 | 177 | 8k | 249k | 76.7M |
| poker (Who's the Boss) | 2026-07-01→07-10 | WTB/Base_5 | opus-4-8 +2 | 586 | 35k | 795k | 313.8M |
| poker (Who's the Boss) | 2026-07-03→07-11 | WTB/Base_5 | sonnet-5 + opus-4-8 | 512 | 33k | 519k | 207.1M |
| poker (Who's the Boss) | 2026-07-11→07-14 | WTB/Base_6 | opus-4-8 +2 | 190 | 10k | 267k | 39.6M |
| | | | | | | | |
| progetto-15 | 2026-05-29→06-17 | (censurato) | opus-4-8 + fable-5 | 331 | 35k | 878k | 110.0M |
| progetto-15 | 2026-05-29→07-01 | (censurato) | opus-4-8 | 1k | 112k | 1.5M | 523.7M |
| progetto-15 | 2026-06-29→07-01 | (censurato) | opus-4-8 | 488 | 60k | 750k | 239.8M |
| progetto-15 | 2026-07-01→07-12 | (censurato) | opus-4-8 + fable-5 | 145 | 26k | 415k | 40.0M |
| progetto-15 | 2026-07-01 | (censurato) | opus-4-8 | 3 | 6 | 14k | 880k |
| | | | | | | | |
| SideKick | 2026-06-03→06-10 | SK/Base_1 | opus-4-8 | 128 | 62k | 677k | 58.4M |
| SideKick | 2026-06-04 | SK/Test_2 | opus-4-8 | 20 | 5k | 39k | 961k |
| SideKick | 2026-06-04 | SK/Test_1 | opus-4-8 | 23 | 4k | 53k | 1.5M |
| SideKick | 2026-06-10 | BassPedal/Base | opus-4-8 | 27 | 6k | 101k | 2.6M |
| SideKick | 2026-06-10→06-12 | SK/Base_2 | opus-4-8 + fable-5 | 216 | 22k | 557k | 67.8M |
| SideKick | 2026-06-12 | SK/Base_3 | opus-4-8 + fable-5 | 55 | 10k | 114k | 7.6M |
| SideKick | 2026-07-16 | Sidekick data observatory setup | fable-5 | 23 | 3k | 43k | 2.2M |
| SideKick | 2026-07-16 | Sidekick data observatory setup | fable-5 | 13 | 24 | 24k | 1.8M |
| | | | | | | | |
| Libri-Organizzazione | 2026-05-07→05-31 | Organizzazione | sonnet-4-6 + opus-4-8 | 397 | 475 | 268k | 38.2M |
| Libri-Organizzazione | 2026-05-09→05-20 | Poker_app/BASE | opus-4-7 + sonnet-4-6 | 440 | 10k | 1.0M | 83.2M |
| | | | | | | | |
| Programmi (root) | 2026-05-31→06-19 | Set up personalized data engineering learning program | opus-4-8 | 124 | 23k | 590k | 35.7M |
| Programmi (root) | 2026-05-31→06-27 | AWS/Base_1 | opus-4-8 | 79 | 14k | 281k | 55.5M |
| Programmi (root) | 2026-06-15→06-16 | Colloquio/Base_1 | opus-4-8 | 50 | 8k | 126k | 5.2M |
| | | | | | | | |
| poker (worktree) | 2026-05-15→05-16 | Poker_app/HTML->React | sonnet-4-6 | 280 | 1k | 259k | 25.1M |
| poker (worktree) | 2026-05-19 | Poker_app/Feature_1 | sonnet-4-6 | 130 | 134 | 68k | 15.3M |
| poker (worktree) | 2026-05-19 | Poker_app/Feature | opus-4-7 | 102 | 204 | 277k | 30.1M |
| | | | | | | | |
| Text-Adventure-Engine | 2026-05-28→05-29 | Text_game/Base_1 | opus-4-7 | 174 | 370 | 466k | 54.3M |
| | | | | | | | |
| progetto-16 | 2026-06-28→06-30 | (censurato) | opus-4-8 | 55 | 17k | 308k | 10.9M |
| | | | | | | | |
| Idee | 2026-06-11→06-12 | GitHub/Base_1 | opus-4-8 + fable-5 | 90 | 6k | 270k | 12.8M |
| | | | | | | | |
| esperimento vague-test armB | 2026-06-11 | Modernize expense app with React | sonnet-4-6 | 47 | 65 | 72k | 3.2M |
| | | | | | | | |
| progetto-22 | 2026-06-17 | (censurato) | opus-4-8 | 34 | 8k | 52k | 2.2M |
| | | | | | | | |
| esperimento migr-test habit-armB | 2026-06-10 | Migrate habit tracker to React with Vite | sonnet-4-6 | 38 | 46 | 57k | 2.2M |
| | | | | | | | |
| esperimento migr-test budget-armB | 2026-06-10 | Migrate expense app to React and Vite | sonnet-4-6 | 27 | 33 | 48k | 1.2M |
| | | | | | | | |
| esperimento vague-test armA | 2026-06-11 | Modernize expense app to React | sonnet-4-6 | 47 | 65 | 48k | 3.7M |
| | | | | | | | |
| esperimento test2-anticipi | 2026-06-04 | SK/Test_2 | opus-4-8 | 19 | 4k | 42k | 963k |
| | | | | | | | |
| esperimento migr-test budget-armA | 2026-06-10 | Migrate expense tracker app to React plus Vite | sonnet-4-6 | 27 | 31 | 45k | 1.8M |
| | | | | | | | |
| weather-report (worktree) | 2026-05-07 | Weather_report/Prova | opus-4-7 + sonnet-4-6 | 80 | 137 | 42k | 6.8M |
| | | | | | | | |
| esperimento migr-test habit-armA | 2026-06-10 | Migrate habit tracker to React and Vite | sonnet-4-6 | 81 | 93 | 30k | 5.6M |
| | | | | | | | |
| esperimento stream-test reverse | 2026-06-11 | Deduce and implement solve function from examples | sonnet-4-6 | 8 | 10 | 21k | 249k |
| | | | | | | | |
| esperimento stream-test discovery | 2026-06-10→06-11 | Implement solution to pass all grader tests | sonnet-4-6 | 5 | 7 | 11k | 138k |
| SideKick | — | *(1 sessioni minori sommate)* | — | 5 | 4k | 3k | 122k |

## Lavoro degli agenti (workflow cloud — tenuto a mano)
I workflow multi-agente girano nel cloud e **non lasciano transcript sul PC**: questi numeri
vengono dai METRICHE/report dei progetti. **Dopo ogni nuovo workflow, aggiungere una riga a
`consumo/workflow.csv`** (il rituale dell'osservatorio lo ricorda).

| Data | Progetto | Operazione | Agenti | Token agenti | Fonte |
|---|---|---|---|---|---|
| 2026-07-03 | poker (Who's the Boss) | Audit multi-agente ALTO su R6+R7.1 (45 finding confermati, 11 confutati) | 67 | 2.6M | _processo/METRICHE.md |
| 2026-07-03 | poker (Who's the Boss) | Ricerca modelli/effort per il metodo (dossier in SideKick esperimenti/) | 5 | 689k | _processo/METRICHE.md |
| 2026-07-03 | progetto-15 | Audit multi-agente ALTO (12 confermati, 1 confutato + ombra Sonnet-vs-Opus) | 21 | 1.1M | report audit del progetto |

**Totale agenti cloud: 4.4M** (da sommare a parte rispetto alle chat locali).

## Per modello (solo chat locali)
| Modello | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| opus-4-8 | 5k | 626k | 10.8M | 1921.5M |
| opus-4-7 | 1k | 15k | 2.2M | 259.4M |
| sonnet-4-6 | 2k | 38k | 1.5M | 137.6M |
| fable-5 | 320 | 42k | 658k | 82.6M |
| sonnet-5 | 798 | 43k | 600k | 396.9M |

## Per mese
| Mese | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| 2026-05 | 2k | 82k | 4.0M | 396.6M |
| 2026-06 | 4k | 536k | 9.0M | 1557.8M |
| 2026-07 | 2k | 146k | 2.7M | 843.5M |
