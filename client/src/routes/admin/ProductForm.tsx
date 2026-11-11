import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ImagePlus } from "lucide-react";
import {
  apiError, createProduct, getAdminProduct, prepareImage, updateProduct, type AdminProduct,
} from "../../services/admin";
import { AdminTitle, fieldClass, labelClass, primaryButton, secondaryButton } from "../../components/admin/AdminLayout";

const SHIP_FIELDS = [
  { key: "ship_length", label: "Length (in)" },
  { key: "ship_width", label: "Width (in)" },
  { key: "ship_height", label: "Depth (in)" },
  { key: "ship_weight", label: "Weight (lb)" },
] as const;
type ShipKey = (typeof SHIP_FIELDS)[number]["key"];

interface FormState {
  name: string;
  description: string;
  price: string;
  sold: boolean;
  active: boolean;
  shipping: Record<ShipKey, string>;
}

function initialState(p?: AdminProduct): FormState {
  return {
    name: p?.name ?? "",
    description: p?.description ?? "",
    price: p?.price != null ? String(p.price / 100) : "",
    sold: p?.sold ?? false,
    active: p?.active ?? true,
    shipping: {
      ship_length: p?.shipping.ship_length ?? "",
      ship_width: p?.shipping.ship_width ?? "",
      ship_height: p?.shipping.ship_height ?? "",
      ship_weight: p?.shipping.ship_weight ?? "",
    },
  };
}

