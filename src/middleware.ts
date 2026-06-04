// ─── ShipKit Middleware ─────────────────────────────────────────────────
// Protects dashboard routes, redirects unauthenticated users to login

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only protect dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get("next-auth.session-token")?.value
  const secureSessionCookie = request.cookies.get("__Secure-next-auth.session-token")?.value

  if (!sessionCookie && !secureSessionCookie) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
