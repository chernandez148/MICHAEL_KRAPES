import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Product } from "../../types/products";
import { isAvailable } from "../../utils/products";

interface Props {
  works: Product[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ works, index, onClose, onNavigate }: Props) {
  const work = works[index]._data;
  const prev = () => onNavigate((index - 1 + works.length) % works.length);
  const next = () => onNavigate((index + 1) % works.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + works.length) % works.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % works.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, works.length, onClose, onNavigate]);

  const iconBtn =
    "absolute z-10 text-white/60 hover:text-[#c8a96e] bg-transparent border-none cursor-pointer p-3 transition-colors";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={work.name}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <button className={`${iconBtn} top-4 right-4`} onClick={onClose} aria-label="Close">
        <X size={24} strokeWidth={1.5} />
      </button>
      {works.length > 1 && (
        <>
          <button className={`${iconBtn} left-2 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous work">
            <ChevronLeft size={32} strokeWidth={1.2} />
          </button>
          <button className={`${iconBtn} right-2 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next work">
            <ChevronRight size={32} strokeWidth={1.2} />
          </button>
        </>
      )}

      <div className="flex-1 flex items-center justify-center p-6 sm:p-16 min-h-0">
        {work.images?.[0] && (
          <img
            src={work.images[0]}
            alt={work.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      <div
        className="px-6 sm:px-16 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="font-bebas text-3xl text-white m-0 tracking-[0.02em]">{work.name}</h2>
          {work.description && (
            <p className="font-outfit text-xs font-light text-white/50 m-0 mt-1 tracking-wide line-clamp-2 max-w-xl">
              {work.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] tracking-[0.2em] text-white/40">
            {index + 1} / {works.length}
          </span>
          {isAvailable(works[index]) && (
            <Link
              to={`/store/${work.id}`}
              className="text-[10px] tracking-[0.25em] uppercase text-[#c8a96e] hover:text-[#d4b87a] no-underline"
            >
              View in Store →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
