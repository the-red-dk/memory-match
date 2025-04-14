"use client"
import { Card } from "@/components/ui/card"
import { Timer } from "@/components/timer"

interface GameStatsProps {
  score: number
  moves: number
  startTime: number | null
  endTime: number | null
  level: number
}

export function GameStats({ score, moves, startTime, endTime, level }: GameStatsProps) {
  return (
    <Card className="flex items-center justify-center gap-6 p-3 border-blue-200 bg-white/80">
      <div className="text-center">
        <p className="text-sm text-gray-500">Level</p>
        <p className="text-xl font-bold text-blue-700">{level}</p>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">Score</p>
        <p className="text-xl font-bold text-blue-700">{score}</p>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">Moves</p>
        <p className="text-xl font-bold text-blue-700">{moves}</p>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">Time</p>
        <div className="text-xl font-bold text-blue-700">
          <Timer startTime={startTime} endTime={endTime} />
        </div>
      </div>
    </Card>
  )
}
