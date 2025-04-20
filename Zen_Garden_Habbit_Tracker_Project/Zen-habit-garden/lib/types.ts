export interface Habit {
  id: string
  name: string
  description: string
  frequency: "daily" | "weekly"
  color: string
  createdAt: string
  completedToday: boolean
  streak: number
  completionHistory: string[] // Array of ISO date strings
}

