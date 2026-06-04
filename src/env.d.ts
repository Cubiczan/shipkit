// ─── ShipKit Environment Type Declarations ──────────────────────────────

declare namespace NodeJS {
  interface ProcessEnv {
    // App
    NODE_ENV: "development" | "production" | "test"
    NEXT_PUBLIC_APP_URL: string

    // Database
    DATABASE_URL: string

    // NextAuth v5
    AUTH_SECRET: string
    AUTH_URL: string

    // OAuth
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string

    // Email (Resend)
    RESEND_API_KEY: string
    EMAIL_FROM: string
    EMAIL_SERVER_HOST?: string

    // Stripe
    STRIPE_SECRET_KEY: string
    STRIPE_WEBHOOK_SECRET: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    STRIPE_STARTER_PRICE_ID: string
    STRIPE_PRO_PRICE_ID: string
    STRIPE_ENTERPRISE_PRICE_ID: string
  }
}
