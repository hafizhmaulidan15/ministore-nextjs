"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type User = {
  username: string;          // dipakai waktu login
  displayName?: string;      // nama yang ditampilkan
  email?: string;
  address?: string;
  avatarDataUrl?: string;    // base64 image (PP)
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
  updateProfile: (profile: Partial<Omit<User, "username">>) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "ministore_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // load dari localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to load user", e);
    }
  }, []);

  const persistUser = (u: User | null) => {
    if (typeof window === "undefined") return;
    if (u) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (username: string, password: string) => {
    setError(null);

    if (username.trim().length < 3 || password.trim().length < 3) {
      setError("Username dan password minimal 3 karakter.");
      return false;
    }

    const u: User = {
      username: username.trim(),
      displayName: username.trim(),
    };
    setUser(u);
    persistUser(u);
    return true;
  };

  const register = async (username: string, password: string) => {
    setError(null);

    if (username.trim().length < 3 || password.trim().length < 3) {
      setError("Username dan password minimal 3 karakter.");
      return false;
    }

    const u: User = {
      username: username.trim(),
      displayName: username.trim(),
    };
    setUser(u);
    persistUser(u);
    return true;
  };

  const logout = () => {
    setUser(null);
    persistUser(null);
  };

  const clearError = () => setError(null);

  const updateProfile = (profile: Partial<Omit<User, "username">>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated: User = { ...prev, ...profile };
      persistUser(updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error,
        clearError,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
