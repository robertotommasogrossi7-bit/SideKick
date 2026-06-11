# Valutazione esterna — far giudicare i risultati da chat fresche e imparziali

> Scopo: capire se quello che abbiamo prodotto ha **valore reale**, **senza** il bias di assecondamento
> (né di questa chat né di un singolo modello). Usa **modelli diversi** e **non rivelare** di essere
> l'autore né che ti piace.

## Regole per non falsare il test
- Incolla i materiali a **chat nuove e pulite**, idealmente di **modelli diversi** (es. un GPT, un
  Gemini, un Claude nuovo). Bias condivisi → meno se cambi famiglia di modello.
- **Non** dire "l'ho fatto io e penso sia bello". Presentalo come lavoro di altri da giudicare.
- Chiedi **durezza** esplicita e **voti con motivazione** (così non può cavarsela con vaghezze).
- Confronta più risposte: se convergono sui limiti, è segnale forte.

## Prompt A — solo testo (incolla il contenuto di `FINDINGS.md`)
```
Sei un ingegnere software senior e scettico. Qui sotto c'è il writeup di un progetto altrui;
non sai chi l'ha scritto e non devi essere gentile o incoraggiante. Valutalo con durezza.

[INCOLLA QUI IL CONTENUTO DI FINDINGS.md]

Rispondi:
1. La metodologia regge? Falle? (campione, soggetto dei test, giudice, generalizzabilità)
2. Le conclusioni sono SUPPORTATE dall'evidenza, o sono opinioni travestite da dati?
3. C'è qualcosa di realmente nuovo/utile, o è ovvio per chi lavora con l'AI?
4. Ha valore per un dev SENIOR, o è roba da entry-level?
5. Cosa servirebbe per renderlo credibile/utile davvero?
6. Voti 1-10 con motivazione: interesse, rigore/quanto-e-testato, utilita per un senior.
Non assumere che il lavoro sia buono. Se e debole, dillo e spiega perche.
```

## Prompt B — con accesso al repo (un Claude Code / agente che può navigare)
```
Apri il repo pubblico github.com/robertotommasogrossi7-bit/SideKick. Leggi FINDINGS.md,
_processo/DECISIONI.md e la cartella esperimenti/. Non sei l'autore, non devi incoraggiare.
Poi rispondi alle 6 domande del Prompt A, con durezza e voti motivati. In piu': i test in
esperimenti/ dimostrano davvero quello che FINDINGS afferma, o c'e' un salto?
```

## Cosa farne
- Se più modelli dicono "sotto-potenziato / ovvio / poco utile a un senior" → **lo sappiamo**, e
  decidiamo se (a) fermarci e tenerlo come esercizio onesto, (b) fare l'**unico test con i denti**
  rimasto (intero progetto con auth/account, quando poker è pronto), o (c) ripensare lo scopo.
- Se emergono critiche **specifiche e correggibili** → le sistemiamo prima di pubblicare (#2).
- Registra gli esiti qui sotto.

## Esiti (da compilare)
- _(incolla qui le risposte chiave delle chat esterne)_
