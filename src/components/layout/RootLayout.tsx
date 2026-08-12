// src/components/layout/RootLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageShell from "../ui/PageShell";

export default function RootLayout() {
  const location = useLocation();
  const isMinimalPage = location.pathname === "/" || location.pathname === "/cart";

  const content = (
    <>
      <Navbar />
      <main className="flex-1 z-10 relative">
        <Outlet />
      </main>
      {!isMinimalPage && <Footer />}
    </>
  );

  // If minimal page (home/cart), render plain content; otherwise render inside PageShell
  return isMinimalPage ? content : <PageShell>{content}</PageShell>;
}