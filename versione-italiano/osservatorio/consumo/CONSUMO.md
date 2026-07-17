# CONSUMO — cruscotto token (generato)

> ⚠️ **COPIA CONGELATA (2026-07-17)** — originale italiano storico, non più aggiornato.
> La versione viva è in inglese: [../../../observatory/usage/DASHBOARD.md](../../../observatory/usage/DASHBOARD.md)

> Generato da `osservatorio/consumo.mjs` il 2026-07-16. **Non modificare a
> mano** (tranne `LEZIONI.md`, che è curato dall'osservatorio e viene incorporato qui sotto).
> Il dettaglio di ogni progetto è in `per-progetto/` (un file a progetto, tabella per sessione).
> Dati grezzi: `consumo.csv` · `sessioni.csv` (cercabile: grep "react", "audit", "Feature_6"…).
> Progetti riservati censurati (legenda solo locale). *Output* = token generati (i più pesanti);
> *input* = token letti pieni; *cache letta* = contesto riletto (~1/10 dell'input).

## In breve
- **15.8M token di output** (+ **4.4M** di agenti cloud) in **53 sessioni**
  su **11 progetti**, da 2026-05 a oggi. 9k messaggi totali.
- La **cache** ha riletto 2805.9M token (≈170× i token vivi): riprendere una
  chat con la cache calda è ciò che rende sostenibile il piano — ricominciare da zero la butta.

## Le cose che sono costate di più
| # | Cosa | Tipo | Quando | Token |
|---|---|---|---|---|
| 1 | Audit multi-agente ALTO su R6+R7.1 (45 finding confermati, 11 confutati) — poker (Who's the Boss) | agenti cloud | 2026-07-03 | 2.6M |
| 2 | WTB/Base_4 — poker (Who's the Boss) | chat | 2026-06-04 | 1.6M |
| 3 | (censurato) — progetto-15 | chat | 2026-05-29 | 1.5M |
| 4 | Audit multi-agente ALTO (12 confermati, 1 confutato + ombra Sonnet-vs-Opus) — progetto-15 | agenti cloud | 2026-07-03 | 1.1M |
| 5 | Poker_app/BASE — Libri-Organizzazione | chat | 2026-05-09 | 1.0M |
| 6 | (censurato) — progetto-15 | chat | 2026-05-29 | 878k |
| 7 | WTB/Base_5 — poker (Who's the Boss) | chat | 2026-07-01 | 795k |
| 8 | (censurato) — progetto-15 | chat | 2026-06-29 | 750k |

## Cosa abbiamo imparato sul costo (e ridotto davvero)
- **Audit multi-agente: il secondo è costato meno della metà.** Primo audit ALTO (poker):
  **67 agenti / 2,6M token**; secondo (progetto-15, con le regole di efficienza: dedup dei
  finding PRIMA delle verifiche, verifica adversariale solo su ALTA/MEDIA, cacce mirate):
  **21 agenti / 1,1M**, trovando comunque i bug critici veri. ⚠️ Onestà: progetti e scope
  **diversi** — è un'indicazione (N=1+1), non un confronto pulito dello stesso audit.
- **Ripartire da zero è lo spreco più grosso.** Sui nostri dati la cache ha riletto ~170× i
  token vivi (è la normale meccanica del prompt caching nelle chat lunghe — il punto
  azionabile è nostro): riprendere una chat/audit interrotto **riusando la cache** (il resume
  dell'audit poker ha riusato il 100% dei passi completati) costa ~1/10; ricominciare butta tutto.
- **Fable sui lavori lunghi non conviene**: l'audit poker su Fable si è fermato per la
  **finestra di utilizzo di 5 ore** del piano Max (il limite d'uso, non la finestra di
  contesto) → regola: lavori pesanti su Opus, **Fable solo per le decisioni che contano e i
  recap** (poco e bene).
- **Il modello grosso non serve ovunque.** Dai dati A/B: sulla verifica di codice la qualità
  Haiku/Sonnet/Opus era pari — paga il disegno del processo, non il modello caro ovunque.
  Da luglio i fix scoped girano su **Sonnet high** invece che Opus (blocco R6-B: 6 fasi,
  tutte verdi al primo colpo).
- **Imporre un processo a un modello forte costa e non rende** (probe 2026-06: braccio col
  pacchetto ~2× token del braccio cieco, esito uguale o peggiore) → il metodo ora *propone*
  invece di imporre, e il multi-agente si usa SOLO per audit/sweep, mai per coding lineare.

## Per progetto (clicca per il dettaglio delle sessioni)
| Progetto | Periodo | Sessioni | Output | Input | Cache letta |
|---|---|---|---|---|---|
| [poker (Who's the Boss)](per-progetto/poker-who-s-the-boss.md) | 2026-05-14 → 2026-07-14 | 20 | 6.7M | 324k | 1416.6M |
| [progetto-15](per-progetto/progetto-15.md) | 2026-05-29 → 2026-07-12 | 5 | 3.6M | 233k | 914.4M |
| [SideKick](per-progetto/sidekick.md) | 2026-06-03 → 2026-07-16 | 9 | 1.7M | 116k | 150.8M |
| [Libri-Organizzazione](per-progetto/libri-organizzazione.md) | 2026-05-07 → 2026-05-31 | 2 | 1.3M | 11k | 121.4M |
| [Programmi (root)](per-progetto/programmi-root.md) | 2026-05-31 → 2026-06-27 | 3 | 997k | 45k | 96.4M |
| [Text-Adventure-Engine](per-progetto/text-adventure-engine.md) | 2026-05-28 → 2026-05-29 | 1 | 466k | 370 | 54.3M |
| [esperimenti (test del metodo)](per-progetto/esperimenti-test-del-metodo.md) | 2026-06-04 → 2026-06-11 | 9 | 375k | 5k | 19.1M |
| [progetto-16](per-progetto/progetto-16.md) | 2026-06-28 → 2026-06-30 | 1 | 308k | 17k | 10.9M |
| [Idee](per-progetto/idee.md) | 2026-06-11 → 2026-06-12 | 1 | 270k | 6k | 12.8M |
| [progetto-22](per-progetto/progetto-22.md) | 2026-06-17 → 2026-06-17 | 1 | 52k | 8k | 2.2M |
| [weather-report](per-progetto/weather-report.md) | 2026-05-07 → 2026-05-07 | 1 | 42k | 137 | 6.8M |

## Lavoro degli agenti (workflow cloud — registro a mano)
I workflow multi-agente girano nel cloud e **non lasciano transcript sul PC**: questi numeri
vengono dai METRICHE/report dei progetti. **Dopo ogni nuovo workflow, aggiungere una riga a
`workflow.csv`** (il rituale dell'osservatorio lo ricorda).

| Data | Progetto | Operazione | Agenti | Token agenti |
|---|---|---|---|---|
| 2026-07-03 | poker (Who's the Boss) | Audit multi-agente ALTO su R6+R7.1 (45 finding confermati, 11 confutati) | 67 | 2.6M |
| 2026-07-03 | poker (Who's the Boss) | Ricerca modelli/effort per il metodo (dossier in SideKick esperimenti/) | 5 | 689k |
| 2026-07-03 | progetto-15 | Audit multi-agente ALTO (12 confermati, 1 confutato + ombra Sonnet-vs-Opus) | 21 | 1.1M |

## Per modello (solo chat locali)
| Modello | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| opus-4-8 | 5k | 626k | 10.8M | 1921.5M |
| opus-4-7 | 1k | 15k | 2.2M | 259.4M |
| sonnet-4-6 | 2k | 38k | 1.5M | 137.6M |
| fable-5 | 354 | 42k | 725k | 90.5M |
| sonnet-5 | 798 | 43k | 600k | 396.9M |

## Per mese
| Mese | Msg | Input | Output | Cache letta |
|---|---|---|---|---|
| 2026-05 | 2k | 82k | 4.0M | 396.6M |
| 2026-06 | 4k | 536k | 9.0M | 1557.8M |
| 2026-07 | 2k | 146k | 2.8M | 851.4M |
