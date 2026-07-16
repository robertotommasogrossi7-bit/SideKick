import { useRef, useState } from 'react'
import type { Habit } from './types'
import { useHabits } from './hooks/useHabits'
import { HabitCard } from './components/HabitCard'
import { HabitModal } from './components/HabitModal'
import { OccurrenceModal } from './components/OccurrenceModal'
import { DeleteModal } from './components/DeleteModal'
import { BadgesModal } from './components/BadgesModal'
import { Toast } from './components/Toast'

type ModalState =
  | { type: 'none' }
  | { type: 'habit'; habit: Habit | null }
  | { type: 'occurrence'; habit: Habit }
  | { type: 'delete'; habitId: string }
  | { type: 'badges'; habit: Habit }

export default function App() {
  const {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    addOccurrence,
    deleteOccurrence,
    exportData,
    importData,
  } = useHabits()

  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [toastTrigger, setToastTrigger] = useState(0)
  const importRef = useRef<HTMLInputElement>(null)

  function toast() {
    setToastTrigger(n => n + 1)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const result = importData(ev.target?.result as string)
      if (result.success) toast()
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  function handleSaveHabit(name: string, startDate: string) {
    if (modal.type === 'habit') {
      if (modal.habit) {
        updateHabit(modal.habit.id, name, startDate)
      } else {
        addHabit(name, startDate)
        toast()
      }
    }
    setModal({ type: 'none' })
  }

  function handleSaveOccurrence(habitId: string, date: string, notes: string) {
    addOccurrence(habitId, date, notes)
    // keep modal open (user can add more or close manually)
  }

  return (
    <>
      <div className="container">
        <header>
          <h1>Habit Tracker</h1>
          <p className="tagline">"To live is to suffer, to survive is to find some meaning in the suffering."</p>
        </header>

        <div className="backup-restore-section">
          <button className="backup-btn" onClick={exportData}>
            <span className="icon">📤</span>
            <span>Export Data</span>
          </button>
          <button className="backup-btn" onClick={() => importRef.current?.click()}>
            <span className="icon">📥</span>
            <span>Import Data</span>
          </button>
          <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
        </div>

        <main>
          <div className="add-habit-section">
            <button className="add-habit-btn" onClick={() => setModal({ type: 'habit', habit: null })}>
              <span className="plus-icon">+</span>
              <span>Add New Habit</span>
            </button>
          </div>

          <div className="habits-list">
            {habits.length === 0 ? (
              <div className="empty-state">
                <h3>No habits tracked yet</h3>
                <p>Click the button above to start tracking your first habit!</p>
              </div>
            ) : (
              habits.map(habit => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onAddOccurrence={() => setModal({ type: 'occurrence', habit })}
                  onEdit={() => setModal({ type: 'habit', habit })}
                  onDelete={() => setModal({ type: 'delete', habitId: habit.id })}
                  onViewBadges={() => setModal({ type: 'badges', habit })}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {modal.type === 'habit' && (
        <HabitModal
          habit={modal.habit}
          onSave={handleSaveHabit}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'occurrence' && (
        <OccurrenceModal
          habit={habits.find(h => h.id === modal.habit.id) ?? modal.habit}
          onSave={handleSaveOccurrence}
          onDeleteOccurrence={(hId, oId) => deleteOccurrence(hId, oId)}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'delete' && (
        <DeleteModal
          onConfirm={() => {
            deleteHabit(modal.habitId)
            setModal({ type: 'none' })
          }}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'badges' && (
        <BadgesModal
          habit={habits.find(h => h.id === modal.habit.id) ?? modal.habit}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      <Toast trigger={toastTrigger} />
    </>
  )
}
