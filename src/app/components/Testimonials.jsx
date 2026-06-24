"use client";

import Image from "next/image";
import { Star } from "lucide-react";
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
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-green-100/30 relative overflow-hidden">
      {/* Hide scrollbar styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#7CEB1D]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight">
            What Our <span className="text-[#7CEB1D]">Clients Say</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Real feedback from people who trusted us with their projects.
          </p>
        </div>

        {/* Scrollable container – scrollbar hidden */}
        <div className="overflow-x-auto pb-4 scroll-smooth no-scrollbar">
          <div className="flex gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => {
              const { ref, isInView } = useInView({ threshold: 0.3 });
              return (
                <div
                  key={testimonial.id}
                  ref={ref}
                  className={`flex-shrink-0 w-80 md:w-96 bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-[#7CEB1D]/50 transition-all duration-700 hover:-translate-y-2 transform-gpu ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: "opacity, transform, box-shadow, border-color",
                    transform: isInView ? "translateY(0) rotateX(0deg)" : "translateY(40px) rotateX(-15deg)",
                    transformOrigin: "center bottom",
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 text-[#7CEB1D] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#7CEB1D" stroke="none" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 mt-6">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-bold text-[#041423]">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}