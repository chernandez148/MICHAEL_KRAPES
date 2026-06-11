import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === "/";

    const cartCount = useSelector(
        (state: { cart: { items: unknown[] } }) => state.cart.items.length
    );

    const navItems = ["Home", "Gallery", "Commissions", "Collections", "About", "Contact"];

    // Refined Dark Color Palette for Sub-routes (Replacing harsh stark white)
    const theme = {
        navBg: isHome
            ? "bg-transparent"
            : "bg-[#0c0c0c]/90 border-b border-white/[0.04] shadow-2xl backdrop-blur-md",
        drawerBg: "bg-[#0e0e0e]",
        drawerBorder: "border-white/[0.05]",
        logoText: "text-white tracking-[0.18em]",
        linkText: "text-white/45 hover:text-white",
        activeLinkText: "text-[#c8a96e] font-medium tracking-[0.22em]",
        iconColor: "text-white/75 hover:text-[#c8a96e]",
        cartBadgeBg: "bg-[#c8a96e] text-[#0a0a0a]",
    };

    return (
        <>
            {/* Lock body scroll layer when mobile panel layout mounts */}
            <style>{`
                body {
                    overflow: ${isOpen ? "hidden" : "auto"};
                }
                .font-bebas { font-family: 'Bebas Neue', sans-serif; }
                .font-outfit { font-family: 'Outfit', sans-serif; }
            `}</style>

            <nav className={`absolute top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-14 py-6 transition-all duration-500 ${theme.navBg}`}>
                {/* Brand Logo */}
                <Link to="/" className={`font-bebas text-[24px] no-underline transition-colors duration-300 ${theme.logoText}`}>
                    MK
                </Link>

                {/* Desktop Menu Routing Stack */}
                <ul className="hidden md:flex gap-9 list-none m-0 p-0">
                    {navItems.map(item => {
                        const itemPath = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                        const isActive = location.pathname === itemPath;
                        return (
                            <li key={item}>
                                <Link
                                    to={itemPath}
                                    className={`font-outfit font-light text-[11px] uppercase no-underline transition-all duration-300 relative pb-1 block tracking-[0.22em] ${isActive ? theme.activeLinkText : theme.linkText
                                        }`}
                                >
                                    {item}
                                    {/* Subtle underlining element layer for active routes */}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-3 h-[1px] bg-[#c8a96e]" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Side Control Utility Stack */}
                <div className="flex items-center gap-6">
                    {/* Cart Icon Link */}
                    <Link to="/cart" className={`relative transition-colors duration-300 ${theme.iconColor}`}>
                        <ShoppingBag size={17} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className={`absolute -top-1.5 -right-2 font-outfit text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold shadow-md transition-colors duration-300 ${theme.cartBadgeBg}`}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger Trigger Menu (Mobile Only) */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`md:hidden transition-colors duration-300 focus:outline-none ${theme.iconColor}`}
                        aria-label="Open Menu"
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <Menu size={20} strokeWidth={1.5} />
                    </button>
                </div>
            </nav>

            {/* ── MOBILE SYSTEM OVERLAY DRAWER ── */}

            {/* Dark Backdrop Mask */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out md:hidden ${isOpen
                        ? "bg-black/70 backdrop-blur-xs opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Slideout Container Grid */}
            <div
                className={`fixed top-0 right-0 h-screen w-[78vw] max-w-[320px] z-50 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) border-l md:hidden ${theme.drawerBg} ${theme.drawerBorder} ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Overlay Triggers */}
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`transition-colors focus:outline-none ${theme.iconColor}`}
                        aria-label="Close Menu"
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Mobile Link Lists */}
                <ul className="flex flex-col gap-6 list-none m-0 p-0 pl-4 flex-1 justify-center">
                    {navItems.map((item, idx) => {
                        const itemPath = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                        const isActive = location.pathname === itemPath;
                        return (
                            <li
                                key={item}
                                className="transition-transform duration-500"
                                style={{
                                    transform: isOpen ? "translateX(0)" : "translateX(24px)",
                                    transitionDelay: `${idx * 40}ms`
                                }}
                            >
                                <Link
                                    to={itemPath}
                                    onClick={() => setIsOpen(false)}
                                    className={`font-outfit font-light text-[14px] uppercase no-underline block py-2 tracking-[0.2em] transition-colors duration-300 ${isActive ? theme.activeLinkText : theme.linkText
                                        }`}
                                >
                                    {item}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Footer Element */}
                <div className={`pl-4 border-t pt-6 ${theme.drawerBorder}`}>
                    <span className={`font-bebas text-xl block mb-1 tracking-[0.15em] ${theme.logoText}`}>M K</span>
                    <span className="font-outfit text-[9px] tracking-widest uppercase text-white/30">Studio Atelier</span>
                </div>
            </div>
        </>
    );
}