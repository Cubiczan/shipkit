// ─── Pricing Table Component ────────────────────────────────────────────

import Link from "next/link"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "For solo developers building their first SaaS.",
    features: [
      "1 project",
      "Auth (magic link + Google/GitHub OAuth)",
      "Stripe billing integration",
      "Postgres database",
      "Email integration (Resend)",
      "Customer dashboard",
      "Waitlist + referrals",
      "2 email sequences",
      "Community Discord access",
      "Basic analytics",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    description: "For active indie hackers shipping multiple products.",
    features: [
      "3 projects",
      "Everything in Starter, plus:",
      "Landing page builder (12 templates)",
      "Growth engine — full features",
      "Unlimited email sequences",
      "Changelog / updates feed",
      "Advanced analytics (cohorts + funnel)",
      "API access",
      "Email support (4h response)",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For growing startups with team and white-label needs.",
    features: [
      "Unlimited projects",
      "Everything in Pro, plus:",
      "White-label branding",
      "Custom domain support",
      "Team management + SAML/SSO",
      "Full analytics (cohort + LTV + MRR)",
      "Dedicated Slack channel",
      "1-hour response SLA",
      "Custom integrations",
      "Monthly strategy calls",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingTable({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {showHeader && (
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Start free. Upgrade when you grow. No hidden fees, no surprises.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              14-day free trial on all plans. No credit card required.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 lg:p-8 flex flex-col ${
                plan.popular
                  ? "border-foreground shadow-lg scale-[1.02] lg:scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/pricing"}
                className={`block text-center py-3 rounded-lg text-sm font-medium transition-all ${
                  plan.popular
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Shared features footer */}
        <div className="mt-16 text-center">
          <h3 className="font-semibold mb-6">All plans include</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm text-muted-foreground">
            <div className="flex items-center gap-2 justify-center">
              <span>🔒</span> SSL & encryption
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span>🔄</span> Automatic backups
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span>📊</span> Usage monitoring
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span>⚡</span> 99.9% uptime SLA (Enterprise)
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span>🧪</span> Free 14-day trial
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span>🆕</span> Weekly feature updates
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
