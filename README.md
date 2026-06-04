# ⛵ ShipKit — Solo SaaS Maker Suite

**ShipKit** is an all-in-one managed SaaS starter kit. Everything a solo founder needs to launch a subscription product in 5 minutes — not 5 weeks.

No more wiring together Auth0 + Stripe + Postgres + Resend + your own dashboard. No more boilerplate. Just `npx shipkit create` and you're building your actual product.

---

## 🚀 What It Does

| Capability | Description |
|---|---|
| **5-Min Deploy** | `npx shipkit create my-saas` → fully running SaaS on Vercel/Railway |
| **Auth** | Magic link + Google/GitHub OAuth via NextAuth.js. No password management. |
| **Billing** | Stripe integration with subscription plans, metered billing, invoicing, coupons |
| **Database** | Postgres via Prisma ORM — migrations, seed data, admin UI out of the box |
| **Email** | Resend integration — transactional emails, onboarding sequences, marketing |
| **Landing Page Builder** | Drag-and-drop blocks for SaaS landing pages (hero, features, pricing, FAQ, testimonials, CTA) — with SaaS-specific templates |
| **Customer Dashboard** | Users see subscription status, invoices, API keys, usage stats |
| **Growth Engine** | Waitlist with referral mechanics, changelog/updates feed, automated email onboarding sequences |
| **Analytics** | Trial → paid conversion tracking, churn rate, MRR/ARR, LTV estimates, cohort analysis |

---

## 📦 Pricing

| Tier | Price | Best For | What's Included |
|---|---|---|---|
| **Starter** | **$29/mo** | Solo devs, first-time founders | 1 project, core features, community support |
| **Pro** | **$79/mo** | Active indie hackers | 3 projects, landing page builder, growth engine, email support |
| **Enterprise** | **$199/mo** | Growing startups | Unlimited projects, white-label, analytics, dedicated Slack, custom integrations |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                    ShipKit CLI                       │
│         npx shipkit create / npx shipkit init        │
└──────────┬──────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────┐
│              ShipKit Managed Backend                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Auth    │  │  Stripe  │  │   Email Engine    │  │
│  │ (MFA/SSO)│  │ Billing  │  │ (Resend/Postmark)│  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
│  ┌──────────────────────────────────────────────┐   │
│  │         Postgres + Prisma ORM                │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────┐
│            Customer-Facing Dashboard                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │Subscription│  │ Invoices │  │   API Keys Mgmt  │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Usage   │  │  Billing │  │   Team/Roles       │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
└─────────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────┐
│                 Growth Engine                         │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Waitlist│  │ Referral │  │  Email Sequences   │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
│  ┌──────────┐  ┌──────────┐                         │
│  │Changelog │  │Analytics │                         │
│  └──────────┘  └──────────┘                         │
└─────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, Tailwind CSS, shadcn/ui |
| **Auth** | NextAuth.js v5 — magic link, Google, GitHub |
| **Database** | PostgreSQL via Prisma ORM |
| **Payments** | Stripe — subscriptions, metered billing, invoices |
| **Email** | Resend — transactional + marketing |
| **Deployment** | Vercel (recommended) or Railway |
| **Analytics** | PostHog (self-hosted or cloud) |
| **Templates** | Landing page builder — blocks written in React + Tailwind |

---

## 🛠 Setup Guide

### Quick Start (5 minutes)

```bash
# Install the CLI
npx shipkit init my-saas-app
cd my-saas-app

# Configure your environment
cp .env.example .env.local
# Fill in your Stripe keys, Resend API key, Postgres URL

# Start development
npm run dev
```

### Manual Setup

```bash
git clone https://github.com/shipkit/shipkit.git my-saas
cd my-saas
npm install
cp .env.example .env.local
```

**Environment Variables:**
```env
# Auth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/shipkit

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Email
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@shipkit.dev

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Deploy to Production

```bash
# Deploy to Vercel
vercel deploy --prod

# Run database migrations
npx prisma migrate deploy

# Sync Stripe products
npx shipkit stripe:sync

# Deploy email templates
npx shipkit email:deploy
```

---

## 📊 Why ShipKit?

### The Problem

Every indie hacker wastes **1-3 weeks** building the same thing:
- Auth screens + password management
- Stripe subscription logic + webhooks
- Customer dashboard
- Landing page
- Waitlist + referral system
- Email onboarding sequences
- Analytics

### The Solution

ShipKit eliminates all of that. You get a **production-ready SaaS backend** in 5 minutes.

**Time saved:** ~2 weeks per project
**If you launch 3 SaaS products in a year:** ShipKit saves you 6 weeks of boilerplate.

---

## 🔑 Key Differentiators

1. **Managed backend, not just a template** — Updates ship to you. Auth security patches, Stripe API changes, email deliverability improvements all handled.
2. **Landing page builder** — No-code drag-and-drop SaaS landing pages. 12 templates built from top-converting SaaS landing pages.
3. **Built-in growth engine** — Waitlist with referral mechanics, automated email sequences, changelog. Most templates are missing this entire layer.
4. **Analytics you actually need** — Trial conversion, churn, LTV, cohort analysis. Not vanity metrics.
5. **Solo-founder focused** — Pricing, UX, and support designed for one-person teams.

---

## 👤 Target Audience

| Segment | Size | Pain Point |
|---|---|---|
| Indie Hackers | ~500K active | Need to ship fast, don't have 2 weeks for boilerplate |
| Solo founders | ~200K | Building first product, overwhelmed by SaaS plumbing |
| Dev tool builders | ~100K | Building something complex, need infra to "just work" |
| Bootstrappers | ~150K | Price-sensitive, want value at $29/mo |
| Hackathon participants | ~50K events/yr | Need a SaaS in a weekend |
| Students/learners | ~1M learning full-stack | Want to deploy something real, not tutorial-forever |

---

## 📈 Business Model

- **Subscription:** $29/$79/$199 per month
- **Free tier:** 14-day trial with all features, limited to 1 project
- **Annual plans:** 2 months free ($290/$790/$1,990)
- **Add-ons:** Custom template designs ($499 one-time), white-label domains ($49/mo extra)

**Target MRR (Year 1):** $15K MRR (175 paying accounts at $86 avg)

---

## 🧰 Customer Dashboard Screens

The dashboard that ShipKit provides to end-users of generated SaaS apps:

| Screen | What It Shows |
|---|---|
| **Overview** | Subscription status, billing cycle, usage summary |
| **Billing** | Plan management, invoices, payment methods |
| **API Keys** | Generate/revoke API keys, rate limits |
| **Usage** | Monthly usage breakdown, alerts near limits |
| **Team** | Invite team members, role management |
| **Settings** | Profile, notification preferences, account deletion |

---

## 🔐 Security & Compliance

- SOC 2 Type II compliance (Q2 2026)
- GDPR-ready data processing agreement
- Stripe PCI-compliant payment flow
- Encrypted secrets management
- Automated database backups
- Uptime SLA: 99.9% (Enterprise)

---

## 🤝 Support Channels

| Tier | Support |
|---|---|
| **Starter** | Community Discord + Documentation |
| **Pro** | Email support (4h response) + Discord priority |
| **Enterprise** | Dedicated Slack channel + 1h response SLA + Monthly calls |

---

## 📜 License

ShipKit is a managed SaaS product. Generated apps are MIT-licensed and fully owned by you. ShipKit backend is proprietary.
