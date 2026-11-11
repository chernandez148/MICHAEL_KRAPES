import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/ui/Header";
import { clearCart } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";

export default function OrderConfirmation() {
  const dispatch = useAppDispatch();

  // Stripe only redirects here after a successful payment.
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      <Header breadcrumbs="ORDER RECEIVED" title="THANK YOU" />
      <div className="max-w-xl flex flex-col gap-6 animate-reveal">
        <p className="font-outfit font-light text-[16px] leading-relaxed text-white/70 m-0">
          Your payment was successful. A receipt is on its way to your email, and the studio will be in touch about
          packing and shipping your work.
        </p>
        <Link
          to="/store"
          className="self-start px-10 py-3.5 bg-[#c8a96e] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase no-underline hover:bg-[#d4b87a] transition-colors"
        >
          Back to Store
        </Link>
      </div>
    </>
  );
}
