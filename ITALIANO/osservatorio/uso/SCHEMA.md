# Schema del dataset — i CSV documentati

> Vale per `usage.csv`, `sessions.csv`, `workflow.csv` in questa cartella. I file generati
> vengono ricostruiti da `observatory/usage.mjs`; `workflow.csv` è curato a mano.

## Fatti comuni (da leggere per primi)
- **Unità**: token, come riportati dall'API Claude nel blocco `usage` di ogni messaggio
  dell'assistente nei transcript locali (`~/.claude/projects/**/*.jsonl`). Nessuna stima.
- **Dedup**: lo stesso `message.id` può ricomparire nei transcript dopo un resume/fork; viene
  contato **una sola volta** (coperto da test).
- **Censura**: i progetti riservati compaiono come `progetto-NN` con operazioni
  `(redacted)`; la legenda vive solo sulla macchina dell'autore. I progetti nuovi nascono
  censurati.
- **Tipi di token**: `input_tokens`/`output_tokens` sono token "vivi" fatturati a prezzo pieno;
  `cache_read` è contesto riletto (~1/10 del prezzo dell'input); `cache_written` è creazione
  di cache (~1,25× il prezzo dell'input). L'output è il tipo più scarso/costoso.
- **Cosa NON c'è qui**: i workflow cloud multi-agente non lasciano transcript locali — vengono
  registrati a mano in `workflow.csv` e vanno aggiunti a qualunque totale.

## `usage.csv` — una riga per progetto × modello × mese
| Colonna | Significato |
|---|---|
| `project` | Alias del progetto (nome censurato se riservato). Worktree e cartelle raggruppate NON sono unificate qui (granularità grezza). |
| `model` | Id breve del modello (es. `opus-4-8`, `sonnet-5`); i suffissi di data sono tolti; le righe sintetiche/di sistema sono escluse. |
| `month` | `YYYY-MM` dal timestamp del messaggio. |
| `messages` | Messaggi unici dell'assistente contati dopo il dedup. |
| `input_tokens` / `output_tokens` | Token vivi (vedi sopra). |
| `cache_read` / `cache_written` | Token di cache (vedi sopra). |

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
