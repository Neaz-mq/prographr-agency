import { NextResponse } from "next/server";
import { CAL_API, HOST_TZ, calHeaders, calTarget } from "@/lib/cal-server";

/* NOTE: cacheComponents: true thakay `export const dynamic / runtime` ekhane nei (POST handler-o already dynamic). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Simple in-memory rate limit (per IP, 6 request / 10 min). Serverless-e best-effort. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 6;
}

function validTimeZone(tz: unknown): string {
  if (typeof tz !== "string" || tz.length > 64) return HOST_TZ;
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return tz;
  } catch {
    return HOST_TZ;
  }
}

/* POST /api/cal/book
   body: { start: ISO(UTC), name, email, notes?, guests?: string[], timeZone? }
   -> Cal.com-e booking toiri kore (Google Calendar event + Google Meet link + email Cal.com nijei pathay). */
export async function POST(req: Request) {
  const target = calTarget();
  if (!target) return NextResponse.json({ configured: false }, { status: 501 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 1500) : "";
  const startTs = typeof body.start === "string" ? Date.parse(body.start) : NaN;
  const guests = Array.isArray(body.guests)
    ? body.guests
        .filter((g): g is string => typeof g === "string" && EMAIL_RE.test(g.trim()))
        .map((g) => g.trim())
        .slice(0, 5)
    : [];

  if (!name || name.length > 100 || !EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  if (Number.isNaN(startTs) || startTs < Date.now()) return NextResponse.json({ error: "invalid_time" }, { status: 400 });

  const payload: Record<string, unknown> = {
    start: new Date(startTs).toISOString(),
    attendee: { name, email, timeZone: validTimeZone(body.timeZone), language: "en" },
    eventTypeSlug: target.eventTypeSlug,
    username: target.username,
    metadata: { source: "prographr-website" },
  };
  if (guests.length) payload.guests = guests;
  if (notes) payload.bookingFieldsResponses = { notes };

  let res: Response;
  try {
    res = await fetch(`${CAL_API}/bookings`, {
      method: "POST",
      headers: calHeaders("2024-08-13"),
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }

  if (res.ok) return NextResponse.json({ ok: true });

  const text = await res.text().catch(() => "");
  console.error("[cal book] upstream", res.status, text.slice(0, 500)); // terminal / Vercel logs-e dekha jabe
  // slot onno keu nilo / ar free nei
  if ((res.status === 400 || res.status === 409) && /available|already|booked|slot|conflict/i.test(text)) {
    return NextResponse.json({ error: "slot_taken" }, { status: 409 });
  }
  // dev-e asol karon browser Network tab-e dekhar jonno
  const detail = process.env.NODE_ENV !== "production" ? text.slice(0, 400) : undefined;
  return NextResponse.json({ error: "upstream", status: res.status, detail }, { status: 502 });
}