// ─── Stripe Webhook Handler ─────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const { userId, plan } = session.metadata || {}
        const stripeSubscriptionId = session.subscription as string

        if (userId && stripeSubscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)

          await prisma.subscription.upsert({
            where: { userId },
            update: {
              stripeId: stripeSubscriptionId,
              stripePriceId: subscription.items.data[0]?.price.id,
              status: "ACTIVE",
              plan: (plan as "STARTER" | "PRO" | "ENTERPRISE") || "STARTER",
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
            create: {
              userId,
              stripeId: stripeSubscriptionId,
              stripePriceId: subscription.items.data[0]?.price.id,
              status: "ACTIVE",
              plan: (plan as "STARTER" | "PRO" | "ENTERPRISE") || "STARTER",
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          })
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          const status = subscription.status === "active" ? "ACTIVE" :
                         subscription.status === "past_due" ? "PAST_DUE" :
                         subscription.status === "canceled" ? "CANCELED" : "EXPIRED"

          const priceId = subscription.items.data[0]?.price.id
          const plan = priceId === process.env.STRIPE_STARTER_PRICE_ID ? "STARTER" :
                       priceId === process.env.STRIPE_PRO_PRICE_ID ? "PRO" : "ENTERPRISE"

          await prisma.subscription.update({
            where: { userId },
            data: {
              status,
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
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          await prisma.subscription.update({
            where: { userId },
            data: { status: "CANCELED", canceledAt: new Date() },
          })
        }
        break
      }

      case "invoice.paid": {
        const invoice = event.data.object
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          // Find subscription by stripeId
          const sub = await prisma.subscription.findUnique({
            where: { stripeId: subscriptionId },
          })
          if (sub) {
            await prisma.invoice.create({
              data: {
                subscriptionId: sub.id,
                stripeId: invoice.id,
                amount: invoice.amount_paid,
                status: "paid",
                pdfUrl: invoice.invoice_pdf,
                paidAt: new Date(),
              },
            })
          }
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        const subscriptionId = invoice.subscription as string
        if (subscriptionId) {
          const sub = await prisma.subscription.findUnique({
            where: { stripeId: subscriptionId },
          })
          if (sub) {
            await prisma.subscription.update({
              where: { id: sub.id },
              data: { status: "PAST_DUE" },
            })
          }
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
