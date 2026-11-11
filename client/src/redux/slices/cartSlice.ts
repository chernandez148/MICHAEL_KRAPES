import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string; // Stripe product id
  name: string;
  description: string | null;
  image: string | null;
  amount: number | null; // cents
}

const STORAGE_KEY = "mk-cart";

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveItems(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — cart just won't persist */
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadItems() },
  reducers: {
    // Originals are one-of-a-kind, so each work can only be added once.
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