function Editor({ product }: { product?: AdminProduct }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = !product;
  const [form, setForm] = useState<FormState>(() => initialState(product));
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(product?.images[0] ?? null);
  const [removeImage, setRemoveImage] = useState(false);
  const [saved, setSaved] = useState(false);

  // Free the object URL made for a newly picked image.
  useEffect(() => () => { if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const pickImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const prepared = await prepareImage(file);
    setImage(prepared);
    setPreview(URL.createObjectURL(prepared));
    setRemoveImage(false);
    setSaved(false);
  };

  const mutation = useMutation({
    mutationFn: () => {
      const fd = new FormData();
      const clear: string[] = [];
      fd.append("name", form.name.trim());
      fd.append("price", form.price.trim());
      if (form.description.trim()) fd.append("description", form.description.trim());
      else if (!isNew) clear.push("description");
      for (const { key } of SHIP_FIELDS) {
        const v = form.shipping[key].trim();
        if (v) fd.append(key, v);
        else if (!isNew) clear.push(key);
      }
      if (image) fd.append("image", image);
      if (isNew) return createProduct(fd);
      fd.append("sold", String(form.sold));
      fd.append("active", String(form.active));
      if (removeImage && !image) fd.append("remove_image", "true");
      if (clear.length) fd.append("clear", clear.join(","));
      return updateProduct(product.id, fd);
    },
    onSuccess: (p) => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] }); // public store cache
      qc.setQueryData(["admin-product", p.id], p);
      if (isNew) navigate(`/admin/products/${p.id}`, { replace: true });
      else setSaved(true);
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5 flex flex-col gap-3">
        <span className={labelClass}>Image</span>
        <label className="relative block aspect-[4/5] border border-dashed border-white/20 hover:border-[#c8a96e]/60 bg-[#111111] cursor-pointer overflow-hidden transition-colors">
          {preview && !removeImage ? (
            <img src={preview} alt="Artwork preview" className="w-full h-full object-contain" />
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40 text-xs tracking-[0.15em] uppercase">
              <ImagePlus size={28} strokeWidth={1.2} /> Choose a photo
            </span>
          )}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pickImage} className="sr-only" />
        </label>
        <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase">
          {preview && !removeImage && <span className="text-white/40">Click the image to replace it</span>}
          {!isNew && preview && !removeImage && (
            <button type="button" onClick={() => { setRemoveImage(true); setImage(null); setSaved(false); }}
              className="bg-transparent border-none p-0 text-red-300/80 hover:text-red-200 cursor-pointer text-[10px] tracking-[0.2em] uppercase">
              Remove
            </button>
          )}
        </div>
        <p className="text-[11px] font-light text-white/35 m-0">Large photos are resized to 2400px before upload.</p>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-6">
        <div>
          <label htmlFor="p-name" className={labelClass}>Title</label>
          <input id="p-name" required maxLength={250} className={fieldClass} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label htmlFor="p-desc" className={labelClass}>Description <span className="text-white/25">· medium, size, year</span></label>
          <textarea id="p-desc" rows={5} maxLength={5000} className={`${fieldClass} resize-y`} value={form.description}
            onChange={(e) => set("description", e.target.value)} />
        </div>
        <div className="max-w-[220px]">
          <label htmlFor="p-price" className={labelClass}>Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
            <input id="p-price" required inputMode="decimal" pattern="[0-9,]*\.?[0-9]{0,2}" className={`${fieldClass} pl-7`}
              value={form.price} onChange={(e) => set("price", e.target.value)} />
          </div>
        </div>

        <fieldset className="border border-white/10 p-5 m-0">
          <legend className="text-[10px] tracking-[0.22em] uppercase text-white/45 px-2">Packed box for shipping quotes</legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SHIP_FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={`p-${key}`} className={labelClass}>{label}</label>
                <input id={`p-${key}`} inputMode="decimal" pattern="[0-9]*\.?[0-9]*" className={fieldClass}
                  value={form.shipping[key]}
                  onChange={(e) => set("shipping", { ...form.shipping, [key]: e.target.value })} />
              </div>
            ))}
          </div>
          <p className="text-[11px] font-light text-white/35 m-0 mt-3">Leave blank to use the studio's default box.</p>
        </fieldset>

        {!isNew && (
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 text-sm font-light text-white/75 cursor-pointer">
              <input type="checkbox" className="accent-[#c8a96e]" checked={form.sold} onChange={(e) => set("sold", e.target.checked)} />
              Sold <span className="text-white/35 text-xs">— stays in the gallery, can't be bought</span>
            </label>
            <label className="flex items-center gap-3 text-sm font-light text-white/75 cursor-pointer">
              <input type="checkbox" className="accent-[#c8a96e]" checked={form.active} onChange={(e) => set("active", e.target.checked)} />
              Show on the website <span className="text-white/35 text-xs">— untick to hide it everywhere</span>
            </label>
          </div>
        )}

        {mutation.isError && <p role="alert" className="text-xs text-red-300/90 m-0">{apiError(mutation.error)}</p>}
        {saved && <p role="status" className="text-xs text-[#c8a96e] m-0">Saved — the store is updated.</p>}

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" disabled={mutation.isPending} className={primaryButton}>
            {mutation.isPending ? (image ? "Uploading…" : "Saving…") : isNew ? "Add to store" : "Save changes"}
          </button>
          <Link to="/admin/products" className={secondaryButton}>Cancel</Link>
          {!isNew && form.active && (
            <a href={`/store/${product.id}`} target="_blank" rel="noreferrer" className={secondaryButton}>View in store ↗</a>
          )}
        </div>
      </div>
    </form>
  );
}

export default function ProductForm() {
  const { id } = useParams();
  const isNew = !id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => getAdminProduct(id!),
    enabled: !isNew,
  });

  return (
    <>
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-white/45 hover:text-[#c8a96e] no-underline mb-6">
        <ArrowLeft size={14} strokeWidth={1.5} /> Works
      </Link>
      <AdminTitle title={isNew ? "Add a work" : data?.name || "Edit work"} />
      {isNew ? (
        <Editor />
      ) : isLoading ? (
        <div className="h-96 bg-white/5 animate-pulse" />
      ) : isError || !data ? (
        <p role="alert" className="text-sm text-red-300/90">Work not found.</p>
      ) : (
        <Editor key={data.id} product={data} />
      )}
    </>
  );
}
