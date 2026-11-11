import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageShell from "../ui/PageShell";

export default function RootLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Start each page at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isHome) {
    return (
      <>
        <Navbar />
        <main className="relative z-10 flex-1">
          <Outlet />
        </main>
      </>
    );
  }

  return (
    <PageShell>
      <Navbar />
      <main className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-28 flex flex-col gap-20 md:gap-32 relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </PageShell>
  );
}
