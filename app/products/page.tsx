"use client";

import Link from "next/link";
import { useMemo, useState, ChangeEvent } from "react";
import { products } from "../../data/products";

const PAGE_SIZE = 10;
type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTag, setActiveTag] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortOption>("default");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    const q = search.toLowerCase().trim();

    if (q) {
      list = list.filter((p) => {
        const haystack = [
          p.name,
          p.description,
          ...(p.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (activeTag !== "all") {
      list = list.filter((p) => p.tags?.includes(activeTag));
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "default":
      default:
        break;
    }

    return list;
  }, [search, activeTag, sort]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;
    setPage(newPage);
  };
  const handleTagClick = (tag: string | "all") => {
    setActiveTag(tag);
    setPage(1);
  };
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption);
    setPage(1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-900">
              Produk
            </h1>
            <p className="text-slate-600 text-sm">
              Daftar produk demo dengan pencarian, filter tag, sorting, dan
              pagination 10 item per halaman.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari produk..."
              className="rounded-md border border-slate-300 bg-white/80 px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={sort}
              onChange={handleSortChange}
              className="rounded-md border border-slate-300 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="default">Urutkan: Default</option>
              <option value="price-asc">Harga: Termurah</option>
              <option value="price-desc">Harga: Termahal</option>
              <option value="name-asc">Nama: A–Z</option>
            </select>
          </div>
        </header>

        {allTags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => handleTagClick("all")}
              className={`px-3 py-1 rounded-full border ${
                activeTag === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white/80 text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
            >
              Semua
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full border capitalize ${
                  activeTag === tag
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white/80 text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <span>
            Menampilkan{" "}
            {filteredProducts.length === 0
              ? 0
              : startIndex + 1}{" "}
            –{" "}
            {Math.min(startIndex + PAGE_SIZE, filteredProducts.length)}{" "}
            dari {filteredProducts.length} produk
          </span>
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-800"
          >
            ← Kembali ke Home
          </Link>
        </div>

        {pagedProducts.length === 0 ? (
          <p className="text-slate-600">
            Tidak ada produk yang cocok dengan kata kunci / filter.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {pagedProducts.map((p) => (
              <article
                key={p.id}
                className="rounded-xl bg-white/80 border border-slate-200 shadow-sm overflow-hidden flex flex-col"
              >
                <div className="aspect-square w-full bg-slate-100">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  {p.stock != null && p.stock <= 5 && (
                    <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-[10px] font-medium mb-2">
                      Stok terbatas
                    </span>
                  )}
                  <h2 className="font-semibold mb-1 line-clamp-2 text-slate-900">
                    {p.name}
                  </h2>
                  <p className="text-sm text-slate-500 mb-3">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] rounded-full bg-slate-100 text-slate-600 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-auto inline-block text-sm font-medium text-white bg-blue-600 px-3 py-2 rounded-md text-center hover:bg-blue-700 transition"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredProducts.length > PAGE_SIZE && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 text-xs rounded-md border border-slate-300 bg-white/70 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => {
              const pageNumber = idx + 1;
              const isActive = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 text-xs rounded-md border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white/70 text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 text-xs rounded-md border border-slate-300 bg-white/70 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              disabled={currentPage === pageCount}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
