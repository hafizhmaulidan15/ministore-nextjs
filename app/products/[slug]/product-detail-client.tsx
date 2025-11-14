// app/products/[slug]/product-detail-client.tsx
"use client";

import { useRouter } from "next/navigation";
import type { Product } from "../../../data/products";
import { useCart } from "../../../context/cart-context";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product, 1);
    router.push("/cart");
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Kembali
        </button>
      </div>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-2">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          {product.stock != null && (
            <p className="text-sm text-gray-500 mb-4">
              Stok: {product.stock}
            </p>
          )}
          <button
            onClick={handleAddToCart}
            className="rounded-md bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </main>
  );
}
