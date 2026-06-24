"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-20 bg-[#041423] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[#7CEB1D] font-semibold text-sm tracking-widest uppercase mb-2">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Let's Build Your
              <span className="text-[#7CEB1D] block">Dream Home Together</span>
            </h2>
            <p className="text-gray-300 mt-4 text-base leading-relaxed">
              Reach out to us for a consultation, a quote, or just to explore
              possibilities. Our team is here to turn your vision into reality.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#7CEB1D]" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#7CEB1D]" />
                <span>info@latitude.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#7CEB1D]" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Send a Quick Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7CEB1D]"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7CEB1D]"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7CEB1D]"
              />
              <button
                type="submit"
                className="w-full bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}