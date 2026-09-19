/* eslint-disable react-refresh/only-export-components */
import { createContext, createElement, useContext, useEffect, useState } from "react";
import { registerUser, loginUser, resetPassword as resetPasswordRequest,getUserProfile } from "../services/authService";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(
		() => Boolean(localStorage.getItem("token"))
	);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			setLoading(false);
			return;
		}

		getUserProfile()
			.then((data) => {
				setUser(data.user || data);
			})
			.catch(() => {
				localStorage.removeItem("token");
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

		if (data.token) {
			localStorage.setItem("token", data.token);
		}
		setUser(data.user || data);

		return data;
	};

	const resetPassword = async (userData) => {
		return resetPasswordRequest(userData);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return createElement(
		AuthContext.Provider,
		{
			value: {
				user,
				loading,
				login,
				register,
				resetPassword,
				logout,
				isAuthenticated: Boolean(user),
			},
		},
		children
	);
};
