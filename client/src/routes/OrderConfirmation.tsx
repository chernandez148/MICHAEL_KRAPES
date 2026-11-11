import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/ui/Header";
import { clearCart } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";
import { getOrderBySession } from "../services/orders";

export default function OrderConfirmation() {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  // Stripe only redirects here after a successful payment.
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // The order is recorded by Stripe's webhook, which can land a few seconds
  // after the redirect — keep checking briefly until it shows up.
  const { data: order } = useQuery({
    queryKey: ["order-by-session", sessionId],
    queryFn: () => getOrderBySession(sessionId!),
    enabled: !!sessionId,
    retry: 6,
    retryDelay: 2000,
  });

  return (
    <>
      <Header breadcrumbs="ORDER RECEIVED" title="THANK YOU" />
      <div className="max-w-xl flex flex-col gap-6 animate-reveal">
        <p className="font-outfit font-light text-[16px] leading-relaxed text-white/70 m-0">
          Your payment was successful{order ? ` — order #${order.number}` : ""}. A confirmation is on its way to your
          email with a link to track your order, and the studio will be in touch as your work is packed and shipped.
        </p>
        <div className="flex flex-wrap gap-4">
          {order && (
            <Link
              to={`/orders/${order.token}`}
              className="px-10 py-3.5 bg-[#c8a96e] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase no-underline hover:bg-[#d4b87a] transition-colors"
            >
              View Order Status
            </Link>
          )}
          <Link
            to="/store"
            className={`px-10 py-3.5 text-xs tracking-[0.25em] uppercase no-underline transition-colors ${
              order
                ? "border border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                : "bg-[#c8a96e] text-[#0a0a0a] hover:bg-[#d4b87a]"
            }`}
          >
            Back to Store
          </Link>
        </div>
      </div>
    </>
  );
}
