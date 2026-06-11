export interface Occurrence {
  id: string;
  date: string; // ISO
  notes: string;
}

export interface EarnedBadge {
  id: string;
  name: string;
  earnedAt: string; // ISO
}

export interface Habit {
  id: string;
  name: string;
  startDate: string; // ISO
  occurrences: Occurrence[];
  currentStreakStart: string; // ISO
  earnedBadges: EarnedBadge[];
  createdAt: string; // ISO
}

export interface BadgeDefinition {
  id: string;
  name: string;
  milliseconds: number;
}

export interface NextBadge {
  name: string;
  timeRemaining: number;
  earnTime: Date;
  formattedTimeRemaining: string;
}
