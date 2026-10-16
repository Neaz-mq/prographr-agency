import { NextResponse } from "next/server";
import { CAL_API, HOST_TZ, HOST_TZ_OFFSET_MIN, calHeaders, calTarget } from "@/lib/cal-server";

/* NOTE: `export const dynamic / runtime / revalidate` ekhane NEI. next.config-e cacheComponents: true, tai oigulo build error dey.
   Request (req.url) pore, tai route-ta already dynamic. */

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 86_400_000;

/* GET /api/cal/slots?start=2026-10-01&end=2026-11-07
   Cal.com theke available slot ane, Dhaka shomoy-e "minutes from midnight" hishebe pathay:
   { slots: { "2026-10-19": [600, 630, ...] } }
   Cal.com set up na thakle 501 (tokhon widget local/WhatsApp mode-e cholbe). */
export async function GET(req: Request) {
  const target = calTarget();
  if (!target) return NextResponse.json({ configured: false }, { status: 501 });

  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start") ?? "";
  const end = searchParams.get("end") ?? "";
  if (!DATE_RE.test(start) || !DATE_RE.test(end)) return NextResponse.json({ error: "bad_range" }, { status: 400 });
  const span = (Date.parse(end) - Date.parse(start)) / DAY_MS;
  if (!(span > 0 && span <= 70)) return NextResponse.json({ error: "bad_range" }, { status: 400 });

  // end-er pore aro 2 din dei, jate range-er shesh dinta kete na jay
  const endPadded = new Date(Date.parse(end) + 2 * DAY_MS).toISOString().slice(0, 10);

  const url = new URL(`${CAL_API}/slots`);
  url.searchParams.set("username", target.username);
  url.searchParams.set("eventTypeSlug", target.eventTypeSlug);
  url.searchParams.set("start", start);
  url.searchParams.set("end", endPadded);
  url.searchParams.set("timeZone", HOST_TZ);

  let res: Response;
  try {
    res = await fetch(url, { headers: calHeaders("2024-09-04"), cache: "no-store" });
  } catch {
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }
  if (!res.ok) {
    console.error("[cal slots] upstream", res.status, (await res.text().catch(() => "")).slice(0, 500));
    return NextResponse.json({ error: "upstream", status: res.status }, { status: 502 });
  }

  const json = (await res.json().catch(() => null)) as { data?: Record<string, unknown> } | null;
  const data = json?.data && typeof json.data === "object" ? json.data : {};

  // Cal.com day-key-r upor bhorosha na kore, protita slot-er timestamp theke Dhaka-r date + minute berkori
  const out: Record<string, number[]> = {};
  for (const day of Object.values(data)) {
    if (!Array.isArray(day)) continue;
    for (const item of day) {
      const iso = typeof item === "string" ? item : (item as { start?: string } | null)?.start;
      const ts = iso ? Date.parse(iso) : NaN;
      if (Number.isNaN(ts)) continue;
      const local = new Date(ts + HOST_TZ_OFFSET_MIN * 60_000); // UTC getter-gulo ekhon Dhaka-r wall clock
      const key = local.toISOString().slice(0, 10);
      (out[key] ||= []).push(local.getUTCHours() * 60 + local.getUTCMinutes());
    }
  }
  for (const key of Object.keys(out)) out[key] = [...new Set(out[key])].sort((a, b) => a - b);

  return NextResponse.json({ slots: out }, { headers: { "Cache-Control": "no-store" } });
}