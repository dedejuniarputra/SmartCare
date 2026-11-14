// Ganti nomor WhatsApp Home Care di sini (format 62...)
export const WA_NUMBER = "6288224214834";
export const WA_DISPLAY = "+62 882-2421-4834"; // Sesuaikan tampilan dengan WA_NUMBER
export const WA_MESSAGE =
  "Halo kak, saya ingin bertanya tentang layanan - layanan dari Smart Home Care";

export const ADDRESS =
  "Melayani kunjungan ke rumah pasien di seluruh area Yogyakarta dan sekitarnya";
export const HOURS = "Senin – Minggu, 07.00 – 21.00 WIB";
export const MAPS_EMBED = "https://www.google.com/maps?q=Yogyakarta&output=embed";

export const PRICE_NOTE =
  "Biaya layanan belum termasuk ongkos jalan, area Yogyakarta dan sekitarnya.";

export const COPYRIGHT =
  "© 2026 Smart Home Care Area Yogyakarta dan Sekitarnya. Hak cipta dilindungi.";

export const waLink = (message: string): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const orderServiceMessage = (
  serviceName: string,
  servicePrice: string,
): string => {
  const price = servicePrice.startsWith("Rp ")
    ? servicePrice.replace("Rp ", "Rp. ")
    : servicePrice.startsWith("Rp.")
      ? servicePrice
      : `Rp. ${servicePrice}`;
  return `Halo kak Smart Home Care, saya ingin memesan layanan *${serviceName} - ${price}*. Mohon konfirmasi dan jadwal yang tersedia yaa kak`;
};

export const waOrderLink = (
  serviceName: string,
  servicePrice: string,
): string => waLink(orderServiceMessage(serviceName, servicePrice));

export interface NavLink {
  label: string;
  href: string;
  icon: "House" | "HeartHandshake" | "Star" | "Phone";
}

export const navLinks: NavLink[] = [
  { label: "Beranda", href: "#beranda", icon: "House" },
  { label: "Layanan", href: "#layanan", icon: "HeartHandshake" },
  { label: "Kepuasan", href: "#kepuasan", icon: "Star" },
  { label: "Kontak", href: "#kontak", icon: "Phone" },
];

export interface OrderStep {
  step: string;
  title: string;
  description: string;
  icon: "ClipboardList" | "MessageSquare" | "Home";
}

export const orderSteps: OrderStep[] = [
  {
    step: "01",
    title: "Pilih Layanan",
    description:
      "Pilih jenis tindakan layanan atau perawatan medis yang dibutuhkan oleh pasien.",
    icon: "ClipboardList",
  },
  {
    step: "02",
    title: "Hubungi WhatsApp",
    description:
      "Konsultasikan kondisi pasien, harga layanan beserta ongkos jalan, dan atur jadwal kunjungan langsung dengan perawat.",
    icon: "MessageSquare",
  },
  {
    step: "03",
    title: "Perawat Tiba di Rumah",
    description:
      "Perawat berlisensi hadir ke lokasi dengan peralatan medis lengkap dan steril.",
    icon: "Home",
  },
];

export interface ServiceItem {
  name: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  items: string[];
}

export const services: ServiceItem[] = [
  {
    name: "Pemeriksaan Tanda-tanda Vital",
    description:
      "Pemeriksaan menyeluruh kondisi fisik dasar pasien untuk memantau status kesehatan.",
    price: "Rp 70.000",
    image: "/images/layanan-tanda-vital.jpg",
    imageAlt: "Pemeriksaan tensi dan tanda vital pasien di rumah",
    items: ["Tensi", "Saturasi", "Suhu", "Nadi"],
  },
  {
    name: "Perawatan Luka",
    description:
      "Pembersihan dan penggantian balutan luka dengan teknik steril dan higienis.",
    price: "Rp 100.000",
    image: "/images/layanan-perawatan-luka.jpg",
    imageAlt: "Perawat merawat dan membalut luka pasien",
    items: ["Luka Operasi", "Luka Diabetes"],
  },
  {
    name: "Pengecekan Kolesterol, Gula Darah, Asam Urat",
    description:
      "Pemeriksaan Kolesterol, Gula Darah, Asam Urat mudah di rumah dengan alat tes digital instan dan akurat.",
    price: "Rp 100.000",
    image: "/images/layanan-cek-darah.jpg",
    imageAlt: "Pengecekan kolesterol, gula darah, dan asam urat",
    items: ["Kolesterol", "Gula Darah", "Asam Urat"],
  },
  {
    name: "Personal Hygiene (Memandikan Pasien)",
    description:
      "Bantuan perawatan kebersihan tubuh bagi pasien tirah baring (bedrest) atau lansia.",
    price: "Rp 80.000",
    image: "/images/layanan-personal-hygiene.jpg",
    imageAlt: "Bantuan memandikan dan perawatan kebersihan diri pasien",
    items: ["Memandikan Pasien", "Perawatan Diri"],
  },
  {
    name: "Pendampingan Pasien",
    description:
      "Pendampingan pasien secara teliti dan penuh perhatian oleh tenaga perawat.",
    price: "Rp 100.000",
    image: "/images/layanan-perawatan-pasien.jpg",
    imageAlt: "Perawat mendampingi pasien berobat dan di rumah",
    items: ["Pendampingan RS", "Rawat di Rumah"],
  },
];

export interface Testimonial {
  name: string;
  area: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
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
    area: "Bantul",
    quote:
      "Luka ayah saya mulai membaik berkat perawatan rutin di rumah. Sangat terbantu.",
    rating: 4,
  },
  {
    name: "Bapak Hendra",
    area: "Sleman",
    quote:
      "Bisa menyesuaikan jadwal sesuai kebutuhan keluarga. Komunikasinya cepat dan ramah.",
    rating: 5,
  },
  {
    name: "Ibu Dewi",
    area: "Yogyakarta",
    quote:
      "Membantu sekali saat suami pasca operasi. Kami jadi lebih tenang dirawat di rumah.",
    rating: 4,
  },
];

