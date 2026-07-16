export interface Occurrence {
  id: string
  date: string
  notes: string
}

export interface EarnedBadge {
  id: string
  name: string
  earnedAt: string
}

export interface Habit {
  id: string
  name: string
  startDate: string
  occurrences: Occurrence[]
  currentStreakStart: string
  earnedBadges: EarnedBadge[]
  createdAt: string
}

export interface BadgeDefinition {
  id: string
  name: string
  milliseconds: number
}

export interface NextBadgeInfo {
  name: string
  timeRemaining: number
  formattedTimeRemaining: string
}
