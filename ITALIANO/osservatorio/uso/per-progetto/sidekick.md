# SideKick — utilizzo token (generato)

> Torna al cruscotto: [`../DASHBOARD.md`](../DASHBOARD.md). Non modificare a mano.

**12 sessioni** dal 2026-06-03 al 2026-07-25 · **2.1M output** ·
117k input · 253.5M cache letta · 838 messaggi · **+3.9M token di agenti cloud** (6 workflow)

## Sessioni (in ordine di tempo — il titolo dice cosa è stato fatto)
| Periodo | Operazione | Modelli | Msg | Input | Output | Cache letta |
|---|---|---|---|---|---|---|
| 2026-06-03 | Set up poker app project using desktop method | opus-4-8 | 5 | 4k | 3k | 122k |
| 2026-06-03→06-10 | SK/Base_1 | opus-4-8 | 128 | 62k | 677k | 58.4M |
| 2026-06-04 | SK/Test_2 | opus-4-8 | 20 | 5k | 39k | 961k |
| 2026-06-04 | SK/Test_1 | opus-4-8 | 23 | 4k | 53k | 1.5M |
| 2026-06-10 | BassPedal/Base | opus-4-8 | 27 | 6k | 101k | 2.6M |
| 2026-06-10→06-12 | SK/Base_2 | opus-4-8 + fable-5 | 216 | 22k | 557k | 67.8M |
| 2026-06-12 | SK/Base_3 | opus-4-8 + fable-5 | 55 | 10k | 114k | 7.6M |
| 2026-07-16 | Sidekick data observatory setup | fable-5 | 23 | 3k | 43k | 2.2M |
| 2026-07-16 | Sidekick data observatory setup | fable-5 | 112 | 206 | 217k | 35.1M |
| 2026-07-16→07-17 | Sidekick data observatory setup | fable-5 | 8 | 15 | 6k | 3.5M |
| 2026-07-16→07-17 | SK/Base_4 | fable-5 + opus-4-8 | 50 | 92 | 69k | 24.5M |
| 2026-07-25 | SK/Base_5 | fable-5 | 171 | 320 | 253k | 49.2M |

## Workflow cloud su questo progetto
| Data | Operazione | Agenti | Token agenti | Fonte |
|---|---|---|---|---|
| 2026-07-17 | English translation of the public facade (11 docs incl. CONSTITUTION v1.5) | 1 | 119k | observatory chat 2026-07-17 |
| 2026-07-17 | Spec Kit double-run study (Opus x2, identical prompt) + claim verification | 2 | 293k | ESPERIMENTI.md table 2 |
| 2026-07-25 | Repo clarity+English (3 phases): 3 Sonnet analysts (fresh eyes, native English, fact coherence; 26 findings) -> 5 Sonnet executors on disjoint files (CONSTITUTION.md brought to v1.9, FACTORY-PROCESS.md created, spec-kit drop-in with new principles XII-XVI, facade, observatory docs) -> 2 Opus reviewers with different lenses (8 findings, 5 real: drop-in version race in README between parallel agents, 170x->187x, 5h_windows line MISSING FROM THE MASTER then added, untranslated 'Assistenza', dashboard to regenerate; 1 refuted: the generator has no hardcoded 170x). Integration and commits by the director | 10 | 838k | chat SideKick/Osservatorio_1 + transcript wf_a2acea15-23a |
| 2026-07-25 | Italian copy ITALIANO/: 5 Sonnet translators on disjoint blocks (14 docs, ~880 lines) + 1 verifier (completeness, number fidelity, terminology, links). 2 cross-agent slips fixed by the director: README intro note removed by an overzealous verifier (context lost between agents) and FINDINGS link pointed at the original instead of the copy | 6 | 405k | chat SideKick/Osservatorio_1 + transcript wf_7978359d-81d |
| 2026-07-25 | Full repo audit REPORT-ONLY (Roberto): 3 cheap red-team personas (recruiter/adopter/visitor, 17 findings) -> 5 subsystem reviewers (30) -> Haiku dedup (29 unique) -> adversarial verification on HIGH/MEDIUM -> Opus synthesis. Outcome: 14 confirmed (1 HIGH: usage.mjs misses Studio's workflows in the drilldown, ~20.5M tokens invisible; 8 medium incl. the unexplained double Italian folder and inconsistent drop-in versions), 4 low unverified, 0 refuted; 5 severities downgraded by verification. Report: observatory/AUDIT-REPO-2026-07-25.md, no fix applied | 24 | 1.5M | chat SideKick/Osservatorio_1 + transcript wf_d0a32840-966 |
| 2026-07-25 | ITALIANO total translation (6 Sonnet agents): tree restructured with Italian folder names (osservatorio/uso/per-progetto/esperimenti/plugin/documenti), usage.mjs made BILINGUAL (Italian dashboard+drilldowns generated on every run, +2 tests), missing experiment docs translated, audit report turned English in the main tree (Italian original kept in ITALIANO/), full resync with the restructured README; verifier fixed 2 real bugs (4 links pointing at English dashboards instead of the generated Italian ones; degraded accents in one file) and flagged the v1.9.1->v1.9.2 README drift (fixed by the director) | 6 | 685k | chat SideKick/Osservatorio_1 + transcript wf_71f2b859-65e |
