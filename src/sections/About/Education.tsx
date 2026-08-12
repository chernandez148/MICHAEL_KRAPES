import React from "react";

function Education() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 animate-reveal"
      style={{ animationDelay: "0.55s" }}
    >
      {/* SECTION 3: Timeline & Educational */}

      <div className="group">
        <span className="font-bebas text-xs tracking-[0.2em] text-[#c8a96e] block mb-2">
          1980 — THE START
        </span>
        <h3 className="font-bebas text-2xl tracking-wide text-white m-0 mb-3 group-hover:text-[#c8a96e] transition-colors duration-300">
          BA STUDIO ART
        </h3>
        <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed">
          University of California, Irvine
        </p>
      </div>
      <div className="group">
        <span className="font-bebas text-xs tracking-[0.2em] text-[#c8a96e] block mb-2">
          1986 — INTERSECTION
        </span>
        <h3 className="font-bebas text-2xl tracking-wide text-white m-0 mb-3 group-hover:text-[#c8a96e] transition-colors duration-300">
          MA PSYCHOLOGY
        </h3>
        <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed">
          United States International University
        </p>
      </div>
      <div className="group">
        <span className="font-bebas text-xs tracking-[0.2em] text-[#c8a96e] block mb-2">
          2006 — CLINICAL DEPTH
        </span>
        <h3 className="font-bebas text-2xl tracking-wide text-white m-0 mb-3 group-hover:text-[#c8a96e] transition-colors duration-300">
          PSYD CLINICAL PSYCHOLOGY
        </h3>
        <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed">
          Alliant International University
        </p>
      </div>
    </section>
  );
}

export default Education;
