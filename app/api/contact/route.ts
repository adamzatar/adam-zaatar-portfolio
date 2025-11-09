import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  // Keep email disabled by default unless both a flag and key are present
  const EMAIL_ENABLED =
    (process.env.EMAIL_ENABLED ?? "0").toLowerCase() !== "0" &&
    (process.env.EMAIL_ENABLED ?? "").toLowerCase() !== "false";
  const key = process.env.RESEND_API_KEY;

  if (!EMAIL_ENABLED || !key) {
    // No-op response so UI can treat as “accepted”
    return NextResponse.json(
      { ok: true, delivered: false, reason: "email-disabled" },
      { status: 202 }
    );
  }

  const body: ContactPayload = await req.json().catch(() => ({}));
  const name = body.name?.trim() || "Portfolio";
  const replyTo = body.email?.trim() || undefined;
  const message = body.message?.trim() || "";

  // Lazy import to avoid top-level side effects at build time
  const { Resend } = await import("resend");
  const resend = new Resend(key);

  try {
    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM || "Adam Portfolio <onboarding@resend.dev>",
      to: (process.env.CONTACT_TO || "adam@example.com")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      subject: `Portfolio contact from ${name}`,
      replyTo: replyTo,
      text: message,
    });

    return NextResponse.json({ ok: true, id: result?.data?.id ?? null });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "send_failed";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

// Ensure runtime execution; avoid static optimization assumptions
export const dynamic = "force-dynamic";
