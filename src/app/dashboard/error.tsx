// ─── Dashboard Error Boundary ──────────────────────────────────────────

"use client"

import { useEffect } from "react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl mb-4">📡</div>
      <h2 className="text-xl font-bold mb-2">Dashboard Error</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Something went wrong loading this page. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 cursor-pointer"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="border px-5 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}
