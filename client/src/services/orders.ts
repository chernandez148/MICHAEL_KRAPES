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
