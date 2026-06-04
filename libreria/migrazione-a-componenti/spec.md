# Spec — Migrazione vanilla → framework a componenti *(regole, tech-agnostic)*

> Il **contratto** della migrazione: regole non-negoziabili e criteri di successo,
> indipendenti dal framework di arrivo. Il *come* operativo è in `plan.md`.

## 1. Obiettivo
Portare un'app vanilla (HTML + JS, handler inline, funzioni che generano stringhe HTML,
stato in variabili globali, persistenza su localStorage) a un **framework a componenti**,
**senza cambiare il comportamento** e **senza rompere i dati salvati**.

## 2. Regole non-negoziabili
- **R1 — Parità di comportamento.** L'app nuova fa esattamente ciò che faceva la vecchia.
  Niente feature nuove né refactoring creativo *durante* la migrazione.
- **R2 — Storage invariato.** Stessa chiave e stessa shape; le migrazioni dati esistenti si
  preservano e girano all'avvio. Caricare i dati di un utente vecchio deve "just work".
- **R3 — A fasi.** Ogni fase: piccola, su un branch da `main`, indipendentemente testabile,
  pensata per stare in una sessione. Merge solo alla fine.
- **R4 — Traduzione 1:1.** Una unità vanilla → una unità nuova (funzione → hook/componente,
  pura → pura, render-HTML → componente). Stessa granularità, niente fusioni.
- **R5 — Stato globale solo nello store** (con persistenza); persistere **solo i dati**, non
  lo stato UI temporaneo.
- **R6 — Vincoli pro-futuro.** Imporre regole che tengono il codice pronto al passo dopo
  (es. niente stili inline → migrazione CSS meccanica poi; nomi di dominio invariati).

## 3. Disciplina anti-bug (al confine tra i moduli)
- **Mappa prima.** Leggi la MAPPA del codice come bussola, prima dei sorgenti.
- **Leggi *tutti* i file della fase**, non solo i "principali": le interazioni stanno ai
  bordi.
- **Grep dei call-site** prima di implementare una funzione: chi la chiama altrove?
- **Chiedi invece di indovinare** sui comportamenti incerti (un bug scoperto 3 fasi dopo
  costa molto più di una domanda).

## 4. Criteri di successo
- **SC1 — Parità verificata a specchio**: vecchia e nuova affiancate, il flusso migrato si
  comporta identico (lista comportamenti-chiave per fase).
- **SC2 — Dati vecchi caricati intatti** (zero perdita; migrazioni idempotenti).
- **SC3 — Build/lint/tipi puliti** e test verdi a fine di ogni fase.
- **SC4 — Ogni fase mergiabile da sola**, nessun big-bang.

## 5. Anti-pattern (le trappole)
- *"Già che ci sono, miglioro/aggiungo"* durante la migrazione → scope-creep, diff
  impossibile. (Le migliorie vengono **dopo**, a parità raggiunta.)
- Riscrivere lo storage / cambiare chiave → perdi i dati degli utenti.
- Big-bang in un colpo → niente da verificare incrementalmente, bug ovunque.
