import { useState, useEffect, useCallback } from 'react'
import type { Habit, Occurrence } from '../types'
import {
  generateUniqueId,
  migrateHabits,
  updateStreakAndBadges,
} from '../utils/habits'

const STORAGE_KEY = 'habitTrackerHabits'

function loadFromStorage(): Habit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed: Habit[] = JSON.parse(stored)
    return migrateHabits(parsed)
  } catch {
    return []
  }
}

function saveToStorage(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => loadFromStorage())

  const persist = useCallback((next: Habit[]) => {
    saveToStorage(next)
    setHabits(next)
  }, [])

  // Refresh streaks/badges every minute
  useEffect(() => {
    const id = setInterval(() => {
      setHabits(prev => {
        const refreshed = prev.map(h => updateStreakAndBadges(h))
        saveToStorage(refreshed)
        return refreshed
      })
    }, 60000)
    return () => clearInterval(id)
  }, [])

  const addHabit = useCallback(
    (name: string, startDate: string) => {
      const now = new Date().toISOString()
      const start = new Date(startDate).toISOString()
      const habit: Habit = {
        id: Date.now().toString(),
        name,
        startDate: start,
        occurrences: [],
        currentStreakStart: start,
        earnedBadges: [],
        createdAt: now,
      }
      persist([...habits, updateStreakAndBadges(habit)])
    },
    [habits, persist]
  )

  const updateHabit = useCallback(
    (id: string, name: string, startDate: string) => {
      const next = habits.map(h => {
        if (h.id !== id) return h
        const newStart = new Date(startDate).toISOString()
        const occs = h.occurrences.filter(
          o => new Date(o.date) >= new Date(newStart)
        )
        return updateStreakAndBadges({ ...h, name, startDate: newStart, occurrences: occs })
      })
      persist(next)
    },
    [habits, persist]
  )

  const deleteHabit = useCallback(
    (id: string) => {
      persist(habits.filter(h => h.id !== id))
    },
    [habits, persist]
  )

  const addOccurrence = useCallback(
    (habitId: string, date: string, notes: string) => {
      const next = habits.map(h => {
        if (h.id !== habitId) return h
        const occ: Occurrence = {
          id: Date.now().toString(),
          date: new Date(date).toISOString(),
          notes: notes || '',
        }
        const occs = [...h.occurrences, occ].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        return updateStreakAndBadges({ ...h, occurrences: occs })
      })
      persist(next)
    },
    [habits, persist]
  )

  const deleteOccurrence = useCallback(
    (habitId: string, occurrenceId: string) => {
      const next = habits.map(h => {
        if (h.id !== habitId) return h
        const occs = h.occurrences.filter(o => o.id !== occurrenceId)
        return updateStreakAndBadges({ ...h, occurrences: occs })
      })
      persist(next)
    },
    [habits, persist]
  )

  const exportData = useCallback(() => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      habits,
    }
    const json = JSON.stringify(data, null, 2)
    const url = 'data:text/json;charset=utf-8,' + encodeURIComponent(json)
    const a = document.createElement('a')
    a.href = url
    a.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [habits])

  const importData = useCallback(
    (fileContent: string) => {
      try {
        const parsed = JSON.parse(fileContent)
        if (!parsed.habits || !Array.isArray(parsed.habits)) {
          throw new Error('Invalid backup file format')
        }
        const imported: Habit[] = parsed.habits.map((h: Habit) => ({
          ...h,
          id: generateUniqueId(),
          occurrences: (h.occurrences ?? []).map((o: Occurrence) => ({
            ...o,
            id: generateUniqueId(),
          })),
          currentStreakStart: h.currentStreakStart ?? h.startDate,
          earnedBadges: h.earnedBadges ?? [],
        }))
        const withBadges = imported.map(h => updateStreakAndBadges(h))
        persist(withBadges)
        return { success: true }
      } catch (e) {
        return { success: false, error: (e as Error).message }
      }
    },
    [persist]
  )

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    addOccurrence,
    deleteOccurrence,
    exportData,
    importData,
  }
}
