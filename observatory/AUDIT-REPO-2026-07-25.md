# Audit del repository SideKick — sintesi finale

**Data del run:** 2026-07-25 · **Perimetro:** repository personale-vetrina `C:/Users/rober/Desktop/Programmi/SideKick` (case study con dati veri, N piccoli dichiarati) · **Modalità:** sola lettura, nessuna correzione applicata.

## 1. Scopo, perimetro e processo

**Scopo.** Verificare la coerenza, la credibilità e la navigabilità del repo così come lo incontra un lettore esterno — recruiter, adottante del metodo, visitatore curioso — senza applicare la lente enterprise: è un laboratorio personale di uno sviluppatore alle prime armi, con N=1-2 dichiarati e risultati anche negativi pubblicati apposta. I rischi puramente teorici sono stati scartati in fase di verifica.

**Perimetro.** README pubblici (root + `ITALIANO/`), documentazione del metodo (`plugins/metodo/`), dati dell'osservatorio (`observatory/`: `DATA.md`, dashboard token, drilldown per-progetto, `workflow.csv`), screenshot di anteprima (`docs/img/`), e il ponte italiano (`versione-italiano/`).

**Processo (multi-agente, con verifica adversariale).**
- **3 red team** interni con lenti diverse (prima impressione/credibilità · coerenza dati/versioni · navigazione/i18n) hanno prodotto i finding grezzi.
- **5 revisori** hanno esteso la copertura su codice generatore (`usage.mjs`), CSV sorgente e cronologia git.
- **Dedup** dei finding sovrapposti prima delle verifiche (per non pagare due volte lo stesso bug).
- **Verifica adversariale per-finding:** un secondo agente ha provato a *confutare* ogni finding leggendo i file reali e la storia dei commit, ricalibrando la severità verso il basso quando il contesto attenuava il problema.
- **Sintesi unica** (questo documento).

**Conteggi.**
- Finding **CONFERMATI** e verificati: **14** — di cui **1 alta**, **8 media**, **5 bassa** (queste ultime confermate ma declassate in verifica da media/alta a bassa).
- Finding **BASSA non verificati** (passati non verificati per policy, costano più della loro utilità): **4**.
- Finding **CONFUTATI** dalla verifica: **0**.
- **Nota di calibrazione:** la verifica ha declassato **5** severità su 14 (una da alta a media, quattro da media a bassa) e ne ha **confermata 1** che il red team aveva già alzato ad alta (`studio.md`). Nessun allarmismo è sopravvissuto come "alta" ingiustificata.

## 2. Cosa dicono le 3 personas

**Il recruiter (prima impressione).** Apre il README e la prima cosa sostanziosa che legge è una citazione a esito negativo ("ho provato a misurare... e non ci sono riuscito, ancora"). Il framing esplorativo è dichiarato bene poche righe sotto e il dato concreto — l'audit multi-agente che ha trovato bug reali — esiste, ma più in basso nel file, non accanto alla citazione. Il repo *funziona* per un recruiter tecnico: è onesto e i dati sono veri. Il rischio è solo di sequenziamento narrativo: la prima schermata vende l'onestà del fallimento prima del risultato ottenuto. Nessun dato falso, nessuna promessa non mantenuta.

**L'adottante del metodo (chi vuole copiare la costituzione).** Qui c'è la lacuna più fastidiosa per questo pubblico: il file `COSTITUZIONE.md` che gli utenti sono invitati a copiare in `~/.claude/CLAUDE.md` **non riporta mai il proprio numero di versione**, e nessuno dei README linka il `CHANGELOG.md` (unico posto dove il numero vive). In più il drop-in Spec Kit si auto-dichiara `1.9.1` mentre tre fonti indipendenti dicono `1.9.0`. Per un repo che fa del versioning e del data-contract un valore cardine, è una contraddizione col proprio principio — non rompe nulla, ma mina la fiducia proprio dove il metodo promette rigore.

**Il visitatore (navigazione e "dati vivi").** Il lettore italiano viene sballottato tra due alberi italiani (`ITALIANO/` e `versione-italiano/`) senza che nessun punto d'ingresso spieghi la differenza, e la pagina d'atterraggio (`LEGGIMI.md`) non nomina nemmeno l'esistenza del mirror più recente. Sul fronte dati: la sezione "live data" mostra screenshot fermi al 2026-07-17 mentre i numeri veri (nel `.md`, aggiornati oggi) sono cresciuti — e un drilldown per-progetto (`Studio`) nasconde ~20M token per un bug di match di stringa nel generatore. I dati reali ci sono e sono consultabili; è la vetrina attorno che ha debito di manutenzione.

