import {
  ADDRESS,
  HOURS,
  MAPS_EMBED,
  WA_DISPLAY,
  WA_MESSAGE,
  waLink,
} from "../data/site.js";
import { Button } from "./ui/button.jsx";
import { container, WhatsAppIcon } from "./ui.jsx";

export default function Contact() {
  return (
    <section id="kontak" className="scroll-mt-24 bg-white py-20">
      <div className={`${container} grid items-start gap-10 lg:grid-cols-2`}>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
            Hubungi Kami
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Kami siap datang ke rumah Anda
          </h2>
          <p className="mt-4 max-w-lg text-slate-600">
            Kirim pesan lewat WhatsApp untuk konsultasi jadwal. Hanya melayani
            area Yogyakarta.
          </p>

          <dl className="mt-8 space-y-4">
            <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                Alamat
              </dt>
              <dd className="mt-1 text-sm text-slate-700">{ADDRESS}</dd>
            </div>
            <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                WhatsApp
              </dt>
              <dd className="mt-1 text-sm">
                <a
                  href={waLink(WA_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-700 underline-offset-4 hover:underline"
                >
                  {WA_DISPLAY}
                </a>
              </dd>
            </div>
            <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                Jam layanan
              </dt>
              <dd className="mt-1 text-sm text-slate-700">{HOURS}</dd>
            </div>
          </dl>
        </div>

        <div className="overflow-hidden rounded-2xl border border-sky-100 shadow-sm">
          <iframe
            title="Lokasi Home Care di Yogyakarta"
            src={MAPS_EMBED}
            className="h-80 w-full lg:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
