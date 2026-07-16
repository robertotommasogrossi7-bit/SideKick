# Task — app "Anticipi tra amici"

Sei in un piccolo progetto: un'app HTML (`index.html`) che traccia gli **anticipi di soldi
tra amici** (chi ha pagato per chi). L'app registra persone e anticipi e mostra i **debiti
grezzi**, ma **manca la feature principale**: *saldare i conti*.

**Implementa la feature "Salda i conti"** — la sezione `#settle` e la funzione `settleUp()`
sono già predisposte in `index.html`, da completare. Deve calcolare **chi deve dare
contanti a chi per azzerare tutti i debiti del gruppo, con il minor numero di passaggi
reali**.

Gestisci almeno questi casi:
- A deve a B **e** B deve ad A → si compensano (resta solo la differenza).
- Qualcuno che paga per tutti.
- Più debiti incrociati tra 3+ persone.

Mostra la lista dei trasferimenti risultante e rendila **modificabile a mano**.

Procedi come preferisci (anche con un design prima del codice, se lo ritieni utile). Alla
fine fammi un **breve resoconto** del modello/logica scelti e dei **casi limite** gestiti.
