"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const footerServices = [
  {
    name: "Custom Farm House Design",
    path: "/services",
  },
  {
    name: "3D Farm Visualisation",
    path: "/services",
  },
  {
    name: "Estate & Land Planning",
    path: "/services",
  },
  {
    name: "Rustic Interior Design",
    path: "/services",
  },
  {
    name: "Farm House Renovation",
    path: "/services",
  },
  {
    name: "Sustainable Construction",
    path: "/services",
  },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <>
      <style>
        {`
          @keyframes float-orb {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -40px) scale(1.1); }
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .footer-float-orb {
            animation: float-orb 8s ease-in-out infinite;
          }

          /* Unique class for footer – won't conflict with other sections */
          .footer-gradient-bg {
            background: linear-gradient(135deg, #0a1929 0%, #041423 50%, #0a1a2e 100%);
            background-size: 200% 200%;
            animation: gradient-shift 12s ease infinite;
          }

          .footer-icon-wrapper {
            transition: all 0.3s ease;
          }
          .footer-icon-wrapper:hover {
            background: #7CEB1D;
          }
          .footer-icon-wrapper:hover svg {
            color: #041423 !important;
          }

          .footer-social-icon {
            transition: all 0.3s ease;
          }
          .footer-social-icon:hover {
            transform: translateY(-3px) scale(1.1);
            background: #7CEB1D;
            border-color: #7CEB1D;
          }
          .footer-social-icon:hover svg {
            color: #041423 !important;
          }

          .footer-link {
            transition: all 0.3s ease;
          }
          .footer-link:hover {
            color: #7CEB1D;
            transform: translateX(4px);
          }

          .footer-heading-underline {
            position: relative;
          }
          .footer-heading-underline::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 32px;
            height: 2px;
            background: #7CEB1D;
            border-radius: 2px;
          }
        `}
      </style>

      <footer
        ref={ref}
        className="relative overflow-hidden footer-gradient-bg text-white"
      >
        {/* Floating decorative orbs – footer specific */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none footer-float-orb" />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/8 blur-3xl pointer-events-none footer-float-orb"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Grid */}
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Brand Column */}
              <div
                className={`transition-all duration-700 ${isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="relative w-[150px] h-[95px]">
                  <Image
                    src="/logo.jpeg"
                    alt="Latitude Constructions"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-5 text-gray-400 text-sm leading-relaxed">
                  Farmhouse construction specialists serving Bangalore outskirts,
                  Hosur, Thally, Denkanikottai, Shoolagiri, Hoskote &amp; Devanahalli
                  since 2014.
                </p>
                {/* Trust Badge */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#7CEB1D] text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">4.9/5 Trust Rating</span>
                </div>
              </div>

              {/* Quick Links Column */}
              <div
                className={`transition-all duration-700 ${isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "200ms" }}
              >
                <h3 className="text-lg font-bold mb-6 text-white footer-heading-underline">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.path}
                        className="text-gray-400 hover:text-[#7CEB1D] transition-all duration-300 text-sm flex items-center gap-2 group footer-link"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7CEB1D]/30 group-hover:bg-[#7CEB1D] transition-colors" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Column */}
              <div
                className={`transition-all duration-700 ${isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "300ms" }}
              >
                <h3 className="text-lg font-bold mb-6 text-white footer-heading-underline">
                  Our Services
                </h3>
                <ul className="space-y-3">
                  {footerServices.map((service) => (
                    <li key={service.name}>
                      <Link
                        href={service.path}
                        className="text-gray-400 hover:text-[#7CEB1D] transition-all duration-300 text-sm flex items-center gap-2 group footer-link"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7CEB1D]/30 group-hover:bg-[#7CEB1D]" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Column */}
              <div
                className={`transition-all duration-700 ${isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "400ms" }}
              >
                <h3 className="text-lg font-bold mb-6 text-white footer-heading-underline">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="footer-icon-wrapper w-10 h-10 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 cursor-pointer">
                      <Phone size={18} className="text-[#7CEB1D] transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Phone</p>
                      <a
                        href="tel:+918951639116"
                        className="text-gray-300 hover:text-[#7CEB1D] transition-colors text-sm"
                      >
                        +91 89516 39116
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="footer-icon-wrapper w-10 h-10 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 cursor-pointer">
                      <Mail size={18} className="text-[#7CEB1D] transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Email</p>
                      <a
                        href="mailto:latitudeconstructions080@gmail.com"
                        className="text-gray-300 hover:text-[#7CEB1D] transition-colors text-sm break-all"
                      >
                        latitudeconstructions080@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="footer-icon-wrapper w-10 h-10 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 cursor-pointer">
                      <MapPin size={18} className="text-[#7CEB1D] transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Address</p>
                      <p className="text-gray-300 text-sm">
                        No.76/1B, Shivsakthi Nagar, <br />
                        ESI Ring Road, Hosur - 635109
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 mt-6">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="footer-social-icon w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
                      >
                        <Icon
                          size={16}
                          className="text-gray-400 transition-colors duration-300"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 pb-6">
            <div
              className={`flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left transition-all duration-700 ${isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "500ms" }}
            >
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Latitude Constructions. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Serving: Hosur • Thally • Denkanikottai • Shoolagiri • Hoskote • Devanahalli
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                Developed by{" "}
                <Link
                  href="https://nakshatranamahacreations.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7CEB1D] hover:underline transition-all duration-300 flex items-center gap-1 group"
                >
                  Nakshatra Namaha Creations
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}