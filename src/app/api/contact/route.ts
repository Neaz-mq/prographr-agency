import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* NOTE: cacheComponents: true thakay `export const dynamic / runtime` ekhane nei (POST handler-o already dynamic).

   POST /api/contact
   body: { name, email, whatsapp?, service, budget?, details, website? }
   -> Contact form-er message duita email-e (default neazmorshed666@gmail.com + contact.prographr@gmail.com) pathay. Client-er email-e Reply dile sorasori client-er kache jay.

   Env (shob server-side, shudhu .env.local ar Vercel Environment Variables-e, kokhono browser/chat-e na):
     SMTP_USER        = je Gmail theke mail pathabe (jemon neazmorshed666@gmail.com)
     SMTP_PASS        = oi Gmail-er "App password" (16 okkhor, Google Account > Security > 2-Step Verification > App passwords). Normal password na.
     CONTACT_TO_EMAIL = (optional) jekhane mail jabe, comma diye ekadhik (a@x.com,b@y.com). Na dile upore-r duto default email
     SMTP_HOST / SMTP_PORT / SMTP_SECURE = (optional) Gmail chara onno SMTP hole. Default smtp.gmail.com / 465 / true
   SMTP_USER ba SMTP_PASS na thakle 501 return kore. */

/* Default receiver (duijon-i mail pay). Env CONTACT_TO_EMAIL-e comma diye alada kore onno email dile seta-i use hobe */
const DEFAULT_TO = ["neazmorshed666@gmail.com", "contact.prographr@gmail.com"];

const recipients = () => {
  const list = (process.env.CONTACT_TO_EMAIL ?? "").split(",").map((e) => e.trim()).filter(Boolean);
  return list.length ? list : DEFAULT_TO;
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Simple in-memory rate limit (per IP, 5 request / 10 min). Serverless-e best-effort. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/* String-e convert + trim + length limit. Header injection-er jonno newline shoriye dei (single-line field) */
function text(v: unknown, max: number, multiline = false): string {
  if (typeof v !== "string") return "";
  const s = multiline ? v.replace(/\r\n/g, "\n") : v.replace(/[\r\n]+/g, " ");
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, ""); // Google app password space shoho dey, space shoriye nei
  if (!user || !pass) return NextResponse.json({ configured: false }, { status: 501 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  /* Honeypot: bot "website" field bhore, manush dekhe na. Bot-ke success dekhiye mail pathai na */
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, 100);
  const email = text(body.email, 200);
  const whatsapp = text(body.whatsapp, 40);
  const service = text(body.service, 100);
  const budget = text(body.budget, 60);
  const details = text(body.details, 5000, true);

  if (!EMAIL_RE.test(email) || !service || !details) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name || "—"],
    ["Email", email],
    ["WhatsApp", whatsapp || "—"],
    ["Service", service],
    ["Budget", budget || "—"],
  ];

  const plain = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Project details:", details].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#121212">
<h2 style="margin:0 0 16px">New project inquiry</h2>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#666;padding-right:16px">${k}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join("")}</table>
<h3 style="margin:20px 0 6px">Project details</h3>
<p style="margin:0;white-space:pre-wrap">${esc(details)}</p>
<p style="margin:24px 0 0;color:#888;font-size:13px">Sent from the Prographr contact form. Reply to this email to answer the client directly.</p>
</div>`;

  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure,
    auth: { user, pass },
  });

  const to = recipients();
  try {
    const info = await transporter.sendMail({
      from: `"Prographr Contact Form" <${user}>`,
      to,
      replyTo: name ? { name, address: email } : email, // Reply dile sorasori client-er kache jabe
      subject: `New inquiry: ${service} — ${name || email}`,
      text: plain,
      html,
    });
    /* SMTP server prottek receiver-ke accept korechhe ki na check kori. Ekjon-o reject hole success dekhai na (kono mail chupchap harabe na) */
    if (info.rejected.length > 0 || info.accepted.length < to.length) {
      console.error("[contact] recipient rejected:", info.rejected);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] sendMail failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
