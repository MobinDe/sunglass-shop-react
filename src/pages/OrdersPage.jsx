import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useOrders, ORDER_STATUSES } from "../components/OrderContext";
import { useToast } from "../contexts/ToastContext";
import {
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineSearch,
  HiOutlineArrowLeft,
  HiOutlineTag,
  HiOutlineTrash,
} from "react-icons/hi";

const statusIconMap = {
  pending: HiOutlineClock,
  paid: HiOutlineCheckCircle,
  shipped: HiOutlineTruck,
  delivered: HiOutlineCheckCircle,
  cancelled: HiOutlineXCircle,
};

const statusColorMap = {
  yellow: {
    bg: "bg-yellow-500/15",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
  },
  blue: {
    bg: "bg-blue-500/15",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  purple: {
    bg: "bg-purple-500/15",
    border: "border-purple-500/30",
    text: "text-purple-400",
  },
  green: {
    bg: "bg-green-500/15",
    border: "border-green-500/30",
    text: "text-green-400",
  },
  red: {
    bg: "bg-red-500/15",
    border: "border-red-500/30",
    text: "text-red-400",
  },
};

const OrdersPage = () => {
  const toast = useToast();
  const { getUserOrders, payOrder, advanceOrder, cancelOrder } = useOrders();
  const orders = getUserOrders();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  /* ------- فیلتر ------- */
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (activeFilter !== "all") {
      result = result.filter((o) => o.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.items.some((i) => i.title.toLowerCase().includes(q))
      );
    }

    return result;
  }, [orders, activeFilter, searchQuery]);

  /* ------- شمارش ------- */
  const statusCounts = useMemo(() => {
    const counts = { all: orders.length };
    Object.keys(ORDER_STATUSES).forEach((key) => {
      counts[key] = orders.filter((o) => o.status === key).length;
    });
    return counts;
  }, [orders]);

  /* ------- عملیات ------- */
  const handlePay = (orderId) => {
    payOrder(orderId);
    toast.success("پرداخت با موفقیت انجام شد");
  };

  const handleCancel = (orderId) => {
    cancelOrder(orderId);
    toast.info("سفارش لغو شد");
  };

  const handleAdvance = (orderId) => {
    advanceOrder(orderId);
    toast.success("وضعیت سفارش به‌روزرسانی شد");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-white py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* ================= هدر ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-yellow-500 via-yellow-600 to-yellow-800 p-6 sm:p-8 mb-6 shadow-2xl shadow-yellow-500/10">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <HiOutlineShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
                سفارشات من
              </h1>
              <p className="text-xs sm:text-sm text-white/80">
                {orders.length > 0
                  ? `مجموعاً ${orders.length} سفارش ثبت شده`
                  : "هنوز سفارشی نداری"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= فیلتر و جستجو ================= */}
        {orders.length > 0 && (
          <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-4 mb-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در سفارشات..."
                className="w-full py-3 pr-11 pl-4 bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition"
              />
              <HiOutlineSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <FilterChip
                label="همه"
                count={statusCounts.all}
                active={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
              />
              {Object.entries(ORDER_STATUSES).map(([key, status]) => (
                <FilterChip
                  key={key}
                  label={status.label}
                  count={statusCounts[key] || 0}
                  active={activeFilter === key}
                  onClick={() => setActiveFilter(key)}
                  color={status.color}
                />
              ))}
            </div>
          </div>
        )}

        {/* ================= لیست ================= */}
        {filteredOrders.length === 0 ? (
          <EmptyState
            hasOrders={orders.length > 0}
            isFiltering={searchQuery || activeFilter !== "all"}
          />
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrder === order.id}
                onToggle={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                index={index}
                onPay={handlePay}
                onCancel={handleCancel}
                onAdvance={handleAdvance}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

/* ================================================================ */
/*                       کامپوننت‌های کمکی                          */
/* ================================================================ */

const FilterChip = ({ label, count, active, onClick, color = "yellow" }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap
      border transition-all active:scale-95
      ${
        active
          ? "bg-gradient-to-l from-yellow-500 to-yellow-700 text-white border-yellow-500 shadow-md shadow-yellow-500/20"
          : "bg-gray-800 border-gray-700 text-gray-300 hover:border-yellow-500/40"
      }
    `}
  >
    {label}
    <span
      className={`
        min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black
        flex items-center justify-center
        ${active ? "bg-black/30 text-white" : "bg-gray-700 text-gray-300"}
      `}
    >
      {count}
    </span>
  </button>
);

const OrderCard = ({ order, isExpanded, onToggle, index, onPay, onCancel, onAdvance }) => {
  const status = ORDER_STATUSES[order.status] || ORDER_STATUSES.pending;
  const statusColor = statusColorMap[status.color];
  const StatusIcon = statusIconMap[order.status] || HiOutlineClock;

  const createdDate = new Date(order.createdAt).toLocaleDateString("fa-IR");

  return (
    <div
      className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition"
      style={{ animation: `fadeInUp 0.4s ease-out ${index * 60}ms both` }}
    >
      {/* هدر */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
            >
              <StatusIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-gray-500">شماره:</span>
                <span className="text-xs font-black text-yellow-400" dir="ltr">
                  {order.id}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">{createdDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-black px-3 py-1.5 rounded-full border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
            >
              {status.label}
            </span>
            <button
              onClick={onToggle}
              className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-yellow-400 transition"
            >
              {isExpanded ? (
                <HiOutlineChevronUp className="w-4 h-4" />
              ) : (
                <HiOutlineChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* خلاصه */}
        <div className="flex items-center justify-between gap-4 py-3 border-t border-gray-800">
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-gray-500">اقلام: </span>
              <span className="font-bold text-white">{order.items.length}</span>
            </div>
            <div className="w-px h-4 bg-gray-800" />
            <div>
              <span className="text-gray-500">مبلغ: </span>
              <span className="font-black text-yellow-400 whitespace-nowrap">
                {order.total.toLocaleString()} ت
              </span>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="text-xs font-bold text-yellow-400 hover:text-yellow-300 transition"
          >
            {isExpanded ? "بستن" : "جزئیات"}
          </button>
        </div>
      </div>

      {/* جزئیات */}
      {isExpanded && (
        <div className="border-t border-gray-800 bg-gray-950/40 p-4 sm:p-5 space-y-4">
          {/* Timeline */}
          <div>
            <h4 className="text-xs font-black text-gray-400 mb-3 flex items-center gap-2">
              <span className="w-1 h-3 bg-yellow-500 rounded-full" />
              پیگیری سفارش
            </h4>
            <div className="flex items-center justify-between gap-1">
              {order.timeline.map((step, i) => (
                <React.Fragment key={step.status}>
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-black
                        ${
                          step.isDone
                            ? "bg-gradient-to-l from-yellow-500 to-yellow-700 text-white shadow-md shadow-yellow-500/30"
                            : "bg-gray-800 text-gray-600 border border-gray-700"
                        }
                      `}
                    >
                      {step.isDone ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[9px] text-center max-w-[60px] ${
                        step.isDone ? "text-yellow-400 font-bold" : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < order.timeline.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 rounded-full ${
                        order.timeline[i + 1].isDone
                          ? "bg-yellow-500"
                          : "bg-gray-800"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* اقلام */}
          <div>
            <h4 className="text-xs font-black text-gray-400 mb-3 flex items-center gap-2">
              <span className="w-1 h-3 bg-yellow-500 rounded-full" />
              اقلام سفارش
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-900/60 border border-gray-800 rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover bg-gray-800"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80x80?text=?";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      تعداد: {item.quantity}
                    </p>
                  </div>
                  <div className="text-left shrink-0">
                    <p className="text-sm font-black text-yellow-400 whitespace-nowrap">
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-500">تومان</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* اطلاعات ارسال و پرداخت */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3.5 bg-gray-900/60 border border-gray-800 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0">
                <HiOutlineLocationMarker className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-500 mb-0.5">آدرس ارسال</p>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {order.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-gray-900/60 border border-gray-800 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                <HiOutlineCreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 mb-0.5">روش پرداخت</p>
                <p className="text-xs text-gray-200 font-bold">
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          {/* جمع‌بندی */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">جمع کالاها</span>
              <span className="text-white font-bold">
                {order.subtotal.toLocaleString()} ت
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">هزینه ارسال</span>
              <span className="text-white font-bold">
                {order.shipping === 0 ? (
                  <span className="text-green-400">رایگان</span>
                ) : (
                  `${order.shipping.toLocaleString()} ت`
                )}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">تخفیف</span>
                <span className="text-green-400 font-bold">
                  -{order.discount.toLocaleString()} ت
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-800 flex justify-between">
              <span className="text-sm font-bold text-white">مبلغ کل</span>
              <span className="text-base font-black text-yellow-400">
                {order.total.toLocaleString()} تومان
              </span>
            </div>
          </div>

          {/* دکمه‌های عملیات */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {order.status === "pending" && (
              <>
                <button
                  onClick={() => onPay(order.id)}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 text-xs font-bold text-black bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 py-3 rounded-xl shadow-lg shadow-yellow-500/20 transition active:scale-95"
                >
                  <HiOutlineCreditCard className="w-4 h-4" />
                  پرداخت سفارش
                </button>
                <button
                  onClick={() => onCancel(order.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-4 py-3 rounded-xl transition"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                  لغو
                </button>
              </>
            )}

            {order.status === "paid" && (
              <>
                <button
                  onClick={() => onAdvance(order.id)}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 py-3 rounded-xl transition"
                >
                  <HiOutlineTruck className="w-4 h-4" />
                  شبیه‌سازی ارسال
                </button>
                <button
                  onClick={() => onCancel(order.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-4 py-3 rounded-xl transition"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                  لغو
                </button>
              </>
            )}

            {order.status === "shipped" && (
              <button
                onClick={() => onAdvance(order.id)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 py-3 rounded-xl transition"
              >
                <HiOutlineCheckCircle className="w-4 h-4" />
                دریافت سفارش
              </button>
            )}

            {order.status === "delivered" && (
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 py-3 rounded-xl transition">
                <HiOutlineTag className="w-4 h-4" />
                ثبت نظر
              </button>
            )}
          </div>
        </div>
      )}

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
      `}</style>
    </div>
  );
};

const EmptyState = ({ hasOrders, isFiltering }) => (
  <div className="relative flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden">
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl" />
    </div>

    <div className="relative">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-yellow-500/10 animate-ping" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
          <HiOutlineShoppingBag className="w-12 h-12 text-yellow-500/70" />
        </div>
      </div>

      <h2 className="text-xl font-black text-white mb-2">
        {isFiltering ? "سفارشی پیدا نشد" : "هنوز سفارشی ثبت نکردی"}
      </h2>
      <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">
        {isFiltering
          ? "فیلترها رو تغییر بده یا عبارت دیگه‌ای جستجو کن."
          : "اولین سفارشت رو همین حالا ثبت کن!"}
      </p>

      <Link
        to="/products"
        className="inline-flex items-center gap-2 bg-gradient-to-l from-yellow-500 to-yellow-800 hover:from-yellow-400 hover:to-yellow-700 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-yellow-500/20 transition"
      >
        <HiOutlineShoppingBag className="w-4 h-4" />
        مشاهده محصولات
        <HiOutlineArrowLeft className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

export default OrdersPage;