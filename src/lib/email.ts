// ─── ShipKit Email Engine ──────────────────────────────────────────────
// Transactional emails + marketing sequences via Resend

import { Resend } from "resend"
import { prisma } from "@/lib/prisma"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.EMAIL_FROM || "ShipKit <noreply@shipkit.dev>"

// ─── Transactional Emails ─────────────────────────────────────────────

export async function sendWelcomeEmail(email: string, name?: string) {
  return await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to ShipKit!",
    html: `<h1>Welcome to ShipKit${name ? `, ${name}` : ""}!</h1>
           <p>You're now ready to build and ship your SaaS. Here are your next steps:</p>
           <ol>
             <li><a href="https://shipkit.dev/dashboard">Go to your dashboard</a></li>
             <li>Create your first project</li>
             <li>Connect Stripe and deploy</li>
           </ol>
           <p>Reply to this email if you need help!</p>`,
  })
}

export async function sendMagicLinkEmail(email: string, url: string) {
  return await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Sign in to ShipKit",
    html: `<p>Click the link below to sign in to your ShipKit account:</p>
           <a href="${url}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Sign In</a>
           <p>This link expires in 24 hours.</p>`,
  })
}

export async function sendTrialExpiringEmail(email: string, daysRemaining: number) {
  return await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Your ShipKit trial ends in ${daysRemaining} days`,
    html: `<h2>Your trial is ending soon</h2>
           <p>Your ShipKit free trial will expire in ${daysRemaining} days.</p>
           <p>Keep your projects running — subscribe to a plan:</p>
           <a href="https://shipkit.dev/pricing" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">View Plans</a>`,
  })
}

export async function sendPaymentFailedEmail(email: string, plan: string) {
  return await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Payment failed — update your payment method",
    html: `<h2>Payment Failed</h2>
           <p>Your ${plan} subscription payment didn't go through.</p>
           <p>Please update your payment method to avoid service interruption:</p>
           <a href="https://shipkit.dev/dashboard/billing" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Update Billing</a>`,
  })
}

export async function sendReferralRewardEmail(email: string, rewardMonths: number) {
  return await resend.emails.send({
    from: FROM,
    to: email,
    subject: `You earned ${rewardMonths} free months of ShipKit!`,
    html: `<h2>🎉 ${rewardMonths} Free Months!</h2>
           <p>Thanks for referring friends to ShipKit. You've earned ${rewardMonths} months free on your next billing cycle.</p>
           <p><a href="https://shipkit.dev/dashboard/referrals">See your referral dashboard</a></p>`,
  })
}

// ─── Email Sequence Engine ─────────────────────────────────────────────

interface SequenceStep {
  delay: string // "1d", "3d", "7d"
  subject: string
  html: string
}

const ONBOARDING_SEQUENCE: SequenceStep[] = [
  {
    delay: "0d",
    subject: "Getting started with ShipKit",
    html: `<h2>Step 1: Create Your First Project</h2><p>Your dashboard is ready. Follow our 5-minute guide to set up your first SaaS project.</p><a href="https://shipkit.dev/docs/getting-started">Read the guide →</a>`,
  },
  {
    delay: "2d",
    subject: "Connect Stripe the right way",
    html: `<h2>Step 2: Set Up Billing</h2><p>Here's how to configure Stripe subscriptions, trials, and webhooks for your project.</p><a href="https://shipkit.dev/docs/stripe">Stripe setup guide →</a>`,
  },
  {
    delay: "5d",
    subject: "Building your landing page",
    html: `<h2>Step 3: Create a Landing Page</h2><p>Use ShipKit's drag-and-drop builder to create a high-converting SaaS landing page.</p><a href="https://shipkit.dev/docs/landing-pages">Page builder tutorial →</a>`,
  },
  {
    delay: "9d",
    subject: "Growth features you're missing",
    html: `<h2>Step 4: Activate Growth Engine</h2><p>Set up waitlist, referral mechanics, and automated email sequences to grow faster.</p><a href="https://shipkit.dev/docs/growth">Growth features →</a>`,
  },
  {
    delay: "14d",
    subject: "ShipKit analytics — understand your numbers",
    html: `<h2>Step 5: Track What Matters</h2><p>MRR, churn, LTV, and cohort analysis — here's how to use ShipKit's analytics dashboard.</p><a href="https://shipkit.dev/docs/analytics">Analytics docs →</a>`,
  },
]

/**
 * Send an onboarding email sequence step for a user
 */
export async function sendSequenceStep(
  email: string,
  stepIndex: number
): Promise<void> {
  if (stepIndex >= ONBOARDING_SEQUENCE.length) return

  const step = ONBOARDING_SEQUENCE[stepIndex]

  const result = await resend.emails.send({
    from: FROM,
    to: email,
    subject: step.subject,
    html: step.html,
  })

  // Log the email
  await prisma.emailLog.create({
    data: {
      to: email,
      subject: step.subject,
      templateId: `onboarding-${stepIndex}`,
      status: "sent",
    },
  })
}

/**
 * Schedule the full onboarding sequence for a new user
 */
export async function scheduleOnboardingSequence(userId: string, email: string): Promise<void> {
  // In production, this would use a job queue (Bull/Inngest)
  // For MVP, we send step 0 immediately and log the schedule
  await sendSequenceStep(email, 0)

  // Log pending steps for cron-based delivery
  for (let i = 1; i < ONBOARDING_SEQUENCE.length; i++) {
    await prisma.emailLog.create({
      data: {
        to: email,
        subject: ONBOARDING_SEQUENCE[i].subject,
        templateId: `onboarding-${i}-pending`,
        status: "pending",
      },
    })
  }
}
