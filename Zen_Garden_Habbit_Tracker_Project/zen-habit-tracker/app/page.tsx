import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, CheckCircle, Clock, Flower, LineChart, Plus, Sparkles } from "lucide-react"
import { FlowerIcon as Garden } from "lucide-react"
import { HabitList } from "@/components/habit-list"
import { ZenGarden } from "@/components/zen-garden"
import { FocusTimer } from "@/components/focus-timer"
import { ChatbotDialog } from "@/components/chatbot-dialog"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Garden className="h-6 w-6" />
          <span>Zen AI Habit Tracker</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <ChatbotDialog />
          <Button variant="outline" size="sm" type="button">
            <Sparkles className="mr-2 h-4 w-4" />
            Rewards
          </Button>
          <Button size="sm" type="button">
            <Plus className="mr-2 h-4 w-4" />
            New Habit
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Habits</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flower className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">Best: 14 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.5 hours</div>
              <p className="text-xs text-muted-foreground">+1.2 hours from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">450</div>
              <p className="text-xs text-muted-foreground">150 until next theme</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="garden" className="space-y-4">
          <TabsList>
            <TabsTrigger value="garden" className="flex items-center gap-2">
              <Garden className="h-4 w-4" />
              Zen Garden
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Habits
            </TabsTrigger>
            <TabsTrigger value="focus" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Focus Mode
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="garden" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Zen Garden</CardTitle>
                <CardDescription>
                  Watch your garden grow as you maintain your habits. Each flower represents a habit, and its growth
                  reflects your consistency.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] w-full">
                  <ZenGarden />
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" type="button">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Land Patch
                  </Button>
                  <Button variant="outline" size="sm" type="button">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Change Theme
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="habits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Habits</CardTitle>
                <CardDescription>Track and manage your daily, weekly, and monthly habits.</CardDescription>
              </CardHeader>
              <CardContent>
                <HabitList />
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button type="button">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Habit
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="focus" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Focus Mode</CardTitle>
                <CardDescription>Use the Pomodoro timer to stay focused and grow your garden.</CardDescription>
              </CardHeader>
              <CardContent>
                <FocusTimer />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Habit Analytics</CardTitle>
                <CardDescription>View your progress, streaks, and completion rates.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Completion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                        Completion Rate Chart
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Habit Heatmap</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                        Habit Heatmap
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" type="button">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  View Full Analytics
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

