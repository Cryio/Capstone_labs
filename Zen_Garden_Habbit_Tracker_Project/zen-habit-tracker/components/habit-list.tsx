"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Habit = {
  id: string
  name: string
  frequency: "daily" | "weekly" | "monthly"
  streak: number
  completed: boolean
}

export function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Meditate for 10 minutes",
      frequency: "daily",
      streak: 7,
      completed: false,
    },
    {
      id: "2",
      name: "Read for 30 minutes",
      frequency: "daily",
      streak: 5,
      completed: true,
    },
    {
      id: "3",
      name: "Exercise for 30 minutes",
      frequency: "daily",
      streak: 3,
      completed: false,
    },
    {
      id: "4",
      name: "Write in journal",
      frequency: "daily",
      streak: 10,
      completed: true,
    },
    {
      id: "5",
      name: "Practice gratitude",
      frequency: "daily",
      streak: 14,
      completed: false,
    },
  ])

  const [newHabit, setNewHabit] = useState({
    name: "",
    frequency: "daily" as const,
  })

  const toggleHabit = (id: string) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)))
  }

  const addHabit = () => {
    if (newHabit.name.trim() === "") return

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      frequency: newHabit.frequency,
      streak: 0,
      completed: false,
    }

    setHabits([...habits, habit])
    setNewHabit({ name: "", frequency: "daily" })
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  const startSpeechRecognition = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setNewHabit({ ...newHabit, name: transcript })
      }

      recognition.start()
    } else {
      alert("Speech recognition is not supported in your browser.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add a new habit..."
          value={newHabit.name}
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
        />
        <Button variant="outline" onClick={startSpeechRecognition} type="button">
          <Mic className="h-4 w-4" />
        </Button>
        <Select
          value={newHabit.frequency}
          onValueChange={(value) => setNewHabit({ ...newHabit, frequency: value as "daily" | "weekly" | "monthly" })}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addHabit} type="button">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={`habit-${habit.id}`}
                checked={habit.completed}
                onCheckedChange={() => toggleHabit(habit.id)}
              />
              <div>
                <Label
                  htmlFor={`habit-${habit.id}`}
                  className={`font-medium ${habit.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {habit.name}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {habit.frequency} · streak: {habit.streak} days
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)} type="button">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

