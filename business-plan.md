# ShipKit — Business Plan

## 1. Executive Summary

ShipKit is a managed SaaS starter kit for solo founders and indie hackers. It eliminates 2 weeks of boilerplate work per project — auth, Stripe billing, Postgres, email, landing pages, growth engine, analytics — allowing founders to ship in 5 minutes instead of 5 weeks.

**Target MRR (Year 1):** $15K
**Target MRR (Year 2):** $60K
**Target MRR (Year 3):** $150K

---

## 2. Market Analysis

### TAM / SAM / SOM

| Metric | Value |
|---|---|
| **TAM** (Global SaaS tooling market) | $28B |
| **SAM** (Indie hacker + solo founder tooling) | $1.2B |
| **SOM** (Realistic Year 3 capture) | $3.6M (0.3% of SAM) |

### Competitive Landscape

| Competitor | How They Compete | Weakness ShipKit Exploits |
|---|---|---|
| **SaasRock** | Full-featured boilerplate + template | $299 one-time, no managed updates, dated UI |
| **Shipixen** | Code generation, 1-page | No dashboard, no growth engine, no analytics |
| **Gravity** | Low-code SaaS builder | Too abstract for developers, no actual code |
| **Astro SaaS Kit** | Astro-based template, open-source | No managed infra, no email sequences |
| **SupaNext** | Next.js + Supabase | Supabase lock-in, no Stripe, no landing builder |
| **DIY** | Roll your own Auth0/Stripe/Postgres | 2+ weeks of work, ongoing maintenance burden |

### Competitive Moat

1. **Managed backend with continuous updates** — Competitors sell static templates. ShipKit pushes infrastructure updates.
2. **Integrated growth engine** — Waitlist + referral + email onboarding + changelog = one product, not five integrations.
3. **Landing page builder** — SaaS-specific templates convert better than generic landing page builders.
4. **Solo-founder pricing** — $29/mo is lower than alternatives that cost $99+ or $299 one-time (which still require integration work).

---

## 3. Unit Economics

### Customer Acquisition

| Channel | CAC (blended) | Volume/% |
|---|---|---|
| Organic (SEO + content) | $15 | 35% |
| Product Hunt launch | $5 | 15% |
| Indie Hackers community | $8 | 20% |
| Twitter/X | $20 | 15% |
| Paid ads (retargeting) | $35 | 10% |
| Newsletters/Sponsorships | $40 | 5% |
| **Blended CAC** | **$17** | |

### Customer Value

| Metric | Value |
|---|---|
| Average subscription | $86/mo ($29/$79/$199 blend) |
| Average annual subscription | $86 × 12 × 20% discount = $825/yr |
| Gross margin | 88% (hosting + Stripe fees + email costs) |
| Monthly gross profit per customer | $75.68 |
| Churn rate (target) | 4% monthly (indie hacker avg is 5-7%) |
| **Average LTV** | **$1,892** ($75.68 / 0.04) |
| **LTV:CAC ratio** | **111:1** (extraordinary — organic channels are cheap) |

### Why Such Good Unit Economics?

Solo founders find ShipKit through:
- Organic SEO (searching "how to build a SaaS")
- Indie Hackers / Hacker News (community-driven discovery)
- Word of mouth ("ShipKit saved me 2 weeks")

These channels have near-zero acquisition cost. Blended CAC stays low because ShipKit isn't competing on paid ads — it competes on community + content.

---

## 4. Revenue Model

### Tier Breakdown

| Tier | Monthly Price | Annual Price | Expected Distribution |
|---|---|---|---|
| Starter (1 project) | $29 | $290 | 55% of customers |
| Pro (3 projects) | $79 | $790 | 35% of customers |
| Enterprise (unlimited) | $199 | $1,990 | 10% of customers |

### Revenue per 100 Customers

```
Starter:  55 × $29  = $1,595/mo
Pro:      35 × $79  = $2,765/mo
Enterprise: 10 × $199 = $1,990/mo
─────────────────────────────────
Total:           = $6,350/mo
Blended ARPU:    = $63.50/mo
```

### Add-on Revenue

| Add-on | Price | Expected Penetration |
|---|---|---|
| Custom template designs | $499 one-time | 5% of customers |
| White-label domain | $49/mo | 15% of Pro+Enterprise |
| Premium support | $99/mo | 10% of Pro+Enterprise |
| **Add-on ARPU boost** | **~$12/mo per customer** | |

**Blended ARPU (w/ add-ons):** $86/mo

### Revenue Projections (First 18 Months)

| Month | Customers | MRR | Key Event |
|---|---|---|---|
| 1 | 0 | $0 | Build MVP |
| 2 | 0 | $0 | Closed beta (50 users, free) |
| 3 | 50 | $1,500 | Launch on Product Hunt + Hacker News |
| 4 | 80 | $3,800 | Indie Hackers posts go viral |
| 5 | 120 | $6,200 | First paid newsletter sponsor |
| 6 | 175 | $9,500 | SEO begins compounding |
| 7 | 220 | $12,800 | Twitter/X audience building |
| 8 | 280 | $16,400 | Second Product Hunt launch (ShipKit v2) |
| 9 | 330 | $20,000 | Video demos + YouTube |
| 10 | 390 | $23,500 | Enterprise inquiries from growing startups |
| 11 | 440 | $27,000 | Podcast appearances driving traffic |
| 12 | 500 | $31,000 | Year 1 total: ~$135K ARR |
| 15 | 700 | $49,000 | |
| 18 | 1,000 | $72,000 | |

