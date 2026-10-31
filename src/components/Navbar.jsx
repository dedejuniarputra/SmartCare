import { useEffect, useRef, useState } from "react";
import { HeartHandshake, House, Menu, Phone, Star, X } from "lucide-react";
import { navLinks } from "../data/site.js";
import { container } from "./ui.jsx";

const navIcons = { House, HeartHandshake, Star, Phone };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-sky-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`${container} flex h-16 items-center justify-between gap-4`}
        aria-label="Navigasi utama"
      >
        <a
          href="#beranda"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-600 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-bold text-slate-900">Smart Home Care</span>
            <span className="block text-xs text-slate-500">Yogyakarta</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const Icon = navIcons[link.icon];
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-700"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="relative md:hidden" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            {menuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {menuOpen && (
            <div
              id="menu-mobile"
              className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl shadow-slate-200/70 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-150"
            >
              {navLinks.map((link) => {
                const Icon = navIcons[link.icon];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-sky-600"
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
