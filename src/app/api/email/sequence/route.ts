// ─── Email Sequence API ────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sendSequenceStep, scheduleOnboardingSequence } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { action, stepIndex } = await req.json()

    if (action === "schedule_onboarding") {
      await scheduleOnboardingSequence(session.user.id, session.user.email)
      return NextResponse.json({ message: "Onboarding sequence scheduled" })
    }

    if (action === "send_step" && typeof stepIndex === "number") {
      await sendSequenceStep(session.user.email, stepIndex)
      return NextResponse.json({ message: `Step ${stepIndex} sent` })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Email sequence error:", error)
    return NextResponse.json({ error: "Failed to process sequence" }, { status: 500 })
  }
}
