import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWishlist } from "../components/WishlistContext";
import { useOrders } from "../components/OrderContext";
import { useToast } from "../contexts/ToastContext";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePencil,
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineCalendar,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineHome,
} from "react-icons/hi";

/* ================================================================ */
/*                        تب‌های پروفایل                            */
/* ================================================================ */
const tabs = [
  { id: "info", label: "اطلاعات شخصی", icon: HiOutlineUser },
  { id: "addresses", label: "آدرس‌ها", icon: HiOutlineLocationMarker },
  { id: "security", label: "امنیت", icon: HiOutlineShieldCheck },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout, updateUser } = useAuth();
  const { totalWishlistItems } = useWishlist();
  const { getUserOrders } = useOrders();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nationalCode: "",
    birthDate: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    province: "",
    city: "",
    fullAddress: "",
    postalCode: "",
    receiver: "",
    receiverPhone: "",
  });

  /* ================================================================ */
  /*             بارگذاری اطلاعات کاربر در فرم                        */
  /* ================================================================ */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        nationalCode: user.nationalCode || "",
        birthDate: user.birthDate || "",
      });
      setAddresses(user.addresses || []);
    }
  }, [user]);

  /* ================================================================ */
  /*               اگه کاربر لاگین نیست، برو به خانه                   */
  /* ================================================================ */
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const orders = getUserOrders();

  /* ================================================================ */
  /*                       عملیات‌ها                                  */
  /* ================================================================ */
  const handleSaveInfo = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success("اطلاعات با موفقیت ذخیره شد");
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        nationalCode: user.nationalCode || "",
        birthDate: user.birthDate || "",
      });
    }
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.fullAddress.trim()) {
      toast.error("آدرس کامل را وارد کن");
      return;
    }
    if (!newAddress.receiver.trim()) {
      toast.error("نام گیرنده را وارد کن");
      return;
    }

    const updated = [
      ...addresses,
      { ...newAddress, id: Date.now(), isDefault: addresses.length === 0 },
    ];
    setAddresses(updated);
    updateUser({ addresses: updated });
    setNewAddress({
      title: "",
      province: "",
      city: "",
      fullAddress: "",
      postalCode: "",
      receiver: "",
      receiverPhone: "",
    });
    setShowAddressForm(false);
    toast.success("آدرس جدید اضافه شد");
  };

  const handleRemoveAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    // اگه آدرس حذف‌شده پیش‌فرض بود، اولین آدرس رو پیش‌فرض کن
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    setAddresses(updated);
    updateUser({ addresses: updated });
    toast.info("آدرس حذف شد");
  };

  const handleSetDefault = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    updateUser({ addresses: updated });
    toast.success("آدرس پیش‌فرض تغییر کرد");
  };

  const handleLogout = () => {
    logout();
    toast.info("از حساب خارج شدی");
    navigate("/");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* ================= هدر پروفایل ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-yellow-500 via-yellow-600 to-yellow-800 p-6 sm:p-8 mb-6 shadow-2xl shadow-yellow-500/10">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-black/20 blur-3xl" />
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-black/30 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {user?.phone?.slice(-2) || "؟"}
                  </span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-4 border-yellow-600" />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white mb-1">
                  {user?.name || "کاربر عزیز"}
                </h1>
                <p
                  className="text-xs sm:text-sm text-white/80 flex items-center gap-1.5"
                  dir="ltr"
                >
                  <HiOutlinePhone className="w-3.5 h-3.5" />
                  {user?.phone}
                </p>
                <p className="text-[11px] text-white/60 mt-1 flex items-center gap-1.5">
                  <HiOutlineCalendar className="w-3 h-3" />
                  عضویت از{" "}
                  {new Date(user?.joinedAt || Date.now()).toLocaleDateString(
                    "fa-IR"
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-black/30 hover:bg-red-500/80 backdrop-blur-md text-white text-sm font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all active:scale-95"
            >
              <HiOutlineLogout className="w-4 h-4" />
              خروج از حساب
            </button>
          </div>
        </div>

        {/* ================= کارت‌های آماری ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Link
            to="/orders"
            className="group relative overflow-hidden bg-gradient-to-l from-yellow-500/15 to-yellow-800/5 border border-yellow-500/20 rounded-2xl p-4 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                <HiOutlineShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400 mb-0.5">سفارشات</p>
                <p className="text-lg font-black text-white">
                  {orders.length}
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="group relative overflow-hidden bg-gradient-to-l from-red-500/15 to-red-800/5 border border-red-500/20 rounded-2xl p-4 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <HiOutlineHeart className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400 mb-0.5">علاقه‌مندی‌ها</p>
                <p className="text-lg font-black text-white">
                  {totalWishlistItems}
                </p>
              </div>
            </div>
          </Link>

          <div className="group relative overflow-hidden bg-gradient-to-l from-green-500/15 to-green-800/5 border border-green-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                <HiOutlineShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400 mb-0.5">وضعیت حساب</p>
                <p className="text-sm font-black text-green-400">فعال</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= تب‌ها ================= */}
        <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-3xl overflow-hidden">
          {/* نوار تب‌ها */}
          <div className="flex border-b border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-bold
                    transition-all relative
                    ${
                      isActive
                        ? "text-yellow-400"
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-yellow-400 to-yellow-700" />
                  )}
                </button>
              );
            })}
          </div>

          {/* محتوای تب‌ها */}
          <div className="p-5 sm:p-6">
            {/* ------------- تب اطلاعات شخصی ------------- */}
            {activeTab === "info" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-black text-white">
                    اطلاعات شخصی
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 px-3 py-2 rounded-xl transition"
                    >
                      <HiOutlinePencil className="w-3.5 h-3.5" />
                      ویرایش
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-xl transition"
                      >
                        <HiOutlineX className="w-3.5 h-3.5" />
                        انصراف
                      </button>
                      <button
                        onClick={handleSaveInfo}
                        className="flex items-center gap-1.5 text-xs font-bold text-black bg-gradient-to-l from-yellow-500 to-yellow-700 px-3 py-2 rounded-xl transition active:scale-95"
                      >
                        <HiOutlineCheck className="w-3.5 h-3.5" />
                        ذخیره
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoField
                    label="نام و نام خانوادگی"
                    value={formData.name}
                    isEditing={isEditing}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                    icon={HiOutlineUser}
                    placeholder="مثلاً علی رضایی"
                  />
                  <InfoField
                    label="شماره موبایل"
                    value={user?.phone}
                    isEditing={false}
                    icon={HiOutlinePhone}
                    dir="ltr"
                    disabled
                  />
                  <InfoField
                    label="ایمیل"
                    value={formData.email}
                    isEditing={isEditing}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                    icon={HiOutlineMail}
                    placeholder="example@mail.com"
                    dir="ltr"
                  />
                  <InfoField
                    label="کد ملی"
                    value={formData.nationalCode}
                    isEditing={isEditing}
                    onChange={(v) =>
                      setFormData({ ...formData, nationalCode: v })
                    }
                    icon={HiOutlineShieldCheck}
                    placeholder="۱۰ رقم"
                    dir="ltr"
                  />
                  <InfoField
                    label="تاریخ تولد"
                    value={formData.birthDate}
                    isEditing={isEditing}
                    onChange={(v) => setFormData({ ...formData, birthDate: v })}
                    icon={HiOutlineCalendar}
                    placeholder="۱۳۷۰/۰۱/۰۱"
                  />
                </div>
              </div>
            )}

            {/* ------------- تب آدرس‌ها ------------- */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-black text-white">
                    آدرس‌های من ({addresses.length})
                  </h2>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-1.5 text-xs font-bold text-black bg-gradient-to-l from-yellow-500 to-yellow-700 px-3 py-2 rounded-xl transition active:scale-95"
                    >
                      <HiOutlinePlus className="w-3.5 h-3.5" />
                      افزودن آدرس
                    </button>
                  )}
                </div>

                {/* فرم آدرس جدید */}
                {showAddressForm && (
                  <div className="mb-5 p-4 bg-gray-800/50 border border-gray-700 rounded-2xl">
                    <h3 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2">
                      <HiOutlinePlus className="w-4 h-4" />
                      آدرس جدید
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="عنوان (مثلاً: خانه)"
                        value={newAddress.title}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            title: e.target.value,
                          })
                        }
                        className="bg-gray-900 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="استان"
                        value={newAddress.province}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            province: e.target.value,
                          })
                        }
                        className="bg-gray-900 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="شهر"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="bg-gray-900 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="کد پستی"
                        value={newAddress.postalCode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            postalCode: e.target.value,
                          })
                        }
                        className="bg-gray-900 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="نام گیرنده *"
                        value={newAddress.receiver}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            receiver: e.target.value,
                          })
                        }
                        className="bg-gray-900 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="شماره تماس گیرنده"
                        value={newAddress.receiverPhone}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            receiverPhone: e.target.value,
                          })
                        }
                        className="bg-gray-900 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                        dir="ltr"
                      />
                      <textarea
                        placeholder="آدرس کامل *"
                        value={newAddress.fullAddress}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            fullAddress: e.target.value,
                          })
                        }
                        rows={3}
                        className="sm:col-span-2 bg-gray-900 border border-gray-700 focus:border-yellow-500 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={handleAddAddress}
                        className="flex items-center gap-1.5 text-xs font-bold text-black bg-gradient-to-l from-yellow-500 to-yellow-700 px-4 py-2.5 rounded-xl transition active:scale-95"
                      >
                        <HiOutlineCheck className="w-3.5 h-3.5" />
                        ذخیره آدرس
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-xl transition"
                      >
                        <HiOutlineX className="w-3.5 h-3.5" />
                        انصراف
                      </button>
                    </div>
                  </div>
                )}

                {/* لیست آدرس‌ها */}
                {addresses.length === 0 && !showAddressForm ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                      <HiOutlineLocationMarker className="w-7 h-7 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                      هنوز آدرسی ثبت نکردی
                    </p>
                    <p className="text-xs text-gray-500">
                      برای ارسال سفارش، حداقل یه آدرس اضافه کن
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`
                          relative p-4 rounded-2xl border transition-all
                          ${
                            address.isDefault
                              ? "bg-yellow-500/5 border-yellow-500/40"
                              : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
                          }
                        `}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`
                                w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                ${
                                  address.isDefault
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-gray-700 text-gray-400"
                                }
                              `}
                            >
                              <HiOutlineHome className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="text-sm font-black text-white">
                                  {address.title || "آدرس"}
                                </h4>
                                {address.isDefault && (
                                  <span className="text-[10px] bg-yellow-500 text-black font-black px-2 py-0.5 rounded-full">
                                    پیش‌فرض
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                                {address.province}، {address.city}،{" "}
                                {address.fullAddress}
                              </p>
                              <div className="flex items-center gap-4 text-[11px] text-gray-500 flex-wrap">
                                {address.receiver && (
                                  <span>گیرنده: {address.receiver}</span>
                                )}
                                {address.receiverPhone && (
                                  <span dir="ltr">
                                    {address.receiverPhone}
                                  </span>
                                )}
                                {address.postalCode && (
                                  <span>کد پستی: {address.postalCode}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefault(address.id)}
                                className="text-[10px] font-bold text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded-lg hover:bg-yellow-500/10 transition whitespace-nowrap"
                              >
                                پیش‌فرض کن
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveAddress(address.id)}
                              className="text-[10px] font-bold text-red-400 hover:text-red-300 px-2 py-1 rounded-lg hover:bg-red-500/10 transition"
                            >
                              <HiOutlineTrash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------- تب امنیت ------------- */}
            {activeTab === "security" && (
              <div className="space-y-4">
                <h2 className="text-base font-black text-white mb-5">
                  تنظیمات امنیتی
                </h2>

                <SecurityRow
                  title="شماره موبایل"
                  desc="شماره‌ی اصلی حساب شما"
                  value={user?.phone}
                  isVerified={true}
                  dir="ltr"
                />

                <SecurityRow
                  title="ایمیل"
                  desc={
                    user?.email
                      ? "ایمیل تایید شده"
                      : "برای امنیت بیشتر، ایمیل خود را ثبت کنید"
                  }
                  value={user?.email || "ثبت نشده"}
                  isVerified={!!user?.email}
                  dir="ltr"
                />

                <div className="flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-700 text-gray-400 flex items-center justify-center">
                      <HiOutlineShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        ورود دو مرحله‌ای
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        تایید با پیامک هنگام ورود
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2.5 py-1 rounded-full border border-green-500/30">
                    فعال
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================================================ */
/*                       کامپوننت‌های کمکی                          */
/* ================================================================ */

const InfoField = ({
  label,
  value,
  isEditing,
  onChange,
  icon: Icon,
  placeholder,
  dir,
  disabled,
}) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-400 mb-2 flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
      {disabled && (
        <span className="text-[10px] text-green-400 font-bold">
          (تایید شده)
        </span>
      )}
    </label>
    {isEditing && !disabled ? (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        dir={dir || "rtl"}
        className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
      />
    ) : (
      <div
        dir={dir || "rtl"}
        className="w-full bg-gray-800/40 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-200"
      >
        {value || <span className="text-gray-500">ثبت نشده</span>}
      </div>
    )}
  </div>
);

const SecurityRow = ({ title, desc, value, isVerified, dir }) => (
  <div className="flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700 rounded-2xl">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${
            isVerified
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-700 text-gray-400"
          }
        `}
      >
        {isVerified ? (
          <HiOutlineCheck className="w-5 h-5" />
        ) : (
          <HiOutlineX className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{desc}</p>
        <p className="text-xs text-gray-300 mt-1 truncate" dir={dir}>
          {value}
        </p>
      </div>
    </div>
    <span
      className={`
        text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0
        ${
          isVerified
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        }
      `}
    >
      {isVerified ? "تایید شده" : "تایید نشده"}
    </span>
  </div>
);

export default ProfilePage;