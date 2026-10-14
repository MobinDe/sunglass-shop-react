import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const OrderContext = createContext();

/* ================================================================ */
/*                    وضعیت‌های سفارش                              */
/* ================================================================ */
export const ORDER_STATUSES = {
  pending: { label: "در انتظار پرداخت", color: "yellow" },
  paid: { label: "پرداخت شده", color: "blue" },
  shipped: { label: "در حال ارسال", color: "purple" },
  delivered: { label: "تحویل داده شده", color: "green" },
  cancelled: { label: "لغو شده", color: "red" },
};

/* ================================================================ */
/*                     سازنده‌ی سفارش                              */
/* ================================================================ */
const generateOrderId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `ORD-${year}-${random}`;
};

const buildTimeline = (status) => {
  const steps = ["pending", "paid", "shipped", "delivered"];
  const currentIndex = steps.indexOf(status);

  return steps.map((step, i) => ({
    status: step,
    label: ORDER_STATUSES[step].label,
    date: i <= currentIndex ? new Date().toISOString() : null,
    isDone: i <= currentIndex,
    isActive: i === currentIndex,
  }));
};

/* ================================================================ */
/*                       Provider اصلی                             */
/* ================================================================ */
export const OrderProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  /* ------- خواندن از localStorage ------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orders");
      setOrders(saved ? JSON.parse(saved) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  /* ------- ذخیره در localStorage ------- */
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /* ------- سفارشات کاربر جاری ------- */
  const getUserOrders = () => {
    if (!isAuthenticated || !user) return [];
    return orders
      .filter((o) => o.userId === user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  /* ------- یک سفارش ------- */
  const getOrderById = (id) => orders.find((o) => o.id === id);

  /* ================================================================ */
  /*                    ساخت سفارش جدید                              */
  /* ================================================================ */
  const createOrder = ({ items, subtotal, shipping, discount, total, address, paymentMethod }) => {
    if (!isAuthenticated || !user) {
      throw new Error("برای ثبت سفارش باید وارد حساب کاربری بشوید");
    }

    const newOrder = {
      id: generateOrderId(),
      userId: user.id,
      userName: user.name || "کاربر",
      userPhone: user.phone,
      items: items.map((i) => ({
        id: i.id,
        title: i.title || i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity || 1,
      })),
      subtotal,
      shipping,
      discount,
      total,
      address,
      paymentMethod: paymentMethod || "زرین‌پال",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: buildTimeline("pending"),
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  /* ================================================================ */
  /*                   پرداخت سفارش (pending → paid)                  */
  /* ================================================================ */
  const payOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          status: "paid",
          updatedAt: new Date().toISOString(),
          timeline: buildTimeline("paid"),
          paidAt: new Date().toISOString(),
        };
      })
    );
  };

  /* ================================================================ */
  /*              شبیه‌سازی پیشرفت سفارش (Demo)                      */
  /* ================================================================ */
  const advanceOrder = (orderId) => {
    const flow = ["pending", "paid", "shipped", "delivered"];
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const currentIndex = flow.indexOf(o.status);
        const nextIndex = Math.min(currentIndex + 1, flow.length - 1);
        const next = flow[nextIndex];
        return {
          ...o,
          status: next,
          updatedAt: new Date().toISOString(),
          timeline: buildTimeline(next),
        };
      })
    );
  };

  /* ================================================================ */
  /*                      لغو سفارش                                  */
  /* ================================================================ */
  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        if (!["pending", "paid"].includes(o.status)) return o;
        return {
          ...o,
          status: "cancelled",
          updatedAt: new Date().toISOString(),
          cancelledAt: new Date().toISOString(),
          timeline: buildTimeline("cancelled"),
        };
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        getUserOrders,
        getOrderById,
        createOrder,
        payOrder,
        advanceOrder,
        cancelOrder,
        totalOrders: getUserOrders().length,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders باید داخل OrderProvider استفاده شود");
  return ctx;
};