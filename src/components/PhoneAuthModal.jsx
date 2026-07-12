import React, { useState } from "react";

const PhoneAuthModal = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState("phone"); // phone | code | success
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("لطفاً شماره موبایل معتبر وارد کنید (حداقل ۱۰ رقم)");
      return;
    }
    setLoading(true);
    // شبیه‌سازی ارسال پیامک
    setTimeout(() => {
      setLoading(false);
      setStep("code");
    }, 1500);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!code || code.length < 4) {
      alert("کد تأیید باید حداقل ۴ رقم باشد");
      return;
    }
    // شبیه‌سازی تأیید کد (هر کدی قبول می‌شود)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      if (onLogin) onLogin(phone); // به نوبار اطلاع بده
    }, 1000);
  };

  const handleClose = () => {
    setPhone("");
    setCode("");
    setStep("phone");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-800 text-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl relative">
        {/* دکمه بستن */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">عضویت</h2>

        {/* مرحله ۱: شماره موبایل */}
        {step === "phone" && (
          <form onSubmit={handleSendSMS}>
            <label className="block mb-2 text-sm">شماره موبایل خود را وارد کنید</label>
            <input
              type="tel"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white text-left placeholder-gray-400 mb-4"
              dir="ltr"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  در حال ارسال...
                </>
              ) : (
                "ارسال کد تأیید"
              )}
            </button>
          </form>
        )}

        {/* مرحله ۲: وارد کردن کد تأیید */}
        {step === "code" && (
          <form onSubmit={handleVerifyCode}>
            <p className="text-sm text-gray-300 mb-4">
              کد تأیید به شمارهٔ <span className="text-yellow-400 font-bold">{phone}</span> ارسال شد.
            </p>
            <label className="block mb-2 text-sm">کد تأیید را وارد کنید</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="مثلاً ۱۲۳۴"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white text-center placeholder-gray-400 mb-4 tracking-widest text-2xl"
              maxLength={6}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  در حال بررسی...
                </>
              ) : (
                "تأیید کد"
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full mt-2 text-sm text-gray-400 hover:text-white transition"
            >
              ویرایش شماره موبایل
            </button>
          </form>
        )}

        {/* مرحله ۳: موفقیت */}
        {step === "success" && (
          <div className="text-center">
            <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold mb-1">عضویت شما با موفقیت انجام شد</p>
            <p className="text-sm text-gray-300 mb-4">
              خوش آمدید! شما با شمارهٔ <span className="text-yellow-400 font-bold">{phone}</span> عضو شدید.
            </p>
            <button
              onClick={handleClose}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition"
            >
              متوجه شدم
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneAuthModal;