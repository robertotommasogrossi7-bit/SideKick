# Dataset releases — notes per tagged version

> One section per git tag. The GitHub "Release" entry is created by hand from these notes
> (tag → *Create release from tag* → paste the section).

## dataset-v0.1 — 2026-07-31

First tagged release of the observatory's **token & cost dataset** — real usage data from one person working with an AI coding agent, May → July 2026, extracted from local transcripts by [`usage.mjs`](../usage.mjs) (no hand-recorded consumption anywhere).

### What's in the dataset (this folder)
- **`usage.csv`** — per project × model × month: messages, input/output, cache read/written, `cost_usd_equiv`, `cost_partial`.
- **`sessions.csv`** — one row per session (period, operation title, models, tokens, cost).
- **`daily.csv`** — one row per calendar day, all projects/models folded together.
- **`prices.csv`** — hand-maintained per-model API prices with validity windows, source URL and verification date per row.
- **`workflow.csv`** — hand-maintained register of cloud multi-agent workflows (they leave no local transcripts), incl. the `5h_windows` column (plan windows consumed, only when observed).
- **`SCHEMA.md`** — column-by-column data dictionary, units, dedup/redaction caveats.
- **`DASHBOARD.md` + `dashboard.html`** — generated views (the HTML is self-contained: sortable tables, SVG charts, zero CDN). Italian mirror auto-generated in `ITALIANO/osservatorio/uso/`.

### New since the schema landed
`prices.csv` with verified sources · `cost_usd_equiv`/`cost_partial` columns · `daily.csv` · self-contained bilingual `dashboard.html` · **workflow costs measured** from local per-agent transcripts (last-snapshot dedup of streaming usage records), never estimated.

### Snapshot at this tag (generated 2026-07-31)
70 sessions, 12 projects, ~12k unique messages · **19.4M output tokens** + **51.6M cloud-agent tokens** · cache re-reads 3,885M (~192× live tokens) · API cost-equivalent **$4.0k*** (partial) · workflows measured from local transcripts: **$321.07 across 10 of 20 registered runs**.

### Honest limits (unchanged)
The cost is an **API equivalent, NOT what the flat plan actually bills**; models/dates without a verified price contribute $0 and mark the row `cost_partial` (never an invented number); cloud workflows without local transcripts stay unpriced (`—`); private projects are redacted at the source, the legend never leaves the machine.

Generator and meter both have fixture-based tests (20 green) run by CI on every push.
