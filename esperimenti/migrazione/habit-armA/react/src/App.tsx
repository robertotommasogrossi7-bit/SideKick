import { useEffect, useRef, useState } from 'react';
import { useHabitStore, dataUrlDownload } from './store';
import {
  buildExportPayload,
  MOTIVATIONAL_MESSAGES,
  parseImport,
} from './logic';
import { HabitCard } from './components/HabitCard';
import { HabitModal } from './components/HabitModal';
import { OccurrenceModal } from './components/OccurrenceModal';
import { DeleteModal } from './components/DeleteModal';
import { DeleteOccurrenceModal } from './components/DeleteOccurrenceModal';
import { BadgesModal } from './components/BadgesModal';
import { MotivationalMessage } from './components/MotivationalMessage';

type ModalState =
  | { type: 'none' }
  | { type: 'addHabit' }
  | { type: 'editHabit'; habitId: string }
  | { type: 'occurrence'; habitId: string }
  | { type: 'deleteHabit'; habitId: string }
  | { type: 'badges'; habitId: string }
  | { type: 'deleteOccurrence'; habitId: string; occurrenceId: string };

export function App() {
  const habits = useHabitStore((s) => s.habits);
  const addHabit = useHabitStore((s) => s.addHabit);
  const updateHabit = useHabitStore((s) => s.updateHabit);
  const deleteHabit = useHabitStore((s) => s.deleteHabit);
  const addOccurrence = useHabitStore((s) => s.addOccurrence);
  const deleteOccurrence = useHabitStore((s) => s.deleteOccurrence);
  const recalculateAll = useHabitStore((s) => s.recalculateAll);
  const replaceHabits = useHabitStore((s) => s.replaceHabits);

  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [motivMsg, setMotivMsg] = useState({ show: false, text: '' });
  const prevBadgeCounts = useRef<Record<string, number>>({});
  const importFileRef = useRef<HTMLInputElement>(null);

  function showMotivationalMessage() {
    const text = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    setMotivMsg({ show: true, text });
    setTimeout(() => setMotivMsg((m) => ({ ...m, show: false })), 3000);
  }

  // Initialise prevBadgeCounts on mount
  useEffect(() => {
    habits.forEach((h) => { prevBadgeCounts.current[h.id] = h.earnedBadges.length; });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Streak updater — every 60 seconds
  useEffect(() => {
    const id = setInterval(() => {
      recalculateAll();
      const current = useHabitStore.getState().habits;
      const prev = prevBadgeCounts.current;
      const gained = current.some((h) => h.earnedBadges.length > (prev[h.id] ?? 0));
      if (gained) showMotivationalMessage();
      current.forEach((h) => { prev[h.id] = h.earnedBadges.length; });
    }, 60000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleExport() {
    const payload = buildExportPayload(habits);
    const filename = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    dataUrlDownload(payload, filename);
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const result = parseImport(content, habits, 'replace');
      if (result.success) {
        replaceHabits(result.habits);
        showMotivationalMessage();
      }
      if (importFileRef.current) importFileRef.current.value = '';
    };
    reader.readAsText(file);
  }

  function closeModal() {
    setModal({ type: 'none' });
  }

  const habitInModal =
    modal.type === 'editHabit' ||
    modal.type === 'occurrence' ||
    modal.type === 'deleteHabit' ||
    modal.type === 'badges' ||
    modal.type === 'deleteOccurrence'
      ? habits.find((h) => h.id === modal.habitId) ?? null
      : null;

  return (
    <div className="container">
      <header>
        <h1>Habit Tracker</h1>
        <p className="tagline">
          &ldquo;To live is to suffer, to survive is to find some meaning in the suffering.&rdquo;
        </p>
      </header>

      <div className="backup-restore-section">
        <button className="backup-btn" onClick={handleExport}>
          <span className="icon">📤</span>
          <span>Export Data</span>
        </button>
        <button className="backup-btn" onClick={() => importFileRef.current?.click()}>
          <span className="icon">📥</span>
          <span>Import Data</span>
        </button>
        <input
          type="file"
          ref={importFileRef}
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImportFile}
        />
      </div>

      <main>
        <div className="add-habit-section">
          <button className="add-habit-btn" onClick={() => setModal({ type: 'addHabit' })}>
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
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onAddOccurrence={() => setModal({ type: 'occurrence', habitId: habit.id })}
                onEdit={() => setModal({ type: 'editHabit', habitId: habit.id })}
                onDelete={() => setModal({ type: 'deleteHabit', habitId: habit.id })}
                onViewBadges={() => setModal({ type: 'badges', habitId: habit.id })}
              />
            ))
          )}
        </div>
      </main>

      {(modal.type === 'addHabit' || modal.type === 'editHabit') && (
        <HabitModal
          habit={modal.type === 'editHabit' ? habitInModal : null}
          onSave={(name, startDate) => {
            if (modal.type === 'editHabit') {
              updateHabit(modal.habitId, name, startDate);
            } else {
              addHabit(name, startDate);
              showMotivationalMessage();
            }
            closeModal();
          }}
          onClose={closeModal}
        />
      )}

      {modal.type === 'occurrence' && habitInModal && (
        <OccurrenceModal
          habit={habitInModal}
          onSave={(date, notes) => {
            addOccurrence(modal.habitId, date, notes);
            closeModal();
          }}
          onClose={closeModal}
          onDeleteOccurrence={(occurrenceId) =>
            setModal({ type: 'deleteOccurrence', habitId: modal.habitId, occurrenceId })
          }
        />
      )}

      {modal.type === 'deleteHabit' && (
        <DeleteModal
          onConfirm={() => {
            deleteHabit(modal.habitId);
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}

      {modal.type === 'deleteOccurrence' && (
        <DeleteOccurrenceModal
          onConfirm={() => {
            const { habitId, occurrenceId } = modal;
            deleteOccurrence(habitId, occurrenceId);
            setModal({ type: 'occurrence', habitId });
          }}
          onCancel={() => {
            const habitId = modal.habitId;
            setModal({ type: 'occurrence', habitId });
          }}
        />
      )}

      {modal.type === 'badges' && habitInModal && (
        <BadgesModal habit={habitInModal} onClose={closeModal} />
      )}

      <MotivationalMessage show={motivMsg.show} message={motivMsg.text} />
    </div>
  );
}
