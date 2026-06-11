import React, { useState } from "react";

// ── ASSET IMPORTS ──
import FamilyPic from "./assets/about-pic.jpg";

function ArtistAbout() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@200;300;400;500&display=swap');
                
                @keyframes ambientGrid {
                    0%, 100% { opacity: 0.12; }
                    50% { opacity: 0.22; }
                }
                @keyframes contentReveal { 
                    from { opacity: 0; transform: translateY(24px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                @keyframes borderExpand { 
                    from { transform: scaleX(0); } 
                    to { transform: scaleX(1); } 
                }

                .font-bebas  { font-family: 'Bebas Neue', sans-serif; }
                .font-outfit { font-family: 'Outfit', sans-serif; }

                .animate-reveal {
                    animation: contentReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .input-field {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px;
                    font-weight: 300;
                    padding: 12px 0;
                    color: rgba(255, 255, 255, 0.9);
                    outline: none;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .input-field:focus {
                    border-bottom-color: #c8a96e;
                    padding-left: 4px;
                }
                .input-field:focus + label {
                    color: #c8a96e;
                }
            `}</style>

            <div
                className="font-outfit min-h-screen w-full pt-12 text-white/80 flex flex-col relative overflow-x-hidden selection:bg-[#c8a96e]/30 selection:text-white"
                style={{
                    // Creates a deep vignette/spotlight effect rather than a flat fill
                    background: "radial-gradient(circle at 50% 30%, #121212 0%, #0a0a0a 50%, #050505 100%)"
                }}
            >

                {/* ── BACKGROUND GRID LINES ── */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 89px, rgba(255,255,255,0.012) 90px),
                                          repeating-linear-gradient(90deg, transparent 0px, transparent 89px, rgba(255,255,255,0.012) 90px)`,
                        animation: "ambientGrid 8s ease-in-out infinite"
                    }}
                />

                {/* Left side gold edge accent carried from Hero */}
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#c8a96e]/20 via-transparent to-[#c8a96e]/5 z-0" aria-hidden="true" />

                {/* ── MAIN BIOGRAPHY CONTAINER ── */}
                <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-28 flex flex-col gap-20 md:gap-32">

                    {/* SECTION 1: Header Titles */}
                    <div className="relative pb-8 animate-reveal" style={{ animationDelay: "0.1s" }}>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-1 h-1 rounded-full bg-[#c8a96e]" />
                            <span className="text-[10px] tracking-[0.3em] text-[#c8a96e] font-medium uppercase block">02 / BIOGRAPHY</span>
                        </div>
                        <h1 className="font-bebas text-[clamp(48px,8vw,110px)] leading-[0.85] text-white select-none uppercase m-0 tracking-[0.01em]">
                            MEET MICHAEL KRAPES
                        </h1>
                        <div
                            className="absolute bottom-0 left-0 h-[1px] bg-white/10 w-full origin-left"
                            style={{ animation: "borderExpand 1.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}
                        />
                    </div>

                    {/* SECTION 2: Split Layout (Image & Narrative Text) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Left Side: Family Pic Frame */}
                        <div className="lg:col-span-5 w-full animate-reveal" style={{ animationDelay: "0.25s" }}>
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

                        {/* Right Side: Detailed Narrative Copy */}
                        <div className="lg:col-span-7 flex flex-col gap-8 font-outfit text-white/60 font-light leading-relaxed text-[15px] md:text-[16px] animate-reveal" style={{ animationDelay: "0.4s" }}>
                            <p className="text-[20px] md:text-[22px] text-white/95 font-light leading-snug tracking-wide border-l-2 border-[#c8a96e] pl-6 py-1">
                                Michael beautifully weaves his life’s work with children and young people into deep, sensory mixed media artworks.
                            </p>
                            <p className="tracking-[0.01em]">
                                Having spent 32 years operating fluidly at the intersection of studio fine arts and clinical psychology, his paintings serve as a vibrant extension of his work as a psychologist specializing with children dealing with the layered complexities of being human.
                            </p>
                            <p className="tracking-[0.01em]">
                                For Michael, the canvas functions strictly as an interactive conversation. He intuitively translates memory fragments, personal associations, and raw emotional encounters by pulling whatever medium he can access into the space—layering structural patterns, symbolic text, language fragments, and fluid color profiles to visually map out journeys of growth, empathy, exploration, and emotional healing.
                            </p>
                        </div>
                    </div>

                    {/* SECTION 3: Timeline & Educational Roots Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 animate-reveal" style={{ animationDelay: "0.55s" }}>
                        <div className="group">
                            <span className="font-bebas text-xs tracking-[0.2em] text-[#c8a96e] block mb-2">1980 — THE START</span>
                            <h3 className="font-bebas text-2xl tracking-wide text-white m-0 mb-3 group-hover:text-[#c8a96e] transition-colors duration-300">BA STUDIO ART</h3>
                            <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed">
                                University of California, Irvine
                            </p>
                        </div>
                        <div className="group">
                            <span className="font-bebas text-xs tracking-[0.2em] text-[#c8a96e] block mb-2">1986 — INTERSECTION</span>
                            <h3 className="font-bebas text-2xl tracking-wide text-white m-0 mb-3 group-hover:text-[#c8a96e] transition-colors duration-300">MA PSYCHOLOGY</h3>
                            <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed">
                                United States International University
                            </p>
                        </div>
                        <div className="group">
                            <span className="font-bebas text-xs tracking-[0.2em] text-[#c8a96e] block mb-2">2006 — CLINICAL DEPTH</span>
                            <h3 className="font-bebas text-2xl tracking-wide text-white m-0 mb-3 group-hover:text-[#c8a96e] transition-colors duration-300">PSYD CLINICAL PSYCHOLOGY</h3>
                            <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed">
                                Alliant International University
                            </p>
                        </div>
                    </div>

                    {/* SECTION 4: Clean Modern Contact Form Grid */}
                    <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-white/10 pt-20 animate-reveal" style={{ animationDelay: "0.7s" }}>
                        {/* Contact Meta Details */}
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            <div>
                                <h2 className="font-bebas text-4xl tracking-wide text-white m-0 mb-3">COMMISSIONS &amp; INQUIRIES</h2>
                                <p className="font-outfit font-light text-sm text-white/50 m-0 leading-relaxed max-w-[320px]">
                                    Reach out to discuss customized projects, studio viewings, or specific analytical artwork inquiries.
                                </p>
                            </div>
                            <div className="text-xs font-light tracking-[0.18em] text-white/40 flex flex-col gap-3">
                                <a href="mailto:drkrapes@gmail.com" className="text-white/70 hover:text-[#c8a96e] transition-colors duration-300 no-underline">DRKRAPES@GMAIL.COM</a>
                                <span className="text-white/60">951-255-0298</span>
                                <a href="https://michaelkrapes.art" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#c8a96e] transition-colors duration-300 no-underline">MICHAELKRAPES.ART</a>
                            </div>
                        </div>

                        {/* Interactive Form fields */}
                        <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-10 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-1 relative">
                                    <label className="text-[10px] font-normal tracking-[0.25em] text-white/40 uppercase order-first transition-colors duration-300">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 relative">
                                    <label className="text-[10px] font-normal tracking-[0.25em] text-white/40 uppercase order-first transition-colors duration-300">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="input-field"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-[10px] font-normal tracking-[0.25em] text-white/40 uppercase order-first transition-colors duration-300">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="input-field resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-10 py-3.5 bg-[#c8a96e] text-[#0a0a0a] font-outfit font-normal text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#d4b87a] active:scale-[0.98] cursor-pointer"
                                    style={{ border: "none" }}
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </main>

                {/* ── FOOTER BAR ── */}
                <footer className="relative z-20 text-center py-6 border-t border-white/5 bg-[#050505]/60 backdrop-blur-md">
                    <p className="font-outfit font-light text-[9px] tracking-[0.25em] uppercase text-white/30 m-0">
                        © 2026 Michael Krapes · All Rights Reserved
                    </p>
                </footer>
            </div>
        </>
    );
}

export default ArtistAbout;