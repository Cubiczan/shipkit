/**
 * VENDORED COPY — keep in sync with the canonical package.
 *
 * Vendored from @cubiczan/resilience (icohangar-ops/cubiczan-resilience,
 * typescript/src) at typescript-v0.2.0
 * (commit 37ce1571f5beb751d153ecdc3b1457cd9c871e37).
 * Check the canonical package for updates before modifying locally; this
 * copy's scope and intentional local deltas are recorded in VENDOR_COMMIT.txt
 * beside this file.
 */

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
