# Spec — Settlement equo tra partecipanti *(astratto, tech-agnostic)*

> Il **cosa** e il **perché**, indipendente da linguaggio/UI. Gli esempi del §6 sono il
> **contratto**: vanno trasformati in test su una **funzione pura**, PRIMA del codice.

## 1. Scopo & principi
Dato un insieme di partecipanti che hanno versato denaro in un fondo comune e ne ritirano
un valore (diverso per ciascuno), produrre la lista minima di **trasferimenti di contante
reale** che salda tutti. Due principi guida:
1. **Il debito di un partecipante si elide contro il SUO valore ritirato**
   (auto-compensazione): chi deve ancora versare ma porta via valore compensa prima con
   sé stesso.
2. **Fondo comune ≠ contante che cambia mano**: i soldi già nel fondo si ridistribuiscono
   passivamente; i "trasferimenti" sono **solo** il contante reale tra persone. Due viste
   separate.

## 2. Grandezze (per partecipante)
| Termine | Significato |
|---|---|
| `dovuto` | quanto avrebbe dovuto versare (la sua quota totale) |
| `versato` | quanto ha realmente messo nel fondo (numero libero) |
| `valore` | quanto porta via (vincita / quota di ritorno) |
| `mancante` | `max(0, dovuto − versato)` — quota non versata (≥ 0) |
| `eccedenza` | `max(0, versato − dovuto)` — versato in più, da restituire |
| `netto` | `valore − dovuto` — il risultato vero del partecipante |

**Forma generale del saldo** (sempre valida): `saldo = valore − dovuto + versato`
(= `netto + versato`); con `versato ≤ dovuto` si riduce a `valore − mancante`.

## 3. Requisiti
- **R1**: servono `≥ 2` partecipanti.
- **R2**: `somma(netti)` dovrebbe fare 0 (valore totale ritirato = stake totale). NON
  darlo per scontato: i `valore` li inserisce un umano → potrebbero non quadrare.
- **R3**: ogni partecipante con `eccedenza > 0` la riprende dal fondo automaticamente.

## 4. Algoritmo (punto di partenza, poi override manuale)
1. `mancante = max(0, dovuto − versato)`; `versato_legittimo = min(versato, dovuto)`.
2. **Auto-compensazione**: `cancelled = min(mancante, valore)`;
   `mancante' = mancante − cancelled`; `valore' = valore − cancelled`.
3. `bisogno = max(0, valore' − versato_legittimo)`.
4. **Abbinamento greedy**: debitori (`mancante' > 0`) e creditori (`bisogno > 0`) ordinati
   decrescenti; per ogni debitore distribuisci `mancante'` ai creditori più grandi → ogni
   passaggio è un trasferimento `{from, to, importo}` (2 decimali). I bisogni non coperti
   si prendono dal fondo.
- Totale trasferimenti = `somma(mancante')`. Se `mancante' = 0` per tutti → lista vuota.

## 5. Casi limite
- `< 2` partecipanti → blocca.
- `somma(netti) ≠ 0` → segnala, **non** bloccare.
- `eccedenza` → restituita dal fondo.
- Pareggio con debito (`mancante = valore`) → si annulla in §4.2, esce dai trasferimenti.
- Arrotondamenti: 2 decimali, tolleranza 0,01.

## 6. Esempi lavorati = test obbligatori (su funzione pura)
Unità monetarie generiche. Ogni riga = un test.
| # | Scenario | netto | Trasferimenti attesi |
|---|---|---|---|
| 1 | A: dovuto 25, versato 25, valore 40 · B: 25/25/10 | A +15, B −15 | **nessuno** (dal fondo: A 40, B 10) |
| 2 | A: 25/0/10 · B: 25/25/40 | A −15, B +15 | A→B 15 (auto-comp A: 10 di valore annullano 10 di mancante, resto 15) |
| 3 | A: dovuto 35 (quota+ricarica), versato 25, valore 10 · B: 25/25/50 | A −25, B +25 | **nessuno** (A: mancante 10 elide contro valore 10) |
| 4 | vincitore non versa → A: dovuto 25, versato 0, valore 0 · B: 25/25/25 · C: 25/25/50 | A −25, B 0, C +25 | **A→C 25** (A: mancante 25, valore 0 → mancante' 25; C: bisogno 25) |
| 5 | overpay → A versa 30 (dovuto 25), valore 40 · B 25/25/10 | A +15, B −15 | nessuno; A riprende l'eccedenza 5 dal fondo |
| 6 | quote miste → A dovuto 25 versato 25 valore 30 · B dovuto 10 versato 10 valore 5 | A +5, B −5 | nessuno (entrambi prendono dal fondo) |

*(Selezione dai 12 esempi reali del build originale: copre i casi chiave — nessun
trasferimento, auto-compensazione, vincitore-non-versa, overpay, quote miste.)*

## 7. Success criteria
- **SC1**: `somma(trasferimenti) = somma(mancante')` esattamente.
- **SC2**: nessun trasferimento "verso sé stessi"; nessuno è insieme `from` e `to` per
  importi che si annullerebbero.
- **SC3**: numero di trasferimenti ≤ numero di debitori (greedy minimizza).
- **SC4**: tutti gli esempi del §6 passano come test **prima** di scrivere la UI.
