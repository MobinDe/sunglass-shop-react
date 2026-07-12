// components/Card.jsx
import React from "react";
import { useCart } from "../components/CartContext"; // مسیر صحیح

const Card = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return <div>خطا: اطلاعات محصول موجود نیست</div>;

  const productTitle = product.title || product.name || "بدون عنوان";

  return (
    <div className="bg-gray-700 rounded-2xl text-right">
      <div className="h-56 w-full bg-gray-100 flex rounded-t-2xl items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={productTitle}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        ) : (
          <div className="text-gray-500 text-sm">تصویر موجود نیست</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {productTitle}
        </h3>
        <p className="text-white text-sm mb-3 line-clamp-2">
          {product.description || "توضیحاتی برای این محصول وجود ندارد."}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-yellow-500">
            {product.price?.toLocaleString() ?? "۰"} تومان
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;