"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/theme-context";

export default function LoginPage() {
  const { login, error, clearError } = useAuth();
  const { isDark } = useTheme();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      router.push("/products");
    }
  };

  const showError = !!error;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center"
      style={{
        backgroundImage: isDark
          ? "radial-gradient(circle at top, #1e293b, #020617)"
          : "radial-gradient(circle at top, #4f46e5, #0f172a)",
      }}
    >
      <div className="w-full max-w-md px-4">
        <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 shadow-2xl p-8 text-slate-100">
          <h1 className="text-2xl font-bold mb-2 text-indigo-200">Login</h1>
          <p className="text-xs text-slate-300 mb-6">
            Hello! Please enter your details to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-200">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) clearError();
                }}
                placeholder="Insert your username..."
                className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2 text-sm outline-none text-slate-100 placeholder:text-slate-500
                  ${
                    showError
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-600 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                placeholder="Type your password here..."
                className={`w-full rounded-lg bg-slate-900/80 border px-3 py-2 text-sm outline-none text-slate-100 placeholder:text-slate-500
                  ${
                    showError
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-600 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  }`}
              />
            </div>

            {showError && (
              <p className="text-[11px] text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full mt-4 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-sm font-semibold py-2 text-white shadow-md transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-slate-300">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-300 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
