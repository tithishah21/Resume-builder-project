"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GooeyNav from "./gooeynavbar"; // Assuming this is your custom GooeyNav component
import { Link as ScrollLink } from "react-scroll"; // Renamed to avoid conflict with next/link if you were using it
import { Menu, X } from "lucide-react";

// Define the navigation item type
interface NavItem {
  label: string;
  type: "scroll" | "route";
  href: string;
  targetId?: string;
  path?: string;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Define navigation items with their type (scroll or route)
  // GooeyNav will only receive 'label' and 'href'
  const navItems: NavItem[] = [
    { label: "Home", type: "scroll", href: "#hero-section", targetId: "hero-section" },
    { label: "Features", type: "scroll", targetId: "features-section", href: "#features-section" },
    { label: "Steps", type: "scroll", targetId: "creation-flow", href: "#creation-flow" },
    { label: "Templates", type: "route", path: "/templates", href: "/templates" }, // Full path for external page
  ];

  // Helper function for smooth scrolling
  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 70; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Helper function for handling clicks on navigation items for mobile menu and logo
  const handleNavItemClick = (item: NavItem) => {
    setMenuOpen(false); // Close mobile menu on click

    if (item.type === "route" && item.path) {
      router.push(item.path); // Navigate to a different page
    } else if (item.type === "scroll" && item.targetId) {
      smoothScrollTo(item.targetId); // Use custom smooth scroll
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-black" id="header">
      <div className="bg-gray-900 py-6 border-b border-slate-800 flex justify-between items-center px-4 lg:px-9">
        {/* Mobile: Hamburger + Logo + Sign Up */}
        <div className="lg:hidden flex items-center justify-start w-full">
          {/* Left: Animated Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-10 h-10 flex items-center justify-center focus:outline-none group"
            aria-label="Toggle menu"
          >
            {/* Hamburger icon animation */}
            <span className="absolute block w-7 h-0.5 bg-cyan-400 rounded transition-all duration-300 ease-in-out group-hover:bg-cyan-300"
              style={{ top: menuOpen ? '20px' : '14px', transform: menuOpen ? 'rotate(45deg)' : 'none' }}
            ></span>
            <span className={`absolute block w-7 h-0.5 bg-cyan-400 rounded transition-all duration-300 ease-in-out group-hover:bg-cyan-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ top: '20px' }}
            ></span>
            <span className="absolute block w-7 h-0.5 bg-cyan-400 rounded transition-all duration-300 ease-in-out group-hover:bg-cyan-300"
              style={{ top: menuOpen ? '20px' : '26px', transform: menuOpen ? 'rotate(-45deg)' : 'none' }}
            ></span>
          </button>

          {/* Center: Logo */}
          <ScrollLink
            to="hero-section"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-xl font-semibold text-white mx-2 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            ResumeBuilder Pro
          </ScrollLink>

          {/* Right: Sign Up */}
          <button
            onClick={() => router.push("/signup")}
            className="mx-8 rounded-lg px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow hover:from-blue-700 hover:to-cyan-600 transition-all"
          >
            Sign Up
          </button>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex w-full justify-between items-center">
          {/* Logo */}
          {/* Make logo clickable to home/top of page using ScrollLink */}
          <ScrollLink
            to="hero-section" // Remove String() wrapper - react-scroll accepts string directly
            smooth={true}
            duration={500}
            offset={-70} // Adjust offset if your header height changes
            className="text-2xl lg:text-3xl font-semibold text-white cursor-pointer"
            onClick={() => setMenuOpen(false)} // Close menu (though not visible on desktop)
          >
            ResumeBuilder Pro
          </ScrollLink>

          {/* GooeyNav */}
          <div style={{ position: "relative" }}>
            <GooeyNav
              items={navItems.map((item) => ({
                label: item.label,
                href: item.href,
                onClick: () => handleNavItemClick(item), // Pass the onClick handler
              }))}
              particleCount={10}
              particleDistances={[60, 10]}
              particleR={300}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Desktop Buttons */}
          <div className="flex flex-row gap-5 justify-center items-center">
            <button
              onClick={() => router.push("/signin")}
              className="border-[0.1rem] rounded-lg px-7 py-[0.6rem] font-bold border-cyan-400 text-cyan-400 hover:bg-slate-800 transition-all duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="rounded-lg px-7 py-[0.6rem] font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown + Overlay */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          ></div>
          {/* Dropdown */}
          <div
            className="fixed top-20 left-0 right-0 z-50 w-full rounded-none sm:rounded-2xl shadow-2xl bg-gray-800 border border-slate-700 px-6 pb-4 pt-4 space-y-4 animate-slideDownFadeIn sm:left-1/2 sm:-translate-x-1/2 sm:w-[90vw] sm:max-w-sm"
            style={{ minHeight: '220px' }}
          >
            {navItems.map((item, idx) =>
              item.type === "scroll" ? (
                <React.Fragment key={item.label}>
                  <ScrollLink
                    to={item.targetId || ""}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className={`block text-cyan-400 font-medium hover:text-white cursor-pointer py-2 transition-all duration-300 opacity-0 animate-fadeInMenuItem`}
                    style={{ animationDelay: `${0.1 + idx * 0.07}s` }}
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item.label}
                  </ScrollLink>
                  {idx < navItems.length - 1 && (
                    <div className="border-b border-slate-600 w-full my-1" />
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment key={item.label}>
                  <button
                    onClick={() => handleNavItemClick(item)}
                    className={`w-full text-left block text-cyan-400 font-medium hover:text-white cursor-pointer py-2 transition-all duration-300 opacity-0 animate-fadeInMenuItem`}
                    style={{ animationDelay: `${0.1 + idx * 0.07}s` }}
                  >
                    {item.label}
                  </button>
                  {idx < navItems.length - 1 && (
                    <div className="border-b border-slate-600 w-full my-1" />
                  )}
                </React.Fragment>
              )
            )}
            <button
              onClick={() => {
                router.push("/signin");
                setMenuOpen(false);
              }}
              className="w-full text-left border border-cyan-400 text-cyan-400 hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition-all opacity-0 animate-fadeInMenuItem"
              style={{ animationDelay: `${0.1 + navItems.length * 0.07}s` }}
            >
              Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Tailwind custom animations (add to your global CSS if not present)
// @layer utilities {
//   @keyframes slideDownFadeIn {
//     0% { opacity: 0; transform: translateY(-20px) scale(0.98); }
//     100% { opacity: 1; transform: translateY(0) scale(1); }
//   }
//   .animate-slideDownFadeIn {
//     animation: slideDownFadeIn 0.35s cubic-bezier(0.4,0,0.2,1) both;
//   }
//   @keyframes fadeInMenuItem {
//     0% { opacity: 0; transform: translateY(10px); }
//     100% { opacity: 1; transform: translateY(0); }
//   }
//   .animate-fadeInMenuItem {
//     animation: fadeInMenuItem 0.4s cubic-bezier(0.4,0,0.2,1) both;
//   }
// }

export default Header;