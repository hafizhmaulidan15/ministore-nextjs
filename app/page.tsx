"use client";

import Link from "next/link";
import { useTheme } from "../context/theme-context";

export default function Home() {
  const { isDark } = useTheme();

  const textSub = isDark ? "text-slate-300" : "text-slate-600";

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-20 flex flex-col items-center">
        <p className={`text-xs md:text-sm mb-3 ${textSub}`}>
          Simple Store • Frontend Demo
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-center mb-4">
          Belanja Online.
          <br className="hidden md:block" />
          Satu Tempat Saja.
        </h1>

        <p
          className={`max-w-xl text-center text-sm md:text-base mb-8 ${textSub}`}
        >
          Bangun dan uji pengalaman e-commerce dengan cepat. MiniStore menyediakan
          katalog produk, pencarian, filter, keranjang, dan checkout dummy yang
          siap dikembangkan ke backend.
        </p>

        <div className="flex flex-col items-center gap-3 mb-12">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition shadow-sm bg-slate-900 text-white hover:bg-slate-800"
          >
            Mulai Belanja
          </Link>
          <button
            type="button"
            className={`inline-flex items-center gap-2 text-xs md:text-sm font-medium ${textSub} hover:underline`}
          >
            Watch demo
            <span>▶</span>
          </button>
        </div>

        <div className="w-full max-w-3xl">
          <div
            className={`aspect-[16/9] rounded-3xl border overflow-hidden flex items-center justify-center
            ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-gradient-to-tr from-sky-50 via-blue-50 to-indigo-50 border-slate-200"
            }`}
          >
            <div className="flex gap-4 items-end px-6 py-6">
              <div
                className={`flex-1 rounded-2xl p-4 shadow-sm border
                ${
                  isDark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-100"
                }`}
              >
                <p className={`text-[11px] font-semibold mb-1 ${textSub}`}>
                  Easy & Simple
                </p>
                <p className="text-sm font-semibold mb-2">
                  Atur produk, keranjang, dan checkout dalam satu tampilan.
                </p>
                <div
                  className={`h-16 rounded-xl ${
                    isDark ? "bg-slate-700" : "bg-slate-100"
                  }`}
                />
              </div>

              <div
                className={`hidden sm:block w-32 rounded-2xl p-3 shadow-sm border
                ${
                  isDark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-100"
                }`}
              >
                <p className={`text-[11px] font-semibold mb-2 ${textSub}`}>
                  Ringkasan
                </p>
                <div className="space-y-2">
                  <div
                    className={`h-2 rounded ${
                      isDark ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  />
                  <div
                    className={`h-2 rounded w-3/4 ${
                      isDark ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  />
                  <div
                    className={`h-2 rounded w-2/3 ${
                      isDark ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="max-w-5xl mx-auto px-4 pb-16 grid gap-8 md:grid-cols-3"
      >
        {[
          {
            label: "Katalog",
            title: "Search & filter produk",
            desc: "Pencarian, filter tag, dan sorting harga/nama untuk eksplorasi cepat.",
          },
          {
            label: "Keranjang",
            title: "Data tersimpan otomatis",
            desc: "Keranjang menggunakan localStorage sehingga aman dari refresh.",
          },
          {
            label: "Checkout",
            title: "Flow dummy siap produksi",
            desc: "Struktur form sudah rapi dan mudah disambungkan ke backend.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-2xl p-5 border bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
              {f.label}
            </p>
            <h2 className="text-sm font-semibold mb-2">{f.title}</h2>
            <p className={`text-xs ${textSub}`}>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
