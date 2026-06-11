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

## Esiti (2026-06-11) — due valutazioni indipendenti, verdetto CONVERGENTE

**ChatGPT (senior scettico):** interesse 7 · rigore 3.5 · utilità senior 4.
**Claude fresco (senior scettico):** interesse 5 · rigore 3 · utilità senior 3.

**Convergono su tutto ciò che conta:**
- **N=1 per cella = difetto fatale.** Gli LLM hanno varianza; senza 20-30 run per braccio con
  media/deviazione, "~2x cost" è un aneddoto con un numero accanto, non un dato.
- **Soggetto sbagliato, auto-confessato:** abbiamo testato AI-esperta mentre la tesi riguarda
  l'umano. "È come valutare un esoscheletro facendo gare con Usain Bolt." La tesi vera
  (scaffolding dell'umano) **non è mai stata testata**.
- **Giudice unico non cieco** sull'unico esperimento che mostra "danno" (richiesta vaga) →
  quasi inutilizzabile.
- **Conclusioni oltre i dati:** "the durable asset is the method" è una tesi, non un risultato.
  Pivot motivato: i dati dicono negativo → la conclusione scivola su ciò che non è stato misurato.
- **"We measured it" vende un rigore che non c'è.** La forma da paper è il difetto peggiore:
  riscritto come "non sono ancora riuscito a costruire un test equo per la domanda che conta —
  ecco perché e come lo farei" diventerebbe onesto.
- **Niente di nuovo per un senior** (folk wisdom); valore plausibile per **entry-level**.
- **Si salvano:** l'onestà del negativo (rara), la misura del costo, la probe reverse-engineering,
  i 2 tool (cost-meter, grader leak-proof), l'istinto metodologico ("migliore del 90% dei post
  sul tooling AI" — Claude).
- **Cosa servirebbe:** 20-30+ run per braccio; **studio UMANO** (utenti veri, con/senza, outcome
  misurati); giudici ciechi con rubrica; task non-derivabili (auth/soldi/proprietario); braccio
  col pacchetto corretto (isolare struttura vs contenuto sbagliato); misure longitudinali.

**Conseguenza:** non pubblicare FINDINGS così com'è (#2 sospesa). Ricalibrare il linguaggio è il
minimo non-negoziabile; la direzione si decide a parte (vedi DECISIONI).
