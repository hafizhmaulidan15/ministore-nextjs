"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { products } from "../../../data/products";
import { useTheme } from "../../../context/theme-context";
import Link from "next/link";

const formatPrice = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug]
  );

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Produk tidak ditemukan.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block text-xs text-indigo-500 hover:underline"
        >
          ← Kembali ke daftar produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/products"
        className="text-xs text-indigo-500 hover:underline mb-4 inline-block"
      >
        ← Kembali ke produk
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold text-indigo-500 dark:text-indigo-300">
            Rp {formatPrice(product.price)}
          </p>

          {product.stock !== undefined && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Stok: {product.stock}
            </p>
          )}

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-4">
            {product.description}
          </p>

          {product.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded-full text-[10px] border ${
                    isDark
                      ? "border-slate-700 bg-slate-900"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <button
            className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-sm transition"
            onClick={() =>
              alert("Ini masih demo UI. Integrasi cart/backend nanti di step berikutnya 😉")
            }
          >
            Tambah ke keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
