// App.js
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";  // 👈 اضافه کن
import { CartProvider } from "./components/CartContext";
import { OrderProvider } from "./components/OrderContext";  // 👈 اگه نداری
import { WishlistProvider } from "./components/WishlistContext";

// صفحات
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import BlogPage from "./pages/BlogPage";
import TrendyGlassesPage from "./pages/TrendyGlassesPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <WishlistProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<AllProductsPage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="trendy" element={<TrendyGlassesPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="orders" element={<OrdersPage />} />
                </Route>
              </Routes>
            </WishlistProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;