import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineArrowLeft,
  HiOutlineChevronLeft,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineSupport,
  HiOutlineCreditCard,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

/* ================================================================ */
/*                    لینک‌های فوتر                                  */
/* ================================================================ */
/* 
  isActive: true  → لینک واقعی کار می‌کنه (به صفحه‌ش می‌ره)
  isActive: false → کلیک‌نشدنیه، فقط ظاهر داره
  isActive: "soon" → کلیک‌نشدنیه ولی برچسب "به‌زودی" نشون می‌ده
*/

const footerLinks = {
  quickLinks: {
    title: "دسترسی سریع",
    links: [
      { label: "صفحه اصلی", href: "/", isActive: true },
      { label: "همه محصولات", href: "/products", isActive: true },
      { label: "پرفروش‌ها", href: "/trendy", isActive: true },
      { label: "وبلاگ", href: "/blog", isActive: true },
      { label: "درباره ما", href: "/about", isActive: "soon" },
      { label: "تماس با ما", href: "/contact", isActive: "soon" },
    ],
  },
  categories: {
    title: "دسته‌بندی‌ها",
    links: [
      { label: "عینک زنانه", href: "/products?gender=women", isActive: true },
      { label: "عینک مردانه", href: "/products?gender=men", isActive: true },
      { label: "عینک بچگانه", href: "/products?gender=kids", isActive: true },
      { label: "عینک آفتابی", href: "/products?type=sun", isActive: true },
      { label: "عینک طبی", href: "/products?type=optical", isActive: true },
      { label: "برندها", href: "/products", isActive: true },
    ],
  },
  services: {
    title: "خدمات مشتریان",
    links: [
      { label: "پیگیری سفارش", href: "/orders", isActive: true },
      { label: "علاقه‌مندی‌ها", href: "/wishlist", isActive: true },
      { label: "سبد خرید", href: "/cart", isActive: true },
      { label: "پروفایل من", href: "/profile", isActive: true },
      { label: "شرایط بازگشت کالا", href: "/return-policy", isActive: "soon" },
      { label: "قوانین و مقررات", href: "/terms", isActive: "soon" },
      { label: "حریم خصوصی", href: "/privacy", isActive: "soon" },
      { label: "سوالات متداول", href: "/faq", isActive: "soon" },
    ],
  },
};

