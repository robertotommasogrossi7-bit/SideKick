# Release del dataset — note per versione taggata

> Una sezione per tag git. La voce "Release" su GitHub si crea a mano da queste note
> (tag → *Create release from tag* → incolla la sezione).

## dataset-v0.1 — 2026-07-31

Prima release taggata del **dataset token & costi** dell'osservatorio — dati d'uso reali di una persona che lavora con un agente di coding AI, maggio → luglio 2026, estratti dai transcript locali da [`usage.mjs`](../../../observatory/usage.mjs) (nessun consumo registrato a mano da nessuna parte).

### Cosa c'è nel dataset (`observatory/usage/`)
- **`usage.csv`** — per progetto × modello × mese: messaggi, input/output, cache letta/scritta, `cost_usd_equiv`, `cost_partial`.
- **`sessions.csv`** — una riga per sessione (periodo, titolo dell'operazione, modelli, token, costo).
- **`daily.csv`** — una riga per giorno di calendario, tutti i progetti/modelli insieme.
- **`prices.csv`** — prezzi API per modello curati a mano, con finestre di validità, URL della fonte e data di verifica per riga.
- **`workflow.csv`** — registro curato a mano dei workflow multi-agente cloud (non lasciano transcript locali), incl. la colonna `5h_windows` (finestre del piano consumate, solo quando osservate).
- **`SCHEMA.md`** — dizionario dati colonna per colonna, unità, caveat su dedup e censura.
- **`DASHBOARD.md` + `dashboard.html`** — viste generate (l'HTML è autocontenuto: tabelle ordinabili, grafici SVG, zero CDN). Specchio italiano auto-generato in `ITALIANO/osservatorio/uso/`.

### Novità da quando esiste lo schema
`prices.csv` con fonti verificate · colonne `cost_usd_equiv`/`cost_partial` · `daily.csv` · `dashboard.html` bilingue autocontenuta · **costi dei workflow misurati** dai transcript per-agente locali (dedup all'ultimo snapshot dei record di usage in streaming), mai stimati.

### Fotografia a questo tag (generata il 2026-07-31)
70 sessioni, 12 progetti, ~12k messaggi unici · **19,4M token di output** + **51,6M token da agenti cloud** · riletture di cache 3.885M (~192× i token vivi) · equivalente di costo API **$4,0k*** (parziale) · workflow misurati dai transcript locali: **$321,07 su 10 dei 20 run registrati**.

### Limiti onesti (invariati)
Il costo è un **equivalente API, NON quello che il piano flat fattura davvero**; modelli/date senza prezzo verificato contribuiscono $0 e marcano la riga `cost_partial` (mai un numero inventato); i workflow cloud senza transcript locali restano non prezzati (`—`); i progetti privati sono censurati alla fonte, la legenda non lascia mai la macchina.

Generatore e misuratore hanno entrambi test su fixture (20 verdi) eseguiti dalla CI a ogni push.
