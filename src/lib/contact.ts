import { siteConfig } from "@/lib/site";

/* Contact page form (ContactForm.tsx) config + pathano. Figma: "Have a Project in Mind? Let's Talk" */

export type ContactRequest = {
  name: string;
  email: string;
  whatsapp: string; // country code shoho, jemon "+880 13-23728238". Optional
  service: string;
  budget: string; // optional
  details: string;
};

/* WhatsApp number-er country code. Figma default: Bangladesh (+880). `flag: "bd"` hole ContactForm-e Bangladesh-er flag dekhay */
export const COUNTRY_CODES = [
  { code: "+880", label: "Bangladesh", flag: "bd" as const },
  { code: "+1", label: "United States / Canada" },
  { code: "+44", label: "United Kingdom" },
  { code: "+61", label: "Australia" },
  { code: "+49", label: "Germany" },
  { code: "+65", label: "Singapore" },
  { code: "+91", label: "India" },
  { code: "+92", label: "Pakistan" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+971", label: "United Arab Emirates" },
] as { code: string; label: string; flag?: "bd" }[];

/* Figma-te sudhu placeholder ("Ex. $20K - $50K") ache, option list PLACEHOLDER (design/pricing onujayi change koro) */
export const BUDGET_OPTIONS = ["Under $5K", "$5K - $10K", "$10K - $20K", "$20K - $50K", "$50K+"];

/* Form pathano: POST /api/contact (app/api/contact/route.ts), shekhane server Gmail SMTP diye CONTACT_TO_EMAIL-e mail pathay.
   Fail hole (SMTP set up na thakle 501, network, rate limit) error throw kore, ContactForm "WhatsApp-e message korun" link shoho error dekhay. */
export async function sendContact(req: ContactRequest & { website?: string }): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error(`Contact request failed (${res.status})`);
}

/* Fallback: form kaj na korle user-ke ei link-e WhatsApp-e kotha bolte bolbo */
export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;