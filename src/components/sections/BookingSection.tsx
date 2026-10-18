import { BookingWidget } from "@/components/sections/BookingWidget";

/* Option 2: Figma-r nijer UI (BookingWidget) shob shomoy dekhay. Server-e CAL_API_KEY + CAL_LINK thakle real slot/booking Cal.com API theke,
na thakle widget ager moto local slot + WhatsApp mode-e cholbe. (Cal.com iframe embed ar lagche na, CalEmbed.tsx delete kora jay. okay) */
export function BookingSection() {
  return <BookingWidget />;
}