# Red team 2026-07-16 — verdetti, verifiche, azioni

> Doppia run sullo stesso dossier: **Claude** (⚠️ auto-dichiarato contaminato: aveva memoria
> dei progetti — punteggio rigore 4/10) e **ChatGPT** (pulito — punteggi per aspetto, es.
> originalità 9/10, comunicazione 5,5/10). Regola applicata: **ogni affermazione dei
> revisori è stata verificata prima di agire**. I testi completi sono nella chat-osservatorio
> del 2026-07-16. Il kit operativo del red team (prompt cinico + dossier autocontenuto da
> incollare in chat AI nuove) è in italiano nella cronologia git del repo
> (`versione-italiano/osservatorio/redteam/`, PROMPT.md e DOSSIER.md, fino al 2026-07-25).

## Dove i due verdetti CONVERGONO (→ riga per il README)
1. **Il valore per uno sconosciuto è**: FINDINGS.md (fallimento raccontato onestamente) + gli
   **strumenti riusabili** (usage.mjs, cost-meter, oracolo hidden-test) + il **dataset reale di
   consumo per sessione** (quasi nessuno lo pubblica). → Devono APRIRE il README.
2. **La meta-struttura (costituzione, osservatorio, governance) diluisce il valore** se
   presentata come identità del repo → in pubblico va ridotta/spostata in appendice;
   l'auto-emendamento presentato come ipotesi, non come identità.
3. **N piccoli formulati come regole** → riformulare come "ipotesi operative (N=…)".
4. Rapporto meta-lavoro/prodotto = rischio reputazionale: servono più cose *spedite*.

