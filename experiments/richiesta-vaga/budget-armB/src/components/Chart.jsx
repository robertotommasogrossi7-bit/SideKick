import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { formatCurrency } from '../utils/format'

function getMonthlyData(transactions) {
  const months = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - i)
    const year = d.getFullYear()
    const month = d.getMonth()
    const label = d.toLocaleDateString('en-US', { month: 'short' })
    const txs = transactions.filter(tx => {
      const dt = new Date(tx.date + 'T12:00:00')
      return dt.getFullYear() === year && dt.getMonth() === month
    })
    const income = txs.filter(tx => tx.amount > 0).reduce((s, tx) => s + tx.amount, 0)
    const expense = Math.abs(txs.filter(tx => tx.amount < 0).reduce((s, tx) => s + tx.amount, 0))
    months.push({ label, income, expense })
  }
  return months
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(10,16,35,0.96)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10,
      padding: '10px 14px',
      fontSize: 13,
    }}>
      <p style={{ color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map(entry => (
        <p key={entry.name} style={{ color: entry.color, fontWeight: 600, marginBottom: 2 }}>
          {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  )
}

export default function Chart({ transactions }) {
  const data = getMonthlyData(transactions)

  return (
    <section className="card chart-section">
      <div className="section-header">
        <h3 className="section-title">Cash Flow</h3>
        <span className="section-meta">Last 6 months</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="38%" barGap={3}>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickFormatter={v => {
              if (v === 0) return '$0'
              if (v >= 1000) { const k = v / 1000; return `$${Number.isInteger(k) ? k : k.toFixed(1)}k` }
              return `$${v}`
            }}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 12 }}
            formatter={v => v.charAt(0).toUpperCase() + v.slice(1)}
          />
          <Bar dataKey="income" fill="#22c55e" radius={[5, 5, 0, 0]} />
          <Bar dataKey="expense" fill="#f43f5e" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
