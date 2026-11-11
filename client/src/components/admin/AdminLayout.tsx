import type { ReactNode } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, ExternalLink, Image, LogOut, Package } from "lucide-react";
import { clearAdminToken, getAdminToken } from "../../services/admin";

const nav = [
  { to: "/admin", label: "Overview", icon: BarChart3, end: true },
  { to: "/admin/orders", label: "Orders", icon: Package, end: false },
  { to: "/admin/products", label: "Works", icon: Image, end: false },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!getAdminToken()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  const logout = () => {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-outfit flex flex-col md:flex-row">
      <aside className="md:w-56 md:min-h-screen shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#0e0e0e] flex md:flex-col">
        <Link to="/admin" className="font-bebas text-2xl tracking-[0.18em] text-white no-underline px-6 py-5 md:py-8 shrink-0">
          MK <span className="text-[#c8a96e] text-sm tracking-[0.3em] align-middle">STUDIO</span>
        </Link>
        <nav className="flex md:flex-col flex-1 overflow-x-auto">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.2em] uppercase no-underline whitespace-nowrap transition-colors border-l-2 ${
                  isActive
                    ? "text-[#c8a96e] border-[#c8a96e] bg-white/[0.03]"
                    : "text-white/50 border-transparent hover:text-white"
                }`
              }
            >
              <Icon size={15} strokeWidth={1.5} aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex md:flex-col md:border-t border-white/10 md:py-4 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.2em] uppercase no-underline text-white/40 hover:text-white"
          >
            <ExternalLink size={15} strokeWidth={1.5} aria-hidden="true" /> View site
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white bg-transparent border-none cursor-pointer"
          >
            <LogOut size={15} strokeWidth={1.5} aria-hidden="true" /> <span className="hidden md:inline">Log out</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 px-5 md:px-10 py-8 md:py-12 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}

export function AdminTitle({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
      <h1 className="font-bebas text-4xl md:text-5xl tracking-wide text-white m-0">{title}</h1>
      {children}
    </div>
  );
}

export const STAGE_LABEL: Record<string, string> = {
  paid: "To ship",
  shipped: "Shipped",
  pending: "Unpaid",
  failed: "Abandoned",
  refunded: "Refunded",
};

export function StageBadge({ stage }: { stage: string }) {
  const tone =
    stage === "paid"
      ? "border-[#c8a96e]/60 text-[#c8a96e]"
      : stage === "shipped"
        ? "border-emerald-400/40 text-emerald-300/90"
        : "border-white/15 text-white/45";
  return (
    <span className={`inline-block border px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase whitespace-nowrap ${tone}`}>
      {STAGE_LABEL[stage] ?? stage}
    </span>
  );
}

export const money = (cents: number | null | undefined) =>
  cents == null
    ? "—"
    : (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: cents % 100 ? 2 : 0 });

export const shortDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

export const fieldClass =
  "w-full bg-transparent border border-white/15 focus:border-[#c8a96e] outline-none px-3 py-2.5 text-sm font-light text-white transition-colors";
export const labelClass = "block text-[10px] tracking-[0.22em] uppercase text-white/45 mb-2";
export const primaryButton =
  "px-6 py-3 bg-[#c8a96e] text-[#0a0a0a] text-[11px] tracking-[0.22em] uppercase border-none cursor-pointer hover:bg-[#d4b87a] transition-colors disabled:opacity-50 disabled:cursor-wait no-underline inline-block";
export const secondaryButton =
  "px-6 py-3 bg-transparent border border-white/20 text-white/75 text-[11px] tracking-[0.22em] uppercase cursor-pointer hover:border-white/50 hover:text-white transition-colors no-underline inline-block disabled:opacity-50";
