import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import Header from "../components/ui/Header";
import ProductList from "../sections/Store/ProductList";

function Store() {
  const dispatch = useDispatch();

  return (
    <main className="Store relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-28 flex flex-col gap-20 md:gap-32">
      {/* ── MAIN STOREFRONT CONTAINER ── */}
      <Header breadcrumbs="03 / STORE" title="PAINTINGS FOR SALE" />
      <ProductList />
    </main>
  );
}

export default Store;
