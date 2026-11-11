import { Link } from "react-router-dom";
import type { Product } from "../../types/products";
import { formatPrice, isAvailable } from "../../utils/products";
import AddToCartButton from "./AddToCartButton";

function Card({ product }: { product: Product }) {
  const p = product._data;
  const image = p.images?.[0];
  const name = p.name || "Untitled Work";
  const available = isAvailable(product);
  const href = `/store/${p.id}`;

  return (
    <article
      className="font-outfit relative w-full bg-[#0a0a0a] border border-white/10 hover:border-[#c8a96e]/50 flex flex-col justify-between transition-all duration-500 group overflow-hidden"
      aria-label={`${name} — Artwork details`}
    >
      {/* Left vertical gold stripe (on hover) */}
      <div
        className="absolute top-0 left-0 w-[3px] h-full bg-[#c8a96e] z-30 transition-transform duration-500 origin-top scale-y-0 group-hover:scale-y-100"
        aria-hidden="true"
      />

      {/* ── IMAGE ── */}
      <Link to={href} className="relative block w-full aspect-[4/5] bg-black/60 overflow-hidden" tabIndex={-1}>
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 grayscale-[80%] brightness-[0.8] contrast-[1.08] group-hover:grayscale-[20%] group-hover:brightness-[0.95]"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-xs font-light tracking-[0.2em] uppercase">
            No Image Available
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.40) 40%, rgba(10,10,10,0.20) 100%)",
          }}
        />

        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
            <span className="text-[9px] font-normal tracking-[0.2em] uppercase text-white/70">Original</span>
          </div>
          <span className="text-[9px] font-light tracking-[0.16em] uppercase px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
            {available ? "Available" : "Sold"}
          </span>
        </div>
      </Link>

      {/* ── CONTENT ── */}
      <div className="p-6 flex flex-col justify-between flex-1 bg-[#0a0a0a]">
        <div>
          <p className="text-[9px] font-light tracking-[0.22em] uppercase text-white/40 m-0 mb-1 line-clamp-1">
            {p.description || "Mixed Media"}
          </p>
          <h3 className="font-bebas text-2xl sm:text-3xl tracking-[0.02em] leading-tight m-0 line-clamp-1">
            <Link to={href} className="text-white no-underline group-hover:text-[#c8a96e] transition-colors duration-300">
              {name}
            </Link>
          </h3>
          <div
            className="h-[2px] bg-[#c8a96e] mt-2 mb-4 transition-all duration-500 w-[30px] group-hover:w-[60px]"
            aria-hidden="true"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex items-end justify-between gap-4">
          <div>
            <span className="block text-[8px] font-light tracking-[0.2em] uppercase text-white/40">Acquisition</span>
            <span className="font-bebas text-xl sm:text-2xl text-white tracking-[0.03em]">
              {available ? formatPrice(p.default_price?._data?.unit_amount) : "Sold"}
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

export default Card;
