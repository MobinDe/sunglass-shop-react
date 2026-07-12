// pages/BlogPage.jsx
import React from "react";
import { Link } from "react-router-dom";

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
  },
  {
    id: 2,
    title: "ترندهای عینک در سال ۲۰۲۵",
    excerpt:
      "از فریم‌های شفاف تا طرح‌های وینتیج، ببینید امسال چه مدل‌هایی محبوب هستند.",
    image: blogImg2,
  },
  {
    id: 3,
    title: "نکات مراقبت از عینک",
    excerpt:
      "با رعایت چند نکته ساده می‌توانید عمر عینک خود را بیشتر کنید و دید بهتری داشته باشید.",
    image: blogImg3,
  },
  {
    id: 4,
    title: "عینک بلوکات چیست؟",
    excerpt:
      "عینک‌های بلوکات نور آبی را فیلتر می‌کنند و برای کار با کامپیوتر مناسب‌اند. مزایا و معایب آن‌ها را بشناسید.",
    image: blogImg4,
  },
  {
    id: 5,
    title: "تفاوت عینک‌های پلاریزه و غیرپلاریزه",
    excerpt:
      "عینک‌های پلاریزه بازتاب نور را کاهش می‌دهند، اما آیا همیشه بهتر از نمونه‌های معمولی هستند؟",
    image: blogImg5,
  },
  {
    id: 6,
    title: "انواع عدسی عینک طبی",
    excerpt:
      "از تک‌کانونی تا چندکانونی، هر نوع عدسی چه کاربردی دارد و برای چه کسانی مناسب است؟",
    image: blogImg6,
  },
  {
    id: 7,
    title: "چگونه عینک آفتابی اصل را از تقلبی تشخیص دهیم؟",
    excerpt:
      "با چند روش ساده می‌توانید از اصالت عینک آفتابی خود مطمئن شوید و از چشم‌هایتان محافظت کنید.",
    image: blogImg7,
  },
  {
    id: 8,
    title: "تاریخچه عینک؛ از گذشته تا امروز",
    excerpt:
      "جالب است بدانید اولین عینک‌ها چگونه ساخته شدند و چه مسیری را تا به امروز طی کرده‌اند.",
    image: blogImg8,
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold mb-10 text-center">وبلاگ</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-xl object-cover overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-center items-center  h-48 "
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-300 text-sm mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-4 rounded-lg transition text-center self-start"
                >
                  ادامه مطلب
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;