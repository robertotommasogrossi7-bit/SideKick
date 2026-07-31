# Schema del dataset — i CSV documentati

> Vale per `usage.csv`, `sessions.csv`, `daily.csv`, `prices.csv`, `workflow.csv` in questa
> cartella (più `DASHBOARD.md`/`dashboard.html`, generati dagli stessi dati). I file generati
> vengono ricostruiti da `observatory/usage.mjs`; `workflow.csv` e `prices.csv` sono curati a
> mano.

## Fatti comuni (da leggere per primi)
- **Unità**: token, come riportati dall'API Claude nel blocco `usage` di ogni messaggio
  dell'assistente nei transcript locali (`~/.claude/projects/**/*.jsonl`). Nessuna stima in
  nessun file derivato dai transcript. L'unica eccezione vive nel `workflow.csv` curato a
  mano: una riga con la colonna `estimated` valorizzata porta una stima da report, non un
  conteggio — queste righe (e ogni totale che le include) sono mostrate con un prefisso `~`,
  mai come esatte.
- **Dedup**: lo stesso `message.id` può ricomparire nei transcript dopo un resume/fork; viene
  contato **una sola volta** (coperto da test).
- **Censura**: i progetti riservati compaiono come `progetto-NN` con operazioni
  `(redacted)`; la legenda vive solo sulla macchina dell'autore. I progetti nuovi nascono
  censurati.
