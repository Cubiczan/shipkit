// ─── ShipKit Pricing Page ──────────────────────────────────────────────

import Link from "next/link"
import { PricingTable } from "@/components/pricing-table"

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="text-xl font-bold">
            ⛵ ShipKit
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium">
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

      <PricingTable showHeader={true} />

      {/* FAQ */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade at any time. Credits are applied prorated to your next billing cycle.",
              },
              {
                q: "What happens after my free trial?",
                a: "Your trial lasts 14 days with full access. When it ends, you'll need to choose a plan to continue. No automatic charges.",
              },
              {
                q: "Is there a discount for annual billing?",
                a: "Yes! Annual plans get 2 months free — that's 12 months for the price of 10. Reach out for custom enterprise pricing.",
              },
              {
                q: "Can I self-host ShipKit?",
                a: "ShipKit is a managed service. For enterprise customers, we offer dedicated instances with optional self-hosted deployment.",
              },
            ].map((faq) => (
              <details key={faq.q} className="border rounded-lg group">
                <summary className="px-5 py-4 text-sm font-medium cursor-pointer hover:bg-muted/50 rounded-lg transition-colors list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-muted-foreground">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t py-8 px-6 text-center text-sm text-muted-foreground">
        ⛵ ShipKit — Prices in USD. Enterprise includes custom contract options.
      </footer>
    </div>
  )
}
