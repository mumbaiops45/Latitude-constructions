"use client";

import Image from "next/image";
import {
  Building2,
  Users,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Hook to detect when element is in view
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
      { threshold: 0.15, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

const stats = [
  { icon: Clock, value: "24+", label: "Years Experience" },
  { icon: Building2, value: "500+", label: "Projects" },
  { icon: Users, value: "98%", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Awards" },
];

const features = [
  "Premium Construction Quality",
  "3D Design & Visualization",
  "Turnkey Project Delivery",
];

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`relative py-24 bg-[#f7f9fc] overflow-hidden transition-all duration-1000 ${
        isInView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative rounded-[30px] overflow-hidden shadow-2xl h-[620px]">
              <Image
                src="/about.jpg"
                alt="Latitude Construction"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Experience Card */}
            <div
              className={`absolute -bottom-8 -right-8 bg-white rounded-3xl shadow-2xl p-8 w-64 border transition-all duration-1000 ${
                isInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h3 className="text-5xl font-bold text-[#7CEB1D]">24+</h3>
              <p className="text-gray-600 mt-2">Years Building Beautiful Homes</p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <span
              className={`inline-flex items-center rounded-full bg-[#7CEB1D]/10 text-[#7CEB1D] px-5 py-2 text-sm font-semibold transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              ABOUT LATITUDE
            </span>

            <h2
              className={`mt-6 text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="text-[#041423]">Building Landmarks</span>
              <br />
              <span className="text-[#7CEB1D]">That Inspire</span>
            </h2>

            <p
              className={`mt-8 text-lg leading-8 text-gray-600 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              Latitude Construction delivers premium residential, commercial and
              turnkey developments with innovative engineering, sustainable
              practices and unmatched craftsmanship.
            </p>

            {/* FEATURES */}
            <div className="space-y-5 mt-10">
              {features.map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-700 ${
                    isInView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${450 + index * 120}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center">
                    <CheckCircle2 className="text-[#7CEB1D]" />
                  </div>
                  <span className="font-semibold text-[#041423]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-8 mt-28">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative rounded-3xl bg-white p-10 shadow-lg hover:-translate-y-3 transition-all duration-500 ${
                  isInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{ transitionDelay: `${600 + index * 120}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#041423] flex items-center justify-center mb-6">
                  <Icon className="text-[#7CEB1D]" size={30} />
                </div>
                <h3 className="text-5xl font-bold text-[#041423]">{stat.value}</h3>
                <p className="text-gray-500 mt-3">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}