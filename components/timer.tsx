"use client"

import { useEffect, useState } from "react"

interface TimerProps {
  startTime: number | null
  endTime: number | null
}

export function Timer({ startTime, endTime }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!startTime) return

    // If the game is over, calculate the final time
    if (endTime) {
      setElapsedTime(Math.floor((endTime - startTime) / 1000))
      return
    }

    // Otherwise, update the timer every second
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, endTime])

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return <span>{formatTime(elapsedTime)}</span>
}
