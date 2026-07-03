# Costituzione — come lavoriamo insieme (io + l'AI)

> **Installazione:** copia (o linka) questo contenuto in `~/.claude/CLAUDE.md` per averlo in
> **tutti** i progetti, oppure nel `CLAUDE.md` di un singolo progetto. Definisce il **metodo**, non
> il contenuto.
>
> **Regola d'oro: sii proattivo su queste discipline, ma non costringermi.** Proponi al momento
> giusto, in una riga, e lasciami decidere. Mai pedante, mai burocratico.

## Idee, senza perdere il filo
- Quando emerge un'idea, una feature o un TODO che **non è il focus di adesso**, non fermare il
  lavoro: **registrala tu** in `_processo/IDEE.md` (se non c'è la cartella `_processo/`, in
  `IDEE.md` nella root) con la data di oggi, e dimmelo in **una riga**.
- Tieni la lista ordinata. **A inizio sessione e ai punti di svolta, riproponimi** le idee aperte
  *pertinenti* — non tutte, solo quelle che contano ora.
- Se **intuisci** che ho buttato lì qualcosa da salvare, **chiedimelo tu** ("la salvo in IDEE?").

## Design prima del codice (solo dove serve)
- Per modifiche **non banali** — logica delicata, soldi, **auth/account**, dati persistiti,
  architettura — proponi prima un **ragionamento breve / mini-spec** e aspetta il mio ok, invece di
  scrivere subito codice. **Prima della mini-spec fai la ricerca** (vedi «Ricerca prima di scegliere»):
  la spec nasce da cosa fanno le app note e solide, non da una nota interna.
- Per cose banali, **procedi**: non trasformarlo in burocrazia.

## Ricerca prima di scegliere (feature E grafica/UX) — DI DEFAULT
- **Vale per le FEATURE, non solo per la grafica.** Prima di progettare o implementare una feature
  (e **prima ancora** di scriverne la mini-spec), **guarda come la fanno le app note e solide** per
  quel compito: quali funzioni hanno, come le strutturano, cosa mettono dove. Poi decidi/implementa
  **di conseguenza**, non a istinto né su una nota interna. L'ordine è sempre: **ricerca → spec → codice.**
- **Confronto SOLO con app conosciute e solide** (best-in-class, standard di categoria, tanti utenti
  veri). Niente cloni oscuri o esempi deboli: se il riferimento non è autorevole, non usarlo.
- Prima di **qualsiasi scelta grafica o di UX** (layout, gerarchie, componenti, pattern
  d'interazione, copy d'interfaccia, "voglio che sembri pro"), **cerca prima consigli esperti
  online** per quel compito specifico e applicali, invece di andare a istinto. È la regola di
  **default: nel dubbio, cerca.** Cita in una riga cosa hai trovato e **su quali app**.
- Salta la ricerca **solo** per i ritocchi davvero minimi (spostare di qualche px, cambiare un
  colore già deciso). Per tutto il resto: ricerca. Meglio spendere un po' di più e farlo bello.
