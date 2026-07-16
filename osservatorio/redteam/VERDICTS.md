# Red team 2026-07-16 — verdicts, verifications, actions

> Double run on the same dossier: **Claude** (⚠️ self-declared contaminated: it had memory
> of the projects — rigor score 4/10) and **ChatGPT** (clean — scores per aspect, e.g.
> originality 9/10, communication 5.5/10). Rule applied: **every reviewer claim was
> verified before acting on it**. The full texts are in the 2026-07-16 observatory chat.
> The operational red-team kit (cynical prompt + self-contained dossier to paste into fresh AI
> chats) is in Italian at `../../versione-italiano/osservatorio/redteam/` (PROMPT.md, DOSSIER.md).

## Where the two verdicts CONVERGE (→ line for the README)
1. **The value for a stranger is**: FINDINGS.md (honestly told failure) + the **reusable
   tools** (consumo.mjs, cost-meter, hidden-test oracle) + the **real per-session consumption
   dataset** (almost nobody publishes this). → They must OPEN the README.
2. **The meta-structure (constitution, observatory, governance) dilutes the value** if
   presented as the repo's identity → in public it should be reduced/moved to an appendix;
   self-amendment presented as a hypothesis, not as an identity.
3. **Small N's formulated as rules** → reword as "operating hypotheses (N=…)".
4. Meta-work/product ratio = reputational risk: more *shipped* things are needed.

## Verification of the reviewers' claims (done at the source)
| Reviewer claim | Verification outcome | Action |
|---|---|---|
| "Sonnet's tokenizer: almost certainly an error, verify" (Claude) | **Reviewer DISPROVED**: the official Sonnet 5 page confirms "updated tokenizer… roughly 1.0–1.35× more tokens" | Claim kept, with source and re-verification date ✅ |
| "5h of context" confuses usage window and context window (Claude) | **True**: it was the USAGE window (Max plan's 5h usage limit) | Fixed in CONSTITUTION (2 spots) + LESSONS ✅ |
| "−60% between audits: different projects, not a comparison" (Claude) | **True** | Reworded with the caveat in LESSONS + STRATEGIES ✅ |
| "170× cache sold as a discovery: it's normal caching mechanics" (Claude) | **Half true**: the mechanics are known, the data measured on OUR transcripts and the handoff rule are the contribution | Reworded in LESSONS ✅ |
| "45 confirmed = agents verifying agents, circular" (Claude) | **Answer existed but wasn't written down**: over 30 findings were then fixed and validated by green tests/typecheck | Added "anti-circularity" in STRATEGIES ✅ |
| Inconsistencies 23 vs 11 projects · 6.1M vs 6.7M (Claude) | **True** (folders vs. grouped; without/with worktree) | Both clarified in DATA ✅ |
| "progetto-15 redaction is cosmetic, you're telling third parties' bugs" (Claude) | **Partially**: it's a project OF Roberto's (not a third party's), not yet public | ✅ Decided 2026-07-16: keep the generic phrasing ("found and fixed before launch" is a good story); reassess at the app's launch |
| "Spotify rule = beginner cargo-cult in public" (both, different tones) | Opinion, not fact | ✅ Decided 2026-07-16: rule reworded as "industry leader" (professional companies/apps/software, working and at the top of their respective industry; Spotify only as an example) — and kept out of the public showcase |
| "Benchmarks are needed, not case studies" (ChatGPT) | True as framing | The repo presents itself as a **case study/exploratory research**, never as a benchmark |

## Actions for the repositioning (update PLAN §3)
1. New README order: **(1) what you take away** (tool + CSV dataset + FINDINGS writeup) →
   (2) the experiments and the data → (3) the method as an appendix with a link (short public
   version; the full constitution stays in the repo for whoever wants it).
2. Language: "operating hypotheses (N=…)" instead of "rules/lessons" in public material.
3. Explicit "what did NOT work" section (already in FINDINGS/STRATEGIES: put it in evidence).
4. Tools separated from the method (clear `tools` folder/section, dedicated README for tools).
5. Budget: ~80% experiments / 20% method maintenance from here on (ROI verdict from both
   reviewers — consistent with our own STRATEGIES register).
