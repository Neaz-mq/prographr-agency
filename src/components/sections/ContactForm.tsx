"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { RollButton } from "@/components/ui/RollButton";
import { ChevronDownIcon, Dropdown } from "@/components/ui/Dropdown";
import { services } from "@/lib/services";
import { BUDGET_OPTIONS, COUNTRY_CODES, sendContact, whatsappUrl, type ContactRequest } from "@/lib/contact";
import { cn } from "@/lib/utils";

/* Figma (Frame 2147237473, 669 wide): field = label (20px / 120% / 500) -> 16px gap -> input (16px / 120%, placeholder black/70) -> 14px gap -> 1px #F0F0F0 line.
   Field-er majhe 24px gap. Email + WhatsApp ek row-e (gap 24). Last-e "Let's start talk" button. */

type FieldName = "email" | "service" | "details";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Figma: twemoji:flag-bangladesh 20 x 20 (Windows-e emoji flag dekha jay na, tai SVG) */
function BangladeshFlag() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden="true">
      <rect x="0" y="2.78" width="20" height="14.44" rx="2.5" fill="#006A4D" />
      <circle cx="9.9" cy="9.72" r="3.9" fill="#F42A41" />
    </svg>
  );
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ id, label, required, error, className, children }: FieldProps) {
  return (
    <div className={cn("group/field flex flex-col gap-[0.875rem]", className)}>
      <div className="flex flex-col gap-4">
        <label htmlFor={id} className="text-lg font-medium leading-[1.2] text-black sm:text-xl">
          {label}
          {required ? " *" : null}
        </label>
        {children}
      </div>
      {/* 1px line: focus-e kalo, error-e lal */}
      <div
        aria-hidden="true"
        className={cn(
          "h-px w-full transition-colors duration-300 motion-reduce:transition-none",
          error ? "bg-[#E5484D]" : "bg-chip group-focus-within/field:bg-ink"
        )}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="-mt-2 text-sm leading-[1.2] text-[#E5484D]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "block w-full bg-transparent p-0 text-base leading-[1.2] text-black outline-none placeholder:text-black/70";

export function ContactForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<ContactRequest & { code: string }>({
    name: "",
    email: "",
    code: COUNTRY_CODES[0].code,
    whatsapp: "",
    service: "",
    budget: "",
    details: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState(""); // bot trap: manush dekhe na, bot bhore dile server mail pathay na

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === values.code);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const next: Errors = {};
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (!values.service) next.service = "Please choose a service.";
    if (!values.details.trim()) next.details = "Please tell us a little about your project.";
    setErrors(next);

    const firstInvalid = (["email", "service", "details"] as const).find((k) => next[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const number = values.whatsapp.trim();
    const request: ContactRequest = {
      name: values.name.trim(),
      email: values.email.trim(),
      whatsapp: number ? `${values.code} ${number}` : "",
      service: values.service,
      budget: values.budget,
      details: values.details.trim(),
    };

    setStatus("sending");
    sendContact({ ...request, website: honeypot }).then(
      () => {
        setStatus("sent");
        setValues({ name: "", email: "", code: values.code, whatsapp: "", service: "", budget: "", details: "" });
      },
      () => setStatus("failed")
    );
  };

  const describedBy = (name: FieldName) => (errors[name] ? `${id(name)}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative flex w-full flex-col gap-10">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>
      <div className="flex flex-col gap-6">
        <Field id={id("name")} label="Full Name">
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field id={id("email")} label="Your Email" required error={errors.email}>
            <input
              id={id("email")}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="yourmail@gmail.com"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className={inputClass}
            />
          </Field>

          <Field id={id("whatsapp")} label="Whatsapp Number">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <Dropdown
                  id={id("code")}
                  name="code"
                  ariaLabel="Country code"
                  value={values.code}
                  onChange={(v) => set("code", v)}
                  options={COUNTRY_CODES.map((c) => ({ value: c.code, label: `${c.label} (${c.code})` }))}
                  className="h-5 w-auto justify-start gap-1.5"
                  renderTrigger={(_, open) => (
                    <>
                      {selectedCountry?.flag === "bd" ? <BangladeshFlag /> : null}
                      <span className="text-xs leading-[1.6] text-black/70">{values.code}</span>
                      <ChevronDownIcon
                        className={cn("size-3.5 text-black/70 transition-transform duration-300 motion-reduce:transition-none", open && "rotate-180")}
                      />
                    </>
                  )}
                />
              </div>
              <input
                id={id("whatsapp")}
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="13-23728238"
                value={values.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                className={cn(inputClass, "min-w-0 flex-1")}
              />
            </div>
          </Field>
        </div>

        <Field id={id("service")} label="Service" required error={errors.service}>
          <Dropdown
            id={id("service")}
            name="service"
            placeholder="Ex. Web Design"
            value={values.service}
            onChange={(v) => set("service", v)}
            options={services.map((sv) => ({ value: sv.title, label: sv.title }))}
            ariaRequired
            ariaInvalid={!!errors.service}
            ariaDescribedBy={describedBy("service")}
          />
        </Field>

        <Field id={id("budget")} label="Project Budget">
          <Dropdown
            id={id("budget")}
            name="budget"
            placeholder="Ex. $20K - $50K"
            value={values.budget}
            onChange={(v) => set("budget", v)}
            options={BUDGET_OPTIONS.map((bo) => ({ value: bo, label: bo }))}
          />
        </Field>

        <Field id={id("details")} label="Project Details" required error={errors.details}>
          <textarea
            id={id("details")}
            name="details"
            rows={4}
            placeholder="I want to redesign my website.."
            value={values.details}
            onChange={(e) => set("details", e.target.value)}
            aria-required="true"
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={describedBy("details")}
            className={cn(inputClass, "h-[5.5rem] resize-none")}
          />
        </Field>
      </div>

      <div className="flex flex-col items-start gap-4">
        <RollButton type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Let’s start talk"}
        </RollButton>

        <div role="status" aria-live="polite" className="text-sm leading-[1.5] text-black/70">
          {status === "sent" ? "Thank you! We received your message and will get back to you within 24 hours." : null}
          {status === "failed" ? (
            <span className="text-[#E5484D]">
              Something went wrong. Please try again, or{" "}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                message us on WhatsApp
              </a>
              .
            </span>
          ) : null}
        </div>
      </div>
    </form>
  );
}