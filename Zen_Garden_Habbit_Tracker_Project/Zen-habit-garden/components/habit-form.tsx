"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Habit } from "@/lib/types"

/**
 * Habit Form Component
 *
 * This component provides a form for creating or editing habits.
 * It allows users to set habit name, description, frequency, and color.
 *
 * Future Additions:
 * - Add habit categories
 * - Implement custom recurrence patterns
 * - Include habit icon selection
 */

interface HabitFormProps {
  onSubmit: (habit: Habit) => void
  onCancel: () => void
  initialData?: Partial<Habit>
}

export function HabitForm({ onSubmit, onCancel, initialData }: HabitFormProps) {
  // State management for form data
  const [formData, setFormData] = useState<Partial<Habit>>({
    name: "",
    description: "",
    frequency: "daily",
    color: "green",
    ...initialData,
  })

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name) return

    const newHabit: Habit = {
      id: initialData?.id || Date.now().toString(),
      name: formData.name!,
      description: formData.description || "",
      frequency: formData.frequency as "daily" | "weekly",
      color: formData.color as string,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      completedToday: initialData?.completedToday || false,
      streak: initialData?.streak || 0,
      completionHistory: initialData?.completionHistory || [],
    }

    onSubmit(newHabit)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Habit name input */}
      <div className="space-y-2">
        <Label htmlFor="name">Habit Name</Label>
        <Input
          id="name"
          placeholder="e.g., Drink Water"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      {/* Habit description input */}
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Add details about your habit"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* Habit frequency and color selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Flower Color</Label>
          <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
            <SelectTrigger id="color">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="pink">Pink</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Form submission and cancellation buttons */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Habit</Button>
      </div>
    </form>
  )
}

