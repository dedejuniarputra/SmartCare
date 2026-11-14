import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePageReady } from "../context/PageReadyContext";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "from-left" | "from-right" | "fade" | "zoom";
  durationMs?: number;
}

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  durationMs = 380,
}: RevealProps) {
  const isPageReady = usePageReady();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isPageReady) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // Observer responsif dengan margin positif 80px agar animasi sudah mulai meluncur
    // sebelum elemen masuk ke pandangan mata (0 lag, sangat enteng dan bebas flicker di HP)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 80px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPageReady]);

  // Listener ketika user mengklik menu di Navbar untuk memutar animasi section target
  useEffect(() => {
    const handleNavActivate = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      const targetId = customEvent.detail?.id;
      if (!targetId || !ref.current) return;

      const section = ref.current.closest("section");
      if (section && section.id === targetId) {
        setIsVisible(false);
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 40);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("nav-section-activate", handleNavActivate);
    return () => window.removeEventListener("nav-section-activate", handleNavActivate);
  }, []);

  // Jarak pergeseran mikro yang aman (12px - 14px), bebas overflow horizontal di layar HP
  const getTransformStyle = () => {
    if (isVisible) {
      return "none";
    }
    switch (direction) {
      case "up":
        return "translate3d(0, 14px, 0)";
      case "down":
        return "translate3d(0, -14px, 0)";
      case "left":
      case "from-left":
        return "translate3d(-14px, 0, 0)";
      case "right":
      case "from-right":
        return "translate3d(14px, 0, 0)";
      case "zoom":
        return "scale(0.97)";
      case "fade":
      default:
        return "translate3d(0, 8px, 0)";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transform: getTransformStyle(),
        opacity: isVisible ? 1 : 0,
        transitionProperty: "transform, opacity",
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
