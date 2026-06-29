"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowRight, MapPin, Calendar, Search } from "lucide-react";

// ─── Custom hook (unchanged) ──────────────────────────────────────────────
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

// ─── Projects Data ────────────────────────────────────────────────────────
const allProjects = [
  {
    id: 1,
    title: "Willow Creek Farmstead",
    category: "Luxury Farmhouse",
    location: "Coorg, Karnataka",
    image: "/project1.jpg",
    year: "2025",
    description: "A sprawling 5-acre estate featuring a 6-bedroom farmhouse...",
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

// ─── Extract unique categories from data ──────────────────────────────
const allCategories = ["All", ...new Set(allProjects.map((p) => p.category))];

// ─── Project Card Component (each card uses its own useInView) ──────────
function ProjectCard({ project, index }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`project-card bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ${isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="image-wrapper relative aspect-[4/3] w-full bg-gray-200 rounded-t-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-2xl">
            <span className="bg-[#7CEB1D] text-[#041423] font-semibold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              View Details <ArrowRight size={18} />
            </span>
          </div>
          <span className="absolute top-4 left-4 bg-[#041423]/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
            {project.category}
          </span>
        </div>
        <div className="p-6">
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
}

export default function ProjectsPage() {
  const sectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  // ─── Memoized filtered projects ──────────────────────────────────────
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const categoryMatch =
        filter === "All" ||
        project.category.trim().toLowerCase() === filter.trim().toLowerCase();

      const searchTerm = searchQuery.trim().toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm) ||
        project.location.toLowerCase().includes(searchTerm);

      return categoryMatch && searchMatch;
    });
  }, [filter, searchQuery]);

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
        .animate-float-soft { animation: float-soft 4s ease-in-out infinite; }
        .animate-float-orb { animation: float-orb 8s ease-in-out infinite; }
        .animate-gradient-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ee 100%);
          background-size: 200% 200%;
          animation: gradient-shift 12s ease infinite;
        }

        .filter-btn {
          transition: all 0.3s ease;
          border: 2px solid #7CEB1D;
          color: #041423;
        }
        .filter-btn:hover {
          background: #7CEB1D;
          color: white;
        }
        .filter-btn.active {
          background: #7CEB1D;
          color: white;
        }

        .project-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .project-card:hover {
          transform: translateY(-8px);
        }
        .project-card .image-wrapper {
          overflow: hidden;
          border-radius: 1.5rem 1.5rem 0 0;
        }
        .project-card .image-wrapper img {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .project-card:hover .image-wrapper img {
          transform: scale(1.08);
        }
        .project-card .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-card:hover .overlay {
          opacity: 1;
        }
      `}</style>

      <main ref={sectionRef} className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-[#041423]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#041423] via-[#0a1a2b] to-[#041423]" />
          <div className="absolute inset-0 bg-grid-dots opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7CEB1D]/10 rounded-full blur-3xl animate-float-orb pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#7CEB1D]/5 rounded-full blur-2xl animate-float-orb pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7CEB1D]/5 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{ animationDelay: "2s" }} />

          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-4 transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "100ms" }}
            >
              Our Portfolio
            </span>
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight transition-all duration-700 animate-float-soft ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "200ms" }}
            >
              Farmhouse
              <span className="block text-[#7CEB1D]">Projects</span>
            </h1>
            <p
              className={`mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "350ms" }}
            >
              Explore our handcrafted farmhouses – each designed to blend rustic charm with modern luxury.
            </p>
          </div>
        </section>

        {/* ─── PROJECTS GRID ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 animate-gradient-bg relative">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#7CEB1D]/5 rounded-full blur-3xl pointer-events-none animate-float-orb" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#7CEB1D]/8 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: "3s" }} />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
              <div className="flex flex-wrap gap-3 justify-center">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`filter-btn px-5 py-2.5 rounded-full text-sm font-semibold ${filter === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full border border-gray-200 bg-white text-[#041423] placeholder-gray-400 focus:outline-none focus:border-[#7CEB1D] focus:ring-2 focus:ring-[#7CEB1D]/20 transition-all duration-300"
                />
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                <button
                  onClick={() => { setFilter("All"); setSearchQuery(""); }}
                  className="mt-4 text-[#7CEB1D] font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────────────── */}
        <section className="py-16 text-white text-center relative overflow-hidden" style={{ background: "#365c41" }}>
          <div className="absolute inset-0 bg-grid-dots opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7CEB1D]/10 rounded-full blur-3xl animate-float-orb pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#7CEB1D]/5 rounded-full blur-2xl animate-float-orb pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Create Your <span className="text-[#7CEB1D]">Own Farmhouse?</span>
            </h2>
            <p className="text-gray-300 mt-3 text-lg">
              Let's build something beautiful together.
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