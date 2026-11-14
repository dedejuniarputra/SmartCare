import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WA_MESSAGE, waLink } from "../data/site";
import { WhatsAppIcon } from "./ui";

export default function FloatingWhatsApp() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muncul saat user sudah scroll ke bawah (melewati 450px)
      setShowScrollTop(window.scrollY > 450);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      className="fixed right-4 sm:right-6 z-50 flex flex-col items-center gap-2 sm:gap-2.5"
    >
      {/* Tombol WhatsApp Utama */}
      <a
        href={waLink(WA_MESSAGE)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat WhatsApp Home Care"
        title="Chat via WhatsApp"
        className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:scale-105 hover:bg-emerald-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>

      {/* Tombol Panah Kembali ke Atas (Transparan netral, berubah warna biru & animasi saat disentuh) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Kembali ke atas halaman"
        title="Kembali ke atas"
        className={`grid place-items-center rounded-full bg-white/10 backdrop-blur-xs border border-slate-400/40 text-slate-600 shadow-xs transition-all duration-200 outline outline-2 outline-transparent outline-offset-2 hover:border-sky-500 hover:text-sky-500 hover:bg-sky-500/15 hover:outline-sky-500 hover:scale-105 active:border-sky-500 active:text-sky-500 active:bg-sky-500/25 active:outline-sky-500 active:scale-95 focus-visible:border-sky-500 focus-visible:text-sky-500 focus-visible:outline-sky-500 cursor-pointer ${
          showScrollTop
            ? "h-10 w-10 sm:h-11 sm:w-11 opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "h-0 w-10 sm:w-11 opacity-0 scale-75 pointer-events-none -translate-y-2 overflow-hidden border-0 p-0 m-0"
        }`}
      >
        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" aria-hidden="true" />
      </button>
    </div>
  );
}

