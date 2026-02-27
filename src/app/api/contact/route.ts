import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "d4nagency@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Immunity IV LA <onboarding@resend.dev>";
const AUTO_REPLY_FROM = process.env.AUTO_REPLY_FROM || "Immunity IV LA <hello@immunityivla.com>";

// Simple honeypot field names for spam detection
const HONEYPOT_FIELDS = ["website", "company", "phone_ext"];

interface LeadData {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  location?: string;
  message: string;
  source: string;
  userAgent?: string;
  ip?: string;
  status: "new" | "contacted" | "converted" | "spam";
  notes?: string;
}

// Log lead to JSON file for CRM tracking
function logLead(lead: LeadData) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const leadsFile = path.join(dataDir, "leads.json");
    let leads: LeadData[] = [];

    if (fs.existsSync(leadsFile)) {
      leads = JSON.parse(fs.readFileSync(leadsFile, "utf8"));
    }

    leads.push(lead);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error("Failed to log lead:", error);
  }
}

// Simple spam detection
function isSpam(body: Record<string, unknown>): boolean {
  // Check honeypot fields
  for (const field of HONEYPOT_FIELDS) {
    if (body[field] && String(body[field]).trim() !== "") {
      return true;
    }
  }

  const message = String(body.message || "").toLowerCase();
  const email = String(body.email || "").toLowerCase();
  const name = String(body.name || "").toLowerCase();

  // Common spam keywords
  const spamKeywords = [
    "viagra", "cialis", "casino", "lottery", "winner", "million dollars",
    "inheritance", "nigerian prince", "crypto investment", "make money fast",
    "weight loss pills", "debt relief", "credit repair", "seo services",
    "web design", "digital marketing agency", "buy followers"
  ];

  for (const keyword of spamKeywords) {
    if (message.includes(keyword)) return true;
  }

  // Check for suspicious patterns
  if (message.includes("http") && message.includes("click here")) return true;
  if (message.includes("www.") && message.includes("check out")) return true;

  // Multiple URLs = likely spam
  const urlCount = (message.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) return true;

  return false;
}

// Format lead notification email
function formatLeadEmail(lead: LeadData): string {
  return `New Lead from Immunity IV LA Website

${"=".repeat(50)}
CONTACT INFORMATION
${"=".repeat(50)}

Name: ${lead.name}
Email: ${lead.email}
Location: ${lead.location || "Not specified"}

${"=".repeat(50)}
MESSAGE
${"=".repeat(50)}

${lead.message}

${"=".repeat(50)}
METADATA
${"=".repeat(50)}

Lead ID: ${lead.id}
Received: ${new Date(lead.timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT
Source: ${lead.source}
Status: ${lead.status}

---
Reply to this email to contact the lead directly.
`;
}

// Format auto-reply to user
function formatAutoReply(name: string): string {
  return `Hi ${name},

Thank you for contacting Immunity IV LA! We've received your appointment request and will get back to you within 24 hours.

What happens next:
• Our team will review your request
• We'll check availability for your location in Los Angeles
• You'll receive an email with next steps and pricing

In the meantime, you can learn more about our services at:
https://immunityivla.com/immune-boost-iv-los-angeles

Or browse our blog for wellness tips:
https://immunityivla.com/blog

If this is urgent, please call or text us directly.

Best regards,
The Immunity IV LA Team
https://immunityivla.com

---
This is an automated message. Please do not reply to this email.
`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // Honeypot check (hidden fields that bots fill out)
    if (isSpam(body)) {
      // Silently accept but don't process spam
      console.log("Spam submission detected and logged");
      return NextResponse.json({ ok: true }); // Pretend it worked
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const location = String(body.location || "").trim();
    const message = String(body.message || "").trim();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (name, email, message)." },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Name length check
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 },
      );
    }

    // Message length check
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service temporarily unavailable. Please try again later or call us directly." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);

    // Get request metadata
    const headers = req.headers;
    const userAgent = headers.get("user-agent") || undefined;
    const forwardedFor = headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : undefined;

    // Create lead record
    const lead: LeadData = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      location: location || undefined,
      message,
      source: String(body.source || "website"),
      userAgent,
      ip,
      status: "new",
    };

    // Log lead to file
    logLead(lead);

    // Send notification to business
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `🩺 New Lead: ${name} - ${location || "LA Area"}`,
      text: formatLeadEmail(lead),
    });

    // Send auto-reply to user
    try {
      await resend.emails.send({
        from: AUTO_REPLY_FROM,
        to: email,
        subject: "We received your Immunity IV LA appointment request",
        text: formatAutoReply(name),
      });
    } catch (autoReplyError) {
      // Don't fail the whole request if auto-reply fails
      console.error("Auto-reply failed:", autoReplyError);
    }

    return NextResponse.json({ 
      ok: true,
      message: "Thank you! We've received your request and will contact you within 24 hours."
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly by phone." },
      { status: 500 },
    );
  }
}
