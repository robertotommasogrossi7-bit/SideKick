const STORAGE_KEY = 'financeTrackerData'
const THEME_KEY = 'financeTrackerTheme'

export const loadTransactions = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

export const loadTheme = () => localStorage.getItem(THEME_KEY) || 'dark'

export const saveTheme = (theme) => localStorage.setItem(THEME_KEY, theme)
