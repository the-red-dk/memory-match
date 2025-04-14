import { useState } from "react"

interface LeaderboardEntry {
  name: string
  score: number
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  const addScore = (name: string, score: number) => {
    const updatedLeaderboard = [...leaderboard, { name, score }]
    updatedLeaderboard.sort((a, b) => b.score - a.score) // Sort by score in descending order
    setLeaderboard(updatedLeaderboard)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index} className="flex justify-between">
            <span>{index + 1}. {entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}