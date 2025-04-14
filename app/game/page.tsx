"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CSELogo } from "@/components/cse-logo"
import { GameBoard } from "@/components/game-board"
import { GameStats } from "@/components/game-stats"
import { WinModal } from "@/components/win-modal"

export default function GamePage() {
  const router = useRouter()
  const [currentLevel, setCurrentLevel] = useState(1) // Default to Level 1
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [showWinModal, setShowWinModal] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  // Start the game automatically when the component mounts
  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const levelParam = queryParams.get("level")
    if (levelParam) {
      const level = parseInt(levelParam, 10)
      if (level >= 1 && level <= 5) {
        setCurrentLevel(level) // Set the level based on the query parameter
      }
    }
  }, [])

  const startGame = () => {
    setCurrentLevel(1)
    setScore(0)
    setMoves(0)
    setStartTime(Date.now())
    setEndTime(null)
    setGameCompleted(false)
  }

  const handleMove = () => {
    setMoves(moves + 1)
  }

  const handlePairMatched = () => {
    // Increment score by 1 for each matched pair
    setScore(score + 1)
  }

  const handleLevelComplete = () => {
    if (currentLevel < 5) {
      // Advance to the next level
      setCurrentLevel(currentLevel + 1)
    } else {
      // Game completed - all levels finished
      handleGameWin()
    }
  }

  const handleGameWin = () => {
    const endTimeValue = Date.now()
    setEndTime(endTimeValue)
    setGameCompleted(true)
    setShowWinModal(true)
  }

  const handleSubmitScore = async (nickname: string) => {
    if (!startTime || !endTime) return

    const timeTaken = Math.floor((endTime - startTime) / 1000)

    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          score,
          moves,
          time: timeTaken,
          level: currentLevel,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        router.push("/leaderboard")
      } else {
        console.error("Failed to submit score")
      }
    } catch (error) {
      console.error("Error submitting score:", error)
    }
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center p-6">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <div className="flex items-center">
              <CSELogo className="w-12 h-12 mr-2" />
              <h1 className="text-2xl font-bold text-blue-800">Memory Match</h1>
            </div>
          </Link>

          <GameStats score={score} moves={moves} startTime={startTime} endTime={endTime} level={currentLevel} />

          <Button variant="outline" onClick={handleBackToHome} className="border-blue-300">
            Back to Home
          </Button>
        </div>

        <div className="py-6">
          <GameBoard
            level={currentLevel}
            onMove={handleMove}
            onPairMatched={handlePairMatched}
            onLevelComplete={handleLevelComplete}
            onGameWin={handleGameWin}
            gameCompleted={gameCompleted}
          />
        </div>
      </div>

      {showWinModal && (
        <WinModal
          score={score}
          moves={moves}
          time={endTime && startTime ? Math.floor((endTime - startTime) / 1000) : 0}
          onSubmit={handleSubmitScore}
          onClose={() => setShowWinModal(false)}
        />
      )}
    </main>
  )
}
