import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import * as authService from "../services/authService";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin";
}

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token")
  );
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const stored = localStorage.getItem("admin_user");
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("admin_token", token);
    } else {
      localStorage.removeItem("admin_token");
    }
  }, [token]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin_user", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin_user");
    }
  }, [admin]);

  async function login(email: string, password: string) {
    const response = await authService.login(email, password);
    setToken(response.token);
    setAdmin(response.admin);
  }

  function logout() {
    authService.logout();
    setToken(null);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
