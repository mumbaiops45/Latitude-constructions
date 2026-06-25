"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Building2,
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

export default function ContactPage() {
  const sectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
        @keyframes scale-in {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,235,29,0.3); }
          50% { box-shadow: 0 0 30px 8px rgba(124,235,29,0.15); }
        }
        .animate-float-soft { animation: float-soft 4s ease-in-out infinite; }
        .animate-float-orb { animation: float-orb 8s ease-in-out infinite; }
        .animate-gradient-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ee 100%);
          background-size: 200% 200%;
          animation: gradient-shift 12s ease infinite;
        }
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
        .success-check { animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .btn-pulse { animation: pulse-glow 2.5s ease-in-out infinite; }

        .form-input {
          transition: all 0.3s ease;
        }
        .form-input:focus {
          border-color: #7CEB1D;
          box-shadow: 0 0 0 3px rgba(124,235,29,0.15);
        }

        .icon-circle {
          transition: all 0.3s ease;
        }
        .icon-circle:hover {
          background: #7CEB1D;
        }
        .icon-circle:hover svg {
          color: #041423 !important;
        }

        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .map-container iframe {
          filter: grayscale(0.2) contrast(1.1);
          transition: filter 0.5s ease;
        }
        .map-container:hover iframe {
          filter: grayscale(0);
        }

        .office-card {
          background: linear-gradient(145deg, #ffffff, #f9fbfc);
          border-left: 4px solid #7CEB1D;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .office-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        .contact-item {
          transition: all 0.3s ease;
        }
        .contact-item:hover {
          transform: translateX(4px);
        }

        .form-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
          border: 1px solid rgba(124,235,29,0.08);
          transition: all 0.3s ease;
        }
        .form-card:hover {
          box-shadow: 0 15px 50px rgba(0,0,0,0.08);
        }
        .form-card .form-header {
          background: linear-gradient(135deg, rgba(124,235,29,0.06), rgba(124,235,29,0.02));
          border-bottom: 1px solid rgba(124,235,29,0.08);
          padding: 1.5rem 2rem;
          border-radius: 1.5rem 1.5rem 0 0;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #041423 0%, #0a1a2b 50%, #061524 100%);
        }

        .whatsapp-btn {
          background: #25D366;
          transition: all 0.3s ease;
        }
        .whatsapp-btn:hover {
          background: #1ebe5c;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37,211,102,0.3);
        }

        .cta-section {
          background: linear-gradient(135deg, #041423, #0a1a2b);
        }
      `}</style>

      <main ref={sectionRef} className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden hero-gradient">
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
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
              Get in Touch
            </span>
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight transition-all duration-700 animate-float-soft ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Let's Build Your
              <span className="block text-[#7CEB1D]">Farmhouse Dream</span>
            </h1>
            <p
              className={`mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-700 ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              Reach out for a consultation, land assessment, or to explore farmhouse
              design possibilities. Our team is here to help.
            </p>
          </div>
        </section>

        {/* ─── CONTACT SECTION ───────────────────────────────────────────── */}
        <section className="py-20 md:py-28 animate-gradient-bg relative">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#7CEB1D]/5 rounded-full blur-3xl pointer-events-none animate-float-orb" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#7CEB1D]/8 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: "3s" }} />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* ─── LEFT: CONTACT INFO ────────────────────────────────────── */}
              <div className="space-y-8">
                <div>
                  <span className="text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase">Contact Info</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#041423] mt-2">
                    We'd Love to <span className="text-[#7CEB1D]">Hear From You</span>
                  </h2>
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    Whether you have a question about our services, need a consultation,
                    or want to discuss your farmhouse project – our team is ready to assist.
                  </p>
                </div>

                {/* Office Card */}
                <div className="office-card rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center flex-shrink-0">
                      <Building2 size={20} className="text-[#7CEB1D]" />
                    </div>
                    <span className="text-lg font-bold text-[#041423]">Our Office</span>
                  </div>
                  <div className="space-y-3 pl-14">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#7CEB1D] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#041423]">Hosur</p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          No.75/1B, Shivasakthi Nagar,<br />
                          ESI Ring Road, Hosur — 635109,<br />
                          Tamil Nadu, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-[#7CEB1D] flex-shrink-0" />
                      <span className="text-sm text-gray-600">Mon–Sat, 9 AM – 6 PM</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#7CEB1D] flex-shrink-0" />
                      <a href="tel:+918951639116" className="text-sm text-gray-600 hover:text-[#7CEB1D] transition-colors">
                        +91 89516 39116
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-[#7CEB1D] flex-shrink-0" />
                      <a href="mailto:latitudeconstructions080@gmail.com" className="text-sm text-gray-600 hover:text-[#7CEB1D] transition-colors break-all">
                        latitudeconstructions080@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Links */}
                <div className="space-y-3">
                  {[
                    { icon: Phone, label: "Call us", value: "+91 89516 39116", href: "tel:+918951639116" },
                    { icon: Mail, label: "Email us", value: "latitudeconstructions080@gmail.com", href: "mailto:latitudeconstructions080@gmail.com" },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className={`contact-item flex items-center gap-4 transition-all duration-700 ${
                          sectionInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                        }`}
                        style={{ transitionDelay: `${100 + index * 80}ms` }}
                      >
                        <div className="w-12 h-12 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-[#7CEB1D]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                          <a href={item.href} className="text-sm font-medium text-[#041423] hover:text-[#7CEB1D] transition-colors">
                            {item.value}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/918951639116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn inline-flex items-center gap-3 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 group"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* ─── RIGHT: CONTACT FORM ────────────────────────────────────── */}
              <div
                className={`form-card transition-all duration-700 ${
                  sectionInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="form-header">
                  <h3 className="text-2xl font-bold text-[#041423] flex items-center gap-2">
                    <Send size={24} className="text-[#7CEB1D]" />
                    Send a Message
                  </h3>
                </div>
                <div className="p-6 md:p-8">
                  {submitted ? (
                    <div className="bg-[#7CEB1D]/10 border border-[#7CEB1D] rounded-xl p-8 text-center">
                      <div className="success-check text-[#7CEB1D] text-6xl mb-4 flex justify-center">
                        <CheckCircle size={64} />
                      </div>
                      <h4 className="text-2xl font-bold text-[#041423]">Thank You!</h4>
                      <p className="text-gray-600 mt-2">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#041423] mb-2">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#041423] placeholder-gray-400 focus:outline-none transition-all duration-300"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#041423] mb-2">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#041423] placeholder-gray-400 focus:outline-none transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#041423] mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#041423] placeholder-gray-400 focus:outline-none transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#041423] mb-2">Your Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="form-input w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#041423] placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none"
                          placeholder="Tell us about your farmhouse vision..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl btn-pulse"
                      >
                        Send Message
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAP ─────────────────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase">Find Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#041423] mt-2">
                Visit Our <span className="text-[#7CEB1D]">Office</span>
              </h2>
              <p className="text-gray-500 mt-3">
                No.75/1B, Shivasakthi Nagar, ESI Ring Road, Hosur — 635109, Tamil Nadu
              </p>
            </div>
            <div className="map-container rounded-2xl overflow-hidden shadow-xl h-[400px] border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31104.352178053485!2d77.828175447597!3d12.73809861071177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5c0c4f7dfc4d%3A0x3b9c5c9e5b0f8c6!2sHosur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Latitude Construction Office - Hosur"
              />
            </div>
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────────────── */}
        <section className="cta-section py-16 text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Build Your <span className="text-[#7CEB1D]">Farmhouse?</span>
            </h2>
            <p className="text-gray-300 mt-3 text-lg">
              Let's talk about your vision – we're here to make it a reality.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full mt-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group btn-pulse"
            >
              Start Your Project
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}