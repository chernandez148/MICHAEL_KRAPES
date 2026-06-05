import React from "react";
import { Routes, Route } from "react-router-dom";

// ── ASSET IMPORTS ──
import ProfilePic from "./assets/profile-pic.png";
import ArtPiece1 from "./assets/art-piece-1.avif"; // A heavily textured piece or pattern
import ArtPiece2 from "./assets/art-piece-2.avif"; // A piece featuring strokes or symbols

function ArtistHero() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@200;300;400&display=swap');
                .font-bebas  { font-family: 'Bebas Neue', sans-serif; }
                .font-outfit { font-family: 'Outfit', sans-serif; }

                @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
                @keyframes riseUp  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
                @keyframes zoomIn  { from { opacity:0; transform:scale(1.04) } to { opacity:1; transform:scale(1) } }

                .anim-name   { animation: fadeIn 1s ease both; }
                .anim-img    { animation: zoomIn 1.2s cubic-bezier(0.16,1,0.3,1) both; animation-delay:0.1s; }
                .anim-sub    { animation: riseUp 0.9s cubic-bezier(0.16,1,0.3,1) both; animation-delay:0.4s; }
                .anim-body   { animation: riseUp 0.9s cubic-bezier(0.16,1,0.3,1) both; animation-delay:0.55s; }
                .anim-btns   { animation: riseUp 0.9s cubic-bezier(0.16,1,0.3,1) both; animation-delay:0.7s; }

                .btn-primary {
                    font-family: 'Outfit', sans-serif;
                    font-weight: 400;
                    letter-spacing: 0.12em;
                    font-size: 11px;
                    background: #1c3a35;
                    color: #fff;
                    border: none;
                    padding: 13px 28px;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.1s;
                    text-transform: uppercase;
                }
                .btn-primary:hover { background: #142a26; }
                .btn-primary:active { transform: scale(0.97); }

                .btn-secondary {
                    font-family: 'Outfit', sans-serif;
                    font-weight: 300;
                    letter-spacing: 0.12em;
                    font-size: 11px;
                    background: transparent;
                    color: #1e1e1e;
                    border: 1px solid rgba(0,0,0,0.25);
                    padding: 13px 28px;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s, transform 0.1s;
                    text-transform: uppercase;
                }
                .btn-secondary:hover { border-color: #1e1e1e; background: rgba(0,0,0,0.02); }
                .btn-secondary:active { transform: scale(0.97); }

                .hero-name-text {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(60px, 13vw, 220px);
                    line-height: 1;
                    letter-spacing: 0.03em;
                    color: #1e1e1e;
                    white-space: nowrap;
                    user-select: none;
                }
            `}</style>

            {/* Locked 100vh Page Structure */}
            <div className="font-outfit h-screen w-full bg-[#ece8e1] text-[#1e1e1e] flex flex-col overflow-hidden relative">

                {/* ── BACKGROUND & ARTWORK LAYER SYSTEM ── */}

                {/* Layer 0: Structural technical grid lines */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(0deg,transparent 0px,transparent 79px,rgba(0,0,0,0.025) 80px),
                                          repeating-linear-gradient(90deg,transparent 0px,transparent 79px,rgba(0,0,0,0.025) 80px)`,
                    }}
                />

                {/* Layer 1: Asymmetric Background Artwork Fades with Edge Masks */}
                <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden select-none">
                    {/* Top Left Artwork */}
                    <img
                        src={ArtPiece1}
                        alt=""
                        className="absolute -top-[15%] -left-[15%] w-[65vw] h-auto max-w-[950px] opacity-[0.08] saturate-[0.15] blur-[1px] mix-blend-multiply"
                        style={{
                            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                            maskImage: "linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
                        }}
                    />

                    {/* Bottom Right Artwork */}
                    <img
                        src={ArtPiece2}
                        alt=""
                        className="absolute -bottom-[10%] -right-[10%] w-[55vw] h-auto max-w-[850px] opacity-[0.06] saturate-[0.1] mix-blend-multiply"
                        style={{
                            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
                        }}
                    />
                </div>

                {/* Layer 2/4: Responsive Background/Foreground Typography */}
                {/* Handled dynamically: z-4 on mobile (in front of portrait), z-2 on desktop (behind portrait) */}
                <div className="anim-name absolute inset-x-0 top-[28vh] flex justify-center pointer-events-none z-4 md:z-2 px-4">
                    <h1 className="hero-name-text text-center text-black/90 md:text-[#1e1e1e]">
                        MICHAEL KRAPES
                    </h1>
                </div>

                {/* Layer 3: Full-Bleed Portrait Backdrop */}
                {/* scale-75 shrinks him down 30% on mobile screens, md:scale-100 restores full size on desktop */}
                <div className="absolute inset-0 z-3 pointer-events-none opacity-95 transform scale-75 md:scale-100 origin-center transition-transform duration-500">
                    <img
                        src={ProfilePic}
                        alt="Michael Krapes"
                        className="anim-img w-full h-full object-cover object-center block saturate-[0.25] contrast-[1.05]"
                    />
                </div>


                {/* ── INTERACTIVE FOREGROUND LAYERS (z-10+) ── */}

                {/* Main Viewport Content Engine */}
                <main className="relative z-10 flex-1 flex flex-col items-center justify-end pb-[8vh]">

                    {/* Centered Overlay Content Card */}
                    <div className="flex flex-col items-center text-center px-6 max-w-xl">

                        {/* Concept Tagline */}
                        <h2 className="anim-sub font-bebas text-[#1e1e1e] tracking-[0.04em] text-[clamp(20px,3.2vw,38px)] m-0 mb-3 drop-shadow-sm leading-tight max-w-xl">
                            MIXED MEDIA INSPIRED BY PSYCHOLOGICAL &amp; ONTOLOGICAL TRANSFORMATION.
                        </h2>

                        {/* Thin rule split */}
                        <div className="anim-sub w-12 h-[0.5px] bg-black/30 mb-4" />

                        {/* Description block copy */}
                        <p className="anim-body font-outfit font-light text-[#222222] text-[clamp(13px,1.05vw,14px)] leading-relaxed mb-6 m-0 max-w-[540px]">
                            Bridging the gap between clinical insight and fine art, the canvas becomes an intuitive, raw conversation. Through a layered dialogue of images, symbols, textures, and patterns, each piece navigates a profound journey of psychological inquiry, human empathy, and creative transformation.
                        </p>

                        {/* CTA button links */}
                        <div className="anim-btns flex gap-3">
                            <button className="btn-primary shadow-sm">Explore Works</button>
                            <button className="btn-secondary shadow-sm">About Michael</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ArtistHero;