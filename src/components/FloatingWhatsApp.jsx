import { WA_MESSAGE, waLink } from "../data/site.js";
import { WhatsAppIcon } from "./ui.jsx";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink(WA_MESSAGE)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat WhatsApp Home Care"
      title="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
