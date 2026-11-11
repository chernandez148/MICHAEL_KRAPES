import { api } from "./api";

// Creates a pending order on the server and returns the Stripe Checkout URL.
export const createCheckout = async (productIds: string[]): Promise<{ url: string }> => {
  return api.post("/orders/checkout", {
    items: productIds.map((product_id) => ({ product_id, quantity: 1 })),
  });
};
