import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "d4nagency@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Immunity IV LA <onboarding@resend.dev>";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const location = String(body.location || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Server email is not configured. Add RESEND_API_KEY in Vercel environment variables.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Immunity IV LA lead: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        location ? `Location: ${location}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 },
    );
  }
}
