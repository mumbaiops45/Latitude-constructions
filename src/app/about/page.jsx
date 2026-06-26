"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Users,
  Target,
  Eye,
  Leaf,
  Shield,
  Clock,
  CheckCircle,
  Building2,
  Sparkles,
  MapPin,
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

function useCountUp(target, isInView, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasCounted = useRef(false);

  useEffect(() => {
    if (!isInView || hasCounted.current) return;

    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(numeric)) return;

    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numeric);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(numeric);
        hasCounted.current = true;
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

const stats = [
  { icon: Building2, value: "24+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Projects Completed" },
  { icon: Award, value: "50+", label: "Awards Won" },
  { icon: Clock, value: "98%", label: "Client Satisfaction" },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every detail, from design to handover.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Honest communication and transparent practices build lasting trust.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Eco‑conscious materials and energy‑efficient designs for a greener future.",
  },
  {
    icon: Users,
    title: "Client‑First",
    description: "Your vision is our blueprint – we work closely with you at every stage.",
  },
];

const teamMembers = [
  { name: "Arjun Reddy", role: "Founder & Principal Architect", image: "/team1.jpg", description: "24+ years of experience in farmhouse design." },
  { name: "Priya Sharma", role: "Senior Project Manager", image: "/team2.jpg", description: "Expert in coordinating complex rural projects." },
  { name: "Vikram Singh", role: "Lead Structural Engineer", image: "/team3.jpg", description: "Specialises in sustainable building structures." },
  { name: "Ananya Nair", role: "Interior Design Director", image: "/team4.jpg", description: "Brings rustic elegance to every interior space." },
];

const awards = [
  { name: "Best Farmhouse Design 2024", org: "India Architecture Awards", year: "2024" },
  { name: "Sustainable Builder of the Year", org: "Green Building Council", year: "2023" },
  { name: "Excellence in Rural Construction", org: "National Builders Association", year: "2023" },
  { name: "Innovation in Eco‑Design", org: "Design & Sustainability Forum", year: "2022" },
];

const milestones = [
  { year: "2014", title: "Founded", description: "Latitude Construction was established with a vision for rural excellence." },
  { year: "2008", title: "First Farmhouse Project", description: "Completed our first luxury farmhouse in Coorg." },
  { year: "2014", title: "Expansion", description: "Expanded operations to Tamil Nadu and Kerala." },
  { year: "2020", title: "Sustainability Focus", description: "Pioneered eco-friendly farmhouse construction practices." },
  { year: "2024", title: "500+ Projects", description: "Reached the milestone of 500+ completed farmhouse projects." },
];

const serviceAreas = [
  { name: "Bangalore", description: "Projects across Bangalore & suburbs" },
  { name: "Hosur", description: "Office: Shivsakthi Nagar" },
  { name: "Jowlagiri", description: "Farmhouse & eco-builds" },
  { name: "Denkanikottai", description: "Premium farmhouse projects" },
  { name: "Devanahalli", description: "Layout & villa development" },
  { name: "Mysore", description: "Residential & Commercial" },
  { name: "Kanakapura", description: "Farmhouse & villa projects" },
];

function StatCard({ stat, isInView, delay }) {
  const Icon = stat.icon;
  // 👇 Each card watches itself with a small rootMargin to trigger early
  const { ref, isInView: cardInView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  // Use parent OR card's own visibility
  const show = isInView || cardInView;
  const counted = useCountUp(stat.value, show, 2000);
  let displayValue = counted;
  if (stat.value.includes('+')) displayValue += '+';
  if (stat.value.includes('%')) displayValue += '%';

  return (
    <div
      ref={ref}
      className={`relative rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 shadow-xl hover-lift transition-all duration-500 ${show
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-12 scale-95"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#7CEB1D]/10 flex items-center justify-center mb-4 border border-[#7CEB1D]/20 animate-badge-pulse">
        <Icon className="text-[#7CEB1D]" size={28} />
      </div>
      <h3 className="text-4xl font-bold text-gray-600 animate-pulse-number">
        {displayValue}
      </h3>
      <p className="text-gray-600 mt-2">{stat.label}</p>
    </div>
  );
}

export default function AboutPage() {
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
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-number {
          0%, 100% { transform: scale(1); text-shadow: 0 0 0 transparent; }
          50% { transform: scale(1.02); text-shadow: 0 0 20px rgba(124,235,29,0.3); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,235,29,0); }
          50% { box-shadow: 0 0 20px 5px rgba(124,235,29,0.2); }
        }

        .animate-float-soft { animation: float-soft 4s ease-in-out infinite; }
        .animate-float-orb { animation: float-orb 8s ease-in-out infinite; }
        .animate-gradient-text {
          background: linear-gradient(135deg, #7CEB1D 0%, #a8ff6b 50%, #7CEB1D 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-text 4s ease infinite;
        }
        .animate-pulse-number {
          animation: pulse-number 2s ease-in-out infinite;
        }
        .animate-badge-pulse {
          animation: badge-pulse 2.5s ease-in-out infinite;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
        .image-shine {
          position: relative;
          overflow: hidden;
        }
        .image-shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .image-shine:hover::after {
          opacity: 1;
        }
        .bg-grid-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* Service area cards */
        .service-card {
          background: #f9fbfc;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s ease;
          cursor: default;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          border-color: #7CEB1D;
          background: white;
        }
        .service-card .icon-wrapper {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 9999px;
          background: rgba(124, 235, 29, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .service-card:hover .icon-wrapper {
          background: #7CEB1D;
        }
        .service-card:hover .icon-wrapper svg {
          color: #041423 !important;
        }
        .service-card .icon-wrapper svg {
          color: #7CEB1D;
          transition: all 0.3s ease;
        }
        .service-card h4 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #041423;
          margin: 0;
        }
        .service-card p {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
        }
      `}</style>

      <main ref={sectionRef} className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#041423]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#041423] via-[#0a1a2e] to-[#041423]" />
            <div className="absolute inset-0 bg-grid-dots" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-orb" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: "2s" }} />
          </div>
          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-4 transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "100ms" }}
            >
              About Latitude
            </span>
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight transition-all duration-700 animate-float-soft ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              Building Farmhouse
              <span className="block animate-gradient-text">Dreams Since 2014</span>
            </h1>
            <p
              className={`mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "350ms" }}
            >
              We are a team of passionate architects, engineers, and builders
              dedicated to crafting sustainable, luxurious farmhouses that stand
              the test of time.
            </p>
          </div>
        </section>

        {/* ─── STATS ────────────────────────────────────────────────────────── */}
        <section className="relative -mt-16 z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  isInView={sectionInView}
                  delay={600 + index * 120}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR STORY ───────────────────────────────────────────────────── */}
        <section className="py-24 bg-gradient-to-b from-[#0b1a2e] via-[#142b40] to-[#0b1a2e] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dots pointer-events-none" />
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span
                  className={`text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-2 block transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  Our Story
                </span>
                <h2
                  className={`text-4xl md:text-5xl font-bold text-white leading-tight transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  Crafting Farmhouse <span className="text-[#7CEB1D]">Excellence</span>
                </h2>
                <div className="space-y-4 mt-6 text-gray-300 leading-relaxed">
                  <p
                    className={`transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    Latitude Construction was founded in 2014 with a singular vision:
                    to transform the rural landscape with beautifully designed,
                    sustainable farmhouses that respect the land and elevate country living.
                  </p>
                  <p
                    className={`transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    Over two decades, we have grown from a small team of architects
                    into a full‑service construction firm, delivering over 500 projects
                    across Karnataka, Tamil Nadu, and Kerala.
                  </p>
                  <p
                    className={`transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    style={{ transitionDelay: "500ms" }}
                  >
                    Our expertise lies in understanding the unique needs of farmhouse
                    living – from land planning and outbuildings to rustic interiors
                    and eco‑friendly systems. Every project is a collaboration with
                    nature, creating homes that are both luxurious and harmonious
                    with their surroundings.
                  </p>
                </div>
                <div
                  className={`flex flex-wrap gap-8 mt-8 transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ transitionDelay: "600ms" }}
                >

                </div>
              </div>

              <div
                className={`relative transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: "500ms" }}
              >
                <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#7CEB1D]/20 image-shine">
                  <Image
                    src="/about2.jpg"
                    alt="Latitude Construction team at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-5 border border-[#7CEB1D]/30 animate-float-soft">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-[#7CEB1D]" size={24} />
                    <div>
                      <p className="text-2xl font-bold text-[#7CEB1D]">50+</p>
                      <p className="text-white/80 text-xs">Awards & Recognition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHERE WE BUILD ──────────────────────────────────────────────── */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: "2s" }} />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase">Where We Build</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#041423] leading-tight">
                Service <span className="text-[#7CEB1D]">Areas</span>
              </h2>
              <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto">
                We proudly serve clients across Bangalore, Hosur, and the surrounding regions of Karnataka and Tamil Nadu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceAreas.map((area, index) => {
                const { ref, isInView } = useInView({ threshold: 0.1 });
                return (
                  <div
                    key={area.name}
                    ref={ref}
                    className={`service-card transition-all duration-700 ${isInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95"
                      }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="icon-wrapper">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4>{area.name}</h4>
                      <p>{area.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>



        {/* ─── VALUES ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-b from-white to-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase">Core Values</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#041423] leading-tight">
                What Drives <span className="text-[#7CEB1D]">Us</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                const { ref, isInView } = useInView({ threshold: 0.1 });
                return (
                  <div
                    key={index}
                    ref={ref}
                    className={`bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm card-hover transition-all duration-700 ${isInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95"
                      }`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#7CEB1D]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#7CEB1D]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#041423]">{value.title}</h4>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#365c41] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dots pointer-events-none" />
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none animate-float-orb" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#7CEB1D]/10 blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: "2s" }} />

          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <span className="text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase">Let's Build Together</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Ready to Build Your <span className="text-[#7CEB1D]">Farmhouse Dream?</span>
            </h2>
            <p className="text-gray-300 mt-4 text-lg max-w-xl mx-auto">
              Let's talk about your vision – we're here to make it a reality.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {/* ─── PRIMARY CTA – matches gallery exactly ─────────────────── */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
              >
                Get in Touch
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {/* ─── SECONDARY OUTLINE BUTTON (kept as is) ────────────────── */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-[#7CEB1D] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                Explore Our Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}