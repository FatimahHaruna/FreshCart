import { createContext, useEffect, useMemo, useState } from "react";
import {
  registerUser,
  loginUser,
  resetPassword as resetPasswordRequest,
  getUserProfile,
} from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrateUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getUserProfile();
        setUser(data?.user ?? data ?? null);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    hydrateUser();
  }, []);

  const login = async (userData) => {
    const data = await loginUser(userData);

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    setUser(data?.user ?? data ?? null);
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    setUser(data?.user ?? data ?? null);
    return data;
  };

  const resetPassword = async (userData) => {
    return resetPasswordRequest(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      resetPassword,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
