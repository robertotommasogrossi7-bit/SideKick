import { useEffect, useRef } from 'react';
import type { Habit } from '../types';
import { formatDateTimeLocal } from '../logic';

interface Props {
  habit: Habit | null;
  onSave: (name: string, startDate: string) => void;
  onClose: () => void;
}

export function HabitModal({ habit, onSave, onClose }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (habit) {
      if (nameRef.current) nameRef.current.value = habit.name;
      if (startDateRef.current) startDateRef.current.value = formatDateTimeLocal(new Date(habit.startDate));
    } else {
      if (nameRef.current) nameRef.current.value = '';
      if (startDateRef.current) startDateRef.current.value = formatDateTimeLocal(new Date());
    }
    nameRef.current?.focus();
  }, [habit]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? '';
    const startDate = startDateRef.current?.value ?? '';
    if (!name || !startDate) return;
    onSave(name, startDate);
  }

  return (
    <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{habit ? 'Edit Habit' : 'Add New Habit'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="habitName">Habit Name:</label>
            <input
              type="text"
              id="habitName"
              ref={nameRef}
              placeholder="e.g., Stop Eating Junk Food"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input type="datetime-local" id="startDate" ref={startDateRef} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
