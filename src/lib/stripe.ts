// ─── ShipKit Stripe Integration ────────────────────────────────────────
// Subscription management, checkout, webhook handling, billing portal

import Stripe from "stripe"
import { prisma } from "./prisma"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
})

export const PLANS = {
  STARTER: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    name: "Starter",
    monthlyAmount: 2900, // $29.00
    features: ["1 project", "Core features", "Community support"],
  },
  PRO: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    name: "Pro",
    monthlyAmount: 7900, // $79.00
    features: [
      "3 projects",
      "Landing page builder",
      "Growth engine",
      "Email support",
    ],
  },
  ENTERPRISE: {
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    name: "Enterprise",
    monthlyAmount: 19900, // $199.00
    features: [
      "Unlimited projects",
      "White-label",
      "Analytics",
      "Dedicated Slack",
      "Custom integrations",
    ],
  },
} as const

export type PlanType = keyof typeof PLANS

/**
 * Create a Stripe Checkout Session for subscription
 */
export async function createCheckoutSession({
  userId,
  plan,
  email,
  successUrl,
  cancelUrl,
}: {
  userId: string
  plan: PlanType
  email: string
  successUrl: string
  cancelUrl: string
}): Promise<Stripe.Checkout.Session> {
  const priceId = PLANS[plan].priceId

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    client_reference_id: userId,
    metadata: { userId, plan },
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: { userId, plan },
    },
  })

  return session
}

/**
 * Create a Stripe Billing Portal session
 */
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}): Promise<Stripe.BillingPortal.Session> {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

/**
 * Sync Stripe products/prices to database
 */
export async function syncProductsWithDatabase(): Promise<void> {
  // Products and prices are synced from Stripe webhooks
  // This is called on startup to ensure sync
  const products = await stripe.products.list({ active: true, limit: 100 })

  for (const product of products.data) {
    const prices = await stripe.prices.list({ product: product.id, active: true })

    // Upsert logic would go here
    // For MVP, we define plans statically in PLANS constant
    // In production, sync to a Product/Price model in the database
  }
}

/**
 * Create a subscription in Stripe from a webhook event
 */
export async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const { userId, plan } = session.metadata || {}
  const stripeSubscriptionId = session.subscription as string

  if (!userId || !stripeSubscriptionId) return

  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)

  // Update subscription in database
  await prisma.subscription.update({
    where: { userId },
    data: {
      stripeId: stripeSubscriptionId,
      stripePriceId: subscription.items.data[0]?.price.id,
      status: "ACTIVE",
      plan: plan as PlanType,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })
}

/**
 * Handle subscription updates from Stripe webhook
 */
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
): Promise<void> {
  if (!subscription.metadata?.userId) return

  const status = mapStripeStatus(subscription.status)
  const priceId = subscription.items.data[0]?.price.id

  let plan: PlanType = "STARTER"
  if (priceId === PLANS.PRO.priceId) plan = "PRO"
  if (priceId === PLANS.ENTERPRISE.priceId) plan = "ENTERPRISE"

  await prisma.subscription.update({
    where: { userId: subscription.metadata.userId },
    data: {
      status: status as any, // SubscriptionStatus enum from Stripe event
      plan,
      stripePriceId: priceId,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
    },
  })
}

function mapStripeStatus(status: Stripe.Subscription.Status): string {
  const map: Record<string, string> = {
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELED",
    unpaid: "PAST_DUE",
    incomplete: "TRIAL",
    incomplete_expired: "EXPIRED",
    trialing: "TRIAL",
    paused: "PAUSED",
  }
  return map[status] || "ACTIVE"
}
