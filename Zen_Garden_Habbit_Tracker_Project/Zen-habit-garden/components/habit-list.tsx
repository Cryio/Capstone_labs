"use client"

import { Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Habit } from "@/lib/types"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

/**
 * Habit List Component
 *
 * This component displays a list of habits and provides functionality to complete or delete them.
 * It also shows habit streaks and completion status.
 *
 * Future Additions:
 * - Implement habit sorting (by name, streak, completion rate)
 * - Add habit filtering by category
 * - Include habit progress visualization
 */

interface HabitListProps {
  habits: Habit[]
  onComplete: (id: string) => void
  onDelete: (id: string) => void
  showOnlyToday?: boolean
}

export function HabitList({ habits, onComplete, onDelete, showOnlyToday = false }: HabitListProps) {
  // Filter habits based on showOnlyToday prop
  const filteredHabits = showOnlyToday ? habits.filter((habit) => !habit.completedToday) : habits

  // Display message if no habits are available
  if (filteredHabits.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            {showOnlyToday
              ? "Great job! You've completed all your habits for today."
              : "You haven't created any habits yet. Click 'Add Habit' to get started."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredHabits.map((habit) => (
        <Card key={habit.id} className={cn("transition-all", habit.completedToday && "bg-muted/50")}>
          {/* Habit header with name and streak */}
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {habit.name}
                  {habit.streak > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {habit.streak} day streak
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{habit.description}</CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: habit.color }} />
              </div>
            </div>
          </CardHeader>

          {/* Habit description and frequency */}
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Frequency: {habit.frequency === "daily" ? "Every day" : "Every week"}
            </div>
          </CardContent>

          {/* Habit actions (delete and complete) */}
          <CardFooter className="flex justify-between">
            {/* Delete habit confirmation dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the habit and its history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(habit.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Complete habit button */}
            <Button
              variant={habit.completedToday ? "outline" : "default"}
              className={cn(
                "gap-2",
                habit.completedToday && "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900",
              )}
              onClick={() => onComplete(habit.id)}
              disabled={showOnlyToday ? false : habit.completedToday}
            >
              {habit.completedToday ? (
                <>
                  <Check className="h-4 w-4" />
                  Completed
                </>
              ) : (
                "Mark Complete"
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

