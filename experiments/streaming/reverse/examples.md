# Examples (arrival input -> output). Deduce the rule.

## Example 1  (gap=20, lateness=100)
**Arrivals:** A(t=0,v=1), A(t=10,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 0 | 10 | 2 | 2 |

## Example 2  (gap=20, lateness=100)
**Arrivals:** A(t=0,v=1), A(t=50,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 0 | 0 | 1 | 1 |
| A | 50 | 50 | 1 | 1 |

## Example 3  (gap=15, lateness=100)
**Arrivals:** A(t=30,v=1), A(t=10,v=1), A(t=20,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 10 | 30 | 3 | 3 |

## Example 4  (gap=50, lateness=100)
**Arrivals:** A(t=10,v=1), B(t=200,v=1), A(t=20,v=1)

`late_dropped = 1`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 10 | 10 | 1 | 1 |
| B | 200 | 200 | 1 | 1 |

## Example 5  (gap=200, lateness=60)
**Arrivals:** A(t=100,v=1), A(t=40,v=1)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 40 | 100 | 2 | 2 |

## Example 6  (gap=25, lateness=100)
**Arrivals:** A(t=0,v=1), A(t=44,v=2), A(t=22,v=3)

`late_dropped = 0`

| key | start | end | count | sum |
|---|---|---|---|---|
| A | 0 | 44 | 3 | 6 |
