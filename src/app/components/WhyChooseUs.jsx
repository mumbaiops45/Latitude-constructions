"use client";

import { Award, Clock, Shield, Users, Leaf, ThumbsUp } from "lucide-react";
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

const features = [
  { icon: Award, title: "Award-Winning", description: "Recognised for excellence in design and construction." },
  { icon: Clock, title: "On-Time Delivery", description: "We respect your timeline and deliver as promised." },
  { icon: Shield, title: "Quality Assurance", description: "Every project is built to the highest standards." },
  { icon: Users, title: "Expert Team", description: "Skilled architects, engineers, and project managers." },
  { icon: Leaf, title: "Sustainable Building", description: "Eco-friendly materials and energy-efficient designs." },
  { icon: ThumbsUp, title: "100% Satisfaction", description: "We go the extra mile to ensure you're delighted." },
];

export default function WhyChooseUs() {
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
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);
            background-size: 200% 200%;
            animation: gradient-shift 12s ease infinite;
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="py-24 md:py-14 relative overflow-hidden animate-gradient-bg"
      >
        {/* Floating decorative orbs */}
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
              Why Latitude
            </span>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight transition-all duration-700 animate-float-soft ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Why Choose <span className="text-[#7CEB1D]">Us</span>
            </h2>
            <p
              className={`text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto transition-all duration-700 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              Built on trust, powered by innovation.
            </p>
          </div>

          {/* Feature Grid – redesigned cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const { ref, isInView } = useInView({ threshold: 0.15 });

              return (
                <div
                  key={index}
                  ref={ref}
                  className={`group transition-all duration-700 ${
                    isInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95"
                  }`}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                    transitionProperty: "opacity, transform",
                  }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 h-full flex items-start gap-5">
                    {/* Icon Circle – solid green, larger */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#7CEB1D] flex items-center justify-center transition-all duration-300 group-hover:bg-[#041423] shadow-md group-hover:shadow-lg">
                      <Icon size={28} className="text-white transition-colors duration-300" />
                    </div>
                    {/* Text content – left aligned */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-[#041423] mb-1 group-hover:text-[#7CEB1D] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
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