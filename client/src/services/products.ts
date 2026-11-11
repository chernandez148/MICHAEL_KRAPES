import type { Product } from "../types/products";
import { api } from "./api";

// The axios response interceptor unwraps `response.data`.
export const getProducts = async (): Promise<Product[]> => {
  return api.get("/stripe/products/list");
};

export const getProduct = async (id: string): Promise<Product> => {
  return api.get(`/stripe/products/${id}`);
};
