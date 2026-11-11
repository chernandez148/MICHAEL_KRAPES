import { api } from "./api";

const TOKEN_KEY = "token"; // read by the axios interceptor in api.ts
const EXPIRES_KEY = "token-expires";

export function getAdminToken(): string | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const expires = localStorage.getItem(EXPIRES_KEY);
    if (!token || (expires && new Date(expires) <= new Date())) return null;
    return token;
  } catch {
    return null;
  }
}

export function clearAdminToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  } catch {
    /* storage unavailable */
  }
}

export async function adminLogin(email: string, password: string) {
  const res: { access_token: string; expires_at: string; email: string } = await api.post("/admin/login", {
    email,
    password,
  });
  localStorage.setItem(TOKEN_KEY, res.access_token);
  localStorage.setItem(EXPIRES_KEY, res.expires_at);
  return res;
}

export type Stage = "pending" | "paid" | "shipped" | "failed" | "refunded";

export interface OrderRow {
  id: number;
  stage: Stage;
  created_at: string;
  customer_name: string | null;
  customer_email: string | null;
  ship_to: string | null;
  items: string[];
  amount_total: number;
  shipped_at: string | null;
}

export interface OrderDetail extends Omit<OrderRow, "items"> {
  updated_at: string;
  shipping_address: Record<string, string | null> | null;
  items: { product_id: string; title: string; image: string | null; amount: number }[];
  amount_subtotal: number;
  amount_shipping: number;
  shipping_rate: {
    carrier: string | null;
    service: string | null;
    estimated_days: number | null;
    shipment_id: string | null;
    rate_id: string | null;
  };
  tracking_number: string | null;
  tracking_url: string | null;
  status_url: string | null;
  stripe_payment_url: string | null;
}

export interface Analytics {
  range_days: number;
  granularity: "day" | "month";
  revenue: number;
  revenue_works: number;
  shipping_collected: number;
  orders: number;
  works_sold: number;
  average_order: number;
  checkout_conversion: number | null;
  abandoned_checkouts: number;
  series: { period: string; revenue: number; orders: number }[];
  awaiting_shipment: OrderRow[];
  recent_orders: OrderRow[];
}

export interface AdminProduct {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  sold: boolean;
  price: number | null;
  images: string[];
  shipping: Record<"ship_length" | "ship_width" | "ship_height" | "ship_weight", string | null>;
  created: number;
  updated: number;
}

export const getAnalytics = (days: number): Promise<Analytics> => api.get("/admin/analytics", { params: { days } });

export const getOrders = (stage: string, offset = 0): Promise<{ total: number; orders: OrderRow[] }> =>
  api.get("/admin/orders", { params: { stage, offset, limit: 50 } });

export const getOrder = (id: string | number): Promise<OrderDetail> => api.get(`/admin/orders/${id}`);

export const shipOrder = (
  id: number,
  body: { tracking_number: string; carrier?: string; tracking_url?: string; notify: boolean },
): Promise<OrderDetail> => api.post(`/admin/orders/${id}/ship`, body);

export const getAdminProducts = (): Promise<AdminProduct[]> => api.get("/admin/products");

export const getAdminProduct = (id: string): Promise<AdminProduct> => api.get(`/admin/products/${id}`);

// Multipart so the artwork image travels with the fields.
const multipart = { headers: { "Content-Type": "multipart/form-data" } };

export const createProduct = (form: FormData): Promise<AdminProduct> => api.post("/admin/products", form, multipart);

export const updateProduct = (id: string, form: FormData): Promise<AdminProduct> =>
  api.patch(`/admin/products/${id}`, form, multipart);

export function apiError(err: unknown, fallback = "Something went wrong. Please try again.") {
  const detail = (err as { response?: { data?: { detail?: unknown } } })?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg);
  return fallback;
}

// Shrinks large photos before upload (max 2400px on the long edge, JPEG) so the
// store loads fast and uploads stay well under the server limit.
export async function prepareImage(file: File, maxEdge = 2400): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 3 * 1024 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.9));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}
