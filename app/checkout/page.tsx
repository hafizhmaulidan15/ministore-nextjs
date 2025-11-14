"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/cart-context";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4 text-slate-900">
          Checkout
        </h1>
        <p className="text-slate-600 mb-4">
          Keranjang kamu kosong. Silakan pilih produk dulu.
        </p>
        <Link
          href="/products"
          className="inline-flex text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
        >
          Kembali ke Produk
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // di sini nanti bisa kirim data ke API / database
    clearCart();
    router.push("/order/success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Checkout
      </h1>
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-800">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-800">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-800">
              Alamat
            </label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white/80 px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-600 text-white px-6 py-2 text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Buat Pesanan (Dummy)
          </button>
        </form>

        <aside className="rounded-xl bg-white/80 border border-slate-200 shadow-sm p-4 h-fit">
          <h2 className="font-semibold mb-4 text-slate-900 text-sm">
            Ringkasan Pesanan
          </h2>
          <ul className="space-y-2 mb-4 text-sm text-slate-700">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>
                  Rp{" "}
                  {(
                    item.product.price * item.quantity
                  ).toLocaleString("id-ID")}
                </span>
              </li>
            ))}
          </ul>
          <p className="flex justify-between font-semibold text-slate-900 text-sm">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </p>
        </aside>
      </div>
    </div>
  );
}
