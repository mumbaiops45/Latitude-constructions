"use client";

import { useRef, useEffect, useState } from "react";
import { sendEnquiry } from "@/app/lib/sendEnquiry";
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
  Shield,
  Users,
  Home,
  Award,
  AlertCircle,
} from "lucide-react";

/* =========================================================
   FORM FIELD
   IMPORTANT:
   This component is OUTSIDE ContactPage.
   This prevents the input from being remounted on every
   keystroke and fixes the focus/cursor issue.
========================================================= */

const FormField = ({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  rows,
  value,
  error,
  isTouched,
  onChange,
  onBlur,
}) => {
  const isTextarea = type === "textarea";
  const isPhone = name === "phone";
  const hasError = Boolean(error && isTouched);

  return (
    <div className="w-full">
      <label className="form-label" htmlFor={id}>
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-input textarea ${hasError
              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
              : ""
            }`}
          placeholder={placeholder}
          required={required}
          rows={rows || 5}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-input ${hasError
              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
              : ""
            }`}
          placeholder={placeholder}
          required={required}
          inputMode={isPhone ? "numeric" : "text"}
          autoComplete={
            isPhone
              ? "tel"
              : name === "email"
                ? "email"
                : name === "name"
                  ? "name"
                  : "on"
          }
          maxLength={isPhone ? 10 : undefined}
        />
      )}

      {hasError && (
        <div className="form-error flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-medium">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
  const sectionRef = useRef(null);

  const [sectionInView, setSectionInView] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     SECTION INTERSECTION OBSERVER
  ========================================================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateField = (name, value) => {
    switch (name) {
      /* ---------------- NAME ---------------- */

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

      /* ---------------- EMAIL ---------------- */

      case "email": {
        if (!value || value.trim().length === 0) {
          return "Email ID is required";
        }

        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(value.trim())) {
          return "Please enter a valid email address (e.g., name@domain.com)";
        }

        if (value.trim().length > 100) {
          return "Email cannot exceed 100 characters";
        }

        return "";
      }

      /* ---------------- PHONE ---------------- */

      case "phone": {
        if (!value || value.trim().length === 0) {
          return "Phone number is required";
        }

        // Remove all non-digit characters for validation
        const digitsOnly = value.replace(/\D/g, "");

        // Check if it's exactly 10 digits
        if (digitsOnly.length !== 10) {
          return "Phone number must be exactly 10 digits";
        }

        // Check if it's a valid Indian phone number (starts with 6,7,8,9)
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(digitsOnly)) {
          return "Phone number must start with 6, 7, 8, or 9";
        }

        return "";
      }

      /* ---------------- MESSAGE ---------------- */

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

  /* =========================================================
     VALIDATE COMPLETE FORM
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    const fields = [
      "name",
      "email",
      "phone",
      "message",
    ];

    fields.forEach((field) => {
      const error = validateField(
        field,
        formData[field]
      );

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     NORMAL INPUT CHANGE
     Functional state update prevents stale state.
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate while typing only if user already touched field
    if (touched[name]) {
      const error = validateField(name, value);

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /* =========================================================
     PHONE CHANGE
     Only allow digits (0-9) and limit to 10 characters
  ========================================================= */

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits (0-9)
    const digitsOnly = value.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedValue = digitsOnly.slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      [name]: limitedValue,
    }));

    if (touched[name]) {
      const error = validateField(name, limitedValue);

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /* =========================================================
     BLUR
  ========================================================= */

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

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================================
    // Mark all fields as touched
    // ==========================================

    const allTouched = {
      name: true,
      email: true,
      phone: true,
      message: true,
    };

    setTouched(allTouched);


    // ==========================================
    // Validate form
    // ==========================================

    const isValid = validateForm();

    if (!isValid) {

      setTimeout(() => {

        const firstError =
          document.querySelector(".form-error");

        if (firstError) {
          firstError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

      }, 50);

      return;
    }


    // ==========================================
    // Start loading
    // ==========================================

    setIsSubmitting(true);


    try {

      // ========================================
      // Send enquiry (Web3Forms)
      // ========================================

      await sendEnquiry(formData);


      // ========================================
      // Success
      // ========================================

      setSubmitted(true);


      // Reset form

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });


      setErrors({});
      setTouched({});


      // Hide success message after 5 seconds

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);


    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );


      alert(
        error.message ||
        "Unable to send your enquiry. Please try again."
      );


    } finally {

      setIsSubmitting(false);

    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <style>{`

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes float-soft {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(30px, -40px) scale(1.1);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(124,235,29,0.3);
          }

          50% {
            box-shadow: 0 0 30px 8px rgba(124,235,29,0.15);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }

          100% {
            background-position: 200% 0;
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }

          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-4px);
          }

          20%, 40%, 60%, 80% {
            transform: translateX(4px);
          }
        }

        /* =====================================================
           ANIMATION CLASSES
        ===================================================== */

        .animate-float-soft {
          animation: float-soft 4s ease-in-out infinite;
        }

        .animate-float-orb {
          animation: float-orb 8s ease-in-out infinite;
        }

        .animate-float-orb-delayed {
          animation: float-orb 10s ease-in-out infinite reverse;
        }

        .animate-gradient-bg {
          background:
            linear-gradient(
              135deg,
              #f8fafc 0%,
              #ffffff 50%,
              #f0f7ee 100%
            );

          background-size: 200% 200%;
          animation: gradient-shift 12s ease infinite;
        }

        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }

        .success-check {
          animation:
            scale-in
            0.5s
            cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .btn-pulse {
          animation:
            pulse-glow
            2.5s
            ease-in-out
            infinite;
        }

        .shake {
          animation:
            shake
            0.5s
            ease-in-out;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .hero-gradient {
          background:
            linear-gradient(
              135deg,
              #041423 0%,
              #0a1a2b 50%,
              #061524 100%
            );
        }

        .hero-shimmer {
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(124,235,29,0.04),
              transparent
            );

          background-size: 200% 100%;
          animation: shimmer 6s infinite linear;
        }

        /* =====================================================
           FORM
        ===================================================== */

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;

          border: 1px solid #d1d5db;
          border-radius: 0.75rem;

          background: #ffffff;

          font-size: 1rem;
          color: #1f2937;

          transition:
            border-color 0.2s,
            box-shadow 0.2s;

          /* Important for stable typing/focus */
          outline: none;
        }

        .form-input:focus {
          outline: none;

          border-color: #7CEB1D;

          box-shadow:
            0 0 0 3px
            rgba(124,235,29,0.15);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .form-input:disabled {
          background: #f3f4f6;
          cursor: not-allowed;
        }

        .form-input.textarea {
          min-height: 130px;
          resize: vertical;
        }

        .form-label {
          display: block;

          font-size: 0.875rem;
          font-weight: 600;

          color: #374151;

          margin-bottom: 0.35rem;
        }

        .form-error {
          animation:
            fade-up
            0.3s
            ease-out;
        }

        /* =====================================================
           OFFICE CARD
        ===================================================== */

        .office-card {
          background:
            rgba(255,255,255,0.9);

          backdrop-filter: blur(8px);

          border:
            1px solid
            rgba(124,235,29,0.12);

          box-shadow:
            0 8px 32px
            rgba(0,0,0,0.04);

          transition:
            all 0.4s ease;
        }

        .office-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 48px
            rgba(0,0,0,0.08);

          border-color:
            rgba(124,235,29,0.3);
        }

        /* =====================================================
           CONTACT ITEMS
        ===================================================== */

        .contact-item {
          transition:
            all 0.3s ease;
        }

        .contact-item:hover {
          transform: translateX(6px);
        }

        .contact-item .icon-wrap {
          transition:
            all 0.3s ease;
        }

        .contact-item:hover .icon-wrap {
          background: #7CEB1D;

          transform: scale(1.05);
        }

        .contact-item:hover .icon-wrap svg {
          color: #041423;
        }

        /* =====================================================
           WHATSAPP
        ===================================================== */

        .whatsapp-btn {
          background: #25D366;

          transition:
            all 0.3s ease;
        }

        .whatsapp-btn:hover {
          background: #1ebe5c;

          transform: translateY(-2px);

          box-shadow:
            0 8px 25px
            rgba(37,211,102,0.3);
        }

        /* =====================================================
           MAP
        ===================================================== */

        .map-card {
          position: relative;

          overflow: hidden;

          border-radius: 1.5rem;

          box-shadow:
            0 10px 40px
            rgba(0,0,0,0.06);
        }

        .map-card iframe {
          filter:
            grayscale(0.2)
            contrast(1.1);

          transition:
            filter 0.5s ease;
        }

        .map-card:hover iframe {
          filter:
            grayscale(0);
        }

        .map-card .map-overlay {
          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              to bottom,
              transparent 50%,
              rgba(4,20,35,0.02) 100%
            );
        }

        /* =====================================================
           WHY ITEMS
        ===================================================== */

        .why-item {
          display: flex;

          align-items: flex-start;

          gap: 1rem;

          padding: 1rem;

          border-radius: 1rem;

          transition:
            all 0.3s ease;

          background:
            rgba(255,255,255,0.5);

          backdrop-filter: blur(4px);

          border:
            1px solid transparent;
        }

        .why-item:hover {
          background: white;

          border-color:
            rgba(124,235,29,0.15);

          box-shadow:
            0 8px 24px
            rgba(0,0,0,0.04);

          transform:
            translateX(4px);
        }

        .why-item .icon {
          flex-shrink: 0;

          width: 2.8rem;
          height: 2.8rem;

          border-radius: 50%;

          background:
            rgba(124,235,29,0.08);

          display: flex;

          align-items: center;
          justify-content: center;

          color: #7CEB1D;
        }

        /* =====================================================
           SCROLL FADE
        ===================================================== */

        .scroll-fade {
          transition:
            all
            0.8s
            cubic-bezier(0.22, 1, 0.36, 1);

          opacity: 0;

          transform:
            translateY(30px);
        }

        .scroll-fade.visible {
          opacity: 1;

          transform:
            translateY(0);
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {
          .why-item {
            flex-direction: column;

            align-items: center;

            text-align: center;
          }

          .form-input {
            font-size: 0.95rem;

            padding:
              0.65rem
              0.9rem;
          }

          .form-label {
            font-size: 0.8rem;
          }
        }

      `}</style>

      <main
        ref={sectionRef}
        className="overflow-hidden"
      >
        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="
            relative
            h-[55vh]
            min-h-[400px]
            flex
            items-center
            justify-center
            overflow-hidden
            hero-gradient
          "
        >
          <div
            className="
              absolute
              inset-0
              hero-shimmer
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-grid-pattern
              opacity-30
            "
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div
            className="
              absolute
              -bottom-20
              -right-20
              w-64
              h-64
              bg-[#7CEB1D]/10
              rounded-full
              blur-3xl
              animate-float-orb
            "
          />

          <div
            className="
              absolute
              -top-20
              -left-20
              w-48
              h-48
              bg-[#7CEB1D]/5
              rounded-full
              blur-2xl
              animate-float-orb-delayed
            "
          />

          <div
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-96
              h-96
              bg-[#7CEB1D]/5
              rounded-full
              blur-3xl
              animate-float-orb
            "
            style={{
              animationDelay: "2s",
            }}
          />

          <div
            className="
              absolute
              bottom-10
              left-10
              w-32
              h-32
              bg-[#7CEB1D]/8
              rounded-full
              blur-2xl
              animate-float-orb-delayed
            "
            style={{
              animationDelay: "1.5s",
            }}
          />

          <div
            className="
              absolute
              top-10
              right-10
              w-40
              h-40
              bg-[#7CEB1D]/6
              rounded-full
              blur-2xl
              animate-float-orb
            "
            style={{
              animationDelay: "3s",
            }}
          />

          <div
            className="
              relative
              z-10
              text-center
              text-white
              max-w-4xl
              px-4
            "
          >
            <span
              className={`
                inline-block
                text-[#7CEB1D]
                font-semibold
                text-sm
                tracking-[0.3em]
                uppercase
                mb-4
                transition-all
                duration-700
                ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
                }
              `}
              style={{
                transitionDelay: "100ms",
              }}
            >
              Get in Touch
            </span>

            <h1
              className={`
                text-5xl
                sm:text-6xl
                md:text-7xl
                font-bold
                leading-tight
                transition-all
                duration-700
                ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }
              `}
              style={{
                transitionDelay: "200ms",
              }}
            >
              Let's Build Your

              <span
                className="
                  block
                  text-[#7CEB1D]
                  drop-shadow-glow
                  animate-float-soft
                "
              >
                Farmhouse Dream
              </span>
            </h1>

            <p
              className={`
                mt-6
                text-lg
                sm:text-xl
                text-gray-300
                max-w-2xl
                mx-auto
                transition-all
                duration-700
                ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }
              `}
              style={{
                transitionDelay: "350ms",
              }}
            >
              Reach out for a consultation, land assessment,
              or to explore farmhouse design possibilities.
              Our team is here to help.
            </p>
          </div>
        </section>

        {/* =====================================================
            CONTACT SECTION
        ===================================================== */}

        <section
          className="
            py-20
            md:py-28
            animate-gradient-bg
            relative
          "
        >
          {/* Background decorations */}

          <div
            className="
              absolute
              -top-40
              -right-40
              w-[500px]
              h-[500px]
              bg-[#7CEB1D]/5
              rounded-full
              blur-3xl
              pointer-events-none
              animate-float-orb
            "
          />

          <div
            className="
              absolute
              -bottom-40
              -left-40
              w-[400px]
              h-[400px]
              bg-[#7CEB1D]/8
              rounded-full
              blur-3xl
              pointer-events-none
              animate-float-orb-delayed
            "
          />

          <div
            className="
              absolute
              top-20
              left-20
              w-64
              h-64
              bg-[#7CEB1D]/4
              rounded-full
              blur-2xl
              pointer-events-none
              animate-float-orb
            "
            style={{
              animationDelay: "1s",
            }}
          />

          <div
            className="
              absolute
              bottom-20
              right-20
              w-56
              h-56
              bg-[#7CEB1D]/6
              rounded-full
              blur-2xl
              pointer-events-none
              animate-float-orb-delayed
            "
            style={{
              animationDelay: "2.5s",
            }}
          />

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              sm:px-10
              lg:px-12
              relative
              z-10
            "
          >
            <div
              className="
                grid
                lg:grid-cols-2
                gap-12
                lg:gap-16
                items-start
              "
            >
              {/* =================================================
                  LEFT - FORM
              ================================================= */}

              <div
                className={`
                  scroll-fade
                  ${sectionInView ? "visible" : ""}
                `}
                style={{
                  transitionDelay: "400ms",
                }}
              >
                <div
                  className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    border-gray-100
                    overflow-hidden
                  "
                >
                  {/* Form Header */}

                  <div
                    className="
                      bg-gradient-to-r
                      from-[#7CEB1D]/5
                      to-transparent
                      p-6
                      border-b
                      border-gray-100
                    "
                  >
                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-[#041423]
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Send
                        size={24}
                        className="text-[#7CEB1D]"
                      />

                      Send a Message
                    </h3>

                    <p
                      className="
                        text-gray-500
                        text-sm
                        mt-1
                      "
                    >
                      We'll respond within 24 hours
                    </p>
                  </div>

                  {/* Form Body */}

                  <div className="p-6 md:p-8">
                    {submitted ? (
                      /* =================================================
                         SUCCESS
                      ================================================= */

                      <div
                        className="
                          bg-[#7CEB1D]/10
                          border
                          border-[#7CEB1D]
                          rounded-xl
                          p-8
                          text-center
                        "
                      >
                        <div
                          className="
                            success-check
                            text-[#7CEB1D]
                            text-6xl
                            mb-4
                            flex
                            justify-center
                          "
                        >
                          <CheckCircle size={64} />
                        </div>

                        <h4
                          className="
                            text-2xl
                            font-bold
                            text-[#041423]
                          "
                        >
                          Thank You!
                        </h4>

                        <p
                          className="
                            text-gray-600
                            mt-2
                          "
                        >
                          We'll get back to you within
                          24 hours.
                        </p>
                      </div>
                    ) : (
                      /* =================================================
                         FORM
                      ================================================= */

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        noValidate
                      >
                        {/* Name + Email */}

                        <div
                          className="
                            grid
                            sm:grid-cols-2
                            gap-4
                          "
                        >
                          <FormField
                            id="name"
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            required
                            value={formData.name}
                            error={errors.name}
                            isTouched={touched.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />

                          <FormField
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            required
                            value={formData.email}
                            error={errors.email}
                            isTouched={touched.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        {/* Phone */}

                        <FormField
                          id="phone"
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="Enter 10 digit phone number"
                          required
                          value={formData.phone}
                          error={errors.phone}
                          isTouched={touched.phone}
                          onChange={handlePhoneChange}
                          onBlur={handleBlur}
                        />

                        {/* Message */}

                        <FormField
                          id="message"
                          label="Your Message"
                          name="message"
                          type="textarea"
                          placeholder="Tell us about your farmhouse vision..."
                          required
                          rows={5}
                          value={formData.message}
                          error={errors.message}
                          isTouched={touched.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        {/* Submit */}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="
                            w-full
                            bg-[#7CEB1D]
                            hover:bg-[#6cd816]
                            disabled:bg-gray-300
                            disabled:cursor-not-allowed
                            text-[#041423]
                            font-bold
                            py-3.5
                            rounded-xl
                            transition-all
                            duration-300
                            flex
                            items-center
                            justify-center
                            gap-3
                            group
                            shadow-lg
                            hover:shadow-xl
                            btn-pulse
                          "
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="
                                  animate-spin
                                  h-5
                                  w-5
                                "
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />

                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="
                                    M4 12a8 8 0 018-8V0
                                    C5.373 0 0 5.373 0 12h4zm2
                                    5.291A7.962 7.962 0 014 12H0c0
                                    3.042 1.135 5.824 3 7.938l3-2.647z
                                  "
                                />
                              </svg>

                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message

                              <ArrowRight
                                size={18}
                                className="
                                  transition-transform
                                  group-hover:translate-x-1
                                "
                              />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* =================================================
                    WHY CHOOSE US
                ================================================= */}

                <div
                  className="
                    mt-8
                    grid
                    grid-cols-2
                    gap-3
                  "
                >
                  {[
                    {
                      icon: Shield,
                      label: "Trusted since 2015",
                    },
                    {
                      icon: Users,
                      label: "Expert Team",
                    },
                    {
                      icon: Home,
                      label: "Custom Designs",
                    },
                    {
                      icon: Award,
                      label: "Award Winning",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={idx}
                        className="
                          flex
                          items-center
                          gap-2
                          bg-white/70
                          backdrop-blur-sm
                          rounded-xl
                          px-3
                          py-2
                          border
                          border-gray-100
                        "
                      >
                        <Icon
                          size={16}
                          className="text-[#7CEB1D]"
                        />

                        <span
                          className="
                            text-xs
                            font-medium
                            text-[#041423]
                          "
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  RIGHT - CONTACT INFORMATION
              ================================================= */}

              <div className="space-y-8">
                <div>
                  <span
                    className="
                      text-[#7CEB1D]
                      font-semibold
                      text-sm
                      tracking-[0.2em]
                      uppercase
                    "
                  >
                    Contact Info
                  </span>

                  <h2
                    className={`
                      scroll-fade
                      ${sectionInView ? "visible" : ""}
                      text-3xl
                      md:text-4xl
                      font-bold
                      text-[#041423]
                      mt-2
                    `}
                    style={{
                      transitionDelay: "500ms",
                    }}
                  >
                    We'd Love to{" "}
                    <span className="text-[#7CEB1D]">
                      Hear From You
                    </span>
                  </h2>

                  <p
                    className={`
                      scroll-fade
                      ${sectionInView ? "visible" : ""}
                      text-gray-600
                      mt-4
                      leading-relaxed
                    `}
                    style={{
                      transitionDelay: "550ms",
                    }}
                  >
                    Whether you have a question about
                    our services, need a consultation,
                    or want to discuss your farmhouse
                    project – our team is ready to assist.
                  </p>
                </div>

                {/* =================================================
                    OFFICE CARD
                ================================================= */}

                <div
                  className={`
                    scroll-fade
                    ${sectionInView ? "visible" : ""}
                  `}
                  style={{
                    transitionDelay: "600ms",
                  }}
                >
                  <div
                    className="
                      office-card
                      rounded-2xl
                      p-6
                      md:p-8
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-4
                      "
                    >
                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-[#7CEB1D]/10
                          flex
                          items-center
                          justify-center
                          flex-shrink-0
                        "
                      >
                        <Building2
                          size={20}
                          className="text-[#7CEB1D]"
                        />
                      </div>

                      <span
                        className="
                          text-lg
                          font-bold
                          text-[#041423]
                        "
                      >
                        Our Office
                      </span>
                    </div>

                    <div
                      className="
                        space-y-3
                        pl-14
                      "
                    >
                      {/* Address */}

                      <div
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <MapPin
                          size={18}
                          className="
                            text-[#7CEB1D]
                            flex-shrink-0
                            mt-0.5
                          "
                        />

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-[#041423]
                            "
                          >
                            Hosur
                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-600
                              leading-relaxed
                            "
                          >
                            No.75/1B,
                            Shivasakthi Nagar,
                            <br />
                            ESI Ring Road,
                            Hosur — 635109,
                            <br />
                            Tamil Nadu, India
                          </p>
                        </div>
                      </div>

                      {/* Hours */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <Clock
                          size={18}
                          className="
                            text-[#7CEB1D]
                            flex-shrink-0
                          "
                        />

                        <span
                          className="
                            text-sm
                            text-gray-600
                          "
                        >
                          Mon–Sat, 9 AM – 6 PM
                        </span>
                      </div>

                      {/* Phone */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <Phone
                          size={18}
                          className="
                            text-[#7CEB1D]
                            flex-shrink-0
                          "
                        />

                        <a
                          href="tel:+918951639116"
                          className="
                            text-sm
                            text-gray-600
                            hover:text-[#7CEB1D]
                            transition-colors
                          "
                        >
                          +91 89516 39116
                        </a>
                      </div>

                      {/* Email */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <Mail
                          size={18}
                          className="
                            text-[#7CEB1D]
                            flex-shrink-0
                          "
                        />

                        <a
                          href="mailto:info@latitudeconstructions.in"
                          className="
                            text-sm
                            text-gray-600
                            hover:text-[#7CEB1D]
                            transition-colors
                            break-all
                          "
                        >
                          info@latitudeconstructions.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    QUICK CONTACT
                ================================================= */}

                <div className="space-y-3">
                  {[
                    {
                      icon: Phone,
                      label: "Call us",
                      value: "+91 89516 39116",
                      href: "tel:+918951639116",
                    },
                    {
                      icon: Mail,
                      label: "Email us",
                      value:
                        "info@latitudeconstructions.in",
                      href:
                        "mailto:info@latitudeconstructions.in",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className={`
                          scroll-fade
                          ${sectionInView
                            ? "visible"
                            : ""
                          }
                          contact-item
                          flex
                          items-center
                          gap-4
                        `}
                        style={{
                          transitionDelay:
                            `${650 + index * 80}ms`,
                        }}
                      >
                        <div
                          className="
                            icon-wrap
                            w-12
                            h-12
                            rounded-full
                            bg-[#7CEB1D]/10
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                            transition-all
                            duration-300
                          "
                        >
                          <Icon
                            size={18}
                            className="text-[#7CEB1D]"
                          />
                        </div>

                        <div>
                          <p
                            className="
                              text-xs
                              text-gray-400
                              uppercase
                              tracking-wider
                            "
                          >
                            {item.label}
                          </p>

                          <a
                            href={item.href}
                            className="
                              text-sm
                              font-medium
                              text-[#041423]
                              hover:text-[#7CEB1D]
                              transition-colors
                            "
                          >
                            {item.value}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* =================================================
                    WHATSAPP
                ================================================= */}

                <div
                  className={`
                    scroll-fade
                    ${sectionInView ? "visible" : ""}
                  `}
                  style={{
                    transitionDelay: "800ms",
                  }}
                >
                  <a
                    href="https://wa.me/918951639116"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      whatsapp-btn
                      inline-flex
                      items-center
                      gap-3
                      text-white
                      font-semibold
                      px-6
                      py-3
                      rounded-full
                      shadow-lg
                      transition-all
                      duration-300
                      group
                    "
                  >
                    <MessageCircle size={20} />

                    Chat on WhatsApp

                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAP
        ===================================================== */}
        {/* 
        <section className="py-16 bg-white">
          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              sm:px-10
              lg:px-12
            "
          >
            <div
              className="
                text-center
                max-w-3xl
                mx-auto
                mb-10
              "
            >
              <span
                className="
                  text-[#7CEB1D]
                  font-semibold
                  text-sm
                  tracking-[0.2em]
                  uppercase
                "
              >
                Find Us
              </span>

              <h2
                className={`
                  scroll-fade
                  ${sectionInView ? "visible" : ""}
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-[#041423]
                  mt-2
                `}
                style={{
                  transitionDelay: "900ms",
                }}
              >
                Visit Our{" "}
                <span className="text-[#7CEB1D]">
                  Office
                </span>
              </h2>

              <p
                className={`
                  scroll-fade
                  ${sectionInView ? "visible" : ""}
                  text-gray-500
                  mt-3
                `}
                style={{
                  transitionDelay: "950ms",
                }}
              >
                No.75/1B, Shivasakthi Nagar,
                ESI Ring Road, Hosur — 635109,
                Tamil Nadu
              </p>
            </div>

            <div
              className={`
                scroll-fade
                ${sectionInView ? "visible" : ""}
                map-card
              `}
              style={{
                transitionDelay: "1000ms",
              }}
            >
              <div className="map-overlay" />

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31104.352178053485!2d77.828175447597!3d12.73809861071177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5c0c4f7dfc4d%3A0x3b9c5c9e5b0f8c6!2sHosur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="400"
                style={{
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Latitude Construction Office - Hosur"
                className="rounded-2xl"
              />
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}