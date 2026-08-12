// src/features/products/api.ts
import { Product } from '../types/products';
import { api } from './api';

export const getProducts = async (): Promise<Product[]> => {
  return api.get('/stripe/products/list');
};
