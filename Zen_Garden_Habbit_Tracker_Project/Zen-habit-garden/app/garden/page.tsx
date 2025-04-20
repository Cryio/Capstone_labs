"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Leaf, Settings, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHabits } from "@/lib/hooks/use-habits"
import { GardenScene } from "@/components/garden-scene"

/**
 * Garden Page Component
 *
 * This component represents the virtual garden visualization of the user's habits.
 * It displays the overall garden status, habit progress, and a 3D garden scene.
 *
 * Future Additions:
 * - Implement interactive elements in the 3D garden
 * - Add garden customization options
 * - Include time-based garden effects (day/night cycle)
 */

// Import statements...

export default function GardenPage() {
  // State and hooks...
  const { habits } = useHabits()
  const [activeTab, setActiveTab] = useState("3d")

  // Calculate garden statistics
  const completedHabits = habits.filter((habit) => habit.completedToday).length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0

  // Determine garden status based on completion rate
  const gardenStatus =
    completionRate >= 80 ? "Thriving" : completionRate >= 50 ? "Growing" : completionRate > 0 ? "Needs Care" : "Barren"

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
            <h1 className="text-lg font-semibold">Your Garden</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </header>

        {/* Main garden content */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {/* Garden statistics cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Garden Status</CardTitle>
                <CardDescription>Overall health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{gardenStatus}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Flowers Blooming</CardTitle>
                <CardDescription>Completed habits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedHabits} / {totalHabits}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Garden Age</CardTitle>
                <CardDescription>Days since creation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {habits.length > 0
                    ? Math.floor((Date.now() - new Date(habits[0].createdAt).getTime()) / (1000 * 60 * 60 * 24))
                    : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Garden visualization and stats tabs */}
          <Tabs defaultValue="3d" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="3d">3D Garden</TabsTrigger>
              <TabsTrigger value="stats">Garden Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="3d" className="mt-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-[600px] w-full">
                    <GardenScene habits={habits} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stats" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Garden Statistics</CardTitle>
                  <CardDescription>Detailed information about your habit garden</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {habits.length > 0 ? (
                      <>
                        <div className="grid gap-4 md:grid-cols-2">
                          {habits.map((habit) => (
                            <div key={habit.id} className="flex items-center gap-4 p-4 border rounded-lg">
                              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: habit.color }} />
                              <div className="flex-1">
                                <h3 className="font-medium">{habit.name}</h3>
                                <p className="text-sm text-muted-foreground">Streak: {habit.streak} days</p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{habit.completedToday ? "Blooming" : "Waiting"}</div>
                                <p className="text-sm text-muted-foreground">
                                  {habit.completionHistory.length} total completions
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          You haven't created any habits yet. Go to the Dashboard to get started.
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

