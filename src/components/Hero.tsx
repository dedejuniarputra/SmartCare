import { CheckCircle, MapPin, Star } from "lucide-react";
import { WA_MESSAGE, waLink } from "../data/site";
import Reveal from "./Reveal";
import { Button } from "./ui/button";
import { container, WhatsAppIcon } from "./ui";

const OPEN_HOUR = 7;
const CLOSE_HOUR = 21;

function useAvailability(): boolean {
  const now = new Date();
  const hour = now.getHours();
  return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

const trustItems: string[] = [
  "Perawat berlisensi (STR)",
  "Harga transparan",
  "Jadwal fleksibel",
];

export default function Hero() {
  const isOpen = useAvailability();
  return (
    <section
      id="beranda"
      className="scroll-mt-24 bg-gradient-to-br from-sky-50 via-white to-white"
    >
      <div
        className={`${container} grid min-h-[calc(100svh-4rem)] items-center gap-10 pb-16 pt-28 md:grid-cols-2 md:gap-16 md:pb-20 md:pt-32 lg:gap-20`}
      >
        {/* ── Left: Copy (Fade in & Slide dari Kiri) ── */}
        <div className="flex flex-col justify-center">
          <Reveal direction="from-left" delayMs={40}>
            {/* Location pill */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-xs font-semibold text-sky-700">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Melayani area Yogyakarta dan sekitarnya
            </div>
          </Reveal>

          <Reveal direction="from-left" delayMs={100}>
            <h1 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
              Perawatan kesehatan profesional,{" "}
              <span className="text-sky-600">langsung di rumah Anda.</span>
            </h1>
          </Reveal>

          <Reveal direction="from-left" delayMs={160}>
            <p className="mt-4 max-w-xl lg:max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700">
              Perawat berpengalaman kami hadir ke rumah Anda untuk menangani
              perawatan luka, tanda vital, cek gula darah & kolesterol, personal
              hygiene, dan pendampingan pasien — tanpa perlu ke klinik.
            </p>
          </Reveal>

          {/* CTA Buttons - Ramah sentuhan mobile (min 48px) */}
          <Reveal direction="from-left" delayMs={220}>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="h-12 w-full sm:w-auto rounded-xl bg-sky-600 px-6 text-base font-bold text-white shadow-md hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.98]"
              >
                <a
                  href={waLink(WA_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Pesan Sekarang</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full sm:w-auto rounded-xl border-slate-300 bg-white px-6 text-base font-semibold text-slate-800 hover:bg-slate-50 active:scale-[0.98] flex items-center justify-center"
              >
                <a href="#layanan">Lihat Layanan</a>
              </Button>
            </div>
          </Reveal>

          {/* Trust Checklist - Selalu sejajar 1 baris di semua ukuran layar hp */}
          <Reveal direction="from-left" delayMs={280}>
            <ul className="mt-7 flex items-center gap-2.5 sm:gap-4 md:gap-5 overflow-x-auto flex-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:none w-full py-0.5">
              {trustItems.map((item) => (
                <li
                  key={item}
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11.5px] sm:text-xs md:text-sm font-medium text-slate-700"
                >
                  <CheckCircle
                    className="h-3.5 w-3.5 shrink-0 text-sky-600 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Right: Image (Fade in & Slide dari Kanan) ── */}
        <Reveal direction="from-right" delayMs={120} className="w-full">
          <div className="relative mx-auto md:ml-auto md:mr-0 w-full max-w-lg lg:max-w-xl">
            {/* Soft glow behind image */}
            <div
              className="absolute -inset-3 rounded-2xl bg-sky-100/80 blur-2xl"
              aria-hidden="true"
            />

            {/* Hero image — kurang rounded, tegas */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 shadow-xl shadow-sky-100/60">
              <img
                src="/images/hero-home-care.jpg"
                alt="Perawat Home Care memeriksa pasien lanjut usia di rumah"
                className="h-[280px] sm:h-[380px] md:h-[440px] w-full object-cover"
              />
              {/* Subtle bottom gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Rating float card — top right */}
            <div className="absolute -top-3 right-3 sm:right-6 flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-lg shadow-slate-900/10">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-50">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none text-slate-900">4.9 / 5.0</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">10+ pasien puas</p>
              </div>
            </div>

            {/* Availability badge — bottom left */}
            <div className="absolute -bottom-3 left-3 sm:left-6 flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-lg shadow-slate-900/10">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${isOpen ? "animate-pulse bg-emerald-500" : "bg-slate-400"}`}
                aria-hidden="true"
              />
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {isOpen ? (
                  <>
                    Tersedia hari ini ·{" "}
                    <span className="font-medium text-slate-600">07.00 – 21.00</span>
                  </>
                ) : (
                  <>
                    Saat ini tutup ·{" "}
                    <span className="font-medium text-slate-600">Buka jam 07.00</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

