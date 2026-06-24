"use client";

import { Award, Clock, Shield, Users, Leaf, ThumbsUp } from "lucide-react";
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

const features = [
  { icon: Award, title: "Award-Winning", description: "Recognised for excellence in design and construction." },
  { icon: Clock, title: "On-Time Delivery", description: "We respect your timeline and deliver as promised." },
  { icon: Shield, title: "Quality Assurance", description: "Every project is built to the highest standards." },
  { icon: Users, title: "Expert Team", description: "Skilled architects, engineers, and project managers." },
  { icon: Leaf, title: "Sustainable Building", description: "Eco-friendly materials and energy-efficient designs." },
  { icon: ThumbsUp, title: "100% Satisfaction", description: "We go the extra mile to ensure you're delighted." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-green-100/30 via-white to-white relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7CEB1D]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-[#7CEB1D]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Why Latitude</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight">
            Why Choose <span className="text-[#7CEB1D]">Us</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Built on trust, powered by innovation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const { ref, isInView } = useInView({ threshold: 0.15 });
            const number = String(index + 1).padStart(2, '0');

            return (
              <div
                key={index}
                ref={ref}
                className={`group relative transform-gpu transition-all duration-700 ${
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
                <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-white/50 transition-colors duration-300">
                  {/* Number badge */}
                  <span className="text-xs font-mono font-bold text-[#7CEB1D]/40 mb-2 tracking-widest">
                    {number}
                  </span>

                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7CEB1D]/20 to-[#7CEB1D]/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-[#7CEB1D] group-hover:to-[#5cdb1a] transition-all duration-300 shadow-sm group-hover:shadow-xl">
                    <Icon size={32} className="text-[#7CEB1D] group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-[#041423] mb-2 group-hover:text-[#7CEB1D] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}