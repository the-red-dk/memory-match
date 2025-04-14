"use client"

import { useState, useEffect } from "react"
import { MemoryCard } from "@/components/memory-card"
import confetti from "canvas-confetti"
import { WinModal } from "@/components/win-modal"

interface GameBoardProps {
  level: number
  onMove: () => void
  onPairMatched: () => void
  onLevelComplete: () => void
  onGameWin: () => void
  gameCompleted: boolean
}

// Define grid dimensions for each level
const levelGrids = {
  1: { rows: 2, cols: 4, pairs: 4 }, // Level 1: 8 cards (4 pairs)
  2: { rows: 3, cols: 4, pairs: 6 }, // Level 2: 12 cards (6 pairs)
  3: { rows: 4, cols: 4, pairs: 8 }, // Level 3: 16 cards (8 pairs)
  4: { rows: 4, cols: 5, pairs: 10 }, // Level 4: 20 cards (10 pairs)
  5: { rows: 4, cols: 6, pairs: 12 }, // Level 5: 24 cards (12 pairs)
}

// Card interface
interface CardType {
  id: number
  value: number
  flipped: boolean
  matched: boolean
}

export function GameBoard({ level, onMove, onPairMatched, onLevelComplete, onGameWin, gameCompleted }: GameBoardProps) {
  const [playerName, setPlayerName] = useState<string>("")
  const [nameEntered, setNameEntered] = useState<boolean>(false)
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [levelCompleteMessage, setLevelCompleteMessage] = useState<string | null>(null)
  const [showWinModal, setShowWinModal] = useState<boolean>(false)

  const { rows, cols, pairs } = levelGrids[level as keyof typeof levelGrids]

  // Initialize the game board when level changes
  useEffect(() => {
    if (nameEntered) {
      initializeCards()
      setLevelCompleteMessage(null)
    }
  }, [level, nameEntered])

  // Check for level completion
  useEffect(() => {
    if (matchedPairs === pairs && matchedPairs > 0 && !gameCompleted) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
      })

      if (level < 5) {
        setLevelCompleteMessage(`Level ${level} Complete! Advancing to Level ${level + 1}...`)
        const timer = setTimeout(() => {
          setLevelCompleteMessage(null)
          onLevelComplete()
        }, 2000)
        return () => clearTimeout(timer)
      } else {
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
        })
        setShowWinModal(true) // Show the WinModal at the end
        onGameWin()
      }
    }
  }, [matchedPairs, pairs, level, onLevelComplete, onGameWin, gameCompleted])

  // Initialize cards for the game
  const initializeCards = () => {
    let cardValues = []
    for (let i = 1; i <= pairs; i++) {
      cardValues.push(i, i)
    }
    cardValues = shuffleArray(cardValues)
    const newCards = cardValues.map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false,
    }))
    setCards(newCards)
    setFlippedCards([])
    setMatchedPairs(0)
  }

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: number[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Handle card click
  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length >= 2 || levelCompleteMessage) return

    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    const updatedCards = cards.map((card) => (card.id === id ? { ...card, flipped: true } : card))
    setCards(updatedCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      onMove()
      const [firstId, secondId] = newFlippedCards
      const firstCard = updatedCards.find((card) => card.id === firstId)
      const secondCard = updatedCards.find((card) => card.id === secondId)

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        setCards(
          updatedCards.map((card) => (card.id === firstId || card.id === secondId ? { ...card, matched: true } : card)),
        )
        setMatchedPairs(matchedPairs + 1)
        setFlippedCards([])
        onPairMatched()
      } else {
        setIsChecking(true)
        setTimeout(() => {
          setCards(updatedCards.map((card) => (newFlippedCards.includes(card.id) ? { ...card, flipped: false } : card)))
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  // Ask for the player's name before starting the game
  if (!nameEntered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Enter Your Name</h1>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Your Name"
          className="border border-gray-300 rounded-md p-2 w-64 mb-4"
        />
        <button
          onClick={() => setNameEntered(true)}
          disabled={!playerName.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Start Game
        </button>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {levelCompleteMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-xl font-bold text-center animate-pulse">
          {levelCompleteMessage}
        </div>
      )}

      <div
        className="grid gap-4"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          width: "100%",
          maxWidth: "800px",
          height: "auto",
        }}
      >
        {cards.map((card) => (
          <MemoryCard key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
        ))}
      </div>

      {showWinModal && (
        <WinModal
          score={matchedPairs} // Pass the matched pairs as the score
          moves={flippedCards.length} // Pass the number of moves
          playerName={playerName} // Pass the player's name
          onClose={() => setShowWinModal(false)} // Close the modal when triggered
        />
      )}
    </div>
  )
}
