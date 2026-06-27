"use client";

import Image from "next/image";
import { Star } from "lucide-react";
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

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Homeowner, Bangalore",
    quote: "Latitude Constructions turned our dream home into reality. Their attention to detail and use of sustainable materials exceeded our expectations.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=7CEB1D&color=041423&size=64",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Interior Designer, Mysore",
    quote: "I've collaborated with many builders, but Latitude's 3D visualisations and execution are top‑notch. A truly professional team.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=7CEB1D&color=041423&size=64",
  },
  {
    id: 3,
    name: "Amit Reddy",
    role: "Developer, Hyderabad",
    quote: "They delivered our commercial project on time and within budget. The quality is outstanding and we've already hired them for our next venture.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Amit+Reddy&background=7CEB1D&color=041423&size=64",
  },
  {
    id: 4,
    name: "Sneha Nair",
    role: "Homeowner, Pune",
    quote: "From planning to handover, Latitude made the entire process seamless. Their team is responsive and genuinely cares about the client's vision.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sneha+Nair&background=7CEB1D&color=041423&size=64",
  },
];

export default function Testimonials() {
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
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-24 relative overflow-hidden animate-gradient-bg"
      >
        {/* Decorative orbs */}
        <div className="absolute -top-40 -right-40 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />
        <div
          className="absolute -bottom-40 -left-40 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-orb"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 transition-all duration-700 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Testimonials
            </span>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#041423] leading-tight transition-all duration-700 animate-float-soft ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              What Our <span className="text-[#7CEB1D]">Clients Say</span>
            </h2>
            <p
              className={`text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto transition-all duration-700 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              Real feedback from people who trusted us with their projects.
            </p>
          </div>

          {/* ----- Mobile: vertical stack (visible on xs) ----- */}
          <div className="flex flex-col gap-6 sm:hidden">
            {testimonials.map((testimonial, index) => {
              const { ref, isInView } = useInView({ threshold: 0.3 });
              return (
                <div
                  key={testimonial.id}
                  ref={ref}
                  className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-700 ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex gap-1 text-[#7CEB1D] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#7CEB1D" stroke="none" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-5">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-[#041423] text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ----- Tablet & Desktop: horizontal scroll (hidden on mobile) ----- */}
          <div className="hidden sm:block overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x snap-mandatory">
            <div className="flex gap-4 sm:gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => {
                const { ref, isInView } = useInView({ threshold: 0.3 });
                return (
                  <div
                    key={testimonial.id}
                    ref={ref}
                    className={`flex-shrink-0 w-80 md:w-96 lg:w-[22rem] snap-start bg-white rounded-2xl sm:rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-[#7CEB1D]/50 transition-all duration-700 hover:md:-translate-y-2 transform-gpu ${
                      isInView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      transitionProperty:
                        "opacity, transform, box-shadow, border-color",
                      transform: isInView
                        ? "translateY(0) rotateX(0deg)"
                        : "translateY(40px) rotateX(-15deg)",
                      transformOrigin: "center bottom",
                    }}
                  >
                    <div className="flex gap-1 text-[#7CEB1D] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill="#7CEB1D"
                          
                          stroke="none"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-[#041423]">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}