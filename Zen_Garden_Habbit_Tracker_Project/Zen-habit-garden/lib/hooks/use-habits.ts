"use client"

import { useState, useEffect, useCallback } from "react"
import type { Habit } from "@/lib/types"

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([])

  // Load habits from localStorage on initial render
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits")
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits))
    }
  }, [])

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])

  const addHabit = useCallback((habit: Habit) => {
    setHabits((prev) => [...prev, habit])
  }, [])

  const updateHabit = useCallback((updatedHabit: Habit) => {
    setHabits((prev) => prev.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit)))
  }, [])

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }, [])

  const completeHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const today = new Date().toISOString().split("T")[0]
          const wasCompletedToday = habit.completedToday

          // Toggle completion status
          const newCompletedToday = !wasCompletedToday

          // Update streak and history only if marking as complete
          let newStreak = habit.streak
          let newHistory = [...habit.completionHistory]

          if (newCompletedToday) {
            newStreak += 1
            newHistory.push(today)
          } else {
            // If uncompleting, reduce streak and remove from history
            newStreak = Math.max(0, newStreak - 1)
            newHistory = newHistory.filter((date) => date !== today)
          }

          return {
            ...habit,
            completedToday: newCompletedToday,
            streak: newStreak,
            completionHistory: newHistory,
          }
        }
        return habit
      }),
    )
  }, [])

  const resetTodayHabits = useCallback(() => {
    setHabits((prev) =>
      prev.map((habit) => ({
        ...habit,
        completedToday: false,
      })),
    )
  }, [])

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
    resetTodayHabits,
  }
}