- **Tipi di token**: `input_tokens`/`output_tokens` sono token "vivi" fatturati a prezzo pieno;
  `cache_read` è contesto riletto (~1/10 del prezzo dell'input); `cache_written` è creazione
  di cache (~1,25× il prezzo dell'input, al tasso dei 5 minuti — vedi la sezione `prices.csv`
  più sotto per il perché). L'output è il tipo più scarso/costoso.
- **Cosa NON c'è qui**: i workflow cloud multi-agente non lasciano transcript locali — vengono
  registrati a mano in `workflow.csv` e vanno aggiunti a qualunque totale.
- **Il costo è una stima equivalente-API, non una fattura.** `cost_usd_equiv` prezza i token
  ai tassi API a consumo di `prices.csv`, prezzato messaggio per messaggio al modello+data che
  lo ha prodotto (le date contano: es. il prezzo introduttivo di `sonnet-5` cambia il
  2026-09-01). **NON è ciò che viene fatturato** sul piano Max/Pro (finestre flat da 5 ore, non
  a consumo per token) — la dashboard ripete questo avviso ogni volta che mostra una cifra di
  costo. I numeri senza un prezzo verificato in `prices.csv` **non vengono mai inventati**:
  contribuiscono `$0` e impostano `cost_partial=true` (mostrato come `*` nelle dashboard
  generate, o come `—` quando l'intera cifra è ignota — vedi `fmtCosto` in `usage.mjs`).

## `usage.csv` — una riga per progetto × modello × mese
| Colonna | Significato |
|---|---|
| `project` | Alias del progetto (nome censurato se riservato). Worktree e cartelle raggruppate NON sono unificate qui (granularità grezza). |
| `model` | Id breve del modello (es. `opus-4-8`, `sonnet-5`); i suffissi di data sono tolti; le righe sintetiche/di sistema sono escluse. |
| `month` | `YYYY-MM` dal timestamp del messaggio. |
| `messages` | Messaggi unici dell'assistente contati dopo il dedup. |
| `input_tokens` / `output_tokens` | Token vivi (vedi sopra). |
| `cache_read` / `cache_written` | Token di cache (vedi sopra). |
| `cost_usd_equiv` | USD equivalente-API per questa riga, prezzato messaggio per messaggio da `prices.csv` (6 decimali: le righe possono valere una frazione di centesimo). Aggiunta 2026-07-25. |
| `cost_partial` | `true` se almeno un messaggio in questa riga non aveva un prezzo verificato (il costo è un minimo, non il numero completo); `false` se ogni messaggio è stato prezzato. Aggiunta 2026-07-25. |

## `sessions.csv` — una riga per sessione di chat (quella cercabile)
| Colonna | Significato |
|---|---|
| `group` | Il progetto reale dopo il raggruppamento (i worktree confluiscono nel progetto padre, i bracci di test del metodo confluiscono in un unico gruppo). |
| `project` | L'alias grezzo prima del raggruppamento. |
| `session` | I primi 8 caratteri dell'id di sessione. |
| `start` / `end` | Data del primo e dell'ultimo messaggio (`YYYY-MM-DD`). |
| `operation` | **L'operazione con nome**: il titolo della chat dato dall'utente (es. `WTB/Base_4`), altrimenti il titolo generato dall'AI, altrimenti il primo messaggio utente; `(redacted)` per i progetti riservati. |
| `models` | Modelli usati, in ordine di quota di output (`a + b` oppure `a +N`). |
| `messages`, `input_tokens`, `output_tokens`, `cache_read`, `cache_written` | Come sopra, sommati sulla sessione. |
| `cost_usd_equiv`, `cost_partial` | Come in `usage.csv`, sommati sulla sessione. Aggiunta 2026-07-25. |

## `daily.csv` — una riga per giorno di calendario (TUTTI i progetti/modelli uniti)
> Aggiunta 2026-07-25. Globale, non per progetto (una tabella per-progetto × per-giorno
> farebbe esplodere il numero di file per poco guadagno) — filtrala tu stesso (`grep`/foglio
> di calcolo) se ti serve un solo progetto.

| Colonna | Significato |
|---|---|
| `date` | `YYYY-MM-DD`, dal timestamp del messaggio. |
| `messages`, `input_tokens`, `output_tokens`, `cache_read`, `cache_written`, `cost_usd_equiv`, `cost_partial` | Stesso significato di `usage.csv`, sommati su ogni progetto/modello con attività quel giorno. |

**Limite dichiarato**: le sezioni "Per giorno"/"Per settimana" della dashboard mostrano solo
la finestra più recente (30 giorni / 12 settimane ISO di default — vedi `FINESTRA_GIORNI`/
`FINESTRA_SETTIMANE` in `usage.mjs`) così le tabelle restano leggibili man mano che la storia
cresce; niente va perso — la serie completa è sempre in `daily.csv`, e il ripiegamento
settimanale è una pura ri-aggregazione in memoria (nessuna nuova scansione dei transcript,
calcolata una volta e condivisa da entrambe le dashboard).

## `prices.csv` — USD per MTok (milione di token), curato a mano, una riga per modello per finestra di validità
| Colonna | Significato |
|---|---|
| `model` | Id breve del modello, coerente con la colonna `model` di `usage.csv`. |
| `input_per_mtok` / `output_per_mtok` | Prezzo del token vivo, USD per milione di token. |
| `cache_read_per_mtok` | Prezzo di lettura cache (~0,1× l'input, secondo il moltiplicatore ufficiale di Anthropic). |
| `cache_write_per_mtok` | Prezzo di scrittura cache **al tasso dei 5 minuti** (~1,25× l'input). **Limite dichiarato**: i transcript riportano un solo numero aggregato di "creazione cache" (`cache_creation_input_tokens`), senza distinzione 5-minuti/1-ora, quindi un messaggio che in realtà ha usato la cache più cara a 1 ora (2× l'input, non 1,25×) qui risulta sottoprezzato — non c'è modo di distinguere i due casi dai soli dati locali. |
| `effective_from` / `effective_until` | Finestra di validità `YYYY-MM-DD` (un lato vuoto = aperta). Permette a un modello di avere più righe nel tempo — es. il prezzo introduttivo di `sonnet-5` ($2/$10) scade il 2026-08-31, poi si applica il prezzo standard ($3/$15) dal 2026-09-01. `usage.mjs` sceglie la riga la cui finestra contiene la data del messaggio. |
| `status` | `verified` = prezzato da una fonte viva e datata (solo queste righe prezzano qualcosa). Qualunque altro valore (es. un futuro `unverified`) viene ignorato — un modello/data senza una riga `verified` corrispondente contribuisce `$0` e marca il totale `cost_partial=true` (mai un numero inventato). |
| `source_url` | Dove il prezzo è stato verificato (es. `https://platform.claude.com/docs/en/about-claude/pricing`). |
| `verified_date` | `YYYY-MM-DD` dell'ultimo controllo del prezzo rispetto alla fonte. I prezzi si spostano — riverifica periodicamente, specie intorno ai cambi annunciati (es. il prezzo standard di `sonnet-5` il 2026-09-01). |

Prezzi correnti (tutti `verified`, fonte `https://platform.claude.com/docs/en/about-claude/pricing`,
controllati il 2026-07-25): `opus-4-7`/`opus-4-8` $5/$25, `sonnet-4-6` $3/$15, `sonnet-5` $2/$10 fino
al 2026-08-31 poi $3/$15, `haiku-4-5` $1/$5, `fable-5` $10/$50 (tutti input/output per MTok).

**Costi dei workflow: misurati dove possibile, mai stimati.** `workflow.csv` di per sé non ha
un dettaglio per modello, quindi le righe NON vengono prezzate dal loro `agent_tokens`. Ma
quando un run è stato eseguito su questa macchina, i suoi transcript per-agente
(`<progetto>/<sessione>/subagents/workflows/wf_*/agent-*.jsonl`) vengono prezzati messaggio
per messaggio con lo stesso `prices.csv` (abbinati tramite l'id `wf_...` citato nel campo
`source` della riga; i transcript degli agenti ripetono lo stesso `message.id` con snapshot di
streaming CRESCENTI, quindi lì il dedup è ultimo-record-vince — i transcript delle chat
ripetono gli id con lo stesso usage identico, verificato 2026-07-25, e restano primo-vince).
I run eseguiti nel cloud non lasciano nulla in locale e restano `—`. I costi dei workflow
compaiono come propria riga/colonna di riepilogo e non vengono mai fusi nei totali
`cost_usd_equiv` delle chat.

## `workflow.csv` — una riga per workflow cloud multi-agente (curato a mano)
| Colonna | Significato |
|---|---|
| `date` | Data del run (`YYYY-MM-DD`). |
| `project` | Alias del progetto. |
| `operation` | Cosa ha fatto il workflow (audit, ricerca, traduzione…). |
| `agents` | Numero di agenti nel run. |
| `agent_tokens` | Token totali dei subagenti come riportati dal run/dai record. |
| `source` | Da dove viene il numero (METRICHE del progetto, report del run, log della chat). |
| `5h_windows` | Quante finestre di utilizzo di 5 ore del piano il run ha consumato, **col piano indicato per nome** (es. `~3 (Max 100 euro)`). Compilata SOLO quando nota con certezza da esaurimenti osservati dei blocchi di credito — mai stimata dai token. Vuota = non osservata. Aggiunta 2026-07-25 (metodo v1.9); colonna finale, le righe più vecchie semplicemente non ce l'hanno. |
| `estimated` | Non vuota (`yes`) = `agents`/`agent_tokens` di questa riga sono **stime dal report del run** (run cloud senza transcript locali), non conteggi misurati. Le dashboard prefissano questi token — e ogni totale che li contiene — con `~`. Aggiunta 2026-08-01 (finding del red team esterno: una stima non segnalata era il 19% del totale cloud principale); colonna finale, le righe più vecchie semplicemente non ce l'hanno. |

## `dashboard.html` — stessi numeri di `DASHBOARD.md`, come pagina interattiva
Aggiunta 2026-07-25. Autocontenuta (zero CDN, zero build step — CSS/JS incorporati, dati
incorporati al momento della generazione), sensibile a dark/light (`prefers-color-scheme`),
con tabelle ordinabili al click e due piccoli grafici a barre SVG incorporati (token di output
mensili, costo settimanale). Rigenerata a ogni run di `node observatory/usage.mjs`, in
entrambe le lingue, accanto a ogni `DASHBOARD.md`.
