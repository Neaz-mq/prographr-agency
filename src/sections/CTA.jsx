import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function CTA() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="bg-white">
      <div className="md:px-10 3xl:px-60 2xl:px-60 xl:px-20 lg:px-14 mx-auto px-6  py-20 md:py-28">
        {/* Heading */}
        <h2
          className="text-[#0a0a0a] font-bold mb-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 6vw, 60px)",
          }}
        >
          Let's talk
        </h2>
        <p
          className="text-[#aaa] text-sm mb-12"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Ask us anything or just say hi.,
        </p>

        {/* Success Banner */}
        {status === "success" && (
          <div className="mb-8 px-5 py-4 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-sm rounded">
            ✓ Message sent! We'll get back to you within 24 hours.
          </div>
        )}

        {status === "error" && (
          <div className="mb-8 px-5 py-4 bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] text-sm rounded">
            ✗ Something went wrong. Please email us directly at
            contact.prographr@gmail.com
          </div>
        )}

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-12"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-3">
              <label
                className="text-[#0a0a0a] font-semibold text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex Rivera"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={status === "sending"}
                className="bg-transparent border-0 border-b border-[#ccc] pb-2 text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200 disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                className="text-[#0a0a0a] font-semibold text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                placeholder="alex.rivera@fintechstep.io"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={status === "sending"}
                className="bg-transparent border-0 border-b border-[#ccc] pb-2 text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200 disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-3">
            <label
              className="text-[#0a0a0a] font-semibold text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Message
            </label>
            <textarea
              required
              rows={1}
              placeholder="Hi there! We're looking to redesign..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              disabled={status === "sending"}
              className="bg-transparent border-0 border-b border-[#ccc] pb-2 text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200 resize-none disabled:opacity-50"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#0a0a0a] text-white text-sm font-medium px-6 py-3 hover:bg-[#222] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {status === "sending" ? "Sending..." : "Send Now"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