/* ================================================================ */
/*              ویژگی‌های فروشگاه (نوار بالا)                       */
/* ================================================================ */
const features = [
  {
    icon: HiOutlineShieldCheck,
    title: "ضمانت اصالت",
    desc: "۱۰۰٪ اورجینال",
  },
  {
    icon: HiOutlineTruck,
    title: "ارسال سریع",
    desc: "۲۴ تا ۴۸ ساعته",
  },
  {
    icon: HiOutlineRefresh,
    title: "بازگشت آسان",
    desc: "تا ۳۰ روز",
  },
  {
    icon: HiOutlineSupport,
    title: "پشتیبانی ۲۴/۷",
    desc: "همیشه در دسترس",
  },
];

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer
      dir="rtl"
      className="relative bg-black border-t-2 border-gray-800 overflow-hidden"
    >
      {/* ================= بافت تزئینی ================= */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl" />
      </div>

      {/* ===================================================== */}
      {/*          نوار ویژگی‌ها                                 */}
      {/* ===================================================== */}
      <div className="relative border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-900/60 border border-transparent hover:border-yellow-500/20 transition-all duration-300"
                >
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-xl bg-yellow-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 group-hover:border-yellow-500/60 flex items-center justify-center transition-all">
                      <Icon className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-white">
                      {feature.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/*                بدنه اصلی فوتر                        */}
      {/* ===================================================== */}
      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* ---------------- ستون برند ---------------- */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/50 to-yellow-700/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/logo.png"
                  alt="Soltani"
                  className="relative w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.35)] group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-black bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent leading-none">
                  Soltani
                </h2>
                <div className="mt-1 h-0.5 w-full bg-gradient-to-l from-transparent via-yellow-500 to-transparent rounded-full" />
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed">
              فروشگاه آنلاین سلطانی با بیش از{" "}
              <span className="text-yellow-400 font-bold">۱۰ سال</span> تجربه،
              عرضه‌کننده انواع عینک‌های آفتابی، طبی و ورزشی از بهترین برندهای
              جهانی با ضمانت اصالت کالا.
            </p>

            {/* اطلاعات تماس */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:02112345678"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-yellow-400 transition group"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-900 group-hover:bg-yellow-500/10 border border-gray-800 group-hover:border-yellow-500/40 flex items-center justify-center transition">
                  <HiOutlinePhone className="w-4 h-4 group-hover:scale-110 transition" />
                </div>
                <span className="font-bold" dir="ltr">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </span>
              </a>

              <a
                href="mailto:info@soltanishop.ir"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-yellow-400 transition group"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-900 group-hover:bg-yellow-500/10 border border-gray-800 group-hover:border-yellow-500/40 flex items-center justify-center transition">
                  <HiOutlineMail className="w-4 h-4 group-hover:scale-110 transition" />
                </div>
                <span className="font-bold" dir="ltr">
                  info@soltanishop.ir
                </span>
              </a>

              <div className="flex items-start gap-3 text-sm text-gray-300">
                <div className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                  <HiOutlineLocationMarker className="w-4 h-4" />
                </div>
                <span className="leading-relaxed pt-1">
                  تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه ۴
                </span>
              </div>
            </div>
          </div>

          {/* ---------------- ستون‌های لینک ---------------- */}
          <FooterLinkColumn data={footerLinks.quickLinks} />
          <FooterLinkColumn data={footerLinks.categories} />
          <FooterLinkColumn data={footerLinks.services} />

          {/* ---------------- خبرنامه ---------------- */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full" />
              خبرنامه
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed">
              برای دریافت تخفیف‌های ویژه و جدیدترین محصولات، ایمیلت رو وارد کن.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل شما..."
                  className="w-full py-3 pr-10 pl-3 bg-gray-900 border border-gray-800 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition"
                  dir="ltr"
                />
                <HiOutlineMail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <button
                type="submit"
                className={`
                  w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black
                  transition-all active:scale-95
                  ${
                    isSubscribed
                      ? "bg-gradient-to-l from-green-500 to-green-700 text-white shadow-lg shadow-green-500/20"
                      : "bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-black shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                  }
                `}
              >
                {isSubscribed ? (
                  <>✓ عضویت انجام شد</>
                ) : (
                  <>
                    عضویت
                    <HiOutlineArrowLeft className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* شبکه‌های اجتماعی */}
            <div className="pt-3">
              <p className="text-xs text-gray-500 mb-3">ما را دنبال کنید:</p>
              <div className="flex items-center gap-2 flex-wrap">
                {/* اینستاگرام - لینک واقعی اگه داری */}
                <SocialButton
                  href="https://instagram.com"
                  label="اینستاگرام"
                  hoverColor="hover:from-pink-500 hover:to-purple-600"
                >
                  <FaInstagram className="w-4 h-4" />
                </SocialButton>

                <SocialButton
                  href="https://t.me"
                  label="تلگرام"
                  hoverColor="hover:from-blue-400 hover:to-blue-600"
                >
                  <FaTelegram className="w-4 h-4" />
                </SocialButton>

                <SocialButton
                  href="https://wa.me/989123456789"
                  label="واتساپ"
                  hoverColor="hover:from-green-400 hover:to-green-600"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </SocialButton>

                {/* توییتر - کلیک‌نشدنی */}
                <SocialButton label="توییتر (به‌زودی)" disabled>
                  <FaTwitter className="w-4 h-4" />
                </SocialButton>

                {/* لینکدین - کلیک‌نشدنی */}
                <SocialButton label="لینکدین (به‌زودی)" disabled>
                  <FaLinkedin className="w-4 h-4" />
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/*              درگاه‌های پرداخت + نمادها                 */}
      {/* ===================================================== */}
      <div className="relative border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-500 font-bold">
              پرداخت امن از طریق:
            </span>
            <div className="flex items-center gap-2">
              <PaymentBadge>
                <FaCcVisa className="w-6 h-6 text-gray-400" />
              </PaymentBadge>
              <PaymentBadge>
                <FaCcMastercard className="w-6 h-6 text-gray-400" />
              </PaymentBadge>
              <PaymentBadge>
                <FaCcPaypal className="w-6 h-6 text-gray-400" />
              </PaymentBadge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-500 font-bold">
              نمادهای اعتماد:
            </span>
            <div className="flex items-center gap-2">
              <TrustBadge>
                <HiOutlineBadgeCheck className="w-6 h-6 text-yellow-500" />
              </TrustBadge>
              <TrustBadge>
                <HiOutlineShieldCheck className="w-6 h-6 text-yellow-500" />
              </TrustBadge>
              <TrustBadge>
                <HiOutlineCreditCard className="w-6 h-6 text-yellow-500" />
              </TrustBadge>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/*              نوار پایانی (کپی‌رایت)                    */}
      {/* ===================================================== */}
      <div className="relative border-t border-gray-800 bg-gradient-to-l from-gray-950 via-black to-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500">
            © ۱۴۰۴ - تمامی حقوق برای{" "}
            <Link
              to="/"
              className="text-yellow-500 font-black hover:text-yellow-400 transition"
            >
              فروشگاه سلطانی
            </Link>{" "}
            محفوظ است.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span className="cursor-not-allowed opacity-60">حریم خصوصی</span>
            <span className="w-px h-3 bg-gray-700" />
            <span className="cursor-not-allowed opacity-60">
              قوانین و مقررات
            </span>
            <span className="w-px h-3 bg-gray-700" />
            <span className="cursor-not-allowed opacity-60">نقشه سایت</span>
          </div>
        </div>
      </div>

      {/* خط تزئینی بالای فوتر */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-yellow-500/50 to-transparent" />
    </footer>
  );
};

/* ================================================================ */
/*                     کامپوننت‌های کمکی                            */
/* ================================================================ */

/* ---------------- ستون لینک ---------------- */
const FooterLinkColumn = ({ data }) => {
  return (
    <div className="lg:col-span-2">
      <h3 className="text-base font-black text-white mb-5 flex items-center gap-2">
        <span className="w-1 h-4 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full" />
        {data.title}
      </h3>
      <ul className="space-y-3">
        {data.links.map((link) => {
          const isClickable = link.isActive === true;
          const isSoon = link.isActive === "soon";

          /* ---------- لینک واقعی ---------- */
          if (isClickable) {
            return (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition"
                >
                  <HiOutlineChevronLeft className="w-3 h-3 opacity-0 -mr-3 group-hover:opacity-100 group-hover:mr-0 transition-all duration-200" />
                  {link.label}
                </Link>
              </li>
            );
          }

          /* ---------- لینک غیرفعال (کلیک‌نشدنی) ---------- */
          return (
            <li key={link.label}>
              <div
                role="button"
                aria-disabled="true"
                className="group flex items-center gap-2 text-sm text-gray-500 opacity-60 cursor-not-allowed select-none"
              >
                <HiOutlineChevronLeft className="w-3 h-3 opacity-0" />
                {link.label}
                {isSoon && (
                  <span className="text-[9px] bg-yellow-500/20 text-yellow-400 font-bold px-1.5 py-0.5 rounded-full border border-yellow-500/30">
                    به‌زودی
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ---------------- دکمه شبکه اجتماعی ---------------- */
const SocialButton = ({
  href,
  label,
  children,
  hoverColor = "hover:from-yellow-500 hover:to-yellow-700",
  disabled = false,
}) => {
  const baseClasses = `
    w-9 h-9 rounded-xl flex items-center justify-center
    border transition-all duration-300
  `;

  /* ---------- غیرفعال ---------- */
  if (disabled) {
    return (
      <div
        title={label}
        aria-disabled="true"
        className={`
          ${baseClasses}
          bg-gray-900/60 text-gray-600 border-gray-800
          opacity-50 cursor-not-allowed select-none
        `}
      >
        {children}
      </div>
    );
  }

  /* ---------- فعال ---------- */
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        ${baseClasses}
        bg-gray-900 hover:bg-gradient-to-br ${hoverColor}
        text-gray-400 hover:text-white
        border-gray-800 hover:border-transparent
        hover:scale-110
      `}
    >
      {children}
    </a>
  );
};

/* ---------------- Badge پرداخت ---------------- */
const PaymentBadge = ({ children }) => (
  <div className="w-12 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-yellow-500/40 transition cursor-not-allowed opacity-80">
    {children}
  </div>
);

/* ---------------- Badge اعتماد ---------------- */
const TrustBadge = ({ children }) => (
  <div className="w-12 h-12 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-yellow-500/40 transition cursor-not-allowed opacity-80">
    {children}
  </div>
);

export default Footer;