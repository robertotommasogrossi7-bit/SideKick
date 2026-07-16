# Sviluppo app e backend — termini

> Spiegazioni semplici, con esempi dall'app *who's the boss* (React Native/Expo + Supabase).

## ORM — *Object-Relational Mapping*
Un **traduttore** tra gli **oggetti** del codice e le **righe/tabelle** del database. Tu scrivi codice
con oggetti comodi, l'ORM li salva e li rilegge come righe. → Il nostro `mapping.ts` è un **mini-ORM
scritto a mano** (traduce una `Lega` dell'app nelle righe delle 13 tabelle).

## Layer di sync
Lo **strato di codice** che tiene **allineati** i dati tra **telefono (locale)** e **cloud**: **push**
(manda su) e **pull** (scarica giù), gestendo i **conflitti**. → È la fase R7 di who's the boss.

## UUIDv7
Un **identificatore unico universale** (stringa tipo `018f8c…`), versione **7** = **ordinabile per
tempo di creazione**. Usato come **chiave stabile** tra device diversi: due telefoni non generano mai
lo stesso, così i dati non si scontrano quando si sincronizzano.

## LWW — *Last-Write-Wins* ("vince l'ultima scrittura")
Regola per **risolvere i conflitti** di sync: se due versioni della stessa riga divergono, **vince
quella modificata più di recente** (per data/ora). Semplice; adatta ai dati di **un solo utente** su
più device. (Con più utenti sulla stessa riga servono regole più fini.)

## Tombstone ("lapide")
Quando **cancelli** un dato non lo togli davvero: lo **segni come cancellato** (con la data). Così la
cancellazione si **propaga** agli altri device durante il sync. **Non si purga mai** (altrimenti un
telefono rimasto offline a lungo "resusciterebbe" il dato).

## RLS — *Row Level Security* (sicurezza a livello di riga)
Regole **dentro il database** che decidono, **riga per riga**, chi può leggerla o scriverla. → Da noi:
vedi/tocchi **solo le righe delle TUE leghe**, mai quelle di altri account.

## SSR — *Server-Side Rendering* (rendering lato server)
Generare la pagina/schermata **sul server** prima di mandarla al dispositivo. Expo Router ne fa un
pezzo "a vuoto" per prepararsi: lì mancava `window` (che esiste solo nel browser/telefono, non su
server) e l'app **crashava** — bug reale trovato lanciandola dal vivo la prima volta.

## EAS Build
Servizio di **Expo** che **compila l'app vera** (il file installabile) **sui server di Expo**, non sul
tuo PC. È la stessa pipeline che porta poi allo store.

## EAS Update / OTA — *Over-The-Air* ("via etere")
Aggiornamenti che arrivano **da soli**: mandi le modifiche di codice **JS/UI** e l'app **installata si
aggiorna al riavvio**, senza reinstallare nulla. ⚠️ Solo le modifiche **native** (nuove librerie di
sistema) richiedono una **nuova build**.

## APK vs AAB
Due formati **Android**: **APK** = file **installabile direttamente** sul telefono (comodo per i test);
**AAB** (*Android App Bundle*) = formato **per il Play Store**, **non** installabile a mano.

## Keystore
Il **"sigillo" crittografico** con cui l'app viene **firmata**: garantisce che gli aggiornamenti
vengano **dallo stesso autore**. EAS lo **genera e custodisce** per te.

## Deep link
Un **link speciale** (es. `whostheboss://…`) che apre **direttamente l'app** invece del browser. → Da
noi: il link di **conferma email** riapre l'app.
