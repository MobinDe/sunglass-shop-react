// src/components/AdminChat.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  HiOutlineChatAlt2,
  HiOutlineX,
  HiOutlinePaperAirplane,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineMinus,
  HiOutlineTrash,
} from "react-icons/hi";

/* ================================================================ */
/*                     پیام خوش‌آمد پیش‌فرض                        */
/* ================================================================ */
const WELCOME_MESSAGE = {
  id: "welcome",
  from: "admin",
  text: "سلام 👋 من پشتیبان فروشگاه سلطانی هستم. چطور می‌تونم کمکتون کنم؟",
  time: new Date().toISOString(),
};

/* ================================================================ */
/*                  پاسخ‌های خودکار ادمین (شبیه‌سازی)              */
/* ================================================================ */
const getAutoReply = (userText) => {
  const text = userText.toLowerCase();

  if (text.includes("سلام") || text.includes("salam") || text.includes("درود")) {
    return "سلام و درود 🌹 چطور می‌تونم کمکتون کنم؟";
  }
  if (text.includes("قیمت") || text.includes("هزینه") || text.includes("چند")) {
    return "قیمت همه‌ی محصولات توی صفحه‌ی هر محصول نوشته شده 💰 اگه سوال خاصی داری بپرس.";
  }
  if (text.includes("ارسال") || text.includes("پست") || text.includes("تحویل")) {
    return "ارسال ما بین ۲۴ تا ۴۸ ساعته انجام می‌شه 📦 به همه‌ی شهرهای ایران ارسال داریم.";
  }
  if (text.includes("گارانتی") || text.includes("ضمانت") || text.includes("اصالت")) {
    return "همه‌ی محصولات ما اصالت کالا دارن و ۳۰ روز بازگشت وجه بدون قید و شرط ✅";
  }
  if (text.includes("مرجوع") || text.includes("بازگشت") || text.includes("پس دادن")) {
    return "تا ۳۰ روز بعد از خرید می‌تونی کالا رو بازگشت بدی 🔄 فقط کافیه با پشتیبانی تماس بگیری.";
  }
  if (text.includes("تخفیف") || text.includes("کد")) {
    return "کدهای تخفیف ما توی صفحه‌ی اصلی و شبکه‌های اجتماعی اعلام می‌شن 🎁";
  }
  if (text.includes("پرداخت") || text.includes("کارت")) {
    return "پرداخت آنلاین امن از طریق درگاه بانکی انجام می‌شه 💳";
  }
  if (text.includes("تشکر") || text.includes("ممنون") || text.includes("مرسی")) {
    return "خواهش می‌کنم 🌸 اگه سوال دیگه‌ای داشتی در خدمتم.";
  }
  if (text.includes("خداحافظ") || text.includes("بای")) {
    return "خدانگهدار 🙋‍♂️ موفق باشی!";
  }

  return "پیامت رو دریافت کردم ✅ به زودی یکی از همکارانمون پاسخ می‌ده. اگه عجله داری می‌تونی با شماره‌ی ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیری.";
};

