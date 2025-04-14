"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CSELogo } from "@/components/cse-logo"
import { Trophy, Medal, Clock, MousePointer, ArrowLeft, RefreshCw } from "lucide-react"

interface ScoreEntry {
  id: string
  nickname: string
  score: number
  moves: number
  time: number
  level: number
  timestamp: string
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchScores = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/scores")

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data")
      }

      const data = await response.json()

      // Filter out scores for Level 6
      const filteredScores = data.filter((score: ScoreEntry) => score.level <= 5)

      setScores(filteredScores)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError("Failed to load leaderboard. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScores()

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchScores()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 border-blue-300">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center">
            <CSELogo className="w-12 h-12 mr-2" />
            <h1 className="text-2xl font-bold text-blue-800">Memory Match</h1>
          </div>

          <Button
            variant="outline"
            onClick={fetchScores}
            className="flex items-center gap-2 border-blue-300"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Leaderboard
            </CardTitle>
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
                <span className="text-xs ml-1">(Auto-refreshes every 10 seconds)</span>
              </p>
            )}
          </CardHeader>
          <CardContent>
            {loading && scores.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading leaderboard...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : scores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No scores yet. Be the first to play!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-blue-100">
                      <th className="px-4 py-3 text-left">Rank</th>
                      <th className="px-4 py-3 text-left">Player</th>
                      <th className="px-4 py-3 text-center">Level</th>
                      <th className="px-4 py-3 text-center">Score</th>
                      <th className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Time
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center">
                          <MousePointer className="h-4 w-4 mr-1" />
                          Moves
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <tr
                        key={score.id}
                        className={`border-b border-blue-50 ${
                          index < 3 ? "bg-blue-50" : ""
                        } hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mr-1" />}
                            {index === 1 && <Medal className="h-5 w-5 text-gray-400 mr-1" />}
                            {index === 2 && <Medal className="h-5 w-5 text-amber-600 mr-1" />}
                            {index > 2 && <span className="font-medium">{index + 1}</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">{score.nickname}</td>
                        <td className="px-4 py-3 text-center">{score.level}</td>
                        <td className="px-4 py-3 text-center font-bold">{score.score}</td>
                        <td className="px-4 py-3 text-center">{formatTime(score.time)}</td>
                        <td className="px-4 py-3 text-center">{score.moves}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
