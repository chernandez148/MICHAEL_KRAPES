import React, { useState } from "react";
import { Link } from "react-router-dom";

// ── ASSET IMPORTS ──
import FamilyPic from "./assets/profile-family.avif"; // Your image with the grandchildren

function ArtistAbout() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@200;300;400&display=swap');
                .font-bebas  { font-family: 'Bebas Neue', sans-serif; }
                .font-outfit { font-family: 'Outfit', sans-serif; }

                @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
                @keyframes riseUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }

                .anim-fade { animation: fadeIn 0.8s ease both; }
                .anim-rise { animation: riseUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }

                .input-field {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-b: 1px solid rgba(0, 0, 0, 0.2);
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px;
                    padding: 10px 0;
                    color: #1e1e1e;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .input-field:focus {
                    border-b-color: #1c3a35;
                }
            `}</style>

            <div className="font-outfit min-h-screen w-full pt-12 bg-[#ece8e1] text-[#1e1e1e] flex flex-col relative overflow-x-hidden">

                {/* ── BACKGROUND GRID LINES ── */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(0deg,transparent 0px,transparent 79px,rgba(0,0,0,0.025) 80px),
                                          repeating-linear-gradient(90deg,transparent 0px,transparent 79px,rgba(0,0,0,0.025) 80px)`,
                    }}
                />

                {/* Subtly faded background art accent to maintain the digital atelier feel */}


                {/* ── MAIN BIOGRAPHY CONTAINER ── */}
                <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-8 md:px-14 py-12 md:py-20 flex flex-col gap-16 md:gap-24">

                    {/* SECTION 1: Header Titles */}
                    <div className="border-b border-black/5 pb-8 anim-rise" style={{ animationDelay: "0.1s" }}>
                        <span className="text-[10px] tracking-[0.3em] text-[#8a8278] uppercase block mb-2">02 / BIOGRAPHY</span>
                        <h1 className="font-bebas text-[clamp(45px,7vw,90px)] leading-none text-[#1e1e1e] uppercase m-0">
                            MEET MICHAEL KRAPES
                        </h1>
                    </div>

                    {/* SECTION 2: Split Layout (Image & Narrative Text) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left Side: Family Pic (With Grandchildren) Frame */}
                        <div className="lg:col-span-5 w-full anim-fade" style={{ animationDelay: "0.25s" }}>
                            <div className="relative border border-black/10 p-3 bg-[#ece8e1] shadow-sm">
                                <img
                                    src={FamilyPic}
                                    alt="Michael Krapes Lifestyle"
                                    className="w-full h-auto object-cover grayscale contrast-[1.05] saturate-[0.05]"
                                />
                            </div>
                            <span className="text-[9px] font-light tracking-widest text-[#8a8278] uppercase block mt-3 text-center lg:text-left">
                                Michael Krapes — Art, Legacy, and Human Connection.
                            </span>
                        </div>

                        {/* Right Side: Detailed Narrative Copy */}
                        <div className="lg:col-span-7 flex flex-col gap-6 font-outfit text-[#222222] font-light leading-relaxed text-[15px] anim-rise" style={{ animationDelay: "0.4s" }}>
                            <p className="text-[18px] text-[#1e1e1e] font-normal leading-snug">
                                Michael beautifully weaves his life’s work with children and young people into deep, sensory mixed media artworks.
                            </p>
                            <p>
                                Having spent 32 years operating fluidly at the intersection of studio fine arts and clinical psychology, his paintings serve as a vibrant extension of his work as a psychologist specializing with children dealing with the layered complexities of being human.
                            </p>
                            <p>
                                For Michael, the canvas functions strictly as an interactive conversation. He intuitively translates memory fragments, personal associations, and raw emotional encounters by pulling whatever medium he can access into the space—layering structural patterns, symbolic text, language fragments, and fluid color profiles to visually map out journeys of growth, empathy, exploration, and emotional healing.
                            </p>
                        </div>
                    </div>

                    {/* SECTION 3: Timeline & Educational Roots Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5 pt-12 anim-rise" style={{ animationDelay: "0.55s" }}>
                        <div>
                            <h3 className="font-bebas text-2xl tracking-wide text-[#1e1e1e] m-0 mb-4">1980 — THE START</h3>
                            <p className="font-outfit font-light text-sm text-[#444] m-0">
                                **BA Studio Art**<br />
                                University of California, Irvine
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bebas text-2xl tracking-wide text-[#1e1e1e] m-0 mb-4">1986 — INTERSECTION</h3>
                            <p className="font-outfit font-light text-sm text-[#444] m-0">
                                **MA Psychology**<br />
                                United States International University
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bebas text-2xl tracking-wide text-[#1e1e1e] m-0 mb-4">2006 — CLINICAL DEPTH</h3>
                            <p className="font-outfit font-light text-sm text-[#444] m-0">
                                **PsyD Clinical Psychology**<br />
                                Alliant International University
                            </p>
                        </div>
                    </div>

                    {/* SECTION 4: Clean Modern Contact Form Grid */}
                    <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-black/5 pt-16 anim-rise" style={{ animationDelay: "0.7s" }}>
                        {/* Contact Meta Details */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div>
                                <h2 className="font-bebas text-3xl tracking-wide text-[#1e1e1e] m-0 mb-2">COMMISSIONS &amp; INQUIRIES</h2>
                                <p className="font-outfit font-light text-sm text-[#555] m-0">
                                    Reach out to discuss customized projects, studio viewings, or specific analytical artwork inquiries.
                                </p>
                            </div>
                            <div className="text-xs font-light tracking-widest text-[#444] flex flex-col gap-2">
                                <a href="mailto:drkrapes@gmail.com" className="text-[#1e1e1e] hover:underline no-underline">drkrapes@gmail.com</a>
                                <span>951-255-0298</span>
                                <a href="https://michaelkrapes.art" target="_blank" rel="noreferrer" className="text-[#1e1e1e] hover:underline no-underline">michaelkrapes.art</a>
                            </div>
                        </div>

                        {/* Interactive Form fields */}
                        <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-8 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-medium tracking-widest text-[#8a8278] uppercase">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-medium tracking-widest text-[#8a8278] uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="input-field"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-medium tracking-widest text-[#8a8278] uppercase">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="input-field resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-10 py-3.5 bg-[#1c3a35] text-white font-outfit font-normal text-xs tracking-widest uppercase transition-background hover:bg-[#142a26] cursor-pointer"
                                    style={{ border: "none" }}
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </main>

                {/* ── FOOTER BAR ── */}
                <footer className="relative z-20 text-center py-5 border-t border-black/5 bg-[#ece8e1]/10 backdrop-blur-xs">
                    <p className="font-outfit font-light text-[9px] tracking-[0.25em] uppercase text-[#8a8278] m-0">
                        © 2026 Michael Krapes · All Rights Reserved
                    </p>
                </footer>
            </div>
        </>
    );
}

export default ArtistAbout;