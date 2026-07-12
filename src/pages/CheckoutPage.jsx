import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    family: "",
    phone: "",
    address: "",
    postalCode: "",
  });
  const [shipping, setShipping] = useState("pishtaz"); // پیش‌فرض پست پیشتاز
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const shippingCost = shipping === "pishtaz" ? 150000 : 100000;
  const finalTotal = totalPrice + shippingCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // اعتبارسنجی ساده (همه فیلدها پر شده باشند)
    if (
      !form.name ||
      !form.family ||
      !form.phone ||
      !form.address ||
      !form.postalCode
    ) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return;
    }
    setOrderPlaced(true);
  };

  const handlePayment = () => {
    // شبیه‌سازی پرداخت موفق
    setPaymentDone(true);
    clearCart();
  };

  if (cartItems.length === 0 && !paymentDone) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <p className="text-xl mb-4">سبد خرید شما خالی است.</p>
        <Link
          to="/products"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  if (paymentDone) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="bg-green-600 rounded-full p-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-2xl font-bold mb-2">پرداخت با موفقیت انجام شد</p>
        <p className="text-lg text-gray-300">
          بعد از پرداخت سفارش ارسال خواهد شد.
        </p>
        <Link
          to="/"
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition"
        >
          بازگشت به خانه
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">سفارش شما ثبت شد</h2>
        <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full text-center">
          <p className="mb-2">
            مبلغ نهایی:{" "}
            <span className="text-yellow-500 font-bold">
              {finalTotal.toLocaleString()} تومان
            </span>
          </p>
          <p className="mb-6 text-gray-300">
            لطفاً برای تکمیل فرایند، پرداخت را انجام دهید.
          </p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition"
          >
            پرداخت آنلاین
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">تکمیل سفارش</h1>

        {/* خلاصه سفارش */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">اطلاعات سفارش</h2>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.title || item.name}</span>
                <span>
                  {item.quantity} × {item.price?.toLocaleString()} تومان
                </span>
              </div>
            ))}
          </div>
          <hr className="my-3 border-gray-700" />
          <div className="flex justify-between font-bold">
            <span>جمع سبد خرید:</span>
            <span>{totalPrice.toLocaleString()} تومان</span>
          </div>
        </div>

        {/* فرم اطلاعات مشتری */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">اطلاعات گیرنده</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">نام *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block mb-1">نام خانوادگی *</label>
              <input
                type="text"
                name="family"
                value={form.family}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block mb-1">شماره تلفن *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block mb-1">کد پستی *</label>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-1">آدرس *</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                rows="3"
                required
              />
            </div>
          </div>

          {/* انتخاب روش ارسال */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">روش ارسال</h2>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                value="pishtaz"
                checked={shipping === "pishtaz"}
                onChange={() => setShipping("pishtaz")}
                className="text-yellow-500 focus:ring-yellow-500"
              />
              <span>پست پیشتاز - ۱۵۰,۰۰۰ تومان</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                value="normal"
                checked={shipping === "normal"}
                onChange={() => setShipping("normal")}
                className="text-yellow-500 focus:ring-yellow-500"
              />
              <span>ارسال عادی - ۱۰۰,۰۰۰ تومان</span>
            </label>
          </div>

          {/* مجموع نهایی */}
          <div className="mt-6 bg-gray-900 p-4 rounded-lg">
            <div className="flex justify-between text-lg">
              <span>هزینه ارسال:</span>
              <span>{shippingCost.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-yellow-500">
                {finalTotal.toLocaleString()} تومان
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-lg transition"
          >
            ثبت سفارش
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;