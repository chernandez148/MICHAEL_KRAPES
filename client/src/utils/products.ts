import type { Product } from "../types/products";
import type { CartItem } from "../redux/slices/cartSlice";

export function formatPrice(cents: number | null | undefined) {
  if (cents == null) return "Price on request";
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Flattens a Stripe product into the plain fields the UI needs.
export function toCartItem(product: Product): CartItem {
  const p = product._data;
  return {
    id: p.id,
    name: p.name || "Untitled Work",
    description: p.description,
    image: p.images?.[0] ?? null,
    amount: p.default_price?._data?.unit_amount ?? null,
  };
}

// A work is purchasable when it's active in Stripe and has a price.
// Mark a piece sold by setting metadata `sold=true` on the Stripe product.
export function isAvailable(product: Product) {
  const p = product._data;
  return p.active && p.metadata?.sold !== "true" && p.default_price?._data?.unit_amount != null;
}
