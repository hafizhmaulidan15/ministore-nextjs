"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../../context/theme-context";
import {
  products as initialProducts,
  type Product,
} from "../../../data/products";

const STORAGE_KEY = "admin-products";
const ADMIN_FLAG_KEY = "isAdmin";
const ADMIN_PASSWORD = "admin123"; // 👉 bebas lu ganti

type ProductForm = {
  id?: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock?: number;
};

const emptyForm: ProductForm = {
  slug: "",
  name: "",
  price: 0,
  imageUrl: "",
  description: "",
  stock: undefined,
};

const formatPrice = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export default function AdminProductsPage() {
  const { isDark } = useTheme();

  // 🔐 ADMIN GUARD
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  // 📦 DATA PRODUK
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Cek admin flag dari localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.localStorage.getItem(ADMIN_FLAG_KEY);
    setIsAdmin(flag === "true");
    setAdminChecked(true);
  }, []);

  // Load produk dari localStorage atau seed awal
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        setProducts(parsed);
        return;
      } catch (e) {
        console.error("Failed to parse products from storage", e);
      }
    }
    setProducts(initialProducts);
  }, []);

  // Simpan perubahan produk ke localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!products.length) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // Filter untuk search
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const inName = p.name.toLowerCase().includes(q);
      const inSlug = p.slug.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      return inName || inSlug || inDesc;
    });
  }, [search, products]);

  const isEditing = editingId !== null;

  function handleChange<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl,
      description: p.description,
      stock: p.stock,
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Yakin hapus produk ini?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) {
      resetForm();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.slug.trim() || !form.name.trim()) {
      alert("Slug dan nama wajib diisi.");
      return;
    }

    if (form.price <= 0) {
      alert("Harga harus lebih dari 0.");
      return;
    }

    const base: Product = {
      id: form.id ?? `p-${Date.now()}`,
      slug: form.slug.trim(),
      name: form.name.trim(),
      price: form.price,
      imageUrl:
        form.imageUrl.trim() ||
        "https://via.placeholder.com/400x400?text=Product",
      description: form.description.trim() || "Belum ada deskripsi.",
      stock: form.stock ?? undefined,
    };

    setProducts((prev) => {
      if (isEditing) {
        return prev.map((p) => (p.id === base.id ? base : p));
      }
      return [...prev, base];
    });

    resetForm();
  }

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ADMIN_FLAG_KEY, "true");
      }
      setAdminPassword("");
    } else {
      alert("Password admin salah.");
    }
  }

  function handleAdminLogout() {
    setIsAdmin(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_FLAG_KEY);
    }
  }

  // Tunggu cek admin dulu biar gak kedip-kedip
  if (!adminChecked) {
    return null;
  }

  // 🔐 Tampilan form login admin kalau belum masuk
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className={`w-full max-w-md rounded-2xl border shadow-sm p-6 ${
            isDark
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <h1 className="text-xl font-bold mb-2">Admin Login</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Halaman ini khusus untuk admin. Masukkan password admin untuk
            melanjutkan.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
            >
              Masuk sebagai Admin
            </button>
          </form>

          <p className="mt-4 text-[10px] text-slate-500">
            *Untuk demo portfolio, password ini masih hardcoded di frontend
            (lihat variabel <code>ADMIN_PASSWORD</code>).
          </p>
        </div>
      </div>
    );
  }

  // ✅ Kalau sudah admin → render panel admin penuh
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Admin <span className="text-indigo-500">Produk</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kelola daftar produk (tambah, edit, hapus). Data disimpan di
            localStorage browser.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full sm:w-64 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <button
            type="button"
            onClick={handleAdminLogout}
            className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Keluar dari admin
          </button>
        </div>
      </div>

      {/* Form */}
      <div
        className={`rounded-2xl border p-6 shadow-sm ${
          isDark
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Batal edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Slug (unique, untuk URL)
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="contoh: kaos-basic-hitam"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Nama Produk
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="contoh: Kaos Basic Hitam"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Harga (Rp)
            </label>
            <input
              type="number"
              value={form.price || ""}
              onChange={(e) =>
                handleChange("price", Number(e.target.value) || 0)
              }
              placeholder="contoh: 99000"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Stok (optional)
            </label>
            <input
              type="number"
              value={form.stock ?? ""}
              onChange={(e) =>
                handleChange(
                  "stock",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              placeholder="contoh: 10"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              URL Gambar (optional)
            </label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Deskripsi
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Deskripsi singkat produk..."
              rows={3}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
            >
              {isEditing ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </div>
        </form>
      </div>

      {/* Tabel produk */}
      <div
        className={`rounded-2xl border shadow-sm overflow-hidden ${
          isDark
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span className="text-sm font-medium">
            Daftar Produk ({products.length})
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Klik &quot;Edit&quot; untuk mengubah, &quot;Hapus&quot; untuk
            menghapus.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr
                className={
                  isDark
                    ? "bg-slate-800 text-slate-200"
                    : "bg-slate-50 text-slate-600"
                }
              >
                <th className="px-3 py-2 text-left">Nama</th>
                <th className="px-3 py-2 text-left hidden sm:table-cell">
                  Slug
                </th>
                <th className="px-3 py-2 text-left">Harga</th>
                <th className="px-3 py-2 text-left hidden md:table-cell">
                  Stok
                </th>
                <th className="px-3 py-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className={
                    isDark
                      ? "border-t border-slate-800 hover:bg-slate-800/60"
                      : "border-t border-slate-100 hover:bg-slate-50"
                  }
                >
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-8 h-8 rounded object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-[10px] text-slate-500">
                          ID: {p.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell text-[11px] text-slate-500">
                    {p.slug}
                  </td>
                  <td className="px-3 py-2 text-[11px]">
                    Rp {formatPrice(p.price)}
                  </td>
                  <td className="px-3 py-2 hidden md:table-cell text-[11px]">
                    {p.stock ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 rounded-full border border-rose-300 text-[11px] text-rose-600 hover:bg-rose-50 dark:border-rose-700 dark:hover:bg-rose-900/40"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-xs text-slate-500"
                  >
                    Tidak ada produk yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
