import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Header from "../components/ui/Header";
import StatusMessage from "../components/ui/StatusMessage";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { createCheckout } from "../services/orders";
import { getShippingRates, type ShippingAddress, type ShippingRate } from "../services/shipping";
import { formatPrice } from "../utils/products";

const ADDRESS_KEY = "mk-ship-to";
const EMPTY_ADDRESS: ShippingAddress = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "US",
};

function loadAddress(): ShippingAddress {
  try {
    const raw = localStorage.getItem(ADDRESS_KEY);
    return raw ? { ...EMPTY_ADDRESS, ...JSON.parse(raw) } : EMPTY_ADDRESS;
  } catch {
    return EMPTY_ADDRESS;
  }
}

function errorDetail(err: unknown, fallback: string) {
  const detail = (err as { response?: { data?: { detail?: unknown } } })?.response?.data?.detail;
  return typeof detail === "string" ? detail : fallback;
}

function deliveryLabel(rate: ShippingRate) {
  if (rate.estimated_days) return `${rate.estimated_days} business day${rate.estimated_days === 1 ? "" : "s"}`;
  return rate.duration_terms || "";
}

const label = "text-[10px] font-normal tracking-[0.25em] text-white/40 uppercase";

function Field({
  id,
  text,
  value,
  onChange,
  required = true,
  type = "text",
  autoComplete,
  className = "",
}: {
  id: keyof ShippingAddress;
  text: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className={label} htmlFor={`ship-${id}`}>
        {text}
        {!required && <span className="text-white/25"> · optional</span>}
      </label>
      <input
        id={`ship-${id}`}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const [address, setAddress] = useState<ShippingAddress>(loadAddress);
  // Quotes are tagged with the works they were made for, so a cart change drops them.
  const [quote, setQuote] = useState<{ key: string; rates: ShippingRate[] } | null>(null);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productIds = useMemo(() => items.map((i) => i.id), [items]);
  const cartKey = productIds.join(",");
  const rates = quote?.key === cartKey ? quote.rates : null;
  const subtotal = items.reduce((sum, item) => sum + (item.amount ?? 0), 0);
  const selectedRate = rates?.find((r) => r.id === selectedRateId) ?? null;
  const total = subtotal + (selectedRate?.amount ?? 0);

  const update = (field: keyof ShippingAddress) => (value: string) => {
    setAddress((a) => ({ ...a, [field]: value }));
    setQuote(null);
    setSelectedRateId(null);
  };

  const handleGetRates = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingRates(true);
    setError(null);
    try {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
    } catch {
      /* storage unavailable */
    }
    try {
      const { rates } = await getShippingRates(address, productIds);
      setQuote({ key: cartKey, rates });
      setSelectedRateId(rates[0]?.id ?? null);
    } catch (err) {
      setError(errorDetail(err, "We couldn't get shipping rates right now. Please try again or contact the studio."));
    } finally {
      setLoadingRates(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedRateId) return;
    setSubmitting(true);
    setError(null);
    try {
      const { url } = await createCheckout(productIds, selectedRateId, address);
      window.location.assign(url);
    } catch (err) {
      setError(errorDetail(err, "Checkout is unavailable right now. Please try again or contact the studio."));
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
          <div className="lg:col-span-8 flex flex-col gap-16">
            <ul className="list-none m-0 p-0 flex flex-col divide-y divide-white/10 border-y border-white/10">
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

            <form onSubmit={handleGetRates} className="flex flex-col gap-8" aria-labelledby="ship-heading">
              <div>
                <h2 id="ship-heading" className="font-bebas text-3xl tracking-wide text-white m-0 mb-2">Ship To</h2>
                <p className="font-light text-sm text-white/50 m-0">
                  Enter your address to see live carrier rates.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <Field id="name" text="Full Name" value={address.name} onChange={update("name")} autoComplete="name" />
                <Field id="email" text="Email" type="email" value={address.email ?? ""} onChange={update("email")} autoComplete="email" />
                <Field id="line1" text="Street Address" value={address.line1} onChange={update("line1")} autoComplete="address-line1" />
                <Field id="line2" text="Apt / Suite" value={address.line2 ?? ""} onChange={update("line2")} required={false} autoComplete="address-line2" />
                <Field id="city" text="City" value={address.city} onChange={update("city")} autoComplete="address-level2" />
                <Field id="state" text="State / Province" value={address.state} onChange={update("state")} autoComplete="address-level1" />
                <Field id="postal_code" text="ZIP / Postal Code" value={address.postal_code} onChange={update("postal_code")} autoComplete="postal-code" />
                <div className="flex flex-col gap-1">
                  <label className={label} htmlFor="ship-country">Country</label>
                  <select
                    id="ship-country"
                    className="input-field bg-[#0a0a0a] cursor-pointer"
                    value={address.country}
                    onChange={(e) => update("country")(e.target.value)}
                    autoComplete="country"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
                <Field id="phone" text="Phone" type="tel" value={address.phone ?? ""} onChange={update("phone")} required={false} autoComplete="tel" />
              </div>
              <button
                type="submit"
                disabled={loadingRates}
                className="self-start px-10 py-3.5 bg-transparent border border-[#c8a96e]/60 text-[#c8a96e] font-outfit text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#c8a96e]/10 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                {loadingRates ? "Getting rates…" : rates ? "Refresh Rates" : "Get Shipping Rates"}
              </button>
            </form>
          </div>

          <aside className="lg:col-span-4 border border-white/10 bg-[#111111]/80 p-8 flex flex-col gap-6 h-fit lg:sticky lg:top-28">
            <h2 className="font-bebas text-2xl tracking-wide text-white m-0">Summary</h2>
            <div className="flex justify-between text-sm font-light text-white/60">
              <span>{items.length} {items.length === 1 ? "work" : "works"}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {rates ? (
              <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
                <legend className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-3">Shipping</legend>
                {rates.map((rate) => (
                  <label
                    key={rate.id}
                    className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors ${
                      rate.id === selectedRateId ? "border-[#c8a96e]/70 bg-[#c8a96e]/5" : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping-rate"
                      value={rate.id}
                      checked={rate.id === selectedRateId}
                      onChange={() => setSelectedRateId(rate.id)}
                      className="accent-[#c8a96e]"
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-white/85 font-light truncate">
                        {rate.carrier} {rate.service}
                      </span>
                      {deliveryLabel(rate) && (
                        <span className="block text-[10px] tracking-[0.12em] uppercase text-white/35">{deliveryLabel(rate)}</span>
                      )}
                    </span>
                    <span className="font-bebas text-lg text-white">{formatPrice(rate.amount)}</span>
                  </label>
                ))}
              </fieldset>
            ) : (
              <div className="flex justify-between text-sm font-light text-white/40">
                <span>Shipping</span>
                <span>Enter address</span>
              </div>
            )}

            <div className="flex justify-between items-end border-t border-white/10 pt-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">Total</span>
              <span className="font-bebas text-3xl text-white">{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={submitting || !selectedRate}
              className="w-full py-4 bg-[#c8a96e] text-[#0a0a0a] font-outfit text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#d4b87a] active:scale-[0.98] cursor-pointer border-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Redirecting…" : selectedRate ? "Checkout" : "Choose Shipping to Continue"}
            </button>
            {error && <p role="alert" className="text-xs text-red-300/90 font-light m-0">{error}</p>}
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 m-0">Secure payment via Stripe</p>
          </aside>
        </div>
      )}
    </>
  );
}
