# ShipKit — Money Model & Financial Projections

## 1. Pricing Philosophy

ShipKit's pricing is based on **value captured vs. value created**:

- **Value created for a solo founder:** Eliminates ~2 weeks of boilerplate work per project
- **At $50/hr freelance rate:** That's $4,000 of saved labor per project
- **At $100/hr (realistic founder rate):** That's $8,000
- **At $29/mo:** Even if they only launch 1 project, they break even in ~9 months
- **At $79/mo (Pro):** Launch 3 projects → save $12-24K → pay $79/mo → 13+ years of subscription before they've overpaid

**The math is heavily skewed in the user's favor.** That's intentional — pricing should be a no-brainer.

---

## 2. Detailed Pricing Scene

### What's Behind Each Tier

| Feature | Starter ($29) | Pro ($79) | Enterprise ($199) |
|---|---|---|---|
| Projects | 1 | 3 | Unlimited |
| Auth (magic link + OAuth) | ✅ | ✅ | ✅ |
| Stripe billing | ✅ | ✅ | ✅ |
| Postgres database | ✅ | ✅ | ✅ |
| Email integration | ✅ | ✅ | ✅ |
| Landing page builder | ❌ | ✅ (12 templates) | ✅ (12 + custom) |
| Customer dashboard | ✅ | ✅ | ✅ White-labeled |
| Waitlist + referral | ✅ | ✅ | ✅ |
| Email onboarding sequences | 2 sequences | 5 sequences | Unlimited |
| Changelog/updates feed | ❌ | ✅ | ✅ |
| Analytics dashboard | Basic | Advanced | Full (cohort + LTV) |
| Custom domain | ❌ | ❌ | ✅ |
| Team/SAML | ❌ | ❌ | ✅ |
| API access | ❌ | ✅ | ✅ |
| Priority support | Community | Email 4h | Slack + 1h |
| White-label | ❌ | ❌ | ✅ |

### How We Arrived at $29/$79/$199

- **$29:** Below all competitors' entry points. No thinking — if you're an indie hacker building a SaaS, $29 is "I spend more on coffee."
- **$79:** 2.7× the base price. Persuasive via "well, I get 3 projects + landing pages + email sequences." Sweet spot.
- **$199:** Ladder to Enterprise. 2.5× from Pro. Attracts growing startups with team needs.

**Psychological pricing note:** $29 is the "no-brainer." We want the majority to start at $29 and upgrade to $79 when they need more projects. $199 is for the few who need white-label and unlimited projects.

---

## 3. Revenue Model Deep Dive

### Volume Scenario Analysis

| Scenario | Monthly Customers at Month 12 | MRR | ARR |
|---|---|---|---|
| **Conservative** | 200 | $12,400 | $148,800 |
| **Base Case** | 500 | $31,000 | $372,000 |
| **Optimistic** | 1,000 | $62,000 | $744,000 |

### Monthly Recurring Revenue Build (Base Case)

```
Month 0:  $0      [Start building]
Month 1:  $0      [Building MVP, no customers]
Month 2:  $0      [Closed beta — 50 free users]
Month 3:  $1,500  [Public launch — 50 paying users]
Month 4:  $3,800  [+80 new, -5 churned = 75 net new]
Month 5:  $6,200  [+45 net new — growth + word of mouth]
Month 6:  $9,500  [+55 net new — SEO begins]
Month 7:  $12,800 [+55 net new]
Month 8:  $16,400 [+60 net new — ShipKit v2 launch]
Month 9:  $20,000 [+58 net new]
Month 10: $23,500 [+55 net new]
Month 11: $27,000 [+54 net new]
Month 12: $31,000 [+52 net new]
──────────────────────────────────────────
Total customers: 500
Total ARR: $372,000
```

### Growth Rate Assumptions

| Phase | Monthly Net New Customers | Growth Rate (% MoM) |
|---|---|---|
| Months 3-6 (post-launch) | +55-70 | 35-45% |
| Months 6-9 (SEO compounding) | +50-60 | 20-30% |
| Months 9-12 (steady state) | +45-55 | 10-15% |
| Year 2 (mature growth) | +40-50 | 5-8% |

### Churn Breakdown

```
Monthly churn: 4% target
Yearly churn: ~50% (1 - 0.96^12)

Why people churn:
  - 40% built all their projects and don't need ShipKit anymore
  - 25% switched to a different tech stack
  - 20% abandoned their SaaS idea
  - 15% budget/price sensitivity
```

**Churn defense:**
- Landing page builder has export lock-in (your content lives there)
- Referral mechanics give bonus months for referrals
- Annual plans lock in for 12 months (and give 2 months free)
- Free upgrade to Pro if you refer 3 paying customers

---

## 4. Cost Projections

### Year 1 Cost Breakdown ($500 customer avg)

