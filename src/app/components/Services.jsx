"use client";

import {
  Home,
  PenTool,
  Ruler,
  Palette,
  Hammer,
  Sprout,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const services = [
  {
    icon: Home,
    title: "Custom Farm House Design",
    description:
      "Tailored architectural plans that blend rustic elegance with modern comfort, designed around your land and lifestyle.",
    image: "/service1.jpg",
  },
  {
    icon: PenTool,
    title: "3D Farm Visualisation",
    description:
      "Walk through your future farm house in immersive 3D – every room, view, and finish visualised before construction begins.",
    image: "/service2.jpg",
  },
  {
    icon: Ruler,
    title: "Estate & Land Planning",
    description:
      "Optimise your acreage with expert planning – from house placement and driveways to paddocks, gardens, and outbuildings.",
    image: "/service3.jpg",
  },
  {
    icon: Palette,
    title: "Rustic Interior Design",
    description:
      "Warm, inviting interiors that celebrate natural materials – wood, stone, and earthy tones – with a touch of luxury.",
    image: "/service4.jpg",
  },
  {
    icon: Hammer,
    title: "Farm House Renovation",
    description:
      "Breathe new life into old farm houses – preserving character while upgrading structure, energy efficiency, and aesthetics.",
    image: "/service5.jpg",
  },
  {
    icon: Sprout,
    title: "Sustainable Construction",
    description:
      "Eco-friendly building practices – solar passive design, rainwater harvesting, and local materials for a greener farm house.",
    image: "/service6.jpg",
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
    <>
      <style>
        {`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float-orb {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -40px) scale(1.1); }
          }
          @keyframes float-soft {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes card-enter {
            0% { opacity: 0; transform: translateY(60px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes pulse-button {
            0%, 100% { box-shadow: 0 0 0 0 rgba(124,235,29,0.4); }
            50% { box-shadow: 0 0 30px 10px rgba(124,235,29,0.2); }
          }
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(124,235,29,0.15); }
            50% { box-shadow: 0 0 40px rgba(124,235,29,0.3); }
          }

          .animate-gradient-bg {
            background: linear-gradient(135deg, #f0f7ff 0%, #e6f0fa 50%, #f0f7ff 100%);
            background-size: 200% 200%;
            animation: gradient-shift 12s ease infinite;
          }
          .animate-float-orb {
            animation: float-orb 8s ease-in-out infinite;
          }
          .animate-float-soft {
            animation: float-soft 4s ease-in-out infinite;
          }
          .card-enter {
            opacity: 0;
            animation: card-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .btn-pulse {
            animation: pulse-button 2.5s ease-in-out infinite;
          }

          /* Flip card styles */
          .flip-container {
            perspective: 1000px;
            height: 420px;
          }
          .flip-card {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-style: preserve-3d;
            border-radius: 1.5rem;
          }
          .flip-container:hover .flip-card {
            transform: rotateY(180deg);
          }
          .flip-front, .flip-back {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            border-radius: 1.5rem;
            overflow: hidden;
          }
          .flip-front {
            background: white;
          }
          .flip-front .image-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .flip-front .image-wrapper img {
            object-fit: cover;
          }
          .flip-front .front-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
            color: white;
          }
          .flip-front .front-overlay h3 {
            font-size: 1.25rem;
            font-weight: bold;
          }

          /* === REDESIGNED BACK === */
          .flip-back {
            transform: rotateY(180deg);
            background: linear-gradient(145deg, #ffffff 0%, #f8fff5 100%);
            padding: 2rem 1.75rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            border: 1px solid rgba(124,235,29,0.15);
          }

          .flip-back .icon-wrapper {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, rgba(124,235,29,0.15), rgba(124,235,29,0.05));
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            border: 1px solid rgba(124,235,29,0.2);
            animation: glow-pulse 3s ease-in-out infinite;
            transition: all 0.3s ease;
          }
          .flip-container:hover .flip-back .icon-wrapper {
            background: linear-gradient(135deg, #7CEB1D, #5ec70a);
            border-color: #7CEB1D;
          }
          .flip-container:hover .flip-back .icon-wrapper svg {
            color: white !important;
          }
          .flip-back .icon-wrapper svg {
            color: #7CEB1D;
            width: 1.5rem;
            height: 1.5rem;
            transition: color 0.3s ease;
          }

          .flip-back .title-section {
            width: 100%;
            margin-bottom: 0.75rem;
          }
          .flip-back .title-section h3 {
            font-size: 1.3rem;
            font-weight: 700;
            color: #041423;
            letter-spacing: -0.01em;
            line-height: 1.3;
          }
          .flip-back .title-section .accent-line {
            width: 2.5rem;
            height: 3px;
            background: linear-gradient(90deg, #7CEB1D, #a8f05a);
            border-radius: 2px;
            margin-top: 0.4rem;
            transition: width 0.4s ease;
          }
          .flip-container:hover .flip-back .title-section .accent-line {
            width: 4rem;
          }

          .flip-back .description-text {
            color: #4b5563;
            font-size: 0.92rem;
            line-height: 1.7;
            flex: 1;
            margin: 0.25rem 0 0.5rem 0;
            font-weight: 400;
          }

          .flip-back .learn-more-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.25rem;
            background: transparent;
            border: 1.5px solid rgba(124,235,29,0.3);
            border-radius: 2rem;
            color: #7CEB1D;
            font-weight: 600;
            font-size: 0.85rem;
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            margin-top: 0.5rem;
            text-decoration: none;
          }
          .flip-back .learn-more-btn:hover {
            background: #7CEB1D;
            color: #041423;
            border-color: #7CEB1D;
            gap: 0.75rem;
            box-shadow: 0 8px 24px rgba(124,235,29,0.3);
            transform: translateY(-2px);
          }
          .flip-back .learn-more-btn svg {
            transition: transform 0.3s ease;
          }
          .flip-back .learn-more-btn:hover svg {
            transform: translateX(3px);
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="py-24 md:py-14 relative overflow-hidden animate-gradient-bg"
      >
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-orb"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3 transition-all duration-700 ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "100ms" }}
            >
              Farm House Expertise
            </span>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight animate-float-soft ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              Our Farm House
              <span className="block text-[#7CEB1D]">Services</span>
            </h2>
            <p
              className={`text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto transition-all duration-700 ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "350ms" }}
            >
              End‑to‑end solutions for your dream country estate – from design to
              sustainable construction.
            </p>
          </div>

          {/* Services Grid – Flip Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const delay = index * 120;

              return (
                <div
                  key={index}
                  className={`flip-container ${sectionInView ? "card-enter" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <div className="flip-card shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    {/* FRONT – Image with overlay title */}
                    <div className="flip-front">
                      <div className="image-wrapper">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="front-overlay">
                          <h3>{service.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* BACK – Premium redesigned */}
                    <div className="flip-back">
                      <div className="icon-wrapper">
                        <Icon />
                      </div>
                      <div className="title-section">
                        <h3>{service.title}</h3>
                        <div className="accent-line" />
                      </div>
                      <p className="description-text">{service.description}</p>
                      <Link href="/services" className="learn-more-btn">
                        Learn More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 btn-pulse"
            >
              Explore All Farm House Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}