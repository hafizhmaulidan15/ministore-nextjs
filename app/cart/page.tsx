"use client";

import Link from "next/link";
import { useCart } from "../../context/cart-context";

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4 text-slate-900">
          Keranjang
        </h1>
        <p className="text-slate-600 mb-4">
          Keranjang belanja kamu masih kosong.
        </p>
        <Link
          href="/products"
          className="inline-flex text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
        >
          Belanja sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Keranjang
      </h1>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm p-4"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-900">
                  {item.product.name}
                </p>
                <p className="text-sm text-slate-500">
                  Rp {item.product.price.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity - 1
                    )
                  }
                  className="px-2 py-1 text-xs border border-slate-300 rounded-md bg-white hover:bg-slate-100"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm text-slate-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity + 1
                    )
                  }
                  className="px-2 py-1 text-xs border border-slate-300 rounded-md bg-white hover:bg-slate-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

        <aside className="rounded-xl bg-white/80 border border-slate-200 shadow-sm p-4 h-fit">
          <h2 className="font-semibold mb-4 text-slate-900 text-sm">
            Ringkasan
          </h2>
          <p className="flex justify-between mb-4 text-sm text-slate-700">
            <span>Total</span>
            <span className="font-semibold text-slate-900">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </p>
          <Link
            href="/checkout"
            className="block text-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Lanjut ke Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
