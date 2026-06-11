import type { BadgeDefinition, EarnedBadge, Habit, NextBadge, Occurrence } from './types';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { id: '1hour', name: '1 Hour', milliseconds: 3600000 },
  { id: '3hour', name: '3 Hours', milliseconds: 10800000 },
  { id: '6hour', name: '6 Hours', milliseconds: 21600000 },
  { id: '12hour', name: '12 Hours', milliseconds: 43200000 },
  { id: '1day', name: '1 Day', milliseconds: 86400000 },
  { id: '2day', name: '2 Days', milliseconds: 172800000 },
  { id: '3day', name: '3 Days', milliseconds: 259200000 },
  { id: '4day', name: '4 Days', milliseconds: 345600000 },
  { id: '5day', name: '5 Days', milliseconds: 432000000 },
  { id: '6day', name: '6 Days', milliseconds: 518400000 },
  { id: '1week', name: '1 Week', milliseconds: 604800000 },
  { id: '10day', name: '10 Days', milliseconds: 864000000 },
  { id: '12day', name: '12 Days', milliseconds: 1036800000 },
  { id: '2week', name: '2 Weeks', milliseconds: 1209600000 },
  { id: '16day', name: '16 Days', milliseconds: 1382400000 },
  { id: '3week', name: '3 Weeks', milliseconds: 1814400000 },
  { id: '1month', name: '1 Month', milliseconds: 2592000000 },
  { id: '50day', name: '50 Days', milliseconds: 4320000000 },
  { id: '6week', name: '6 Weeks', milliseconds: 3628800000 },
  { id: '2month', name: '2 Months', milliseconds: 5184000000 },
  { id: '75day', name: '75 Days', milliseconds: 6480000000 },
  { id: '3month', name: '3 Months', milliseconds: 7776000000 },
  { id: '100day', name: '100 Days', milliseconds: 8640000000 },
  { id: '4month', name: '4 Months', milliseconds: 10368000000 },
  { id: '5month', name: '5 Months', milliseconds: 12960000000 },
  { id: '6month', name: '6 Months', milliseconds: 15552000000 },
  { id: '1year', name: '1 Year', milliseconds: 31536000000 },
  { id: '2year', name: '2 Years', milliseconds: 63072000000 },
].sort((a, b) => a.milliseconds - b.milliseconds);

export function calculateEarnedBadges(habit: Habit): EarnedBadge[] {
  const now = new Date();
  const currentStreakStart =
    habit.occurrences.length === 0
      ? new Date(habit.startDate)
      : new Date(habit.occurrences[0].date);

  const currentStreakDuration = now.getTime() - currentStreakStart.getTime();
  const earnedBadges: EarnedBadge[] = [];

  for (const badge of BADGE_DEFINITIONS) {
    if (currentStreakDuration >= badge.milliseconds) {
      earnedBadges.push({
        id: badge.id,
        name: badge.name,
        earnedAt: new Date(currentStreakStart.getTime() + badge.milliseconds).toISOString(),
      });
    }
  }

  earnedBadges.sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime());
  return earnedBadges;
}

export function updateStreakAndBadges(habit: Habit): Habit {
  const previousStreakStart = habit.currentStreakStart;

  let currentStreakStart: string;
  if (habit.occurrences.length === 0) {
    currentStreakStart = habit.startDate;
  } else {
    const sorted = [...habit.occurrences].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    currentStreakStart = sorted[0].date;
  }

  let earnedBadges = habit.earnedBadges;
  if (previousStreakStart && new Date(currentStreakStart) > new Date(previousStreakStart)) {
    earnedBadges = [];
  }

  const updated: Habit = { ...habit, currentStreakStart, earnedBadges };
  updated.earnedBadges = calculateEarnedBadges(updated);
  return updated;
}

export function getNextBadge(habit: Habit): NextBadge | null {
  const now = new Date();
  const streakStart = new Date(habit.currentStreakStart);
  const currentStreakDuration = now.getTime() - streakStart.getTime();

  for (const badge of BADGE_DEFINITIONS) {
    if (currentStreakDuration < badge.milliseconds) {
      const timeRemaining = badge.milliseconds - currentStreakDuration;
      return {
        name: badge.name,
        timeRemaining,
        earnTime: new Date(now.getTime() + timeRemaining),
        formattedTimeRemaining: formatDuration(timeRemaining),
      };
    }
  }
  return null;
}

