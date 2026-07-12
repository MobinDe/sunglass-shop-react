// App.js
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import BlogPage from "./pages/BlogPage";
import TrendyGlassesPage from "./pages/TrendyGlassesPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./components/CartContext";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<AllProductsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="trendy" element={<TrendyGlassesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;