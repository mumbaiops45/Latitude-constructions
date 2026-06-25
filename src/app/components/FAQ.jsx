"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useEffect } from "react";

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return { ref, isInView };
}

const faqs = [
  {
    question: "What is the typical timeline for building a farmhouse?",
    answer:
      "Timelines depend on the size and complexity of your farmhouse. On average, a 2–3 bedroom farmhouse takes 8–12 months from design to handover, including land preparation and regulatory approvals.",
  },
  {
    question: "Do you handle agricultural land permits and zoning?",
    answer:
      "Yes, we assist with all necessary permits, zoning regulations, and environmental clearances specific to agricultural land, ensuring your farmhouse is fully compliant.",
  },
  {
    question: "Can I incorporate sustainable farming features?",
    answer:
      "Absolutely. We integrate rainwater harvesting, solar power, organic waste management, and even livestock shelters – all designed to complement your farmhouse lifestyle.",
  },
  {
    question: "Do you offer outbuilding construction (barns, sheds, etc.)?",
    answer:
      "Yes. We build custom outbuildings – from equipment sheds and stables to guest cottages – using the same high-quality materials and craftsmanship as your main farmhouse.",
  },
  {
    question: "What warranties do you provide for farmhouse projects?",
    answer:
      "We offer a 10‑year structural warranty and a 5‑year workmanship warranty on all farmhouse projects, with additional coverage for specialised farm installations.",
  },
];

export default function FAQ() {
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

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-float-soft {
            animation: float-soft 4s ease-in-out infinite;
          }
          .animate-float-orb {
            animation: float-orb 8s ease-in-out infinite;
          }
          .animate-gradient-bg {
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ee 100%);
            background-size: 200% 200%;
            animation: gradient-shift 12s ease infinite;
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="py-24 md:py-14 relative overflow-hidden animate-gradient-bg"
      >
        {/* Floating decorative orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-orb"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Heading – with staggered entrance + floating */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3 transition-all duration-700 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Farmhouse FAQ
            </span>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight transition-all duration-700 animate-float-soft ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Frequently Asked <span className="text-[#7CEB1D]">Questions</span>
            </h2>
            <p
              className={`text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto transition-all duration-700 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              Everything you need to know about building your dream farmhouse.
            </p>
          </div>

          {/* FAQ Accordion – each item animates in */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const { ref, isInView } = useInView({ threshold: 0.1 });

              return (
                <div
                  key={index}
                  ref={ref}
                  className={`bg-white rounded-2xl border border-gray-100 hover:border-[#7CEB1D]/50 transition-all duration-700 ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                    transitionProperty: "opacity, transform, border-color",
                    transform: isInView
                      ? "translateY(0) rotateX(0deg)"
                      : "translateY(40px) rotateX(-15deg)",
                    transformOrigin: "center bottom",
                  }}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-[#041423]">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp size={24} className="text-[#7CEB1D] flex-shrink-0" />
                    ) : (
                      <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-48 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}