import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// کاربر نمونه برای شبیه‌سازی
const createMockUser = (phone) => ({
  id: "user_" + phone,
  phone,
  name: `کاربر ${phone.slice(-4)}`,
  email: "",
  avatar: null,
  joinedAt: new Date().toISOString(),
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // هنگام لود اولیه، از localStorage بخون
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("خطا در خواندن اطلاعات کاربر:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ورود (شبیه‌سازی)
  const login = (phone) => {
    const mockUser = createMockUser(phone);
    const mockToken = "mock_token_" + Date.now();

    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);

    return { user: mockUser, token: mockToken };
  };

  // خروج
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // آپدیت پروفایل
  const updateUser = (newData) => {
    const updated = { ...user, ...newData };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  return ctx;
};