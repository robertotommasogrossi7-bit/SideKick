# Dataset schema — the CSVs documented

> Applies to `usage.csv`, `sessions.csv`, `workflow.csv` in this folder. Generated files are
> rebuilt by `observatory/usage.mjs`; `workflow.csv` is hand-maintained.

## Common facts (read first)
- **Unit**: tokens, as reported by the Claude API in each assistant message's `usage` block
  of the local transcripts (`~/.claude/projects/**/*.jsonl`). No estimates.
- **Dedup**: the same `message.id` can reappear in transcripts after a resume/fork; it is
  counted **once** (covered by tests).
- **Redaction**: reserved projects appear as `progetto-NN` with `(redacted)` operations; the
  legend lives only on the author's machine. New projects are born redacted.
- **Token kinds**: `input_tokens`/`output_tokens` are "live" tokens billed at full price;
  `cache_read` is context re-read (~1/10 of input price); `cache_written` is cache creation
  (~1.25× input price). Output is the scarcest/most expensive kind.
- **What is NOT here**: cloud multi-agent workflows leave no local transcripts — they are
  registered by hand in `workflow.csv` and must be added to any total.

## `usage.csv` — one row per project × model × month
| Column | Meaning |
|---|---|
| `project` | Project alias (redacted name if reserved). Worktrees and grouped folders are NOT merged here (raw granularity). |
| `model` | Short model id (e.g. `opus-4-8`, `sonnet-5`); date suffixes stripped; synthetic/system rows excluded. |
| `month` | `YYYY-MM` from the message timestamp. |
| `messages` | Unique assistant messages counted after dedup. |
| `input_tokens` / `output_tokens` | Live tokens (see above). |
| `cache_read` / `cache_written` | Cache tokens (see above). |

## `sessions.csv` — one row per chat session (the searchable one)
| Column | Meaning |
|---|---|
| `group` | The real project after grouping (worktrees merged into their parent, method-test arms into one group). |
| `project` | The raw alias before grouping. |
| `session` | First 8 chars of the session id. |
| `start` / `end` | First and last message date (`YYYY-MM-DD`). |
| `operation` | **The named operation**: the user-given chat title (e.g. `WTB/Base_4`), else the AI title, else the first user message; `(redacted)` for reserved projects. |
| `models` | Models used, ordered by output share (`a + b` or `a +N`). |
| `messages`, `input_tokens`, `output_tokens`, `cache_read`, `cache_written` | As above, summed over the session. |

## `workflow.csv` — one row per cloud multi-agent workflow (hand-kept)
| Column | Meaning |
|---|---|
| `date` | Run date (`YYYY-MM-DD`). |
| `project` | Project alias. |
| `operation` | What the workflow did (audit, research, translation…). |
| `agents` | Number of agents in the run. |
| `agent_tokens` | Total subagent tokens as reported by the run/records. |
| `source` | Where the number comes from (project METRICHE, run report, chat log). |
