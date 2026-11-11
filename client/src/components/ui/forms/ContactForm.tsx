import React, { useState } from "react";

const STUDIO_EMAIL = "drkrapes@gmail.com";

// No mail server is configured yet, so the form opens the visitor's email
// app with the message pre-filled and addressed to the studio.
function ContactForm({ defaultSubject = "Website inquiry" }: { defaultSubject?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `${defaultSubject} — ${formData.name}`;
    const body = `${formData.message}\n\n— ${formData.name}\n${formData.email}`;
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
        className="lg:col-span-8 flex flex-col gap-10 w-full"
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
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 pt-4">
          {sent && (
            <p role="status" className="text-[11px] font-light tracking-wide text-white/50 m-0">
              Your email app should open with the message ready to send. If it didn't, write to {STUDIO_EMAIL}.
            </p>
          )}
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-3.5 bg-[#c8a96e] text-[#0a0a0a] font-outfit font-normal text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#d4b87a] active:scale-[0.98] cursor-pointer border-none"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
