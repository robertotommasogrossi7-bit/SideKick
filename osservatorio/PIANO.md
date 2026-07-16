# PIANO — passi decisi il 2026-07-16 (da eseguire nelle prossime sessioni)

> Deciso con Roberto nella chat-osservatorio. Ordine consigliato dall'alto in basso.
> Spuntare quando fatto.

## 1. Master del metodo nel repo (APPROVATO — da attuare con la riscrittura)
- [ ] La fonte di verità del metodo diventa `plugins/metodo/COSTITUZIONE.md` (versionata da
      git: storia, diff, rollback). `~/.claude/CLAUDE.md` diventa lo **specchio** che si
      aggiorna copiando dal repo, mai il contrario.
- [ ] Proteggere lo specchio: regola `deny` su Edit/Write di `~/.claude/CLAUDE.md` in
      `~/.claude/settings.json` (ogni chat lo LEGGE sempre — è caricato in automatico — ma
      nessuna lo tocca; le modifiche passano dal repo, in questa chat).
- [ ] La chat-osservatorio, al rituale, confronta specchio ↔ master e segnala derive.

## 2. Riscrittura della COSTITUZIONE (qui, con Roberto, sezione per sezione)
- [ ] Integrare il **contratto dati** (vedi `DATI.md`): esperimenti = 1 riga in
      ESPERIMENTI.md · scelte = 1 riga in DECISIONI.md + colonna "Esito osservato" ·
      consumo = automatico, mai a mano.
- [ ] Integrare la regola master-nel-repo (punto 1).
- [ ] **Dopo** la riscrittura, riallineare le copie arretrate in un colpo solo:
      `CONSTITUTION.md` (inglese, ferma a ~v1.0) · `plugins/metodo/spec-kit/constitution.md`
      · il repo `spec-kit-metodo` (diverge pure da quella).

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
