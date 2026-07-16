# CONSUMO — token di tutte le chat Claude Code (generato)

> Generato da `osservatorio/consumo.mjs` il 2026-07-16.
> **Non modificare a mano**: rilanciare lo script per aggiornare.
> Nomi dei progetti privati censurati (legenda solo locale, mai su GitHub).
> Nota lettura: *input/output* = token "vivi" pagati pieni; *cache letta* = contesto riletto
> (costa ~1/10 dell'input).
>
> **Limite noto**: qui ci sono SOLO le chat locali. Gli agenti dei **workflow cloud**
> (es. i due audit multi-agente di luglio: 2,6M e 1,1M token) non lasciano transcript sul
> PC: quei numeri vivono nei METRICHE.md dei progetti e nella dashboard Anthropic.

## Totale assoluto
| Messaggi | Input | Output | Cache letta | Cache scritta |
|---|---|---|---|---|
| 9k | 764k | 15.7M | 2795.9M | 156.4M |

## Per progetto (ordinati per token vivi)
| Progetto | Periodo | Sessioni | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|
| progetto-17 | 2026-05-14 → 2026-07-14 | 19 | 4k | 322k | 6.1M | 1346.2M |
| progetto-15 | 2026-05-29 → 2026-07-12 | 8 | 2k | 233k | 3.6M | 914.4M |
| SideKick | 2026-06-03 → 2026-07-16 | 8 | 495 | 116k | 1.6M | 140.9M |
| progetto-01 | 2026-05-07 → 2026-05-31 | 2 | 837 | 11k | 1.3M | 121.4M |
| progetto-03 | 2026-05-31 → 2026-06-27 | 3 | 253 | 45k | 997k | 96.4M |
| progetto-21 | 2026-05-28 → 2026-05-29 | 1 | 174 | 370 | 466k | 54.3M |
| progetto-16 | 2026-06-28 → 2026-06-30 | 1 | 55 | 17k | 308k | 10.9M |
| progetto-20 | 2026-05-19 → 2026-05-19 | 1 | 102 | 204 | 277k | 30.1M |
| progetto-14 | 2026-06-11 → 2026-06-12 | 1 | 90 | 6k | 270k | 12.8M |
| progetto-19 | 2026-05-15 → 2026-05-16 | 1 | 280 | 1k | 259k | 25.1M |
| progetto-12 | 2026-06-11 → 2026-06-11 | 1 | 47 | 65 | 72k | 3.2M |
| progetto-18 | 2026-05-19 → 2026-05-19 | 1 | 130 | 134 | 68k | 15.3M |
| progetto-22 | 2026-06-17 → 2026-06-17 | 1 | 34 | 8k | 52k | 2.2M |
| progetto-07 | 2026-06-10 → 2026-06-10 | 1 | 38 | 46 | 57k | 2.2M |
| progetto-05 | 2026-06-10 → 2026-06-10 | 1 | 27 | 33 | 48k | 1.2M |
| progetto-11 | 2026-06-11 → 2026-06-11 | 1 | 47 | 65 | 48k | 3.7M |
| progetto-10 | 2026-06-04 → 2026-06-04 | 1 | 19 | 4k | 42k | 963k |
| progetto-04 | 2026-06-10 → 2026-06-10 | 1 | 27 | 31 | 45k | 1.8M |
| progetto-02 | 2026-05-07 → 2026-05-07 | 1 | 80 | 137 | 42k | 6.8M |
| progetto-06 | 2026-06-10 → 2026-06-10 | 1 | 81 | 93 | 30k | 5.6M |
| progetto-09 | 2026-06-11 → 2026-06-11 | 1 | 8 | 10 | 21k | 249k |
| progetto-08 | 2026-06-10 → 2026-06-11 | 1 | 5 | 7 | 11k | 138k |

## Per modello
| Modello | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| opus-4-8 | 5k | 626k | 10.8M | 1921.5M |
| opus-4-7 | 1k | 15k | 2.2M | 259.4M |
| sonnet-4-6 | 2k | 38k | 1.5M | 137.6M |
| fable-5 | 305 | 42k | 633k | 80.5M |
| sonnet-5 | 798 | 43k | 600k | 396.9M |

## Per mese
| Mese | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| 2026-05 | 2k | 82k | 4.0M | 396.6M |
| 2026-06 | 4k | 536k | 9.0M | 1557.8M |
| 2026-07 | 2k | 146k | 2.7M | 841.4M |

I dati grezzi (progetto × modello × mese) sono in `consumo.csv`.
