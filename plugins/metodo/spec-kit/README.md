# Using the method with GitHub Spec Kit

Our method **is a constitution** → the correct Spec-Kit-native form is the
[`constitution.md`](constitution.md) file placed where Spec Kit keeps its own:
**`.specify/memory/constitution.md`**.

## How to install it in a Spec Kit project
In a project already initialized with Spec Kit (`specify init …`):

```bash
cp plugins/metodo/spec-kit/constitution.md  <project>/.specify/memory/constitution.md
```
or paste the content in response to your agent's **`/constitution`** command.

From there the agent (which reads `.specify/memory/constitution.md` as context) follows the
method **proactively**, and — thanks to **Principle VI (Self-Amending)** — can **update it on
its own**.

## Why a *constitution* and not a preset/extension
In Spec Kit **presets and extensions override the *templates*** (`spec`/`plan`/`tasks`),
resolved by priority (`.specify/templates/overrides/` > `presets/` > `extensions/` > core). The
constitution **is not** a template: it's memory (`.specify/memory/`). So the method must be
delivered as a **constitution drop-in**, not as a preset. *(A preset would only make sense to
also reflect the method in the templates — e.g. a "design-first" gate in `plan-template.md`: a
future extension, not the core.)*

## Difference from Spec Kit's constitution
Theirs is **read once and passive**. Ours adds **Principle VI**: the agent **makes it evolve**.
It's the concrete contribution we propose to their concept of constitution.
