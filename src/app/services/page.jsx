"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  Home,
  PenTool,
  Ruler,
  Palette,
  Hammer,
  Sprout,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return { ref, isInView };
}

const services = [
  {
    icon: Home,
    title: "Custom Farm House Design",
    description:
      "Tailored architectural plans that blend rustic elegance with modern comfort, designed around your land and lifestyle.",
    image: "/service1.jpg",
    features: ["Site Analysis & Assessment", "Concept & Schematic Design", "Detailed Construction Drawings", "Permit & Approval Assistance"],
  },
  {
    icon: PenTool,
    title: "3D Farm Visualisation",
    description:
      "Walk through your future farm house in immersive 3D – every room, view, and finish visualised before construction begins.",
    image: "/service2.jpg",
    features: ["3D Walkthrough Animations", "Virtual Reality Tours", "Material & Finish Selection", "Daylight & Lighting Studies"],
  },
  {
    icon: Ruler,
    title: "Estate & Land Planning",
    description:
      "Optimise your acreage with expert planning – from house placement and driveways to paddocks, gardens, and outbuildings.",
    image: "/service3.jpg",
    features: ["Land Surveying & Topography", "Zoning & Regulatory Compliance", "Infrastructure & Utility Planning", "Landscape & Garden Design"],
  },
  {
    icon: Palette,
    title: "Rustic Interior Design",
    description:
      "Warm, inviting interiors that celebrate natural materials – wood, stone, and earthy tones – with a touch of luxury.",
    image: "/service4.jpg",
    features: ["Space Planning & Layout", "Material & Finish Selection", "Custom Furniture Design", "Lighting & Ambience Design"],
  },
  {
    icon: Hammer,
    title: "Farm House Renovation",
    description:
      "Breathe new life into old farm houses – preserving character while upgrading structure, energy efficiency, and aesthetics.",
    image: "/service5.jpg",
    features: ["Structural Assessment & Repairs", "Heritage & Character Preservation", "Modern Systems Upgrades", "Energy Efficiency Retrofitting"],
  },
  {
    icon: Sprout,
    title: "Sustainable Construction",
    description:
      "Eco-friendly building practices – solar passive design, rainwater harvesting, and local materials for a greener farm house.",
    image: "/service6.jpg",
    features: ["Solar Passive Design", "Rainwater Harvesting Systems", "Natural Ventilation & Insulation", "Local & Sustainable Materials"],
  },
];

export default function ServicesPage() {
  const sectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
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
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float-soft { animation: float-soft 4s ease-in-out infinite; }
        .animate-float-orb { animation: float-orb 8s ease-in-out infinite; }
        .animate-gradient-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ee 100%);
          background-size: 200% 200%;
          animation: gradient-shift 12s ease infinite;
        }
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }

        .service-row {
          transition: all 0.3s ease;
        }
        .service-row:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
        }
        .service-image-wrapper {
          overflow: hidden;
          border-radius: 1.5rem;
        }
        .service-image-wrapper img {
          transition: transform 0.5s ease;
        }
        .service-row:hover .service-image-wrapper img {
          transform: scale(1.05);
        }
        .feature-item {
          transition: all 0.3s ease;
        }
        .feature-item:hover {
          color: #7CEB1D;
          transform: translateX(4px);
        }
        .service-icon {
          transition: all 0.3s ease;
        }
        .service-row:hover .service-icon {
          background: #7CEB1D;
          color: #041423;
        }
        .service-row:hover .service-icon svg {
          color: #041423 !important;
        }
        .bg-grid-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>

      <main ref={sectionRef} className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#041423]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#041423] via-[#0a1a2b] to-[#041423]" />
          <div className="absolute inset-0 bg-grid-dots opacity-50" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7CEB1D]/10 rounded-full blur-3xl animate-float-orb pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#7CEB1D]/5 rounded-full blur-2xl animate-float-orb pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7CEB1D]/5 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{ animationDelay: "2s" }} />

          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-4 transition-all duration-700 ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              What We Offer
            </span>
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight transition-all duration-700 animate-float-soft ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Our Farmhouse
              <span className="block text-[#7CEB1D]">Services</span>
            </h1>
            <p
              className={`mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto transition-all duration-700 ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              End‑to‑end solutions for your dream country estate – from design to
              sustainable construction.
            </p>
          </div>
        </section>

        {/* ─── SERVICES ZIGZAG ────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 animate-gradient-bg relative">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#7CEB1D]/5 rounded-full blur-3xl pointer-events-none animate-float-orb" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#7CEB1D]/8 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: "3s" }} />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            <div className="space-y-20">
              {services.map((service, index) => {
                const Icon = service.icon;
                const { ref, isInView } = useInView({ threshold: 0.15 });
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    ref={ref}
                    className={`service-row bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 ${
                      isInView
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-12 scale-95"
                    }`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <div className={`grid lg:grid-cols-2 ${isEven ? "" : "lg:grid-flow-dense"}`}>
                      {/* Image */}
                      <div className={`relative h-[300px] lg:h-[400px] service-image-wrapper ${isEven ? "order-1" : "order-2"}`}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 lg:opacity-100" />
                      </div>

                      {/* Content */}
                      <div className={`p-8 md:p-12 flex flex-col justify-center ${isEven ? "order-2" : "order-1"}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="service-icon w-14 h-14 rounded-xl bg-[#7CEB1D]/10 flex items-center justify-center transition-all duration-300">
                            <Icon size={28} className="text-[#7CEB1D] transition-colors duration-300" />
                          </div>
                          <span className="text-sm font-semibold text-[#7CEB1D] uppercase tracking-wider">Service</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#041423] mb-4">{service.title}</h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-6">{service.description}</p>
                        <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                          {service.features.map((feature, i) => (
                            <li key={i} className="feature-item flex items-center gap-2 text-sm text-gray-600 cursor-default">
                              <CheckCircle size={16} className="text-[#7CEB1D] flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 text-[#7CEB1D] font-semibold hover:gap-3 transition-all duration-300 group"
                        >
                          Enquire Now
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}