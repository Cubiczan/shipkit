// ─── Waitlist API ───────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { SlidingWindowRateLimiter } from "@/lib/resilience"

// Module-level limiter: this is an unauthenticated, public POST endpoint, so
// gate it per client IP to blunt scripted spam / enumeration. In-memory and
// per-instance — back with a shared store for multi-instance deployments.
const waitlistLimiter = new SlidingWindowRateLimiter({
  limit: 5,
  windowMs: 60_000,
})

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0]!.trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}

export async function POST(req: NextRequest) {
  const rl = waitlistLimiter.check(clientIp(req))
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "retry-after": String(Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))),
        },
      }
    )
  }

  try {
    const { email, referrer } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    // Position assignment is read-modify-write (max position + 1), which races
    // under concurrent signups (TOCTOU -> duplicate positions). Run the
    // existence check, position computation, and insert inside one
    // Serializable transaction so concurrent inserts can't pick the same slot.
    const result = await prisma.$transaction(
      async (tx) => {
        const existing = await tx.waitlistEntry.findFirst({ where: { email } })
        if (existing) {
          return { alreadyOnList: true as const, entry: existing }
        }

        const lastEntry = await tx.waitlistEntry.findFirst({
          orderBy: { position: "desc" },
        })
        const position = (lastEntry?.position || 0) + 1

        const entry = await tx.waitlistEntry.create({
          data: {
            email,
            position,
            referredBy: referrer || null,
          },
        })
        return { alreadyOnList: false as const, entry }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    )

    if (result.alreadyOnList) {
      return NextResponse.json({
        message: "You're already on the waitlist!",
        position: result.entry.position,
      })
    }

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
      position: result.entry.position,
      totalAhead: result.entry.position - 1,
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
