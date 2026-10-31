import { Star } from "lucide-react";
import { testimonials } from "../data/site.js";
import { Card } from "./ui/card.jsx";
import { container, SectionHeading } from "./ui.jsx";

function TestimonialCard({ testimonial }) {
  const rating = typeof testimonial.rating === "number" ? testimonial.rating : 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <Card className="w-[20rem] shrink-0 gap-0 rounded-2xl border-sky-100 bg-white p-6 shadow-none transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/70 sm:w-[22rem]">
      <div
        className="flex gap-0.5 text-amber-400"
        aria-label={`Rating ${rating} dari 5`}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < fullStars) {
            return (
              <Star
                key={index}
                className="size-4 fill-current"
                aria-hidden="true"
              />
            );
          }
          if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                viewBox="0 0 24 24"
                className="size-4"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={`half-${testimonial.name}-${index}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill={`url(#half-${testimonial.name}-${index})`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            );
          }
          return (
            <Star
              key={index}
              className="size-4 text-slate-300"
              aria-hidden="true"
            />
          );
        })}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">
        “{testimonial.quote}”
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-sky-100 font-semibold text-sky-700">
          {testimonial.name.split(" ").at(-1).charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-slate-900">
            {testimonial.name}
          </span>
          <span className="block text-xs text-slate-500">
            {testimonial.area}
          </span>
        </span>
      </div>
    </Card>
  );
}

export default function Satisfaction() {
  return (
    <section
      id="kepuasan"
      className="scroll-mt-24 overflow-hidden bg-sky-50 py-20"
    >
      <div className={container}>
        <SectionHeading
          eyebrow="Kepuasan Pelanggan"
          title="Apa kata mereka"
          description="Pesan dari pasien dan keluarga yang pernah dirawat di rumah."
        />
      </div>

      <div className="marquee relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 gap-6 pr-6"
              aria-hidden={group === 1}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
