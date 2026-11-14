import { useEffect, useRef, useState } from "react";
import { ArrowDown, ClipboardList, Home, MessageSquare, type LucideIcon } from "lucide-react";
import { orderSteps } from "../data/site";
import Reveal from "./Reveal";
import { container, SectionHeading } from "./ui";

const iconMap: Record<string, LucideIcon> = {
  ClipboardList,
  MessageSquare,
  Home,
};

export default function OrderFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const isPausedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animasi hidup bertahap secara smooth & perlahan mengalir dari alur 1 ke 3
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveStep((prev) => (prev + 1) % orderSteps.length);
    }, 2800); // 2.8 detik per alur, transisi 700ms - 1000ms

    return () => clearInterval(timer);
  }, []);

  const handleStepSelect = (index: number) => {
    setActiveStep(index);
    isPausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 4500);
  };

  return (
    <section id="alur" className="scroll-mt-24 bg-slate-50/70 py-16 sm:py-24">
      <div className={container}>
        <Reveal direction="from-left">
          <SectionHeading
            eyebrow="Alur Pemesanan"
            title="3 Langkah mudah pesan perawatan di rumah"
            className="max-w-4xl"
            titleClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            description="Pesan jasa layanan profesional untuk keluarga tercinta langsung dari rumah tanpa ke klinik dan ribet."
          />
        </Reveal>

        <div className="relative mt-16 sm:mt-20">
          {/* ── TALI PENGHUBUNG HORIZONTAL (DESKTOP) ── */}
          <div
            className="pointer-events-none absolute top-7 left-[16.666%] right-[16.666%] hidden h-0.5 md:block"
            aria-hidden="true"
          >
            {/* Tali dasar putus-putus */}
            <div className="absolute inset-0 border-t-2 border-dashed border-sky-300/80" />

            {/* Jalur aktif mengalir paralel bertahap dari alur 1 ke 3 */}
            <div
              className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 shadow-sm shadow-sky-400 transition-all duration-1000 ease-in-out"
              style={{
                width: activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%",
              }}
            />

            {/* Cahaya/animasi berjalan di sepanjang tali dari langkah 1 ke 3 */}
            <div className="traveling-beam-h -top-1.5 h-3.5 w-14 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-[1px]" />
            <div className="traveling-beam-h -top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-500 shadow-md shadow-sky-400 ring-2 ring-white" />
          </div>

          {/* ── KARTU-KARTU ALUR DENGAN NODE PENGHUBUNG ── */}
          <div className="grid gap-0 md:grid-cols-3 md:gap-8">
            {orderSteps.map((item, index) => {
              const Icon = iconMap[item.icon] || ClipboardList;
              const isActive = activeStep === index;
              const cardDir = "up";
              const cardDelay = index === 0 ? 0 : index === 1 ? 70 : 140;

              return (
                <div key={item.title} className="flex flex-col items-center w-full">
                  <Reveal direction={cardDir} delayMs={cardDelay} className="w-full flex-1 flex flex-col items-center">
                    <div
                      onClick={() => handleStepSelect(index)}
                      onPointerEnter={() => {
                        isPausedRef.current = true;
                        setActiveStep(index);
                      }}
                      onPointerLeave={() => {
                        isPausedRef.current = false;
                      }}
                      className={`group relative flex w-full max-w-[390px] md:max-w-none flex-1 flex-col items-center rounded-2xl px-5 sm:px-6 pt-0 pb-6 sm:pb-7 text-center shadow-xs transition-all duration-400 ease-out cursor-pointer ${
                        isActive
                          ? "-translate-y-1.5 md:-translate-y-2 border-2 border-sky-400 bg-white shadow-xl shadow-sky-100/90 ring-4 ring-sky-100/60"
                          : "border border-slate-200/80 bg-white hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50"
                      }`}
                    >
                      {/* Node Ikon yang menempel persis di atas tali */}
                      <div className="relative z-10 -mt-7">
                        <div
                          className={`grid h-13 w-13 sm:h-14 sm:w-14 place-items-center rounded-2xl border-2 transition-all duration-400 ease-out ${
                            isActive
                              ? "border-sky-500 bg-sky-600 text-white shadow-lg shadow-sky-500/25 scale-105"
                              : "border-sky-500 bg-white text-sky-600 shadow-md shadow-sky-100/80 group-hover:bg-sky-600 group-hover:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300" aria-hidden="true" />
                        </div>
                        <span
                          className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 sm:px-3 py-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-400 ease-out shadow-xs ${
                            isActive
                              ? "border border-sky-500 bg-sky-600 text-white shadow-sm shadow-sky-500/25 scale-105"
                              : "border border-sky-200 bg-sky-50 text-sky-800"
                          }`}
                        >
                          Langkah {item.step}
                        </span>
                      </div>

                      <div className="mt-7 sm:mt-8 flex flex-1 flex-col px-1 sm:px-2">
                        <h3
                          className={`text-base sm:text-lg font-bold transition-colors duration-400 ease-out ${
                            isActive ? "text-sky-600" : "text-slate-900 group-hover:text-sky-600"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700 max-w-xs sm:max-w-sm mx-auto">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  {/* ── TALI PENGHUBUNG VERTIKAL (MOBILE ONLY: RAPI, SIMETRIS & TIDAK MENUMPUK) ── */}
                  {index < orderSteps.length - 1 && (
                    <div
                      className="relative flex flex-col items-center justify-center pt-3 pb-10 md:hidden"
                      aria-hidden="true"
                    >
                      {/* Garis vertikal gradien halus */}
                      <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500" />
                      {/* Badge panah bawah presisi dengan jarak aman di atas node langkah berikutnya */}
                      <div className="grid h-6 w-6 -mt-0.5 place-items-center rounded-full border border-sky-300 bg-white text-sky-600 shadow-xs">
                        <ArrowDown className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
    </div>
  </section>
);
}

