"use client";

import Image from "next/image";
import {
  Building2,
  Users,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

// Custom hook for counting animation
function useCountUp(target, isInView, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasCounted = useRef(false);

  useEffect(() => {
    if (!isInView || hasCounted.current) return;

    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(numeric)) return;

    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numeric);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(numeric);
        hasCounted.current = true;
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

const stats = [
  { icon: Clock, value: "24+", label: "Years Experience" },
  { icon: Building2, value: "500+", label: "Projects" },
  { icon: Users, value: "98%", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Awards" },
];

// Updated features list – farm house focused
const features = [
  "Custom Farm House Design",
  "Eco‑Friendly Construction",
  "Turnkey Farm House Solutions",
];

// Stat card component
function StatCard({ stat, isInView, delay }) {
  const Icon = stat.icon;
  const counted = useCountUp(stat.value, isInView, 2000);
  let displayValue = counted;
  if (stat.value.includes('+')) displayValue += '+';
  if (stat.value.includes('%')) displayValue += '%';

  return (
    <div
      className={`relative rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-10 shadow-xl hover-lift transition-all duration-500 ${isInView
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#7CEB1D]/10 flex items-center justify-center mb-6 border border-[#7CEB1D]/20 animate-badge-pulse">
        <Icon className="text-[#7CEB1D]" size={30} />
      </div>
      <h3 className="text-5xl font-bold text-white animate-pulse-number">
        {displayValue}
      </h3>
      <p className="text-white/60 mt-3">{stat.label}</p>
    </div>
  );
}

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <>
      <style jsx>{`
        /* ---------- Continuous animations ---------- */
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-soft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-number {
          0%, 100% { transform: scale(1); text-shadow: 0 0 0 transparent; }
          50% { transform: scale(1.02); text-shadow: 0 0 20px rgba(124,235,29,0.3); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,235,29,0); }
          50% { box-shadow: 0 0 20px 5px rgba(124,235,29,0.2); }
        }
        @keyframes float-bg {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-gradient-text {
          background: linear-gradient(135deg, #7CEB1D 0%, #a8ff6b 50%, #7CEB1D 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-text 4s ease infinite;
        }
        .animate-float-soft {
          animation: float-soft 3s ease-in-out infinite;
        }
        .animate-pulse-number {
          animation: pulse-number 2s ease-in-out infinite;
        }
        .animate-badge-pulse {
          animation: badge-pulse 2.5s ease-in-out infinite;
        }
        .animate-float-bg {
          animation: float-bg 12s ease-in-out infinite;
        }
        /* Hover effects */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .hover-glow {
          transition: all 0.3s ease;
        }
        .hover-glow:hover {
          border-color: rgba(124,235,29,0.6);
          box-shadow: 0 0 30px rgba(124,235,29,0.15);
        }
        .image-shine {
          position: relative;
          overflow: hidden;
        }
        .image-shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .image-shine:hover::after {
          opacity: 1;
        }
        .bg-grid-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>

      <section
        ref={ref}
        className={`relative py-24 overflow-hidden transition-all duration-1000 ${isInView ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a2e] via-[#142b40] to-[#1a2f44] animate-float-bg" />
        <div className="absolute inset-0 bg-grid-dots pointer-events-none" />

        {/* Glowing orbs with float */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-soft" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-soft" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT IMAGE */}
            <div className="relative">
              <div className="relative rounded-[30px] overflow-hidden shadow-2xl h-[620px] border-2 border-[#7CEB1D]/20 image-shine hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/about1.jpg"
                  alt="Latitude Farm House Construction"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-6 left-6 bg-[#7CEB1D] text-[#041423] font-bold px-5 py-2 rounded-full text-sm shadow-lg animate-badge-pulse">
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} /> Established 2014
                  </span>
                </div>
              </div>

              {/* Floating Experience Card – updated text */}
              <div
                className={`absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-64 border border-[#7CEB1D]/30 transition-all duration-1000 animate-float-soft ${isInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                  }`}
                style={{ transitionDelay: "600ms" }}
              >
                <h3 className="text-5xl font-bold text-[#7CEB1D]">24+</h3>
                <p className="text-white/80 mt-2">Years of Farm House Excellence</p>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <span
                className={`inline-flex items-center rounded-full bg-[#7CEB1D]/20 text-[#7CEB1D] px-5 py-2 text-sm font-semibold tracking-wider transition-all duration-700 animate-badge-pulse ${isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: "100ms" }}
              >
                ABOUT LATITUDE
              </span>

              <h2
                className={`mt-6 text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 ${isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "200ms" }}
              >
                <span className="text-white">Crafting Farm Houses</span>
                <br />
                <span className="animate-gradient-text">That Inspire</span>
              </h2>

              <p
                className={`mt-8 text-lg leading-8 text-white/70 transition-all duration-700 animate-float-soft ${isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "350ms", animationDelay: "0.5s" }}
              >
                At Latitude, we specialise in designing and building premium farm houses
                that blend rustic charm with modern luxury. From sprawling estates to
                cozy retreats, our expert team delivers sustainable, turnkey solutions
                tailored to your countryside vision.
              </p>

              {/* FEATURES – updated for farm house */}
              <div className="flex flex-wrap gap-4 mt-10">
                {features.map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover-glow transition-all duration-700 ${isInView
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                      }`}
                    style={{ transitionDelay: `${450 + index * 120}ms` }}
                  >
                    <CheckCircle2 className="text-[#7CEB1D] w-5 h-5" />
                    <span className="font-semibold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-8 mt-28">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                isInView={isInView}
                delay={600 + index * 120}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}