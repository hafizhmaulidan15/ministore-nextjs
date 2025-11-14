"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "../../../data/products";
import { useCart } from "../../../context/cart-context";

export default function ProductDetailPage() {
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug as string | undefined;

  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <p className="mb-4 text-slate-700">Produk tidak ditemukan.</p>
        <Link
          href="/products"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Kembali ke Produk
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
    router.push("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ← Kembali
        </button>
        <Link
          href="/cart"
          className="text-sm text-blue-600 hover:underline"
        >
          Lihat Keranjang
        </Link>
      </div>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="bg-white/80 rounded-xl border border-slate-200 shadow-sm p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-3 text-slate-900">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold mb-2 text-slate-900">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          {product.stock != null && (
            <p className="text-sm mb-4">
              <span className="text-slate-600">Stok: </span>
              <span className="font-medium text-slate-900">
                {product.stock}
              </span>
              {product.stock <= 5 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-[10px] font-medium">
                  Stok terbatas
                </span>
              )}
            </p>
          )}
          <p className="text-slate-600 mb-6">{product.description}</p>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 text-xs">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 text-slate-600 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="rounded-md bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
