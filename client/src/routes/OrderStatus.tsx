import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/ui/Header";
import StatusMessage from "../components/ui/StatusMessage";
import { getOrderStatus, type OrderStatus as Order } from "../services/orders";
import { formatPrice } from "../utils/products";

const STEPS = [
  { key: "paid", label: "Payment received" },
  { key: "packing", label: "Packing in studio" },
  { key: "shipped", label: "Shipped" },
] as const;

function stepIndex(order: Order) {
  if (order.stage === "shipped") return 2;
  if (order.stage === "paid") return 1;
  return -1;
}

const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

export default function OrderStatus() {
  const { token } = useParams();
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order-status", token],
    queryFn: () => getOrderStatus(token!),
    enabled: !!token,
    retry: false,
  });

  if (isLoading) {
    return (
      <>
        <Header breadcrumbs="ORDER" title="YOUR ORDER" />
        <div className="h-64 bg-white/5 animate-pulse" />
      </>
    );
  }

  if (isError || !order) {
    return (
      <>
        <Header breadcrumbs="ORDER" title="YOUR ORDER" />
        <StatusMessage title="Order not found" tone="error">
          Check the link in your confirmation email, or{" "}
          <Link to="/contact" className="text-[#c8a96e] no-underline">contact the studio</Link>.
        </StatusMessage>
      </>
    );
  }

  const current = stepIndex(order);

  return (
    <>
      <Header breadcrumbs={`ORDER #${order.number}`} title="YOUR ORDER" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-reveal">
        <div className="lg:col-span-8 flex flex-col gap-12">
          {current >= 0 ? (
            <ol className="list-none m-0 p-0 grid grid-cols-3 gap-3">
              {STEPS.map((step, i) => (
                <li key={step.key} className="flex flex-col gap-3">
                  <span className={`h-[2px] ${i <= current ? "bg-[#c8a96e]" : "bg-white/10"}`} />
                  <span
                    className={`text-[10px] tracking-[0.2em] uppercase ${i <= current ? "text-white/85" : "text-white/30"}`}
                    aria-current={i === current ? "step" : undefined}
                  >
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <StatusMessage title={order.stage === "refunded" ? "Order refunded" : "Payment not completed"}>
              {order.stage === "refunded"
                ? "This order was refunded. Reach out to the studio with any questions."
                : "This order wasn't paid. Your card was not charged."}
            </StatusMessage>
          )}

          {order.stage === "shipped" && (
            <div className="border border-[#c8a96e]/40 bg-[#c8a96e]/5 p-6 flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c8a96e]">
                Shipped {date(order.shipped_at)}
              </span>
              {order.tracking_number && (
                <span className="font-light text-white/80">
                  {order.shipping_service ? `${order.shipping_service} · ` : ""}
                  {order.tracking_url ? (
                    <a href={order.tracking_url} target="_blank" rel="noreferrer" className="text-[#c8a96e] hover:text-[#d4b87a]">
                      {order.tracking_number}
                    </a>
                  ) : (
                    order.tracking_number
                  )}
                </span>
              )}
            </div>
          )}

          <ul className="list-none m-0 p-0 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {order.items.map((item, i) => (
              <li key={i} className="flex gap-5 py-6 items-center">
                <div className="shrink-0 w-20 h-24 bg-white/5 border border-white/10 overflow-hidden">
                  {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                </div>
                <span className="flex-1 font-bebas text-2xl text-white tracking-[0.02em]">{item.title}</span>
                <span className="font-bebas text-xl text-white/80">{formatPrice(item.amount)}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-4 border border-white/10 bg-[#111111]/80 p-8 flex flex-col gap-4 h-fit text-sm font-light text-white/60">
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/40">Placed {date(order.created_at)}</span>
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.amount_subtotal)}</span></div>
          <div className="flex justify-between gap-4">
            <span>{order.shipping_service || "Shipping"}</span>
            <span>{formatPrice(order.amount_shipping)}</span>
          </div>
          <div className="flex justify-between items-end border-t border-white/10 pt-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">Total</span>
            <span className="font-bebas text-3xl text-white">{formatPrice(order.amount_total)}</span>
          </div>
          {order.ship_to && <span className="text-xs text-white/40">Shipping to {order.ship_to}</span>}
          <Link to="/contact" className="text-[10px] tracking-[0.2em] uppercase text-[#c8a96e] hover:text-[#d4b87a] no-underline mt-2">
            Questions? Contact the studio →
          </Link>
        </aside>
      </div>
    </>
  );
}
