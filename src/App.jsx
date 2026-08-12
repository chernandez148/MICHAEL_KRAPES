import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./routes/Home";
import About from "./routes/About";
import Store from "./routes/Store";
import Cart from "./routes/Cart";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      </Routes>
    </main>
  );
}
