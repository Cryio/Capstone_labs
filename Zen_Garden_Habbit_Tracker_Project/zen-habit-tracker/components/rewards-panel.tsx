"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Sparkles, Check } from "lucide-react"

type Theme = {
  id: string
  name: string
  description: string
  cost: number
  unlocked: boolean
  active: boolean
  preview: string
}

export function RewardsPanel() {
  const [points, setPoints] = useState(450)
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: "1",
      name: "Spring Garden",
      description: "A bright and colorful garden with cherry blossoms",
      cost: 0,
      unlocked: true,
      active: true,
      preview: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "2",
      name: "Zen Rock Garden",
      description: "A peaceful rock garden with sand patterns",
      cost: 300,
      unlocked: true,
      active: false,
      preview: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "3",
      name: "Night Garden",
      description: "A serene garden under the moonlight",
      cost: 600,
      unlocked: false,
      active: false,
      preview: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "4",
      name: "Autumn Forest",
      description: "A garden with beautiful fall colors",
      cost: 800,
      unlocked: false,
      active: false,
      preview: "/placeholder.svg?height=100&width=200",
    },
  ])

  const unlockTheme = (id: string) => {
    const theme = themes.find((t) => t.id === id)
    if (!theme || theme.unlocked || points < theme.cost) return

    setPoints(points - theme.cost)
    setThemes(themes.map((t) => (t.id === id ? { ...t, unlocked: true } : t)))
  }

  const activateTheme = (id: string) => {
    setThemes(
      themes.map((t) => ({
        ...t,
        active: t.id === id,
      })),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rewards</h2>
        <Badge variant="outline" className="px-3 py-1">
          <Sparkles className="mr-1 h-3 w-3" />
          {points} points
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme) => (
          <Card key={theme.id} className={theme.active ? "border-primary" : ""}>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">{theme.name}</CardTitle>
              <CardDescription className="text-xs">{theme.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="aspect-video rounded-md overflow-hidden">
                <img
                  src={theme.preview || "/placeholder.svg"}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              {!theme.unlocked ? (
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={points < theme.cost}
                  onClick={() => unlockTheme(theme.id)}
                  type="button"
                >
                  <Lock className="mr-2 h-3 w-3" />
                  Unlock ({theme.cost} points)
                </Button>
              ) : theme.active ? (
                <Button className="w-full" variant="default" disabled type="button">
                  <Check className="mr-2 h-3 w-3" />
                  Active
                </Button>
              ) : (
                <Button className="w-full" variant="outline" onClick={() => activateTheme(theme.id)} type="button">
                  Activate
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

