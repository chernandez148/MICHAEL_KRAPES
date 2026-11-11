import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { getAdminProducts, type AdminProduct } from "../../services/admin";
import { AdminTitle, money, primaryButton } from "../../components/admin/AdminLayout";

const FILTERS = [
  { key: "store", label: "In store" },
  { key: "available", label: "Available" },
  { key: "sold", label: "Sold" },
  { key: "archived", label: "Hidden" },
] as const;
type Filter = (typeof FILTERS)[number]["key"];

const matches: Record<Filter, (p: AdminProduct) => boolean> = {
  store: (p) => p.active,
  available: (p) => p.active && !p.sold,
  sold: (p) => p.active && p.sold,
  archived: (p) => !p.active,
};

function statusOf(p: AdminProduct) {
  if (!p.active) return { label: "Hidden", tone: "border-white/15 text-white/40" };
  if (p.sold) return { label: "Sold", tone: "border-white/25 text-white/60" };
  return { label: "Available", tone: "border-[#c8a96e]/60 text-[#c8a96e]" };
}

export default function Products() {
  const [filter, setFilter] = useState<Filter>("store");
  const { data, isLoading, isError } = useQuery({ queryKey: ["admin-products"], queryFn: getAdminProducts });
  const shown = (data ?? []).filter(matches[filter]);

  return (
    <>
      <AdminTitle title="Works">
        <Link to="/admin/products/new" className={`${primaryButton} inline-flex items-center gap-2`}>
          <Plus size={14} strokeWidth={2} /> Add work
        </Link>
      </AdminTitle>

      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter works">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase border cursor-pointer transition-colors ${
              filter === f.key ? "border-[#c8a96e] text-[#c8a96e] bg-[#c8a96e]/5" : "border-white/15 text-white/55 bg-transparent hover:text-white"
            }`}
          >
            {f.label} {data && <span className="text-white/35">{data.filter(matches[f.key]).length}</span>}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-pulse">
          {[1, 2, 3, 4].map((i) => <div key={i} className="aspect-[4/5] bg-white/5" />)}
        </div>
      ) : isError ? (
        <p role="alert" className="text-sm text-red-300/90">Couldn't load works from Stripe.</p>
      ) : shown.length === 0 ? (
        <p className="text-sm font-light text-white/40 border border-white/10 py-16 text-center m-0">No works here.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 list-none m-0 p-0">
          {shown.map((p) => {
            const s = statusOf(p);
            return (
              <li key={p.id}>
                <Link to={`/admin/products/${p.id}`} className="group block no-underline border border-white/10 hover:border-[#c8a96e]/50 transition-colors bg-[#111111]">
                  <div className="aspect-[4/5] bg-white/5 overflow-hidden">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt="" loading="lazy" className={`w-full h-full object-cover ${p.active ? "" : "opacity-40"}`} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] tracking-[0.2em] uppercase text-white/25">No image</div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col gap-2">
                    <span className="text-sm text-white/85 truncate group-hover:text-[#c8a96e]">{p.name}</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-white/60">{money(p.price)}</span>
                      <span className={`border px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase ${s.tone}`}>{s.label}</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
