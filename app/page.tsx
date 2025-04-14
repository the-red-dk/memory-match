import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CSELogo } from "@/components/cse-logo"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center text-center">
          <CSELogo className="w-32 h-32 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-2">Memory Match Challenge</h1>
          <h2 className="text-xl md:text-2xl font-medium text-purple-700 mb-6">
            Cambridge Institute of Technology - CSE Department
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Test your memory with our fun card matching game! Match pairs of cards as quickly as possible with as few
            moves as you can. Start with Level 1 and progress through increasingly challenging levels: till Level 5!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <Card className="border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-700">Play Game</CardTitle>
              <CardDescription>Start a new memory match game</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Start at Level 1 and progress through all 5 levels. Match all the pairs to win!
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/game" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Game</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-2 border-purple-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-700">Leaderboard</CardTitle>
              <CardDescription>See the top players</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Check out the top 10 players who completed the game with the highest scores.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/leaderboard" className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">View Leaderboard</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
          {[1, 2, 3, 4, 5].map((level) => (
            <Link key={level} href={`/game?level=${level}`} className="w-full">
              <Button className="w-full bg-gray-600 hover:bg-gray-700">
                Go to Level {level}
              </Button>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Cambridge Institute of Technology - CSE Department</p>
        </div>
      </div>
    </main>
  )
}
