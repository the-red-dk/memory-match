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
  onSubmit: (nickname: string) => void
  onClose: () => void
}

export function WinModal({ score, moves, time, onSubmit, onClose }: WinModalProps) {
  const [nickname, setNickname] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!nickname.trim()) return

    setIsSubmitting(true)
    onSubmit(nickname.trim())
  }

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-2">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <span className="text-2xl">Congratulations!</span>
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
              <p className="text-xl font-bold text-blue-700">{formatTime(time)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Enter your nickname for the leaderboard:</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your nickname"
              maxLength={15}
              className="border-blue-200"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!nickname.trim() || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
