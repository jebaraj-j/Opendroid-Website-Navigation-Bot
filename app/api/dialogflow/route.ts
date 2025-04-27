import { NextRequest, NextResponse } from "next/server"
import { SessionsClient } from "@google-cloud/dialogflow"
import { v4 as uuidv4 } from "uuid"
import * as path from "path"

// Adjust path to your service account JSON key
const keyPath = path.resolve(process.cwd(), "G:/vercel/keys/droid-navigation-key.json")

const client = new SessionsClient({ keyFilename: keyPath })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const userMessage = body.message
  const sessionId = uuidv4()

  const sessionPath = client.projectAgentSessionPath("droid-bot-rlrv", sessionId)

  const dialogflowRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: "en",
      },
    },
  }

  try {
    const responses = await client.detectIntent(dialogflowRequest)
    const result = responses[0].queryResult
    return NextResponse.json({ reply: result?.fulfillmentText || "I didn’t understand that." })
  } catch (error) {
    console.error("Dialogflow error:", error)
    return NextResponse.json({ reply: "Error talking to Dialogflow." }, { status: 500 })
  }
}
