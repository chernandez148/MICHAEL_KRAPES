import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../services/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
