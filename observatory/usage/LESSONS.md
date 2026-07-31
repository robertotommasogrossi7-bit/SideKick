# LESSONS (hand-curated by the observatory — embedded into the dashboard)

- **Multi-agent audit: the second one cost less than half.** First HIGH audit (poker):
  **67 agents / 2.6M tokens**; second (progetto-15, with the efficiency rules: dedup
  findings BEFORE the verifications, adversarial verification only on HIGH/MEDIUM,
  targeted hunts): **21 agents / 1.1M**, still finding the real critical bugs. ⚠️ Honesty:
  **different** projects and scope — it's an indication (N=1+1), not a clean comparison of
  the same audit.
- **Starting over from scratch is the biggest waste.** In our data cache reads dwarf the
  live tokens by two orders of magnitude — the live ratio is in "At a glance" above (this
  page stopped copying it by hand after it drifted twice: single source, the generated
  block). It's the normal mechanics of prompt caching in long chats (the actionable point
  is ours): resuming an interrupted chat/audit **reusing the cache** (the poker audit's
  resume reused 100% of the completed steps) costs ~1/10; starting over throws it all away.
- **Fable on long jobs doesn't pay off**: the poker audit on Fable stopped because of the
  **5-hour usage window** of the Max plan (the usage limit, not the context window) → rule:
  heavy jobs on Opus, **Fable only for the decisions that matter and recaps** (little and
  well).
- **The big model isn't needed everywhere.** From the A/B data: on code verification, quality
  across Haiku/Sonnet/Opus was equal — what pays off is the process design, not the expensive
  model everywhere. Since July, scoped fixes run on **Sonnet high** instead of Opus (block
  R6-B: 6 phases, all green on the first try).
- **Imposing a process on a strong model costs and doesn't pay off** (2026-06 probe: the arm
  with the package used ~2× the tokens of the blind arm, same or worse outcome) → the method now
  *proposes* instead of imposing, and multi-agent is used ONLY for audit/sweep, never for linear
  coding.
- **What the flat plan is actually worth (API list-price equivalent).** The live total,
  its cache-dominated composition and the measured workflow line are all in "At a glance"
  above — the constant across every count so far: **the bulk is cache** (reads + writes;
  generated output is a small slice). The honest reading: this is the value of the working
  style the flat plan makes possible (long chats, resumes, agent fleets re-reading
  context), not money that would otherwise have been spent — priced per token, we would
  have worked completely differently. Full mechanics + declared limits: `SCHEMA.md`.
