# PIANO — passi decisi il 2026-07-16 (da eseguire nelle prossime sessioni)

> Deciso con Roberto nella chat-osservatorio. Ordine consigliato dall'alto in basso.
> Spuntare quando fatto.

## 1. Master del metodo nel repo — ✅ FATTO 2026-07-16
- [x] La fonte di verità è `plugins/metodo/COSTITUZIONE.md` (v1.5); `~/.claude/CLAUDE.md` è
      lo **specchio** rigenerato dal master.
- [x] Specchio protetto: regola `deny` su Edit/Write di `~/.claude/CLAUDE.md` in
      `~/.claude/settings.json` (ogni chat lo legge, nessuna lo tocca).
- [x] Il rituale dell'osservatorio confronta specchio ↔ master e segnala derive.

## 2. Aggiornamento COSTITUZIONE — v1.5 FATTA 2026-07-16, restano le copie estere
- [x] Contratto dati integrato (titoli chat · ESPERIMENTI · Esito osservato · workflow.csv ·
      consumo automatico) + regola handoff coi numeri (cache/finestra) + sezione Spec Kit.
- [x] Drop-in Spec Kit `plugins/metodo/spec-kit/constitution.md` riallineato (v1.5.0,
      principi VIII-XI nuovi).
- [ ] `CONSTITUTION.md` (inglese, ferma a ~v1.0): tradurre la v1.5 completa —
      **task per una chat Sonnet, effort high** (traduzione scoped).
- [ ] Repo `spec-kit-metodo`: copiare la constitution v1.5.0 appena tradotta/verificata.

## 3. Riposizionamento GitHub (RIMANDATO da Roberto — farlo dopo il punto 2)
Nuova identità del repo: **laboratorio dove si analizzano esperimenti e progetti reali
fatti con Claude, per capire quali scelte fanno risparmiare token e automatizzare i
processi** — collegabile a GitHub Spec Kit.
- [ ] README (IT+EN): riscrivere l'apertura attorno a laboratorio + osservatorio + metodo;
      la libreria di feature diventa una sezione, non l'identità.
- [ ] Descrizione + topics del repo GitHub (spec-kit, claude, token-efficiency, ...).
- [ ] Red team esterno prima di pubblicare (regola del metodo: sguardo esterno).

## 4. Allineamento a GitHub Spec Kit (studio, poi decisioni)
Perché: sono più avanti sull'organizzazione, e parlare la loro lingua rende SideKick
interessante per chi già usa Spec Kit.
- [ ] Studiare la struttura del repo spec-kit (clone locale in `Programmi/spec-kit`):
      `.specify/memory/` (constitution), templates (spec/plan/tasks), commands.
- [ ] Mappare i nostri artefatti sui loro concetti (COSTITUZIONE→constitution;
      mini-spec→spec template; roadmap/fasi→plan/tasks) e adottare ciò che conviene.
- [ ] Tenere il drop-in `plugins/metodo/spec-kit/` sempre alla pari col master (punto 2).

## 5. Dati di consumo — evoluzioni possibili (quando i dati crescono)
- [ ] METRICHE.md leggero per il progetto-15, se si vuole salvare l'A/B completo-vs-incrementale.
- [ ] Aggiungere al report la stima del costo-equivalente API per modello (con prezzi
      verificati alla fonte, mai a memoria).
- [ ] Passare da CSV a SQLite quando le righe si contano a centinaia (migrazione banale).
