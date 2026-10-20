"use client";

import { useState } from "react";
import { RollButton } from "@/components/ui/RollButton";

/* Figma: "Frame 2147235602" (381 x 42, gap 8).
   Input = #F0F0F0, radius 12, padding 16, text 12px. Button = RollButton (#121212, inset shadow, arrow box 34 x 34)

   Flow: client validate -> POST /api/subscribe -> loading / success / error state.
   Honeypot field ("website") bot-er jonno, manush dekhe na. */
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: value, website }),
      });
      if (res.status === 429) throw new Error("Too many attempts. Please try again in a few minutes.");
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setStatus("success");
      setMessage("Thanks for subscribing! Check your inbox for a confirmation email.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const done = status === "success";

  return (
    <div className="flex w-full flex-col gap-2">
      <form className="flex w-full items-center gap-2" onSubmit={onSubmit} noValidate>
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={done}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error" ? true : undefined}
          aria-describedby="footer-email-msg"
          placeholder="Write your email here"
          className="h-[2.625rem] min-w-0 flex-1 rounded-xl bg-[#F0F0F0] px-4 text-xs leading-[1.5] text-black outline-none transition-shadow placeholder:text-black/70 focus-visible:ring-2 focus-visible:ring-black/30 disabled:opacity-70"
        />

        {/* Honeypot: screen-er baire, keyboard/screen reader-e o ashe na */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <RollButton type="submit" disabled={status === "loading" || done} className="shrink-0">
          {status === "loading" ? "Subscribing…" : done ? "Subscribed" : "Subscribe"}
        </RollButton>
      </form>

      <p
        id="footer-email-msg"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`min-h-4 text-xs leading-[1.3] ${status === "error" ? "text-[#E5484D]" : "text-black/70"}`}
      >
        {message}
      </p>
    </div>
  );
}