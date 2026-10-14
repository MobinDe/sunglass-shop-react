import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../components/WishlistContext";
import { useCart } from "../components/CartContext";
import Card from "../components/card";
import {
  HiOutlineHeart,
  HiOutlineTrash,
  HiOutlineArrowLeft,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

// گزینه‌های مرتب‌سازی
const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
];

const WishlistPage = () => {
  const { wishlist, clearWishlist, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("newest");
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // ========== مرتب‌سازی محصولات ==========
  const sortedWishlist = useMemo(() => {
    const list = [...wishlist];
    switch (sortBy) {
      case "cheapest":
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "expensive":
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return list;
    }
  }, [wishlist, sortBy]);

  // ========== محاسبه آمار ==========
  const totalValue = useMemo(
    () =>
      wishlist.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [wishlist]
  );

  const availableCount = useMemo(
    () => wishlist.filter((p) => (p.stock ?? 1) > 0).length,
    [wishlist]
  );

  // ========== افزودن همه به سبد ==========
  const handleAddAllToCart = () => {
    wishlist.forEach((product) => addToCart(product));
  };

  // ========== پاک کردن همه با تایید ==========
  const handleClearConfirmed = () => {
    clearWishlist();
    setShowConfirmClear(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-white pb-16">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* ================= هدر با گرادیان ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-yellow-500 via-yellow-600 to-yellow-800 p-6 sm:p-8 mb-6 shadow-2xl shadow-yellow-500/10">
          {/* بافت تزئینی */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-black/20 blur-3xl" />
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                <HiOutlineHeart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 drop-shadow-sm">
                  علاقه‌مندی‌های من
                </h1>
                <p className="text-xs sm:text-sm text-white/80">
                  {totalWishlistItems > 0
                    ? `${totalWishlistItems} محصول را برای بعد ذخیره کرده‌ای`
                    : "لیستت هنوز خالیه"}
                </p>
              </div>
            </div>

            {totalWishlistItems > 0 && (
              <div className="flex items-center gap-2 bg-black/25 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/20">
                <HiOutlineSparkles className="w-5 h-5 text-yellow-200" />
                <div className="text-right">
                  <p className="text-[10px] text-white/70">ارزش کل</p>
                  <p className="text-sm font-black text-white">
                    {totalValue.toLocaleString()}{" "}
                    <span className="text-[10px] font-normal">تومان</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {totalWishlistItems === 0 ? (
          // ================= حالت خالی =================
          <EmptyWishlist />
        ) : (
          <>
            {/* ================= کارت‌های آماری ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <StatCard
                icon={<HiOutlineHeart className="w-5 h-5" />}
                label="محصولات ذخیره‌شده"
                value={totalWishlistItems}
                accent="yellow"
              />
              <StatCard
                icon={<HiOutlineCurrencyDollar className="w-5 h-5" />}
                label="ارزش کل لیست"
                value={`${totalValue.toLocaleString()} ت`}
                accent="green"
              />
              <StatCard
                icon={<HiOutlineChartBar className="w-5 h-5" />}
                label="موجود در انبار"
                value={`${availableCount} از ${totalWishlistItems}`}
                accent="blue"
              />
            </div>

            {/* ================= نوار ابزار (مرتب‌سازی + عملیات) ================= */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 sm:p-4 bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl">
              {/* مرتب‌سازی */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-gray-400 ml-1">
                  مرتب‌سازی:
                </span>
                <div className="flex items-center gap-1.5 bg-gray-800/70 rounded-xl p-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                        ${
                          sortBy === opt.value
                            ? "bg-gradient-to-l from-yellow-500 to-yellow-700 text-white shadow-md shadow-yellow-500/20"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/60"
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* عملیات */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleAddAllToCart}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-l from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 px-3.5 py-2 rounded-xl shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 active:scale-95 transition-all"
                >
                  <HiOutlineShoppingBag className="w-4 h-4" />
                  افزودن همه به سبد
                </button>

                <button
                  onClick={() => setShowConfirmClear(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-3.5 py-2 rounded-xl active:scale-95 transition-all"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                  پاک کردن همه
                </button>
              </div>
            </div>

            {/* ================= گرید محصولات ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {sortedWishlist.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <Card product={product} />
                </div>
              ))}
            </div>

            {/* ================= دکمه بازگشت به فروشگاه ================= */}
            <div className="flex justify-center mt-10">
              <Link
                to="/products"
                className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-yellow-400 border border-gray-800 hover:border-yellow-500/40 rounded-xl px-5 py-3 transition-all"
              >
                <HiOutlineArrowLeft className="w-4 h-4" />
                ادامه‌ی خرید
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ================= مودال تایید پاک کردن ================= */}
      {showConfirmClear && (
        <ConfirmModal
          onCancel={() => setShowConfirmClear(false)}
          onConfirm={handleClearConfirmed}
          count={totalWishlistItems}
        />
      )}

      {/* انیمیشن ورود کارت‌ها */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out both;
        }
      `}</style>
    </div>
  );
};

/* ================================================================ */
/*                          کامپوننت‌های کمکی                        */
/* ================================================================ */

// ---------- کارت آماری ----------
const StatCard = ({ icon, label, value, accent = "yellow" }) => {
  const accents = {
    yellow: {
      bg: "from-yellow-500/15 to-yellow-800/5",
      border: "border-yellow-500/20",
      icon: "bg-yellow-500/20 text-yellow-400",
    },
    green: {
      bg: "from-green-500/15 to-green-800/5",
      border: "border-green-500/20",
      icon: "bg-green-500/20 text-green-400",
    },
    blue: {
      bg: "from-blue-500/15 to-blue-800/5",
      border: "border-blue-500/20",
      icon: "bg-blue-500/20 text-blue-400",
    },
  };
  const a = accents[accent] || accents.yellow;

  return (
    <div
      className={`
        relative overflow-hidden bg-gradient-to-l ${a.bg}
        border ${a.border} rounded-2xl p-4
        hover:scale-[1.02] transition-transform duration-300
      `}
    >
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${a.icon} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
          <p className="text-base sm:text-lg font-black text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

// ---------- حالت خالی ----------
const EmptyWishlist = () => (
  <div className="relative flex flex-col items-center justify-center py-16 sm:py-24 px-4 text-center bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden">
    {/* افکت پس‌زمینه */}
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl" />
    </div>

    <div className="relative">
      {/* آیکون قلب با انیمیشن */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-yellow-500/10 animate-ping" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-2xl shadow-black/50">
          <HiOutlineHeart className="w-12 h-12 text-yellow-500/70" />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
        لیست علاقه‌مندی‌هات خالیه
      </h2>
      <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
        محصولاتی که دوست داری رو با کلیک روی آیکون{" "}
        <span className="text-red-400">❤️</span> ذخیره کن تا بعداً راحت پیداشون
        کنی.
      </p>

      <Link
        to="/products"
        className="inline-flex items-center gap-2 bg-gradient-to-l from-yellow-500 to-yellow-800 hover:from-yellow-400 hover:to-yellow-700 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 active:scale-95 transition-all"
      >
        <HiOutlineShoppingBag className="w-4 h-4" />
        شروع خرید
        <HiOutlineArrowLeft className="w-4 h-4" />
      </Link>

      {/* سه ویژگی برای ترغیب */}
      <div className="grid grid-cols-3 gap-3 mt-10 max-w-md mx-auto">
        {[
          { icon: "🚚", label: "ارسال سریع" },
          { icon: "💳", label: "پرداخت امن" },
          { icon: "🔄", label: "۳۰ روز بازگشت" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-900/60 border border-gray-800 rounded-xl p-3 text-center"
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <p className="text-[10px] text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ---------- مودال تایید ----------
const ConfirmModal = ({ onCancel, onConfirm, count }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    onClick={onCancel}
  >
    <div
      className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-black/60"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
        <HiOutlineTrash className="w-7 h-7 text-red-400" />
      </div>

      <h3 className="text-lg font-extrabold text-white text-center mb-2">
        پاک کردن همه‌ی علاقه‌مندی‌ها؟
      </h3>
      <p className="text-xs text-gray-400 text-center leading-relaxed mb-6">
        با این کار، همه‌ی <span className="text-yellow-400 font-bold">{count} محصول</span>{" "}
        از لیست علاقه‌مندی‌هات پاک می‌شن. این عمل قابل بازگشت نیست.
      </p>

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 text-sm font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl transition"
        >
          انصراف
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 text-sm font-bold text-white bg-gradient-to-l from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 py-3 rounded-xl shadow-md shadow-red-500/20 active:scale-95 transition"
        >
          بله، پاک کن
        </button>
      </div>
    </div>
  </div>
);

export default WishlistPage;