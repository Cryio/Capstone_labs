"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { ZenGarden } from "@/components/zen-garden"

export function FocusTimer() {
  const [duration, setDuration] = useState(25) // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60) // seconds
  const [isActive, setIsActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/assets/meditation-sound.mp3")
      if (audioRef.current) {
        audioRef.current.loop = true
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Play completion sound
      if (typeof window !== "undefined") {
        const completionSound = new Audio("/assets/completion-sound.mp3")
        completionSound.play().catch((e) => console.error("Audio play failed:", e))
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  useEffect(() => {
    if (audioRef.current) {
      if (isActive && !isMuted) {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isActive, isMuted])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(duration * 60)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">{formatTime(timeLeft)}</h2>
          <p className="text-sm text-muted-foreground">Focus on your task</p>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" onClick={resetTimer} type="button">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="lg" onClick={toggleTimer} type="button">
            {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleMute} type="button">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Timer Duration</span>
            <span className="text-sm font-medium">{duration} minutes</span>
          </div>
          <Slider
            value={[duration]}
            min={5}
            max={60}
            step={5}
            onValueChange={(value) => setDuration(value[0])}
            disabled={isActive}
          />
        </div>
      </div>

      <div className="h-[300px] rounded-lg overflow-hidden border">
        <ZenGarden />
      </div>
    </div>
  )
}

