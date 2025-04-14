"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy } from "lucide-react"

interface WinModalProps {
  score: number
  moves: number
  time: number
  playerName: string // Add playerName as a prop
  onSubmit: () => void
  onClose: () => void
}

export function WinModal({ score, moves, time, playerName, onSubmit, onClose }: WinModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await onSubmit()
    setIsSubmitting(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-2">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <span className="text-2xl">Congratulations, {playerName}!</span> {/* Use the player's name */}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
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
              <p className="text-xl font-bold text-blue-700">{time}s</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Score"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
