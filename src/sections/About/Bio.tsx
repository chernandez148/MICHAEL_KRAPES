import React from "react";
import FamilyPic from "../../assets/profile-family.avif";

function Bio() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* SECTION: Bio */}
      <div
        className="lg:col-span-5 w-full animate-reveal"
        style={{ animationDelay: "0.25s" }}
      >
        <div className="relative border border-white/10 p-4 bg-[#111111]/80 backdrop-blur-md shadow-2xl group">
          <div className="absolute inset-0 bg-[#c8a96e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <img
            src={FamilyPic}
            alt="Michael Krapes Lifestyle"
            className="w-full h-auto object-cover grayscale contrast-[1.08] brightness-[0.85] transition-all duration-700"
          />
        </div>
        <span className="text-[10px] font-light tracking-[0.2em] text-white/40 uppercase block mt-4 text-center lg:text-left">
          Michael Krapes — Art, Legacy, and Human Connection.
        </span>
      </div>

      <div
        className="lg:col-span-7 flex flex-col gap-8 font-outfit text-white/60 font-light leading-relaxed text-[15px] md:text-[16px] animate-reveal"
        style={{ animationDelay: "0.4s" }}
      >
        <p className="text-[20px] md:text-[22px] text-white/95 font-light leading-snug tracking-wide border-l-2 border-[#c8a96e] pl-6 py-1">
          Michael beautifully weaves his life’s work with children and young
          people into deep, sensory mixed media artworks.
        </p>
        <p className="tracking-[0.01em]">
          Having spent 32 years operating fluidly at the intersection of studio
          fine arts and clinical psychology, his paintings serve as a vibrant
          extension of his work as a psychologist specializing with children
          dealing with the layered complexities of being human.
        </p>
        <p className="tracking-[0.01em]">
          For Michael, the canvas functions strictly as an interactive
          conversation. He intuitively translates memory fragments, personal
          associations, and raw emotional encounters by pulling whatever medium
          he can access into the space—layering structural patterns, symbolic
          text, language fragments, and fluid color profiles to visually map out
          journeys of growth, empathy, exploration, and emotional healing.
        </p>
      </div>
    </section>
  );
}

export default Bio;
