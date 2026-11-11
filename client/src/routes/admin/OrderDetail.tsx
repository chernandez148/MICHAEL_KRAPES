import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { apiError, getOrder, shipOrder, type OrderDetail as Order } from "../../services/admin";
import {
  AdminTitle, StageBadge, fieldClass, labelClass, money, primaryButton, shortDate,
} from "../../components/admin/AdminLayout";

function ShipForm({ order }: { order: Order }) {
  const qc = useQueryClient();
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [carrier, setCarrier] = useState(order.shipping_rate.carrier ?? "");
  const [notify, setNotify] = useState(!order.shipped_at);

  const mutation = useMutation({
    mutationFn: () => shipOrder(order.id, { tracking_number: tracking.trim(), carrier: carrier.trim() || undefined, notify }),
    onSuccess: (updated) => {
      qc.setQueryData(["admin-order", String(order.id)], updated);
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-analytics"] });
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={submit} className="border border-white/10 bg-[#111111] p-6 flex flex-col gap-5">
      <h2 className="font-bebas text-2xl tracking-wide text-white m-0">
        {order.shipped_at ? "Update tracking" : "Mark as shipped"}
      </h2>
      {!order.shipped_at && (
        <p className="text-xs font-light text-white/50 m-0 leading-relaxed">
          Buy the label in Shippo{order.shipping_rate.shipment_id ? ` (shipment ${order.shipping_rate.shipment_id})` : ""},
          then enter the tracking number here.
        </p>
      )}
      <div>
        <label htmlFor="tracking" className={labelClass}>Tracking number</label>
        <input id="tracking" required minLength={4} className={fieldClass} value={tracking} onChange={(e) => setTracking(e.target.value)} />
      </div>
      <div>
        <label htmlFor="carrier" className={labelClass}>Carrier</label>
        <input id="carrier" className={fieldClass} value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="USPS, UPS, FedEx…" />
      </div>
      <label className="flex items-center gap-3 text-sm font-light text-white/70 cursor-pointer">
        <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="accent-[#c8a96e]" />
        Email the buyer their tracking link
      </label>
      {mutation.isError && <p role="alert" className="text-xs text-red-300/90 m-0">{apiError(mutation.error)}</p>}
      {mutation.isSuccess && <p role="status" className="text-xs text-[#c8a96e] m-0">Saved{notify ? " and emailed the buyer" : ""}.</p>}
      <button type="submit" disabled={mutation.isPending} className={primaryButton}>
        {mutation.isPending ? "Saving…" : order.shipped_at ? "Save tracking" : "Mark shipped"}
      </button>
    </form>
  );
}

export default function OrderDetail() {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useQuery({ queryKey: ["admin-order", id], queryFn: () => getOrder(id!) });

  const back = (
    <Link to="/admin/orders" className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-white/45 hover:text-[#c8a96e] no-underline mb-6">
      <ArrowLeft size={14} strokeWidth={1.5} /> Orders
    </Link>
  );

  if (isLoading) return <>{back}<div className="h-64 bg-white/5 animate-pulse" /></>;
  if (isError || !order) return <>{back}<p role="alert" className="text-sm text-red-300/90">Order not found.</p></>;

  const a = order.shipping_address ?? {};
  const rate = order.shipping_rate;

  return (
    <>
      {back}
      <AdminTitle title={`Order #${order.id}`}>
        <StageBadge stage={order.stage} />
      </AdminTitle>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 flex flex-col gap-10">
          <ul className="list-none m-0 p-0 divide-y divide-white/10 border-y border-white/10">
            {order.items.map((item) => (
              <li key={item.product_id} className="flex items-center gap-4 py-4">
                <div className="w-16 h-20 bg-white/5 border border-white/10 overflow-hidden shrink-0">
                  {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                </div>
                <Link to={`/admin/products/${item.product_id}`} className="flex-1 text-white/85 no-underline hover:text-[#c8a96e]">
                  {item.title}
                </Link>
                <span className="text-white">{money(item.amount)}</span>
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-y-3 text-sm m-0">
            <dt className="text-white/45 font-light">Subtotal</dt><dd className="m-0 text-right text-white/80">{money(order.amount_subtotal)}</dd>
            <dt className="text-white/45 font-light">Shipping{rate.carrier ? ` · ${rate.carrier} ${rate.service ?? ""}` : ""}</dt>
            <dd className="m-0 text-right text-white/80">{money(order.amount_shipping)}</dd>
            <dt className="text-white/45 font-light border-t border-white/10 pt-3">Total</dt>
            <dd className="m-0 text-right text-white font-bebas text-2xl border-t border-white/10 pt-3">{money(order.amount_total)}</dd>
          </dl>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className={labelClass}>Buyer</h3>
              <p className="m-0 text-white/85">{order.customer_name || "—"}</p>
              {order.customer_email && (
                <a href={`mailto:${order.customer_email}`} className="text-[#c8a96e] no-underline block">{order.customer_email}</a>
              )}
              {a.phone && <a href={`tel:${a.phone}`} className="text-white/60 no-underline block">{a.phone}</a>}
            </div>
            <div>
              <h3 className={labelClass}>Ship to</h3>
              <address className="not-italic text-white/75 font-light leading-relaxed">
                {[a.name, a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(", "), a.country]
                  .filter(Boolean)
                  .map((line, i) => <span key={i} className="block">{line}</span>)}
              </address>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-[0.2em] uppercase">
            <span className="text-white/40">Placed {shortDate(order.created_at)}</span>
            {order.stripe_payment_url && (
              <a href={order.stripe_payment_url} target="_blank" rel="noreferrer" className="text-[#c8a96e] no-underline">Payment in Stripe ↗</a>
            )}
            {order.status_url && (
              <a href={order.status_url} target="_blank" rel="noreferrer" className="text-[#c8a96e] no-underline">Buyer's status page ↗</a>
            )}
            {order.tracking_url && (
              <a href={order.tracking_url} target="_blank" rel="noreferrer" className="text-[#c8a96e] no-underline">Track package ↗</a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          {order.stage === "paid" || order.stage === "shipped" ? (
            <ShipForm key={order.id} order={order} />
          ) : (
            <p className="text-sm font-light text-white/45 border border-white/10 p-6 m-0">
              This order wasn't paid, so there's nothing to ship.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