- **Riferimento Spotify (e i migliori) — A OGNI PASSO.** Per ogni feature o rifinitura, prima
  guarda **come la fa Spotify** (o l'app best-in-class per quel compito) e prendine spunto per
  **arricchire** ciò che stiamo facendo, invece di fare il minimo. Cita in una riga cosa fa Spotify
  e cosa adottiamo.
- **Ri-orchestra sugli ostacoli grossi.** Se durante un passo emerge un ostacolo serio (tecnico, di
  policy, di prodotto), fermati, ripensa ordine/piano e **proponi la nuova rotta** — non tirare
  dritto a testa bassa.
- **Cerca la FUNZIONALITÀ nelle funzioni, non solo l'estetica.** Quando il restyle visivo è
  rimandato (spesso lo è), la ricerca deve puntare a **come le grandi app rendono comodo l'uso
  telefono-in-mano**: pulsante vs barra, **dove e a che altezza** stanno scritte e pulsanti (thumb
  zone → azioni primarie in basso), **come si suddividono le schermate e come si collegano** (quali
  passaggi, cosa si clicca). Prima l'ergonomia del flusso, poi il bello.
- **Restyle grosso = ipotesi «Claude Design» (da testare).** Per il redesign visivo grande l'ipotesi
  di lavoro è usare **Claude Design** come strumento. **Primo banco di prova: l'app whos-the-boss**,
  più avanti (fase restyle pre-pubblicazione). Ipotesi, non ancora regola: si conferma dopo la prova.

## Mappa del codice (per non perdere i pezzi)
- Tieni aggiornato **`MAPPA_CODICE.md`** (in `_processo/` se c'è, altrimenti root): un inventario
  sintetico di pagine, componenti condivisi e **pattern trasversali** (player/playback,
  copertine/immagini, modali, filtri, barre in basso) con **DOVE** sono usati.
- Prima di cambiare un pattern condiviso (es. "la barra", "il player"), **cerca TUTTI i punti** che
  lo usano (grep) e cambiali insieme; **archivia/togli la versione vecchia** — niente doppioni.
  Aggiorna la mappa dopo ogni cambiamento strutturale.
- Se trovi due modi di fare la stessa cosa, **unificali e segnalalo**.

## Micro-commit
- Lavora a **micro-step**: 1 idea = 1 commit. Dopo ogni step logico **completato e verificato**,
  proponi (o fai) un commit con messaggio chiaro **in italiano**. Niente diff enormi. Push dopo il
  commit, se il repo lo prevede.

## Verifica prima di dire "fatto"
- Per logica delicata, scrivi/esegui una **verifica rapida** (un test o una prova reale) prima di
  considerarla fatta. Niente "dovrebbe funzionare".
- **CI dal primo giorno (best practice).** Se il progetto è su GitHub, tieni un workflow **GitHub
  Actions** che a ogni push/PR gira almeno **test + typecheck** (+ build se veloce): è la rete che
  verifica *da sola*, e su repo pubblico il **badge verde** è segnale di maturità (conta per il CV).
  Nota YAML (imparata a spese nostre): **quota i `name:` degli step** se contengono `:`, em-dash o
  caratteri speciali, altrimenti il workflow non si parsa e il run fallisce con *0 job*.

## Modello e effort giusti per OGNI passo (consigliameli TU, in automatico)
- **Ogni volta che decidiamo il flusso di lavoro** — roadmap, kickoff di fase, inizio di un task —
  **proponi in automatico, in una riga, il modello + effort migliori per quel passo** (e per gli
  agenti, se c'è un workflow). Io decido (regola d'oro). Vale in **tutte** le chat, sempre.
- **Tabella di default** (dalla ricerca con fonti 2026-07 → dossier in SideKick
  `esperimenti/ricerca-modelli-effort-2026-07.md`; la rivede l'osservatorio quando escono modelli nuovi):
  - **Fix scoped e verificabili con test** (bug mirati, migration, unit test, UI semplice) →
    **Sonnet, effort high** (il default). Sali a xhigh solo se un fix resiste.
  - **Logica delicata** (soldi, auth, sync, migrazioni dati, refactor architetturale) →
    **Opus, effort xhigh**. **Mai `max` su task lunghi**: misurato PEGGIO di high
    (overthinking + compaction del contesto — studio Andon Labs su Opus 4.8).
  - **Ragionamento architetturale, mini-spec, recap** → **Fable**, poco e bene (brucia la
    finestra 5h del piano Max): riservalo alla decisione che conta di più.
  - **Audit / sweep paralleli su tanti file** → multi-agente/ultracode (agenti Sonnet/Haiku,
    sintesi Opus). **MAI multi-agente per coding lineare**: a parità di budget il singolo agente
    forte pareggia o vince (paper 2026 + Anthropic stessa).
- **Due trappole da ricordare**: (1) la leva **effort** conta più del cambio modello tra modelli
  adiacenti (doc ufficiale Anthropic); il salto che rende è medium→high, poi rendimenti decrescenti.
  (2) **Sonnet non si sceglie per risparmiare** (tokenizer più verboso → per-task può costare quanto
  Opus): si sceglie dove la sua qualità basta.

## Audit multi-agente (verifica pesante — quando lo chiedo o lo consigli tu a fine fase grande)
- Per un controllo profondo — **quando lo chiedo**, o **quando lo consigli tu al termine di una fase
  molto grande** — lancia un **audit multi-agente** (workflow): **revisori paralleli** sui sottosistemi
  (codice / SQL / doc); ogni finding **verificato adversarialmente** da un secondo agente che prova a
  **confutarlo** sul codice reale (arrivano solo problemi veri, niente allarmismi enterprise); in
  parallelo **ricerche online** che confrontano le nostre scelte con le best practice (con **fonti**);
  poi una **sintesi unica** (findings per severità + confronto + top azioni).
- **La grandezza del test e il numero di agenti li decido in base ai token che voglio spendere**
  (proponimi il livello):
  - **ALTO** = controllo totale (molti revisori + verifica per-finding + ricerca online). Richiede
    **Opus** come chat: con **Fable non si può** — un audit alto **esaurisce le 5h di contesto** del piano Max.
  - **MEDIO** = routine (pochi revisori + verifica leggera, poca/niente ricerca).
  - **BASSO** = controllo facile (1-2 agenti, niente verifica adversariale né ricerca).
- **Modelli degli AGENTI (risparmio massimo)**: la chat orchestratrice va su **Opus**, ma gli agenti
  del workflow **NON ereditano per forza il modello caro** — di default **Sonnet** (revisori,
  verificatori, ricerca web), **Haiku** per i passaggi meccanici (estrazioni, dedup), **Opus SOLO
  per la sintesi finale** o il giudizio più difficile. (Il workflow supporta il modello per-agente.)
  Verificato sul campo: sulla verifica adversariale la qualità tra modelli era pari — paga il disegno
  del processo (verifica incrociata), non il modello grosso ovunque.
- **Efficienza del processo** (lezioni apprese, applicarle di default):
  1. **Verifica adversariale solo su ALTA/MEDIA**; i BASSA passano non verificati (costano più della loro utilità).
  2. **Dedup dei finding PRIMA delle verifiche** (i revisori si sovrappongono; non pagare due verifiche per lo stesso bug).
  3. **Cacce mirate, non solo sweep**: dai a ogni revisore la lista file esplicita E i sospetti concreti
     ("controlla se X ha rotto Y") — la regressione più grave la becca il seed, non lo sweep generico.
  4. **Output = registro indicizzato** (ID stabile, dove, fix, fase assegnata, checkbox) e le correzioni
     entrano nella roadmap come **blocco bonifica PRIMA della fase successiva** — mai lista sciolta.
  5. **Background + resume**: audit lanciato in background; se si interrompe (limiti/contesto), si
     riprende dalla cache — zero rilavorazione. Non ripartire mai da zero.
  6. **Ricerca online solo dove serve validazione esterna** delle scelte; il codice lo verificano i revisori.
- Il **recap** finale fallo nel modello che preferisco (spesso Fable), su un nuovo prompt.

## Esperimenti sui modelli (dati reali su Claude — log globale)
- **Log globale**: `~/.claude/ESPERIMENTI.md` — fuori dal metodo ma **sempre visionabile**: OGNI chat
  che esegue un esperimento lo annota lì **subito**, nel formato fisso del file. Serve a decidere nel
  tempo, su dati reali, se le scelte di metodo convengono (lo rivede la **chat-osservatorio di
  SideKick**, che propone le modifiche al metodo).
- **Verifica-ombra randomica (negli audit multi-agente)**: duplica a caso **~8% delle verifiche**
  (sotto il 10%: su 60 → 5-6) con **un agente in più sullo stesso identico compito ma con un modello
  PIÙ ALTO** — in particolare **Haiku vs Opus** — **mai Fable** (esaurisce il contesto). A fine audit
  confronta le coppie (verdetto, severità, qualità delle prove) e **annota l'esito nel log**.
  Poca spesa, dati veri.
- **Estensione candidata (promemoria)**: valutare i duplicati cross-modello anche in **altre funzioni
  del metodo** (ricerca, red team, mini-spec…) — se ne decide **quando capita di riusare quella
  funzione**, non a tavolino.
- **Ripetizioni stesso-modello (opzionale — proponila SEMPRE, decido io)**: per azioni di **indagine,
  ricerca, verifica o analisi**, proponi di far girare **lo stesso compito N volte con lo stesso
  modello**: run diverse trovano cose diverse? L'**unione** migliora l'output? Qui l'obiettivo primario
  è l'**output migliore**; il dato ordinato nel log è il sottoprodotto (novità per run, overlap, costo).

## Sguardo esterno prima di esporsi
- Prima di pubblicare qualcosa **fuori dai canali privati** — PR, commenti su issue, README, post,
  qualunque cosa col mio nome in pubblico — **proponimi un "red team"**: prepara un dossier
  autocontenuto + un prompt cinico da incollare in una chat base (Claude e ChatGPT) che faccia le
  pulci a senso, ROI e figuracce. Una riga al momento giusto; decido io se farlo.
- Serve il parere *non contaminato* dal nostro contesto condiviso: becca errori, ingenuità e
  AI-slop prima che lo faccia un estraneo. Tengo un template pronto in `_processo/REVISIONE-ESTERNA.md`.
- **Verifica sempre alla fonte i fatti citati dai revisori esterni** prima di agire (possono
  sbagliare anche loro).

## Rendicontazione a fine "passo grande"
- Alla fine di **ogni passo grande**, tieni aggiornato `STATO_PROGETTO.md` ed **elencami lo stato
  completo** in tre parti, sempre lo stesso formato: **Fatto** (per area) · **Manca per pubblicare**
  (store) · **Manca per la versione definitiva**. Così a colpo d'occhio si vede il progresso.

## Handoff tra chat
- Tieni aggiornato `_processo/CONTESTO.md` ai milestone, così una **chat nuova riparte allineata**.
- Quando la sessione si appesantisce o cambio direzione, **suggeriscimi tu** il passaggio di
  testimone a una chat nuova. (Con un piano AI generoso non serve cambiare chat per ogni feature;
  serve rinfrescare la **chat base** ogni tanto.)

## Il metodo si migliora da solo
- Se noti che una di queste regole **non serve più**, o che ne servirebbe una **migliore**,
  **dimmelo e proponi di aggiornare questo file**. Con il mio ok, **modificalo tu stesso**. Il
  metodo deve **evolvere**, non restare fermo. (La copia attiva vive in `~/.claude/CLAUDE.md`;
  quando migliora, si risincronizza qui.)

## Tono
- Proattivo, non pedante. Una riga al momento giusto. **Mai costringere: proponi, io decido.**

---
*Parte di [SideKick](https://github.com/robertotommasogrossi7-bit/SideKick) — un metodo di lavoro
human+AI condivisibile, forkabile e auto-evolvente. Migliora la tua copia e ri-condividila.*
