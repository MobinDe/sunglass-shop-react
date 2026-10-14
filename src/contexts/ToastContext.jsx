import React, { createContext, useContext, useState, useCallback } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle,
  HiOutlineX,
} from "react-icons/hi";

const ToastContext = createContext();

/* ================================================================ */
/*                        ToastProvider                             */
/* ================================================================ */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = 3500) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast]
  );

  // میان‌برهای راحت
  const toast = {
    success: (msg, dur) => showToast(msg, "success", dur),
    error: (msg, dur) => showToast(msg, "error", dur),
    info: (msg, dur) => showToast(msg, "info", dur),
    warning: (msg, dur) => showToast(msg, "warning", dur),
    custom: showToast,
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

/* ================================================================ */
/*                       هوک useToast                               */
/* ================================================================ */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast باید داخل ToastProvider استفاده شود");
  }
  return ctx.toast;
};

/* ================================================================ */
/*                    استایل هر نوع Toast                           */
/* ================================================================ */
const toastStyles = {
  success: {
    bg: "from-green-600 to-green-800",
    border: "border-green-500/40",
    shadow: "shadow-green-500/30",
    icon: HiOutlineCheckCircle,
  },
  error: {
    bg: "from-red-600 to-red-800",
    border: "border-red-500/40",
    shadow: "shadow-red-500/30",
    icon: HiOutlineXCircle,
  },
  info: {
    bg: "from-blue-600 to-blue-800",
    border: "border-blue-500/40",
    shadow: "shadow-blue-500/30",
    icon: HiOutlineInformationCircle,
  },
  warning: {
    bg: "from-yellow-500 to-yellow-700",
    border: "border-yellow-500/40",
    shadow: "shadow-yellow-500/30",
    icon: HiOutlineExclamationCircle,
  },
};

/* ================================================================ */
/*                    کامپوننت نمایش Toastها                        */
/* ================================================================ */
const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div
      dir="rtl"
      className="fixed top-4 right-4 left-4 sm:left-auto sm:right-6 z-[9999] flex flex-col gap-3 pointer-events-none sm:max-w-sm sm:w-full"
    >
      {toasts.map((t) => {
        const style = toastStyles[t.type] || toastStyles.info;
        const Icon = style.icon;

        return (
          <div
            key={t.id}
            className={`
              pointer-events-auto relative overflow-hidden
              bg-gradient-to-l ${style.bg}
              border ${style.border}
              rounded-2xl px-4 py-3.5
              shadow-2xl ${style.shadow}
              backdrop-blur-md
              flex items-center gap-3
              animate-toastIn
            `}
          >
            {/* آیکون */}
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-white" />
            </div>

            {/* متن */}
            <p className="flex-1 text-sm font-medium text-white leading-relaxed">
              {t.message}
            </p>

            {/* دکمه بستن */}
            <button
              onClick={() => onClose(t.id)}
              className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition shrink-0"
              aria-label="بستن"
            >
              <HiOutlineX className="w-4 h-4" />
            </button>

            {/* نوار زمان */}
            <div
              className="absolute bottom-0 right-0 h-[3px] bg-white/40 animate-toastTimer"
              style={{ animationDuration: "3500ms" }}
            />
          </div>
        );
      })}

      <style jsx>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes toastTimer {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-toastIn {
          animation: toastIn 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) both;
        }
        .animate-toastTimer {
          animation: toastTimer linear forwards;
        }
      `}</style>
    </div>
  );
};

export default ToastContext;