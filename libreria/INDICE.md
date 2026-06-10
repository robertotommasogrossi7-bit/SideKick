# Indice della libreria

I **pacchetti di processo**, per tassonomia. Ogni pacchetto è una cartella con
`PACCHETTO.md` (manifesto + metadati) + `spec.md` + `plan.md` (formato Spec Kit).
Per aggiungerne uno → `../CONTRIBUIRE.md`. Per distillarne/usarne → `../GUIDA.md`.

## 🧭 Progettazione — metodologie e architetture
| Pacchetto | In una riga | non_ovvietà | Esito |
|---|---|---|---|
| [migrazione-a-componenti](migrazione-a-componenti/) | Migrare un'app vanilla a un framework a componenti, a fasi, senza rompere i dati | **alta** | reale, 48 test |
| [architettura-multi-contenuto](architettura-multi-contenuto/) | Estendere un'app mono-scopo a multi-contenuto senza rompere il caso speciale | **alta** | reale, 57 test |

## 🛠️ Pratiche — feature di dominio
| Pacchetto | In una riga | non_ovvietà | Esito |
|---|---|---|---|
| [settlement-equo](settlement-equo/) | Chi paga chi tra N partecipanti, col minimo dei passaggi | bassa | in produzione |
| [punteggio-scopa](punteggio-scopa/) | Punteggio della Scopa (carte/denari/settebello/primiera/scope) | **alta** | validato con test |
| [punteggio-briscola](punteggio-briscola/) | Punteggio della Briscola (valori carte, >60 vince) | media | validato con test |
| [punteggio-tressette](punteggio-tressette/) | Punteggio del Tressette (terzi con floor + ultima presa) | **alta** | validato con test |

| [bracket-eliminazione](bracket-eliminazione/) | Tabellone a eliminazione: seeding + bye | **alta** | validato con test |
| [rating-elo](rating-elo/) | Aggiornamento rating Elo (forza, non vittorie assolute) | **alta** | validato con test |
| [girone-italiana](girone-italiana/) | Calendario round-robin (metodo del cerchio + bye) | **alta** | validato con test |
| [ricorrenze-date](ricorrenze-date/) | Ricorrenze tipo RRULE ("2° martedì del mese") | **alta** | validato con test |

## 🤖 Pronte-per-l'AI — artefatti esecutivi
_(ancora vuoto — prompt-template e task pronti da dare a un agente)_

---
> Forma **base, da ampliare**: in futuro questo indice diventa un **registry** con ricerca,
> versioni e curation condivise (la "versione migliore sale"). Per ora vive nel repo.
