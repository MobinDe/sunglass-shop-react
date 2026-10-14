import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useOrders } from "../components/OrderContext";
import { useToast } from "../contexts/ToastContext";
import {
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineTruck,
  HiOutlineTag,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
} from "react-icons/hi";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { createOrder } = useOrders();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: user?.name?.split(" ")[0] || "",
    family: user?.name?.split(" ")[1] || "",
    phone: user?.phone || "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const [shipping, setShipping] = useState("pishtaz");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const shippingCost = shipping === "pishtaz" ? 150000 : 100000;
  const finalTotal = totalPrice + shippingCost - appliedDiscount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isAddressValid =
    form.name.trim() &&
    form.family.trim() &&
    form.phone.trim().length >= 10 &&
    form.province.trim() &&
    form.city.trim() &&
    form.address.trim().length >= 10 &&
    form.postalCode.trim().length >= 10;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "WELCOME10") {
      setAppliedDiscount(Math.floor(totalPrice * 0.1));
      toast.success("کد تخفیف ۱۰٪ اعمال شد");
    } else {
      toast.error("کد تخفیف نامعتبر است");
    }
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isAddressValid) {
      setErrorMsg("لطفاً همه فیلدها را کامل پر کن");
      toast.error("لطفاً همه فیلدها را کامل پر کن");
      return;
    }
    if (!isAuthenticated) {
      setErrorMsg("برای ثبت سفارش باید وارد حساب کاربری بشی");
      toast.error("برای ثبت سفارش باید وارد حساب کاربری بشی");
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    console.log("🔥 دکمه پرداخت کلیک شد");
    console.log("👤 isAuthenticated:", isAuthenticated);
    console.log("👤 user:", user);
    console.log("🛒 cartItems:", cartItems);
    console.log("💰 finalTotal:", finalTotal);

    setErrorMsg("");

    // چک کردن لاگین
    if (!isAuthenticated || !user) {
      console.log("❌ کاربر لاگین نیست!");
      setErrorMsg("برای ثبت سفارش باید وارد حساب کاربری بشی");
      toast.error("برای ثبت سفارش باید وارد حساب کاربری بشی");
      return;
    }

    // چک کردن سبد خالی
    if (cartItems.length === 0) {
      console.log("❌ سبد خالیه!");
      setErrorMsg("سبد خرید خالیه");
      toast.error("سبد خرید خالیه");
      return;
    }

    setIsProcessing(true);
    console.log("⏳ شروع پردازش...");

    setTimeout(() => {
      try {
        console.log("📦 در حال ساخت سفارش...");

        const order = createOrder({
          items: cartItems,
          subtotal: totalPrice,
          shipping: shippingCost,
          discount: appliedDiscount,
          total: finalTotal,
          address: `${form.province}، ${form.city}، ${form.address} (کدپستی: ${form.postalCode})`,
          paymentMethod:
            paymentMethod === "online"
              ? "پرداخت آنلاین (زرین‌پال)"
              : "پرداخت در محل",
        });

        console.log("✅ سفارش ساخته شد:", order);

        setCreatedOrder(order);
        clearCart();
        setStep(3);
        setIsProcessing(false);

        toast.success("سفارش با موفقیت ثبت شد!");
        alert("✅ سفارش با موفقیت ثبت شد!\nشماره: " + order.id);
      } catch (err) {
        console.error("❌ خطا:", err);
        setErrorMsg(err.message || "خطا در ثبت سفارش");
        toast.error(err.message || "خطا در ثبت سفارش");
        alert("❌ خطا: " + (err.message || "خطای نامشخص"));
        setIsProcessing(false);
      }
    }, 1500);
  };

  /* ------- سبد خالیه ------- */
  if (cartItems.length === 0 && step !== 3) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
            <HiOutlineShoppingBag className="w-9 h-9 text-gray-600" />
          </div>
          <h2 className="text-xl font-black mb-2">سبد خرید شما خالی است</h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition mt-4"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-white py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* هدر */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-yellow-500 via-yellow-600 to-yellow-800 p-6 mb-6">
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <HiOutlineCreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">تکمیل سفارش</h1>
              <p className="text-xs text-white/80 mt-0.5">
                فقط چند قدم تا دریافت سفارشت مونده
              </p>
            </div>
          </div>
        </div>

        {/* نوار وضعیت کاربر */}
        <div className={`mb-4 p-3 rounded-xl border text-xs font-bold ${
          isAuthenticated
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {isAuthenticated
            ? `✅ وارد شده‌اید - ${user?.phone}`
            : "❌ وارد نشده‌اید - لطفاً ابتدا از نوبار وارد شوید"}
        </div>

        {/* نمایش خطا */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* نوار پیشرفت */}
        {step !== 3 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            {[
              { num: 1, label: "اطلاعات گیرنده" },
              { num: 2, label: "پرداخت" },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      step >= s.num
                        ? "bg-gradient-to-l from-yellow-500 to-yellow-700 text-white"
                        : "bg-gray-800 text-gray-500 border border-gray-700"
                    }`}
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      step >= s.num ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 1 && (
                  <div
                    className={`w-12 h-0.5 rounded-full ${
                      step > s.num ? "bg-yellow-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* مرحله ۱ */}
            {step === 1 && (
              <form
                onSubmit={handleSubmitAddress}
                className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-5 space-y-5"
              >
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <HiOutlineLocationMarker className="w-5 h-5 text-yellow-400" />
                  اطلاعات گیرنده
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    label="نام *"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="مثلاً علی"
                  />
                  <InputField
                    label="نام خانوادگی *"
                    name="family"
                    value={form.family}
                    onChange={handleChange}
                    placeholder="مثلاً رضایی"
                  />
                  <InputField
                    label="شماره تماس *"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="09123456789"
                    dir="ltr"
                  />
                  <InputField
                    label="کد پستی *"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="۱۰ رقم"
                    dir="ltr"
                  />
                  <InputField
                    label="استان *"
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    placeholder="مثلاً تهران"
                  />
                  <InputField
                    label="شهر *"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="مثلاً تهران"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    آدرس کامل *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="خیابان، کوچه، پلاک، واحد..."
                    className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-xl px-3.5 py-3 text-sm text-white placeholder-gray-500 outline-none transition resize-none"
                  />
                </div>

                {/* روش ارسال */}
                <div>
                  <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                    <HiOutlineTruck className="w-4 h-4 text-yellow-400" />
                    روش ارسال
                  </h3>
                  <div className="space-y-2">
                    <ShippingOption
                      title="پست پیشتاز"
                      desc="تحویل ۲ تا ۳ روز کاری"
                      price={150000}
                      selected={shipping === "pishtaz"}
                      onSelect={() => setShipping("pishtaz")}
                    />
                    <ShippingOption
                      title="ارسال عادی"
                      desc="تحویل ۴ تا ۶ روز کاری"
                      price={100000}
                      selected={shipping === "normal"}
                      onSelect={() => setShipping("normal")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-black text-black bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition"
                >
                  ادامه به پرداخت
                </button>
              </form>
            )}

            {/* مرحله ۲ */}
            {step === 2 && (
              <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-5 space-y-5">
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <HiOutlineCreditCard className="w-5 h-5 text-yellow-400" />
                  روش پرداخت
                </h2>

                <div className="space-y-3">
                  <PaymentOption
                    title="پرداخت آنلاین (زرین‌پال)"
                    desc="پرداخت امن از طریق درگاه بانکی"
                    icon={<HiOutlineCreditCard className="w-5 h-5" />}
                    selected={paymentMethod === "online"}
                    onSelect={() => setPaymentMethod("online")}
                  />
                  <PaymentOption
                    title="پرداخت در محل"
                    desc="هنگام تحویل کالا پرداخت کن"
                    icon={<HiOutlineTruck className="w-5 h-5" />}
                    selected={paymentMethod === "cod"}
                    onSelect={() => setPaymentMethod("cod")}
                  />
                </div>

                {/* کد تخفیف */}
                <div className="pt-5 border-t border-gray-800">
                  <label className="block text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5">
                    <HiOutlineTag className="w-3.5 h-3.5" />
                    کد تخفیف
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف دارید؟"
                      className="flex-1 bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 text-xs font-bold text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-xl transition"
                    >
                      اعمال
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    💡 کد تست: <span className="text-yellow-400 font-bold">WELCOME10</span>
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 text-sm font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-xl transition"
                  >
                    بازگشت
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-[2] py-3.5 text-sm font-black text-black bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 disabled:opacity-60 rounded-xl shadow-lg shadow-yellow-500/20 transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        در حال پردازش...
                      </>
                    ) : (
                      "پرداخت و ثبت سفارش"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* مرحله ۳ */}
            {step === 3 && (
              <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-8 text-center">
                <div className="relative w-20 h-20 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-l from-green-500 to-green-700 flex items-center justify-center shadow-2xl">
                    <HiOutlineCheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-black text-white mb-2">
                  سفارش با موفقیت ثبت شد! 🎉
                </h2>
                <p className="text-sm text-gray-400 mb-1">شماره سفارش:</p>
                <p className="text-base font-black text-yellow-400 mb-6" dir="ltr">
                  {createdOrder?.id}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Link
                    to="/orders"
                    className="flex items-center justify-center gap-2 bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-white text-sm font-bold px-5 py-3 rounded-xl transition"
                  >
                    مشاهده سفارشات
                    <HiOutlineArrowLeft className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/products"
                    className="flex items-center justify-center gap-2 text-gray-300 hover:text-white text-sm font-bold bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-xl transition"
                  >
                    ادامه خرید
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* خلاصه سفارش */}
          {step !== 3 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-black text-white pb-3 border-b border-gray-800">
                  خلاصه سفارش
                </h3>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-xs">
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-gray-800"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/60x60?text=?";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate">
                          {item.title || item.name}
                        </p>
                        <p className="text-[10px] text-gray-500">× {item.quantity || 1}</p>
                      </div>
                      <span className="text-yellow-400 font-bold whitespace-nowrap">
                        {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 pt-3 border-t border-gray-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">جمع کالاها</span>
                    <span className="text-white font-bold">{totalPrice.toLocaleString()} ت</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">هزینه ارسال</span>
                    <span className="text-white font-bold">{shippingCost.toLocaleString()} ت</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">تخفیف</span>
                      <span className="text-green-400 font-bold">
                        -{appliedDiscount.toLocaleString()} ت
                      </span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">مبلغ قابل پرداخت</span>
                    <span className="text-base font-black text-yellow-400 whitespace-nowrap">
                      {finalTotal.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder, dir }) => (
  <div>
    <label className="block text-xs font-bold text-gray-400 mb-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dir={dir || "rtl"}
      className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-xl px-3.5 py-3 text-sm text-white placeholder-gray-500 outline-none transition"
    />
  </div>
);

const ShippingOption = ({ title, desc, price, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-right ${
      selected
        ? "bg-yellow-500/10 border-yellow-500/40"
        : "bg-gray-800/40 border-gray-800 hover:border-gray-700"
    }`}
  >
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
      selected ? "border-yellow-500 bg-yellow-500" : "border-gray-600"
    }`}>
      {selected && <div className="w-2 h-2 rounded-full bg-black" />}
    </div>
    <div className="flex-1 text-right">
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="text-[11px] text-gray-500 mt-0.5">{desc}</p>
    </div>
    <span className="text-sm font-black text-yellow-400 whitespace-nowrap">
      {price.toLocaleString()} ت
    </span>
  </button>
);

const PaymentOption = ({ title, desc, icon, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all text-right ${
      selected
        ? "bg-yellow-500/10 border-yellow-500/40"
        : "bg-gray-800/40 border-gray-800 hover:border-gray-700"
    }`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
      selected ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-700 text-gray-400"
    }`}>
      {icon}
    </div>
    <div className="flex-1 text-right">
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="text-[11px] text-gray-500 mt-0.5">{desc}</p>
    </div>
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
      selected ? "border-yellow-500 bg-yellow-500" : "border-gray-600"
    }`}>
      {selected && <div className="w-2 h-2 rounded-full bg-black" />}
    </div>
  </button>
);

export default CheckoutPage;