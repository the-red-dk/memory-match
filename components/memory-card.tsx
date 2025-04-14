"use client"

import { motion } from "framer-motion"
import { CSELogo } from "@/components/cse-logo"

interface CardType {
  id: number
  value: number
  flipped: boolean
  matched: boolean
}

interface MemoryCardProps {
  card: CardType
  onClick: () => void
}

// Array of emoji objects with emoji and color
const cardEmojis = [
  { emoji: "🎵", color: "text-purple-600" },
  { emoji: "🎉", color: "text-blue-500" },
  { emoji: "☀️", color: "text-yellow-500" },
  { emoji: "🎁", color: "text-red-500" },
  { emoji: "🍦", color: "text-amber-400" },
  { emoji: "🎈", color: "text-red-500" },
  { emoji: "⚽", color: "text-gray-800" },
  { emoji: "🚀", color: "text-blue-600" },
  { emoji: "🌈", color: "text-purple-500" },
  { emoji: "🌟", color: "text-yellow-500" },
  { emoji: "🍕", color: "text-orange-500" },
  { emoji: "🎮", color: "text-indigo-600" },
  { emoji: "📱", color: "text-gray-700" },
  { emoji: "💻", color: "text-gray-800" },
  { emoji: "🎓", color: "text-black" },
  { emoji: "📚", color: "text-blue-800" },
  { emoji: "🔍", color: "text-blue-500" },
  { emoji: "💡", color: "text-yellow-400" },
  { emoji: "🎨", color: "text-pink-500" },
  { emoji: "🎸", color: "text-brown-500" },
  { emoji: "🏆", color: "text-yellow-600" },
  { emoji: "⏰", color: "text-red-600" },
  { emoji: "🧩", color: "text-green-500" },
  { emoji: "🎭", color: "text-purple-700" },
]

export function MemoryCard({ card, onClick }: MemoryCardProps) {
  // Get the emoji based on the card value
  const cardEmoji = cardEmojis[(card.value - 1) % cardEmojis.length]

  return (
    <div className="aspect-square perspective-1000 cursor-pointer" onClick={onClick}>
      <motion.div
        className="relative w-full h-full transition-transform transform-style-3d"
        initial={false}
        animate={{ rotateY: card.flipped ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }} // Reduced duration to 0.2 seconds
      >
        {/* Card Back (shown when not flipped) */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl flex items-center justify-center shadow-md border-2 border-gray-200">
          <div className="w-3/4 h-3/4 flex items-center justify-center">
            <CSELogo className="w-full h-full text-blue-600 opacity-30" />
          </div>
        </div>

        {/* Card Front (shown when flipped) */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl flex items-center justify-center rotate-y-180 shadow-md border-2 border-gray-100">
          <span className="text-4xl md:text-5xl">{cardEmoji.emoji}</span>
        </div>
      </motion.div>
    </div>
  )
}
