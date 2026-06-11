import React from "react";
import ProfilePic from "./assets/profile-pic.png";

export default function ArtistHero() {
    return (
        <section
            className="font-outfit relative w-full overflow-hidden bg-[#0a0a0a] flex flex-col justify-between"
            style={{ height: "100svh", minHeight: 600 }}
            aria-label="Michael Krapes — Artist Portfolio"
        >
            {/* Portrait Background */}
            <img
                src={ProfilePic}
                alt="Michael Krapes in his studio"
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                style={{
                    filter: "grayscale(100%) contrast(1.08) brightness(0.82)",
                    transform: "scale(1.02)",
                    animation: "imgReveal 1.6s cubic-bezier(0.16,1,0.3,1) forwards",
                }}
            />

            {/* Ambient Dark Gradient Veil */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.70) 35%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.40) 100%)",
                }}
            />

            {/* Left vertical gold stripe */}
            <div
                className="absolute top-0 left-0 w-[3px] h-full bg-[#c8a96e] hidden sm:block"
                style={{ animation: "stripeIn 1s 0.6s cubic-bezier(0.16,1,0.3,1) both", transformOrigin: "top" }}
                aria-hidden="true"
            />

            {/* ── TOP HEADER LAYER ── */}
            <div className="relative z-10 w-full pt-24 px-6 sm:px-12 md:px-14 flex items-center justify-between gap-4">
                <div
                    className="flex items-center gap-2 sm:gap-3"
                    style={{ animation: "fadeUp 0.8s 0.9s both" }}
                    aria-hidden="true"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] shrink-0" />
                    <span className="font-outfit text-[9px] sm:text-[10px] font-normal tracking-[0.2em] sm:tracking-[0.22em] uppercase text-white/60">
                        Nxthing Is Made · CA
                    </span>
                </div>

                <div
                    className="font-outfit text-[9px] sm:text-[10px] font-light tracking-[0.16em] uppercase text-white/40"
                    style={{ animation: "fadeUp 0.8s 1.0s both" }}
                    aria-hidden="true"
                >
                    2024 — 2025
                </div>
            </div>

            {/* ── CENTRAL BRAND NAME LAYER ── */}
            <div className="relative z-10 w-full px-6 sm:px-12 md:px-14 flex-1 flex flex-col justify-center pt-12 sm:pt-20">
                <h1
                    className="font-bebas text-white select-none m-0 p-0 tracking-[0.01em]"
                    style={{
                        fontSize: "clamp(64px, 13vw, 170px)",
                        lineHeight: 0.88,
                        animation: "nameIn 1.1s 0.3s cubic-bezier(0.16,1,0.3,1) both",
                    }}
                    aria-label="Michael Krapes"
                >
                    MICHAEL<br />
                    <span
                        className="block h-[2px] sm:h-[3px] bg-[#c8a96e] w-[80px] sm:w-[120px] mt-2 mb-2 ml-[2px]"
                        style={{ animation: "accentIn 0.8s 0.9s both", transformOrigin: "left" }}
                        aria-hidden="true"
                    />
                    KRAPES
                </h1>
            </div>

            {/* ── BOTTOM META ROW LAYER ── */}
            <div className="relative z-10 w-full pb-10 sm:pb-14 px-6 sm:px-12 md:px-14 flex flex-col justify-end gap-6">
                <div
                    className="grid grid-cols-1 md:grid-cols-12 items-end gap-6 md:gap-12"
                    style={{ animation: "fadeUp 0.9s 0.85s both" }}
                >
                    <p className="font-outfit font-light leading-relaxed text-white/60 max-w-[460px] tracking-[0.01em] m-0 md:col-span-7 lg:col-span-8 text-sm md:text-xs lg:text-sm">
                        <strong className="font-medium text-white/95">
                            Psychological &amp; ontological transformation
                        </strong>{" "}
                        — rendered through mixed media. Layered symbols, textures, and raw imagery
                        that chart the interior landscape of the human condition.
                    </p>

                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto md:col-span-5 lg:col-span-4 shrink-0 sm:max-w-md">
                        <button className="flex-1 md:flex-initial font-outfit text-[10px] font-normal tracking-[0.2em] uppercase bg-[#c8a96e] text-[#0a0a0a] px-5 sm:px-8 py-3.5 transition-all duration-300 hover:bg-[#d4b87a] active:scale-[0.97] whitespace-nowrap text-center cursor-pointer border-none">
                            Explore Works
                        </button>
                        <button className="flex-1 md:flex-initial font-outfit text-[10px] font-light tracking-[0.2em] uppercase bg-transparent text-white/70 border border-white/20 px-5 sm:px-8 py-3.5 transition-all duration-300 hover:border-white/50 hover:text-white active:scale-[0.97] whitespace-nowrap text-center cursor-pointer">
                            About Michael
                        </button>
                    </div>
                </div>

                <div
                    className="w-full hidden sm:flex items-center justify-center pointer-events-none mt-4"
                    style={{ animation: "fadeUp 0.8s 1.3s both" }}
                    aria-hidden="true"
                >
                    <div
                        className="w-px h-8"
                        style={{
                            background: "linear-gradient(to bottom, rgba(200,169,110,0.8), transparent)",
                            animation: "scrollPulse 2s 1.5s ease-in-out infinite",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}