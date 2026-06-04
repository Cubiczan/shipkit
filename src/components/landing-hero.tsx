// ─── Landing Page Hero Section ──────────────────────────────────────────

import Link from "next/link"
import { ArrowRight, Rocket } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-background" />

      <div className="relative py-24 md:py-36 text-center px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-muted border px-4 py-1.5 rounded-full text-sm text-muted-foreground mb-8">
            <Rocket className="h-4 w-4" />
            <span>Deploy your SaaS in 5 minutes</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Ship Your SaaS.
            <br />
            <span className="bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-300 dark:to-white bg-clip-text text-transparent">
              Not Your Boilerplate.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one managed SaaS starter for solo founders.
            Auth, Stripe, billing, landing pages, growth engine, analytics — 
            deploy in 5 minutes, not 5 weeks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-black text-white dark:bg-white dark:text-black px-8 py-3.5 rounded-xl text-lg font-medium hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 group"
            >
              Start Building
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/docs"
              className="border px-8 py-3.5 rounded-xl text-lg font-medium hover:bg-muted transition-colors"
            >
              Read the Docs
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Free 14-day trial · No credit card required
          </p>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800"
                />
              ))}
            </div>
            <p>
              Joined by <span className="font-semibold text-foreground">500+</span>{" "}
              solo founders
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
