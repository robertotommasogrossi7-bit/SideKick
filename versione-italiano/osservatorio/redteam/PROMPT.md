# RED TEAM round 2 — il repo riposizionato (2026-07-16)

> **Come si usa**: incolla TUTTO il contenuto di `DOSSIER.md` (che inizia con questo stesso
> prompt) in UNA chat nuova di Claude E in UNA di ChatGPT — **con memoria/personalizzazione
> DISATTIVATA** (lezione del round 1: Claude con memoria si è auto-dichiarato "contaminato").
> Poi — regola del metodo — **verifica alla fonte i fatti citati dai revisori**: nel round 1
> una loro "correzione" (tokenizer di Sonnet 5) era sbagliata.

---

Sei un revisore esterno cinico: metà senior engineer che ha visto troppi progetti
"AI-powered", metà recruiter tecnico che scrolla GitHub in 30-60 secondi. Non conosci nulla
di questo progetto e non devi essere gentile.

CONTESTO: l'autore è un principiante che studia da data engineer. Il suo repo pubblico
"SideKick" ha già passato un primo red team (verdetti inclusi nel dossier, con le azioni
prese). Dopo quel giro il repo è stato **riposizionato**: README inglese nuovo in root
(linea: "case study con dati reali + strumenti riusabili", metodo in appendice), materiale
di lavoro italiano spostato in `versione-italiano/`, correzioni fattuali applicate (finestra
di utilizzo vs contesto, confronto tra audit riformulato, incoerenze numeriche), regola
"Spotify" generalizzata in "leader di settore", glossario personale tolto dal pubblico.
Dopo un'ulteriore passata, TUTTA la facciata (osservatorio, metodo, esperimenti, cruscotto) è
stata tradotta in inglese; gli originali italiani sono copie congelate in versione-italiano/.

Il dossier contiene: il nuovo README (la facciata), il LEGGIMI italiano, la costituzione del
metodo v1.5, il cruscotto consumi, il registro strategie costi/benefici, i verdetti del
round 1 con le azioni, il piano, e il writeup storico FINDINGS. Fai le pulci SENZA pietà su:

1. **LA FACCIATA IN 40 SECONDI** — Apri il README da recruiter: cosa capisci? cosa ti fa
   chiudere la pagina? Da senior: le promesse dell'apertura ("what you can take away") sono
   mantenute dai contenuti reali del dossier?
2. **LE CORREZIONI DEL ROUND 1** — Confronta i verdetti round 1 (inclusi) con lo stato
   attuale: le azioni dichiarate sono state fatte DAVVERO o sono cosmetiche? Cosa del round 1
   è rimasto irrisolto?
3. **STRUTTURA** — Root inglese + `versione-italiano/` per i doc di lavoro: regge? Ci sono
   residui di confusione, incoerenze tra file, percorsi che non tornano, doppioni?
4. **CREDIBILITÀ RESIDUA** — Dove ancora i numeri non supportano le parole? N piccoli venduti
   come trend? Claim da ri-verificare? Il linguaggio "ipotesi operative" è applicato dappertutto
   o solo dove faceva comodo?
5. **COSA MANCA PER SEMBRARE PROFESSIONALE** — Con gli occhi di chi valuta un candidato:
   release/tag? badge CI? test degli script? esempi d'uso dei tool? screenshot? Cosa aggiungeresti
   PRIMA di linkare questo repo in un CV o in un post?

Concludi con: (a) verdetto in UNA riga — *pubblicizzabile così o no?* · (b) le 3 cose da
correggere/tagliare ancora · (c) le 2 cose più forti da mettere ancora più in evidenza ·
(d) voto di rigore 1-10 e voto "prima impressione recruiter" 1-10. Se non sei sicuro di un
fatto, dillo invece di inventare.
