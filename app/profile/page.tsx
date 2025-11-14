"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/theme-context";

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { isDark } = useTheme();
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | undefined>(
    undefined
  );
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setDisplayName(user.displayName || user.username);
    setEmail(user.email || "");
    setAddress(user.address || "");
    setAvatarDataUrl(user.avatarDataUrl);
  }, [user]);

  // kalau belum login → balik ke login
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatarDataUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    updateProfile({
      displayName: displayName.trim() || user.username,
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      avatarDataUrl,
    });

    // efek kecil habis menyimpan
    setJustSaved(true);
    setTimeout(() => {
      setSaving(false);
      setJustSaved(false);
    }, 800);
  };

  const bgStyle = {
    backgroundImage: isDark
      ? "radial-gradient(circle at top, #020617, #020617)"
      : "radial-gradient(circle at top, #e0f2fe, #f9fafb)",
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center"
      style={bgStyle}
    >
      <div className="w-full max-w-lg px-4 py-10">
        <div
          className={`rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-2xl p-8 transition transform ${
            justSaved ? "animate-pulse" : ""
          }`}
        >
          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
            Profil Akun
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Atur informasi akun yang akan digunakan di MiniStore.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden text-xl font-semibold text-slate-600 dark:text-slate-200">
                  {avatarDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarDataUrl}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    (displayName || user?.username || "?")
                      .charAt(0)
                      .toUpperCase()
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Foto Profil
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  Upload gambar baru (disimpan lokal di browser).
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="text-[11px] text-slate-600 dark:text-slate-300"
                />
              </div>
            </div>

            {/* Display name */}
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Nama tampil
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Nama yang ingin ditampilkan"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="email@example.com"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Alamat
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-indigo-400 min-h-[80px]"
                placeholder="Alamat pengiriman atau domisili"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:opacity-70 text-sm font-semibold py-2 text-white shadow-md transition"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>

          {/* notif sukses + CTA ke produk */}
          {justSaved && (
            <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-[11px] px-3 py-2 flex items-center justify-between gap-2">
              <span>Perubahan profil sudah disimpan.</span>
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="underline font-semibold"
              >
                Lihat produk
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
