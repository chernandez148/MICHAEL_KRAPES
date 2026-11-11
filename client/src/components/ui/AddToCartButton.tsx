import { Link } from "react-router-dom";
import type { Product } from "../../types/products";
import { addToCart } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { isAvailable, toCartItem } from "../../utils/products";

const base =
  "font-outfit text-[9px] font-normal tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-300 active:scale-[0.97] whitespace-nowrap no-underline inline-block text-center";

export default function AddToCartButton({ product, large = false }: { product: Product; large?: boolean }) {
  const dispatch = useAppDispatch();
  const inCart = useAppSelector((s) => s.cart.items.some((i) => i.id === product._data.id));
  const size = large ? "!text-[11px] !px-10 !py-4 w-full sm:w-auto" : "";

  if (!isAvailable(product)) {
    return (
      <Link
        to="/contact"
        className={`${base} ${size} border border-white/20 text-white/70 hover:border-white/50 hover:text-white`}
      >
        Inquire
      </Link>
    );
  }

  if (inCart) {
    return (
      <Link
        to="/cart"
        className={`${base} ${size} border border-[#c8a96e]/60 text-[#c8a96e] hover:bg-[#c8a96e]/10`}
      >
        In Cart — View
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => dispatch(addToCart(toCartItem(product)))}
      className={`${base} ${size} bg-[#c8a96e] text-[#0a0a0a] hover:bg-[#d4b87a] cursor-pointer border-none`}
      aria-label={`Add ${product._data.name} to cart`}
    >
      Add to Cart
    </button>
  );
}
