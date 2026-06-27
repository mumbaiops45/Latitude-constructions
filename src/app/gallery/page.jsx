"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import {
  ArrowRight,
  Play,
  X,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Video,
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

// ─── Fallback image for video thumbnails (data URI) ──────────────────────
const videoPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23222'/%3E%3Ccircle cx='200' cy='150' r='60' fill='%237CEB1D'/%3E%3Cpolygon points='180,120 180,180 240,150' fill='%23000'/%3E%3C/svg%3E";

// ─── Gallery Items ────────────────────────────────────────────────────────
const galleryItems = [
  {
    id: 1,
    type: "image",
    title: "Luxury Farmhouse Exterior",
    category: "Exterior",
    location: "Coorg, Karnataka",
    year: "2025",
    thumbnail: "/gallery1.jpg",
    src: "/gallery1.jpg",
  },
  {
    id: 2,
    type: "image",
    title: "Rustic Living Room",
    category: "Interior",
    location: "Mysore, Karnataka",
    year: "2024",
    thumbnail: "/gallery2.jpg",
    src: "/gallery2.jpg",
  },
  {
    id: 3,
    type: "video",
    title: "Farmhouse Virtual Tour",
    category: "Video",
    location: "Bangalore, Karnataka",
    year: "2024",
    thumbnail: videoPlaceholder,
    src: "/farmhouse4.mp4",
  },
  {
    id: 4,
    type: "image",
    title: "Modern Kitchen Design",
    category: "Interior",
    location: "Bangalore, Karnataka",
    year: "2024",
    thumbnail: "/gallery3.jpg",
    src: "/gallery3.jpg",
  },
  {
    id: 5,
    type: "image",
    title: "Farmhouse Pool & Garden",
    category: "Exterior",
    location: "Ooty, Tamil Nadu",
    year: "2024",
    thumbnail: "/gallery4.jpg",
    src: "/gallery4.jpg",
  },
  {
    id: 6,
    type: "video",
    title: "Eco-Friendly Construction Timelapse",
    category: "Video",
    location: "Chikmagalur, Karnataka",
    year: "2023",
    thumbnail: videoPlaceholder,
    src: "/farmhouse1.mp4",
  },
  {
    id: 7,
    type: "image",
    title: "Master Bedroom Suite",
    category: "Interior",
    location: "Wayanad, Kerala",
    year: "2023",
    thumbnail: "/gallery5.jpg",
    src: "/gallery5.jpg",
  },
  {
    id: 8,
    type: "image",
    title: "Farmhouse Aerial View",
    category: "Exterior",
    location: "Pune, Maharashtra",
    year: "2023",
    thumbnail: "/gallery6.jpg",
    src: "/gallery6.jpg",
  },
  {
    id: 9,
    type: "video",
    title: "Interview with Lead Architect",
    category: "Video",
    location: "Hosur, Tamil Nadu",
    year: "2022",
    thumbnail: videoPlaceholder,
    src: "/farmhouse2.mp4",
  },
  {
    id: 10,
    type: "image",
    title: "Outdoor Entertainment Area",
    category: "Exterior",
    location: "Mysore, Karnataka",
    year: "2022",
    thumbnail: "/gallery7.jpg",
    src: "/gallery7.jpg",
  },
  {
    id: 11,
    type: "image",
    title: "Bathroom with Natural Stone",
    category: "Interior",
    location: "Coorg, Karnataka",
    year: "2022",
    thumbnail: "/gallery8.jpg",
    src: "/gallery8.jpg",
  },
  {
    id: 12,
    type: "video",
    title: "Farmhouse Construction Progress",
    category: "Video",
    location: "Bangalore, Karnataka",
    year: "2021",
    thumbnail: videoPlaceholder,
    src: "/farmhouse3.mp4",
  },
  {
    id: 13,
    type: "image",
    title: "Elegant Dining Area",
    category: "Interior",
    location: "Mysore, Karnataka",
    year: "2024",
    thumbnail: "/gallery9.jpg",
    src: "/gallery9.jpg",
  },
  {
    id: 14,
    type: "image",
    title: "Sunset View from Deck",
    category: "Exterior",
    location: "Coorg, Karnataka",
    year: "2023",
    thumbnail: "/gallery10.jpg",
    src: "/gallery10.jpg",
  },
  {
    id: 15,
    type: "image",
    title: "Landscape Garden Design",
    category: "Exterior",
    location: "Bangalore, Karnataka",
    year: "2024",
    thumbnail: "/gallery11.jpg",
    src: "/gallery11.jpg",
  },
];