---

## 5. Cost Structure

### Fixed Monthly Costs

| Item | Cost | Notes |
|---|---|---|
| Hosting (Vercel Pro + Railway) | $40/mo | Scales with usage, estimate at $40/mo for 500 users |
| Database (Neon/Railway) | $30/mo | Serverless Postgres, scales to ~1K users |
| Email (Resend) | $50/mo | Transactional + marketing, ~10K emails/mo initially |
| Stripe fees | 2.9% + $0.30 per transaction | Cost of revenue, not operating cost |
| PostHog (analytics) | $30/mo | Self-hosted option reduces cost |
| Domains + SSL | $15/mo | |
| Developer tools (GitHub Copilot, etc.) | $30/mo | |
| **Total fixed** | **$195/mo** | |

### Variable Costs (Per Customer)

| Item | Cost |
|---|---|
| Database storage | ~$0.50/customer/mo |
| Email sending | ~$0.02/customer/mo |
| Analytics events | ~$0.05/customer/mo |
| **Total variable** | **~$0.57/customer/mo** |

### Total Monthly Cost (500 customers)

```
Fixed costs:   $195
Variable:      500 × $0.57 = $285
Stripe fees:   ~$900 (2.9% + $0.30 × 500)
────────────────────────────
Total:         $1,380
```

### Gross Margin

```
Revenue (500 customers):  $31,000
Cost of revenue:          $1,380
─────────────────────────────────
Gross profit:             $29,620
Gross margin:             95.5%
```

*Note: Stripe fees are cost of revenue. True gross margin after hosting + email + database is ~95.5%.*

---

## 6. Break-Even Analysis

| Item | Value |
|---|---|
| One-time setup cost (build MVP) | $0 (solo founder building it themselves) |
| Ongoing monthly costs | $195 (fixed) + variable |
| **Break-even customers** | **~4 customers** ($195 / $63.50 ARPU - $0.57 variable) |
| **Break-even timeline** | **Month 3** (should hit 4 customers within days of launch) |

**ShipKit breaks even on month 3 at 4 customers.** This is an extraordinarily safe business to bootstrap.

---

## 7. Growth Model

### Organic Flywheel

```
Content (blog posts, tutorials)
  → SEO rankings for "build a SaaS in 5 minutes"
    → Free traffic from indie hackers
      → 4% sign up for paid plan
        → Word of mouth from happy users
          → More content (case studies, "I built this in a weekend")
```

### Key Growth Levers

| Lever | Impact | Effort |
|---|---|---|
| **SEO content** | High (compounds forever) | Medium (1 blog post/week) |
| **Indie Hackers posts** | High (target audience) | Low (2 posts/month) |
| **Product Hunt** | Very High (launch spike) | High (prep + community) |
| **Open-source free tier** | Very High (viral) | Medium (maintenance) |
| **Newsletter sponsorships** | Medium | Low |
| **YouTube demos** | Medium | High |
| **Affiliate program** | Medium | Low |
| **Podcast appearances** | Medium | Medium |

---

## 8. Risk Analysis

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Indie hackers prefer free/open-source | Medium | High | Offer free tier (limited), compete on managed infra |
| Stripe/NextAuth updates break things | Low | Medium | Continuous integration tests + automated dependency updates |
| Competitors copy features | Medium | Medium | Moat is managed service + community, not just features |
| Slow adoption (indie hackers are cheap) | Medium | Medium | $29 entry point, 14-day free trial, money-back guarantee |
| Churn higher than expected | Medium | High | Build stickiness via landing page builder (saves data) + email sequences (they move in) |
| Solo founder burnout | Medium | High | Automate support via AI chatbot + comprehensive docs |

---

## 9. Go-To-Market Summary

**Primary channels (no paid ads for first 6 months):**
1. Indie Hackers — share the build process, engage daily
2. Product Hunt — launch with prepared community
3. Hacker News — "Show HN: I Built a SaaS Starter in 5 Minutes" story
4. SEO — "How to launch a SaaS in 5 minutes" article targeting indie hackers
5. Twitter/X — daily progress updates, reply to SaaS-build threads
6. Newsletter sponsorships — Indie Hackers newsletter, TLDR, Python Weekly

**Launch timeline:** 14-day build → 14-day closed beta → Public launch (Product Hunt + HN + IH)

---

## 10. Exit Strategy

| Path | Timeline | Rationale |
|---|---|---|
| **Bootstrapped lifestyle** | Years 1-3 | $150K ARR = comfortable solo income |
| **Acquisition** | Years 3-5 | SaaS infra tools sell for 4-6× ARR. $1M ARR = $4-6M exit |
| **Raise Series A** | Years 4-5 | Only if we achieve $2M+ ARR and want to scale to $10M+ |

Most likely outcome: **Bootstrapped lifestyle with eventual acquisition** by a larger dev tools company (Vercel, Netlify, Supabase, Railway) looking to add a SaaS starter to their product line.
