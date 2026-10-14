// components/Card.jsx
import React from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiHeart,
  HiStar,
} from "react-icons/hi";

const Card = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return <div>خطا: اطلاعات محصول موجود نیست</div>;

  const productTitle = product.title || product.name || "بدون عنوان";
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const rating = product.rating ?? 4.5;
  const reviewsCount = product.reviewsCount ?? 12;
  const wishlisted = isInWishlist(product.id);

  const handleWishlistClick = () => {
    console.log("🔥 کلیک روی قلب:", product.id);
    toggleWishlist(product);
  };

  return (
    <div
      dir="rtl"
      className="
        group relative bg-gradient-to-b from-gray-800 to-gray-900
        rounded-2xl overflow-hidden text-right
        border border-gray-700/60
        shadow-lg shadow-black/20
        hover:shadow-2xl hover:shadow-yellow-500/10
        hover:border-yellow-500/40
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* تصویر */}
      <div className="relative h-44 w-full bg-gray-800 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={productTitle}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-xs">
            تصویر موجود نیست
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* تخفیف */}
        {hasDiscount && (
          <div className="absolute top-2.5 right-2.5 bg-gradient-to-l from-red-500 to-red-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-lg shadow-red-500/30 z-10">
            {discountPercent}٪
          </div>
        )}

        {/* دکمه علاقه‌مندی */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          className="
            absolute top-2.5 left-2.5 w-9 h-9 rounded-full
            bg-black/50 backdrop-blur-md
            flex items-center justify-center
            border border-white/20
            text-white
            hover:bg-black/70 active:scale-90
            transition-all duration-200 z-10
            cursor-pointer
          "
        >
          {wishlisted ? (
            <HiHeart className="w-5 h-5 text-red-500" />
          ) : (
            <HiOutlineHeart className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* محتوا */}
      <div className="p-3.5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-yellow-400">
            <HiStar className="w-3 h-3" />
            <span className="text-[11px] font-bold">{rating}</span>
          </div>
          <span className="text-[10px] text-gray-500">
            ({reviewsCount} نظر)
          </span>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-yellow-400 transition-colors">
          {productTitle}
        </h3>

        <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 min-h-[2rem]">
          {product.description || "توضیحاتی برای این محصول وجود ندارد."}
        </p>

        <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-gray-700/60">
          <div className="flex flex-col min-w-0">
            {hasDiscount && (
              <span className="text-[10px] text-gray-500 line-through">
                {product.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sm font-extrabold text-yellow-400 whitespace-nowrap">
              {product.price?.toLocaleString() ?? "۰"}
              <span className="text-[10px] font-medium text-yellow-500/80 mr-1">
                تومان
              </span>
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="
              shrink-0 flex items-center gap-1
              bg-gradient-to-l from-yellow-500 to-yellow-700
              hover:from-yellow-400 hover:to-yellow-600
              text-white text-[11px] font-bold
              px-3 py-2 rounded-lg
              shadow-md shadow-yellow-500/20
              hover:shadow-lg hover:shadow-yellow-500/40
              active:scale-95
              transition-all duration-200
            "
          >
            <HiOutlineShoppingBag className="w-3.5 h-3.5" />
            خرید
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default Card;