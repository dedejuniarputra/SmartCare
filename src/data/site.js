// Ganti nomor WhatsApp Home Care di sini (format 62...)
export const WA_NUMBER = "6281234567890";
export const WA_DISPLAY = "+62 812-3456-7890"; // Sesuaikan tampilan dengan WA_NUMBER
export const WA_MESSAGE =
  "Halo Home Care, saya ingin bertanya tentang layanan home care.";

export const ADDRESS =
  "Jl. Kaliurang Km. 5, Sleman, Daerah Istimewa Yogyakarta 55581";
export const HOURS = "Senin – Minggu, 07.00 – 21.00 WIB";
export const MAPS_EMBED = "https://www.google.com/maps?q=Yogyakarta&output=embed";

export const waLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Beranda", href: "#beranda", icon: "House" },
  { label: "Layanan", href: "#layanan", icon: "HeartHandshake" },
  { label: "Kepuasan", href: "#kepuasan", icon: "Star" },
  { label: "Kontak", href: "#kontak", icon: "Phone" },
];

export const services = [
  {
    name: "Perawatan Luka",
    description:
      "Perawatan luka pasca operasi, luka diabetes, dan luka bakar oleh perawat terlatih.",
    price: "Rp 150.000",
    image: "/images/layanan-perawatan-luka.jpg",
    imageAlt: "Perawat memasang plester pada luka pasien",
  },
  {
    name: "Perawatan Kateter",
    description:
      "Pemasangan dan perawatan kateter urine dengan teknik steril dan aman.",
    price: "Rp 175.000",
    image: "/images/layanan-perawatan-kateter.jpg",
    imageAlt: "Perawat menyiapkan alat medis steril",
  },
  {
    name: "Injeksi & Infus",
    description:
      "Pemberian obat, vitamin, dan cairan infus sesuai resep dokter.",
    price: "Rp 200.000",
    image: "/images/layanan-injeksi-infus.jpg",
    imageAlt: "Perawat memberikan suntikan kepada pasien",
  },
  {
    name: "Perawatan Pasien di Rumah",
    description:
      "Pendampingan dan perawatan pasien lanjut usia atau pasca rawat inap.",
    price: "Rp 250.000",
    image: "/images/layanan-perawatan-pasien.jpg",
    imageAlt: "Perawat mendampingi pasien lanjut usia di rumah",
  },
];

export const testimonials = [
  {
    name: "Ibu Sari",
    area: "Sleman",
    quote:
      "Perawat Home Care sangat teliti saat merawat luka saya. Penjelasannya jelas dan bikin saya tenang.",
    rating: 5,
  },
  {
    name: "Bapak Andi",
    area: "Bantul",
    quote:
      "Ganti kateter bisa langsung di rumah, praktis dan steril. Harga juga jelas sejak awal.",
    rating: 5,
  },
  {
    name: "Ibu Rina",
    area: "Kota Yogyakarta",
    quote:
      "Layanan ramah, datang tepat waktu, dan proses pemesanan lewat WhatsApp sangat gampang.",
    rating: 4,
  },
  {
    name: "Bapak Joko",
    area: "Depok, Sleman",
    quote:
      "Sangat sabar merawat orang tua saya. Setiap kunjungan selalu dilaporkan kondisinya dengan jelas.",
    rating: 5,
  },
  {
    name: "Ibu Wulan",
    area: "Kotagede",
    quote:
      "Luka ayah saya mulai membaik berkat perawatan rutin di rumah. Sangat terbantu.",
    rating: 4,
  },
  {
    name: "Bapak Hendra",
    area: "Godean",
    quote:
      "Bisa menyesuaikan jadwal sesuai kebutuhan keluarga. Komunikasinya cepat dan ramah.",
    rating: 5,
  },
  {
    name: "Ibu Dewi",
    area: "Mlati",
    quote:
      "Membantu sekali saat suami pasca operasi. Kami jadi lebih tenang dirawat di rumah.",
    rating: 4,
  },
];
