# TEST — Processo GRANDE (migrazione completa)

> **Domanda:** SideKick funziona anche per *processi grandi* (non solo feature piccole)?
> Es. una migrazione completa **vanilla HTML+JS → React**, a fasi (come quella di poker).
> **Da eseguire in una CHAT NUOVA** (qui il contesto è quasi finito). La chat nuova riparte da
> `METODO.md` (desktop) + `_processo/CONTESTO.md` + questo file.

## Ipotesi (forte)
Il **valore del pacchetto CRESCE con la dimensione del processo**. Per una feature
piccola/textbook il modello fa da solo (pacchetto marginale: vedi Elo/settlement). Per un
**processo lungo** la disciplina **non-ovvia** — retrocompat dei dati, a fasi, comportamento
identico, niente big-bang — è proprio *dove si fallisce* → il pacchetto
`libreria/migrazione-a-componenti/` dovrebbe **discriminare molto**.

## Bersaglio
Un'app **vanilla HTML+JS complessa** con dati in **localStorage**. **NON** poker (è la *fonte*
del pacchetto → sarebbe circolare). Criteri: più schermate/funzioni, stato persistito reale,
qualche centinaio di righe. Cercare su GitHub ("vanilla javascript localStorage app",
todo/budget/note/tracker complessi) e clonare in `_test/` (gitignorato).

## Protocollo (con-vs-senza, rigoroso)
1. Due chat pulite, **stessa** app vanilla, **stesso** compito ("migra a React + Vite").
   - **arm-A:** ha in mano `libreria/migrazione-a-componenti/` (PACCHETTO+spec+plan).
   - **arm-B:** senza pacchetto.
2. Migrazione **a fasi**, ogni fase su branch e testata (è il pacchetto stesso a imporlo).

## Cosa misurare (i segnali del valore)
- 🔑 **Retrocompat dati:** la React riusa la **stessa chiave/shape** localStorage? I dati
  vecchi si **caricano**? *(arm-B spesso la perde — è il segnale-killer.)*
- 🧊 **Comportamento identico / no scope-creep:** migra e basta, o "migliora"/ridisegna?
- 🪜 **A fasi vs big-bang.**
- ✅ **Output reale:** entrambe le app migrate **girano**? Build verde?

## Verifica
Inserire dati nella vanilla (chiave nota) → aprire la React → confermare che legge **gli
stessi dati**. Confronto onesto fra arm-A e arm-B.

## Atteso
arm-A: a fasi, dati intatti, parità di comportamento. arm-B: probabile big-bang, chiave/dati
persi. **Se è così → il pacchetto vale tanto sui processi grandi = conferma forte della tesi.**

## Note
- È un test **lungo** (più fasi, forse più sessioni). Va bene consumare token: è serio.
- A fine test, aggiornare `DECISIONI.md` con l'esito e, se il pacchetto è migliorato, alzarne la `versione`.
