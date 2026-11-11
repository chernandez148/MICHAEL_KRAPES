import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./routes/Home";
import Gallery from "./routes/Gallery";
import Commissions from "./routes/Commissions";
import Store from "./routes/Store";
import ProductDetail from "./routes/ProductDetail";
import Cart from "./routes/Cart";
import OrderConfirmation from "./routes/OrderConfirmation";
import OrderStatus from "./routes/OrderStatus";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./routes/admin/Login";
import Dashboard from "./routes/admin/Dashboard";
import AdminOrders from "./routes/admin/Orders";
import AdminOrderDetail from "./routes/admin/OrderDetail";
import AdminProducts from "./routes/admin/Products";
import ProductForm from "./routes/admin/ProductForm";

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
        <Route path="orders/:token" element={<OrderStatus />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Studio admin — its own layout, no public navbar/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductForm />} />
      </Route>
    </Routes>
  );
}
