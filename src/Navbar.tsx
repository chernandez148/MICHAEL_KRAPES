import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const cartCount = useSelector(
        (state: { cart: { items: unknown[] } }) => state.cart.items.length
    );

    const navItems = ["Home", "Gallery", "Commissions", "Collections", "About", "Contact"];

    return (
        <>
            {/* Prevent background body scroll when drawer is active */}
            <style>{`
                body {
                    overflow: ${isOpen ? "hidden" : "auto"};
                }
            `}</style>

            <nav className="absolute w-full z-40 flex items-center justify-between px-6 md:px-14 py-6 border-b border-black/5 bg-[#ece8e1]/40 backdrop-blur-sm">
                {/* Brand Logo */}
                <Link to="/" className="font-bebas text-[22px] tracking-widest text-[#1e1e1e] no-underline">
                    MK
                </Link>

                {/* Desktop Navigation Links (Hidden on Mobile) */}
                <ul className="hidden md:flex gap-8 list-none m-0 p-0">
                    {navItems.map(item => (
                        <li key={item}>
                            <Link
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="font-outfit font-light text-[10px] tracking-[0.2em] uppercase text-[#444] hover:text-[#1e1e1e] no-underline transition-colors"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side Action Items (Cart & Hamburger Toggle) */}
                <div className="flex items-center gap-5">
                    {/* Cart Icon — Always accessible */}
                    <Link to="/cart" className="relative text-[#1e1e1e] hover:text-[#1c3a35] transition-colors z-40">
                        <ShoppingBag size={18} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-[#1c3a35] text-white font-outfit text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger Toggle Button — Mobile Only */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden text-[#1e1e1e] hover:text-[#1c3a35] transition-colors focus:outline-none"
                        aria-label="Open Menu"
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <Menu size={20} strokeWidth={1.5} />
                    </button>
                </div>
            </nav>

            {/* ── HIGH-END MOBILE SLIDE-IN SIDEBAR DRAWER SYSTEM ── */}

            {/* 1. Translucent Backdrop Overlay blur background */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/15 backdrop-blur-xs z-50 transition-opacity duration-400 ease-in-out md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* 2. Slide-In Panel Drawer Container */}
            <div
                className={`fixed top-0 right-0 h-screen w-[75vw] max-w-[320px] bg-[#ece8e1] border-l border-black/5 z-50 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-400 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer Top Row Header with Exit Trigger Close Button */}
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#1e1e1e] hover:text-[#1c3a35] transition-colors focus:outline-none"
                        aria-label="Close Menu"
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Main Sidebar Navigation Tree */}
                <ul className="flex flex-col gap-7 list-none m-0 p-0 pl-4 flex-1 justify-center">
                    {navItems.map((item, idx) => (
                        <li
                            key={item}
                            className="transition-transform duration-400"
                            style={{
                                transform: isOpen ? "translateX(0)" : "translateX(20px)",
                                transitionDelay: `${idx * 50}ms`
                            }}
                        >
                            <Link
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="font-outfit font-light text-[15px] tracking-[0.22em] uppercase text-[#444] hover:text-[#1e1e1e] no-underline block py-1"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Minimalist Context Footer Section inside drawer */}
                <div className="pl-4 border-t border-black/5 pt-6 opacity-60">
                    <span className="font-bebas text-lg tracking-widest block mb-1">M K</span>
                    <span className="font-outfit text-[9px] tracking-widest text-[#8a8278] uppercase">Studio Atelier</span>
                </div>
            </div>
        </>
    );
}