"use client"

import { Button } from "@/components/ui/button"

interface LevelSelectorProps {
  onSelect: (level: number) => void
  selectedLevel: number | null
}

export function LevelSelector({ onSelect, selectedLevel }: LevelSelectorProps) {
  const levels = [
    {
      level: 1,
      name: "Beginner",
      description: "4×2 grid (8 cards)", // Level 1
      color: "bg-green-100 border-green-300 text-green-800",
    },
    {
      level: 2,
      name: "Easy",
      description: "3×4 grid (12 cards)", // Level 2
      color: "bg-blue-100 border-blue-300 text-blue-800",
    },
    {
      level: 3,
      name: "Medium",
      description: "4×4 grid (16 cards)", // Level 3
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
    {
      level: 4,
      name: "Hard",
      description: "4×5 grid (20 cards)", // Level 4
      color: "bg-orange-100 border-orange-300 text-orange-800",
    },
    {
      level: 5,
      name: "Expert",
      description: "4×6 grid (24 cards)", // Level 5
      color: "bg-red-100 border-red-300 text-red-800",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {levels.map((level) => (
        <Button
          key={level.level}
          variant="outline"
          className={`h-auto p-4 flex flex-col items-start border-2 ${
            selectedLevel === level.level ? `${level.color} ring-2 ring-offset-2 ring-blue-500` : "hover:bg-gray-50"
          }`}
          onClick={() => onSelect(level.level)}
        >
          <span className="text-lg font-bold">{level.name}</span>
          <span className="text-sm text-gray-600">{level.description}</span>
        </Button>
      ))}
    </div>
  )
}