## 3. Registro indicizzato — finding CONFERMATI (per severità)

### ALTA

| ID | Sev | Dove | Problema | Fix proposto (1 riga) | Fonte |
|----|-----|------|----------|----------------------|-------|
| **AR-01** | alta | `observatory/usage/per-project/studio.md:1` | Il drilldown di `Studio` mostra 4 sessioni / 873k output e **nessuna** sezione "Cloud agent workflows", omettendo ~20,5M token (5 run): `usage.mjs` `gruppoDi()` ha case speciali solo per `poker`/`weather-report`, così `workflow.csv` con project `Studio (ponte)`/`Studio (StudioQuest)` non combacia col gruppo `Studio` e la sezione viene esclusa in silenzio | Aggiungere in `gruppoDi()` la mappatura dei prefissi `Studio (...)` → `Studio` (come per poker/weather-report), oppure allineare le stringhe `project` di `workflow.csv` | `usage.mjs:54-59` (`gruppoDi`) + `:179` (`wf = workflow.filter(...)`); `workflow.csv:8-12`; `sessions.csv:59-62`; sezione presente in `sidekick.md`/`progetto-15.md`/`poker-who-s-the-boss.md` |

### MEDIA

| ID | Sev | Dove | Problema | Fix proposto (1 riga) | Fonte |
|----|-----|------|----------|----------------------|-------|
| **AR-02** | media | `README.md:5` e `:102-104` | Due link italiani diversi (`ITALIANO/` vs `versione-italiano/`) senza spiegare la relazione; il loop si ripete dentro `ITALIANO/README.md:110-112`, che pur dichiarandosi mirror rimanda ancora all'altra cartella — nessun punto d'ingresso disambigua | Aggiungere in entrambi i README una riga: "`ITALIANO/` = mirror tradotto vivo; `versione-italiano/` = archivio congelato al 2026-07-17" | `README.md:5`, `:102-104`; `ITALIANO/README.md:1-2`, `:110-112`; la spiegazione reale è solo in `versione-italiano/LEGGIMI.md:3-6` |
| **AR-03** | media | `versione-italiano/LEGGIMI.md:1` | Il file che entrambi i README linkano come "documentazione di lavoro in italiano" non nomina mai `ITALIANO/` (0 occorrenze), pur essendo `ITALIANO/` nato lo stesso 2026-07-25; chi segue il link esce dal mirror senza sapere che esiste | Riga in cima a `LEGGIMI.md` che rimanda a `ITALIANO/` come mirror vivo, o consolidare in una sola cartella italiana | grep `ITALIANO` su `LEGGIMI.md` → 0; `README.md:102-104` + `ITALIANO/README.md:108-112`; `OSSERVATORIO.md:39-40` ("Dal 2026-07-25 esiste ITALIANO/") |
| **AR-04** | media | `plugins/metodo/spec-kit/constitution.md:168` | Il drop-in si auto-dichiara `Version: 1.9.1`, ma tre fonti indipendenti dicono `1.9.0` (CHANGELOG, entrambi i README) — contraddizione ancora presente in HEAD | Decidere il numero vero e allineare tutte le occorrenze (file stesso, `README.md`, `ITALIANO/README.md`, `CHANGELOG`) | `spec-kit/constitution.md:168`; `CHANGELOG.md:15` ("realigned to 1.9.0"); `README.md:29`; `ITALIANO/README.md:32`; git log commit deae2cb |
| **AR-05** | media | `plugins/metodo/COSTITUZIONE.md:1` | Il file "master" che gli utenti copiano in `~/.claude/CLAUDE.md` non riporta mai il proprio numero di versione, e nessun README linka il `CHANGELOG.md` (unico posto col numero) — lacuna di tracciabilità che contraddice il valore che il repo dà al versioning | Aggiungere `Versione: v1.9.1` in testa a `COSTITUZIONE.md`/`CONSTITUTION.md` e linkare `CHANGELOG.md` dai README | `COSTITUZIONE.md:1-15` (unica menzione è "Governance da v1.5", storica); `CHANGELOG.md:7`; grep `CHANGELOG` → mai in `plugins/metodo/README.md` né root `README.md` |
| **AR-06** | media | `observatory/DATA.md:66` | Afferma "Opus generated ~83% of historical output", ma il calcolo reale da `usage.csv` dà 77,1% (13.950.906 / 18.087.586); la tabella "By model" della dashboard conferma 77%. Nessun sottoinsieme plausibile giustifica l'83% | Ricalcolare da `usage.csv` (o linkare la query) e correggere la cifra, o specificare il sottoinsieme | `DATA.md:66`; `usage.csv` aggregato (opus-4-8 11.786.327 + opus-4-7 2.164.579); `DASHBOARD.md:96-100` |
| **AR-07** | media | `observatory/DATA.md:63` | Dice "26.3M cloud-agent tokens" ma la somma reale di `workflow.csv` è 27.576.803 (~27.6M); il gap di 1.243.042 = le due righe SideKick aggiunte il 2026-07-25 *dopo* l'ultimo commit di `DATA.md`, che però porta l'etichetta "refreshed 2026-07-25" | Aggiornare la prosa di `DATA.md` dal totale di `workflow.csv` a ogni append, anche nella stessa sessione | `DATA.md:63`; `DASHBOARD.md:12` ("27.6M"); `workflow.csv:13-14` (838.112 + 404.930); git: `DATA.md`@85ac181 vs `DASHBOARD.md`@bee0ac4 |
| **AR-08** | media | `docs/img/DASHBOARD.png:1` | Screenshot fermo al 2026-07-17 (commit 5914afa) mentre `DASHBOARD.md` è stato rigenerato più volte il 2026-07-25 con numeri diversi a colpo d'occhio (15.9M→18.1M, 53→64 sessioni, 11→13 progetti, ≈169×→~187×); la sezione "The lab (live data)" promette dati vivi ma incorpora l'immagine statica | Rigenerare lo screenshot a ogni refresh con lo stesso script, o non mostrare numeri nell'anteprima | `docs/img/DASHBOARD.png` (5914afa, 2026-07-17); `DASHBOARD.md:12-14` (rigenerato 2026-07-25); `README.md:41,43` ("## The lab (live data)" + immagine sotto) |
| **AR-09** | media | `observatory/usage/DASHBOARD.md:20` | La tabella "The most expensive things" — rilanciata nel README come pezzo forte — ha 4 righe su 8 (#1,2,4,6) in italiano tecnico fittissimo con gergo interno ("Fabbrica WR3", "QC ombra 8%", "INCIDENTE resume") dentro un documento altrimenti in inglese; rompe la leggibilità del dataset pubblicato | Tradurre/riassumere in inglese le descrizioni delle operazioni cloud-agent (debito su voci recenti di `workflow.csv`) | `DASHBOARD.md:20-25` (righe #1,2,4,6 in italiano); `workflow.csv:9,10,12` (operation italiana) vs `:2-7` (inglese); `README.md:43` rilancia con screenshot |

### BASSA (confermati, declassati in verifica da media/alta)

| ID | Sev | Dove | Problema | Fix proposto (1 riga) | Fonte |
|----|-----|------|----------|----------------------|-------|
| **AR-10** | bassa | `docs/img/WTB.png:1` | Stesso meccanismo di AR-08: screenshot fermo al 2026-07-17 mentre il file live arriva al 2026-07-22. Declassato: nessuna promessa esplicita di "live" accanto all'immagine (`docs/img/README.md` le dice solo "rendered by GitHub") e lo scarto *sottostima* l'attività, non la gonfia | Includere entrambi gli screenshot nello stesso script/hook di rigenerazione | git log `WTB.png` → unico commit 5914afa; `poker-who-s-the-boss.md:5` ("23 sessions... to 2026-07-22"); `docs/img/README.md:3-7` |
| **AR-11** | bassa | `FINDINGS.md:1` / `README.md` apertura | La citazione d'apertura è un esito negativo/inconcludente. Declassato: il framing esplorativo è dichiarato subito sotto (`ITALIANO/README.md:19-22`), la tabella "cosa porti a casa" è nella stessa schermata, e il dato concreto (audit → bug reali, N=2) esiste a riga 69-70 | Affiancare alla citazione un risultato concreto già ottenuto nella stessa prima schermata, per bilanciare la prima impressione | `ITALIANO/README.md:7-10` (citazione) + `:19-22` (framing) + `:69-70` (dato concreto) |
| **AR-12** | bassa | `README.md:68` | "~187× the live tokens" senza tradurre il numero in impatto pratico per un lettore non tecnico. Declassato: la frase lega già il dato alla regola "resume invece di restart"; **attenzione**: la riformulazione originale proposta ("costa 1/187 rispetto a ripartire") sarebbe *imprecisa* — 187× è il rapporto cache-read/live-token cumulato, non un moltiplicatore resume-vs-restart | Inciso neutro tipo "indicatore di quanto le chat lunghe rileggono il contesto a ogni messaggio", **senza** inventare un rapporto di costo non supportato dai dati | `README.md:65-71`; `STRATEGIES.md:41` ("187× ... biggest cost item of all") conferma la natura del rapporto |
| **AR-13** | bassa | `README.md:60` | Le uniche "prove" delle app reali (WTB, poker) sono dashboard di token, non codice o demo. Declassato: `README.md:25` dichiara esplicitamente "private projects redacted" — è una scelta di privacy dichiarata, non un buco di credibilità; le claim del repo (token/metodo/findings) sono già ancorate a dati reali | Nessun'azione obbligata; eventualmente uno screenshot dell'app se la privacy lo consente | `README.md:60-63` (link a `per-project/poker-who-s-the-boss.md`, solo tabella); `README.md:25` ("private projects redacted") |
| **AR-14** | bassa | `plugins/metodo/README.md:3` | Linguaggio auto-referenziale da self-help ("self-evolving behavior... no constraints") come seconda riga del file. Declassato: le righe 10-14 lo ancorano subito a comportamenti concreti e verificabili (`IDEE.md`, design-first, auto-aggiornamento della costituzione) | Sostituire l'aggettivazione della prima riga con un esempio concreto di comportamento osservato | `plugins/metodo/README.md:3-4`, mitigato da `:10-14` |

## 4. Finding BASSA non verificati (dichiarati non verificati)

Passati **non verificati** per policy di processo (su BASSA la verifica adversariale costa più della sua utilità). Da valutare al prossimo ritocco, non bloccanti.

| ID | Dove | Problema | Fix proposto |
|----|------|----------|--------------|
| AR-B1 | `plugins/metodo/CONSTITUTION.md:8` | La versione inglese "intercambiabile" resta personalizzata (nomina Roberto, "SideKick's observatory chat") mentre il drop-in Spec Kit è spersonalizzato; chi non è Roberto copia riferimenti altrui | Nei README indirizzare l'uso esterno al drop-in Spec Kit spersonalizzato |
| AR-B2 | `plugins/metodo/CONSTITUTION.md:203` | `FACTORY-PROCESS.md` in backtick non è link markdown cliccabile, incoerente con altri riferimenti | Trasformare in link markdown |
| AR-B3 | `observatory/usage/per-project/progetto-15.md:6` | Bug cosmetico di pluralizzazione: "(1 workflows)" invece di "(1 workflow)" | Singolarizzazione nel template di `usage.mjs` |
| AR-B4 | `ITALIANO/README.md:71` | "cross-model" non tradotto (righe 56, 71) mentre altrove è "cross-modello" (`DATA.md:30/46`, `STRATEGIES.md:26`, `VERDICTS.md:59`) | Uniformare a "cross-modello" |

## 5. Confutati dalla verifica

**Nessuno.** Tutti i 14 finding grezzi sono sopravvissuti alla verifica adversariale come *fatti veri*. Il filtro del processo ha agito però sulla **severità**: invece di scartare finding, la verifica ha ricalibrato l'impatto sul contesto reale (repo-vetrina personale, N piccoli dichiarati), declassando 4 finding da media a bassa (AR-10÷AR-14, uno era già alta→media AR-08) e correggendo un'imprecisione nella *soluzione* proposta (AR-12: il rapporto 187× non è un moltiplicatore resume-vs-restart). Questo è il valore del passo di verifica anche a "confutati zero": separa i problemi reali dalle severità gonfiate e dai fix sbagliati.

| Finding | Esito verifica | Motivo |
|---------|----------------|--------|
| DASHBOARD.png "alta" | declassato a media | Ritardo di rigenerazione di uno screenshot d'anteprima, non falsità: i numeri veri sono nel `.md`, la crescita rafforza semmai la tesi "dataset vivo". Ancoraggio corretto: la frase README:39 si riferisce al `.md` (vero), l'incoerenza reale è titolo "live data" (:41) vs immagine statica (:43) |
| WTB.png "media" | declassato a bassa | Nessuna promessa "live" accanto all'immagine; lo scarto sottostima l'attività |
| FINDINGS.md apertura "media" | declassato a bassa | Framing esplorativo dichiarato nella stessa schermata; il dato concreto esiste a `:69-70` |
| README 187× "media" | declassato a bassa + fix corretto | Pubblico già tecnico; la riformulazione originale era matematicamente imprecisa |
| README "prove=dashboard" "media" | declassato a bassa | Privacy dichiarata ("private projects redacted"), non buco di credibilità |
| plugins/metodo README "media" | declassato a bassa | Ancorato a comportamenti concreti nelle righe subito successive |

## 6. Top-5 azioni per ROI e cosa NON toccare

**Top-5 per ROI (impatto / sforzo).**
1. **AR-01 — bug del generatore `usage.mjs` (`gruppoDi`).** È l'unica **alta**, è un bug *reale* di codice (non di prosa), nasconde ~20M token, e il fix è mirato (aggiungere una mappatura come già c'è per poker/weather-report). Massimo ROI: correttezza del dataset che è il cuore del repo.
2. **AR-04 + AR-05 — versione del metodo.** Un solo intervento coordinato (numero in testa a `COSTITUZIONE.md`/`CONSTITUTION.md`, allineamento `1.9.0`/`1.9.1`, link al `CHANGELOG` dai README) chiude due finding media su cui il repo è più esposto proprio col pubblico che vuole servire (gli adottanti del metodo).
3. **AR-06 + AR-07 — numeri sbagliati in `DATA.md`.** Due cifre fattualmente errate (83% vs 77%; 26.3M vs 27.6M) nella pagina che dichiara "what the numbers say". Ricalcolo banale da `usage.csv`/`workflow.csv`, alta resa di credibilità.
4. **AR-02 + AR-03 — loop di navigazione italiano.** Due righe di disambiguazione (nei README e in cima a `LEGGIMI.md`) risolvono un fastidio che colpisce esattamente il pubblico italiano che la repo vuole servire.
5. **AR-08 (+AR-10) — screenshot stale.** Rigenerare le due immagini con lo stesso script del refresh dashboard, o togliere i numeri dall'anteprima. Sforzo basso, chiude la contraddizione visiva "live data" vs immagine ferma.

