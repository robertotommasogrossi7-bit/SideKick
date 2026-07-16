# OSSERVATORIO DATI — cosa dicono i numeri (pagina di lettura)

> **Cos'è**: la pagina che la chat-osservatorio aggiorna a ogni revisione. In una pagina:
> quali dati abbiamo, cosa dicono, e quali modifiche al metodo suggeriscono. Onestà alla
> FINDINGS.md: **N piccoli = indizi, non prove.**
> I progetti privati compaiono con gli **alias** di `censura.local.json` (legenda solo locale).
> **Ultima revisione: 2026-07-16.**

## Il rituale (quando si apre la chat-osservatorio)
1. `node osservatorio/consumo.mjs` → aggiorna `consumo/CONSUMO.md` + `consumo.csv` con
   **tutte** le chat Claude Code del PC (nomi privati censurati, legenda solo locale).
2. Confronta la copia attiva del metodo (`~/.claude/CLAUDE.md`) con il **master**
   (`plugins/metodo/COSTITUZIONE.md`): se divergono, decidere quale vince e risincronizzare.
3. Leggi le righe nuove di `~/.claude/ESPERIMENTI.md` e dei METRICHE.md dei progetti attivi.
4. Aggiorna i **verdetti** qui sotto e proponi (non imporre) le modifiche al metodo.

## Le fonti dei dati (censimento 2026-07-16)
| Fonte | Cosa contiene | Stato |
|---|---|---|
| `osservatorio/consumo/` | token per progetto × modello × mese, da TUTTE le chat locali (23 progetti, ~8,6k messaggi da maggio 2026) | ✅ generato automaticamente |
| `~/.claude/ESPERIMENTI.md` | A/B cross-modello e ripetizioni stesso-modello | 2 righe A/B · 0 ripetizioni |
| progetto-17: `_processo/METRICHE.md` | per ogni fase: modello+effort, durata (git), volume, token dei workflow | ✅ la serie più ricca |
| progetto-15: doc di processo in root | DECISIONI + audit, ma **niente METRICHE.md** | ⚠️ braccio scoperto |
| Audit (progetto-17 `AUDIT_R6_R7.md`, progetto-15 `AUDIT_ALTO_2026-07-03.md`) | finding confermati/confutati + costo | ✅ 2 punti dati |
| `FINDINGS.md` + `esperimenti/` | probe con/senza pacchetto-processo (N=1 per braccio) | ✅ storico, già analizzato |
| DECISIONI.md (progetto-17, progetto-15) | opzioni, scelta, perché | ⚠️ manca l'**esito poi osservato** |

**Limite noto dei dati di consumo**: i workflow cloud (audit multi-agente) non lasciano
transcript sul PC → i loro token (2,6M + 1,1M nei due audit + 0,7M di ricerca) vanno sommati
a mano dai METRICHE. La dashboard Anthropic resta l'unica fonte del costo in denaro.

## Verdetti (aggiornati 2026-07-16)
- **Il processo pesante (audit) paga?** Indizio forte **sì**: 2 audit su 2 hanno trovato
  bug critici veri (3 ALTA sul progetto-17; sul progetto-15 la causa radice di un bug
  bloccante + 3 falle critiche) a un costo noto e sostenibile. N=2 → indizio.
- **Verifica-ombra cross-modello**: 2 punti. Sui finding di **codice** i modelli si
  equivalgono; sui finding di **processo/config** il modello alto falsifica meglio.
  Ipotesi da confermare: ombra mirata solo sui finding di processo/config.
- **Ripetizioni stesso-modello**: **zero dati** — la regola in costituzione è ancora fede.
- **Quali modelli per quali agenti**: la tabella del metodo viene dalla ricerca esterna
  (dossier 2026-07); i nostri dati coprono per ora solo la funzione "verifica".
- **Dove vanno i token** (prima lettura di CONSUMO): i 2 progetti-app grossi dominano
  (progetto-17 ~6,1M output, progetto-15 ~3,6M); la cache letta (~2,8 miliardi) è ~170× i token vivi
  (~16,5M input+output) → la cache calda è ciò che rende sostenibile il piano. Opus ha generato ~83%
  dell'output storico; Sonnet/Fable sono entrati da luglio con la regola modello-per-passo.
- **A/B di processo progetto-17 (costruzione completa) vs progetto-15 (incrementale)**:
  oggi **non misurabile** perché il secondo non logga le fasi. O si aggiunge un METRICHE.md
  leggero, o si dichiara chiuso.

## Contratto dati minimo (per tutte le chat — costo ~zero)
1. **Esperimenti** → una riga in `~/.claude/ESPERIMENTI.md`, formato già fissato lì. Regge.
2. **Scelte importanti** → una riga in DECISIONI.md del progetto (opzioni · scelta · perché)
   **+ colonna "Esito osservato"** da riempire quando l'esito si vede (anche mesi dopo).
3. **Consumo token** → **nessuno scrive nulla a mano**: lo estrae `consumo.mjs` dai
   transcript. Più si usa Claude, più dati si accumulano, gratis.
