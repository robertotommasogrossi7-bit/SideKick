# SideKick — versione italiana (documentazione di lavoro)

> La **facciata pubblica** del repo è in inglese: [`../README.md`](../README.md). Questa
> cartella raccoglie tutto il materiale di lavoro in italiano.

**Cos'è SideKick**: il laboratorio dove Roberto analizza esperimenti e progetti reali fatti
con Claude Code, per capire quali scelte di metodo fanno risparmiare token e automatizzare i
processi. I dati veri (consumo token, strategie, verdetti) vivono in
[`../osservatorio/`](../osservatorio/DATI.md); il metodo canonico in
[`../plugins/metodo/COSTITUZIONE.md`](../plugins/metodo/COSTITUZIONE.md).

## Cosa c'è in questa cartella

| File/cartella | Cosa contiene |
|---|---|
| [`OSSERVATORIO.md`](OSSERVATORIO.md) | I compiti permanenti di SideKick (li legge ogni sessione all'avvio) e il rituale dell'osservatorio dati. |
| [`GUIDA.md`](GUIDA.md) | Come distillare/usare le feature della libreria. |
| [`libreria/`](libreria/) | Il catalogo dei pacchetti-processo distillati (l'idea originale di SideKick, oggi secondaria — vedi FINDINGS). |
| [`motore/`](motore/) | Il motore di distillazione che trasforma il processo di una build reale in un pacchetto. |
| [`CONTRIBUIRE.md`](CONTRIBUIRE.md) | Come contribuire un pacchetto. |
| [`cattura-processo-ai-brief.md`](cattura-processo-ai-brief.md) | Il brief storico dell'idea iniziale (archivio). |

## Mappa del resto del repo (in inglese o neutro)

- [`../osservatorio/`](../osservatorio/DATI.md) — **il laboratorio**: cruscotto consumi
  ([CONSUMO](../osservatorio/consumo/CONSUMO.md)), registro strategie costi/guadagni
  ([STRATEGIE](../osservatorio/STRATEGIE.md)), verdetti red team
  ([redteam/](../osservatorio/redteam/VERDETTI-2026-07-16.md)), piano
  ([PIANO](../osservatorio/PIANO.md)).
- [`../esperimenti/`](../esperimenti/README.md) — gli esperimenti con/senza + i tool
  (misura-token, oracolo a test nascosti).
- [`../plugins/metodo/`](../plugins/metodo/) — il metodo: COSTITUZIONE (master italiano),
  CONSTITUTION (inglese), drop-in Spec Kit.
- [`../FINDINGS.md`](../FINDINGS.md) — il resoconto onesto degli esperimenti (inglese).
- [`../_processo/`](../_processo/) — la memoria di processo del progetto SideKick stesso
  (decisioni, log esperimenti — pubblico apposta).