**Cosa NON toccare.**
- **La citazione d'apertura a esito negativo (AR-11)** e **"private projects redacted" (AR-13):** sono scelte editoriali coerenti con l'etica dichiarata del repo (onestà, privacy). Non "correggere" trasformandole in marketing.
- **`workflow.csv` come note grezze dell'autore:** l'autenticità (anche in italiano) è coerente col repo; l'intervento va sulla *dashboard pubblica* (AR-09), non sul CSV sorgente.
- **I finding BASSA non verificati (AR-B1÷B4)** e i declassati (AR-10÷14): rifiniture da prossimo ritocco, non aprire cantieri dedicati.
- **La riformulazione originale di AR-12** ("1/187 rispetto a ripartire"): è *sbagliata*, non applicarla — usare l'inciso neutro.

## 7. Nota di onestà sul processo (limiti)

- **Nessuna esecuzione del codice.** `usage.mjs` è stato letto e il bug AR-01 tracciato staticamente (funzione `gruppoDi` + filtro riga 179) confrontando con i dati; **non** è stato eseguito il generatore per riprodurre l'output mancante. La conclusione è basata su lettura del codice + corrispondenza dei dati, non su un run reale.
- **Verifica per campionamento sui numeri.** Le percentuali/somme (AR-06, AR-07) sono state ricalcolate dagli aggregati CSV citati; non è stato rifatto un ricalcolo esaustivo riga-per-riga dell'intero `usage.csv` (~64 sessioni). Un errore di aggregazione a monte nel CSV non sarebbe stato colto.
- **Cosa NON è stato guardato:** i contenuti dei progetti privati redatti (per scelta di privacy, giustamente inaccessibili); la correttezza *interna* delle app WTB/poker (fuori repo); i file solo-locali gitignorati (es. `versione-italiano/glossario/`); l'inglese di *tutti* i documenti tradotti in `ITALIANO/` uno per uno (AR-B4 è un campione, non una scansione completa); le migration SQL (assenti/non pertinenti a questo repo di documentazione).
- **BASSA non verificati:** i 4 finding della sezione 4 sono per definizione non ri-verificati alla fonte; trattarli come segnalazioni, non come fatti confermati.
- **Assenza di baseline temporale.** Le staleness (AR-08, AR-10) sono vere al 2026-07-25; un refresh già in coda potrebbe averle sanate tra la lettura e la tua rilettura — verificare la data dei commit degli screenshot prima di agire.
- **Confutati zero non significa "tutto grave".** Significa che i fatti reggono ma le severità erano gonfie: il vero lavoro del processo qui è stato il *declassamento calibrato*, non lo scarto. Leggere le severità corrette, non quelle grezze dei red team.
