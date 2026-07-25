# docs/img — screenshot di anteprima (al momento nessuno, di proposito)

Gli screenshot precedenti (`DASHBOARD.png`, `WTB.png`) sono stati rimossi il 2026-07-25
(finding AR-08 dell'audit: erano fermi al 2026-07-17 mentre le pagine che anteprimavano
continuavano a cambiare — una sezione "dati live" con un'immagine stantia). I README ora
linkano direttamente alle pagine vive.

## Come fare i prossimi screenshot (ricetta esatta)

1. Apri la pagina **renderizzata** su GitHub (non il file raw):
   - dashboard → `observatory/usage/DASHBOARD.md` — cattura i blocchi **"At a glance" +
     "The most expensive things"**;
   - approfondimento progetto → `observatory/usage/per-project/poker-who-s-the-boss.md` —
     cattura la tabella delle sessioni.
2. Screenshot con `Win+Shift+S`, ritaglia al contenuto (niente cornice del browser).
3. Salva ESATTAMENTE come `docs/img/DASHBOARD.png` e `docs/img/WTB.png` (stessi nomi: la
   cronologia git di ogni file dice così quando l'anteprima è stata aggiornata l'ultima volta).
4. Rimetti gli embed delle immagini in `README.md` e `ITALIANO/README.md` subito sopra i
   rispettivi link "apri la pagina viva", e committa immagini + README insieme.
5. **Regola da tenere**: aggiorna gli screenshot nella stessa sessione che rigenera la
   dashboard, oppure non mostrare numeri nell'immagine di anteprima — un'immagine con numeri
   vecchi sotto un titolo "dati live" è peggio di nessuna immagine. Le immagini devono
   restare committate (non gitignorate): GitHub renderizza solo immagini che vivono nel
   repo; possono contenere solo dati già pubblicati e redatti.
