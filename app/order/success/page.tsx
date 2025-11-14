import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto rounded-2xl bg-white/80 border border-slate-200 shadow-sm p-8 text-center">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-slate-900">
          Pesanan Berhasil (Dummy)
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Pesanan kamu sudah tercatat secara dummy. Di versi produksi, data ini
          akan disimpan ke database dan diproses lebih lanjut.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex justify-center text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            Kembali Belanja
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center text-sm text-slate-700 bg-white/80 border border-slate-300 px-4 py-2 rounded-md hover:bg-slate-100 transition"
          >
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
