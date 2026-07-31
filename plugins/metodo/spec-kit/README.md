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

## Why a *constitution* drop-in (and, since v0.12.15, also a preset)
The constitution lives in **memory** (`.specify/memory/`) and **survives `specify init`**:
dropping this file there is the simplest, version-independent way to ship a method.
Since **Spec Kit v0.12.15 (2026-07-14)** a *preset* can also seed the constitution verbatim
into memory at init time — and we now ship that second path too, as
[`preset.yml`](preset.yml) in this folder (it points at `constitution.md` directly, so the
repo keeps one copy):

```bash
specify init <project> --integration <agent> --preset path/to/SideKick/plugins/metodo/spec-kit
```

**Tested empirically 2026-07-31** on spec-kit 0.15.2.dev0: after init,
`.specify/memory/constitution.md` was **byte-identical** (equal SHA256) to the drop-in,
both with the conventional `templates/` layout and with the flat one we ship. Caveats: we
tested that one version only; the `>=0.12.15` floor comes from their changelog, not from
our own runs on older versions. And note that `specify init --help` documents `--preset`
as a registry **ID** only — the local-path form we use above works (verified in the CLI
source and by running it), but it is undocumented upstream and could tighten silently in
a future release; if it does, fall back to the `cp` install at the top of this page.

> **Correction (2026-07-17).** An earlier version of this page claimed "presets/extensions
> override *templates* only; a constitution is not a preset". That was true of Spec Kit up to
> v0.12.14 and is **outdated** since v0.12.15 (changelog: *"fix(presets): seed constitution
> from preset constitution-template"*). We found this ourselves during a double-run study of
> their repo; details in the observatory.

## Difference from Spec Kit's constitution
Spec Kit's constitution is **actively enforced** — every core command loads it, `/plan` gates
on it, and `/analyze` treats conflicts with it as automatically **CRITICAL** — and it already
has amendment machinery (semantic versioning, sync impact reports). What ours adds is
narrower and precise: **Principle VI makes the amendment *agent-initiated*** — the agent
proposes changes unprompted when a rule stops earning its keep, instead of waiting to be
asked.

> **Correction (2026-07-17).** An earlier version called their constitution "read once and
> passive". Wrong: it is loaded and enforced by every core command. What it lacks is only the
> *proactive* part.
