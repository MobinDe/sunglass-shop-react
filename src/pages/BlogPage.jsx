// pages/BlogPage.jsx
import React from "react";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";

// ایمپورت ۸ تصویر
import blogImg1 from "../assets/images (1).jpg";
import blogImg2 from "../assets/images (2).jpg";
import blogImg3 from "../assets/images (3).jpg";
import blogImg4 from "../assets/images (4).jpg";
import blogImg5 from "../assets/images (5).jpg";
import blogImg6 from "../assets/images (6).jpg";
import blogImg7 from "../assets/images.jpg";
import blogImg8 from "../assets/images (7).jpg";

const blogPosts = [
  {
    id: 1,
    title: "راهنمای انتخاب عینک مناسب فرم صورت",
    excerpt:
      "انتخاب عینک بر اساس فرم صورت تأثیر زیادی در زیبایی چهره شما دارد. در این مقاله نکات کلیدی را بخوانید.",
    image: blogImg1,
    date: "۱۴۰۴/۰۵/۱۲",
    readTime: "۵ دقیقه",
    category: "راهنما",
  },
  {
    id: 2,
    title: "ترندهای عینک در سال ۲۰۲۵",
    excerpt:
      "از فریم‌های شفاف تا طرح‌های وینتیج، ببینید امسال چه مدل‌هایی محبوب هستند.",
    image: blogImg2,
    date: "۱۴۰۴/۰۵/۱۰",
    readTime: "۴ دقیقه",
    category: "ترند",
  },
  {
    id: 3,
    title: "نکات مراقبت از عینک",
    excerpt:
      "با رعایت چند نکته ساده می‌توانید عمر عینک خود را بیشتر کنید و دید بهتری داشته باشید.",
    image: blogImg3,
    date: "۱۴۰۴/۰۵/۰۸",
    readTime: "۳ دقیقه",
    category: "مراقبت",
  },
  {
    id: 4,
    title: "عینک بلوکات چیست؟",
    excerpt:
      "عینک‌های بلوکات نور آبی را فیلتر می‌کنند و برای کار با کامپیوتر مناسب‌اند.",
    image: blogImg4,
    date: "۱۴۰۴/۰۵/۰۵",
    readTime: "۶ دقیقه",
    category: "آموزش",
  },
  {
    id: 5,
    title: "تفاوت عینک‌های پلاریزه و غیرپلاریزه",
    excerpt:
      "عینک‌های پلاریزه بازتاب نور را کاهش می‌دهند، اما آیا همیشه بهتر از نمونه‌های معمولی هستند؟",
    image: blogImg5,
    date: "۱۴۰۴/۰۵/۰۲",
    readTime: "۵ دقیقه",
    category: "مقایسه",
  },
  {
    id: 6,
    title: "انواع عدسی عینک طبی",
    excerpt:
      "از تک‌کانونی تا چندکانونی، هر نوع عدسی چه کاربردی دارد و برای چه کسانی مناسب است؟",
    image: blogImg6,
    date: "۱۴۰۴/۰۴/۲۸",
    readTime: "۷ دقیقه",
    category: "آموزش",
  },
  {
    id: 7,
    title: "چگونه عینک آفتابی اصل را تشخیص دهیم؟",
    excerpt:
      "با چند روش ساده می‌توانید از اصالت عینک آفتابی خود مطمئن شوید و از چشم‌هایتان محافظت کنید.",
    image: blogImg7,
    date: "۱۴۰۴/۰۴/۲۵",
    readTime: "۴ دقیقه",
    category: "راهنما",
  },
  {
    id: 8,
    title: "تاریخچه عینک؛ از گذشته تا امروز",
    excerpt:
      "جالب است بدانید اولین عینک‌ها چگونه ساخته شدند و چه مسیری را تا به امروز طی کرده‌اند.",
    image: blogImg8,
    date: "۱۴۰۴/۰۴/۲۰",
    readTime: "۸ دقیقه",
    category: "تاریخی",
  },
];

const BlogPage = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-white py-6 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* هدر */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full" />
              وبلاگ سلطانی
            </h1>
            <p className="text-[11px] text-gray-500 mt-1 mr-3">
              جدیدترین مقالات درباره عینک و سلامت چشم
            </p>
          </div>
          <span className="text-[11px] text-gray-500 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl">
            {blogPosts.length} مقاله
          </span>
        </div>

        {/* گرید مقالات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================================================================ */
/*                       کارت مقاله (کلیک‌نشدنی)                    */
/* ================================================================ */
const BlogCard = ({ post, index }) => {
  return (
    <div
      className="
        group relative flex flex-col
        bg-gradient-to-b from-gray-800 to-gray-900
        rounded-xl overflow-hidden
        border border-gray-700/60
        shadow-md shadow-black/20
        hover:shadow-xl hover:shadow-yellow-500/10
        hover:border-yellow-500/40
        hover:-translate-y-0.5
        transition-all duration-300
        max-w-[260px] w-full mx-auto
        cursor-default
        select-none
      "
      style={{
        animation: `fadeInUp 0.4s ease-out ${index * 40}ms both`,
      }}
    >
      {/* تصویر */}
      <div className="relative h-32 w-full bg-gray-800 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* دسته‌بندی */}
        <div className="absolute top-1.5 right-1.5 bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-10">
          {post.category}
        </div>
      </div>

      {/* محتوا */}
      <div className="p-2.5 flex flex-col gap-1.5 flex-1">
        <h2 className="text-[12px] font-bold text-white leading-snug line-clamp-2 min-h-[2rem] group-hover:text-yellow-400 transition-colors">
          {post.title}
        </h2>

        <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2 min-h-[1.6rem] flex-1">
          {post.excerpt}
        </p>

        {/* تاریخ و زمان */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-700/60 text-[9px] text-gray-500">
          <span className="flex items-center gap-0.5">
            <HiOutlineCalendar className="w-2.5 h-2.5" />
            {post.date}
          </span>
          <span className="w-px h-2.5 bg-gray-700" />
          <span className="flex items-center gap-0.5">
            <HiOutlineClock className="w-2.5 h-2.5" />
            {post.readTime}
          </span>
        </div>

        {/* دکمه ادامه مطلب - غیرفعال */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-1 text-[10px] text-yellow-500/60 font-bold">
            ادامه مطلب
            <span>←</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;