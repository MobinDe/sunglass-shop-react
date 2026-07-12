import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card";


const TrendyGlassesPage = () => {
  const [trendyProducts, setTrendyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/glasses.json")
      .then((response) => {
        const allProducts = response.data;
        // انتخاب تصادفی ۸ محصول (یا هر تعداد که دوست دارید)
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8);
        setTrendyProducts(selected);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطا در دریافت محصولات:", error);
        setError("دریافت محصولات با خطا مواجه شد.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">در حال بارگذاری...</div>
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

  if (trendyProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">محصولی برای نمایش وجود ندارد.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2">
      
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        عینک‌های ترند
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendyProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendyGlassesPage;