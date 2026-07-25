# Esempi (input d'arrivo -> output). Deduci la regola.

## Esempio 1  (gap=20, lateness=100)
**Arrivi:** A(t=0,v=1), A(t=10,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 0 | 10 | 2 | 2 |

## Esempio 2  (gap=20, lateness=100)
**Arrivi:** A(t=0,v=1), A(t=50,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 0 | 0 | 1 | 1 |
| A | 50 | 50 | 1 | 1 |

## Esempio 3  (gap=15, lateness=100)
**Arrivi:** A(t=30,v=1), A(t=10,v=1), A(t=20,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 10 | 30 | 3 | 3 |

## Esempio 4  (gap=50, lateness=100)
**Arrivi:** A(t=10,v=1), B(t=200,v=1), A(t=20,v=1)

`late_dropped = 1`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 10 | 10 | 1 | 1 |
| B | 200 | 200 | 1 | 1 |

## Esempio 5  (gap=200, lateness=60)
**Arrivi:** A(t=100,v=1), A(t=40,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 40 | 100 | 2 | 2 |

## Esempio 6  (gap=25, lateness=100)
**Arrivi:** A(t=0,v=1), A(t=44,v=2), A(t=22,v=3)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 0 | 44 | 3 | 6 |
