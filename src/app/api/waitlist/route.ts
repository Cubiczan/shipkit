// ─── Waitlist API ───────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { email, referrer } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    // Check if already on waitlist
    const existing = await prisma.waitlistEntry.findFirst({
      where: { email },
    })

    if (existing) {
      return NextResponse.json({
        message: "You're already on the waitlist!",
        position: existing.position,
      })
    }

    // Get next position
    const lastEntry = await prisma.waitlistEntry.findFirst({
      orderBy: { position: "desc" },
    })
    const position = (lastEntry?.position || 0) + 1

    // Create waitlist entry
    const entry = await prisma.waitlistEntry.create({
      data: {
        email,
        position,
        referredBy: referrer || null,
      },
    })

    // If referrer exists, create referral record
    if (referrer) {
      const referrerUser = await prisma.user.findFirst({
        where: { email: referrer },
      })
      if (referrerUser) {
        // Update referral count / points
        // (Simplified for MVP — full referral rewards handled by growth engine)
      }
    }

    return NextResponse.json({
      message: "You're on the list!",
      position: entry.position,
      totalAhead: position - 1,
    })
  } catch (error) {
    console.error("Waitlist error:", error)
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 })
  }

  const entry = await prisma.waitlistEntry.findFirst({
    where: { email },
  })

  if (!entry) {
    return NextResponse.json({ onList: false })
  }

  return NextResponse.json({
    onList: true,
    position: entry.position,
  })
}
