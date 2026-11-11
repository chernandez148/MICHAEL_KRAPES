import { Link } from "react-router-dom";
import Header from "../components/ui/Header";
import ContactForm from "../components/ui/forms/ContactForm";

const steps = [
  {
    n: "01",
    title: "Conversation",
    body: "We start with a conversation about the story, person, or moment you want the work to hold — and the space it will live in.",
  },
  {
    n: "02",
    title: "Proposal",
    body: "Michael outlines size, materials, timeline, and pricing. A deposit secures your place in the studio schedule.",
  },
  {
    n: "03",
    title: "Studio Process",
    body: "The piece is built in layers — image, text, texture, and color. You'll receive progress updates along the way.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "The finished work is signed, documented, and carefully packed for shipping or arranged for local pickup.",
  },
];

export default function Commissions() {
  return (
    <>
      <Header breadcrumbs="03 / COMMISSIONS" title="COMMISSION A WORK" />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-reveal" style={{ animationDelay: "0.2s" }}>
        <p className="lg:col-span-7 text-[20px] md:text-[22px] text-white/90 font-light leading-snug tracking-wide border-l-2 border-[#c8a96e] pl-6 py-1 m-0">
          Commissioned pieces are personal from the first layer. Each one is a collaboration — your memories and
          meaning, translated through Michael's mixed media practice.
        </p>
        <p className="lg:col-span-5 font-light text-[15px] leading-relaxed text-white/55 m-0">
          Original commissions are available in a range of sizes on stretched canvas. Prefer something ready now?{" "}
          <Link to="/store" className="text-[#c8a96e] hover:text-[#d4b87a] no-underline">
            Browse available works
          </Link>
          .
        </p>
      </section>

      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-white/10 pt-16 animate-reveal"
        style={{ animationDelay: "0.4s" }}
      >
        {steps.map((s) => (
          <div key={s.n} className="group">
            <span className="font-bebas text-xs tracking-[0.2em] text-[#c8a96e] block mb-2">{s.n}</span>
            <h3 className="font-bebas text-2xl tracking-wide text-white m-0 mb-3 group-hover:text-[#c8a96e] transition-colors duration-300">
              {s.title}
            </h3>
            <p className="font-light text-sm text-white/50 m-0 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>

      <ContactForm defaultSubject="Commission inquiry" />
    </>
  );
}
