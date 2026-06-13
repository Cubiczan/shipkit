// ─── Vendored resilience primitives ────────────────────────────────────
// Source: github.com/icohangar-ops/cubiczan-resilience (typescript/src).
// Vendored (not an npm dep) — keep in sync with upstream. Only the subset
// actually used by ShipKit is copied here.

export {
  ResilienceError,
  isResilienceError,
  type ResilienceErrorKind,
  type ResilienceErrorOptions,
} from "./errors.js";

export {
  SlidingWindowRateLimiter,
  type RateLimitOptions,
  type RateLimitResult,
} from "./rateLimit.js";
