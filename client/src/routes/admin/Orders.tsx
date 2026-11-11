import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/admin";
import { AdminTitle, StageBadge, money, secondaryButton, shortDate } from "../../components/admin/AdminLayout";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "paid", label: "To ship" },
  { key: "shipped", label: "Shipped" },
  { key: "refunded", label: "Refunded" },
  { key: "failed", label: "Abandoned" },
];
const PAGE = 50;

export default function Orders() {
  const [stage, setStage] = useState("all");
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-orders", stage, offset],
    queryFn: () => getOrders(stage, offset),
  });

  return (
    <>
      <AdminTitle title="Orders" />

      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter orders">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={stage === f.key}
            onClick={() => { setStage(f.key); setOffset(0); }}
            className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase border cursor-pointer transition-colors ${
              stage === f.key ? "border-[#c8a96e] text-[#c8a96e] bg-[#c8a96e]/5" : "border-white/15 text-white/55 bg-transparent hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="h-64 bg-white/5 animate-pulse" />
      ) : isError || !data ? (
        <p role="alert" className="text-sm text-red-300/90">Couldn't load orders.</p>
      ) : data.orders.length === 0 ? (
        <p className="text-sm font-light text-white/40 border border-white/10 py-16 text-center m-0">No orders here.</p>
      ) : (
        <>
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="text-left text-[10px] tracking-[0.2em] uppercase text-white/40">
                  <th className="font-normal px-4 py-3">Order</th>
                  <th className="font-normal px-4 py-3">Date</th>
                  <th className="font-normal px-4 py-3">Buyer</th>
                  <th className="font-normal px-4 py-3">Works</th>
                  <th className="font-normal px-4 py-3">Status</th>
                  <th className="font-normal px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((o) => (
                  <tr key={o.id} className="border-t border-white/10 hover:bg-white/[0.03]">
                    <td className="px-4 py-3">
                      <Link to={`/admin/orders/${o.id}`} className="text-[#c8a96e] no-underline hover:text-[#d4b87a]">#{o.id}</Link>
                    </td>
                    <td className="px-4 py-3 text-white/55 whitespace-nowrap">{shortDate(o.created_at)}</td>
                    <td className="px-4 py-3">
                      <span className="block text-white/85">{o.customer_name || "Guest"}</span>
                      <span className="block text-xs text-white/40">{o.ship_to}</span>
                    </td>
                    <td className="px-4 py-3 text-white/60 font-light max-w-[220px] truncate">{o.items.join(", ")}</td>
                    <td className="px-4 py-3"><StageBadge stage={o.stage} /></td>
                    <td className="px-4 py-3 text-right text-white whitespace-nowrap">{money(o.amount_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.total > PAGE && (
            <div className="flex items-center justify-between mt-6 text-xs text-white/45">
              <span>{offset + 1}–{Math.min(offset + PAGE, data.total)} of {data.total}</span>
              <div className="flex gap-2">
                <button type="button" className={secondaryButton} disabled={offset === 0} onClick={() => setOffset(offset - PAGE)}>Previous</button>
                <button type="button" className={secondaryButton} disabled={offset + PAGE >= data.total} onClick={() => setOffset(offset + PAGE)}>Next</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
