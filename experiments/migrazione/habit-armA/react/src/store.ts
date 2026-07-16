import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Habit } from './types';
import {
  migrateHabits,
  updateStreakAndBadges,
} from './logic';

interface HabitStore {
  habits: Habit[];
  addHabit: (name: string, startDate: string) => void;
  updateHabit: (id: string, name: string, startDate: string) => void;
  deleteHabit: (id: string) => void;
  addOccurrence: (habitId: string, date: string, notes: string) => void;
  deleteOccurrence: (habitId: string, occurrenceId: string) => void;
  recalculateAll: () => void;
  replaceHabits: (habits: Habit[]) => void;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],

      addHabit(name, startDate) {
        const habit: Habit = {
          id: Date.now().toString(),
          name,
          startDate: new Date(startDate).toISOString(),
          occurrences: [],
          currentStreakStart: new Date(startDate).toISOString(),
          earnedBadges: [],
          createdAt: new Date().toISOString(),
        };
        const updated = updateStreakAndBadges(habit);
        set((s) => ({ habits: [...s.habits, updated] }));
      },

      updateHabit(id, name, startDate) {
        set((s) => ({
          habits: s.habits.map((h) => {
            if (h.id !== id) return h;
            const newStart = new Date(startDate).toISOString();
            const filtered = h.occurrences.filter(
              (o) => new Date(o.date) >= new Date(newStart)
            );
            const updated = updateStreakAndBadges({ ...h, name, startDate: newStart, occurrences: filtered });
            return updated;
          }),
        }));
      },

      deleteHabit(id) {
        set((s) => ({ habits: s.habits.filter((h) => h.id !== id) }));
      },

      addOccurrence(habitId, date, notes) {
        set((s) => ({
          habits: s.habits.map((h) => {
            if (h.id !== habitId) return h;
            const occ = {
              id: Date.now().toString(),
              date: new Date(date).toISOString(),
              notes: notes || '',
            };
            const sorted = [...h.occurrences, occ].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            return updateStreakAndBadges({ ...h, occurrences: sorted });
          }),
        }));
      },

      deleteOccurrence(habitId, occurrenceId) {
        set((s) => ({
          habits: s.habits.map((h) => {
            if (h.id !== habitId) return h;
            const filtered = h.occurrences.filter((o) => o.id !== occurrenceId);
            return updateStreakAndBadges({ ...h, occurrences: filtered });
          }),
        }));
      },

      recalculateAll() {
        set((s) => ({
          habits: s.habits.map((h) => updateStreakAndBadges(h)),
        }));
      },

      replaceHabits(habits) {
        set({ habits });
      },
    }),
    {
      name: 'habitTrackerHabits',
      // persist only the data array, not derived/UI state
      partialize: (s) => ({ habits: s.habits }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.habits = migrateHabits(state.habits);
        }
      },
    }
  )
);

export function dataUrlDownload(dataStr: string, filename: string): void {
  const dataUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
