import { useRef, useEffect } from 'react'
import { formatCurrency } from '../utils/format'

function roundRect(ctx, x, y, w, h, r) {
  if (h <= 0) return
  r = Math.min(r, h, w / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h)
  ctx.lineTo(x, y + h)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
  ctx.fill()
}

function draw(canvas, transactions) {
  if (!canvas || canvas.clientWidth === 0) return

  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const W = canvas.clientWidth
  const H = 260

  canvas.width = W * dpr
  canvas.height = H * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, W, H)

  const income = transactions.filter((a) => a.amount > 0).reduce((s, a) => s + a.amount, 0)
  const expenses = Math.abs(
    transactions.filter((a) => a.amount < 0).reduce((s, a) => s + a.amount, 0)
  )

  if (income === 0 && expenses === 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.font = '14px Inter, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('No transactions yet', W / 2, H / 2)
    return
  }

  const maxVal = Math.max(income, expenses, 1)
  const barW = Math.min(110, W / 5.5)
  const gap = Math.max(40, W / 10)
  const totalW = barW * 2 + gap
  const startX = (W - totalW) / 2
  const baseY = H - 48
  const maxH = H - 96

  const incH = (income / maxVal) * maxH
  const expH = (expenses / maxVal) * maxH

  // grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'
  ctx.lineWidth = 1
  for (let i = 1; i <= 3; i++) {
    const y = baseY - (i / 3) * maxH
    ctx.beginPath()
    ctx.moveTo(20, y)
    ctx.lineTo(W - 20, y)
    ctx.stroke()
  }

  // baseline
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(20, baseY)
  ctx.lineTo(W - 20, baseY)
  ctx.stroke()

  // income bar
  if (incH > 0) {
    const g = ctx.createLinearGradient(0, baseY - incH, 0, baseY)
    g.addColorStop(0, '#4ade80')
    g.addColorStop(1, 'rgba(74,222,128,0.4)')
    ctx.fillStyle = g
    roundRect(ctx, startX, baseY - incH, barW, incH, 8)

    // glow
    ctx.shadowColor = 'rgba(74,222,128,0.4)'
    ctx.shadowBlur = 16
    ctx.fillStyle = 'rgba(74,222,128,0.15)'
    roundRect(ctx, startX, baseY - incH, barW, incH, 8)
    ctx.shadowBlur = 0
  }

  // expense bar
  if (expH > 0) {
    const g = ctx.createLinearGradient(0, baseY - expH, 0, baseY)
    g.addColorStop(0, '#fb7185')
    g.addColorStop(1, 'rgba(251,113,133,0.4)')
    ctx.fillStyle = g
    roundRect(ctx, startX + barW + gap, baseY - expH, barW, expH, 8)

    ctx.shadowColor = 'rgba(251,113,133,0.4)'
    ctx.shadowBlur = 16
    ctx.fillStyle = 'rgba(251,113,133,0.15)'
    roundRect(ctx, startX + barW + gap, baseY - expH, barW, expH, 8)
    ctx.shadowBlur = 0
  }

  // labels
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '12px Inter, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillText('Income', startX + barW / 2, baseY + 10)
  ctx.fillText('Expense', startX + barW + gap + barW / 2, baseY + 10)

  // values above bars
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = '600 13px Inter, system-ui, sans-serif'
  ctx.textBaseline = 'bottom'
  if (incH > 0) ctx.fillText(formatCurrency(income), startX + barW / 2, baseY - incH - 8)
  if (expH > 0) ctx.fillText(formatCurrency(expenses), startX + barW + gap + barW / 2, baseY - expH - 8)
}

export default function Chart({ transactions }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let raf
    const render = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => draw(canvas, transactions))
    }

    const ro = new ResizeObserver(render)
    ro.observe(canvas)
    render()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [transactions])

  return (
    <section className="card chart">
      <div className="transactions__header">
        <h3 className="section-title">Cash Flow Overview</h3>
        <p className="transactions__meta">Income vs Expense</p>
      </div>
      <canvas ref={canvasRef} className="chart__canvas" />
    </section>
  )
}
