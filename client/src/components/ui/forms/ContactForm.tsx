import React, { useState } from "react";
import { sendContactMessage } from "../../../services/contact";

const STUDIO_EMAIL = "drkrapes@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";
function ContactForm({ defaultSubject = "Website inquiry" }: { defaultSubject?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot — hidden from people, filled in by bots
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage({ ...formData, subject: defaultSubject });
      setStatus("sent");
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };
  return (
    <div
      id="contact"
      className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-white/10 pt-20 animate-reveal"
      style={{ animationDelay: "0.7s" }}
    >
      {/* SECTION 4: Contact Form */}
      <div className="lg:col-span-4 flex flex-col gap-8">
        <div>
          <h2 className="font-bebas text-4xl tracking-wide text-white m-0 mb-3">
            COMMISSIONS &amp; INQUIRIES
          </h2>
          <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed max-w-[320px]">
            Reach out to discuss customized projects, studio viewings, or
            specific analytical artwork inquiries.
          </p>
        </div>
        <div className="text-xs font-light tracking-[0.18em] text-white/40 flex flex-col gap-3">
          <a
            href="mailto:drkrapes@gmail.com"
            className="text-white/70 hover:text-[#c8a96e] transition-colors duration-300 no-underline"
          >
            DRKRAPES@GMAIL.COM
          </a>
          <a
            href="tel:+19512550298"
            className="text-white/70 hover:text-[#c8a96e] transition-colors duration-300 no-underline"
          >
            951-255-0298
          </a>
          <a
            href="https://michaelkrapes.art"
            target="_blank"
            rel="noreferrer"
            className="text-white/70 hover:text-[#c8a96e] transition-colors duration-300 no-underline"
          >
            MICHAELKRAPES.ART
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="lg:col-span-8 flex flex-col gap-10 w-full relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-1 relative">
            <label className="text-[10px] font-normal tracking-[0.25em] text-white/40 uppercase order-first transition-colors duration-300" htmlFor="contact-name">
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              className="input-field"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-[10px] font-normal tracking-[0.25em] text-white/40 uppercase order-first transition-colors duration-300" htmlFor="contact-email">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className="input-field"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 relative">
          <label className="text-[10px] font-normal tracking-[0.25em] text-white/40 uppercase order-first transition-colors duration-300" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            className="input-field resize-none"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
        <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 pt-4">
          {status === "sent" && (
            <p role="status" className="text-[11px] font-light tracking-wide text-[#c8a96e] m-0">
              Thank you — your message was sent. The studio will be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-[11px] font-light tracking-wide text-red-300/90 m-0">
              Your message couldn't be sent. Please email{" "}
              <a href={`mailto:${STUDIO_EMAIL}`} className="text-red-200 underline">{STUDIO_EMAIL}</a> directly.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full md:w-auto px-10 py-3.5 bg-[#c8a96e] text-[#0a0a0a] font-outfit font-normal text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#d4b87a] active:scale-[0.98] cursor-pointer border-none disabled:opacity-50 disabled:cursor-wait"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
