import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import FilterSidebar from "./FilterSidebar";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // استیت فیلترهای انتخاب‌شده از سایدبار
  const [selectedFilters, setSelectedFilters] = useState({});

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // 1. دریافت محصولات
  useEffect(() => {
    axios
      .get("/glasses.json")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ خطا در دریافت:", error);
        setError("امکان دریافت محصولات وجود ندارد.");
        setLoading(false);
      });
  }, []);

  // 2. اعمال همزمان جستجو و فیلترها
  useEffect(() => {
    if (products.length === 0) return;

    let result = [...products];

    // الف) فیلتر بر اساس جستجو
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((product) => {
        const title = (product.title || product.name || "").toLowerCase();
        const desc = (product.description || "").toLowerCase();
        return title.includes(lowerQuery) || desc.includes(lowerQuery);
      });
    }

    // ب) فیلتر بر اساس انتخاب‌های سایدبار
    Object.entries(selectedFilters).forEach(([key, value]) => {
      result = result.filter((product) => {
        const productValue = product[key];
        if (productValue == null) return false;

        // اگر مقدار محصول آرایه بود (مثلاً یک محصول هم مردانه هم زنانه)
        if (Array.isArray(productValue)) {
          return productValue.some(
            (v) => String(v).trim() === String(value).trim()
          );
        }
        // مقایسه‌ی رشته‌ای ساده
        return String(productValue).trim() === String(value).trim();
      });
    });

    setFilteredProducts(result);
  }, [products, searchQuery, selectedFilters]);

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

  return (
    <div dir="rtl" className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* سایدبار فیلتر */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
          <FilterSidebar
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
        </aside>

        {/* بخش محصولات */}
        <main className="w-full lg:w-3/4 xl:w-4/5">
          {filteredProducts.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-gray-600">
                {searchQuery || Object.keys(selectedFilters).length > 0
                  ? "محصولی با این فیلترها یافت نشد."
                  : "هیچ محصولی یافت نشد."}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;