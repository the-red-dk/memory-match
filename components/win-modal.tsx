"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Trophy } from "lucide-react"

interface WinModalProps {
  score: number
  moves: number
  time: number
  playerName: string
  onClose: () => void
}

export function WinModal({ score, moves, time, playerName, onClose }: WinModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-2">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <span className="text-2xl">Congratulations, {playerName}!</span>
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
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
