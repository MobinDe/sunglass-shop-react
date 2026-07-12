// components/SliderSection.jsx
import React, { useState, useEffect } from "react";
import img1 from "../assets/section.jpg";
import img2 from "../assets/section1.jpg";
import img3 from "../assets/section2.jpg";
import BestSellingProducts from "../pages/BestSellingProducts";

const SliderSection = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // تعویض خودکار هر ۳ ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // دکمه‌های دستی
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="w-full">
      {/* ===== بخش اسلایدر ===== */}
      <div className="relative w-full h-80 md:h-96 overflow-hidden">
        {/* تصویر فعلی */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />

        {/* overlay تیره اختیاری برای خوانایی بهتر */}
        <div className="absolute inset-0 bg-black/30" />

        {/* دکمه‌های ناوبری */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition"
          aria-label="قبلی"
        >
          ❮
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition"
          aria-label="بعدی"
        >
          ❯
        </button>

        {/* نقاط نشان‌دهنده */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ===== بخش محصولات پرفروش (دقیقاً زیر اسلایدر) ===== */}
      <BestSellingProducts />
    </section>
  );
};

export default SliderSection;