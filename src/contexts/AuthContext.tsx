// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: { name: string; email: string; role: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load token from localStorage on app load
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      // Fetch user details from the backend
      fetchUserDetails(savedToken);
    }
  }, []);

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await fetch("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { token, user } = await response.json();
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
