import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the data file path
const DATA_FILE_PATH = path.join(process.cwd(), "data", "scores.json")

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read scores from the JSON file
const readScores = () => {
  ensureDataDirectoryExists()

  if (!fs.existsSync(DATA_FILE_PATH)) {
    // If file doesn't exist, create it with empty array
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([]))
    return []
  }

  const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8")
  try {
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Error parsing scores file:", error)
    return []
  }
}

// Write scores to the JSON file
const writeScores = (scores: any[]) => {
  ensureDataDirectoryExists()
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(scores, null, 2))
}

// GET handler to retrieve scores
export async function GET() {
  try {
    const scores = readScores()

    // Sort by score (highest first)
    const sortedScores = scores.sort((a: any, b: any) => b.score - a.score)

    // Return only top 10
    return NextResponse.json(sortedScores.slice(0, 10))
  } catch (error) {
    console.error("Error retrieving scores:", error)
    return NextResponse.json({ error: "Failed to retrieve scores" }, { status: 500 })
  }
}

// POST handler to add a new score
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { nickname, score, moves, time, level } = body

    if (!nickname || score === undefined || moves === undefined || time === undefined || level === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Sanitize nickname (remove HTML tags, limit length)
    const sanitizedNickname = nickname
      .replace(/<[^>]*>/g, "")
      .trim()
      .substring(0, 15)

    // Create new score entry
    const newScore = {
      id: uuidv4(),
      nickname: sanitizedNickname,
      score: Number(score),
      moves: Number(moves),
      time: Number(time),
      level: Number(level),
      timestamp: new Date().toISOString(),
    }

    // Read existing scores
    const scores = readScores()

    // Add new score
    scores.push(newScore)

    // Write updated scores
    writeScores(scores)

    return NextResponse.json(newScore, { status: 201 })
  } catch (error) {
    console.error("Error adding score:", error)
    return NextResponse.json({ error: "Failed to add score" }, { status: 500 })
  }
}
