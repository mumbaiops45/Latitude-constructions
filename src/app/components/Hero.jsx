"use client";

import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/construction.mp4" type="video/mp4" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#041423] to-[#1a3a2a]" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#041423]/80 via-[#041423]/40 to-transparent" />

      {/* Content – Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">

        {/* Brand – LATITUDE with slow fade and gradient sweep */}
        <div className="animate-soft-pop [animation-delay:0ms]">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none">
            <span className="bg-clip-text text-transparent bg-[length:200%] bg-gradient-to-r from-[#7CEB1D] via-[#a8f05a] to-[#5ec70a] animate-gradient-shift">
              LATITUDE
            </span>
          </h1>
        </div>

        {/* Sub-headline – slow slide up */}
        <div className="animate-slide-up-slow [animation-delay:400ms]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 leading-tight">
            Build Your <span className="text-[#7CEB1D]">Dream Home</span>
          </h2>
        </div>

        {/* Tagline – slow fade with scale */}
        <div className="animate-fade-scale-slow [animation-delay:800ms]">
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mt-1">
            With Latitude
          </p>
        </div>

        {/* Description – slow blur reveal */}
        <div className="animate-blur-in-slow [animation-delay:1200ms] max-w-2xl">
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 leading-relaxed">
            Constructing dreams with precision. Experience housing solutions tailored to your life.
          </p>
        </div>

        {/* Buttons – gentle rise */}
        <div className="animate-fade-up-slow [animation-delay:1600ms] flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Explore Our Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border-2 border-white/40 hover:border-[#7CEB1D] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
          >
            <Play size={18} className="fill-[#7CEB1D] text-[#7CEB1D] group-hover:scale-110 transition-transform" />
            Get a Quote
          </Link>
        </div>
      </div>

      {/* Scroll Indicator – gentle pulse */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/60 animate-fade-up-slow [animation-delay:1800ms]">
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-5 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#7CEB1D] rounded-full animate-bounce mt-2" />
        </div>
      </div>

      {/* ===== Animations ===== */}
      <style>{`
        @keyframes softPop {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-soft-pop {
          opacity: 0;
          animation: softPop 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          animation: gradientShift 3s ease-in-out forwards;
        }

        @keyframes slideUpSlow {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-slow {
          opacity: 0;
          animation: slideUpSlow 1.2s ease-out forwards;
        }

        @keyframes fadeScaleSlow {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale-slow {
          opacity: 0;
          animation: fadeScaleSlow 1.2s ease-out forwards;
        }

        @keyframes blurInSlow {
          0% { opacity: 0; transform: translateY(16px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-blur-in-slow {
          opacity: 0;
          animation: blurInSlow 1.2s ease-out forwards;
        }

        @keyframes fadeUpSlow {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up-slow {
          opacity: 0;
          animation: fadeUpSlow 1.0s ease-out forwards;
        }
      `}</style>
    </section>
  );
}