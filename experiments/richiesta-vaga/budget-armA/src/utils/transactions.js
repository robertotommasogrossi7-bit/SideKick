export const filterTransactions = (transactions, { category, type, search }) =>
  transactions.filter((tx) => {
    const matchesCategory = category === 'all' || tx.category === category
    const matchesType =
      type === 'all' ||
      (type === 'income' && tx.amount > 0) ||
      (type === 'expense' && tx.amount < 0)
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

export const groupByMonth = (transactions) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const groups = []
  const lookup = new Map()

  sorted.forEach((tx) => {
    const label = new Date(tx.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    if (!lookup.has(label)) {
      lookup.set(label, { label, items: [] })
      groups.push(lookup.get(label))
    }
    lookup.get(label).items.push(tx)
  })
  return groups
}

export const exportToCSV = (transactions) => {
  const headers = ['Title', 'Amount', 'Category', 'Date']
  const rows = transactions.map((tx) => [tx.title, tx.amount, tx.category, tx.date])
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'transactions.csv'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
