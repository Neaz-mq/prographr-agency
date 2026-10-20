import { siteConfig } from "@/lib/site";

/* Booking section-er shob config ekhane. Figma: "Frame 2147237397" (Let's Talk About Your Project) */
export const HOST = {
  name: "Mahamudul",
  handle: "@Prographr",
  avatar: "v1792495032/a714bc0c-39ea-46aa-b1ab-d37693a0fe74_2_ea1sf1" as string | undefined, // Cloudinary public ID (Figma "image 6350863" avatar export, 30px circle-er jonno). undefined dile "M" okkhor dekhabe
};

export const MEETING = {
  title: "Book a FREE 20-min call",
  durationLabel: "20m", // Cal.com event type-er length-er sathe mile thakte hobe (prographr-test/20min)
  minutes: 20,
  platform: "Google Meet",
  timezone: "Asia/Dhaka",
};

/* Slot-gulo host-er (Asia/Dhaka, UTC+6) shomoy-e. Dhaka-te DST nai, tai fixed offset */
export const TZ_OFFSET_MIN = 6 * 60;
export const DAY_START_MIN = 10 * 60; // 10:00am
export const DAY_END_MIN = 19 * 60; // 7:00pm (shesh slot 6:30pm-e shuru)
export const SLOT_STEP_MIN = 30;
export const LEAD_TIME_MIN = 30; // ekhon theke kom-pokkhe 30 min pore-r slot
export const MAX_MONTHS_AHEAD = 6;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type Ymd = { y: number; m: number; d: number }; // m: 0-based

/* Dhaka-r ekhonkar "wall clock". Return kora Date-er UTC getter gulo-i Dhaka-r shomoy dey (visitor kon timezone-e ache tate kichu ashe jay na) */
export function dhakaNow(): Date {
  return new Date(Date.now() + TZ_OFFSET_MIN * 60000);
}
export const ymdOf = (date: Date): Ymd => ({ y: date.getUTCFullYear(), m: date.getUTCMonth(), d: date.getUTCDate() });
export const keyOf = ({ y, m, d }: Ymd) => y * 10000 + m * 100 + d;
export const sameDay = (a: Ymd, b: Ymd) => keyOf(a) === keyOf(b);
export const monthIndex = ({ y, m }: { y: number; m: number }) => y * 12 + m;
export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
export const weekdayOf = ({ y, m, d }: Ymd) => new Date(Date.UTC(y, m, d)).getUTCDay();

