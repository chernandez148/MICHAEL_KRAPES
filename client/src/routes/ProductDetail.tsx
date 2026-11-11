import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "../hooks/useProducts";
import AddToCartButton from "../components/ui/AddToCartButton";
import StatusMessage from "../components/ui/StatusMessage";
import { formatPrice, isAvailable } from "../utils/products";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id);

  const back = (
    <Link
      to="/store"
      className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/50 hover:text-[#c8a96e] no-underline transition-colors"
    >
      <ArrowLeft size={14} strokeWidth={1.5} /> Back to Store
    </Link>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        {back}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-7 aspect-[4/5] bg-white/5" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-12 bg-white/10 w-2/3" />
            <div className="h-4 bg-white/5 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col gap-10">
        {back}
        <StatusMessage title="Work not found" tone="error">
          This piece may have been removed from the catalogue.
        </StatusMessage>
      </div>
    );
  }

  const p = product._data;
  const available = isAvailable(product);

  return (
    <div className="flex flex-col gap-10 animate-reveal">
      {back}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7 border border-white/10 p-4 bg-[#111111]/80">
          {p.images?.[0] ? (
            <img src={p.images[0]} alt={p.name} className="w-full h-auto object-contain" />
          ) : (
            <div className="aspect-[4/5] flex items-center justify-center text-white/20 text-xs tracking-[0.2em] uppercase">
              No Image Available
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1 h-1 rounded-full bg-[#c8a96e]" />
              <span className="text-[10px] tracking-[0.3em] text-[#c8a96e] font-medium uppercase">
                Original · {available ? "Available" : "Sold"}
              </span>
            </div>
            <h1 className="font-bebas text-[clamp(40px,5vw,72px)] leading-[0.9] text-white m-0 uppercase">{p.name}</h1>
            <div className="h-[2px] bg-[#c8a96e] w-[60px] mt-4" aria-hidden="true" />
          </div>

          {p.description && (
            <p className="font-outfit font-light text-[15px] leading-relaxed text-white/60 m-0 whitespace-pre-line">
              {p.description}
            </p>
          )}

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="block text-[9px] font-light tracking-[0.2em] uppercase text-white/40">Acquisition</span>
              <span className="font-bebas text-4xl text-white tracking-[0.03em]">
                {available ? formatPrice(p.default_price?._data?.unit_amount) : "Sold"}
              </span>
            </div>
            <AddToCartButton product={product} large />
          </div>

          <p className="text-[10px] tracking-[0.18em] uppercase text-white/35 m-0 leading-relaxed">
            Ships within the US &amp; Canada · Secure checkout via Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
