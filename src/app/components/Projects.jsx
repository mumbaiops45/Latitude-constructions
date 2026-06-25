"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
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

const projects = [
  {
    id: 1,
    title: "Willow Creek Farmstead",
    category: "Luxury Farmhouse",
    location: "Coorg, Karnataka",
    image: "/project1.jpg",
    year: "2025",
  },
  {
    id: 2,
    title: "Golden Harvest Estate",
    category: "Farmhouse Villa",
    location: "Mysore, Karnataka",
    image: "/project2.jpg",
    year: "2024",
  },
  {
    id: 3,
    title: "Rustic Pines Retreat",
    category: "Country Home",
    location: "Ooty, Tamil Nadu",
    image: "/project3.jpg",
    year: "2024",
  },
  {
    id: 4,
    title: "Sunrise Valley Homestead",
    category: "Farmhouse Estate",
    location: "Chikmagalur, Karnataka",
    image: "/project4.jpg",
    year: "2023",
  },
  {
    id: 5,
    title: "Cedar Grove Manor",
    category: "Luxury Farmhouse",
    location: "Wayanad, Kerala",
    image: "/project5.jpg",
    year: "2023",
  },
  {
    id: 6,
    title: "Meadow View Farm",
    category: "Eco Farmhouse",
    location: "Pune, Maharashtra",
    image: "/project6.jpg",
    year: "2022",
  },
];

export default function ProjectsSection() {
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

  return (
    <>
      <style>
        {`
          @keyframes float-soft {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-soft {
            animation: float-soft 4s ease-in-out infinite;
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="py-24 md:py-14 bg-gradient-to-b from-[#f9fbfc] via-white to-white relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7CEB1D]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Heading – with staggered animation + floating */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-3 transition-all duration-700 ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "100ms" }}
            >
              Farmhouse Portfolio
            </span>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#041423] leading-tight transition-all duration-700 animate-float-soft ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              Our Featured
              <span className="block text-[#7CEB1D]">Farmhouse Projects</span>
            </h2>
            <p
              className={`text-gray-500 mt-4 text-base md:text-lg max-w-xl mx-auto transition-all duration-700 ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "350ms" }}
            >
              Explore our handcrafted farmhouses – each designed to blend rustic charm with modern luxury.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const { ref, isInView } = useInView({ threshold: 0.15 });

              return (
                <div
                  key={project.id}
                  ref={ref}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ${isInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95"
                    }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: "opacity, transform, box-shadow",
                  }}
                >
                  <Link href={`/projects/${project.id}`} className="block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                        <span className="bg-[#7CEB1D] text-[#041423] font-semibold px-6 py-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 flex items-center gap-2">
                          View Project <ArrowRight size={18} />
                        </span>
                      </div>
                      <span className="absolute top-4 left-4 bg-[#041423]/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="text-xl font-bold text-[#041423] group-hover:text-[#7CEB1D] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center mt-14">
            <Link
              href="/projects"
              className={`inline-flex items-center gap-3 bg-[#7CEB1D] hover:bg-[#6cd816] text-[#041423] font-bold px-8 py-4 rounded-full transition-all duration-700 shadow-lg hover:shadow-xl hover:-translate-y-1 group ${sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "500ms" }}
            >
              View All Farmhouse Projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}