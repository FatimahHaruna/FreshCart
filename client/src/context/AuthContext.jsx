import { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser, getUserProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            setLoading(false);
            return;
        }
        getUserProfile()
            .then((data) => {
                setUser(data.user || data);
            })
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("token", data.token);

    setUser(data.user || data);

    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);

    localStorage.setItem("token", data.token);

    setUser(data.user || data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
    return useContext(AuthContext);
}