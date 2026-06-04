# ShipKit — 14-Day Build Plan

> **Build Window:** Days 1-14
> **Closed Beta:** Days 15-28 (50 free users)
> **Public Launch:** Day 29

---

## Day 1: Foundation & Architecture

**Goal:** Project scaffolded, decisions locked, core dependencies installed.

**Checklist:**
- [ ] `npx create-next-app@latest shipkit --typescript --tailwind --app`
- [ ] Install core dependencies: `next-auth`, `prisma`, `@prisma/client`, `stripe`, `resend`
- [ ] Set up project structure (`/app`, `/components`, `/lib`, `/types`)
- [ ] Configure TypeScript strict mode
- [ ] Set up Tailwind + shadcn/ui (`npx shadcn@latest init`)
- [ ] Create `.env.example` with all environment variable placeholders
- [ ] Initialize Prisma: `npx prisma init`
- [ ] Create database schema (User, Account, Session, Subscription, Invoice, ApiKey)
- [ ] Run initial migration: `npx prisma migrate dev --name init`
- [ ] Set up linting + formatting: ESLint + Prettier
- [ ] Configure Git: `.gitignore`, initial commit

**Deliverables:** Working Next.js app with Tailwind + shadcn, draft Prisma schema, project scaffold

---

## Day 2: Authentication System

**Goal:** Magic link + OAuth login working end-to-end.

**Checklist:**
- [ ] Configure NextAuth.js v5 with Prisma adapter
- [ ] Implement email provider (Resend for magic link)
- [ ] Implement Google OAuth provider
- [ ] Implement GitHub OAuth provider
- [ ] Create login page (`/login`) with email + OAuth buttons
- [ ] Create auth callback page
- [ ] Test: Sign up with magic link, sign in with Google/GitHub
- [ ] Create session management (`getServerSession` wrapper)
- [ ] Create middleware for protected routes
- [ ] Create user profile page (`/dashboard/profile`)
- [ ] Test: Logout, session expiry, redirect after login
- [ ] Handle error states (expired link, invalid token, etc.)

**Deliverables:** Working auth system with 3 sign-in methods

---

## Day 3: Database & ORM Completion

**Goal:** Full Prisma schema, seed data, admin access.

**Checklist:**
- [ ] Finalize Prisma schema with all models:
  - [ ] User, Account, Session (NextAuth)
  - [ ] Subscription, Price, Product (Stripe sync)
  - [ ] Invoice, PaymentMethod
  - [ ] ApiKey (with rate limits)
  - [ ] Project, ProjectSettings
  - [ ] WaitlistEntry, Referral, ReferralReward
  - [ ] EmailSequence, EmailTemplate, EmailLog
  - [ ] ChangelogEntry
  - [ ] AnalyticsEvent
  - [ ] LandingPage (for page builder)
- [ ] Create seed script with sample data
- [ ] Set up Prisma Studio for admin access
- [ ] Create reusable Prisma singleton (prevent multiple instances)
- [ ] Add indexes for common queries
- [ ] Test migrations up/down

**Deliverables:** Complete database schema, seed data, admin tooling

---

## Day 4: Stripe Integration

**Goal:** Subscription plans, checkout, webhooks, billing portal.

**Checklist:**
- [ ] Create Stripe products and prices (Starter/Pro/Enterprise on Stripe dashboard)
- [ ] Create Stripe webhook handler endpoint
- [ ] Implement checkout session creation (`/api/stripe/checkout`)
- [ ] Implement portal session creation (`/api/stripe/portal`)
- [ ] Handle webhook events:
  - [ ] `checkout.session.completed` → activate subscription
  - [ ] `customer.subscription.updated` → sync plan changes
  - [ ] `customer.subscription.deleted` → cancel subscription
  - [ ] `invoice.paid` → mark invoice as paid
  - [ ] `invoice.payment_failed` → send dunning email
- [ ] Create Stripe service layer in `/lib/stripe.ts`
- [ ] Sync Stripe products/prices with database on startup
- [ ] Create pricing page (`/pricing`)
- [ ] Add "Subscribe" buttons on pricing page
- [ ] Test: Full checkout flow, cancellation, upgrade/downgrade

**Deliverables:** Working subscription billing end-to-end

---

## Day 5: Customer Dashboard

**Goal:** Customer-facing dashboard with subscription info, invoices, API keys.

**Checklist:**
- [ ] Create dashboard layout with sidebar navigation
- [ ] Build overview page (`/dashboard`):
  - [ ] Current plan + status badge
  - [ ] Next billing date
  - [ ] Usage summary
  - [ ] Quick actions (upgrade, manage billing)
- [ ] Build billing page (`/dashboard/billing`):
  - [ ] Current plan card
  - [ ] Plan comparison (upgrade/downgrade buttons)
  - [ ] Invoice list (from Stripe)
  - [ ] Payment methods (link to Stripe portal)
- [ ] Build API keys page (`/dashboard/api-keys`):
  - [ ] Generate API key (with scopes)
  - [ ] Revoke API key
  - [ ] Copy to clipboard
  - [ ] Rate limit display
- [ ] Build settings page (`/dashboard/settings`):
  - [ ] Profile editing
  - [ ] Notification preferences
  - [ ] Account deletion (with confirmation)
- [ ] Add responsive mobile layout

**Deliverables:** Complete customer dashboard with 4 pages

---

## Day 6: Landing Page Builder

**Goal:** No-code landing page builder with 12 SaaS-specific templates.

**Checklist:**
- [ ] Create page block schema in database
- [ ] Build block library:
  - [ ] Hero block (headline, subtitle, CTA, image)
  - [ ] Features block (3- or 4-column grid)
  - [ ] Pricing block (3-tier display)
  - [ ] Testimonials block (carousel)
  - [ ] FAQ block (accordion)
  - [ ] CTA block (final call to action)
  - [ ] Footer block
  - [ ] Navigation bar block
  - [ ] Logo cloud block (social proof)
  - [ ] Stats block (numbers, metrics)
  - [ ] Timeline block (roadmap)
  - [ ] Newsletter signup block
- [ ] Build drag-and-drop editor (React DnD or dnd-kit):
  - [ ] Block palette (sidebar)
  - [ ] Canvas (drop area)
  - [ ] Property panel (edit block content)
  - [ ] Reorder blocks (drag up/down)
  - [ ] Delete blocks
- [ ] Create 3 starter templates:
  - [ ] "Minimal SaaS" (hero-features-pricing-CTA-footer)
  - [ ] "Enterprise SaaS" (hero-logo-cloud-features-stats-pricing-testimonials-CTA)
  - [ ] "Developer Tool" (hero-demo-features-timeline-pricing-faq)
- [ ] Build preview mode (responsive: desktop/tablet/mobile)
- [ ] Build publish workflow (draft → published)

**Deliverables:** Functional landing page builder with templates

---

## Day 7: Landing Page Builder (Completion)

**Goal:** Polish + deploy the landing page builder.

**Checklist:**
- [ ] Implement block styling controls (colors, fonts, spacing)
- [ ] Add image upload (for hero images, logos)
- [ ] Build 9 more templates (total 12):
  - [ ] "AI/ML Tool" template
  - [ ] "Marketplace" template
  - [ ] "Fintech" template
  - [ ] "Healthtech" template
  - [ ] "API/Backend" template
  - [ ] "SaaS Mobile App" template
  - [ ] "B2B Enterprise" template
  - [ ] "E-commerce Platform" template
  - [ ] "Content Platform" template
- [ ] Add template preview (screenshots of templates)
- [ ] Add template search/filter
- [ ] Create landing page listing (`/dashboard/pages`)
- [ ] Test: Create landing page from scratch, from template, publish

**Deliverables:** 12 templates + full landing page builder

---

## Day 8: Waitlist & Referral Engine

**Goal:** Viral waitlist with referral mechanics.

**Checklist:**
- [ ] Build waitlist page component
- [ ] Create waitlist API endpoint (`/api/waitlist`)
- [ ] Implement email capture + position display
- [ ] Build referral tracking:
  - [ ] Unique referral link per user
  - [ ] Track referrals by cookie + link param
  - [ ] Referral dashboard (`/dashboard/referrals`)
- [ ] Build referral rewards system:
  - [ ] "Refer 3 → 1 month free"
  - [ ] "Refer 10 → 3 months free"
  - [ ] "Refer 30 → 1 year free"
  - [ ] "Most referrals" leaderboard
- [ ] Build referral share cards (LinkedIn/Twitter/email)
- [ ] Create waitlist analytics in admin panel
- [ ] Add email notification for referral milestones

**Deliverables:** Waitlist with referral mechanics

---

## Day 9: Email Sequences & Onboarding

**Goal:** Automated email onboarding sequences.

**Checklist:**
- [ ] Set up Resend integration
- [ ] Create email template engine (React Email):
  - [ ] Welcome email
  - [ ] Magic link email
  - [ ] New subscriber email
  - [ ] Trial expiring email (3 days before)
  - [ ] Trial expired email
  - [ ] Payment success email
  - [ ] Payment failed email
  - [ ] Referral reward email
  - [ ] Changelog notification email
- [ ] Build email sequence builder in dashboard:
  - [ ] Create sequence (name, trigger)
  - [ ] Add steps (email + delay)
  - [ ] Preview sequence
  - [ ] Activate/pause
- [ ] Build pre-made onboarding sequences:
  - [ ] "New User" sequence (5 emails over 7 days)
  - [ ] "Trial About to Expire" sequence (3 emails over 5 days)
  - [ ] "Power Features" sequence (5 emails, once per week)
  - [ ] "Re-engagement" sequence (3 emails for inactive users)
- [ ] Create email log (`/dashboard/logs`)
- [ ] Implement unsubscribes

**Deliverables:** Automated email system with 4 pre-built sequences

---

## Day 10: Changelog & Analytics Engine

**Goal:** Changelog feed + analytics dashboard.

**Checklist:**
- [ ] Build changelog page (`/changelog`)
- [ ] Build changelog admin (`/dashboard/changelog`):
  - [ ] Create/edit/delete changelog entries
  - [ ] Rich text editor
  - [ ] Schedule publish
  - [ ] Subscribe to changelog (email notification)
- [ ] Set up PostHog (or self-hosted analytics):
  - [ ] Page views
  - [ ] Sign-up events
  - [ ] Subscription events (trial start, paid, churn)
  - [ ] Feature usage tracking
- [ ] Build analytics dashboard:
  - [ ] MRR/ARR chart
  - [ ] New customers (daily/weekly/monthly)
  - [ ] Churn rate graph
  - [ ] LTV estimate
  - [ ] Trial → paid conversion funnel
  - [ ] Cohort analysis (by sign-up week)
  - [ ] Revenue forecast
- [ ] Export analytics (CSV)

**Deliverables:** Changelog + complete analytics dashboard

---

## Day 11: Admin Panel & APIs

**Goal:** Internal admin panel, public API.

**Checklist:**
- [ ] Build admin panel (`/admin`):
  - [ ] User management (view, suspend, delete)
  - [ ] Subscription management (manual create, cancel, refund)
  - [ ] Invoice viewer
  - [ ] System metrics (error rates, API call volumes)
  - [ ] Email log viewer
  - [ ] Analytics overview
- [ ] Create public REST API:
  - [ ] Authentication (API key-based)
  - [ ] Rate limiting (100 req/min for Pro, 1000 for Enterprise)
  - [ ] Endpoints: user, subscription, invoices
  - [ ] API documentation page (Swagger/OpenAPI)
- [ ] Create webhook for user events

**Deliverables:** Admin panel + public API

---

## Day 12: Polish & UX

**Goal:** Make everything beautiful. Edge cases handled.

**Checklist:**
- [ ] Mobile responsiveness review (all pages)
- [ ] Loading states (skeletons everywhere)
- [ ] Empty states (illustrations + CTAs)
- [ ] Error states (boundaries, retry buttons)
- [ ] Toast notifications for actions
- [ ] Form validation + error messages
- [ ] Keyboard shortcuts (dashboard navigation)
- [ ] Dark mode toggle with persistence
- [ ] Onboarding wizard for new users (3-step)
- [ ] SEO basics: meta tags, sitemap, robots.txt
- [ ] 404 page
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (keyboard nav, screen readers)
- [ ] Copy review (all user-facing strings)

**Deliverables:** Polished, production-ready UI

---

## Day 13: Documentation & Support

**Goal:** Documentation site, support system.

**Checklist:**
- [ ] Build docs site (`/docs`):
  - [ ] Getting started guide
  - [ ] Configuration reference
  - [ ] API reference
  - [ ] CLI commands reference
  - [ ] Deployment guide (Vercel, Railway)
  - [ ] Migration guide (existing project to ShipKit)
  - [ ] FAQ
- [ ] Create video demo (5 min walkthrough)
- [ ] Set up Discord server (community + support)
- [ ] Create knowledge base articles (10 minimum)
- [ ] Build in-app help widget (Intercom or Crisp alternative)
- [ ] Create onboarding email flow for documentation
- [ ] Write "ShipKit for [X]" guides (5 verticals)

**Deliverables:** Docs site + support infrastructure

---

## Day 14: Launch Prep & Testing

**Goal:** Everything ready. Bug-free. Launch plan confirmed.

**Checklist:**
- [ ] End-to-end test all core flows:
  - [ ] Sign up → magic link → dashboard
  - [ ] Subscribe → Stripe checkout → plan active
  - [ ] Cancel → subscription ends
  - [ ] Upgrade/downgrade plan
  - [ ] Generate API key → use API → rate limited
  - [ ] Create landing page → publish → view page
  - [ ] Refer a friend → reward credited
  - [ ] Email sequence fires correctly
- [ ] Load test: 100 concurrent users on dashboard
- [ ] Security review:
  - [ ] CSRF protection
  - [ ] SQL injection (Prisma protects by default)
  - [ ] XSS (React protects by default)
  - [ ] Rate limiting on auth endpoints
  - [ ] API key rotation
- [ ] Backup strategy: DB backup daily + pre-deployment
- [ ] Monitoring setup: error tracking (Sentry), uptime monitoring (Better Uptime)
- [ ] Pricing page live
- [ ] Landing page for ShipKit itself live
- [ ] Product Hunt listing submitted (approved)
- [ ] Hacker News post drafted
- [ ] Indie Hackers launch post drafted
- [ ] Twitter/X thread pre-written
- [ ] Launch email drafted
- [ ] Screenshots + GIFs captured for marketing
- [ ] All social links active
- [ ] DNS checked

**Deliverables:** Launch-ready product, will-call all marketing

---

## Summary

```
Day 1-2:  Foundation + Auth      ████████░░░░  (15%)
Day 3-4:  Database + Stripe      ████████░░░░  (30%)
Day 5-7:  Dashboard + Builder    ████████████  (55%)
Day 8-9:  Growth Engine          ████████████  (70%)
Day 10-11: Analytics + Admin     ████████████  (85%)
Day 12-14: Polish + Launch Prep  ████████████  (100%)

14 days total. Day 15 starts closed beta.
```

---

## Post-Launch (Day 15-28): Closed Beta

- [ ] Onboard 50 beta users (from waitlist)
- [ ] Fix bugs as reported
- [ ] Collect feedback → prioritize v2 features
- [ ] Write first case study with beta user
- [ ] Gather testimonials
- [ ] Analyze first usage data → improve onboarding
- [ ] Ship quick wins (small features, UI fixes)

## Day 29: Public Launch 🚀

Execute marketing plan. ShipKit goes live.