/* ================================================================ */
/*                          کامپوننت اصلی                           */
/* ================================================================ */
const AdminChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("admin_chat");
      return saved ? JSON.parse(saved) : [WELCOME_MESSAGE];
    } catch {
      return [WELCOME_MESSAGE];
    }
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  /* ------- ذخیره در localStorage ------- */
  useEffect(() => {
    localStorage.setItem("admin_chat", JSON.stringify(messages));
  }, [messages]);

  /* ------- اسکرول خودکار به آخرین پیام ------- */
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  /* ------- صفر کردن شمارنده وقتی چت بازه ------- */
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen, messages]);

  /* ------- ارسال پیام ------- */
  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // پیام کاربر
    const userMsg = {
      id: "u_" + Date.now(),
      from: "user",
      text,
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // پاسخ ادمین بعد از ۱.۵ ثانیه
    setTimeout(() => {
      const adminMsg = {
        id: "a_" + Date.now(),
        from: "admin",
        text: getAutoReply(text),
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, adminMsg]);
      setIsTyping(false);

      if (!isOpen) setUnreadCount((c) => c + 1);
    }, 1500);
  };

  /* ------- پاک کردن مکالمه (بدون تایید) ------- */
  const handleClear = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setUnreadCount(0);
  };

  /* ------- فرمت زمان ------- */
  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <>
      {/* ================= پنجره‌ی چت ================= */}
      {isOpen && (
        <div
          dir="rtl"
          className={`
            fixed z-50 bg-gray-900 border border-gray-700 shadow-2xl shadow-black/60
            flex flex-col overflow-hidden
            transition-all duration-300
            ${
              isMinimized
                ? "bottom-24 left-4 sm:left-6 w-72 h-14 rounded-2xl"
                : "bottom-24 left-4 sm:left-6 w-[calc(100vw-2rem)] sm:w-96 h-[520px] max-h-[calc(100vh-8rem)] rounded-2xl"
            }
          `}
        >
          {/* ---------- هدر ---------- */}
          <div className="relative bg-gradient-to-l from-yellow-500 to-yellow-800 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                <HiOutlineUser className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black text-white">پشتیبانی آنلاین</h3>
              <p className="text-[10px] text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                آنلاین و آماده‌ی پاسخگویی
              </p>
            </div>

            <button
              onClick={() => setIsMinimized((v) => !v)}
              className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
              aria-label="کوچک/بزرگ"
            >
              <HiOutlineMinus className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsMinimized(false);
              }}
              className="w-7 h-7 rounded-lg bg-white/15 hover:bg-red-500 flex items-center justify-center text-white transition"
              aria-label="بستن"
            >
              <HiOutlineX className="w-4 h-4" />
            </button>
          </div>

          {/* ---------- بدنه (فقط وقتی مینیمایز نیست) ---------- */}
          {!isMinimized && (
            <>
              {/* پیام‌ها */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-950/40">
                {messages.map((msg) => {
                  const isUser = msg.from === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? "justify-start" : "justify-end"} gap-2`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-l from-yellow-500 to-yellow-800 flex items-center justify-center shrink-0 self-end">
                          <HiOutlineUser className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}

                      <div
                        className={`
                          max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                          ${
                            isUser
                              ? "bg-gradient-to-l from-gray-800 to-gray-700 text-white rounded-br-sm"
                              : "bg-gradient-to-l from-yellow-500 to-yellow-700 text-white rounded-bl-sm"
                          }
                        `}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                        <p
                          className={`text-[9px] mt-1 ${
                            isUser ? "text-gray-400" : "text-white/70"
                          }`}
                        >
                          {formatTime(msg.time)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* در حال تایپ */}
                {isTyping && (
                  <div className="flex justify-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-l from-yellow-500 to-yellow-800 flex items-center justify-center shrink-0">
                      <HiOutlineUser className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-3 py-2.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                      <span
                        className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* فرم ارسال */}
              <form
                onSubmit={handleSend}
                className="p-3 border-t border-gray-800 bg-gray-900 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="پیامت رو بنویس..."
                  className="flex-1 bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                />

                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="ارسال"
                  className="w-10 h-10 rounded-xl bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md shadow-yellow-500/20 active:scale-95 transition shrink-0"
                >
                  <HiOutlinePaperAirplane className="w-4 h-4 rotate-180" />
                </button>
              </form>

              {/* دکمه‌ی پاک کردن مکالمه (زرد، بدون تایید) */}
              <button
                type="button"
                onClick={handleClear}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-white text-xs font-bold py-2.5 border-t border-gray-800 transition active:scale-[0.98]"
              >
                <HiOutlineTrash className="w-3.5 h-3.5" />
                پاک کردن مکالمه
              </button>

              {/* اطلاعات تماس سریع */}
              <div className="px-3 py-2 bg-gray-950 border-t border-gray-800 flex items-center justify-center gap-3 text-[10px] text-gray-500">
                <a
                  href="tel:02112345678"
                  className="flex items-center gap-1 hover:text-yellow-400 transition"
                >
                  <HiOutlinePhone className="w-3 h-3" />
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </a>
                <span className="w-px h-3 bg-gray-700" />
                <a
                  href="mailto:support@soltanishop.ir"
                  className="flex items-center gap-1 hover:text-yellow-400 transition"
                >
                  <HiOutlineMail className="w-3 h-3" />
                  ایمیل
                </a>
              </div>
            </>
          )}
        </div>
      )}

      {/* ================= دکمه‌ی شناور ================= */}
      <button
        onClick={() => {
          setIsOpen((v) => !v);
          setIsMinimized(false);
        }}
        aria-label="چت با پشتیبانی"
        className="
          fixed bottom-5 left-4 sm:left-6 z-50
          w-14 h-14 rounded-full
          bg-gradient-to-l from-yellow-500 to-yellow-700
          hover:from-yellow-400 hover:to-yellow-600
          text-white shadow-lg shadow-yellow-500/30
          hover:shadow-xl hover:shadow-yellow-500/50
          flex items-center justify-center
          active:scale-95 transition-all duration-300
        "
      >
        {/* حلقه‌ی نبض */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-yellow-500/40 animate-ping" />
        )}

        <span className="relative">
          {isOpen ? (
            <HiOutlineX className="w-6 h-6" />
          ) : (
            <HiOutlineChatAlt2 className="w-6 h-6" />
          )}
        </span>

        {/* نشانگر پیام خوانده‌نشده */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-gray-950">
            {unreadCount}
          </span>
        )}
      </button>
    </>
  );
};

export default AdminChat;