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
  durationMs = 450,
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

    // Observer responsif dengan rootMargin positif agar animasi sudah siap saat mendekati viewport
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
        threshold: 0.02,
        rootMargin: "0px 0px 60px 0px",
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
        }, 50);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("nav-section-activate", handleNavActivate);
    return () => window.removeEventListener("nav-section-activate", handleNavActivate);
  }, []);

  // Transform inline halus, ringan & natural (jarak pergeseran pas, tidak berat / lambat)
  const getTransformStyle = () => {
    if (isVisible) {
      return "translate3d(0, 0, 0) scale(1)";
    }
    switch (direction) {
      case "up":
        return "translate3d(0, 20px, 0) scale(1)";
      case "down":
        return "translate3d(0, -20px, 0) scale(1)";
      case "left":
      case "from-left":
        return "translate3d(-24px, 0, 0) scale(1)";
      case "right":
      case "from-right":
        return "translate3d(24px, 0, 0) scale(1)";
      case "zoom":
        return "translate3d(0, 0, 0) scale(0.96)";
      case "fade":
      default:
        return "translate3d(0, 12px, 0) scale(0.99)";
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
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: isVisible ? "auto" : "transform, opacity",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
