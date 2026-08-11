"use client";

import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheckCircle } from "react-icons/fa";
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

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  // ── Validation Functions ──────────────────────────────────────────────

  const validateField = (name, value) => {
    switch (name) {
      case "name": {
        if (!value || value.trim().length === 0) {
          return "Name is required";
        }
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        if (value.trim().length > 50) {
          return "Name cannot exceed 50 characters";
        }
        if (!/^[a-zA-Z\s\-']+$/.test(value.trim())) {
          return "Name can only contain letters, spaces, hyphens, and apostrophes";
        }
        return "";
      }

      case "email": {
        if (!value || value.trim().length === 0) {
          return "Email is required";
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) {
          return "Please enter a valid email address";
        }
        if (value.trim().length > 100) {
          return "Email cannot exceed 100 characters";
        }
        return "";
      }

      case "message": {
        if (!value || value.trim().length === 0) {
          return "Message is required";
        }
        if (value.trim().length < 10) {
          return "Message must be at least 10 characters";
        }
        if (value.trim().length > 1000) {
          return "Message cannot exceed 1000 characters";
        }
        if (/\s{2,}/.test(value.trim())) {
          return "Message should not contain multiple spaces";
        }
        if (/^[\s\t]+$/.test(value)) {
          return "Message cannot be only spaces";
        }
        return "";
      }

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["name", "email", "message"];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {
      name: true,
      email: true,
      message: true,
    };
    setTouched(allTouched);

    const isValid = validateForm();

    if (!isValid) {
      // Scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector(".form-error");
        if (firstError) {
          firstError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setErrors({});
      setTouched({});
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

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
          @keyframes scale-in {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
          }
          @keyframes fade-up {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
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
          .success-check {
            animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
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
            outline: none;
          }
          .form-input.error {
            border-color: #ef4444;
          }
          .form-input.error:focus {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
          }
          .form-error {
            animation: fade-up 0.3s ease-out;
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
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
              <div className="space-y-4 mt-8 sm:mt-10">
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
                      <div className="contact-icon-wrapper w-12 h-12 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer">
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

            {/* Right – Contact Form Card */}
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl transition-all duration-700 hover-lift ${
                sectionInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">
                Send a Quick Message
              </h3>

              {submitted ? (
                /* ── Success Message ── */
                <div className="bg-[#7CEB1D]/10 border border-[#7CEB1D] rounded-xl p-8 text-center">
                  <div className="success-check text-[#7CEB1D] text-5xl mb-4 flex justify-center">
                    <FaCheckCircle size={50} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Thank You!</h4>
                  <p className="text-gray-300 mt-2 text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input w-full px-5 py-3.5 rounded-xl bg-white/10 border ${
                        errors.name && touched.name
                          ? "border-red-400 error"
                          : "border-white/20"
                      } text-white placeholder-gray-400 focus:outline-none transition-all duration-300`}
                    />
                    {errors.name && touched.name && (
                      <div className="form-error text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <span>⚠</span>
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input w-full px-5 py-3.5 rounded-xl bg-white/10 border ${
                        errors.email && touched.email
                          ? "border-red-400 error"
                          : "border-white/20"
                      } text-white placeholder-gray-400 focus:outline-none transition-all duration-300`}
                    />
                    {errors.email && touched.email && (
                      <div className="form-error text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <span>⚠</span>
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell us about your farmhouse vision..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input w-full px-5 py-3.5 rounded-xl bg-white/10 border ${
                        errors.message && touched.message
                          ? "border-red-400 error"
                          : "border-white/20"
                      } text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none`}
                    />
                    {errors.message && touched.message && (
                      <div className="form-error text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <span>⚠</span>
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-pulse w-full bg-[#7CEB1D] hover:bg-[#6cd816] disabled:bg-gray-500 disabled:cursor-not-allowed text-[#041423] font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}