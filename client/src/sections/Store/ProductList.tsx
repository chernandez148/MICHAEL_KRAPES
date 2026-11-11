import { useProducts } from "../../hooks/useProducts";
import Card from "../../components/ui/Card";
import StatusMessage from "../../components/ui/StatusMessage";

function ProductList() {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#121212] border border-white/5 animate-pulse flex flex-col h-[520px]">
            <div className="w-full aspect-[4/5] bg-white/5" />
            <div className="p-6 space-y-4">
              <div className="h-3 bg-white/10 w-1/3 rounded-sm" />
              <div className="h-6 bg-white/10 w-2/3 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <StatusMessage title="Unable to load catalogue" tone="error">
        {error?.message || "An unexpected error occurred while fetching works."}
      </StatusMessage>
    );
  }

  if (!products?.length) {
    return <StatusMessage title="No works currently available" />;
  }

  return (
    <section aria-label="Art catalogue">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-0 m-0 list-none">
        {products.map((product) => (
          <li key={product._data.id} className="flex">
            <Card product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