| Category | Monthly | Annual |
|---|---|---|
| Hosting & Infrastructure | $70 | $840 |
| Database | $50 | $600 |
| Email (Resend) | $100 | $1,200 |
| Analytics (PostHog cloud) | $50 | $600 |
| Stripe fees (2.9% + $0.30) | $1,025 | $12,300 |
| Domains & DNS | $15 | $180 |
| Developer tools (GitHub, Copilot) | $30 | $360 |
| **Total Cost of Revenue** | **$1,340** | **$16,080** |
| **Cost per customer** | **$2.68** | **$32.16** |

### Year 2 Cost Breakdown (2,000 customers)

| Category | Monthly | Annual | Per Customer |
|---|---|---|---|
| Infrastructure | $200 | $2,400 | $0.10 |
| Database | $200 | $2,400 | $0.10 |
| Email | $400 | $4,800 | $0.20 |
| Analytics | $200 | $2,400 | $0.10 |
| Stripe fees | $4,100 | $49,200 | $2.05 |
| **Total** | **$5,100** | **$61,200** | **$2.55** |

**Note:** Per-customer cost decreases with scale due to database/infrastructure efficiencies. Main cost is Stripe fees.

---

## 5. Profit & Cash Flow

### Year 1 Projections (Base Case)

| Quarter | Revenue | Costs | Gross Profit | Margin |
|---|---|---|---|---|
| Q1 (M 1-3) | $1,500 | $600 | $900 | 60% |
| Q2 (M 4-6) | $19,500 | $2,200 | $17,300 | 88.7% |
| Q3 (M 7-9) | $49,200 | $3,400 | $45,800 | 93.1% |
| Q4 (M 10-12) | $81,500 | $5,100 | $76,400 | 93.7% |
| **Year 1 Total** | **$151,700** | **$11,300** | **$140,400** | **92.5%** |

### 3-Year Financial Projection

| Metric | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Customers (EOP) | 500 | 2,000 | 4,000 |
| MRR (Dec) | $31,000 | $130,000 | $260,000 |
| Revenue | $151,700 | $950,000 | $2,150,000 |
| Cost of Revenue | $11,300 | $61,200 | $130,000 |
| **Gross Profit** | **$140,400** | **$888,800** | **$2,020,000** |
| Gross Margin | 92.5% | 93.5% | 93.9% |
| Operating Expenses | $0 (solo founder) | $60,000 (part-time help) | $180,000 (team of 3) |
| **Net Profit** | **$140,400** | **$828,800** | **$1,840,000** |
| Net Margin | 92.5% | 87.2% | 85.6% |

---

## 6. Cash Flow

### Monthly Cash Position (Year 1)

```
January:    -$300     (building, no revenue)
February:   -$600     (building, no revenue)
March:      +$800     (launch, $1,500 rev - $700 costs)
April:      +$4,000   ($4,500 rev - $500 costs)
May:        +$6,500   ($7,000 rev - $500 costs)
June:       +$8,500   ($8,500 rev - $500 costs)
July:       +$10,200  ($10,500 rev - $300 costs)
August:     +$11,000  ($11,500 rev - $500 costs)
September:  +$12,000  ($12,500 rev - $500 costs)
October:    +$12,800  ($13,500 rev - $700 costs)
November:   +$13,000  ($14,000 rev - $1,000 costs)
December:   +$13,500  ($14,500 rev - $1,000 costs)
─────────────────────────────────────────
End of Year Cash: ~$92,000
```

### Burn Multiple

ShipKit is **capital efficient by design**:
- Year 1 Burn Multiple: **0.08×** ($11K burn / $140K gross profit)
- Competitor benchmark (SaaS infra companies): 1.5-3.0×
- ShipKit is profitable from month 4 onwards

---

## 7. Investor Metrics (if raising)

| Metric | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| ARR | $372K | $1.56M | $3.12M |
| ARR Growth Rate | — | 319% | 100% |
| Net Revenue Retention | 96% (monthly) | 98% (annual) | 98% |
| Gross Margin | 92.5% | 93.5% | 93.9% |
| LTV:CAC | 111:1 | 80:1 | 60:1 |
| Payback Period | ~2 months | ~1 month | ~1 month |

### Valuation Estimates

| Stage | Multiple | Value |
|---|---|---|
| Year 1 (self-funded) | 5× ARR | $1.86M |
| Year 2 (if raising) | 8× ARR | $12.5M |
| Year 3 (mature) | 6× ARR | $18.7M |

---

## 8. Summary

**ShipKit is a low-risk, high-margin, capital-efficient business.**

| Key Metric | Value |
|---|---|
| Time to break-even | Month 3 |
| Break-even customers | 4 |
| Year 1 ARR | $372K (base case) |
| Year 3 ARR | $3.12M (base case) |
| Gross margin | 92.5-93.9% |
| Capital needed to start | $0 (solo founder builds MVP) |
| Viability score | ⭐⭐⭐⭐⭐ (near-zero risk, huge upside) |
