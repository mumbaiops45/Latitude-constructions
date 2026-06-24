"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useEffect } from "react";

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return { ref, isInView };
}

const faqs = [
  { question: "What is the typical timeline for a residential project?", answer: "Timelines vary based on project size and complexity. On average, a 2‑3 BHK home takes 6‑9 months from design to handover." },
  { question: "Do you provide interior design services as well?", answer: "Yes, we offer complete interior design solutions, from space planning to furnishing and decor." },
  { question: "Can I make changes during the construction phase?", answer: "Absolutely. We keep you involved at every stage, and any changes can be discussed and incorporated where feasible." },
  { question: "What kind of warranty do you offer?", answer: "We provide a comprehensive 10‑year structural warranty and 5‑year workmanship warranty on all projects." },
  { question: "Is your construction sustainable?", answer: "We use eco‑friendly materials, energy‑efficient systems, and design for natural light and ventilation, reducing the environmental footprint." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-green-100/30 via-white to-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px]  rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3">FAQ</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight">
            Frequently Asked <span className="text-[#7CEB1D]">Questions</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Everything you need to know about our process and services.
          </p>
        </div>

        <div ref={ref} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border border-gray-100 hover:border-[#7CEB1D]/50 transition-all duration-300 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionProperty: "opacity, transform, border-color",
                transform: isInView ? "translateY(0) rotateX(0deg)" : "translateY(40px) rotateX(-15deg)",
                transformOrigin: "center bottom",
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-[#041423]">{faq.question}</span>
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
                <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}