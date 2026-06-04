// ─── API Keys Management ──────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateApiKey } from "@/lib/utils"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const keys = await prisma.apiKey.findMany({
    where: { userId: session.user.id, revokedAt: null },
    select: {
      id: true,
      name: true,
      scopes: true,
      key: true,
      lastUsed: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  // Mask keys for display (show last 4 chars)
  const maskedKeys = keys.map((k) => ({
    ...k,
    key: `${k.key.slice(0, 8)}...${k.key.slice(-4)}`,
  }))

  return NextResponse.json({ keys: maskedKeys })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, scopes } = await req.json()

  const key = await prisma.apiKey.create({
    data: {
      userId: session.user.id,
      name: name || "API Key",
      key: generateApiKey(),
      scopes: scopes || ["read"],
    },
  })

  return NextResponse.json({ key: { id: key.id, name: key.name, key: key.key } })
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: "API key ID required" }, { status: 400 })
  }

  await prisma.apiKey.update({
    where: { id, userId: session.user.id },
    data: { revokedAt: new Date() },
  })

  return NextResponse.json({ message: "API key revoked" })
}
