import { CheckCircle, MapPin, Star } from "lucide-react";
import { WA_MESSAGE, waLink } from "../data/site.js";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { container, WhatsAppIcon } from "./ui.jsx";

const trustItems = [
  "Perawat berlisensi (STR)",
  "Harga transparan",
  "Jadwal fleksibel",
];

export default function Hero() {
  return (
    <section
      id="beranda"
      className="scroll-mt-24 bg-gradient-to-br from-sky-50 via-white to-white"
    >
      <div
        className={`${container} grid min-h-[calc(100svh-4rem)] items-center gap-10 pb-16 pt-28 md:grid-cols-2 md:gap-16 md:pb-20 md:pt-32 lg:gap-20`}
      >
        {/* ── Left: Copy ── */}
        <div className="flex flex-col justify-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-xs font-semibold text-sky-700">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Melayani area Yogyakarta
          </div>

          <h1 className="mt-6 text-[1.6rem] font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
            Perawatan kesehatan profesional,{" "}
            <span className="text-sky-600">langsung di rumah Anda.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
            Perawat berpengalaman kami hadir ke rumah Anda untuk menangani
            perawatan luka, kateter, injeksi, infus, dan pendampingan pasien —
            tanpa perlu ke klinik.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-sky-600 px-6 font-semibold shadow-sm hover:bg-sky-700 hover:shadow-md hover:shadow-sky-500/20"
            >
              <a
                href={waLink(
                  "Halo Home Care, saya ingin memesan layanan home care.",
                )}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pesan Sekarang
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-slate-200 bg-white px-6 font-semibold text-slate-700 hover:bg-slate-50"
            >
              <a href="#layanan">Lihat Layanan</a>
            </Button>
          </div>

          {/* Trust Checklist */}
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            {trustItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-1.5 text-xs leading-snug text-slate-600 sm:items-center sm:gap-2 sm:text-sm"
              >
                <CheckCircle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500 sm:mt-0 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: Image ── */}
        <div
          className="relative mx-auto w-full max-w-lg motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-700 [animation-delay:150ms] [animation-fill-mode:both]"
        >
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
              className="h-[360px] w-full object-cover sm:h-[440px]"
            />
            {/* Subtle bottom gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Rating float card — top right */}
          <div className="absolute -top-3 right-4 flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg shadow-slate-200/60 sm:right-6">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-50">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none text-slate-900">4.9 / 5.0</p>
              <p className="mt-0.5 text-[10px] text-slate-400">10+ pasien puas</p>
            </div>
          </div>

          {/* Availability badge — bottom left */}
          <div className="absolute -bottom-3 left-4 flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg shadow-slate-200/60 sm:left-6">
            <span
              className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold text-slate-700">
              Tersedia hari ini · <span className="font-normal text-slate-400">07.00 – 21.00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
