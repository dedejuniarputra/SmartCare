import { container } from "./ui.jsx";

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-sky-950 py-8 text-sky-100">
      <div
        className={`${container} flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left`}
      >
        <p className="text-xs text-sky-300">
          © {new Date().getFullYear()} Home Care Yogyakarta. Hak cipta
          dilindungi.
        </p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-sky-200">Sosial Media</span>
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/homecareyogyakarta"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Home Care Yogyakarta"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-sky-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href="https://tiktok.com/@homecareyogyakarta"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok Home Care Yogyakarta"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-sky-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <TikTokIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
