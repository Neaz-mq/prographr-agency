import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* POST /api/subscribe
   body: { email, website? }   (website = honeypot, manush dekhe na)

   Ki kore:
   1) Validate + honeypot + rate limit (contact route-er moto)
   2) Team-ke notify kore (CONTACT_TO_EMAIL-er shob email-e): "New subscriber: x@y.com"
   3) Subscriber-ke ekta welcome/confirmation email pathay (industry standard: user bujhe je shotti-i subscribe hoyeche)

   Env (contact route-er shathe same, notun kichu lagbe na):
     SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, (optional) SMTP_HOST / SMTP_PORT / SMTP_SECURE */

const DEFAULT_TO = ["neazmorshed666@gmail.com", "contact.prographr@gmail.com"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const recipients = () => {
  const list = (process.env.CONTACT_TO_EMAIL ?? "").split(",").map((e) => e.trim()).filter(Boolean);
  return list.length ? list : DEFAULT_TO;
};

/* Simple in-memory rate limit (per IP, 3 request / 10 min). Serverless-e best-effort. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 3;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/* Single-line field: newline shoriye dei (header injection ruke) */
const line = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

export async function POST(req: Request) {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass) return NextResponse.json({ configured: false }, { status: 501 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  /* Honeypot: bot-ke success dekhiye kichu pathai na */
  if (line(body.website, 200)) return NextResponse.json({ ok: true });

  const email = line(body.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure,
    auth: { user, pass },
  });

  /* 1) Team notification. Eta fail hole subscriber hariye jabe, tai error dekhai */
  const to = recipients();
  const when = new Date().toUTCString();
  try {
    const info = await transporter.sendMail({
      from: `"Prographr Newsletter" <${user}>`,
      to,
      replyTo: email,
      subject: `New newsletter subscriber: ${email}`,
      text: `New newsletter subscriber\n\nEmail: ${email}\nTime: ${when}\nIP: ${ip}`,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#121212">
<h2 style="margin:0 0 12px">New newsletter subscriber</h2>
<p style="margin:0"><strong>${esc(email)}</strong></p>
<p style="margin:12px 0 0;color:#888;font-size:13px">${esc(when)} · Sent from the Prographr website footer.</p>
</div>`,
    });
    if (info.rejected.length > 0 || info.accepted.length < to.length) {
      console.error("[subscribe] recipient rejected:", info.rejected);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[subscribe] notify failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  /* 2) Welcome email subscriber-ke. Fail hole shudhu log (subscribe already team-er kache pouchhe geche) */
  try {
    await transporter.sendMail({
      from: `"Prographr" <${user}>`,
      to: email,
      replyTo: to[0],
      subject: "You're subscribed to Prographr",
      text: "Thanks for subscribing to Prographr! We'll share product updates, design and development insights, and project showcases from time to time.\n\nIf this wasn't you, just ignore this email or reply with \"unsubscribe\" and we'll remove you.\n\n— The Prographr team",
      html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#121212;max-width:480px">
<h2 style="margin:0 0 12px">Thanks for subscribing 🎉</h2>
<p style="margin:0 0 12px">We'll share product updates, design and development insights, and project showcases from time to time. No spam.</p>
<p style="margin:0 0 12px;color:#666;font-size:13px">If this wasn't you, just ignore this email or reply with “unsubscribe” and we'll remove you.</p>
<p style="margin:0">— The Prographr team</p>
</div>`,
    });
  } catch (err) {
    console.error("[subscribe] welcome mail failed:", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ ok: true });
}