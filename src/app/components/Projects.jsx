"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Calendar, MapPin } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Custom hook to detect when an element enters the viewport
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

// Updated projects with real Unsplash images (replace with your own)
const projects = [
  {
    id: 1,
    title: "Green Valley Estate",
    category: "Residential",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    year: "2025",
  },
  {
    id: 2,
    title: "Riverside Residences",
    category: "Luxury Apartments",
    location: "Mysore",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    year: "2024",
  },
  {
    id: 3,
    title: "Urban Oasis Flats",
    category: "Commercial",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    year: "2024",
  },
  {
    id: 4,
    title: "Serene Villas",
    category: "Villa",
    location: "Coimbatore",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    year: "2023",
  },
  {
    id: 5,
    title: "Tech Park Hub",
    category: "Commercial",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    year: "2023",
  },
  {
    id: 6,
    title: "Heritage Homes",
    category: "Residential",
    location: "Pune",
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop",
    year: "2022",
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-green-100/30 via-white to-white relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7CEB1D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            Our Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight">
            Featured
            <span className="block text-[#7CEB1D]">Projects</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Explore some of our recent works that have turned dreams into reality.
          </p>
        </div>

        {/* Projects Grid – new immersive design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const { ref, isInView } = useInView({ threshold: 0.1 });

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                ref={ref}
                className={`group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 transform-gpu ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty:
                    "opacity, transform, box-shadow",
                  transform: isInView
                    ? "translateY(0) rotateX(0deg)"
                    : "translateY(40px) rotateX(-15deg)",
                  transformOrigin: "center bottom",
                }}
              >
                {/* Image – full cover */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient – dark at bottom, transparent at top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041423]/80 via-[#041423]/30 to-transparent" />

                  {/* Content – always visible, pinned to bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block text-xs font-semibold tracking-wider text-[#7CEB1D] bg-[#041423]/50 px-3 py-1 rounded-full mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#7CEB1D] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-gray-300 text-sm">
                     
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {project.year}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#7CEB1D]/20 backdrop-blur-sm group-hover:bg-[#7CEB1D] flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                        <ExternalLink
                          size={18}
                          className="text-white group-hover:text-[#041423] transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover shine effect – optional */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-[#7CEB1D]/0 via-[#7CEB1D]/5 to-transparent pointer-events-none" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}