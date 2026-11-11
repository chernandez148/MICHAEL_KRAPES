import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./routes/Home";
import Gallery from "./routes/Gallery";
import Commissions from "./routes/Commissions";
import Store from "./routes/Store";
import ProductDetail from "./routes/ProductDetail";
import Cart from "./routes/Cart";
import OrderConfirmation from "./routes/OrderConfirmation";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="commissions" element={<Commissions />} />
        <Route path="store" element={<Store />} />
        <Route path="store/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
