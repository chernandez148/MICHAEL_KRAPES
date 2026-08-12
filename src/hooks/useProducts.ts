// src/features/products/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '../services/products';

// Fetching Data (Queries)
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
}

// Updating Data (Mutations)
// export function useAddProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createProduct,
//     onSuccess: () => {
//       // Automatically refetch products when a new one is added
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });
// }