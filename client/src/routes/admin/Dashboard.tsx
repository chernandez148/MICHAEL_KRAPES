import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics, type OrderRow } from "../../services/admin";
import RevenueChart from "../../components/admin/RevenueChart";
import { AdminTitle, StageBadge, money, shortDate } from "../../components/admin/AdminLayout";

const RANGES = [
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
  { days: 365, label: "12 months" },
  { days: 0, label: "All time" },
];

function Tile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="border border-white/10 bg-[#111111] p-5 flex flex-col gap-1">
      <span className="text-[10px] tracking-[0.22em] uppercase text-white/45">{label}</span>
      <span className="font-bebas text-4xl text-white tracking-wide leading-none mt-1">{value}</span>
      {note && <span className="text-[11px] font-light text-white/40">{note}</span>}
    </div>
  );
}

function OrderList({ orders, empty }: { orders: OrderRow[]; empty: string }) {
  if (!orders.length) return <p className="text-sm font-light text-white/40 m-0">{empty}</p>;
  return (
    <ul className="list-none m-0 p-0 divide-y divide-white/10 border-y border-white/10">
      {orders.map((o) => (
        <li key={o.id}>
          <Link to={`/admin/orders/${o.id}`} className="flex items-center gap-4 py-3 no-underline hover:bg-white/[0.03] px-2 -mx-2">
            <span className="text-white/40 text-xs w-10 shrink-0">#{o.id}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm text-white/85 truncate">{o.customer_name || o.customer_email || "Guest"}</span>
              <span className="block text-xs font-light text-white/40 truncate">{o.items.join(", ")}</span>
            </span>
            <span className="text-xs text-white/40 hidden sm:block">{shortDate(o.created_at)}</span>
            <StageBadge stage={o.stage} />
            <span className="text-sm text-white w-20 text-right shrink-0">{money(o.amount_total)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Dashboard() {
  const [days, setDays] = useState(90);
  const { data, isLoading, isError } = useQuery({ queryKey: ["admin-analytics", days], queryFn: () => getAnalytics(days) });

  return (
    <>
      <AdminTitle title="Overview">
        <div className="flex border border-white/15" role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setDays(r.days)}
              aria-pressed={days === r.days}
              className={`px-3 py-2 text-[10px] tracking-[0.18em] uppercase border-none cursor-pointer transition-colors ${
                days === r.days ? "bg-[#c8a96e] text-[#0a0a0a]" : "bg-transparent text-white/55 hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </AdminTitle>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-28 bg-white/5" />)}
        </div>
      ) : isError || !data ? (
        <p role="alert" className="text-sm text-red-300/90">Couldn't load analytics.</p>
      ) : (
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Tile label="Revenue" value={money(data.revenue)} note={`${money(data.shipping_collected)} of it shipping`} />
            <Tile label="Orders" value={String(data.orders)} note={`${data.works_sold} ${data.works_sold === 1 ? "work" : "works"} sold`} />
            <Tile label="Average order" value={data.orders ? money(data.average_order) : "—"} />
            <Tile
              label="Checkout conversion"
              value={data.checkout_conversion == null ? "—" : `${Math.round(data.checkout_conversion * 100)}%`}
              note={`${data.abandoned_checkouts} abandoned`}
            />
          </div>

          <section className="border border-white/10 bg-[#111111] p-5 md:p-6">
            <h2 className="text-[10px] tracking-[0.22em] uppercase text-white/45 font-normal m-0 mb-4">
              Revenue by {data.granularity}
            </h2>
            <RevenueChart data={data} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <section>
              <h2 className="font-bebas text-2xl tracking-wide text-white m-0 mb-4">
                Ready to ship <span className="text-[#c8a96e]">{data.awaiting_shipment.length || ""}</span>
              </h2>
              <OrderList orders={data.awaiting_shipment} empty="Nothing waiting — all paid orders have shipped." />
            </section>
            <section>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="font-bebas text-2xl tracking-wide text-white m-0">Recent orders</h2>
                <Link to="/admin/orders" className="text-[10px] tracking-[0.2em] uppercase text-[#c8a96e] no-underline">All orders →</Link>
              </div>
              <OrderList orders={data.recent_orders} empty="No orders yet." />
            </section>
          </div>
        </div>
      )}
    </>
  );
}
