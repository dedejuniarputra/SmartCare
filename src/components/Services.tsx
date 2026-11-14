import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Info } from "lucide-react";
import { PRICE_NOTE, services, waOrderLink } from "../data/site";
import Reveal from "./Reveal";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { container, SectionHeading } from "./ui";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasMoved = useRef(false);

  const isInteractingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const currentCardIndexRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TOTAL_DOTS = 4;

  const updateActiveIndex = () => {
    if (!scrollRef.current) return;
    const containerEl = scrollRef.current;
    const maxScroll = containerEl.scrollWidth - containerEl.clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    const progress = Math.max(0, Math.min(1, containerEl.scrollLeft / maxScroll));
    const closestIndex = Math.min(
      TOTAL_DOTS - 1,
      Math.round(progress * (TOTAL_DOTS - 1)),
    );
    setActiveIndex(closestIndex);

    // Sinkronkan currentCardIndex dengan posisi scroll manual
    if (progress >= 0.88) {
      currentCardIndexRef.current = services.length - 1;
    } else if (progress <= 0.12) {
      currentCardIndexRef.current = 0;
    } else {
      currentCardIndexRef.current = Math.round(progress * (services.length - 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const containerEl = scrollRef.current;
    const maxScroll = containerEl.scrollWidth - containerEl.clientWidth;
    if (maxScroll <= 0) return;

    const targetScroll = (index / (TOTAL_DOTS - 1)) * maxScroll;
    containerEl.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
    setActiveIndex(index);
    currentCardIndexRef.current = Math.round(
      (index / (TOTAL_DOTS - 1)) * (services.length - 1),
    );

    // Jeda auto-scroll sementara saat bullet point ditekan
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 4500);
  };

  // ── Autoplay seperti detik jam: HANYA berjalan pada mobile view (< 768px) ──
  useEffect(() => {
    const timer = setInterval(() => {
      // Hilangkan animasi berjalan di tampilan web (desktop/tablet >= 768px), cukup saat mobile view saja
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        return;
      }

      // Jeda jika sedang disentuh, di-hover mouse, di-drag, atau sedang berinteraksi
      if (
        isInteractingRef.current ||
        isHoveredRef.current ||
        isDraggingRef.current
      ) {
        return;
      }

      if (!scrollRef.current) return;
      const containerEl = scrollRef.current;
      const maxScroll = containerEl.scrollWidth - containerEl.clientWidth;
      if (maxScroll <= 0) return;

      const currentScroll = containerEl.scrollLeft;

      // Cek apakah sudah di kartu terakhir (atau sudah mentok di ujung kanan)
      const isAtEnd =
        currentCardIndexRef.current >= services.length - 1 ||
        currentScroll >= maxScroll - 20;

      if (isAtEnd) {
        // SUDAH DI KARTU TERAKHIR: Balik lagi animasinya meluncur ke kartu pertama!
        currentCardIndexRef.current = 0;
        containerEl.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setActiveIndex(0);
      } else {
        // Berpindah bertahap seperti detik jam ke kartu berikutnya
        const nextIndex = currentCardIndexRef.current + 1;
        currentCardIndexRef.current = nextIndex;

        const cardElements = containerEl.querySelectorAll<HTMLElement>(
          "[data-service-card]",
        );
        const nextCard = cardElements[nextIndex];

        let targetLeft = 0;
        if (nextIndex >= services.length - 1) {
          targetLeft = maxScroll;
        } else if (nextCard) {
          targetLeft = Math.min(nextCard.offsetLeft, maxScroll);
        } else {
          targetLeft = (nextIndex / (services.length - 1)) * maxScroll;
        }

        containerEl.scrollTo({
          left: targetLeft,
          behavior: "smooth",
        });
      }
    }, 3500); // 3.5 detik per langkah detik jam

    return () => clearInterval(timer);
  }, []);

  // Sinkronisasi posisi saat user scroll manual
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      updateActiveIndex();
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Hanya jeda hover jika pointer adalah mouse asli di laptop/PC (bukan touchscreen)
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      isHoveredRef.current = true;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      isHoveredRef.current = false;
      handleMouseUpOrLeave();
    }
  };

  const handleTouchStart = () => {
    isInteractingRef.current = true;
    hasMoved.current = false;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchMove = () => {
    hasMoved.current = true;
    updateActiveIndex();
  };

  const handleTouchEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 3000);
    updateActiveIndex();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    if (Math.abs(walk) > 4) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
    updateActiveIndex();
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  const handleCardClick = (name: string) => {
    if (hasMoved.current) return;
    setSelectedService((prev) => (prev === name ? null : name));

    // Jeda sementara 5 detik agar pengguna dapat membaca kartu yang dipilih
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 5000);
  };

  return (
    <section id="layanan" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className={container}>
        <Reveal direction="from-left">
          <SectionHeading
            eyebrow="Pilihan Layanan"
            title="Perawatan medis & pendampingan oleh perawat berlisensi di rumah Anda"
          />
        </Reveal>

        {/* Catatan Biaya Layanan (Style Soft Sky Blue, rounded-lg pas, sejajar 1 baris & responsive) */}
        <Reveal direction="from-left" delayMs={80}>
          <div className="mx-auto mt-4 sm:mt-5 flex w-fit max-w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-sky-200/90 bg-sky-50/85 px-3 sm:px-4 py-1.5 sm:py-2 text-center shadow-xs overflow-x-auto [scrollbar-width:none]">
            <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-600 shrink-0" aria-hidden="true" />
            <p className="text-[11px] sm:text-xs md:text-sm font-medium text-sky-950 whitespace-nowrap leading-none">
              {PRICE_NOTE}
            </p>
          </div>
        </Reveal>

        <Reveal direction="from-right" delayMs={140}>
          {/* Carousel Container (Bisa di-scroll manual & berjalan otomatis bertahap seperti detik jam pada mobile) */}
          <div className="relative mt-8 sm:mt-10">
          <div
            ref={scrollRef}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className="relative flex cursor-grab select-none gap-3.5 sm:gap-4.5 overflow-x-auto px-1 pb-4 pt-2 active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:none"
          >
            {services.map((service, idx) => {
              const isSelected = selectedService === service.name;
              return (
                <Card
                  key={service.name}
                  data-service-card={idx}
                  onClick={() => handleCardClick(service.name)}
                  className={`group relative flex w-[76vw] max-w-[280px] sm:w-[285px] lg:w-[295px] xl:w-[305px] shrink-0 flex-col overflow-hidden rounded-lg bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-2 border-sky-500 ring-4 ring-sky-100 shadow-md shadow-sky-100/60"
                      : "border border-slate-200/80 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50"
                  }`}
                >
                  {/* Badge Dipilih (saat card aktif dipilih oleh user) */}
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      <span>Dipilih</span>
                    </span>
                  )}

                  {/* Foto Layanan - Ukuran pas & proporsional */}
                  <div className="relative h-36 sm:h-38 lg:h-40 w-full overflow-hidden rounded-md bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      draggable="false"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    />
                  </div>

                  <CardContent className="flex flex-1 flex-col p-0 pt-3.5 sm:pt-4">
                    {/* Nama Layanan - Tinggi sejajar di semua card */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug transition-colors group-hover:text-sky-600 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] flex items-center">
                      {service.name}
                    </h3>

                    {/* Deskripsi Layanan - Tinggi sejajar di semua card (pas 2-3 baris) */}
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 min-h-[3rem] sm:min-h-[3.35rem] flex items-start">
                      {service.description}
                    </p>

                    {/* Tindakan yang Termasuk (Tags / Chips) - Konsisten sejajar 1 baris */}
                    {service.items && service.items.length > 0 && (
                      <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 overflow-x-auto flex-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:none py-0.5">
                        {service.items.map((item) => (
                          <span
                            key={item}
                            className="shrink-0 inline-flex items-center rounded-md border border-slate-200/90 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-800 whitespace-nowrap"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tombol Pesan Layanan - Menempel rapi dengan jarak pas & sejajar di bawah */}
                    <div className="mt-auto pt-3.5 sm:pt-4 border-t border-slate-100">
                      <Button
                        asChild
                        className="w-full rounded-md bg-sky-600 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-500/20 active:scale-[0.99] group/btn h-9 sm:h-10"
                      >
                        <a
                          href={waOrderLink(service.name, service.price)}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (hasMoved.current) {
                              e.preventDefault();
                            }
                          }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Pesan Layanan</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                            aria-hidden="true"
                          />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* ── Indikator Animasi Bullet Point (Jarak Rapat & Rapi) ── */}
      <Reveal direction="up" delayMs={180}>
        <div
          className="mt-4 flex items-center justify-center gap-1"
          role="tablist"
          aria-label="Indikator navigasi layanan"
        >
          {Array.from({ length: TOTAL_DOTS }).map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                onClick={() => scrollToIndex(index)}
                aria-selected={isActive}
                aria-label={`Lihat bagian layanan ${index + 1} dari ${TOTAL_DOTS}`}
                className="py-2 px-1 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? "w-6 bg-sky-600 shadow-sm shadow-sky-500/30"
                      : "w-2 bg-slate-300 hover:bg-sky-400"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </Reveal>
    </div>
  </section>
);
}
