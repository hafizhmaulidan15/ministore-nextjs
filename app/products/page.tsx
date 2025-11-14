"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTheme } from "../../context/theme-context";
import { products as allProducts, type Product } from "../../data/products";

const PAGE_SIZE = 10;

const formatPrice = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export default function ProductsPage() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // reset ke page 1 kalau search berubah
  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return allProducts;

    return allProducts.filter((p) => {
      const inName = p.name.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inTags = p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
      return inName || inDesc || inTags;
    });
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const startIndex = (page - 1) * PAGE_SIZE;
  const pageItems = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Produk</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {filteredProducts.length} produk ditemukan
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk (nama, deskripsi, tag)..."
          className="w-full sm:w-64 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </div>

      {/* Grid produk */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {pageItems.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className={`rounded-xl border shadow-sm overflow-hidden transition transform hover:-translate-y-1 hover:shadow-md ${
              isDark
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="font-semibold text-sm">{product.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Rp {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 disabled:opacity-40"
          >
            ‹ Prev
          </button>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 disabled:opacity-40"
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
