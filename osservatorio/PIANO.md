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

## 3. Riposizionamento GitHub — linea AGGIORNATA dal red team 2026-07-16
Red team doppio (Claude+ChatGPT) fatto: verdetti e verifiche in
`osservatorio/redteam/VERDETTI-2026-07-16.md`. Linea nuova: **non "laboratorio del metodo"
ma "case study con dati reali + strumenti riusabili"** — il metodo è appendice.
- [x] Red team esterno pre-pubblicazione (2026-07-16) + verifiche alla fonte + correzioni.
- [ ] README (IT+EN) nell'ordine: (1) cosa ti porti via — tool (`consumo.mjs`, cost-meter,
      oracolo) + dataset CSV dei consumi per-sessione + writeup FINDINGS — (2) esperimenti e
      dati (incl. "cosa NON ha funzionato") — (3) metodo in appendice, versione corta, con
      linguaggio "ipotesi operative (N=…)".
- [ ] Decisioni di Roberto prima di scrivere: (a) dettagli dei finding di progetto-15 fuori
      dal pubblico? (b) regola Spotify resta nel metodo ma fuori vetrina?
- [ ] Descrizione + topics del repo GitHub (claude-code, spec-kit, token-usage, case-study…).
- [ ] Budget da qui in poi: ~80% esperimenti / 20% manutenzione metodo (verdetto ROI).

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
