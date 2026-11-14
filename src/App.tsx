import { Analytics } from "@vercel/analytics/react";
import { Navigate, Route, Routes } from "react-router-dom";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { PageReadyProvider } from "./context/PageReadyContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <PageReadyProvider isReady={true}>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sky-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten
      </a>

      <div className="min-h-screen bg-white">
        <Navbar />
        <main id="konten">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </div>
    </PageReadyProvider>
  );
}

