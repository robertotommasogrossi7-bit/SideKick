# Test migrazione GRANDE — come farlo e cosa misurare

Riferimenti: `../TEST_MIGRAZIONE_GRANDE.md` (il perché), `../../libreria/migrazione-a-componenti/`
(il pacchetto sotto esame).

## Impianto
Test **con-vs-senza (A/B)** su **due** app vanilla complementari, migrate a **React+Vite**.
La **sola** variabile è la presenza del pacchetto. I root di lavoro stanno **fuori da SideKick**
(isolamento anti-contaminazione, lezione 2026-06-04): `Programmi/_migr-test/`.

| Root (chat pulita su questo folder) | App | Pacchetto? | Cosa sonda |
|---|---|---|---|
| `_migr-test/budget-armA` | gestione spese | ✅ in `_pacchetto/` | retrocompat multi-chiave + amount con segno |
| `_migr-test/budget-armB` | gestione spese | ❌ | (controllo) |
| `_migr-test/habit-armA`  | tracker abitudini | ✅ in `_pacchetto/` | shape nidificata + streak derivata dal tempo |
| `_migr-test/habit-armB`  | tracker abitudini | ❌ | (controllo) |

Sorgenti pristine (reference, gitignorate): `SideKick/_test/_fonte-budget`, `_test/_fonte-habit`.
Ogni root è un repo git con 1 commit (`app vanilla originale`). Le fasi branchano da `main`.

## Come lanciare un braccio
1. Apri una **chat Claude Code pulita** con root = la cartella del braccio
   (es. `Programmi/_migr-test/habit-armB`).
2. Incolla come **primo messaggio** il prompt corrispondente (`PROMPT-<app>-<arm>.md`).
   **Niente aiuti**: la si lascia lavorare da sola.
3. A fine migrazione, verifica con la rubrica sotto.

**Ordine consigliato:** prima la coppia **habit** (probe più ricco). Poi **budget**, come conferma.

⚠️ **Isolamento/onestà:** non aprire arm-B con SideKick come root; non nominargli mai il
pacchetto né i suoi cardini. arm-A e arm-B ricevono **esattamente lo stesso compito**, tranne
il riferimento al pacchetto. (È la variabile controllata.)

## La verifica killer — retrocompat dati
localStorage è **per-origine**: i dati della vanilla (`file://`) non si vedono nella React
(`localhost:5173`). Quindi si testa **iniettando la chiave/shape ORIGINALE nell'origine
dell'app migrata** e vedendo se la carica.

1. Avvia l'app migrata (`npm run dev`), aprila nel browser, apri la **console**.
2. Incolla lo snippet *seed* (sotto): scrive la **chiave originale** con la **shape originale**,
   poi ricarica.
3. **I dati compaiono in UI?** SÌ = chiave+shape preservate (retrocompat **tenuta**).
   NO = chiave rinominata o shape cambiata (retrocompat **persa** = il segnale-killer).

### Seed BUDGET (chiavi `financeTrackerData` + `financeTrackerTheme`)
```js
localStorage.setItem('financeTrackerData', JSON.stringify([
  {id:'t1', title:'Stipendio', amount:1500,  category:'Lavoro', date:'2026-06-01'},
  {id:'t2', title:'Spesa',     amount:-82.5, category:'Cibo',   date:'2026-06-03'},
  {id:'t3', title:'Affitto',   amount:-650,  category:'Casa',   date:'2026-06-05'}
]));
localStorage.setItem('financeTrackerTheme','dark');
location.reload();
```
Atteso se OK: 3 movimenti, saldo **767,5**, tema scuro applicato.
Trappola: se l'arm ha sostituito `amount` con segno con `{type:'expense', amount:82.5}`, gli
importi/saldo non tornano (shape cambiata).

### Seed HABIT (chiave `habitTrackerHabits`, shape nidificata)
```js
localStorage.setItem('habitTrackerHabits', JSON.stringify([{
  id:'1717000000000', name:'Meditazione',
  startDate:'2026-06-01T08:00:00.000Z',
  occurrences:[
    {id:'o1', date:'2026-06-08T08:00:00.000Z', notes:''},
    {id:'o2', date:'2026-06-09T08:00:00.000Z', notes:'bene'}
  ],
  currentStreakStart:'2026-06-08T08:00:00.000Z',
  earnedBadges:[], createdAt:'2026-06-01T08:00:00.000Z'
}]));
location.reload();
```
Atteso se OK: l'abitudine appare con le 2 occorrenze e la **streak calcolata dalle date**
(non un numero salvato). Trappola: se l'arm ha appiattito la shape (streak come numero,
occorrenze non nidificate), non carica o la streak è congelata al refresh.

## Rubrica (compila per ogni braccio)
| Segnale | budget-A | budget-B | habit-A | habit-B |
|---|---|---|---|---|
| 🔑 Retrocompat (chiave+shape, dati caricano) | | | | |
| 🧊 Comportamento identico (no feature nuove/redesign) | | | | |
| 🪜 A fasi su branch (vs big-bang) — vedi `git log`/branch | | | | |
| ✅ Build verde + app gira | | | | |
| 🧰 (solo habit) streak ricalcolata dal tempo dopo reload | — | — | | |

## Output riflessivo — quanto è buono il MIO processo
Oltre a "A batte B?", il test serve a capire **dove zoppica il processo del pacchetto e come
migliorarlo** (fitness function, `VISIONE.md` §9.1):
- Cosa ha **azzeccato** arm-A grazie al pacchetto? Cosa ha **mancato/sofferto** *nonostante* il
  pacchetto? (→ il pacchetto va chiarito/ampliato lì)
- arm-A o arm-B hanno prodotto un **miglioramento** da riassorbire (come i "centesimi interi"
  del settlement)?
- → Se sì: aggiorna `libreria/migrazione-a-componenti/` e **alza la `versione`** in PACCHETTO.md.

## Esiti possibili (tutti validi → si scrivono in `../DECISIONI.md`)
- **arm-B perde la chiave/shape, arm-A no** → il pacchetto **discrimina** sul processo grande
  = conferma forte dell'ipotesi (il valore cresce con la dimensione del processo).
- **arm-B se la cava da solo** (come fece il settlement) → su quest'app il pacchetto aggiunge
  poco; resta valido come voce di catalogo che si auto-migliora. È un esito onesto, si registra.
- Annotare sempre anche: a fasi o big-bang? scope-creep? build verde da entrambe le parti?
