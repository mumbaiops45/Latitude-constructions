"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle,
  Home,
  Users,
  Award,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

// ─── Same projects data (you can move to a shared file later) ──────────
const allProjects = [
  {
    id: 1,
    title: "Willow Creek Farmstead",
    category: "Luxury Farmhouse",
    location: "Coorg, Karnataka",
    image: "/project1.jpg",
    year: "2025",
    description:
      "A sprawling 5-acre estate featuring a 6-bedroom farmhouse with a infinity pool, organic garden, and a private lake. Designed to blend seamlessly with the surrounding coffee plantations.",
    features: [
      "6 Bedrooms",
      "Infinity Pool",
      "Organic Garden",
      "Private Lake",
      "Sustainable Materials",
      "Solar Panels",
    ],
    gallery: ["/project1-1.jpg", "/project1-2.jpg", "/project1-3.jpg"],
  },
  {
    id: 2,
    title: "Golden Harvest Estate",
    category: "Farmhouse Villa",
    location: "Mysore, Karnataka",
    image: "/project2.jpg",
    year: "2024",
    description:
      "A 3-bedroom villa set on 2 acres of land with a mango orchard, outdoor kitchen, and a traditional courtyard. Perfect for weekend getaways and family gatherings.",
    features: [
      "3 Bedrooms",
      "Mango Orchard",
      "Outdoor Kitchen",
      "Courtyard",
      "Rainwater Harvesting",
    ],
    gallery: ["/project2-1.jpg", "/project2-2.jpg", "/project2-3.jpg"],
  },
  {
    id: 3,
    title: "Rustic Pines Retreat",
    category: "Country Home",
    location: "Ooty, Tamil Nadu",
    image: "/project3.jpg",
    year: "2024",
    description:
      "A cozy 4-bedroom farmhouse with a wrap-around veranda, stone fireplace, and breathtaking views of the Nilgiri hills. Built with reclaimed wood and local stone.",
    features: [
      "4 Bedrooms",
      "Stone Fireplace",
      "Wrap-around Veranda",
      "Mountain Views",
      "Reclaimed Wood",
    ],
    gallery: ["/project3-1.jpg", "/project3-2.jpg", "/project3-3.jpg"],
  },
  {
    id: 4,
    title: "Sunrise Valley Homestead",
    category: "Farmhouse Estate",
    location: "Chikmagalur, Karnataka",
    image: "/project4.jpg",
    year: "2023",
    description:
      "A 5-bedroom estate on 10 acres of coffee plantation, featuring a state-of-the-art kitchen, wine cellar, and a helipad. Designed for luxury and privacy.",
    features: [
      "5 Bedrooms",
      "Wine Cellar",
      "Helipad",
      "Coffee Plantation",
      "Smart Home Technology",
    ],
    gallery: ["/project4-1.jpg", "/project4-2.jpg", "/project4-3.jpg"],
  },
  {
    id: 5,
    title: "Cedar Grove Manor",
    category: "Luxury Farmhouse",
    location: "Wayanad, Kerala",
    image: "/project5.jpg",
    year: "2023",
    description:
      "A 6-bedroom manor with a swimming pool, tennis court, and a private waterfall. Surrounded by dense forest and wildlife, this property offers complete seclusion.",
    features: [
      "6 Bedrooms",
      "Swimming Pool",
      "Tennis Court",
      "Private Waterfall",
      "Forest View",
    ],
    gallery: ["/project5-1.jpg", "/project5-2.jpg", "/project5-3.jpg"],
  },
  {
    id: 6,
    title: "Meadow View Farm",
    category: "Eco Farmhouse",
    location: "Pune, Maharashtra",
    image: "/project6.jpg",
    year: "2022",
    description:
      "A 4-bedroom eco-friendly farmhouse with a solar power system, rainwater harvesting, and a permaculture garden. Built entirely with sustainable materials.",
    features: [
      "4 Bedrooms",
      "Solar Power",
      "Permaculture Garden",
      "Rainwater Harvesting",
      "Recycled Materials",
    ],
    gallery: ["/project6-1.jpg", "/project6-2.jpg", "/project6-3.jpg"],
  },
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const id = parseInt(params.id);
  const project = allProjects.find((p) => p.id === id);

  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef(null);

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

  // If project not found
  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f9fbfc]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#041423]">Project Not Found</h1>
          <p className="text-gray-500 mt-2">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="inline-flex items-center gap-2 text-[#7CEB1D] font-semibold mt-4 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

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
        .animate-float-soft { animation: float-soft 4s ease-in-out infinite; }
        .animate-float-orb { animation: float-orb 8s ease-in-out infinite; }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: #f9fbfc;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        .feature-item:hover {
          border-color: #7CEB1D;
          background: white;
          box-shadow: 0 4px 12px rgba(124, 235, 29, 0.08);
          transform: translateY(-2px);
        }
        .gallery-image {
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .gallery-image:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
      `}</style>

      <main ref={sectionRef} className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#041423]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#041423] via-[#0a1a2b] to-[#041423]" />
          <div className="absolute inset-0 bg-grid-dots opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7CEB1D]/10 rounded-full blur-3xl animate-float-orb pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#7CEB1D]/5 rounded-full blur-2xl animate-float-orb pointer-events-none" />

          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <span className="inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-float-soft">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-gray-300">
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-[#7CEB1D]" />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={18} className="text-[#7CEB1D]" />
                {project.year}
              </span>
            </div>
          </div>
        </section>

        {/* ─── PROJECT OVERVIEW ───────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-[#041423] mb-6">Project Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>

                {/* Features */}
                <h3 className="text-2xl font-bold text-[#041423] mt-10 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <CheckCircle size={18} className="text-[#7CEB1D] flex-shrink-0" />
                      <span className="text-[#041423] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1">
                <div className="bg-[#f9fbfc] rounded-2xl p-8 border border-gray-100 sticky top-24">
                  <h4 className="text-xl font-bold text-[#041423] mb-6">Project Details</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Category</p>
                      <p className="text-[#041423] font-semibold">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                      <p className="text-[#041423] font-semibold">{project.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Year Completed</p>
                      <p className="text-[#041423] font-semibold">{project.year}</p>
                    </div>
                  </div>

                  <hr className="my-6 border-gray-200" />

                  <div className="space-y-4">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      Enquire Now
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/projects"
                      className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#7CEB1D] text-[#041423] font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#7CEB1D]/5 group"
                    >
                      ← Back to All Projects
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── GALLERY ────────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#f9fbfc]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#041423] text-center mb-12">
              Project <span className="text-[#7CEB1D]">Gallery</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, index) => (
                <div key={index} className="gallery-image relative aspect-[4/3] bg-gray-200">
                  <Image
                    src={img}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────────────── */}
        <section className="py-16 text-white text-center relative overflow-hidden" style={{ background: "#365c41" }}>
          <div className="absolute inset-0 bg-grid-dots opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7CEB1D]/10 rounded-full blur-3xl animate-float-orb pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#7CEB1D]/5 rounded-full blur-2xl animate-float-orb pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Build Your <span className="text-[#7CEB1D]">Own Farmhouse?</span>
            </h2>
            <p className="text-gray-300 mt-3 text-lg">
              Let's talk about your vision – we're here to make it a reality.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full mt-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
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