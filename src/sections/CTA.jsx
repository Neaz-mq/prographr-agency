import { useState } from "react";

export default function CTA() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">

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
        <p className="text-[#aaa] text-sm mb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
          Ask us anything or just say hi.,
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Name */}
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
                className="bg-transparent border-0 border-b border-[#ccc] pb-2 text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            {/* Email */}
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
                className="bg-transparent border-0 border-b border-[#ccc] pb-2 text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200"
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
              placeholder="Hi there! We are looking to redesign................................"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-transparent border-0 border-b border-[#ccc] pb-2 text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200 resize-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-[#0a0a0a] text-white text-sm font-medium px-6 py-3 hover:bg-[#222] transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {sent ? "Sent ✓" : "Send Now"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}