## Verifica delle affermazioni dei revisori (fatta alla fonte)
| Affermazione del revisore | Esito della verifica | Azione |
|---|---|---|
| "Tokenizer di Sonnet: quasi certamente un errore, verificare" (Claude) | **Revisore SMENTITO**: la pagina ufficiale di Sonnet 5 conferma "tokenizer aggiornato... circa 1,0–1,35× più token" | Affermazione mantenuta, con fonte e data di ri-verifica ✅ |
| "'5h di contesto' confonde finestra di utilizzo e finestra di contesto" (Claude) | **Vero**: era la finestra di UTILIZZO (il limite d'uso di 5h del piano Max) | Corretto in COSTITUZIONE (2 punti) + LESSONS ✅ |
| "−60% tra audit: progetti diversi, non un confronto" (Claude) | **Vero** | Riformulato con l'avvertenza in LESSONS + STRATEGIES ✅ |
| "Cache 170× venduta come scoperta: è normale meccanica di caching" (Claude) | **Mezzo vero**: la meccanica è nota, il dato misurato sui NOSTRI transcript e la regola di handoff sono il contributo | Riformulato in LESSONS ✅ |
| "45 confermati = agenti che verificano agenti, circolare" (Claude) | **La risposta esisteva ma non era scritta**: oltre 30 finding sono poi stati corretti e validati da test verdi/typecheck | Aggiunta "anti-circolarità" in STRATEGIES ✅ |
| Incongruenze 23 contro 11 progetti · 6,1M contro 6,7M (Claude) | **Vero** (cartelle contro raggruppati; senza/con worktree) | Entrambe chiarite in DATA ✅ |
| "La redazione di progetto-15 è cosmetica, stai raccontando i bug di terzi" (Claude) | **Parzialmente**: è un progetto DI Roberto (non di terzi), non ancora pubblico | ✅ Deciso 2026-07-16: mantenere la formulazione generica ("trovato e corretto prima del lancio" è una buona storia); rivalutare al lancio dell'app |
| "La regola Spotify è cargo-cult da principianti in pubblico" (entrambi, toni diversi) | Opinione, non fatto | ✅ Deciso 2026-07-16: regola riformulata come "leader di settore" (aziende/app/software professionali, funzionanti e a capo del rispettivo settore; Spotify solo come esempio) — e tenuta fuori dalla vetrina pubblica |
| "Servono benchmark, non case study" (ChatGPT) | Vero come inquadramento | Il repo si presenta come **case study/ricerca esplorativa**, mai come benchmark |

## Azioni per il riposizionamento (aggiornare PLAN §3)
1. Nuovo ordine del README: **(1) cosa ti porti a casa** (strumenti + dataset CSV + scrittura
   FINDINGS) → (2) gli esperimenti e i dati → (3) il metodo in appendice con un link (versione
   pubblica breve; la costituzione completa resta nel repo per chi la vuole).
2. Linguaggio: "ipotesi operative (N=…)" invece di "regole/lezioni" nel materiale pubblico.
3. Sezione esplicita "cosa NON ha funzionato" (già in FINDINGS/STRATEGIES: metterla in
   evidenza).
4. Strumenti separati dal metodo (cartella/sezione `tools` chiara, README dedicato per gli
   strumenti).
5. Budget: ~80% esperimenti / 20% manutenzione del metodo da qui in poi (verdetto ROI di
   entrambi i revisori — coerente col nostro stesso registro STRATEGIES).

---

## Round 2 — 2026-07-17 (il repo riposizionato)

> Doppia run di nuovo: **Claude** (memoria OFF questa volta — rigore 6,5/10, prima
> impressione da recruiter 4/10) e **ChatGPT** (rigore 8,8/10, recruiter 8,2/10). Entrambi
> concordano sui due asset reali: **FINDINGS.md e il dataset**. Testi completi nella
> chat-osservatorio del 2026-07-17. Ogni affermazione verificata prima di agire, come da
> metodo.

| Affermazione del revisore | Verifica | Azione |
|---|---|---|
| "ccusage e un intero ecosistema già fanno il parsing degli stessi transcript JSONL locali; *'pochissimi dati di consumo sono pubblici'* è un'affermazione non verificata e lo strumento non è raro" (Claude) | **CONFERMATO alla fonte**: [ccusage](https://github.com/ryoppippi/ccusage) (report giornalieri/mensili/per sessione, blocchi da cinque ore, ripartizione per modello) + tokscale e altri | README riscritto lo stesso giorno: cosa ti porti a casa riposizionato sul **dataset pubblicato con operazioni nominate** ("per quanto ne sappiamo"), ccusage citato, quickstart aggiunto ✅ |
| "Una verifica-ombra a N=2 venduta come 'pattern'" (Claude) | Vero | Declassata a "una singola verifica-ombra cross-modello (N=2) — un'indicazione" nel README ✅ |
| "Cache ~170× *'quindi riprendere batte ripartire'* — il 'quindi' non è guadagnato" (Claude) | Vero | Riformulato: regola operativa derivata dalla meccanica di caching + una ripresa misurata, esplicitamente *non* un A/B ✅ |
| "Costituzione piena di MAI/SEMPRE con fonti non collegate" (Claude) | Vero | L'affermazione sul tokenizer ora cita inline anthropic.com/news/claude-sonnet-5; entrambe le costituzioni dichiarano che tutti gli URL delle fonti vivono nel dossier di ricerca. Passata completa in tono-ipotesi: in sospeso (PLAN) |
| "La costituzione 'drop-in' è un documento personale" (Claude) | Parzialmente vero | La costituzione Spec Kit **è** la variante spersonalizzata — ora dichiarato esplicitamente in entrambe le costituzioni ✅ |
| "Le copie italiane congelate saranno scambiate per documenti vivi" (Claude) | Vero | Banner CONGELATO aggiunto a tutti i 21 file congelati ✅ |
| "Spotify ancora dentro la costituzione" (Claude) | Fatto, ma una decisione del proprietario | Roberto ha scelto esplicitamente la formulazione generalizzata *con* l'esempio "(es. Spotify per la musica)". Mantenuto, verbalizzato. |
| "Mancano CI, test, screenshot, quickstart — l'azione 4 del round 1 è stata saltata" (entrambi) | Vero | Quickstart aggiunto oggi; CI + test + screenshot della dashboard + CONTRIBUTING in inglese = prossimo blocco di lavoro (vedi PLAN) |
| "Repo troppo centrato su Claude; inquadrarlo come ingegneria del software assistita da AI" (ChatGPT) | Opinione con merito | Titolo e introduzione reinquadrati ("agente AI di coding — Claude Code è lo strumento attuale"); passata più approfondita dopo |
| "Il nome utente sembra generato automaticamente" (Claude) | Fatto | Decisione di Roberto — annotato, non agito |

**Traiettoria**: rigore 3/10 (round 1, Claude) → 6,5/10 (round 2, Claude) / 8,8 (ChatGPT).
**Meta-lezione sul metodo**: al round 1 una "correzione" del revisore era SBAGLIATA
(tokenizer); al round 2 l'affermazione principale del revisore era GIUSTA (ccusage).
Verificare alla fonte taglia in entrambi i sensi — è esattamente per questo che la regola
esiste.
