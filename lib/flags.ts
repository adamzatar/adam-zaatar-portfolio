/**
 * Global feature flag for rain / animated cloud layers.
 * Disable (default): NEXT_PUBLIC_RAIN_ENABLED=0
 * Enable locally:    export NEXT_PUBLIC_RAIN_ENABLED=1 && pnpm run dev
 * Enable on Vercel:  set Environment Variable NEXT_PUBLIC_RAIN_ENABLED=1
 */
export const RAIN_ENABLED =
  (process.env.NEXT_PUBLIC_RAIN_ENABLED ?? "0") === "1";

if (process.env.NODE_ENV !== "production") {
  console.info(`[rain] RAIN_ENABLED=${RAIN_ENABLED ? "on" : "off"}`);
}

// TODO(raindrops): flip NEXT_PUBLIC_RAIN_ENABLED to "1" once hydration is confirmed clean.