const categories = ["All", "Exterior", "Interior", "Video"];

export default function GalleryPage() {
  const sectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

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

  const filteredItems =
    filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  const openLightbox = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Head>
        <title>Gallery - Latitude Construction | Farmhouse Projects</title>
        <meta
          name="description"
          content="Explore Latitude Construction's gallery of luxury farmhouse designs, interiors, and video tours. See our portfolio of sustainable farmhouse projects across Karnataka and Tamil Nadu."
        />
      </Head>
      <style>{`
        /* ─── Use global brand colours ──────────────────────────────────── */
        :root {
          --primary: #7CEB1D;
          --secondary: #041423;
          --cta-bg: #365c41;  /* new distinct colour for CTA */
        }

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
        @keyframes fade-scale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-float-soft { animation: float-soft 4s ease-in-out infinite; }
        .animate-float-orb { animation: float-orb 8s ease-in-out infinite; }
        .animate-gradient-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ee 100%);
          background-size: 200% 200%;
          animation: gradient-shift 12s ease infinite;
        }
        .animate-fade-scale { animation: fade-scale 0.5s ease-out forwards; }

        /* ─── Filter buttons ───────────────────────────────────────────── */
        .filter-btn {
          transition: all 0.3s ease;
          border: 2px solid var(--primary);
          color: #041423;
        }
        .filter-btn:hover {
          background: var(--primary);
          color: white;
        }
        .filter-btn.active {
          background: var(--primary);
          color: white;
        }

        .gallery-item {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
          background: #000;
        }
        .gallery-item:hover {
          transform: translateY(-6px);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-item:hover .gallery-thumb {
          transform: scale(1.08);
        }
        .gallery-thumb {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          color: white;
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-overlay .title {
          font-size: 1.1rem;
          font-weight: bold;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }
        .gallery-item:hover .gallery-overlay .title {
          transform: translateY(0);
        }
        .gallery-overlay .category {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
          font-weight: 600;
          transform: translateY(10px);
          transition: transform 0.4s ease 0.05s;
        }
        .gallery-item:hover .gallery-overlay .category {
          transform: translateY(0);
        }
        .gallery-overlay .location {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
          transform: translateY(10px);
          transition: transform 0.4s ease 0.1s;
        }
        .gallery-item:hover .gallery-overlay .location {
          transform: translateY(0);
        }
        .video-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          z-index: 5;
          pointer-events: none;
        }
        .grid-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ─── Lightbox ─────────────────────────────────────────────────── */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fade-scale 0.3s ease-out forwards;
        }
        .lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: white;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .lightbox-close:hover {
          background: var(--primary);
          color: #041423;
          transform: rotate(90deg);
        }
        .lightbox-content {
          max-width: 80vw;
          max-height: 80vh;
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6);
          background: black;
        }
        .lightbox-content iframe,
        .lightbox-content video {
          width: 100%;
          height: 100%;
          min-height: 400px;
          aspect-ratio: 16/9;
          object-fit: contain;
        }
        .lightbox-content .image-container {
          position: relative;
          width: 100%;
          max-height: 70vh;
          min-height: 300px;
        }
        .lightbox-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
          color: white;
        }
        .lightbox-info h3 {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .lightbox-info .details {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }
        .lightbox-info .details span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .lightbox-info .category-badge {
          display: inline-block;
          background: var(--primary);
          color: #041423;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.8rem;
          border-radius: 2rem;
          margin-bottom: 0.5rem;
        }
        @media (max-width: 640px) {
          .lightbox-content {
            max-width: 95vw;
            max-height: 60vh;
          }
          .lightbox-content iframe {
            min-height: 200px;
          }
        }
      `}</style>

      <main ref={sectionRef} className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#041423]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#041423] via-[#0a1a2b] to-[#041423]" />
          <div className="absolute inset-0 bg-grid-dots opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7CEB1D]/10 rounded-full blur-3xl animate-float-orb pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#7CEB1D]/5 rounded-full blur-2xl animate-float-orb pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7CEB1D]/5 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{ animationDelay: "2s" }} />

          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <span
              className={`inline-block text-[#7CEB1D] font-semibold text-sm tracking-[0.2em] uppercase mb-4 transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "100ms" }}
            >
              Our Portfolio
            </span>
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight transition-all duration-700 animate-float-soft ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              Farmhouse
              <span className="block text-[#7CEB1D]">Gallery</span>
            </h1>
            <p
              className={`mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "350ms" }}
            >
              Explore our collection of handcrafted farmhouses – each one a unique
              blend of rustic charm and modern luxury. Watch videos and browse images
              of our finest work.
            </p>
          </div>
        </section>

        {/* ─── GALLERY GRID ────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 animate-gradient-bg relative">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#7CEB1D]/5 rounded-full blur-3xl pointer-events-none animate-float-orb" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#7CEB1D]/8 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: "3s" }} />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`filter-btn px-6 py-2.5 rounded-full text-sm font-semibold ${filter === cat ? "active" : ""
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => {
                const { ref, isInView } = useInView({ threshold: 0.1 });
                return (
                  <div
                    key={item.id}
                    ref={ref}
                    className={`gallery-item bg-black shadow-sm hover:shadow-xl transition-shadow duration-500 ${isInView
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-12 scale-95"
                      }`}
                    style={{
                      transitionDelay: `${index * 80}ms`,
                      aspectRatio: item.type === "video" ? "16/9" : "4/3",
                    }}
                    onClick={() => openLightbox(item)}
                  >
                    {item.type === "video" ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={item.thumbnail}
                        className="grid-video"
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="gallery-thumb object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={(e) => {
                          e.currentTarget.src = videoPlaceholder;
                        }}
                      />
                    )}
                    {item.type === "video" && (
                      <div className="video-badge">
                        <Play size={14} fill="currentColor" />
                        Video
                      </div>
                    )}
                    <div className="gallery-overlay">
                      <span className="category">{item.category}</span>
                      <span className="title">{item.title}</span>
                      <span className="location flex items-center gap-1">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────────────── */}
        {/* Background now uses --cta-bg (dark green) – different from footer */}
        <section className="py-16 text-white text-center relative overflow-hidden" style={{ background: 'var(--cta-bg)' }}>
          <div className="absolute inset-0 bg-grid-dots opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7CEB1D]/10 rounded-full blur-3xl animate-float-orb pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#7CEB1D]/5 rounded-full blur-2xl animate-float-orb pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Create Your <span className="text-[#7CEB1D]">Farmhouse Story?</span>
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

      {/* ─── LIGHTBOX ────────────────────────────────────────────────────── */}
      {selectedItem && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={24} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === "video" ? (
              <video
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain rounded-xl"
              >
                <source src={selectedItem.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="image-container" style={{ minHeight: "300px", maxHeight: "70vh" }}>
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="80vw"
                />
              </div>
            )}
            <div className="lightbox-info">
              <span className="category-badge">{selectedItem.category}</span>
              <h3>{selectedItem.title}</h3>
              <div className="details">
                <span>
                  <MapPin size={16} />
                  {selectedItem.location}
                </span>
                <span>
                  <Calendar size={16} />
                  {selectedItem.year}
                </span>
                {selectedItem.type === "video" && (
                  <span>
                    <Video size={16} />
                    Video
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}