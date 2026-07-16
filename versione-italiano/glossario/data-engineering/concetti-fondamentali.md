# Data engineering — concetti fondamentali

> Spiegazioni semplici, con esempi dall'app *who's the boss* (tracker di partite tra amici).

## OLTP — *Online Transaction Processing*
Il database **"cassa del negozio"**: tante operazioni **piccole e veloci** su **singoli record**
(aggiungi un giocatore, salva una serata, segna un debito pagato). È **normalizzato** (niente
doppioni) e serve a **far girare l'app dal vivo**. → È quello che usa who's the boss.

## OLAP — *Online Analytical Processing*
Il database **"analista in ufficio"**: **poche domande enormi** su tanti dati per trovare tendenze
(media vincite per giocatore su 2 anni, chi è il più migliorato). È un **sistema separato**,
**alimentato dall'OLTP**. Qui vive lo **star schema**. Non lo hai (e a questa scala probabilmente
non serve).

## Data lake
Un **magazzino di dati grezzi e disordinati**: *"salvo tutto adesso, capirò dopo come strutturarlo"*.
È l'**opposto** di un database strutturato. Utile quando accumuli dati da analizzare in futuro.
→ who's the boss **non** è un data lake: è un DB strutturato dal primo giorno.

## Normalizzazione
Organizzare i dati **senza doppioni**: ogni informazione in **un posto solo**, gli altri la
richiamano con un **riferimento** (es. una partita punta al giocatore, non ne copia il nome).
Riduce errori e incoerenze. **È il modo giusto di strutturare un OLTP** — ed è ciò che significa
davvero "dividere bene i dati" per un'app.

## Star schema (schema a stella)
Modello **per l'analitica (OLAP)**: una tabella centrale di **"fatti"** (gli eventi misurabili, es.
una partita giocata) circondata da tabelle **"dimensioni"** (il chi/cosa/quando: giocatore, gioco,
data). È **denormalizzato apposta** per leggere in fretta grandi volumi. ⚠️ **Non si usa sullo store
operativo** (OLTP): sarebbe un errore. Serve solo se un giorno costruisci un layer di analisi vero.

## Vista materializzata
Una **query pesante calcolata una volta e salvata pronta**, aggiornata ogni tanto. È il modo
**leggero** di fare analitica **senza costruire un OLAP intero** — spesso è tutto ciò che serve a
un'app piccola.
