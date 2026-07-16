---
id: migrazione-a-componenti
tassonomia: Progettazione
tag: [migrazione, vanilla-to-framework, react, retrocompat, incrementale, metodologia]
non_ovvieta: alta
esito: migrazione reale completata (~3500 righe/16 moduli -> React+TS), 48 test verdi, dati intatti
provenienza: poker/_processo/archivio/REACT_MIGRATION_PROMPT.md + DECISIONI.md (motore F2)
versione: 0.2
speckit_compat: true
---

# Pacchetto — Migrazione vanilla → framework a componenti

## Identità
Portare un'app **vanilla HTML+JS funzionante** a un **framework a componenti**
(React/Vue/Svelte) **a fasi, senza rompere i dati salvati degli utenti**, a comportamento
identico.

## Quando forkarlo
App vanilla con **dati reali** (localStorage) da migrare a un framework, senza big-bang e
senza perdere i dati esistenti.

## Esito
Migrazione reale completata e mergiata: ~3500 righe / 16 moduli → React+TS, **48 test
verdi**, build pulita, **dati vecchi intatti** (migrazioni idempotenti). Ha poi abilitato
nuove feature senza riscritture. `non_ovvieta: alta` — un agente "migra a React" da zero
salta la retrocompat dei dati e va big-bang.

## Come adattarlo
React → il tuo framework; lo store-con-persistenza → il tuo; individua la **chiave/shape
dello storage esistente** e rendila invariata; genera la **mappa** del codice e segui il
playbook a fasi (`plan.md`).

## I cardini
1. **Comportamento identico, zero feature nuove** (rende possibile il diff, blocca lo scope-creep).
2. **Retrocompat dati sacra**: stessa chiave/shape, migrazioni idempotenti all'avvio.
3. **A fasi**, una per sessione, ognuna testabile, branch da `main`.
4. **Mappa del codice come bussola.**
5. **Traduzione 1:1** (funzione→hook/componente, render-HTML→componente).
6. **Verifica a specchio** (vecchia vs nuova affiancate).
7. **Migra pensando alla *prossima* migrazione** (vincoli pro-futuro).

## Contenuto
`spec.md` (regole/criteri, Spec Kit) · `plan.md` (playbook + esito + gotcha).

## Provenienza
Distillato dalla migrazione React di poker col motore F2 di SideKick.
