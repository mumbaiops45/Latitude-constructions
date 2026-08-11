"use client";

import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#041423]">
      {/* ================= VIDEO BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/latitude-farmhouse-hero.mp4?v=20260811" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" />
      </div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 text-center text-white sm:px-6 lg:px-8">

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center">

          {/* BRAND */}
          <div className="animate-soft-pop">
            <h1 className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <span className="bg-gradient-to-r from-[#7CEB1D] via-[#b2f56d] to-[#5ec70a] bg-clip-text text-transparent">
                LATITUDE
              </span>
            </h1>
          </div>

          {/* HEADLINE */}
          <div className="animate-slide-up mt-5">
            <h2 className="px-2 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Crafting Your{" "}
              <span className="text-[#7CEB1D]">
                Dream Farm House
              </span>
            </h2>
          </div>

          {/* TAGLINE */}
          <div className="animate-fade-scale mt-3">
            <p className="text-lg font-light text-gray-200 sm:text-xl md:text-2xl lg:text-3xl">
              Where Country Living Meets Luxury
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="animate-blur-in mt-5 max-w-3xl px-2">
            <p className="text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg lg:text-xl">
              From sprawling estates to cozy retreats, we design and build
              premium farm houses that blend rustic charm with modern comfort.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="animate-fade-up mt-8 flex w-full flex-col items-center justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row">

            {/* Projects */}
            <Link
              href="/projects"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7CEB1D] px-7 py-4 font-bold text-[#041423] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#6cd816] hover:shadow-xl sm:w-auto"
            >
              Explore Our Farm Houses

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/50 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#7CEB1D] hover:bg-white/10 sm:w-auto"
            >
              <Play
                size={18}
                className="fill-[#7CEB1D] text-[#7CEB1D] transition-transform duration-300 group-hover:scale-110"
              />

              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white/70">
        <span className="mb-2 text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>

        <div className="flex h-10 w-5 justify-center rounded-full border-2 border-white/30">
          <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-[#7CEB1D]" />
        </div>
      </div>

      {/* ================= ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes softPop {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-soft-pop {
          animation: softPop 1.2s ease-out forwards;
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(35px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          opacity: 0;
          animation: slideUp 1s ease-out 0.3s forwards;
        }

        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-scale {
          opacity: 0;
          animation: fadeScale 1s ease-out 0.6s forwards;
        }

        @keyframes blurIn {
          0% {
            opacity: 0;
            transform: translateY(15px);
            filter: blur(5px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .animate-blur-in {
          opacity: 0;
          animation: blurIn 1s ease-out 0.9s forwards;
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 1s ease-out 1.2s forwards;
        }
      `}</style>
    </section>
  );
}