export function getLatestBadges(habit: Habit, count = 3): EarnedBadge[] {
  return habit.earnedBadges.slice(0, count);
}

export function calculateCurrentStreak(habit: Habit): string {
  const now = new Date();
  if (habit.occurrences.length === 0) {
    return formatDuration(now.getTime() - new Date(habit.startDate).getTime());
  }
  return formatDuration(now.getTime() - new Date(habit.occurrences[0].date).getTime());
}

export function calculateLongestStreak(habit: Habit): string {
  if (habit.occurrences.length === 0) {
    return calculateCurrentStreak(habit);
  }

  const now = new Date();
  const startDate = new Date(habit.startDate);
  const sorted = [...habit.occurrences].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let longestStreak = 0;
  let previousDate = startDate;

  for (const occ of sorted) {
    const occDate = new Date(occ.date);
    const streakLength = occDate.getTime() - previousDate.getTime();
    if (streakLength > longestStreak) longestStreak = streakLength;
    previousDate = occDate;
  }

  const currentStreakLength = now.getTime() - previousDate.getTime();
  if (currentStreakLength > longestStreak) longestStreak = currentStreakLength;

  return formatDuration(longestStreak);
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const displayHours = hours % 24;
  const displayMinutes = minutes % 60;

  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}, ${displayHours} hr${displayHours !== 1 ? 's' : ''}, ${displayMinutes} min${displayMinutes !== 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${displayHours} hr${displayHours !== 1 ? 's' : ''}, ${displayMinutes} min${displayMinutes !== 1 ? 's' : ''}`;
  } else {
    return `${displayMinutes} min${displayMinutes !== 1 ? 's' : ''}`;
  }
}

export function formatDateTimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatBadgeDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function migrateHabits(habits: Habit[]): Habit[] {
  let updated = false;
  const migrated = habits.map((habit) => {
    let h = { ...habit };
    if (!h.currentStreakStart) {
      if (h.occurrences.length > 0) {
        const sorted = [...h.occurrences].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        h.currentStreakStart = sorted[0].date;
      } else {
        h.currentStreakStart = h.startDate;
      }
      updated = true;
    }
    if (!h.earnedBadges) {
      h.earnedBadges = [];
      updated = true;
    }
    return h;
  });

  if (updated) {
    return migrated.map((h) => updateStreakAndBadges(h));
  }
  return migrated;
}

export function buildExportPayload(habits: Habit[]): string {
  const payload = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    habits,
  };
  return JSON.stringify(payload, null, 2);
}

export function parseImport(
  fileContent: string,
  existing: Habit[],
  mode: 'replace' | 'merge' = 'replace'
): { success: true; habits: Habit[] } | { success: false; error: string } {
  try {
    const data = JSON.parse(fileContent) as { habits?: unknown };
    if (!data.habits || !Array.isArray(data.habits)) {
      throw new Error('Invalid backup file format');
    }

    const importedHabits: Habit[] = (data.habits as Partial<Habit>[]).map((habit) => {
      const newHabit: Habit = {
        id: generateUniqueId(),
        name: habit.name ?? '',
        startDate: habit.startDate ?? new Date().toISOString(),
        createdAt: habit.createdAt ?? new Date().toISOString(),
        currentStreakStart: habit.currentStreakStart ?? habit.startDate ?? new Date().toISOString(),
        earnedBadges: habit.earnedBadges ?? [],
        occurrences: Array.isArray(habit.occurrences)
          ? (habit.occurrences as Occurrence[]).map((occ) => ({
              ...occ,
              id: generateUniqueId(),
            }))
          : [],
      };
      return updateStreakAndBadges(newHabit);
    });

    const base = mode === 'replace' ? [] : existing;
    return { success: true, habits: [...base, ...importedHabits] };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export const MOTIVATIONAL_MESSAGES = [
  "You're stronger than you think!",
  'Every moment is a victory!',
  "Keep going, you've got this!",
  'Progress, not perfection!',
  "You're doing amazing!",
  'One day at a time!',
  'Proud of your journey!',
  'Stay strong, stay focused!',
  "You're worth it!",
  'Believe in yourself!',
];
