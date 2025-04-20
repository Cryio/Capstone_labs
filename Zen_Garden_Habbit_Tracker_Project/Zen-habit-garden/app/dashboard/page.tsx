"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Home, Leaf, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { HabitForm } from "@/components/habit-form"
import { HabitList } from "@/components/habit-list"
import { useHabits } from "@/lib/hooks/use-habits"

/**
 * Dashboard Page Component
 *
 * This component represents the main dashboard of the HabitGarden application.
 * It displays habit statistics, allows habit management, and provides navigation to other sections.
 *
 * Future Additions:
 * - Implement habit categories
 * - Add drag-and-drop functionality for habit reordering
 * - Include habit sharing feature
 */

export default function DashboardPage() {
  const [showForm, setShowForm] = useState(false)
  const { habits, addHabit, completeHabit, deleteHabit, resetTodayHabits } = useHabits()
  const { toast } = useToast()
  const router = useRouter()

  const completedToday = habits.filter((habit) => habit.completedToday).length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  // Effect to reset habits daily
  useEffect(() => {
    // Check if we need to reset habits for a new day
    const lastResetDate = localStorage.getItem("lastResetDate")
    const today = new Date().toDateString()

    if (lastResetDate !== today) {
      resetTodayHabits()
      localStorage.setItem("lastResetDate", today)
    }
  }, [resetTodayHabits])

  // Handler for viewing the garden
  const handleViewGarden = () => {
    router.push("/garden")
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar navigation */}
      <aside className="hidden w-14 flex-col border-r bg-background p-3 md:flex lg:w-64">
        <div className="flex h-14 items-center justify-center lg:justify-start">
          <Link className="flex items-center justify-center lg:justify-start gap-2" href="/">
            <Leaf className="h-6 w-6" />
            <span className="hidden font-bold lg:inline-block">HabitGarden</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-1 pt-8">
          <Button variant="ghost" className="justify-start" asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-5 w-5" />
              <span className="hidden lg:inline-block">Dashboard</span>
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link href="/garden">
              <Leaf className="mr-2 h-5 w-5" />
              <span className="hidden lg:inline-block">Garden</span>
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-5 w-5" />
              <span className="hidden lg:inline-block">Settings</span>
            </Link>
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="justify-start w-full">
            <LogOut className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline-block">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Link className="lg:hidden" href="/">
            <Leaf className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <Button onClick={handleViewGarden} className="hidden sm:flex">
            View Garden
          </Button>
        </header>

        {/* Main dashboard content */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {/* Habit statistics cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Habits</CardTitle>
                <CardDescription>Your active habits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalHabits}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completed Today</CardTitle>
                <CardDescription>Habits completed today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedToday}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completion Rate</CardTitle>
                <CardDescription>Today's progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">{completionRate}%</div>
                <Progress value={completionRate} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Garden Status</CardTitle>
                <CardDescription>Your garden's health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completionRate >= 80 ? "Thriving" : completionRate >= 50 ? "Growing" : "Needs Care"}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={handleViewGarden}>
                  View Garden
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Habit management section */}
          <Tabs defaultValue="today">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="all">All Habits</TabsTrigger>
              </TabsList>
              <Button onClick={() => setShowForm(!showForm)} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Habit
              </Button>
            </div>
            {showForm && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Add New Habit</CardTitle>
                </CardHeader>
                <CardContent>
                  <HabitForm
                    onSubmit={(habit) => {
                      addHabit(habit)
                      setShowForm(false)
                      toast({
                        title: "Habit created",
                        description: `${habit.name} has been added to your habits.`,
                      })
                    }}
                    onCancel={() => setShowForm(false)}
                  />
                </CardContent>
              </Card>
            )}
            <TabsContent value="today" className="mt-4">
              <HabitList habits={habits} onComplete={completeHabit} onDelete={deleteHabit} showOnlyToday={true} />
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <HabitList habits={habits} onComplete={completeHabit} onDelete={deleteHabit} showOnlyToday={false} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

