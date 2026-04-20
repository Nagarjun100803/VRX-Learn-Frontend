import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api-client";

export type Role = "admin" | "trainer" | "trainee";

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapUser = (data: any): User => ({
    id: data.userId,
    name: data.username,
    role: data.role,
  });

  const fetchMe = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("users/me");
      setUser(mapUser(res.data));
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email: string, password: string) => {
    await api.post("users/login", { email, password });
    const res = await api.get("users/me");
    const userData = mapUser(res.data);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await api.post("users/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
