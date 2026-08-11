"use client";

import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
export default function Hero() {
  const [videoSrc, setVideoSrc] = useState('/hero1.mp4');
  useEffect(() => {  // ← ADD THIS ENTIRE BLOCK
    // Add timestamp to force browser to load fresh video
    const timestamp = new Date().getTime();
    setVideoSrc(`/hero1.mp4?t=${timestamp}`);
  }, []);
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Video Background – now with natural clarity */}
      <video
        key={videoSrc}  // ← ADD THIS LINE
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />  {/* ← CHANGE THIS LINE */}
        <source src="/hero1.webm" type="video/webm" />
      </video>

      {/* Darker overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content – Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center text-white">

        {/* Brand – LATITUDE with gradient sweep */}
        <div className="animate-soft-pop [animation-delay:0ms]">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-none">
            <span className="bg-clip-text text-transparent bg-[length:200%] bg-gradient-to-r from-[#7CEB1D] via-[#a8f05a] to-[#5ec70a] animate-gradient-shift">
              LATITUDE
            </span>
          </h1>
        </div>

        {/* Main Headline – focused on Farm House */}
        <div className="animate-slide-up-slow [animation-delay:400ms]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 leading-tight px-2">
            Crafting Your <span className="text-[#7CEB1D]">Dream Farm House</span>
          </h2>
        </div>

        {/* Tagline – farm house specialist */}
        <div className="animate-fade-scale-slow [animation-delay:800ms]">
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 mt-1">
            Where Country Living Meets Luxury
          </p>
        </div>

        {/* Description – farm house focused */}
        <div className="animate-blur-in-slow [animation-delay:1200ms] max-w-2xl">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mt-4 sm:mt-5 leading-relaxed px-2 sm:px-0">
            From sprawling estates to cozy retreats – we design and build
            premium farm houses that blend rustic charm with modern comfort.
          </p>
        </div>

        {/* Buttons – gentle rise */}
        <div className="animate-fade-up-slow [animation-delay:1600ms] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
          >
            Explore Our Farm Houses
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-[#7CEB1D] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 w-full sm:w-auto"
          >
            <Play size={18} className="fill-[#7CEB1D] text-[#7CEB1D] group-hover:scale-110 transition-transform" />
            Request a Quote
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

      {/* ===== Animations (unchanged) ===== */}
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