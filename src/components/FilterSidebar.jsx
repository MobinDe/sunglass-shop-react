import React, { useState } from "react";
import {
  HiOutlineAdjustments,
  HiOutlineUserGroup,
  HiOutlineEmojiHappy,
  HiOutlineViewGrid,
  HiOutlineChevronDown,
  HiOutlineX,
  HiOutlineRefresh,
  HiOutlineCheck,
} from "react-icons/hi";

const filterData = [
  {
    key: "gender",
    title: "جنسیت",
    icon: HiOutlineUserGroup,
    options: ["زنانه", "بچگانه", "مردانه"],
  },
  {
    key: "faceSize",
    title: "سایز صورت",
    icon: HiOutlineEmojiHappy,
    options: ["کوچک", "متوسط", "بزرگ"],
  },
  {
    key: "frameSize",
    title: "سایز فریم",
    icon: HiOutlineViewGrid,
    options: ["کوچک", "استاندارد", "بزرگ", "بچگانه (۵ تا ۸ سال)"],
  },
];

const FilterSidebar = ({ selectedFilters = {}, onFilterChange }) => {
  const [openSections, setOpenSections] = useState(
    filterData.reduce((acc, f) => ({ ...acc, [f.key]: true }), {})
  );

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSelect = (key, value) => {
    const newFilters = { ...selectedFilters };
    if (newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange(newFilters);
  };

  const clearAll = () => onFilterChange({});

  const activeCount = Object.keys(selectedFilters).length;

  return (
    <div
      dir="rtl"
      className="w-full bg-white rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden lg:sticky lg:top-4"
    >
      {/* ================= هدر ================= */}
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-900 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <HiOutlineAdjustments className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold leading-tight">فیلترها</h2>
              <p className="text-[11px] text-white/70 mt-0.5">
                {activeCount > 0
                  ? `${activeCount} فیلتر فعال`
                  : "محصولات را دقیق‌تر پیدا کن"}
              </p>
            </div>
          </div>

          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 hover:bg-white/25 backdrop-blur px-2.5 py-1.5 rounded-lg transition"
            >
              <HiOutlineRefresh className="w-3.5 h-3.5" />
              پاک کردن
            </button>
          )}
        </div>

        {/* نوار تزئینی پایین هدر */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-white/40 to-transparent" />
      </div>

      {/* ================= بدنه ================= */}
      <div className="p-5 space-y-1">
        {filterData.map((filter) => {
          const Icon = filter.icon;
          const isOpen = openSections[filter.key];
          const hasSelection = !!selectedFilters[filter.key];

          return (
            <div
              key={filter.key}
              className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
            >
              {/* تیتر بخش */}
              <button
                onClick={() => toggleSection(filter.key)}
                className="w-full flex items-center justify-between py-2 group"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`
                      w-7 h-7 rounded-lg flex items-center justify-center transition
                      ${
                        hasSelection
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-gray-50 text-gray-500 group-hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {filter.title}
                  </span>
                  {hasSelection && (
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  )}
                </div>

                <HiOutlineChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* گزینه‌ها */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}
                `}
              >
                <div className="flex flex-wrap gap-2">
                  {filter.options.map((option) => {
                    const isSelected = selectedFilters[filter.key] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(filter.key, option)}
                        className={`
                          group/chip relative flex items-center gap-1.5
                          px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium
                          border transition-all duration-200 active:scale-95
                          ${
                            isSelected
                              ? "bg-gradient-to-l from-yellow-500 to-yellow-800 border-transparent text-white shadow-md shadow-yellow-500/30"
                              : "bg-white border-gray-200 text-gray-600 hover:border-yellow-400 hover:bg-yellow-50/50 hover:text-yellow-700"
                          }
                        `}
                      >
                        {isSelected && (
                          <HiOutlineCheck className="w-3.5 h-3.5 -mr-0.5" />
                        )}
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= فوتر ================= */}
      {activeCount > 0 && (
        <div className="px-5 pb-5 pt-1">
          <div className="rounded-2xl bg-gradient-to-l from-yellow-50 to-amber-50 border border-yellow-100 p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-yellow-800">
                فیلترهای فعال
              </span>
              <span className="text-[10px] text-yellow-600">
                {activeCount} مورد
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(selectedFilters).map(([key, value]) => (
                <span
                  key={key}
                  className="flex items-center gap-1 text-[11px] bg-white text-yellow-800 border border-yellow-200 px-2 py-1 rounded-lg"
                >
                  {value}
                  <button
                    onClick={() => handleSelect(key, value)}
                    className="text-yellow-500 hover:text-red-500 transition"
                  >
                    <HiOutlineX className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;