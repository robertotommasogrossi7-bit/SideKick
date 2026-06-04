# Pacchetto di processo — Migrazione vanilla → framework a componenti

> Cos'è un "pacchetto di processo": il processo collaudato di una cosa costruita con
> successo, **astratto** e **taggato con l'esito**, da forkare e far adattare all'AI.
> Allineato agli artefatti Spec Kit.
>
> ⚠️ Bozza F1 — **secondo** pacchetto, di tipo **Progettazione / meta-processo** (il primo,
> `settlement-equo`, era *Pratiche*). Serve a testare se il valore emerge su conoscenza
> **non-ovvia / di giudizio**, non su un algoritmo da manuale.

## Identità
- **ID**: `migrazione-a-componenti`
- **Tassonomia**: **Progettazione** (metodologia / meta-processo)
- **In una riga**: come portare un'app **vanilla HTML+JS funzionante** a un **framework a
  componenti** (React/Vue/Svelte) **a fasi, senza rompere i dati salvati degli utenti**,
  mantenendo comportamento identico.

## Quando forkarlo
Hai un'app vanilla che gira e ha **dati reali** (localStorage) e vuoi migrarla a un
framework **senza un "big bang" rischioso** e senza perdere i dati esistenti.

## Esito — perché fidarsi
- ✅ Migrazione reale completata (poker tracker, ~3500 righe / 16 moduli JS → React+TS),
  mergiata in `main`, **48 test verdi, build pulita**, verificata nel browser con i **dati
  vecchi intatti** e migrazioni **idempotenti**.
- ✅ Ha **abilitato il lavoro successivo** (nuove feature) senza riscritture: la struttura
  era quella giusta.
- 📐 I principi sono framework-agnostici; lo stack originale è solo un'istanza.

## I cardini (regole non-negoziabili)
1. **Comportamento identico, zero feature nuove.** La versione migrata fa *esattamente*
   ciò che faceva la vanilla. Niente refactoring "creativo". *(È ciò che rende possibile il
   diff e impedisce lo scope-creep — la trappola n.1.)*
2. **Retrocompat dei dati = sacra.** Stessa **chiave** e stessa **shape** dello storage
   esistente; preserva le migrazioni dati ed eseguile all'avvio. L'utente non deve
   accorgersi di nulla. *(È la cosa che un agente "migra a X" da zero salta.)*
3. **A fasi, una per sessione, ognuna testabile, su un branch da `main`.** Niente big-bang;
   merge solo alla fine.
4. **Una MAPPA del codice come bussola.** Investi in un doc che mappa dati+funzioni (più
   economico che rileggere i sorgenti ogni fase) e leggilo per primo.
5. **Traduzione 1:1, niente fusioni.** Una unità vanilla → una unità nuova (funzione →
   hook/componente, pura → pura, funzione che genera HTML → componente). Stessa granularità.
6. **Verifica a specchio.** A fine fase: vecchia e nuova affiancate, testi il flusso
   migrato, con la lista dei comportamenti-chiave da controllare.
7. **Migra pensando alla *prossima* migrazione.** Vincoli che tengono il codice pronto al
   passo dopo (es. niente stili inline se domani vuoi un'altra soluzione CSS; nomi di
   dominio invariati).

## Come adattarlo (lo fa l'AI, tu confermi)
1. Sostituisci lo stack: React → il tuo framework; lo store con persistenza → il tuo.
2. Individua la **chiave/shape dello storage esistente** e rendila **invariata**.
3. Genera la **MAPPA** del tuo codice, poi segui il playbook a fasi (`plan.md`) adattando i
   confini delle fasi alle tue aree.

## Contenuto
- `spec.md` — le **regole** della migrazione (il contratto) + criteri di successo.
- `plan.md` — il **playbook a fasi** (template) + i gotcha + l'esito + lo stack originale.

## Provenienza
Distillato (F1) da `poker/_processo/archivio/REACT_MIGRATION_PROMPT.md` + `DECISIONI.md`.
Stack originale: Vite + React + TypeScript + Zustand(`persist`) + React Router.
