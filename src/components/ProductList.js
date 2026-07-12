import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // 1. دریافت محصولات
  useEffect(() => {
    axios
      .get("/glasses.json")
      .then((response) => {
        console.log("✅ محصولات دریافت شد:", response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ خطا در دریافت:", error);
        setError("امکان دریافت محصولات وجود ندارد.");
        setLoading(false);
      });
  }, []);

  // 2. فیلتر محصولات (با دیباگ)
  useEffect(() => {
    console.log("🔍 searchQuery =", `"${searchQuery}"`);
    console.log("📦 products.length =", products.length);

    if (products.length > 0) {
      if (searchQuery.trim() === "") {
        console.log("➡️ بدون جستجو، همه محصولات");
        setFilteredProducts(products);
      } else {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = products.filter((product) => {
          // ترکیب title و name و description برای جستجو
          const title = (product.title || product.name || "").toLowerCase();
          const desc = (product.description || "").toLowerCase();
          const match = title.includes(lowerQuery) || desc.includes(lowerQuery);
          if (match) {
            console.log("✔️ محصول منطبق:", product.title || product.name);
          }
          return match;
        });
        console.log("📋 تعداد محصولات فیلتر شده:", filtered.length);
        setFilteredProducts(filtered);
      }
    }
  }, [products, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">در حال بارگذاری محصولات...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">
          {searchQuery
            ? `محصولی برای "${searchQuery}" یافت نشد.`
            : "هیچ محصولی یافت نشد."}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;