const ordinal = (n: number) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10]}`;
};

export const monthName = (m: number) => MONTHS[m];
export const shortDayLabel = (date: Ymd) => `${DAYS[weekdayOf(date)].slice(0, 3)} ${ordinal(date.d)}`; // "Mon 28th"
export const longDayLabel = (date: Ymd) => `${DAYS[weekdayOf(date)]}, ${MONTHS[date.m]} ${date.d}, ${date.y}`; // "Friday, October 16, 2026"

export function formatTime(totalMin: number, hour12: boolean): string {
  const h = Math.floor(totalMin / 60);
  const mm = String(totalMin % 60).padStart(2, "0");
  if (!hour12) return `${String(h).padStart(2, "0")}:${mm}`;
  return `${h % 12 || 12}:${mm}${h < 12 ? "am" : "pm"}`;
}
export const formatRange = (startMin: number, hour12: boolean) =>
  `${formatTime(startMin, hour12)} – ${formatTime(startMin + MEETING.minutes, hour12)}`;

/* Ekta din-er available slot (minutes from midnight). Aj-er din hole bitey jaoa slot (ar lead time-er bhitorer) bad */
export function slotsFor(date: Ymd, now: Date): number[] {
  const today = ymdOf(now);
  const nowMin = now.getUTCHours() * 60 + now.getUTCMinutes();
  const out: number[] = [];
  for (let t = DAY_START_MIN; t + MEETING.minutes <= DAY_END_MIN; t += SLOT_STEP_MIN) {
    if (keyOf(date) < keyOf(today)) continue;
    if (sameDay(date, today) && t < nowMin + LEAD_TIME_MIN) continue;
    out.push(t);
  }
  return out;
}

export type BookingRequest = {
  name: string;
  email: string;
  notes: string;
  guests: string; // optional, comma separated email
  date: string; // "Friday, October 16, 2026"
  time: string; // "2:00pm – 2:30pm"
  timezone: string;
};

/* FALLBACK (Cal.com set up na thakle-i shudhu). Cal.com API key (server-e) thakle BookingWidget eta use kore na, bookViaCal() use kore (niche).
   Booking pathano. NEXT_PUBLIC_BOOKING_ENDPOINT set thakle (Formspree / nijer API / Cal.com proxy) shekhane JSON POST kore, "sent" return kore.
   Set na thakle WhatsApp (siteConfig.whatsappNumber) e details soho message khule, "whatsapp" return kore. Tai kono request harabe na. */
export async function sendBooking(req: BookingRequest): Promise<"sent" | "whatsapp"> {
  const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error("Booking request failed");
    return "sent";
  }
  const text = [
    `Hi Prographr, I'd like to book a call.`,
    `Name: ${req.name}`,
    `Email: ${req.email}`,
    `When: ${req.date}, ${req.time} (${req.timezone})`,
    req.guests ? `Guests: ${req.guests}` : "",
    req.notes ? `Notes: ${req.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  return "whatsapp";
}

/* ------------------------------------------------------------------------------------------------------------------
   Cal.com (Option 2): slot ar booking server route (/api/cal/*) diye ashe, API key kokhono browser-e jay na.
   Shob shomoy host-er (Asia/Dhaka) wall clock, "minutes from midnight" hishebe, tai calendar/time-list UI ager moto-i.
   ------------------------------------------------------------------------------------------------------------------ */
const pad2 = (n: number) => String(n).padStart(2, "0");

/* "2026-10-19" (m 0-based Ymd theke) */
export const dateKey = ({ y, m, d }: Ymd) => `${y}-${pad2(m + 1)}-${pad2(d)}`;
export const parseDateKey = (key: string): Ymd => {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m: m - 1, d };
};

export type MonthSlots = Record<string, number[]>; // "2026-10-19" -> [600, 630, ...] (Dhaka, minutes from midnight)
export type SlotsResult = { ok: true; slots: MonthSlots } | { ok: false; reason: "unconfigured" | "error" };

/* Ekta mash-er (+ calendar-er shesh hafta-r porer mash-er din gulo) available slot ane. 501 = server-e Cal.com set up nai */
export async function fetchSlots(view: { y: number; m: number }): Promise<SlotsResult> {
  const start = dateKey({ y: view.y, m: view.m, d: 1 });
  const end = dateKey(ymdOf(new Date(Date.UTC(view.y, view.m + 1, 7))));
  try {
    const res = await fetch(`/api/cal/slots?start=${start}&end=${end}`, { cache: "no-store" });
    if (res.status === 501) return { ok: false, reason: "unconfigured" };
    if (!res.ok) return { ok: false, reason: "error" };
    const json = (await res.json()) as { slots?: MonthSlots };
    return { ok: true, slots: json.slots ?? {} };
  } catch {
    return { ok: false, reason: "error" };
  }
}

/* Dhaka-r (date + minutes) -> UTC ISO. Cal.com booking-er `start` UTC-te hote hoy */
export const toUtcIso = ({ y, m, d }: Ymd, minutes: number) => new Date(Date.UTC(y, m, d) + (minutes - TZ_OFFSET_MIN) * 60000).toISOString();

export class SlotTakenError extends Error {}

export type CalBookingInput = { ymd: Ymd; minutes: number; name: string; email: string; notes: string; guests: string[] };

/* Real booking: Cal.com-e Google Calendar event + Google Meet link toiri hoy, confirmation email Cal.com nijei pathay */
export async function bookViaCal({ ymd, minutes, name, email, notes, guests }: CalBookingInput): Promise<void> {
  let timeZone: string | undefined;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // visitor-er email-e tar nijer timezone-e shomoy jabe
  } catch {
    /* ignore */
  }
  const res = await fetch("/api/cal/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start: toUtcIso(ymd, minutes), name, email, notes, guests, timeZone }),
  });
  if (res.ok) return;
  if (res.status === 409) throw new SlotTakenError();
  throw new Error("Booking failed");
}