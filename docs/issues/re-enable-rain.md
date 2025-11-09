# Re-enable rain/background once hydration is stable

- [ ] Open http://localhost:3000 in a fresh incognito window: no React hydration warnings.
- [ ] Toggle `NEXT_PUBLIC_RAIN_ENABLED=1` locally and verify no SSR mismatch warnings.
- [ ] Confirm all motion imports go through `@/components/motion/serverSafeMotion`.
- [ ] Confirm seeded PRNG is used (stable seed: `"home-hero-v2"`).
- [ ] CI preview build: 0 hydration warnings in logs.

> Close this TODO when the checklist passes and the flag can be flipped to `1` by default.
