# Pacchetto di processo — Settlement equo tra partecipanti

> **Cos'è un "pacchetto di processo":** il *processo* (non il codice) con cui una feature
> è stata costruita con successo, **astratto** per riusarlo in un'app diversa e **taggato
> con l'esito**. Si forka, l'AI lo adatta al tuo progetto, e parti dalla progettazione
> invece che dal foglio bianco. Forma allineata agli artefatti Spec Kit.
>
> ⚠️ **Bozza F1** — lo stiamo usando per *scoprire la forma* del pacchetto. Da criticare
> soprattutto il **formato**, non solo il contenuto.

## Identità
- **ID**: `settlement-equo`
- **Tassonomia**: Pratiche (feature di dominio) · richiama Progettazione (money logic design-first)
- **In una riga**: N partecipanti mettono soldi in un fondo comune e ne ritirano valori
  diversi → calcola **chi deve dare contanti a chi minimizzando i passaggi reali**, con
  auto-compensazione del debito di ciascuno contro la propria vincita.

## Quando forkarlo
Quando un gruppo mette e ritira denaro da un fondo comune con esiti diversi e vuoi
**regolare i conti con meno trasferimenti possibile**: spese condivise, montepremi di una
lega, cassa comune, qualsiasi gioco con poste. (Indipendente dal dominio "poker".)

## Esito — la fitness function in pratica (perché fidarsi)
- ✅ **In produzione**: mergiato in `main` nel progetto originale.
- ✅ **Coperto da test**: 12 esempi numerici lavorati → test automatici su funzione pura
  (cash) + suite torneo.
- 🐞 **Un bug reale già risolto** (vedi `plan.md`): senza auto-compensazione, un vincitore
  che non aveva versato risultava insieme debitore e creditore → trasferimento verso sé
  stesso + debito fittizio. *Questo è il sapere che un repo finito NON ti dà.*
- 📐 Math dominio-agnostica, astratta dal caso poker.

## Come adattarlo (lo fa l'AI, tu confermi)
1. Mappa i tuoi termini su quelli del pacchetto: `partecipante`, `dovuto`, `versato`,
   `valore` (ritirato), `mancante`, `eccedenza`, `netto`.
2. Decidi come ottieni `valore` nel tuo dominio (fiche contate? premio? quota di ritorno?).
3. Tieni i **3 cardini** qui sotto; adatta UI e storage al tuo stack.

## I 3 cardini da non perdere (il cuore riusabile)
1. **Auto-compensazione**: il debito di un partecipante si elide contro la sua stessa
   vincita *prima* di abbinare debitori e creditori. Evita il bug "paga sé stesso".
2. **Separa il fondo dai trasferimenti reali**: i soldi già nel fondo si ridistribuiscono
   *passivamente*; mostra come "trasferimento" **solo** il contante che cambia mano
   davvero. Sono due viste diverse.
3. **Check non bloccante + override totale**: l'algoritmo è un *punto di partenza*; ogni
   trasferimento è modificabile e una quadratura sbagliata **avvisa ma non blocca** (i
   conteggi umani sbagliano).

## Contenuto del pacchetto
- `spec.md` — il **cosa** (contratto astratto + esempi-test). Spec Kit-shaped.
- `plan.md` — il **come che ha funzionato** + l'esito + il bug risolto + lo stack
  originale (come *un'istanza*, non un obbligo).
- *(futuro)* `prompts.md` — i prompt pronti per ricostruirlo con l'AI.

## Provenienza
Distillato a mano (F1) da: `poker/_processo/SETTLEMENT_SPEC.md` + `USCITA_CASH_SPEC.md` +
`DECISIONI.md`. Build originale: React + TypeScript + Vitest.
