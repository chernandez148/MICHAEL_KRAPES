import { api } from "./api";

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface ShippingRate {
  id: string;
  amount: number; // cents
  currency: string;
  carrier: string;
  service: string;
  estimated_days: number | null;
  duration_terms: string | null;
}

// Live carrier rates for shipping these works to this address.
export const getShippingRates = async (
  address: ShippingAddress,
  productIds: string[],
): Promise<{ rates: ShippingRate[] }> => {
  return api.post("/shipping/rates", { address, product_ids: productIds });
};
