// app/api/contact/route.ts
"use server";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Please include a bit more detail").max(5000, "Message is too long"),
});

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const json = await req.json().catch(() => null);
    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.issues.map(i => i.message) },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const to = process.env.CONTACT_RECIPIENT || process.env.EMAIL_TO || "";
    const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }
    if (!to) {
      return NextResponse.json({ error: "Recipient not configured on server" }, { status: 500 });
    }

    const refId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const { error } = await resend.emails.send({
      from,
      to, // string is fine; SDK also accepts string[]
      replyTo: `${name} <${email}>`,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      headers: { "X-Entity-Ref-ID": refId },
    });

    if (error) {
      console.error("[/api/contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] unexpected error:", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}