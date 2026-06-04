// ─── ShipKit Root Layout ───────────────────────────────────────────────

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/session-provider"
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ShipKit — Launch Your SaaS in 5 Minutes",
    template: "%s | ShipKit",
  },
  description:
    "The fastest way for solo founders to launch a production-ready SaaS with auth, billing, and a dashboard.",
  keywords: [
    "SaaS",
    "starter kit",
    "indie hacker",
    "next.js",
    "stripe",
    "boilerplate",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
