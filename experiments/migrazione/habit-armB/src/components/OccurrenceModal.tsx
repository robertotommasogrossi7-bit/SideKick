import { useEffect, useState } from 'react'
import type { Habit } from '../types'
import { formatDateTimeLocal } from '../utils/habits'

interface Props {
  habit: Habit
  onSave: (habitId: string, date: string, notes: string) => void
  onDeleteOccurrence: (habitId: string, occurrenceId: string) => void
  onClose: () => void
}

export function OccurrenceModal({ habit, onSave, onDeleteOccurrence, onClose }: Props) {
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)

  useEffect(() => {
    setDate(formatDateTimeLocal(new Date()))
    setNotes('')
  }, [habit.id])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date) return
    onSave(habit.id, date, notes)
    setNotes('')
    setDate(formatDateTimeLocal(new Date()))
  }

  return (
    <>
      <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add Occurrence</h2>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="occurrenceDate">Date &amp; Time:</label>
              <input
                id="occurrenceDate"
                type="datetime-local"
                value={date}
                min={formatDateTimeLocal(new Date(habit.startDate))}
                max={formatDateTimeLocal(new Date())}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="occurrenceNotes">Notes:</label>
              <textarea
                id="occurrenceNotes"
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Optional notes about this occurrence"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Occurrence</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>

          <div className="modal-separator" />
          <div className="occurrences-section">
            <h3>Recent Occurrences</h3>
            <div className="existing-occurrences">
              {habit.occurrences.length === 0 ? (
                <p className="no-occurrences">No occurrences recorded yet.</p>
              ) : (
                habit.occurrences.map(occ => {
                  const d = new Date(occ.date)
                  const formatted = d.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  const shortNote =
                    occ.notes.length > 30 ? occ.notes.substring(0, 30) + '…' : occ.notes

                  return (
                    <div key={occ.id} className="occurrence-item">
                      <div className="occurrence-info">
                        <div className="occurrence-date">{formatted}</div>
                        {shortNote && (
                          <div className="occurrence-note">{shortNote}</div>
                        )}
                      </div>
                      <div className="occurrence-actions">
                        <button
                          className="icon-btn delete"
                          title="Delete Occurrence"
                          onClick={() => setPendingDelete(occ.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {pendingDelete && (
        <div className="modal active" style={{ zIndex: 1002 }} onClick={(e) => { if (e.target === e.currentTarget) setPendingDelete(null) }}>
          <div className="modal-content modal-small">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this occurrence?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={() => {
                  onDeleteOccurrence(habit.id, pendingDelete)
                  setPendingDelete(null)
                }}
              >
                Delete
              </button>
              <button className="btn btn-secondary" onClick={() => setPendingDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
