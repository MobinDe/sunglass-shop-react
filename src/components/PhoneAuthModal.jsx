import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const PhoneAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [step, setStep] = useState("phone"); // phone | code | success
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🎯 کد ثابت برای نمونه‌کار
  const MOCK_OTP = "1234";

  const handleSendSMS = (e) => {
    e.preventDefault();
    setError("");

    // اعتبارسنجی شماره (۱۱ رقم، با ۰۹ شروع بشه)
    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^09\d{9}$/.test(cleanPhone)) {
      setError("شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)");
      return;
    }

    setLoading(true);
    // شبیه‌سازی تأخیر شبکه
    setTimeout(() => {
      setLoading(false);
      setStep("code");
    }, 1200);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError("");

    if (code !== MOCK_OTP) {
      setError(`کد وارد شده صحیح نیست. (کد نمونه: ${MOCK_OTP})`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(phone);
      setLoading(false);
      setStep("success");

      if (onSuccess) onSuccess();
    }, 800);
  };

  const handleClose = () => {
    setPhone("");
    setCode("");
    setStep("phone");
    setError("");
    onClose();
  };

  const handleFinish = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-black/50 border border-gray-700/60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* دکمه بستن */}
        <button
          onClick={handleClose}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        {/* ================= مرحله ۱: شماره ================= */}
        {step === "phone" && (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-800 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-yellow-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold">ورود / عضویت</h2>
              <p className="text-xs text-gray-400 mt-1">
                برای ادامه، شماره موبایلت رو وارد کن
              </p>
            </div>

            <form onSubmit={handleSendSMS}>
              <label className="block mb-2 text-xs font-bold text-gray-300">
                شماره موبایل
              </label>
              <input
                type="tel"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                className="w-full p-3.5 rounded-xl bg-gray-700/60 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 text-white text-left placeholder-gray-500 mb-3 transition outline-none tracking-wider"
                dir="ltr"
                autoFocus
              />

              {error && (
                <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
                  <span>⚠</span>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 active:scale-95"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    در حال ارسال...
                  </>
                ) : (
                  "ارسال کد تأیید"
                )}
              </button>

              <p className="text-[10px] text-gray-500 text-center mt-3 leading-relaxed">
                با ورود، <span className="text-yellow-500">قوانین و شرایط</span> را
                می‌پذیرم
              </p>
            </form>
          </>
        )}

        {/* ================= مرحله ۲: کد ================= */}
        {step === "code" && (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-l from-green-500 to-green-800 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold">کد تأیید</h2>
              <p className="text-xs text-gray-400 mt-1">
                کد به شماره <span className="text-yellow-400 font-bold">{phone}</span> ارسال شد
              </p>
            </div>

            {/* نمایش کد نمونه */}
            <div className="mb-4 p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
              <p className="text-[11px] text-blue-300">
                🔐 کد نمونه: <span className="font-black text-blue-200 tracking-widest">1234</span>
              </p>
            </div>

            <form onSubmit={handleVerifyCode}>
              <label className="block mb-2 text-xs font-bold text-gray-300">
                کد ۴ رقمی
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="----"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                className="w-full p-3.5 rounded-xl bg-gray-700/60 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white text-center placeholder-gray-600 mb-3 tracking-[0.5em] text-2xl font-bold outline-none"
                maxLength={4}
                autoFocus
                dir="ltr"
              />

              {error && (
                <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
                  <span>⚠</span>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || code.length !== 4}
                className="w-full bg-gradient-to-l from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 active:scale-95"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    در حال بررسی...
                  </>
                ) : (
                  "تأیید و ورود"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setCode("");
                  setError("");
                }}
                className="w-full mt-3 text-xs text-gray-400 hover:text-yellow-400 transition"
              >
                ← ویرایش شماره موبایل
              </button>
            </form>
          </>
        )}

        {/* ================= مرحله ۳: موفق ================= */}
        {step === "success" && (
          <div className="text-center py-2">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-l from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-extrabold mb-1">خوش آمدی! 🎉</h2>
            <p className="text-sm text-gray-400 mb-1">
              با موفقیت وارد شدی
            </p>
            <p className="text-xs text-gray-500 mb-6">
              شماره: <span className="text-yellow-400 font-bold" dir="ltr">{phone}</span>
            </p>

            <button
              onClick={handleFinish}
              className="w-full bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
            >
              شروع خرید
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneAuthModal;