import { useEffect, useRef, useState } from 'react'
import type { Habit } from '../types'
import { formatDateTimeLocal } from '../utils/habits'

interface Props {
  habit: Habit | null
  onSave: (name: string, startDate: string) => void
  onClose: () => void
}

export function HabitModal({ habit, onSave, onClose }: Props) {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (habit) {
      setName(habit.name)
      setStartDate(formatDateTimeLocal(new Date(habit.startDate)))
    } else {
      setName('')
      setStartDate(formatDateTimeLocal(new Date()))
    }
    nameRef.current?.focus()
  }, [habit])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !startDate) return
    onSave(name.trim(), startDate)
  }

  return (
    <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{habit ? 'Edit Habit' : 'Add New Habit'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="habitName">Habit Name:</label>
            <input
              ref={nameRef}
              id="habitName"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Stop Eating Junk Food"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
