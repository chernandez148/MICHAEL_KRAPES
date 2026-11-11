import { api } from "./api";
import type { ShippingAddress } from "./shipping";

// Creates a pending order on the server and returns the Stripe Checkout URL.
// The server re-verifies the chosen shipping rate; amounts are never trusted from here.
export const createCheckout = async (
  productIds: string[],
  shippingRateId: string,
  shippingAddress: ShippingAddress,
): Promise<{ url: string }> => {
  return api.post("/orders/checkout", {
    items: productIds.map((product_id) => ({ product_id, quantity: 1 })),
    shipping_rate_id: shippingRateId,
    shipping_address: shippingAddress,
  });
};

export interface OrderStatus {
  number: number;
  stage: "pending" | "paid" | "shipped" | "failed" | "refunded";
  created_at: string;
  shipped_at: string | null;
  items: { title: string; image: string | null; amount: number }[];
  amount_subtotal: number;
  amount_shipping: number;
  amount_total: number;
  shipping_service: string | null;
  ship_to: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
}

export const getOrderStatus = async (token: string): Promise<OrderStatus> => {
  return api.get(`/orders/status/${encodeURIComponent(token)}`);
};

export const getOrderBySession = async (sessionId: string): Promise<{ token: string; number: number }> => {
  return api.get(`/orders/by-session/${encodeURIComponent(sessionId)}`);
};
