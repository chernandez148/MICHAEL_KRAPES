import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Header from "../components/ui/Header";
import StatusMessage from "../components/ui/StatusMessage";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { createCheckout } from "../services/orders";
import { formatPrice } from "../utils/products";

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + (item.amount ?? 0), 0);

  const handleCheckout = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const { url } = await createCheckout(items.map((i) => i.id));
      window.location.assign(url);
    } catch (err) {
      const detail = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(detail || "Checkout is unavailable right now. Please try again or contact the studio.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header breadcrumbs="COLLECTION" title="YOUR CART" />

      {items.length === 0 ? (
        <StatusMessage title="Your cart is empty">
          <Link to="/store" className="text-[#c8a96e] hover:text-[#d4b87a] no-underline tracking-[0.2em] uppercase text-[10px]">
            Browse available works →
          </Link>
        </StatusMessage>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-reveal">
          <ul className="lg:col-span-8 list-none m-0 p-0 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 py-6 items-center">
                <Link to={`/store/${item.id}`} className="shrink-0 w-24 h-28 bg-white/5 border border-white/10 overflow-hidden block">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-light tracking-[0.22em] uppercase text-white/40 m-0 mb-1 line-clamp-1">
                    {item.description || "Original artwork"}
                  </p>
                  <Link to={`/store/${item.id}`} className="font-bebas text-2xl text-white hover:text-[#c8a96e] no-underline tracking-[0.02em] line-clamp-1">
                    {item.name}
                  </Link>
                  <span className="font-bebas text-xl text-white/80 block mt-1">{formatPrice(item.amount)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-white/40 hover:text-[#c8a96e] transition-colors bg-transparent border-none cursor-pointer p-2"
                  aria-label={`Remove ${item.name}`}
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </li>
            ))}
          </ul>

          <aside className="lg:col-span-4 border border-white/10 bg-[#111111]/80 p-8 flex flex-col gap-6 h-fit">
            <h2 className="font-bebas text-2xl tracking-wide text-white m-0">Summary</h2>
            <div className="flex justify-between text-sm font-light text-white/60">
              <span>{items.length} {items.length === 1 ? "work" : "works"}</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/35 m-0">
              Shipping &amp; tax calculated at checkout
            </p>
            <div className="flex justify-between items-end border-t border-white/10 pt-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">Total</span>
              <span className="font-bebas text-3xl text-white">{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={submitting}
              className="w-full py-4 bg-[#c8a96e] text-[#0a0a0a] font-outfit text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#d4b87a] active:scale-[0.98] cursor-pointer border-none disabled:opacity-50 disabled:cursor-wait"
            >
              {submitting ? "Redirecting…" : "Checkout"}
            </button>
            {error && <p role="alert" className="text-xs text-red-300/90 font-light m-0">{error}</p>}
          </aside>
        </div>
      )}
    </>
  );
}
