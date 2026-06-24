"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Premium Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 transition-all duration-300">

        {/* Green accent gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#7CEB1D] via-[#a8f05a] to-[#5ec70a]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[82px] flex items-center justify-between gap-4">

            {/* Logo - left */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="relative w-[180px] h-[50px] md:w-[90px] md:h-[80px]">
                <Image
                  src="/logo.jpeg"
                  alt="Latitude Constructions"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation - center */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {menus.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`
                      relative text-[15px] font-semibold tracking-wide transition-all duration-300
                      ${isActive ? "text-[#7CEB1D]" : "text-[#041423]"}
                      hover:text-[#7CEB1D]
                      after:absolute after:left-0 after:-bottom-2 after:h-[2.5px] after:rounded-full
                      after:bg-[#7CEB1D] after:transition-all after:duration-300
                      ${isActive ? "after:w-full" : "after:w-0"}
                      hover:after:w-full
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={26} className="text-[#041423]" />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu - premium light theme */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[300px] bg-white/95 backdrop-blur-xl shadow-2xl z-[999]
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Green accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#7CEB1D] via-[#a8f05a] to-[#5ec70a]"></div>

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <span className="text-xl font-bold text-[#041423]">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={28} className="text-[#041423]" />
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col p-6 gap-4">
          {menus.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  text-lg font-medium transition-colors duration-200
                  ${isActive ? "text-[#7CEB1D]" : "text-[#041423]"}
                  hover:text-[#7CEB1D]
                  py-2 border-b border-gray-50
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}