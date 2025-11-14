"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import { useTheme } from "../context/theme-context";
import { useAuth } from "../context/auth-context";

export function Header() {
  const { totalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header
      className={`border-b backdrop-blur ${
        isDark
          ? "border-slate-800 bg-slate-950/80"
          : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          MiniStore
        </Link>

        <nav className="flex items-center gap-4 md:gap-6 text-sm">
          <Link
            href="/products"
            className="hover:text-slate-900 text-slate-600 dark:text-slate-300 dark:hover:text-white"
          >
            Produk
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-1 hover:text-slate-900 text-slate-600 dark:text-slate-300 dark:hover:text-white"
          >
            <span>Keranjang</span>
            <span className="inline-flex items-center justify-center text-xs rounded-full bg-blue-600 text-white min-w-[20px] h-5 px-1">
              {totalItems}
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="hidden md:inline text-xs text-slate-500 dark:text-slate-300 hover:underline"
              >
                Hi,{" "}
                <span className="font-semibold">
                  {user?.displayName || user?.username}
                </span>
              </Link>
              <button
                onClick={logout}
                className="text-xs text-slate-600 dark:text-slate-300 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs text-slate-600 dark:text-slate-300 hover:underline"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition
              ${
                isDark
                  ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
          >
            <span>{isDark ? "🌙" : "☀️"}</span>
            <span>{isDark ? "Dark" : "Light"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
