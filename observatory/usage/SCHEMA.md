# Dataset schema — the CSVs documented

> Applies to `usage.csv`, `sessions.csv`, `daily.csv`, `prices.csv`, `workflow.csv` in this
> folder (plus `DASHBOARD.md`/`dashboard.html`, generated from the same data). Generated files
> are rebuilt by `observatory/usage.mjs`; `workflow.csv` and `prices.csv` are hand-maintained.

## Common facts (read first)
- **Unit**: tokens, as reported by the Claude API in each assistant message's `usage` block
  of the local transcripts (`~/.claude/projects/**/*.jsonl`). No estimates.
- **Dedup**: the same `message.id` can reappear in transcripts after a resume/fork; it is
  counted **once** (covered by tests).
- **Redaction**: reserved projects appear as `progetto-NN` with `(redacted)` operations; the
  legend lives only on the author's machine. New projects are born redacted.
- **Token kinds**: `input_tokens`/`output_tokens` are "live" tokens billed at full price;
  `cache_read` is context re-read (~1/10 of input price); `cache_written` is cache creation
  (~1.25× input price, at the 5-minute rate — see the `prices.csv` section below for why).
  Output is the scarcest/most expensive kind.
- **What is NOT here**: cloud multi-agent workflows leave no local transcripts — they are
  registered by hand in `workflow.csv` and must be added to any token total.
