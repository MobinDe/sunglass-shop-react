// components/BestSellingProducts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/glasses.json")
      .then((response) => {
        const bestSelling = response.data.filter(
          (product) => product.id >= 1 && product.id <= 8
        );
        setProducts(bestSelling);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطا در دریافت محصولات:", error);
        setError("دریافت محصولات پرفروش با خطا مواجه شد.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        در حال بارگذاری محصولات پرفروش...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        محصول پرفروشی یافت نشد.
      </div>
    );
  }

  return (
    <section className="w-full px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        محصولات پرفروش
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellingProducts;