#!/usr/bin/env python3
"""distilla.py — motore di distillazione di SideKick (F2).

Trasforma il materiale di processo di UNA feature (i .md di `_processo/`, o i doc di un
progetto Spec Kit) in un "pacchetto di processo" Spec-Kit-compatibile
(PACCHETTO.md + spec.md + plan.md), salvato in `libreria/<id>/`.

Pipeline (ELT):
    Extract   - legge i file sorgente
    Transform - scrubbing dei segreti  ->  distillazione via LLM
    Load      - scrive il pacchetto (3 file) dall'output dell'LLM

La distillazione e' "pluggable":
    --backend prompt-only (default) : prepara il prompt pronto; lo distilli a mano/in chat
                                      (gratis, sul tuo Max), poi ricarichi con --load <file>.
    --backend claude-cli            : usa Claude Code headless (`claude -p`), gira sul Max.

Esempi:
    python distilla.py --id settlement-equo \\
        --dominio "tracker di poker" --stack "React + TypeScript + Vitest" \\
        --esito "in produzione, coperto da test" \\
        --fonte ../poker/_processo/SETTLEMENT_SPEC.md \\
        --fonte ../poker/_processo/USCITA_CASH_SPEC.md
    # -> scrive libreria/settlement-equo/_PROMPT_PRONTO.md (backend prompt-only)

    python distilla.py --id settlement-equo --load output_llm.txt
    # -> divide l'output gia' distillato nei 3 file del pacchetto
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # cartella SideKick
PROMPT_TEMPLATE = Path(__file__).resolve().parent / "PROMPT_DISTILLAZIONE.md"


# --- Extract ---------------------------------------------------------------
def extract(sources: list[Path]) -> str:
    """Concatena i file sorgente in un unico blocco etichettato per fonte."""
    blocks: list[str] = []
    for p in sources:
        if not p.exists():
            print(f"[avviso] sorgente assente, salto: {p}", file=sys.stderr)
            continue
        testo = p.read_text(encoding="utf-8")
        blocks.append(f"\n----- FONTE: {p.name} -----\n{testo}")
    if not blocks:
        sys.exit("Errore: nessuna fonte leggibile.")
    return "\n".join(blocks)


# --- Transform: scrub ------------------------------------------------------
# Rete di sicurezza: rimuove i segreti comuni PRIMA che il testo lasci la macchina.
SCRUB_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"sk-ant-[A-Za-z0-9_\-]{20,}"), "[CHIAVE-ANTHROPIC-RIMOSSA]"),
    (re.compile(r"sk-[A-Za-z0-9_\-]{20,}"), "[CHIAVE-RIMOSSA]"),
    (re.compile(r"gh[pousr]_[A-Za-z0-9]{30,}"), "[TOKEN-GITHUB-RIMOSSO]"),
    (re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"), "[EMAIL-RIMOSSA]"),
    (re.compile(r"(?<=[Cc]:\\Users\\)[^\\\s]+"), "[UTENTE]"),   # username in path Windows
    (re.compile(r"(?<=/Users/)[^/\s]+"), "[UTENTE]"),           # macOS
    (re.compile(r"(?<=/home/)[^/\s]+"), "[UTENTE]"),            # Linux
]


def scrub(text: str) -> tuple[str, int]:
    """Sostituisce i segreti; ritorna (testo_pulito, n_sostituzioni)."""
    n = 0
    for pat, repl in SCRUB_PATTERNS:
        text, k = pat.subn(repl, text)
        n += k
    return text, n


# --- Transform: assemble ---------------------------------------------------
def assemble_prompt(template: str, *, dominio: str, stack: str, esito: str, fonti: str) -> str:
    """Riempie i token {{...}} del prompt di distillazione con gli input."""
    return (
        template.replace("{{DOMINIO}}", dominio)
        .replace("{{STACK}}", stack)
        .replace("{{ESITO}}", esito)
        .replace("{{FONTI}}", fonti)
    )


# --- Transform: distill (pluggable) ---------------------------------------
def distill(prompt: str, backend: str, out_dir: Path) -> str | None:
    """Esegue la distillazione. Ritorna l'output LLM, o None se ci si ferma al prompt."""
    if backend == "prompt-only":
        out_dir.mkdir(parents=True, exist_ok=True)
        ready = out_dir / "_PROMPT_PRONTO.md"
        ready.write_text(prompt, encoding="utf-8")
        print(f"[prompt-only] Prompt pronto: {ready}")
        print("  -> Distillalo in una chat Claude, salva l'output, poi: --load <file>")
        return None
    if backend == "claude-cli":
        print("[claude-cli] Distillazione su Claude Code (Max)...")
        res = subprocess.run(["claude", "-p", prompt], capture_output=True, text=True)
        if res.returncode != 0:
            sys.exit(f"Errore claude CLI: {res.stderr.strip()}")
        return res.stdout
    sys.exit(f"Backend sconosciuto: {backend}")


