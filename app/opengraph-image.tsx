import { ImageResponse } from "next/og";

export const alt = "Adam Zaatar portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fff8f5",
          color: "#111827",
          display: "flex",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderLeft: "12px solid #4f46e5",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            height: "100%",
            justifyContent: "center",
            padding: "64px 72px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#4f46e5",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Adam Zaatar
          </div>
          <div
            style={{
              color: "#111827",
              fontSize: 68,
              fontWeight: 750,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Computer Science and Economics at Bowdoin
          </div>
          <div
            style={{
              color: "#374151",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            Backend systems | Applied AI | Economics research | Finance-oriented software
          </div>
        </div>
      </div>
    ),
    size
  );
}
