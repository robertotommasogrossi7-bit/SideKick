---
id: architettura-multi-contenuto
tassonomia: Progettazione
tag: [architettura, multi-content, estensibilita, retrocompat, scope-condiviso, metodologia]
non_ovvieta: alta
esito: in produzione (M1-M4 di un'app reale), 57 test verdi, caso speciale intatto
provenienza: poker/_processo/MULTIGIOCO_SPEC.md + DECISIONI.md (motore F2)
versione: 0.1
speckit_compat: true
---

# Pacchetto — Estendere un'app mono-scopo a multi-contenuto

## Identità
Trasformare un'app che fa **una cosa sola** (un dominio "ricco") in un'app **multi-contenuto**
(N tipi generici + il tipo ricco originale), **senza rompere** quello che già funziona e
**senza codice doppio**.

## Quando forkarlo
Hai un'app verticale che funziona e vuoi aggiungerle altri "tipi" (contenuti/modalità) che
condividano la stessa macchina (sessioni, liste, statistiche, storico), tenendo il caso
originale come *speciale*.

## Esito
Realizzato su un'app reale (poker tracker → "card tracker") in 4 fasi, **in produzione**,
**57 test verdi**, il tipo speciale (poker) **intatto**. `non_ovvieta: alta` — un agente da
zero tende a duplicare i due ambiti o a forzare tutto in un modello unico.

## Come adattarlo
Identifica il tuo **tipo ricco** (resta speciale) e i **tipi generici** (schermata comune);
modella lo scope "default/personale" come **istanza speciale** dello scope "gruppo"; tieni i
cardini.

## I cardini
1. **Default = istanza speciale del gruppo.** Modella il "personale/default" come un gruppo
   speciale (es. flag `personale: true`) → riusa **tutta** la macchina, zero duplicazione.
2. **Un tipo ricco speciale + N tipi generici su schermata comune.** Non forzare tutto in un
   modello unico: il dominio ricco tiene la sua schermata/logica; i nuovi usano un flusso comune.
3. **Estensione retrocompat.** Il tipo originale resta invariato (cambia solo *dove vive*);
   migrazione dati **idempotente**, il tipo speciale mai toccato.
4. **Componenti condivisi tra contesti.** Classifica/storico = componenti unici usati in tutti
   gli ambiti → "una modifica vale ovunque" (niente la-stessa-cosa-in-4-posti).
5. **A fasi**: modello+statistiche (puro, testato) → shell/routing → schermata comune → aggregazioni.

## Contenuto
`spec.md` (il cosa, Spec Kit) · `plan.md` (il come + esito + decisioni non-ovvie).

## Provenienza
Distillato dalla trasformazione multi-gioco di poker col motore F2 di SideKick.
