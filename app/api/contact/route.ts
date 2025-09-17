import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = (await req.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const to = process.env.CONTACT_RECIPIENT || process.env.EMAIL_TO;
    if (!to) {
      return NextResponse.json(
        { error: "Recipient not configured on server." },
        { status: 500 }
      );
    }

    // Send email via Resend
    await resend.emails.send({
      from: process.env.CONTACT_FROM || "Portfolio <noreply@your-domain.com>",
      to,
      reply_to: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }
}