"use client";

import { useRef, useEffect, useState } from "react";

function useInView(options) {
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
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return { ref, isInView };
}

const steps = [
  { number: 1, title: "Consultation", description: "We sit down with you to understand your vision, budget, and site requirements." },
  { number: 2, title: "Design & Planning", description: "Our architects create detailed plans, 3D walkthroughs, and get all necessary approvals." },
  { number: 3, title: "Construction", description: "Our skilled team begins building with quality materials and regular site updates." },
  { number: 4, title: "Handover", description: "We walk you through your new space, ensuring everything is perfect and complete." },
];

export default function Process() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-green-100/30 relative overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#7CEB1D]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Our Process</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight">
            How We <span className="text-[#7CEB1D]">Work</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            A simple, transparent journey from idea to completion.
          </p>
        </div>

        {/* Steps Grid – simple horizontal layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => {
            const { ref, isInView } = useInView({ threshold: 0.15 });
            return (
              <div
                key={step.number}
                ref={ref}
                className={`group flex flex-col items-center text-center transform-gpu transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{
                  transitionDelay: `${index * 120}ms`,
                  transitionProperty: "opacity, transform",
                  transform: isInView
                    ? "translateY(0) rotateX(0deg) scale(1)"
                    : "translateY(40px) rotateX(-15deg) scale(0.9)",
                  transformOrigin: "center bottom",
                }}
              >
                {/* Circle with number */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7CEB1D] to-[#5cdb1a] flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    {step.number}
                  </div>
                  {/* Connecting line – only visible between steps on desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-[#7CEB1D]/30 -translate-y-1/2" style={{ width: 'calc(100% - 2.5rem)', left: 'calc(100% + 0.5rem)' }} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#041423] mt-4 mb-2 group-hover:text-[#7CEB1D] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}