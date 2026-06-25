"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);
  const [showContact, setShowContact] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show scroll‑to‑top after scrolling past hero (e.g., 400px)
      setShowScroll(scrollY > 400);

      // Show WhatsApp & Call only when in hero area (top 500px)
      // AND not near the bottom (footer)
      const isNearBottom = windowHeight + scrollY >= documentHeight - 300;
      const isInHero = scrollY < 500;

      setShowContact(isInHero && !isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5">
      {/* WhatsApp Button – shown only in hero area */}
      {showContact && (
        <a
          href="https://wa.me/918951639116" // ← replace with your number
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7 text-white" />
        </a>
      )}

      {/* Phone Call Button – shown only in hero area */}
      {showContact && (
        <a
          href="tel:+918951639116" // ← replace with your number
          className="w-14 h-14 rounded-full bg-[#1a8cff] hover:bg-[#0077ed] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      )}

      {/* Scroll to Top Button – appears after scrolling past hero */}
      <button
        onClick={scrollToTop}
        className={`w-14 h-14 rounded-full bg-[#7CEB1D] hover:bg-[#6cd816] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          showScroll
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 text-[#041423]" />
      </button>
    </div>
  );
}