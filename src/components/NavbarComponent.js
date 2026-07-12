import React, { useState } from "react";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext"; // مطمئن شوید مسیر درست باشد
import PhoneAuthModal from "./PhoneAuthModal"; // ایمپورت مودال

function NavbarComponent() {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const submithandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <nav className="bg-black h-auto min-h-12 px-2 py-4 mb-2 flex flex-wrap justify-between items-center gap-2 relative ">
        {/* لوگو + نام فروشگاه + سبد خرید */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-4 w-16 sm:h-16 sm:w-18 rounded-full hidden sm:block"
          />
          <span className="font-black text-xl sm:text-2xl text-white hidden sm:inline-block">
            سلطانی
          </span>
          <Link to="/cart">
            <button className="bg-gray-900 hover:bg-gray-700 ml-4 text-white font-bold py-1 px-2 sm:py-2 sm:px-2 rounded-lg transition duration-300 flex items-center gap-2 border border-blue-200 text-sm sm:text-base">
              <BsCart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>({totalItems})</span>
              سبد
            </button>
          </Link>
        </div>

        {/* فرم جستجو */}
        <form onSubmit={submithandler} className="flex-grow sm:mx-2">
          <input
            dir="rtl"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="جستجو کنید..."
            value={search}
            className="w-11/12 py-1 pr-4 pl-2 sm:py-2 sm:pr-6 sm:pl-4 text-right text-black bg-gray-200 hover:bg-white rounded-3xl text-sm sm:text-base ml-6"
          />
        </form>

        {/* دکمه همبرگر (فقط موبایل) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-label="منو"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* منوی دسکتاپ */}
        <div className="desktop-menu hidden md:flex items-center gap-[clamp(0.5rem,2vw,1.5rem)] transition-all duration-300">
          <Link
            to="/products"
            onClick={handleLinkClick}
            className="px-2 py-2.5 text-center text-white font-medium rounded-xl hover:bg-gray-700"
          >
            همه محصولات
          </Link>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 active:scale-95 whitespace-nowrap text-[clamp(0.8rem,3.5vw,1rem)] px-[clamp(0.5rem,2vw,1.2rem)] py-2"
          >
            خانه
          </Link>
          <Link
            to="/blog"
            onClick={handleLinkClick}
            className="text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 active:scale-95 whitespace-nowrap text-[clamp(0.8rem,3.5vw,1rem)] px-[clamp(0.5rem,2vw,1.2rem)] py-2"
          >
            وبلاگ
          </Link>
          <Link
            to="/trendy"
            onClick={handleLinkClick}
            className="text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 active:scale-95 whitespace-nowrap text-[clamp(0.8rem,3.5vw,1rem)] px-[clamp(0.5rem,2vw,1.2rem)] py-2"
          >
            بهترین های سال
          </Link>
          {/* دکمه عضویت جایگزین لینک قبلی */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-white font-semibold rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-800 hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap text-[clamp(0.8rem,3.5vw,1rem)] px-[clamp(0.8rem,2.5vw,1.5rem)] py-2"
          >
            عضویت
          </button>
        </div>

        {/* منوی موبایل */}
        <div
          className={`
            ${isMenuOpen ? "flex" : "hidden"}
            md:hidden
            absolute top-16 left-0 w-full
            flex-col bg-black/90 backdrop-blur-xl
            rounded-2xl shadow-2xl p-4 mt-2 gap-2
            border border-white/20 z-40
            transition-all duration-300
          `}
        >
          <Link
            to="/products"
            onClick={handleLinkClick}
            className="px-5 py-2.5 text-center text-white font-medium rounded-xl hover:bg-gray-700"
          >
            همه محصولات
          </Link>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="px-5 py-2.5 text-center text-white font-medium rounded-xl hover:bg-gray-700"
          >
            خانه
          </Link>
          <Link
            to="/blog"
            onClick={handleLinkClick}
            className="px-5 py-2.5 text-center text-white font-medium rounded-xl hover:bg-gray-700"
          >
            وبلاگ
          </Link>
          <Link
            to="/trendy"
            onClick={handleLinkClick}
            className="px-5 py-2.5 text-center text-white font-medium rounded-xl hover:bg-gray-700"
          >
            بهترین های سال
          </Link>
          {/* دکمه عضویت در موبایل */}
          <button
            onClick={() => {
              handleLinkClick();
              setIsAuthModalOpen(true);
            }}
            className="px-5 py-2.5 text-center text-white font-medium rounded-xl hover:bg-gray-700 bg-gradient-to-r from-yellow-500 to-gray-900"
          >
            عضویت
          </button>
        </div>

        <style jsx>{`
          @media (min-width: 768px) and (max-width: 1039px) {
            .desktop-menu {
              justify-content: center;
              flex: 1;
              margin: 0 auto;
            }
          }
          @media (min-width: 1040px) {
            .desktop-menu {
              justify-content: flex-end;
              flex: initial;
              margin: 0;
            }
          }
        `}</style>
      </nav>

      {/* مودال احراز هویت */}
      <PhoneAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

export default NavbarComponent;