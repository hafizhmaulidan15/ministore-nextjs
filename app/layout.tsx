import type { Metadata } from "next";
import "./globals.css";
import { type ReactNode } from "react";
import { CartProvider } from "../context/cart-context";
import { ThemeProvider } from "../context/theme-context";
import { AuthProvider } from "../context/auth-context"; // ⬅️ tambah
import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "My E-Commerce",
  description: "Simple e-commerce demo with Next.js and TypeScript",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <footer className="border-t border-slate-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-950/80">
                  <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-slate-500 dark:text-slate-400 flex justify-between">
                    <span>My E-Commerce Demo</span>
                    <span>Next.js &amp; TypeScript</span>
                  </div>
                </footer>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
