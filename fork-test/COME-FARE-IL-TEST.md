# Come fare il fork-test (A/B)

**Obiettivo:** misurare se avere in mano il pacchetto `settlement-equo` fa progettare
**meglio / prima** la stessa feature, partendo dallo stesso punto.

## Le due cartelle (già pronte)
- `arm-A-con-pacchetto/` — la app base **+** il pacchetto in `pacchetto/settlement-equo/`.
- `arm-B-senza-pacchetto/` — solo la app base (identica byte per byte).

L'unica differenza è la presenza del pacchetto (e la riga in cima al prompt che dice di
usarlo). Tutto il resto è identico.

## Protocollo
1. Apri **due chat Claude separate e pulite**, una in ciascuna cartella.
2. In chat A incolla `PROMPT-arm-A.md`; in chat B incolla `PROMPT-arm-B.md`.
3. **Non aiutarle.** Lasciale lavorare da sole fino al resoconto finale.
4. (Opzionale ma utile) apri `index.html` nel browser e prova la feature prodotta da
   ciascuna con gli stessi dati di esempio (vedi sotto).

## Dati di esempio per provare il risultato
- Marco, Luca, Anna.
- Marco paga 30 per tutti e tre (cena).
- Luca paga 12 per Marco (benzina).
- Anna paga 9 per Luca.
Saldo corretto atteso (minimo): pochi trasferimenti netti, **nessun A→B e B→A insieme**.

## Cosa osservare (i segnali di valore)
- ⏱️ **Velocità / sicurezza**: A arriva prima a un modello sensato? Fa meno domande a vuoto?
- 🧠 **Qualità del modello**: A **compensa i debiti reciproci** e punta a **minimizzare i
  trasferimenti**? B lo fa, o ripropone i debiti grezzi uno per uno?
- 🐞 **Il bug-spia**: B produce trasferimenti ridondanti / qualcuno che è insieme "dà" e
  "riceve"? A lo evita (il pacchetto lo avvisa con l'auto-compensazione)?
- ✅ **Casi limite**: chi gestisce A↔B reciproci, "paga per tutti", debiti incrociati?

## Come giudicare
- Se A è **più veloce, evita il bug-spia e produce un modello più pulito** → il pacchetto
  ha valore, la forma regge. Si passa a F2 (automatizzare la distillazione).
- Se **non c'è differenza** → il pacchetto è troppo magro/astratto ("poco pieno"): si
  arricchisce (es. aggiungere `prompts.md`, più esempi, più "cardini") e si ri-testa.

> È un esperimento, non un esame: qualunque esito ci dice cosa migliorare. La forma ideale
> del pacchetto si trova iterando.
