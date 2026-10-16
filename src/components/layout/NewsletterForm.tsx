"use client";

import { useState } from "react";
import { RollButton } from "@/components/ui/RollButton";

/* Figma: "Frame 2147235602" (381 x 42, gap 8).
   Input = #F0F0F0, radius 12, padding 16, text 12px. Button = RollButton (#121212, inset shadow, arrow box 34 x 34) */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex w-full items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: ekhane newsletter API (Mailchimp / Resend / nijer route) connect korte hobe
        setDone(true);
      }}
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="Write your email here"
        className="h-[2.625rem] min-w-0 flex-1 rounded-xl bg-[#F0F0F0] px-4 text-xs leading-[1.5] text-black outline-none transition-shadow placeholder:text-black/70 focus-visible:ring-2 focus-visible:ring-black/30"
      />
      {/* Header-er "Book a call"-er moto ekoi hover animation (label roll + arrow beriye notun arrow dhuke) */}
      <RollButton type="submit" className="shrink-0">
        {done ? "Subscribed" : "Subscribe"}
      </RollButton>
    </form>
  );
}