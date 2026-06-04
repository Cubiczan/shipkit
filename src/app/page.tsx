// ─── ShipKit Landing Page ──────────────────────────────────────────────

import Link from "next/link"
import { LandingHero } from "@/components/landing-hero"
import { LandingFeatures } from "@/components/landing-features"
import { PricingTable } from "@/components/pricing-table"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="text-xl font-bold">
            ⛵ ShipKit
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/pricing"
              className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <LandingHero />

      {/* Features */}
      <LandingFeatures />

      {/* Stats / Social proof */}
      <section className="py-20 border-y">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold">~2 weeks</div>
              <div className="text-sm text-muted-foreground mt-1">Time saved per project</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">5 min</div>
              <div className="text-sm text-muted-foreground mt-1">Deploy to production</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">3×</div>
              <div className="text-sm text-muted-foreground mt-1">Projects launched per year</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">$29</div>
              <div className="text-sm text-muted-foreground mt-1">Starting price / month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <PricingTable showHeader={true} />

      {/* CTA */}
      <section className="py-24 text-center px-6 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop building boilerplate.
            <br />
            Start building your product.
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join 500+ solo founders who ship faster with ShipKit.
          </p>
          <Link
            href="/pricing"
            className="bg-foreground text-background px-8 py-3.5 rounded-xl text-lg font-medium hover:opacity-90 transition-all inline-flex items-center gap-2 group"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>⛵ ShipKit</span>
            <span className="hidden md:inline">— {new Date().getFullYear()}</span>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
              Changelog
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
