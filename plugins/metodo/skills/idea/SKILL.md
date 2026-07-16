---
description: Instantly saves an idea to _processo/IDEE.md without interrupting the current work. Invoke it with /metodo:idea <idea text>.
disable-model-invocation: true
---

# Idea capture (frictionless)

The user wants to **save an idea without losing the thread** of what they're doing. The idea is:

"$ARGUMENTS"

Do **only** this, in a non-invasive and fast way:

1. Determine the project's ideas file: `_processo/IDEE.md` if the `_processo/` folder exists at
   the root, otherwise `IDEE.md` at the project root.
2. If the file doesn't exist, create it with the `# IDEE` heading on one line, followed by a
   blank line.
3. **Append** a single line at the end: `- [YYYY-MM-DD] $ARGUMENTS` using today's date.
   Don't reorder or rewrite the rest of the file.
4. Reply with **a single line** of confirmation (e.g. `💡 saved to _processo/IDEE.md`).

Don't modify code, don't open discussions, don't propose actions: the user is working on
something else and this is just a quick capture. If `$ARGUMENTS` is empty, ask in one line what
the idea is.
