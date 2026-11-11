import { useCallback, useState } from "react";
import Header from "../components/ui/Header";
import StatusMessage from "../components/ui/StatusMessage";
import { useProducts } from "../hooks/useProducts";
import Lightbox from "../sections/Gallery/Lightbox";

export default function Gallery() {
  const { data, isLoading, isError } = useProducts();
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  // Every work with an image — sold pieces included.
  const works = (data ?? []).filter((w) => w._data.images?.length);

  return (
    <>
      <Header breadcrumbs="02 / GALLERY" title="SELECTED WORKS" />

      {isLoading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {[420, 320, 500, 360, 460, 300].map((h, i) => (
            <div key={i} className="mb-6 bg-white/5 animate-pulse" style={{ height: h }} />
          ))}
        </div>
      ) : isError ? (
        <StatusMessage title="Unable to load works" tone="error">Please try again shortly.</StatusMessage>
      ) : works.length === 0 ? (
        <StatusMessage title="New works coming soon" />
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 animate-reveal">
          {works.map((w, i) => (
            <button
              key={w._data.id}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full mb-6 break-inside-avoid overflow-hidden border border-white/10 hover:border-[#c8a96e]/50 bg-transparent p-0 cursor-zoom-in transition-colors duration-500"
              aria-label={`View ${w._data.name}`}
            >
              <img
                src={w._data.images[0]}
                alt={w._data.name}
                loading="lazy"
                className="w-full h-auto block transition-all duration-700 grayscale-[60%] brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-bebas text-2xl text-white tracking-[0.02em]">{w._data.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {open !== null && works[open] && (
        <Lightbox works={works} index={open} onClose={close} onNavigate={setOpen} />
      )}
    </>
  );
}
