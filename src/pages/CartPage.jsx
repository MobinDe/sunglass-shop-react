import React from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <p className="text-xl mb-4">سبد خرید شما خالی است.</p>
        <Link
          to="/products"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">سبد خرید</h1>
      <div className="max-w-4xl mx-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center bg-gray-800 rounded-xl p-4 mb-4 gap-4"
          >
            <img
              src={item.image}
              alt={item.title || item.name}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150?text=No+Image";
              }}
            />
            <div className="flex-1 text-right">
              <h3 className="text-lg font-bold">
                {item.title || item.name}
              </h3>
              <p className="text-yellow-500 font-semibold mt-1">
                {item.price?.toLocaleString()} تومان
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-full transition"
              >
                -
              </button>
              <span className="w-8 text-center text-lg">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-full transition"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
            >
              حذف
            </button>
          </div>
        ))}

        <div className="bg-gray-800 rounded-xl p-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xl">
            تعداد کل: <span className="font-bold">{totalItems}</span>
          </div>
          <div className="text-xl">
            مجموع:{" "}
            <span className="font-bold text-yellow-500">
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>
          <Link
  to="/checkout"
  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-lg transition"
>
  ادامه ثبت سفارش
</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;