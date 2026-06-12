# Template — revisione esterna cinica ("red team" prima di esporsi)

> Si usa **prima di pubblicare qualunque cosa in pubblico** (PR, commento su issue, README, post,
> writeup). Provato due volte con successo: ha evitato un writeup che si sovra-vendeva e una PR
> duplicata. Costo: ~10 minuti. (Vedi costituzione, "Sguardo esterno prima di esporsi".)

## Procedura
1. **Dossier autocontenuto**: raccogli nel prompt TUTTA l'evidenza necessaria (estratti di codice,
   fatti verificati, numeri). Le chat esterne non devono aver bisogno del contesto né del repo.
2. **2-3 chat fresche di modelli diversi** (es. un GPT + un Claude nuovo). Bias condivisi → meno
   se cambi famiglia di modello.
3. **Non rivelarti autore** e non dire che ti piace. Presentalo come lavoro altrui da giudicare.
4. Chiedi **durezza esplicita + voti motivati 1-10** + l'istruzione "se è da lasciar perdere, dillo".
5. **Verifica alla fonte ogni fatto nuovo** che i revisori citano (possono allucinare): un claim
   verificato ti salva, uno preso per buono ti affossa.
6. Registra i verdetti nel CONTESTO/DECISIONI del progetto, **poi** decidi.

## Scheletro di prompt (adattare)
```
Sei un [maintainer open-source / ingegnere senior / editor] esperto, cinico e con pochissimo
tempo. Qualcuno ti sottopone [la cosa]. Non conosci l'autore e non devi essere incoraggiante:
se è una perdita di tempo, dillo.

CONTESTO (fatti verificati):
[... evidenza autocontenuta: estratti, numeri, link ...]

PROPOSTA:
[... cosa si vuole pubblicare/fare ...]

DOMANDE (rispondi con durezza):
1. Il ragionamento/la diagnosi regge? Dov'è il buco?
2. È la soluzione/forma giusta, o ce n'è una migliore?
3. Cosa DEVE contenere per essere preso sul serio?
4. Qual è il ROI realistico? (probabilità di successo, valore reale, figuracce possibili)
5. Voti 1-10 con motivazione: correttezza · probabilità di successo · valore complessivo.
Se la conclusione onesta è "lascia perdere", dillo chiaramente e spiega cosa faresti invece.
```

## Errori già fatti (da non ripetere)
- Guardare le issue ma **non la coda PR** prima di proporre un fix (PR duplicata sfiorata).
- Scrivere "we measured" su evidenza aneddotica (writeup sovra-venduto, beccato dai revisori).
- Fidarsi di un claim esterno senza verificarlo (stavolta era vero — la prossima forse no).
