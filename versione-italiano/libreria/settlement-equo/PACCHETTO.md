---
id: settlement-equo
tassonomia: Pratiche
tag: [soldi, settlement, minimum-cash-flow, debiti, split]
non_ovvieta: bassa
esito: in produzione, coperto da test; problema standard ("minimum cash flow")
provenienza: poker/_processo/SETTLEMENT_SPEC.md + USCITA_CASH_SPEC.md (motore F2)
versione: 0.2
speckit_compat: true
---

# Pacchetto — Settlement equo tra partecipanti

## Identità
N partecipanti mettono soldi in un fondo comune e ne ritirano valori diversi → calcola
**chi deve dare contanti a chi** azzerando i conti col **minor numero di passaggi reali**.

## Quando forkarlo
Spese condivise, montepremi, cassa comune, qualunque gioco con poste: regolare i conti di
un gruppo con meno trasferimenti possibile.

## Esito
In produzione (coperto da test). **Nota onesta:** è un problema *da manuale* ("minimum cash
flow") → `non_ovvieta: bassa`. Il valore sta nel **catalogo + auto-miglioramento** (la v0.2
ha assorbito i **centesimi interi** per azzerare gli errori di virgola), non nel battere un
agente a digiuno.

## Come adattarlo
Mappa `partecipante / dovuto / versato / valore / mancante`; decidi come ottieni `valore`
nel tuo dominio (fiche? premio? quota?); tieni i 3 cardini.

## I cardini
1. **Saldo netto + auto-compensazione**: collassa tutto a UN saldo per persona → reciproci
   e cicli si elidono, nessuno è insieme debitore e creditore.
2. **Fondo ≠ contante reale**: i soldi già nel fondo si ridistribuiscono passivamente;
   "trasferimento" = solo contante che cambia mano davvero.
3. **Check non bloccante + override**: l'algoritmo è un punto di partenza, tutto editabile.

## Contenuto
`spec.md` (il cosa, Spec Kit) · `plan.md` (il come + esito + bug).

## Provenienza
Distillato dal settlement di poker (React/TS/Vitest) col motore F2 di SideKick.
