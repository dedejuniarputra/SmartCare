import {
  ADDRESS,
  HOURS,
  MAPS_EMBED,
  WA_DISPLAY,
  WA_MESSAGE,
  waLink,
} from "../data/site";
import Reveal from "./Reveal";
import { container } from "./ui";

export default function Contact() {
  return (
    <section id="kontak" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className={`${container} grid gap-8 lg:grid-cols-2 lg:items-stretch`}>
        <div className="flex flex-col justify-center">
          <Reveal direction="from-left" delayMs={0}>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600">
              Hubungi Kami
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Kami siap datang ke rumah Anda
            </h2>
            <p className="mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-slate-700">
              Kirim pesan lewat WhatsApp untuk konsultasi jadwal dan tindakan. Kami melayani kunjungan ke rumah di seluruh area Yogyakarta dan sekitarnya.
            </p>
          </Reveal>

          <dl className="mt-6 sm:mt-8 space-y-3.5">
            <Reveal direction="from-left" delayMs={60}>
              <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                <dt className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Area Layanan
                </dt>
                <dd className="mt-1 text-sm sm:text-base font-medium text-slate-800">{ADDRESS}</dd>
              </div>
            </Reveal>

            <Reveal direction="from-left" delayMs={120}>
              <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                <dt className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Nomor WhatsApp
                </dt>
                <dd className="mt-1">
                  <a
                    href={waLink(WA_MESSAGE)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base sm:text-lg font-bold text-sky-700 hover:text-sky-800 underline-offset-4 hover:underline inline-flex items-center gap-1.5"
                  >
                    {WA_DISPLAY}
                  </a>
                </dd>
              </div>
            </Reveal>

            <Reveal direction="from-left" delayMs={180}>
              <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                <dt className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Jam Layanan
                </dt>
                <dd className="mt-1 text-sm sm:text-base font-medium text-slate-800">{HOURS}</dd>
              </div>
            </Reveal>
          </dl>
        </div>

        <Reveal direction="fade" delayMs={80} className="h-full">
          <div className="relative h-[280px] sm:h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm lg:h-full">
            <iframe
              title="Lokasi Home Care di Yogyakarta"
              src={MAPS_EMBED}
              className="h-full w-full border-0 lg:absolute lg:inset-0 [filter:contrast(95%)_saturate(85%)] transition-opacity duration-300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

