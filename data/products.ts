export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  tags?: string[];
  stock?: number;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "kaos-basic-hitam",
    name: "Kaos Basic Hitam",
    price: 99000,
    imageUrl: "https://via.placeholder.com/400x400?text=Kaos+Hitam",
    description:
      "Kaos basic bahan katun combed, nyaman dipakai sehari-hari.",
    tags: ["fashion", "t-shirt"],
    stock: 12,
  },
  {
    id: "p2",
    slug: "hoodie-abu",
    name: "Hoodie Abu",
    price: 199000,
    imageUrl: "https://via.placeholder.com/400x400?text=Hoodie+Abu",
    description: "Hoodie abu-abu nyaman untuk cuaca dingin maupun santai.",
    tags: ["fashion", "hoodie"],
    stock: 5,
  },
  {
    id: "p3",
    slug: "topi-hitam",
    name: "Topi-Hitam",
    price: 59000,
    imageUrl: "https://via.placeholder.com/400x400?text=Topi+Hitam",
    description: "Topi hitam simple, cocok untuk harian.",
    tags: ["fashion", "hat"],
    stock: 20,
  },
  {
    id: "p4",
    slug: "sneakers-putih",
    name: "Sneakers Putih",
    price: 349000,
    imageUrl: "https://via.placeholder.com/400x400?text=Sneakers+Putih",
    description: "Sepatu sneakers putih kasual untuk aktivitas sehari-hari.",
    tags: ["fashion", "shoes"],
    stock: 8,
  },
  {
    id: "p5",
    slug: "kemeja-kotak-biru",
    name: "Kemeja Kotak Biru",
    price: 159000,
    imageUrl: "https://via.placeholder.com/400x400?text=Kemeja+Biru",
    description: "Kemeja kotak-kotak biru dengan bahan nyaman dan adem.",
    tags: ["fashion", "shirt"],
    stock: 15,
  },
  {
    id: "p6",
    slug: "celana-jeans-slimfit",
    name: "Celana Jeans Slim Fit",
    price: 229000,
    imageUrl: "https://via.placeholder.com/400x400?text=Jeans+Slimfit",
    description: "Celana jeans slim fit warna biru tua untuk tampilan rapi.",
    tags: ["fashion", "pants"],
    stock: 10,
  },
  {
    id: "p7",
    slug: "jaket-parka-olive",
    name: "Jaket Parka Olive",
    price: 279000,
    imageUrl: "https://via.placeholder.com/400x400?text=Parka+Olive",
    description: "Jaket parka warna olive dengan hoodie, cocok untuk outdoor.",
    tags: ["fashion", "jacket"],
    stock: 7,
  },
  {
    id: "p8",
    slug: "tas-ransel-hitam",
    name: "Tas Ransel Hitam",
    price: 189000,
    imageUrl: "https://via.placeholder.com/400x400?text=Tas+Ransel",
    description:
      "Tas ransel hitam dengan banyak kompartemen, cocok untuk sehari-hari.",
    tags: ["bag", "accessories"],
    stock: 18,
  },
  {
    id: "p9",
    slug: "jam-tangan-minimalis",
    name: "Jam Tangan Minimalis",
    price: 249000,
    imageUrl: "https://via.placeholder.com/400x400?text=Jam+Tangan",
    description: "Jam tangan dengan desain minimalis dan strap kulit sintetis.",
    tags: ["watch", "accessories"],
    stock: 9,
  },
  {
    id: "p10",
    slug: "dompet-kulit-coklat",
    name: "Dompet Kulit Coklat",
    price: 99000,
    imageUrl: "https://via.placeholder.com/400x400?text=Dompet",
    description: "Dompet kulit warna coklat dengan banyak slot kartu.",
    tags: ["wallet", "accessories"],
    stock: 25,
  },
  // tinggal lanjut p11–p20 dengan pola yang sama kalau mau
];
