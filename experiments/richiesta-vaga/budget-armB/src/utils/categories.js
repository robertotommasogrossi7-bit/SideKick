export const CATEGORIES = [
  { name: 'Salary',        icon: '💼', color: '#22c55e' },
  { name: 'Business',      icon: '📊', color: '#3b82f6' },
  { name: 'Investments',   icon: '📈', color: '#8b5cf6' },
  { name: 'Housing',       icon: '🏠', color: '#f59e0b' },
  { name: 'Food',          icon: '🍜', color: '#f97316' },
  { name: 'Transport',     icon: '🚗', color: '#06b6d4' },
  { name: 'Health',        icon: '🏥', color: '#f43f5e' },
  { name: 'Entertainment', icon: '🎭', color: '#ec4899' },
  { name: 'Education',     icon: '🎓', color: '#10b981' },
  { name: 'Other',         icon: '📌', color: '#6b7280' },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.name, c]))
