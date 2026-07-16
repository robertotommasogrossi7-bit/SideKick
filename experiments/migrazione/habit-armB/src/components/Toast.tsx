import { useEffect, useState } from 'react'

const MESSAGES = [
  "You're stronger than you think!",
  "Every moment is a victory!",
  "Keep going, you've got this!",
  "Progress, not perfection!",
  "You're doing amazing!",
  "One day at a time!",
  "Proud of your journey!",
  "Stay strong, stay focused!",
  "You're worth it!",
  "Believe in yourself!",
]

interface Props {
  trigger: number
}

export function Toast({ trigger }: Props) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (trigger === 0) return
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [trigger])

  return (
    <div className={`motivational-message${visible ? ' show' : ''}`}>
      <p>{message}</p>
    </div>
  )
}