- **Cost is an API-equivalent estimate, not a bill.** `cost_usd_equiv` prices tokens at the
  pay-as-you-go API rates in `prices.csv`, priced per message at the model+date that produced
  it (dates matter: e.g. `sonnet-5`'s introductory price changes 2026-09-01). **This is NOT
  what is billed on the Max/Pro plan** (flat 5-hour usage windows, not pay-per-token) — the
  dashboard repeats this disclaimer every time it shows a cost figure. Numbers with no
  verified price in `prices.csv` are **never invented**: they contribute `$0` and set
  `cost_partial=true` (shown as `*` in the rendered dashboards, or as `—` when the entire
  figure is unknown — see `fmtCosto` in `usage.mjs`).

## `usage.csv` — one row per project × model × month
| Column | Meaning |
|---|---|
| `project` | Project alias (redacted name if reserved). Worktrees and grouped folders are NOT merged here (raw granularity). |
| `model` | Short model id (e.g. `opus-4-8`, `sonnet-5`); date suffixes stripped; synthetic/system rows excluded. |
| `month` | `YYYY-MM` from the message timestamp. |
| `messages` | Unique assistant messages counted after dedup. |
| `input_tokens` / `output_tokens` | Live tokens (see above). |
| `cache_read` / `cache_written` | Cache tokens (see above). |
| `cost_usd_equiv` | API-equivalent USD for this row, priced message-by-message from `prices.csv` (6 decimals: rows can be a fraction of a cent). Added 2026-07-25. |
| `cost_partial` | `true` if at least one message in this row had no verified price (the cost is a floor, not the full number); `false` if every message was priced. Added 2026-07-25. |

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
| `cost_usd_equiv`, `cost_partial` | As in `usage.csv`, summed over the session. Added 2026-07-25. |

## `daily.csv` — one row per calendar day (ALL projects/models folded together)
> Added 2026-07-25. Global, not per-project (a per-project × per-day table would explode the
> file count for little gain) — filter it yourself (`grep`/spreadsheet) if you need one project.

| Column | Meaning |
|---|---|
| `date` | `YYYY-MM-DD`, from the message timestamp. |
| `messages`, `input_tokens`, `output_tokens`, `cache_read`, `cache_written`, `cost_usd_equiv`, `cost_partial` | Same meaning as `usage.csv`, summed across every project/model that had activity that day. |

**Declared limit**: the dashboard's "By day"/"By week" sections only show the most recent
window (30 days / 12 ISO weeks by default — see `FINESTRA_GIORNI`/`FINESTRA_SETTIMANE` in
`usage.mjs`) so the tables stay readable as history grows; nothing is lost — the full series
is always in `daily.csv`, and the weekly fold is a pure in-memory re-aggregation of it (no
re-scan of transcripts, computed once and shared by both dashboards).

## `prices.csv` — USD per MTok (million tokens), hand-maintained, one row per model per validity window
| Column | Meaning |
|---|---|
| `model` | Short model id, matching `usage.csv`'s `model` column. |
| `input_per_mtok` / `output_per_mtok` | Live-token price, USD per million tokens. |
| `cache_read_per_mtok` | Cache-read price (~0.1× input, per Anthropic's official multiplier). |
| `cache_write_per_mtok` | Cache-write price **at the 5-minute rate** (~1.25× input). **Declared limit**: the transcripts report only ONE aggregate "cache creation" number (`cache_creation_input_tokens`), with no 5-minute/1-hour split, so a message that actually used the pricier 1-hour cache (2× input, not 1.25×) is under-priced here — there is no way to tell the two apart from the local data alone. |
| `effective_from` / `effective_until` | `YYYY-MM-DD` validity window (either side empty = open-ended). Lets a model have several rows across time — e.g. `sonnet-5`'s introductory price ($2/$10) expires 2026-08-31, then the standard price ($3/$15) applies from 2026-09-01. `usage.mjs` picks the row whose window contains the message's date. |
| `status` | `verified` = priced from a live, dated source (only these rows price anything). Any other value (e.g. a future `unverified`) is ignored — a model/date with no matching `verified` row contributes `$0` and marks the total `cost_partial=true` (never an invented number). |
| `source_url` | Where the price was verified (e.g. `https://platform.claude.com/docs/en/about-claude/pricing`). |
| `verified_date` | `YYYY-MM-DD` the price was last checked against the source. Prices drift — re-verify periodically, especially around announced changes (e.g. `sonnet-5` standard pricing on 2026-09-01). |

Current prices (all `verified`, source `https://platform.claude.com/docs/en/about-claude/pricing`,
checked 2026-07-25): `opus-4-7`/`opus-4-8` $5/$25, `sonnet-4-6` $3/$15, `sonnet-5` $2/$10 until
2026-08-31 then $3/$15, `haiku-4-5` $1/$5, `fable-5` $10/$50 (all input/output per MTok).

**Cloud-agent workflows are never priced** (declared limit, not a gap to "fix"): `workflow.csv`
has no per-model token breakdown (`agent_tokens` is an aggregate across a mixed fleet of
models), so `costoMessaggio` has nothing to price it against. Their tokens are excluded from
every USD total in the dashboards; grep the register + the Anthropic Console if a real cost
figure for a specific workflow is ever needed.

## `workflow.csv` — one row per cloud multi-agent workflow (hand-maintained)
| Column | Meaning |
|---|---|
| `date` | Run date (`YYYY-MM-DD`). |
| `project` | Project alias. |
| `operation` | What the workflow did (audit, research, translation…). |
| `agents` | Number of agents in the run. |
| `agent_tokens` | Total subagent tokens as reported by the run/records. |
| `source` | Where the number comes from (project METRICHE, run report, chat log). |
| `5h_windows` | How many 5-hour plan usage windows the run consumed, **with the plan named** (e.g. `~3 (Max 100 euro)`). Filled ONLY when known with certainty from observed credit-block exhaustions — never estimated from tokens. Empty = not observed. Added 2026-07-25 (method v1.9); trailing column, older rows simply lack it. |

## `dashboard.html` — same numbers as `DASHBOARD.md`, as an interactive page
Added 2026-07-25. Self-contained (zero CDN, zero build step — CSS/JS inlined, data baked in
at generation time), dark/light aware (`prefers-color-scheme`), with click-to-sort tables and
two small inline-SVG bar charts (monthly output tokens, weekly cost). Regenerated on every
`node observatory/usage.mjs` run, in both languages, next to each `DASHBOARD.md`.
