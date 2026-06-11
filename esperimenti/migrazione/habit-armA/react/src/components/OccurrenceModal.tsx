import { useRef } from 'react';
import type { Habit } from '../types';
import { formatDateTimeLocal } from '../logic';

interface Props {
  habit: Habit;
  onSave: (date: string, notes: string) => void;
  onClose: () => void;
  onDeleteOccurrence: (occurrenceId: string) => void;
}

export function OccurrenceModal({ habit, onSave, onClose, onDeleteOccurrence }: Props) {
  const dateRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const date = dateRef.current?.value ?? '';
    const notes = notesRef.current?.value.trim() ?? '';
    if (!date) return;
    onSave(date, notes);
  }

  const now = formatDateTimeLocal(new Date());
  const minDate = formatDateTimeLocal(new Date(habit.startDate));

  return (
    <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Occurrence</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="occurrenceDate">Date &amp; Time:</label>
            <input
              type="datetime-local"
              id="occurrenceDate"
              ref={dateRef}
              defaultValue={now}
              min={minDate}
              max={now}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="occurrenceNotes">Notes:</label>
            <textarea
              id="occurrenceNotes"
              ref={notesRef}
              rows={3}
              placeholder="Optional notes about this occurrence"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Occurrence</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>

        <div className="modal-separator" />
        <div className="occurrences-section" style={{ padding: '0 20px 20px' }}>
          <h3>Recent Occurrences</h3>
          <div className="existing-occurrences">
            {habit.occurrences.length === 0 ? (
              <p className="no-occurrences">No occurrences recorded yet.</p>
            ) : (
              habit.occurrences.map((occ) => {
                const date = new Date(occ.date);
                const formattedDate = date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const noteDisplay = occ.notes
                  ? occ.notes.length > 30
                    ? occ.notes.substring(0, 30) + '...'
                    : occ.notes
                  : '';

                return (
                  <div key={occ.id} className="occurrence-item">
                    <div className="occurrence-info">
                      <div className="occurrence-date">{formattedDate}</div>
                      {noteDisplay && <div className="occurrence-note">{noteDisplay}</div>}
                    </div>
                    <div className="occurrence-actions">
                      <button
                        className="icon-btn delete"
                        title="Delete Occurrence"
                        onClick={() => onDeleteOccurrence(occ.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
