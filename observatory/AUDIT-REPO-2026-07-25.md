# SideKick repository audit — final synthesis

**Run date:** 2026-07-25 · **Scope:** personal-showcase repository `C:/Users/rober/Desktop/Programmi/SideKick` (case study with real data, small N declared) · **Mode:** read-only, no fixes applied.

## 1. Purpose, scope, and process

**Purpose.** Verify the coherence, credibility, and navigability of the repo as an outside reader encounters it — recruiter, method adopter, curious visitor — without applying an enterprise lens: this is a personal lab run by a beginner developer, with N=1-2 declared and negative results published on purpose. Purely theoretical risks were discarded during verification.

**Scope.** Public READMEs (root + `ITALIANO/`), method documentation (`plugins/metodo/`), observatory data (`observatory/`: `DATA.md`, token dashboard, per-project drilldowns, `workflow.csv`), preview screenshots (`docs/img/`), and the Italian bridge (`versione-italiano/`).

**Process (multi-agent, with adversarial verification).**
- **3 internal red teams** with different lenses (first impression/credibility · data/version consistency · navigation/i18n) produced the raw findings.
- **5 reviewers** extended coverage to the generator code (`usage.mjs`), source CSVs, and git history.
- **Dedup** of overlapping findings before verification (so the same bug isn't paid for twice).
- **Per-finding adversarial verification:** a second agent tried to *refute* each finding by reading the actual files and commit history, recalibrating severity downward when context softened the problem.
- **Single synthesis** (this document).

**Counts.**
- **CONFIRMED** and verified findings: **14** — of which **1 high**, **8 medium**, **5 low** (the latter confirmed but downgraded during verification from medium/high to low).
- **Low, unverified** findings (passed unverified by policy, they cost more than their usefulness): **4**.
- Findings **REFUTED** by verification: **0**.
- **Calibration note:** verification downgraded **5** of 14 severities (one from high to medium, four from medium to low) and **confirmed 1** that the red team had already raised to high (`studio.md`). No alarmism survived as an unjustified "high."

## 2. What the 3 personas say

**The recruiter (first impression).** They open the README and the first substantial thing they read is a quote about a negative outcome ("I tried to measure... and I haven't managed to, yet"). The exploratory framing is stated well a few lines below, and the concrete data point — the multi-agent audit that found real bugs — exists, but further down in the file, not next to the quote. The repo *works* for a technical recruiter: it's honest and the data is real. The risk is purely one of narrative sequencing: the first screen sells the honesty of failure before the result achieved. No false data, no broken promise.

**The method adopter (someone who wants to copy the constitution).** Here lies the gap most irritating for this audience: the `COSTITUZIONE.md` file that users are invited to copy into `~/.claude/CLAUDE.md` **never states its own version number**, and none of the READMEs link to `CHANGELOG.md` (the only place where the number lives). On top of that, the Spec Kit drop-in self-declares `1.9.1` while three independent sources say `1.9.0`. For a repo that treats versioning and the data contract as a core value, this is a contradiction of its own principle — it breaks nothing, but it undermines trust precisely where the method promises rigor.

**The visitor (navigation and "live data").** The Italian reader gets bounced between two Italian trees (`ITALIANO/` and `versione-italiano/`) with no entry point explaining the difference, and the landing page (`LEGGIMI.md`) doesn't even mention the existence of the more recent mirror. On the data front: the "live data" section shows a screenshot frozen at 2026-07-17 while the real numbers (in the `.md`, updated today) have grown — and a per-project drilldown (`Studio`) hides ~20M tokens because of a string-match bug in the generator. The real data exists and is browsable; it's the showcase around it that has maintenance debt.

## 3. Indexed register — CONFIRMED findings (by severity)

### HIGH

| ID | Sev | Where | Problem | Proposed fix (1 line) | Source |
|----|-----|------|----------|----------------------|-------|
| **AR-01** | high | `observatory/usage/per-project/studio.md:1` | The `Studio` drilldown shows 4 sessions / 873k output and **no** "Cloud agent workflows" section, omitting ~20.5M tokens (5 runs): `usage.mjs`'s `gruppoDi()` has special cases only for `poker`/`weather-report`, so `workflow.csv` rows with project `Studio (ponte)`/`Studio (StudioQuest)` don't match the `Studio` group and the section is silently excluded | Add a `Studio (...)` → `Studio` prefix mapping in `gruppoDi()` (as already exists for poker/weather-report), or align the `project` strings in `workflow.csv` | `usage.mjs:54-59` (`gruppoDi`) + `:179` (`wf = workflow.filter(...)`); `workflow.csv:8-12`; `sessions.csv:59-62`; section present in `sidekick.md`/`progetto-15.md`/`poker-who-s-the-boss.md` |

### MEDIUM

| ID | Sev | Where | Problem | Proposed fix (1 line) | Source |
|----|-----|------|----------|----------------------|-------|
| **AR-02** | medium | `README.md:5` and `:102-104` | Two different Italian links (`ITALIANO/` vs `versione-italiano/`) with no explanation of the relationship; the loop repeats inside `ITALIANO/README.md:110-112`, which despite declaring itself a mirror still points back to the other folder — no entry point disambiguates | Add one line to both READMEs: "`ITALIANO/` = live translated mirror; `versione-italiano/` = archive frozen at 2026-07-17" | `README.md:5`, `:102-104`; `ITALIANO/README.md:1-2`, `:110-112`; the real explanation exists only in `versione-italiano/LEGGIMI.md:3-6` |
| **AR-03** | medium | `versione-italiano/LEGGIMI.md:1` | The file both READMEs link as "Italian working documentation" never mentions `ITALIANO/` (0 occurrences), even though `ITALIANO/` was created on that same day, 2026-07-25; anyone following the link leaves the mirror without knowing it exists | Add a line at the top of `LEGGIMI.md` pointing to `ITALIANO/` as the live mirror, or consolidate into a single Italian folder | grep `ITALIANO` on `LEGGIMI.md` → 0; `README.md:102-104` + `ITALIANO/README.md:108-112`; `OSSERVATORIO.md:39-40` ("Since 2026-07-25 ITALIANO/ exists") |
| **AR-04** | medium | `plugins/metodo/spec-kit/constitution.md:168` | The drop-in self-declares `Version: 1.9.1`, but three independent sources say `1.9.0` (CHANGELOG, both READMEs) — the contradiction is still present in HEAD | Decide the true number and align every occurrence (the file itself, `README.md`, `ITALIANO/README.md`, `CHANGELOG`) | `spec-kit/constitution.md:168`; `CHANGELOG.md:15` ("realigned to 1.9.0"); `README.md:29`; `ITALIANO/README.md:32`; git log commit deae2cb |
| **AR-05** | medium | `plugins/metodo/COSTITUZIONE.md:1` | The "master" file users copy into `~/.claude/CLAUDE.md` never states its own version number, and no README links to `CHANGELOG.md` (the only place with the number) — a traceability gap that contradicts the value the repo places on versioning | Add `Version: v1.9.1` at the top of `COSTITUZIONE.md`/`CONSTITUTION.md` and link `CHANGELOG.md` from the READMEs | `COSTITUZIONE.md:1-15` (the only mention is "Governance since v1.5," historical); `CHANGELOG.md:7`; grep `CHANGELOG` → never in `plugins/metodo/README.md` nor root `README.md` |
| **AR-06** | medium | `observatory/DATA.md:66` | States "Opus generated ~83% of historical output," but the real calculation from `usage.csv` gives 77.1% (13,950,906 / 18,087,586); the dashboard's "By model" table confirms 77%. No plausible subset justifies the 83% | Recalculate from `usage.csv` (or link the query) and correct the figure, or specify the subset | `DATA.md:66`; aggregated `usage.csv` (opus-4-8 11,786,327 + opus-4-7 2,164,579); `DASHBOARD.md:96-100` |
| **AR-07** | medium | `observatory/DATA.md:63` | Says "26.3M cloud-agent tokens" but the real sum from `workflow.csv` is 27,576,803 (~27.6M); the 1,243,042 gap = the two SideKick rows added on 2026-07-25 *after* `DATA.md`'s last commit, which nonetheless carries the label "refreshed 2026-07-25" | Update `DATA.md`'s prose from `workflow.csv`'s total on every append, even within the same session | `DATA.md:63`; `DASHBOARD.md:12` ("27.6M"); `workflow.csv:13-14` (838,112 + 404,930); git: `DATA.md`@85ac181 vs `DASHBOARD.md`@bee0ac4 |
| **AR-08** | medium | `docs/img/DASHBOARD.png:1` | Screenshot frozen at 2026-07-17 (commit 5914afa) while `DASHBOARD.md` was regenerated multiple times on 2026-07-25 with numbers visibly different (15.9M→18.1M, 53→64 sessions, 11→13 projects, ≈169×→~187×); the "The lab (live data)" section promises live data but embeds the static image | Regenerate the screenshot on every refresh with the same script, or don't show numbers in the preview | `docs/img/DASHBOARD.png` (5914afa, 2026-07-17); `DASHBOARD.md:12-14` (regenerated 2026-07-25); `README.md:41,43` ("## The lab (live data)" + image below) |
| **AR-09** | medium | `observatory/usage/DASHBOARD.md:20` | The "The most expensive things" table — relaunched in the README as a flagship piece — has 4 of 8 rows (#1,2,4,6) in dense technical Italian with internal jargon ("Fabbrica WR3," "QC ombra 8%," "INCIDENTE resume") inside an otherwise English document; it breaks the readability of the published dataset | Translate/summarize the cloud-agent operation descriptions into English (debt on recent `workflow.csv` entries) | `DASHBOARD.md:20-25` (rows #1,2,4,6 in Italian); `workflow.csv:9,10,12` (Italian operation) vs `:2-7` (English); `README.md:43` relaunches with the screenshot |

### LOW (confirmed, downgraded during verification from medium/high)

| ID | Sev | Where | Problem | Proposed fix (1 line) | Source |
|----|-----|------|----------|----------------------|-------|
| **AR-10** | low | `docs/img/WTB.png:1` | Same mechanism as AR-08: screenshot frozen at 2026-07-17 while the live file reaches 2026-07-22. Downgraded: no explicit "live" promise next to the image (`docs/img/README.md` only says "rendered by GitHub") and the gap *understates* the activity rather than inflating it | Include both screenshots in the same regeneration script/hook | git log `WTB.png` → single commit 5914afa; `poker-who-s-the-boss.md:5` ("23 sessions... to 2026-07-22"); `docs/img/README.md:3-7` |
| **AR-11** | low | `FINDINGS.md:1` / `README.md` opening | The opening quote is a negative/inconclusive outcome. Downgraded: the exploratory framing is stated right below (`ITALIANO/README.md:19-22`), the "what you take away" table is on the same screen, and the concrete data point (audit → real bugs, N=2) exists at line 69-70 | Pair the quote with a concrete result already achieved, on the same first screen, to balance the first impression | `ITALIANO/README.md:7-10` (quote) + `:19-22` (framing) + `:69-70` (concrete data point) |
| **AR-12** | low | `README.md:68` | "~187× the live tokens" without translating the number into practical impact for a non-technical reader. Downgraded: the sentence already ties the figure to the "resume instead of restart" rule; **caution**: the originally proposed rewording ("costs 1/187 compared to restarting") would be *inaccurate* — 187× is the cumulative cache-read/live-token ratio, not a resume-vs-restart cost multiplier | A neutral aside such as "an indicator of how much long chats reread context on every message," **without** inventing a cost ratio the data doesn't support | `README.md:65-71`; `STRATEGIES.md:41` ("187× ... biggest cost item of all") confirms the nature of the ratio |
| **AR-13** | low | `README.md:60` | The only "proof" of the real apps (WTB, poker) is token dashboards, not code or demos. Downgraded: `README.md:25` explicitly states "private projects redacted" — a declared privacy choice, not a credibility gap; the repo's claims (token/method/findings) are already anchored to real data | No action required; possibly an app screenshot if privacy allows | `README.md:60-63` (link to `per-project/poker-who-s-the-boss.md`, table only); `README.md:25` ("private projects redacted") |
| **AR-14** | low | `plugins/metodo/README.md:3` | Self-referential self-help language ("self-evolving behavior... no constraints") as the file's second line. Downgraded: lines 10-14 immediately anchor it to concrete, verifiable behaviors (`IDEE.md`, design-first, self-updating constitution) | Replace the first line's adjectives with a concrete example of observed behavior | `plugins/metodo/README.md:3-4`, mitigated by `:10-14` |

## 4. Unverified LOW findings (declared unverified)

Passed **unverified** by process policy (on LOW, adversarial verification costs more than its usefulness). To be evaluated at the next touch-up, not blocking.

| ID | Where | Problem | Proposed fix |
|----|------|----------|--------------|
| AR-B1 | `plugins/metodo/CONSTITUTION.md:8` | The "interchangeable" English version remains personalized (names Roberto, "SideKick's observatory chat") while the Spec Kit drop-in is depersonalized; anyone who isn't Roberto copies someone else's references | In the READMEs, direct external use to the depersonalized Spec Kit drop-in |
| AR-B2 | `plugins/metodo/CONSTITUTION.md:203` | `FACTORY-PROCESS.md` in backticks is not a clickable markdown link, inconsistent with other references | Turn it into a markdown link |
| AR-B3 | `observatory/usage/per-project/progetto-15.md:6` | Cosmetic pluralization bug: "(1 workflows)" instead of "(1 workflow)" | Singularize in `usage.mjs`'s template |
| AR-B4 | `ITALIANO/README.md:71` | "cross-model" left untranslated (lines 56, 71) while elsewhere it's "cross-modello" (`DATA.md:30/46`, `STRATEGIES.md:26`, `VERDICTS.md:59`) | Standardize to "cross-modello" |

## 5. Refuted by verification

**None.** All 14 raw findings survived adversarial verification as *true facts*. The process filter acted instead on **severity**: rather than discarding findings, verification recalibrated impact against real context (personal showcase repo, small N declared), downgrading 4 findings from medium to low (AR-10÷AR-14, one was already high→medium AR-08) and correcting an inaccuracy in the proposed *solution* (AR-12: the 187× ratio is not a resume-vs-restart multiplier). This is the value of the verification step even at "zero refuted": it separates real problems from inflated severities and wrong fixes.

| Finding | Verification outcome | Reason |
|---------|----------------|--------|
| DASHBOARD.png "high" | downgraded to medium | Delay in regenerating a preview screenshot, not falsity: the real numbers are in the `.md`, growth if anything reinforces the "live dataset" claim. Correct anchoring: README:39's sentence refers to the `.md` (true), the real inconsistency is the "live data" title (:41) vs. the static image (:43) |
| WTB.png "medium" | downgraded to low | No "live" promise next to the image; the gap understates activity |
| FINDINGS.md opening "medium" | downgraded to low | Exploratory framing stated on the same screen; the concrete data point exists at `:69-70` |
| README 187× "medium" | downgraded to low + fix corrected | Audience already technical; the original rewording was mathematically inaccurate |
| README "proof=dashboard" "medium" | downgraded to low | Declared privacy ("private projects redacted"), not a credibility gap |
| plugins/metodo README "medium" | downgraded to low | Anchored to concrete behaviors in the immediately following lines |

## 6. Top-5 actions by ROI and what NOT to touch

**Top-5 by ROI (impact / effort).**
1. **AR-01 — `usage.mjs` generator bug (`gruppoDi`).** It's the only **high**, it's a *real* code bug (not prose), it hides ~20M tokens, and the fix is targeted (add a mapping like the one already there for poker/weather-report). Maximum ROI: correctness of the dataset that is the repo's core.
2. **AR-04 + AR-05 — method version.** A single coordinated intervention (number at the top of `COSTITUZIONE.md`/`CONSTITUTION.md`, `1.9.0`/`1.9.1` alignment, link to `CHANGELOG` from the READMEs) closes two medium findings on which the repo is most exposed precisely with the audience it wants to serve (method adopters).
3. **AR-06 + AR-07 — wrong numbers in `DATA.md`.** Two factually wrong figures (83% vs 77%; 26.3M vs 27.6M) on the page that declares "what the numbers say." Trivial recalculation from `usage.csv`/`workflow.csv`, high credibility return.
4. **AR-02 + AR-03 — Italian navigation loop.** Two lines of disambiguation (in the READMEs and at the top of `LEGGIMI.md`) fix an annoyance that hits exactly the Italian audience the repo wants to serve.
5. **AR-08 (+AR-10) — stale screenshots.** Regenerate the two images with the same dashboard-refresh script, or drop the numbers from the preview. Low effort, closes the visual "live data" vs. static image contradiction.

**What NOT to touch.**
- **The negative-outcome opening quote (AR-11)** and **"private projects redacted" (AR-13):** editorial choices consistent with the repo's declared ethics (honesty, privacy). Do not "fix" them into marketing.
- **`workflow.csv` as the author's raw notes:** its authenticity (even in Italian) is consistent with the repo; the intervention belongs on the *public dashboard* (AR-09), not on the source CSV.
- **The unverified LOW findings (AR-B1÷B4)** and the downgraded ones (AR-10÷14): touch-ups for the next pass, don't open dedicated workstreams.
- **AR-12's original rewording** ("1/187 compared to restarting"): it is *wrong*, don't apply it — use the neutral aside instead.

## 7. Honesty note on the process (limits)

- **No code execution.** `usage.mjs` was read and the AR-01 bug traced statically (the `gruppoDi` function + the line-179 filter) by cross-checking against the data; the generator was **not** run to reproduce the missing output. The conclusion rests on code reading + data correspondence, not an actual run.
- **Sampling-based verification on the numbers.** The percentages/sums (AR-06, AR-07) were recalculated from the cited CSV aggregates; an exhaustive row-by-row recalculation of the entire `usage.csv` (~64 sessions) was not redone. An upstream aggregation error in the CSV would not have been caught.
- **What was NOT looked at:** the contents of the redacted private projects (by privacy choice, rightly inaccessible); the *internal* correctness of the WTB/poker apps (outside this repo); local-only gitignored files (e.g., `versione-italiano/glossario/`); the English of *every* document translated into `ITALIANO/` one by one (AR-B4 is a sample, not a complete scan); SQL migrations (absent/not relevant to this documentation repo).
- **Unverified LOW findings:** the 4 findings in section 4 are by definition not re-verified at the source; treat them as reports, not confirmed facts.
- **No temporal baseline.** The staleness findings (AR-08, AR-10) are true as of 2026-07-25; a refresh already queued may have resolved them between this reading and your re-reading — check the screenshots' commit dates before acting.
- **Zero refuted does not mean "everything is serious."** It means the facts hold up but the severities were inflated: the real work of the process here was *calibrated downgrading*, not discarding. Read the corrected severities, not the red teams' raw ones.

---

## Outcome (added on 2026-07-25, same day)

Roberto approved **all** the actions; the fixes are in the commits following the report.
Roberto's specific choices: **AR-02/03** resolved by keeping ONE single Italian folder
(`ITALIANO/`) and removing `versione-italiano/` from the public repo (it remains locally
untracked, with OSSERVATORIO.md and the glossary, and in git history for the originals);
**AR-08/10** resolved by removing the stale screenshots — the exact recipe for the next
ones is in `docs/img/README.md`; **AR-13** left as is (a declared privacy choice, per
"what NOT to touch"). **AR-01 verified after the fix**: with the `Studio (...)` mapping in
`gruppoDi()`, the Studio drilldown now exposes the ~20.5M cloud tokens previously invisible
(and the weather_report worktree group merged into the project). **AR-04** reconciled to 1.9.1.
