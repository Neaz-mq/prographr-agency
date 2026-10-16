import { MEETING, TZ_OFFSET_MIN } from "@/lib/booking";

/* SERVER-ONLY helper (route handler-gulo import kore, browser-e kokhono jay na). Cal.com API v2 shared config.
   Env (shob server-side):
     CAL_LINK     = "username/event-slug" (jemon "prographr/20min"). Na dile ager NEXT_PUBLIC_CAL_LINK-i kaj korbe.
     CAL_API_KEY  = Cal.com API key (cal_live_...). Shudhu .env.local ar Vercel Environment Variables-e, kokhono browser/chat-e na. */

export const CAL_API = "https://api.cal.com/v2";
export const HOST_TZ = MEETING.timezone; // "Asia/Dhaka"
export const HOST_TZ_OFFSET_MIN = TZ_OFFSET_MIN;

export function calTarget(): { username: string; eventTypeSlug: string } | null {
  const link = (process.env.CAL_LINK || process.env.NEXT_PUBLIC_CAL_LINK || "").trim().replace(/^\/+|\/+$/g, "");
  const [username, eventTypeSlug] = link.split("/");
  if (!username || !eventTypeSlug) return null;
  return { username, eventTypeSlug };
}

export function calHeaders(version: string): Record<string, string> {
  const headers: Record<string, string> = {
    "cal-api-version": version,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const key = process.env.CAL_API_KEY?.trim();
  if (key) headers.Authorization = `Bearer ${key}`;
  return headers;
}