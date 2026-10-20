"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CloudImage } from "@/components/ui/CloudImage";
import {
  HOST,
  MAX_MONTHS_AHEAD,
  MEETING,
  SlotTakenError,
  bookViaCal,
  dateKey,
  dhakaNow,
  daysInMonth,
  fetchSlots,
  formatRange,
  formatTime,
  keyOf,
  longDayLabel,
  monthIndex,
  monthName,
  parseDateKey,
  sameDay,
  sendBooking,
  shortDayLabel,
  slotsFor,
  weekdayOf,
  ymdOf,
  type MonthSlots,
  type Ymd,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

/* Figma: Booking panel 1280 x 603, bg #171717, border #292929, radius 30. 3 column: meeting info (344) | calendar (591) | time list (345).
   Time slot select korle (Cal.com-er moto) calendar + time list-er jayga-y form ashe (Your name / Email / Notes -> Confirm).
   Shob shomoy host-er timezone (Asia/Dhaka) onujayi. Server render-e "ekhon" jana nai, tai calendar mount-er por ashe (hydration mismatch nai).

   Duita mode (mount-e /api/cal/slots check kore thik hoy):
   - "cal":   server-e CAL_LINK + CAL_API_KEY thakle. Slot gulo Cal.com theke, Confirm korle real booking (Google Calendar + Meet link + email).
   - "local": Cal.com set up na thakle (501). Ager moto fixed slot + WhatsApp / endpoint. */

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const scrollbar = "[scrollbar-width:thin] [scrollbar-color:#3B3B3B_transparent]";

type Step = "pick" | "form" | "done";
type Fields = { name: string; email: string; guests: string; notes: string };
type Errors = Partial<Record<"name" | "email" | "guests", string>>;
type Mode = "checking" | "cal" | "local";
type BookResult = "booked" | "sent" | "whatsapp";
type Cell = { ymd: Ymd; outside: boolean } | null;

export function BookingWidget() {
  const [now, setNow] = useState<Date | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<Ymd | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [hour12, setHour12] = useState(true);
  const [step, setStep] = useState<Step>("pick");
  const [fields, setFields] = useState<Fields>({ name: "", email: "", guests: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showGuests, setShowGuests] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [result, setResult] = useState<BookResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null); // jemon "slot-ta ekhon-i keu nilo"
  const [mode, setMode] = useState<Mode>("checking");
  const [availability, setAvailability] = useState<MonthSlots>({}); // "2026-10-19" -> [minutes...] (cal mode)
  const [loaded, setLoaded] = useState<Record<number, "ok" | "error">>({}); // monthIndex -> fetch result
  const inflight = useRef(new Set<number>());
  const initialised = useRef(false);

  /* Ekta mash-er slot Cal.com theke ane ar cache-e rakhe. Protita mash ek-bar-i fetch hoy (retry / slot_taken e abar) */
  const loadMonth = useCallback(async (v: { y: number; m: number }) => {
    const idx = monthIndex(v);
    inflight.current.add(idx);
    const r = await fetchSlots(v);
    inflight.current.delete(idx);
    if (r.ok) {
      setAvailability((prev) => ({ ...prev, ...r.slots }));
      setLoaded((prev) => ({ ...prev, [idx]: "ok" }));
    } else if (r.reason === "error") {
      setLoaded((prev) => ({ ...prev, [idx]: "error" }));
    }
    return r;
  }, []);

  useEffect(() => {
    setNow(dhakaNow());
    const id = window.setInterval(() => setNow(dhakaNow()), 60000); // slot-er "bite jaoa" ta update rakhe
    return () => window.clearInterval(id);
  }, []);

  // prothom mount-e: Cal.com ache kina dekhe, shobcheye kachher available din select + sei mash dekhao
  useEffect(() => {
    if (!now || initialised.current) return;
    initialised.current = true;
    const base = ymdOf(now);

    const startLocal = () => {
      let first = base;
      for (let i = 0; i < 14; i++) {
        const probe = ymdOf(new Date(Date.UTC(base.y, base.m, base.d + i)));
        if (slotsFor(probe, now).length) {
          first = probe;
          break;
        }
      }
      setMode("local");
      setSelected(first);
      setView({ y: first.y, m: first.m });
    };

    (async () => {
      let v = { y: base.y, m: base.m };
      for (let i = 0; i < 4; i++) {
        const r = await loadMonth(v); // aj-er mash-e slot na thakle porer mash khuje dekhe (max 4 mash)
        if (!r.ok) {
          if (r.reason === "unconfigured") return startLocal();
          setMode("cal");
          setView(v); // error state dekhabe, "Try again" diye retry kora jabe
          return;
        }
        const prefix = `${v.y}-${String(v.m + 1).padStart(2, "0")}-`;
        const firstKey = Object.keys(r.slots)
          .filter((k) => k.startsWith(prefix) && r.slots[k].length)
          .sort()[0];
        if (firstKey) {
          setMode("cal");
          setSelected(parseDateKey(firstKey));
          setView(v);
          return;
        }
        v = { y: new Date(Date.UTC(v.y, v.m + 1, 1)).getUTCFullYear(), m: new Date(Date.UTC(v.y, v.m + 1, 1)).getUTCMonth() };
      }
      setMode("cal"); // 4 mash-e kono slot nai
      setView({ y: base.y, m: base.m });
    })();
  }, [now, loadMonth]);

  // mash bodlale (cal mode) je mash ekhono ane nai, shetar slot ane. Error hole "Try again" loaded[idx] muche dey, tai abar fetch hoy
  useEffect(() => {
    if (mode !== "cal" || !view) return;
    const idx = monthIndex(view);
    if (loaded[idx] || inflight.current.has(idx)) return;
    void loadMonth(view);
  }, [mode, view, loaded, loadMonth]);

  const today = now ? ymdOf(now) : null;

  const cells = useMemo<Cell[]>(() => {
    if (!view) return [];
    const lead = weekdayOf({ ...view, d: 1 });
    const total = daysInMonth(view.y, view.m);
    const out: Cell[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= total; d++) out.push({ ymd: { ...view, d }, outside: false });
    // shesh hafta porjonto porer mash-er din diye bhore dei (Figma-r "OCT 1" ...)
    let next = 1;
    while (out.length % 7 !== 0) out.push({ ymd: ymdOf(new Date(Date.UTC(view.y, view.m + 1, next++))), outside: true });
    return out;
  }, [view]);

  // cal mode-e kono din select kora nai (jemon prothom fetch fail kore pore retry-te load holo, ba pore slot-ala mash-e gelo): oi mash-er prothom available din select
  useEffect(() => {
    if (mode !== "cal" || selected || !view || loaded[monthIndex(view)] !== "ok") return;
    const prefix = `${view.y}-${String(view.m + 1).padStart(2, "0")}-`;
    const first = Object.keys(availability)
      .filter((k) => k.startsWith(prefix) && availability[k].length)
      .sort()[0];
    if (first) setSelected(parseDateKey(first));
  }, [mode, selected, view, loaded, availability]);

  /* cal mode-e Cal.com-er slot, local mode-e fixed slot */
  const slotsOf = (ymd: Ymd): number[] => (mode === "cal" ? (availability[dateKey(ymd)] ?? []) : now ? slotsFor(ymd, now) : []);

  const slots = selected ? slotsOf(selected) : [];

  const dayOpen = (ymd: Ymd) => {
    if (!now || !today) return false;
    if (monthIndex(ymd) > monthIndex(today) + MAX_MONTHS_AHEAD) return false;
    return slotsOf(ymd).length > 0;
  };

  const monthState = mode === "cal" && view ? loaded[monthIndex(view)] : "ok"; // undefined = ekhono ashche
  const monthLoading = mode === "checking" || monthState === undefined;
  const retryMonth = () => {
    if (!view) return;
    const idx = monthIndex(view);
    setLoaded((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
  };

  const canPrev = !!view && !!today && monthIndex(view) > monthIndex(today);
  const canNext = !!view && !!today && monthIndex(view) < monthIndex(today) + MAX_MONTHS_AHEAD;
  const shift = (delta: number) => {
    if (!view) return;
    const d = new Date(Date.UTC(view.y, view.m + delta, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };

  const pickDay = (ymd: Ymd, outside: boolean) => {
    setSelected(ymd);
    if (outside) setView({ y: ymd.y, m: ymd.m });
  };

  const pickSlot = (t: number) => {
    setSlot(t);
    setNotice(null);
    setStep("form");
  };

  const update = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (key === "name" || key === "email" || key === "guests") setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected || slot === null || sending) return;
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "This field is required.";
    if (!fields.email.trim()) next.email = "This field is required.";
    else if (!EMAIL_RE.test(fields.email.trim())) next.email = "Please enter a valid email address.";
    const guests = fields.guests.split(/[,;\s]+/).filter(Boolean);
    if (guests.length > 5) next.guests = "You can add up to 5 guests.";
    else if (guests.some((g) => !EMAIL_RE.test(g))) next.guests = "Please enter valid email addresses.";
    setErrors(next);
    if (next.name || next.email || next.guests) return;

    setSending(true);
    setFailed(false);

    if (mode === "cal") {
      // Real booking: Cal.com-e (Google Calendar event + Meet link + confirmation email)
      bookViaCal({ ymd: selected, minutes: slot, name: fields.name.trim(), email: fields.email.trim(), notes: fields.notes.trim(), guests })
        .then(() => {
          setResult("booked");
          setStep("done");
        })
        .catch((err) => {
          if (err instanceof SlotTakenError) {
            // ei slot-ta keu ekhon-i niye nilo: list theke bad dei, month abar ane, pick step-e fire jai
            const key = dateKey(selected);
            setAvailability((prev) => ({ ...prev, [key]: (prev[key] ?? []).filter((t) => t !== slot) }));
            setLoaded((prev) => {
              const copy = { ...prev };
              delete copy[monthIndex(selected)];
              delete copy[monthIndex(view ?? selected)];
              return copy;
            });
            setSlot(null);
            setNotice("Sorry, that time was just booked by someone else. Please pick another time.");
            setStep("pick");
          } else {
            setFailed(true);
          }
        })
        .finally(() => setSending(false));
      return;
    }

    // local mode: sendBooking-er prothom ongsho (WhatsApp window.open) click-er shomoy-i cholte hobe, tai ekhane kono await nai
    sendBooking({
      name: fields.name.trim(),
      email: fields.email.trim(),
      guests: fields.guests.trim(),
      notes: fields.notes.trim(),
      date: longDayLabel(selected),
      time: formatRange(slot, true),
      timezone: MEETING.timezone,
    })
      .then((r) => {
        setResult(r);
        setStep("done");
      })
      .catch(() => setFailed(true))
      .finally(() => setSending(false));
  };

  const reset = () => {
    setStep("pick");
    setSlot(null);
    setResult(null);
    setFailed(false);
    setNotice(null);
    setErrors({});
    setFields({ name: "", email: "", guests: "", notes: "" });
    setShowGuests(false);
  };

  const showSummary = step !== "pick" && selected && slot !== null;

  return (
    <div className="flex flex-col overflow-hidden rounded-[1.5rem] border border-[#292929] bg-[#171717] text-[#C9C9C9] lg:min-h-[37.6875rem] lg:flex-row lg:rounded-[1.875rem]">
      {/* Meeting info */}
      <div className="flex shrink-0 flex-col justify-between gap-8 border-b border-[#292929] px-5 pb-7 pt-6 lg:w-[21.5rem] lg:border-b-0 lg:border-r lg:px-7 lg:pb-10 lg:pt-7">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-[0.6875rem]">
            {HOST.avatar ? (
              /* Figma: "Frame 2147258221" 30 x 30, bg #FFF, radius 100, kono border nai. Bhitore avatar export (26 x 29), circle-er majhkhane.
                 Shada bg ALADA ekta layer-e (0.5px bhitore, edge-e pouchay na): bg ar photo ek-i clip-e thakle bakano edge-e shada rim (fringe) dekha jay.
                 Photo ta 30.6px lomba, ektu bairey (bottom -0.3px) rakha, jeno circle-er niche-r edge-e kono faka na thake. Width = height x 26/29 (ratio thik).
                 sizes 78px: retina-te sharp thake (Cloudinary 3x porjonto width dey) */
              <span className="relative size-[1.875rem] shrink-0 overflow-hidden rounded-full">
                <span aria-hidden="true" className="absolute inset-[0.5px] rounded-full bg-white" />
                <CloudImage
                  src={HOST.avatar}
                  alt=""
                  width={26}
                  height={29}
                  sizes="78px"
                  quality={90}
                  className="absolute inset-x-0 bottom-[-0.3px] mx-auto h-[30.6px] w-[27.4px] max-w-none object-cover"
                />
              </span>
            ) : (
              <span aria-hidden="true" className="grid size-[1.875rem] place-items-center rounded-full border border-white bg-[#2B2B2B] text-sm font-semibold text-[#F3F3F3]">
                {HOST.name.charAt(0)}
              </span>
            )}
            <p className="text-[1.0963rem] font-semibold leading-[1.375rem] text-[#9A9A9A]">
              {HOST.name} {HOST.handle}
            </p>
          </div>
          <h3 className="max-w-[17.1rem] text-[1.575rem] font-semibold leading-[2.1875rem] text-[#C9C9C9]">{MEETING.title}</h3>
          <div className="flex flex-col gap-4 text-[1.0963rem] font-normal leading-[1.5625rem] text-[#C9C9C9]">
            <p>
              <strong className="font-semibold">Hard to imagine the scope?</strong> No worries, I’ll walk you through our workflow and share some client
              examples to give you a better idea!
            </p>
            <p>Let’s talk about your project! 👋</p>
          </div>
        </div>

        <ul className="flex flex-col gap-[0.8125rem] text-[1.0963rem] leading-[1.375rem] text-[#C9C9C9]">
          {showSummary ? (
            <li className="flex items-start gap-3">
              <IconCalendar className="mt-0.5 size-5 shrink-0" />
              <span>
                {longDayLabel(selected)}
                <br />
                {formatRange(slot, hour12)}
              </span>
            </li>
          ) : null}
          <li className="flex items-center gap-3">
            <IconClock className="size-5 shrink-0" />
            {MEETING.durationLabel}
          </li>
          <li className="flex items-center gap-3">
            <IconMeet className="size-5 shrink-0" />
            {MEETING.platform}
          </li>
          <li className="flex items-center gap-3">
            <IconGlobe className="size-5 shrink-0" />
            {MEETING.timezone}
          </li>
        </ul>
      </div>

      {step === "pick" ? (
        <>
          {/* Calendar */}
          <div className="flex min-w-0 flex-1 flex-col gap-6 border-b border-[#292929] px-4 pb-5 pt-5 sm:px-6 lg:gap-[2.05rem] lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between">
              <p className="text-[1.3rem] font-semibold leading-[1.625rem] text-[#F3F3F3]" aria-live="polite">
                {view ? (
                  <>
                    {monthName(view.m)} <span className="text-[#9A9A9A]">{view.y}</span>
                  </>
                ) : (
                  <span className="invisible">September 2026</span>
                )}
              </p>
              <div className="flex items-center gap-[2.5rem]">
                <NavButton label="Previous month" disabled={!canPrev} onClick={() => shift(-1)} />
                <NavButton label="Next month" disabled={!canNext} onClick={() => shift(1)} flip />
              </div>
            </div>

            <div className="flex flex-col gap-[1.37rem]">
              <div className="grid grid-cols-7 gap-[0.34rem]" aria-hidden="true">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="text-center text-[0.8rem] font-medium leading-[1.125rem] tracking-[0.077em] text-[#C9C9C9] sm:text-[0.89rem]">
                    {w}
                  </span>
                ))}
              </div>

              <div
                className={cn("grid grid-cols-7 gap-[0.34rem] transition-opacity duration-300", monthLoading && "opacity-50")}
                role="group"
                aria-label="Choose a date"
                aria-busy={monthLoading}
              >
                {view
                  ? cells.map((cell, i) => {
                      if (!cell) return <span key={`b${i}`} aria-hidden="true" className="aspect-square" />;
                      const { ymd, outside } = cell;
                      const open = dayOpen(ymd);
                      const isSelected = !!selected && sameDay(selected, ymd);
                      const isToday = !!today && sameDay(today, ymd);
                      return (
                        <button
                          key={keyOf(ymd)}
                          type="button"
                          disabled={!open}
                          aria-pressed={isSelected}
                          aria-label={longDayLabel(ymd)}
                          onClick={() => pickDay(ymd, outside)}
                          className={cn(
                            "relative grid aspect-square place-items-center rounded-[0.48rem] text-base transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[1.0963rem]",
                            isSelected
                              ? "bg-[#F3F3F3] text-[#111111]"
                              : open
                                ? "bg-[#454545] text-[#F3F3F3] hover:bg-[#5a5a5a]"
                                : "text-[#C9C9C9]/45",
                          )}
                        >
                          {outside && ymd.d === 1 ? (
                            <span className="absolute left-2 top-1.5 text-[0.7rem] font-bold uppercase leading-none sm:text-[0.82rem]">{monthName(ymd.m).slice(0, 3)}</span>
                          ) : null}
                          <span className={cn(outside && ymd.d === 1 && "translate-y-1")}>{ymd.d}</span>
                          {isToday ? (
                            <span aria-hidden="true" className={cn("absolute bottom-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full", isSelected ? "bg-[#111111]" : "bg-[#F3F3F3]")} />
                          ) : null}
                        </button>
                      );
                    })
                  : Array.from({ length: 35 }, (_, i) => <span key={i} aria-hidden="true" className="aspect-square" />)}
              </div>
            </div>
          </div>

          {/* Time list */}
          <div className="relative shrink-0 lg:w-[21.5625rem]">
            <div className="flex flex-col gap-[0.6875rem] px-4 pb-6 pt-4 sm:px-6 lg:absolute lg:inset-0 lg:px-[1.575rem]">
              <div className="flex items-center justify-between">
                <p className="text-[1.2329rem] font-semibold leading-6 text-[#C9C9C9]">{selected ? shortDayLabel(selected) : <span className="invisible">Mon 28th</span>}</p>
                <div className="flex gap-0.5 rounded-[0.68rem] bg-[#101010] p-1" role="group" aria-label="Time format">
                  {([true, false] as const).map((is12) => (
                    <button
                      key={String(is12)}
                      type="button"
                      aria-pressed={hour12 === is12}
                      onClick={() => setHour12(is12)}
                      className={cn(
                        "rounded-lg px-[0.48rem] py-[0.27rem] text-[0.96rem] leading-[1.1875rem] transition-colors",
                        hour12 === is12 ? "bg-[#202020] font-medium text-[#C9C9C9]" : "text-[#9A9A9A] hover:text-[#C9C9C9]",
                      )}
                    >
                      {is12 ? "12h" : "24h"}
                    </button>
                  ))}
                </div>
              </div>

              {notice ? (
                <p role="alert" className="flex items-start gap-1.5 text-sm leading-snug text-[#F87171]">
                  <IconInfo className="mt-0.5 size-4 shrink-0" />
                  {notice}
                </p>
              ) : null}

              <ul data-lenis-prevent className={cn("flex min-h-0 max-h-[22rem] flex-1 flex-col gap-[0.6875rem] overflow-y-auto pr-1 lg:max-h-none", scrollbar)}>
                {monthState === "error" ? (
                  <li className="flex flex-col items-center gap-3 py-6 text-center text-sm text-[#9A9A9A]" role="alert">
                    Couldn’t load available times.
                    <button
                      type="button"
                      onClick={retryMonth}
                      className="rounded-lg border border-[#3B3B3B] px-4 py-2 text-[0.95rem] font-medium text-[#C9C9C9] transition-colors hover:border-white hover:text-white"
                    >
                      Try again
                    </button>
                  </li>
                ) : monthLoading ? (
                  <li className="py-6 text-center text-sm text-[#9A9A9A]" aria-live="polite">
                    {mode === "checking" && !now ? " " : "Loading times…"}
                  </li>
                ) : slots.length ? (
                  slots.map((t) => (
                    <li key={t} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => pickSlot(t)}
                        className="h-11 w-full rounded-xl border border-[#3B3B3B] bg-[#101010] text-[1.0963rem] font-medium leading-[1.375rem] text-[#C9C9C9] transition-colors duration-200 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {formatTime(t, hour12)}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="py-6 text-center text-sm text-[#9A9A9A]">{now ? "No times available for this day." : " "}</li>
                )}
              </ul>
            </div>
          </div>
        </>
      ) : null}

      {step === "form" ? (
        <form onSubmit={submit} noValidate className="flex min-w-0 flex-1 flex-col gap-5 px-5 py-6 lg:px-8 lg:py-7">
          <Field label="Your name" required error={errors.name} htmlFor="bk-name">
            <input
              id="bk-name"
              name="name"
              autoComplete="name"
              value={fields.name}
              onChange={(e) => update("name")(e.target.value)}
              aria-invalid={!!errors.name}
              className={inputCls(!!errors.name)}
            />
          </Field>
          <Field label="Email address" required error={errors.email} htmlFor="bk-email">
            <input
              id="bk-email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) => update("email")(e.target.value)}
              aria-invalid={!!errors.email}
              className={inputCls(!!errors.email)}
            />
          </Field>
          <Field label="Additional notes" htmlFor="bk-notes">
            <textarea
              id="bk-notes"
              name="notes"
              rows={3}
              placeholder="Please share anything that will help prepare for our meeting."
              value={fields.notes}
              onChange={(e) => update("notes")(e.target.value)}
              className={cn(inputCls(false), "resize-y")}
            />
          </Field>

          {showGuests ? (
            <Field label="Guests" error={errors.guests} htmlFor="bk-guests">
              <input
                id="bk-guests"
                name="guests"
                placeholder="Email addresses, separated by commas"
                value={fields.guests}
                onChange={(e) => update("guests")(e.target.value)}
                aria-invalid={!!errors.guests}
                className={inputCls(!!errors.guests)}
              />
            </Field>
          ) : (
            <button
              type="button"
              onClick={() => setShowGuests(true)}
              className="flex w-fit items-center gap-2 rounded-lg px-2 py-1.5 text-[0.95rem] text-[#C9C9C9] transition-colors hover:bg-white/5 hover:text-white"
            >
              <IconUserPlus className="size-4" />
              Add guests
            </button>
          )}

          <div className="mt-auto flex flex-col gap-4">
            {failed ? <p role="alert" className="text-sm text-[#F87171]">Something went wrong. Please try again, or message us on WhatsApp.</p> : null}
            <p className="text-sm leading-snug text-[#9A9A9A]">We’ll only use your details to schedule this call.</p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setStep("pick")}
                className="rounded-lg px-4 py-2.5 text-[0.95rem] font-medium text-[#C9C9C9] transition-colors hover:bg-white/5 hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={sending}
                className="rounded-lg bg-[#F3F3F3] px-5 py-2.5 text-[0.95rem] font-medium text-[#111111] transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? "Sending…" : "Confirm"}
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {step === "done" ? (
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center" role="status">
          <span className="grid size-14 place-items-center rounded-full bg-[#22A559]/15 text-[#22A559]">
            <IconCheck className="size-7" />
          </span>
          <h4 className="text-2xl font-semibold text-[#F3F3F3]">{result === "booked" ? "You’re booked!" : result === "sent" ? "Request sent" : "One last step"}</h4>
          <p className="max-w-[24rem] text-[1.0963rem] leading-[1.5625rem] text-[#C9C9C9]">
            {result === "booked"
              ? `A calendar invite with the Google Meet link is on its way to ${fields.email.trim()}.`
              : result === "sent"
                ? "Thanks! We’ll confirm your call by email shortly."
                : "We opened WhatsApp with your details. Send the message to lock in your slot."}
          </p>
          {selected && slot !== null ? (
            <p className="text-sm text-[#9A9A9A]">
              {longDayLabel(selected)}, {formatRange(slot, hour12)} ({MEETING.timezone})
            </p>
          ) : null}
          <button type="button" onClick={reset} className="mt-2 rounded-lg px-4 py-2.5 text-[0.95rem] font-medium text-[#C9C9C9] transition-colors hover:bg-white/5 hover:text-white">
            Book another time
          </button>
        </div>
      ) : null}
    </div>
  );
}

const inputCls = (invalid: boolean) =>
  cn(
    "w-full rounded-[0.625rem] border bg-[#101010] px-3 py-2.5 text-base text-[#F3F3F3] outline-none transition-colors placeholder:text-[#6B6B6B] focus:border-[#C9C9C9]",
    invalid ? "border-[#F87171]" : "border-[#3B3B3B]",
  );

function Field({ label, required, error, htmlFor, children }: { label: string; required?: boolean; error?: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.95rem] font-medium leading-none text-[#C9C9C9]">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {error ? (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-[#F87171]">
          <IconInfo className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function NavButton({ label, disabled, onClick, flip }: { label: string; disabled: boolean; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-6 place-items-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-white",
        disabled ? "text-[#4B4B4B]" : "text-[#9A9A9A] hover:text-white",
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cn("size-5", flip && "-scale-x-100")} aria-hidden="true">
        <path d="M14.5 6l-6 6 6 6" />
      </svg>
    </button>
  );
}

type IconProps = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 7.5V12l3 1.75" />
    </svg>
  );
}
function IconGlobe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M2.75 12h18.5M12 2.75c2.6 2.6 3.9 5.7 3.9 9.25S14.6 18.65 12 21.25C9.4 18.65 8.1 15.55 8.1 12S9.4 5.35 12 2.75z" />
    </svg>
  );
}
function IconCalendar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  );
}
function IconInfo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </svg>
  );
}
function IconUserPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3 20c.6-3.6 3.2-5.5 6.5-5.5 1.4 0 2.6.3 3.6.9M18 8.5v6M15 11.5h6" />
    </svg>
  );
}
function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.2} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
/* Google Meet-er rongin camera icon (Figma: 4 ta shape) */
function IconMeet({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <rect x="1.1" y="4.4" width="12.05" height="10.96" rx="2.2" fill="#22A559" />
      <rect x="12.06" y="6.57" width="6.58" height="6.58" rx="1.1" fill="#F9C642" />
      <rect x="2.19" y="4.38" width="4.38" height="3.29" rx="1.1" fill="#2D74DA" />
      <rect x="3.29" y="12.05" width="4.38" height="3.29" rx="1.1" fill="#E9473F" />
    </svg>
  );
}