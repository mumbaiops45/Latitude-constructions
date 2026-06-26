"use client";

import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
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
      { threshold: 0.15, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

export default function ContactSection() {
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
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(124,235,29,0.3); }
            50% { box-shadow: 0 0 30px 8px rgba(124,235,29,0.15); }
          }

          .animate-float-soft {
            animation: float-soft 4s ease-in-out infinite;
          }
          .animate-float-orb {
            animation: float-orb 8s ease-in-out infinite;
          }
          .btn-pulse {
            animation: pulse-glow 2.5s ease-in-out infinite;
          }
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-lift:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.4);
          }
          .form-input {
            transition: all 0.3s ease;
          }
          .form-input:focus {
            border-color: #7CEB1D;
            box-shadow: 0 0 0 3px rgba(124,235,29,0.15);
          }
          .contact-icon-wrapper {
            transition: all 0.3s ease;
          }
          .contact-icon-wrapper:hover {
            background: #7CEB1D;
          }
          .contact-icon-wrapper:hover svg {
            color: #041423 !important;
          }

          /* ─── New background: solid #365c41 ─────────────────────────── */
          .contact-bg {
            background: #365c41;
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="py-20 relative overflow-hidden contact-bg text-white"
      >
        {/* Floating decorative orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-orb"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content – animated text */}
            <div>
              <span
                className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-widest uppercase mb-3 transition-all duration-700 ${
                  sectionInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                Get in Touch
              </span>
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700 animate-float-soft ${
                  sectionInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Let's Build Your
                <span className="text-[#7CEB1D] block mt-1">Dream Farmhouse</span>
              </h2>
              <p
                className={`text-gray-300 mt-4 text-base leading-relaxed transition-all duration-700 ${
                  sectionInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                Reach out to us for a consultation, land assessment, or to
                explore farmhouse design possibilities. Our team specialises in
                creating bespoke country estates that blend rustic charm with
                modern luxury.
              </p>

              {/* Contact Details – each with hover effect */}
              <div className="space-y-4 mt-8">
                {[
                  { icon: FaPhone, text: "+91 89516 39116", href: "tel:+918951639116" },
                  { icon: FaEnvelope, text: "latitudeconstructions080@gmail.com", href: "mailto:latitudeconstructions080@gmail.com" },
                  { icon: FaMapMarkerAlt, text: "Hosur, Tamil Nadu", href: "#" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 transition-all duration-700 ${
                        sectionInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                      style={{ transitionDelay: `${450 + index * 100}ms` }}
                    >
                      <div className="contact-icon-wrapper w-12 h-12 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-pointer">
                        <Icon size={18} className="text-[#7CEB1D] transition-colors duration-300" />
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-[#7CEB1D] transition-colors duration-300 text-sm md:text-base"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gray-300 text-sm md:text-base">{item.text}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right – Contact Form Card – animated with scale */}
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl transition-all duration-700 hover-lift ${
                sectionInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">
                Send a Quick Message
              </h3>
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-input w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-input w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                />
                <textarea
                  placeholder="Tell us about your farmhouse vision..."
                  rows={4}
                  className="form-input w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none"
                />
                <button
                  type="submit"
                  className="btn-pulse w-full bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                >
                  Send Message
                  <FaArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}