"use client";

import {
  Building2,
  PenTool,
  Ruler,
  Palette,
  Hammer,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

// Custom hook to detect when an element enters the viewport
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

const services = [
  {
    icon: Building2,
    title: "Architecture",
    description:
      "Innovative & sustainable design solutions tailored to your lifestyle.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    icon: PenTool,
    title: "3D Animation",
    description:
      "Immersive visualisation to experience your home before construction.",
    image:
      "https://images.unsplash.com/photo-1581092335871-5c5f8c1c7c0a?w=600&h=400&fit=crop",
  },
  {
    icon: Ruler,
    title: "House Planning",
    description:
      "Meticulous floor planning that optimises every square foot.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
  },
  {
    icon: Palette,
    title: "Interior Design",
    description:
      "Elegant, functional interiors that reflect your personality.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop",
  },
  {
    icon: Hammer,
    title: "Renovation",
    description:
      "Transform existing spaces with care and modern aesthetics.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
  },
  {
    icon: Wrench,
    title: "Construction",
    description:
      "Quality construction from foundation to finish, with precision.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
  },
];

export default function ServicesSection() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-green-100/30 via-white to-white relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#7CEB1D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Heading – with stagger animations */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span
            className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3 transition-all duration-700 ${
              sectionInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            What We Offer
          </span>
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight transition-all duration-700 ${
              sectionInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Our Premium
            <span className="block text-[#7CEB1D]">Services</span>
          </h2>
          <p
            className={`text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto transition-all duration-700 ${
              sectionInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            Comprehensive solutions from concept to completion, tailored to your
            vision.
          </p>
        </div>

        {/* Services Grid – with 3D image effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const { ref, isInView } = useInView({ threshold: 0.1 });

            return (
              <div
                key={index}
                ref={ref}
                className={`group bg-white rounded-3xl border border-gray-100 hover:border-[#7CEB1D]/50 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden transform-gpu ${
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
                {/* 3D Image Container */}
                <div
                  className="relative h-48 w-full overflow-hidden"
                  style={{ perspective: "800px" }}
                >
                  <div
                    className="relative w-full h-full transition-all duration-700 ease-out"
                    style={{
                      transformStyle: "preserve-3d",
                      transform:
                        "rotateX(0deg) rotateY(0deg) scale(1)",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-all duration-700 ease-out"
                      style={{
                        transform: "scale(1.05)",
                        transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  </div>

                  {/* 3D Overlay with hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-[#7CEB1D]/10 group-hover:bg-[#7CEB1D] flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-[#7CEB1D] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#041423] mb-2 group-hover:text-[#7CEB1D] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-[#7CEB1D] font-medium text-sm mt-4 hover:gap-3 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Add custom styles for the 3D effect */}
      <style jsx>{`
        .group:hover .relative > .relative {
          transform: rotateX(8deg) rotateY(8deg) scale(1.05);
        }
        .group:hover .relative .object-cover {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}