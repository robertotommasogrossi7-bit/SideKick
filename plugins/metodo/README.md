# metodo — SideKick's human+AI working method

Turns your **working method** into standing instructions the AI acts on by itself — it
records stray ideas, proposes specs before delicate code, and amends its own constitution
(with your OK) — in every project, no commands to remember. Version: see the
[CHANGELOG](CHANGELOG.md) — note: the Spec Kit drop-in can lag a version behind when an
amendment doesn't concern the depersonalized variant. **Adopting it for yourself?** Start from the depersonalized
[Spec Kit drop-in](spec-kit/constitution.md) — the files below mention this repo's author
and files.

## The core: the constitution (no commands)
[`COSTITUZIONE.md`](COSTITUZIONE.md) (IT) — English: [`CONSTITUTION.md`](CONSTITUTION.md) — is
the method turned into **permanent instructions**. Copy it into
`~/.claude/CLAUDE.md` (user level → applies to **all** projects) or into a project's
`CLAUDE.md`. From that moment the AI, **on its own**:
- captures ideas in `_processo/IDEE.md` **without making you lose the thread**, and
  **re-surfaces** them to you;
- keeps you on **design-first** and **micro-commits** *when it matters*, **without forcing you**;
- **updates the constitution itself** when the method changes.

→ **How you use it:** you paste a file, and the AI *behaves* that way. No `/commands`.

## Optional: explicit capture
For those who want it, the plugin also offers `/metodo:idea <text>` (save an idea on the fly).
But the constitution already does this **proactively**, so it's secondary.

## Install the plugin (optional)
```
/plugin marketplace add robertotommasogrossi7-bit/SideKick
/plugin install metodo@sidekick
```
This plugin is an **accessory** (just `/metodo:idea`, package version 0.1.1, tracked
separately from the constitution's own version above) — full adoption of the method is the
drop-in/preset described above, not this install command.

## Improve / share
It's meant for a **community that shares and evolves its own method with the AI**: fork,
improve your own `COSTITUZIONE.md`, open a PR. The best version wins out.
