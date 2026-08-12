import React from "react";
import { useProducts } from "../../hooks/useProducts";

function ProductList() {
  const { data: products, isLoading, isError, error } = useProducts();
  console.log(products);
  return <section>
    {isLoading ? (
      <p>Loading products...</p>
    ) : isError ? (
      <p>Error loading products: {error.message}</p>
    ) : (
      <ul>
        {products?.map((product) => (
          <li key={product._data.id}>
            <img src={product._data.images[0]} alt={product._data.name} />
            <p>{product._data.name}</p>
          </li>
        ))}
      </ul>
    )}
  </section>;
}

export default ProductList;
