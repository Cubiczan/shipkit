// ─── Landing Page Features Grid ────────────────────────────────────────

import {
  Zap,
  Shield,
  Palette,
  TrendingUp,
  LayoutDashboard,
  Target,
} from "lucide-react"

const features = [
  {
    title: "5-Minute Deploy",
    description:
      "From `npx shipkit create` to a running SaaS with auth and billing. No boilerplate. No configuration hell.",
    icon: Zap,
  },
  {
    title: "Auth + Billing Ready",
    description:
      "Magic link + Google/GitHub OAuth + Stripe subscriptions. Your users can sign up and pay within minutes.",
    icon: Shield,
  },
  {
    title: "Landing Page Builder",
    description:
      "Drag-and-drop landing pages with SaaS-specific templates. No design skills needed — ship beautiful pages fast.",
    icon: Palette,
  },
  {
    title: "Growth Engine Built-In",
    description:
      "Waitlist with referrals, email sequences, changelog — everything you need to grow without bolting on 5 tools.",
    icon: TrendingUp,
  },
  {
    title: "Customer Dashboard",
    description:
      "Your users get a dashboard to manage subscriptions, invoices, API keys, and team members. Out of the box.",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics You Need",
    description:
      "Trial-to-paid conversion, churn tracking, LTV estimates. Not vanity metrics — revenue metrics that matter.",
    icon: Target,
  },
]

export function LandingFeatures() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to launch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop rebuilding auth, billing, and dashboards for every project.
            ShipKit gives you a production-ready foundation so you can focus
            on what makes your product unique.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group bg-background p-6 rounded-xl border hover:border-foreground/20 transition-all hover:shadow-sm"
              >
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