# --- Load ------------------------------------------------------------------
FILE_DELIM = re.compile(r"^===\s*FILE:\s*(?P<name>[\w.\-]+)\s*===\s*$", re.MULTILINE)


def load(llm_output: str, out_dir: Path) -> list[Path]:
    """Divide l'output (file delimitati da '=== FILE: x ===') e li scrive su disco."""
    parts = FILE_DELIM.split(llm_output)        # [pre, nome1, corpo1, nome2, corpo2, ...]
    out_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    it = iter(parts[1:])
    for name, body in zip(it, it):
        body = re.sub(r"\n?===\s*END\s*===\s*$", "", body).strip() + "\n"
        f = out_dir / name
        f.write_text(body, encoding="utf-8")
        written.append(f)
    if not written:
        sys.exit("Errore: nessun blocco '=== FILE: ... ===' trovato nell'output.")
    return written


# --- CLI -------------------------------------------------------------------
def main() -> None:
    ap = argparse.ArgumentParser(
        description="Distilla una feature in un pacchetto di processo SideKick."
    )
    ap.add_argument("--id", required=True, help="slug del pacchetto (es. settlement-equo)")
    ap.add_argument("--fonte", action="append", type=Path, default=[],
                    help="file sorgente (ripetibile)")
    ap.add_argument("--dominio", default="[da specificare]")
    ap.add_argument("--stack", default="[da specificare]")
    ap.add_argument("--esito", default="[da verificare]")
    ap.add_argument("--backend", choices=["prompt-only", "claude-cli"], default="prompt-only")
    ap.add_argument("--load", type=Path,
                    help="salta extract/distill: carica un output LLM gia' pronto da questo file")
    ap.add_argument("--out", type=Path, default=None,
                    help="cartella output (default: libreria/<id>)")
    args = ap.parse_args()

    out_dir = args.out or (ROOT / "libreria" / args.id)

    # Solo Load (da un output gia' distillato a mano / altrove)
    if args.load:
        written = load(args.load.read_text(encoding="utf-8"), out_dir)
        print("Pacchetto scritto:", *(f"  {p}" for p in written), sep="\n")
        return

    if not args.fonte:
        sys.exit("Errore: serve almeno una --fonte (o usa --load).")

    raw = extract(args.fonte)                                   # Extract
    scrubbed, n = scrub(raw)                                    # Transform: scrub
    print(f"[scrub] {n} potenziali segreti rimossi.")
    template = PROMPT_TEMPLATE.read_text(encoding="utf-8")
    prompt = assemble_prompt(template, dominio=args.dominio, stack=args.stack,
                             esito=args.esito, fonti=scrubbed)  # Transform: assemble
    output = distill(prompt, args.backend, out_dir)            # Transform: distill
    if output is None:
        return
    written = load(output, out_dir)                            # Load
    print("Pacchetto scritto:", *(f"  {p}" for p in written), sep="\n")


if __name__ == "__main__":
    main()
