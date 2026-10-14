import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineLogout,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineSparkles,
  HiOutlineMenuAlt1,
} from "react-icons/hi";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import PhoneAuthModal from "./PhoneAuthModal";

/* ================================================================ */
/*                  دسته‌بندی‌ها (برای دراپ‌داون)                    */
/* ================================================================ */
const categories = [
  {
    label: "زنانه",
    href: "/products?gender=women",
    icon: "👩",
    submenu: [
      { label: "عینک آفتابی", href: "/products?gender=women&type=sun" },
      { label: "عینک طبی", href: "/products?gender=women&type=optical" },
      { label: "عینک ورزشی", href: "/products?gender=women&type=sport" },
    ],
  },
  {
    label: "مردانه",
    href: "/products?gender=men",
    icon: "👨",
    submenu: [
      { label: "عینک آفتابی", href: "/products?gender=men&type=sun" },
      { label: "عینک طبی", href: "/products?gender=men&type=optical" },
      { label: "عینک ورزشی", href: "/products?gender=men&type=sport" },
    ],
  },
  {
    label: "بچگانه",
    href: "/products?gender=kids",
    icon: "🧒",
    submenu: [
      { label: "عینک آفتابی", href: "/products?gender=kids&type=sun" },
      { label: "عینک طبی", href: "/products?gender=kids&type=optical" },
    ],
  },
  {
    label: "برندها",
    href: "/products",
    icon: "✨",
    submenu: [
      { label: "Ray-Ban", href: "/products?brand=rayban" },
      { label: "Gucci", href: "/products?brand=gucci" },
      { label: "Prada", href: "/products?brand=prada" },
      { label: "Oakley", href: "/products?brand=oakley" },
    ],
  },
];

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
function NavbarComponent() {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const userMenuRef = useRef(null);
  const dropdownTimeout = useRef(null);
  const navigate = useNavigate();

  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();

  /* ------- تشخیص اسکرول برای تغییر استایل ------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------- بستن منوی کاربر با کلیک بیرون ------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ------- مدیریت دراپ‌داون با تاخیر ------- */
  const handleDropdownEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  /* ------- هندلرها ------- */
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleWishlistClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <>
      {/* ===================================================== */}
      {/*                  نوار بالایی (Top Bar)                */}
      {/* ===================================================== */}
      <div
        dir="rtl"
        className="hidden md:block bg-gradient-to-l from-gray-950 via-black to-gray-950 text-gray-400 text-[11px] border-b border-gray-800"
      >
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="tel:02112345678"
              className="flex items-center gap-1.5 hover:text-yellow-400 transition"
            >
              <HiOutlinePhone className="w-3.5 h-3.5" />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            <span className="w-px h-3 bg-gray-700" />
            <div className="flex items-center gap-1.5">
              <HiOutlineLocationMarker className="w-3.5 h-3.5" />
              <span>ارسال به سراسر ایران</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-yellow-400/90">
            <HiOutlineSparkles className="w-3.5 h-3.5" />
            <span className="font-bold">
              ارسال رایگان برای خرید بالای ۲ میلیون تومان
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500">ما را دنبال کنید:</span>
            <a
              href="#"
              className="hover:text-pink-500 transition"
              aria-label="اینستاگرام"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="تلگرام"
            >
              <FaTelegram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              className="hover:text-green-500 transition"
              aria-label="واتساپ"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/*                     نوبار اصلی                        */}
      {/* ===================================================== */}
      <nav
        dir="rtl"
        className={`
          sticky top-0 z-40 w-full
          transition-all duration-300
          ${
            isScrolled
              ? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-yellow-500/20"
              : "bg-black border-b-2 border-gray-800"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* ============================================ */}
            {/*      لوگو + سلطانی (افقی، طلایی، بزرگ)         */}
            {/* ============================================ */}
            <Link
              to="/"
              onClick={handleLinkClick}
              className="group flex items-center gap-2 sm:gap-3 shrink-0"
            >
              {/* لوگوی بزرگ */}
              <div className="relative">
                {/* هاله‌ی زرد پشت لوگو */}
                <div className="absolute inset-0 rounded-full  " />

                <img
                  src={logo}
                  alt="سلطانی"
                  className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain "
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML =
                      '<span class=" text-xl font-black">S</span>';
                  }}
                />
              </div>

              {/* متن سلطانی طلایی - کنار لوگو */}
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-black leading-none bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(234,179,8,0.4)] group-hover:from-yellow-200 group-hover:via-yellow-400 group-hover:to-yellow-600 transition-all duration-300">
                  Soltani
                </h1>
                {/* خط تزئینی طلایی زیر متن */}
                <div className="mt-1 h-0.5 w-full bg-gradient-to-l from-transparent via-yellow-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>

            {/* ============================================ */}
            {/*              نوار جستجو (دسکتاپ)              */}
            {/* ============================================ */}
            <form
              onSubmit={submithandler}
              className="hidden lg:flex flex-1 max-w-md mx-4"
            >
              <div className="relative w-full group">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="جستجوی عینک، برند، مدل..."
                  className="
                    w-full py-2.5 pr-11 pl-4
                    bg-gray-900/80 hover:bg-gray-900
                    focus:bg-gray-900
                    border border-gray-700
                    focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20
                    rounded-xl text-sm text-white placeholder-gray-500
                    outline-none transition-all duration-200
                  "
                />
                <button
                  type="submit"
                  aria-label="جستجو"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 flex items-center justify-center text-white transition"
                >
                  <HiOutlineSearch className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* ============================================ */}
            {/*             منوی اصلی (دسکتاپ)               */}
            {/* ============================================ */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="px-3 py-2 text-sm font-bold text-gray-300 hover:text-yellow-400 rounded-lg hover:bg-gray-900 transition"
              >
                خانه
              </Link>

              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(cat.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={cat.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-gray-300 hover:text-yellow-400 rounded-lg hover:bg-gray-900 transition"
                  >
                    <span>{cat.label}</span>
                    {cat.submenu && (
                      <HiOutlineChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === cat.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {cat.submenu && openDropdown === cat.label && (
                    <div className="absolute top-full right-0 pt-2 w-52 z-50 animate-dropdown">
                      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                        {cat.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            onClick={handleLinkClick}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-gradient-to-l hover:from-yellow-500/10 hover:to-transparent hover:text-yellow-400 transition border-b border-gray-800 last:border-0"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/blog"
                onClick={handleLinkClick}
                className="px-3 py-2 text-sm font-bold text-gray-300 hover:text-yellow-400 rounded-lg hover:bg-gray-900 transition"
              >
                وبلاگ
              </Link>

              <Link
                to="/trendy"
                onClick={handleLinkClick}
                className="px-3 py-2 text-sm font-bold text-gray-300 hover:text-yellow-400 rounded-lg hover:bg-gray-900 transition"
              >
                پرفروش‌ها
              </Link>
            </div>

            {/* ============================================ */}
            {/*              آیکون‌های عمل (راست)              */}
            {/* ============================================ */}
            <div className="flex items-center gap-2 shrink-0">
              {/* علاقه‌مندی */}
              <Link to="/wishlist" onClick={handleWishlistClick}>
                <button
                  aria-label="علاقه‌مندی‌ها"
                  className="relative w-10 h-10 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-yellow-500/40 flex items-center justify-center text-gray-300 hover:text-yellow-400 transition-all group"
                >
                  <HiOutlineHeart className="w-5 h-5 group-hover:scale-110 transition" />
                  {isAuthenticated && totalWishlistItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-black">
                      {totalWishlistItems}
                    </span>
                  )}
                </button>
              </Link>

              {/* سبد خرید */}
              <Link to="/cart">
                <button
                  aria-label="سبد خرید"
                  className="relative w-10 h-10 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-yellow-500/40 flex items-center justify-center text-gray-300 hover:text-yellow-400 transition-all group"
                >
                  <HiOutlineShoppingBag className="w-5 h-5 group-hover:scale-110 transition" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-yellow-500 text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-black">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>

              {/* عضویت / پروفایل */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-yellow-500/40 rounded-xl px-2 py-1.5 h-10 transition group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-l from-yellow-500 to-yellow-700 flex items-center justify-center text-black text-[11px] font-black">
                      {user?.phone?.slice(-2) || "؟"}
                    </div>
                    <HiOutlineChevronDown
                      className={`w-3 h-3 text-gray-400 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-60 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-dropdown">
                      <div className="p-3 bg-gradient-to-l from-yellow-500/10 to-transparent border-b border-gray-800">
                        <p className="text-[10px] text-gray-400 mb-0.5">
                          خوش آمدی 👋
                        </p>
                        <p className="text-sm font-bold text-white">
                          {user?.name || "کاربر"}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5" dir="ltr">
                          {user?.phone}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition"
                      >
                        <HiOutlineUser className="w-4 h-4" />
                        پروفایل من
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition"
                      >
                        <HiOutlineShoppingBag className="w-4 h-4" />
                        سفارشات من
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition"
                      >
                        <HiOutlineHeart className="w-4 h-4" />
                        علاقه‌مندی‌ها
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 border-t border-gray-800 transition"
                      >
                        <HiOutlineLogout className="w-4 h-4" />
                        خروج از حساب
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="h-10 px-4 text-sm font-black text-black bg-gradient-to-l from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 rounded-xl shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 active:scale-95 transition-all"
                >
                  ورود / ثبت‌نام
                </button>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 flex items-center justify-center text-white transition"
                aria-label="منو"
              >
                {isMenuOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineMenuAlt1 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* ============================================ */}
          {/*       جستجوی موبایل (زیر نوبار اصلی)          */}
          {/* ============================================ */}
          <form onSubmit={submithandler} className="lg:hidden pb-3">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجوی عینک، برند، مدل..."
                className="
                  w-full py-2.5 pr-10 pl-4
                  bg-gray-900 border border-gray-700
                  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20
                  rounded-xl text-sm text-white placeholder-gray-500
                  outline-none transition
                "
              />
              <button
                type="submit"
                aria-label="جستجو"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-yellow-500 flex items-center justify-center text-black"
              >
                <HiOutlineSearch className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* ============================================ */}
        {/*            منوی موبایل (اسلاید از راست)       */}
        {/* ============================================ */}
        <div
          className={`
            lg:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw]
            bg-gradient-to-b from-gray-900 to-black
            border-l border-gray-800 shadow-2xl z-50
            transition-transform duration-300 ease-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
            flex flex-col
          `}
        >
          {/* هدر منوی موبایل */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gradient-to-l from-yellow-500/10 to-transparent">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="سلطانی"
                className="w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h2 className="text-lg font-black bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                سلطانی
              </h2>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition"
              aria-label="بستن"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          {/* پروفایل در موبایل */}
          {isAuthenticated ? (
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-700 flex items-center justify-center text-black text-base font-black">
                  {user?.phone?.slice(-2) || "؟"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">
                    {user?.name || "کاربر"}
                  </p>
                  <p className="text-[11px] text-gray-400" dir="ltr">
                    {user?.phone}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-gray-800">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-3 text-sm font-black text-black bg-gradient-to-l from-yellow-500 to-yellow-700 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-95 transition"
              >
                ورود / ثبت‌نام
              </button>
            </div>
          )}

          {/* آیتم‌های منو */}
          <div className="flex-1 overflow-y-auto p-3">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-200 hover:text-yellow-400 hover:bg-gray-800/60 rounded-xl transition"
            >
              <span className="text-lg">🏠</span>
              خانه
            </Link>

            {categories.map((cat) => (
              <div key={cat.label}>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === cat.label ? null : cat.label
                    )
                  }
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-gray-200 hover:text-yellow-400 hover:bg-gray-800/60 rounded-xl transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{cat.icon}</span>
                    {cat.label}
                  </span>
                  <HiOutlineChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === cat.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === cat.label && cat.submenu && (
                  <div className="mr-6 mt-1 space-y-1 border-r-2 border-yellow-500/30 pr-3">
                    {cat.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        onClick={handleLinkClick}
                        className="block px-3 py-2 text-xs text-gray-400 hover:text-yellow-400 hover:bg-gray-800/40 rounded-lg transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/blog"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-200 hover:text-yellow-400 hover:bg-gray-800/60 rounded-xl transition"
            >
              <span className="text-lg">📝</span>
              وبلاگ
            </Link>

            <Link
              to="/trendy"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-200 hover:text-yellow-400 hover:bg-gray-800/60 rounded-xl transition"
            >
              <span className="text-lg">⭐</span>
              پرفروش‌ها
            </Link>

            {isAuthenticated && (
              <>
                <div className="my-3 border-t border-gray-800" />
                <Link
                  to="/profile"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-200 hover:text-yellow-400 hover:bg-gray-800/60 rounded-xl transition"
                >
                  <HiOutlineUser className="w-4 h-4" />
                  پروفایل من
                </Link>
                <Link
                  to="/orders"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-200 hover:text-yellow-400 hover:bg-gray-800/60 rounded-xl transition"
                >
                  <HiOutlineShoppingBag className="w-4 h-4" />
                  سفارشات من
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition"
                >
                  <HiOutlineLogout className="w-4 h-4" />
                  خروج از حساب
                </button>
              </>
            )}
          </div>

          {/* فوتر منوی موبایل */}
          <div className="p-4 border-t border-gray-800 bg-gray-950">
            <div className="flex items-center justify-around">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-pink-500/20 hover:text-pink-400 flex items-center justify-center text-gray-400 transition"
                aria-label="اینستاگرام"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center text-gray-400 transition"
                aria-label="تلگرام"
              >
                <FaTelegram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-green-500/20 hover:text-green-400 flex items-center justify-center text-gray-400 transition"
                aria-label="واتساپ"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="tel:02112345678"
                className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-yellow-500/20 hover:text-yellow-400 flex items-center justify-center text-gray-400 transition"
                aria-label="تماس"
              >
                <HiOutlinePhone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* بک‌دراپ برای منوی موبایل */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* ===================================================== */}
      {/*                    مودال احراز هویت                    */}
      {/* ===================================================== */}
      <PhoneAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />

      {/* ===================================================== */}
      {/*                       انیمیشن‌ها                        */}
      {/* ===================================================== */}
      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s cubic-bezier(0.21, 1.02, 0.73, 1) both;
        }
      `}</style>
    </>
  );
}

export default NavbarComponent;