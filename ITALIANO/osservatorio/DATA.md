# OSSERVATORIO DATI — cosa dicono i numeri (pagina di lettura)

> **Cos'è**: la pagina che la chat-osservatorio aggiorna a ogni revisione. In una pagina:
> quali dati abbiamo, cosa dicono, e quali modifiche al metodo suggeriscono. Stessa onestà di
> FINDINGS.md: **N piccoli = indizi, non prove.**
> Originale inglese: `../../observatory/DATA.md` (questo file ne è la traduzione).
> Censura (scelta di Roberto, 2026-07-16): **solo 3 progetti riservati** compaiono con alias
> (`progetto-15`, `progetto-16`, `progetto-22` — legenda in `censura.local.json`, solo locale);
> tutti gli altri usano il nome vero. I progetti nuovi nascono censurati finché non si decide.
> **Ultima revisione: 2026-08-01** (la data in testa si muove nello stesso commit che tocca
> il corpo). Regola dal 2026-08-01, dopo due derive in giornata: **i totali vivi si
> dichiarano in UN posto solo — la dashboard generata — e ogni altra pagina li linka**
> invece di ricopiarli.

## Il rituale (quando si apre la chat-osservatorio)
1. `node observatory/usage.mjs` → aggiorna il cruscotto `usage/DASHBOARD.md`, un file di
   dettaglio per progetto in `usage/per-project/`, e i dati grezzi `usage.csv` +
   `sessions.csv` (una riga per sessione col **titolo dell'operazione**, cercabile).
   Le lezioni in testa al cruscotto sono curate a mano in `usage/LESSONS.md`.
1b. Se dall'ultima volta è girato un **workflow multi-agente** (audit, ricerca…), aggiungi
   la sua riga a `usage/workflow.csv` (i workflow cloud non lasciano transcript sul PC).
2. Confronta la copia attiva del metodo (`~/.claude/CLAUDE.md`) con il **master**
   (`plugins/metodo/COSTITUZIONE.md`): se divergono, decidi quale vince e risincronizza.
3. Leggi le righe nuove di `~/.claude/ESPERIMENTI.md` e del METRICHE.md di ogni progetto attivo.
4. Aggiorna i **verdetti** qui sotto e il registro **`STRATEGIES.md`** (costi/guadagni di ogni
   scelta di metodo — red team, ricerca, audit…), e proponi (senza imporre) modifiche al
   metodo.

## Le fonti dei dati (tabella creata 2026-07-16, contenuti aggiornati 2026-08-01)
| Fonte | Cosa contiene | Stato |
|---|---|---|
| `observatory/usage/` | token per progetto × modello × mese **e per operazione/sessione** (titoli delle chat), da TUTTE le chat locali da maggio 2026 (conteggi vivi nella [dashboard](uso/DASHBOARD.md)) + registro workflow cloud (colonne `5h_windows` ed `estimated`) + `prices.csv` verificato a mano che alimenta `cost_usd_equiv` | ✅ generato automaticamente (workflow.csv e prices.csv a mano) |
| `~/.claude/ESPERIMENTI.md` | A/B cross-modello e ripetizioni stesso-modello | 6 righe A/B · 1 ripetizione (+1 nota ibrida red-team) |
| poker: `_processo/METRICHE.md` | per fase: modello+effort, durata (git), volume, token dei workflow | ✅ la serie più ricca |
| progetto-15: doc di processo in root | DECISIONI + audit, ma **niente METRICHE.md** | ⚠️ braccio scoperto |
| Audit (poker `AUDIT_R6_R7.md`, progetto-15 `AUDIT_ALTO_2026-07-03.md`) | finding confermati/confutati + costo | ✅ 2 punti dati |
| `observatory/STRATEGIES.md` | registro costi/guadagni di OGNI strategia del metodo (audit, red team, ricerca, ombra…) | ✅ creato 2026-07-16 |
| `FINDINGS.md` + `experiments/` | probe con/senza pacchetto-processo (N=1 per braccio) | ✅ storico, già analizzato |
| DECISIONI.md (poker, progetto-15) | opzioni, scelta, perché | ⚠️ manca l'**esito osservato in seguito** |

*(I path della tabella che non esistono in questo repo — `_processo/METRICHE.md`, i file
degli audit, i `DECISIONI.md` per-progetto — vivono nei **repo privati dei progetti**:
sono nominati come fonti, non linkati.)*

**Limite noto dei dati di consumo**: i workflow cloud (audit multi-agente) non lasciano
transcript sul PC → i loro token (2,6M + 1,1M nei due audit + 0,7M di ricerca) vanno
sommati a mano dai METRICHE. La dashboard Anthropic resta l'unica fonte del costo in denaro.

## Verdetti (aggiornati 2026-07-25)
- **Il processo pesante (audit) paga?** Indizio forte **sì**: 2 audit su 2 hanno trovato
  bug critici veri (3 ALTA su poker; sul progetto-15 la causa radice di un bug bloccante
  + 3 falle critiche) a un costo noto e sostenibile. N=2 → indizio.
- **Verifica-ombra cross-modello**: 4 esperimenti, incluso un lotto da 54 coppie (2026-07-24,
  ombra Sonnet sotto una baseline Opus — la direzione invertita): 87% di accordo, e i
  disaccordi hanno rivelato **classi di difetti complementari** — il modello alto vede i
  difetti a livello di lotto, l'ombra economica coglie gli scivoloni puntuali (3/4 confermati
  in arbitrato). Verdetto: mantieni l'ombra ~8%, un gradino di modello LONTANO dalla baseline
  in entrambe le direzioni (metodo v1.9); i difetti meccanici (tell posizionale) vanno ai
  validatori a script, non ai modelli.
- **Cache di resume del workflow: best-effort, non garantita** (misurato 2026-07-24, run WR3):
  un resume ha riusato 32/48 chiavi, il successivo ha riusato **0/46** nonostante prompt
  identici byte per byte e un journal completo — spreco ~0,59M token vivi + ~39M token di
  cache. I checkpoint veri sono i file; la procedura di resume sicuro (verdetti persistiti su
  file + stop-loss a 2 minuti) è ora in `plugins/metodo/PROCESSO-FABBRICA.md`. Nota: la
  diagnosi a caldo dell'incidente era sbagliata — la forensics del journal dell'osservatorio
  l'ha corretta (un promemoria che le diagnosi a caldo servono verifica post-hoc).
- **Ripetizioni stesso-modello**: **zero dati** — la regola in costituzione è ancora fede.
- **Quali modelli per quali agenti**: la tabella del metodo viene dalla ricerca esterna
  (dossier 2026-07); i nostri dati per ora coprono solo la funzione di "verifica".
- **Dove vanno i token**: totali e composizione vivi stanno nella [dashboard
  generata](uso/DASHBOARD.md) — la fonte unica (questa pagina ha smesso di ricopiarli dopo
  essere rimasta indietro di un ciclo intero; un red team esterno ha colto quattro valori
  diversi della stessa metrica nel repo, 2026-07-31). Qui resta la lettura datata, stabile:
  le run della Fabbrica superano ogni audit (la sola WR3 11,0M ≈ **~3 finestre di utilizzo
  di 5 ore del piano Max da 100 euro**, osservato tramite i blocchi di credito); la cache
  letta supera i token vivi di due ordini di grandezza → la cache calda è ciò che rende
  sostenibile il piano. Opus ha generato ~77% dell'output storico al 2026-07-25 (il "~83%"
  pubblicato prima era sbagliato — finding AR-06 dell'audit, ricalcolato da `usage.csv`);
  Sonnet/Fable sono entrati da luglio con la regola modello-per-passo.
- **A/B di processo poker (costruzione completa) vs progetto-15 (incrementale)**: **CHIUSO
  come non misurabile, 2026-08-01** (l'opzione che questa pagina stessa offriva). Il
  braccio incrementale non ha mai loggato le fasi (5 sessioni in tutto, senza fasi e
  censurate, una lunga un mese) ed è fermo dal 2026-07-17. Reversibile da solo: se il
  progetto riparte coi titoli di sessione `Progetto/Fase_N`, il contratto dati rende il
  braccio di nuovo misurabile a costo zero di contabilità.

## Contratto dati minimo (per tutte le chat — costo ~zero)
1. **Esperimenti** → una riga in `~/.claude/ESPERIMENTI.md`, formato già fissato lì. Regge.
2. **Scelte importanti** → una riga in DECISIONI.md del progetto (opzioni · scelta · perché)
   **+ colonna "Esito osservato"** da riempire quando l'esito diventa visibile (anche mesi
   dopo).
3. **Consumo token** → **nessuno scrive nulla a mano**: lo estrae `usage.mjs` dai transcript.
   Più si usa l'agente di coding, più dati si accumulano, gratis.
