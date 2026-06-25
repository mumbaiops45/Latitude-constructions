"use client";

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
  const sectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes float-soft {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float-orb {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -40px) scale(1.1); }
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-float-soft {
            animation: float-soft 4s ease-in-out infinite;
          }
          .animate-float-orb {
            animation: float-orb 8s ease-in-out infinite;
          }
          .animate-gradient-bg {
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ee 100%);
            background-size: 200% 200%;
            animation: gradient-shift 12s ease infinite;
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="py-24 md:py-14 relative overflow-hidden animate-gradient-bg"
      >
        {/* Decorative floating orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-orb"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Heading – with staggered entrance + floating */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3 transition-all duration-700 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Our Process
            </span>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight transition-all duration-700 animate-float-soft ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              How We <span className="text-[#7CEB1D]">Work</span>
            </h2>
            <p
              className={`text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto transition-all duration-700 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              A simple, transparent journey from idea to completion.
            </p>
          </div>

          {/* Steps Grid – premium card design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 relative">
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
                  {/* Card background – optional, adds depth */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 w-full h-full border border-white/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Step circle with number */}
                    <div className="relative flex justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7CEB1D] to-[#5cdb1a] flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative z-10">
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
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}