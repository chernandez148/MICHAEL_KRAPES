import Header from "../components/ui/Header";
import ProductList from "../sections/Store/ProductList";

function Store() {
  return (
    <>
      <Header breadcrumbs="04 / STORE" title="PAINTINGS FOR SALE" />
      <ProductList />
    </>
  );
}

export default Store;
