import { ArrowRight } from "lucide-react";
import { services, waLink } from "../data/site.js";
import { Button } from "./ui/button.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { container, SectionHeading } from "./ui.jsx";

export default function Services() {
  return (
    <section id="layanan" className="scroll-mt-24 bg-white py-20">
      <div className={container}>
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Empat layanan, satu tujuan: Anda sehat di rumah"
          description="Pilih layanan yang Anda butuhkan. Klik tombol pesan untuk langsung terhubung ke WhatsApp kami."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={service.name}
              className="gap-0 overflow-hidden rounded-2xl border-sky-100 bg-sky-50/50 py-0 shadow-none transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/70"
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                className="h-40 w-full object-cover"
              />
              <CardContent className="flex flex-1 flex-col p-5">
                <span className="text-sm font-bold text-sky-400">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <p className="mt-5 text-2xl font-bold text-sky-700">
                  {service.price}
                  <span className="block text-xs font-normal text-slate-500">
                    per kunjungan
                  </span>
                </p>
                <Button
                  asChild
                  className="mt-5 w-full rounded-xl bg-sky-600 font-semibold text-sm text-white shadow-sm transition-all duration-200 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-500/20 active:scale-[0.98] group/btn"
                >
                  <a
                    href={waLink(
                      `Halo Home Care, saya ingin memesan layanan ${service.name} (${service.price}). Mohon info jadwal yang tersedia.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Pesan Layanan</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Harga sudah termasuk kunjungan perawat di area Yogyakarta. Tindakan
          tambahan akan diinformasikan sebelum dilakukan.
        </p>
      </div>
    </section>
  );
}
