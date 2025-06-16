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
    { label: "Home", type: "scroll", href: "/", targetId: "hero-section" },
    { label: "Features", type: "scroll", targetId: "features-section", href: "#features-section" },
    { label: "Steps", type: "scroll", targetId: "creation-flow", href: "#creation-flow" },
    { label: "Templates", type: "route", path: "/templates", href: "/templates" }, // Full path for external page
  ];

  // Helper function for handling clicks on navigation items for mobile menu and logo
  const handleNavItemClick = (item: NavItem) => {
    setMenuOpen(false); // Close mobile menu on click

    if (item.type === "route" && item.path) {
      router.push(item.path); // Navigate to a different page
    }
    // For scroll links, react-scroll's Link component handles it automatically
  };

  return (
    <div className="sticky top-0 z-50 bg-black" id="header">
      <div className="bg-gray-900 py-6 border-b border-slate-800 flex justify-between items-center px-4 lg:px-9">
        {/* Mobile: Hamburger + Logo + Sign Up */}
        <div className="lg:hidden flex items-center justify-start w-full">
          {/* Left: Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-400 font-extrabold">
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Center: Logo */}
          {/* Make logo clickable to home/top of page using ScrollLink */}
          <ScrollLink
            to="hero-section" // Remove String() wrapper - react-scroll accepts string directly
            smooth={true}
            duration={500}
            offset={-70} // Adjust offset if your header height changes
            className="text-xl font-semibold text-white mx-2 cursor-pointer"
            onClick={() => setMenuOpen(false)} // Close menu on logo click
          >
            ResumeBuilder Pro
          </ScrollLink>

          {/* Right: Sign Up */}
          <button
            onClick={() => router.push("/signup")}
            className="mx-4 rounded-lg px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow hover:from-blue-700 hover:to-cyan-600 transition-all"
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
                href: item.href, // GooeyNav will use this href for navigation
                // IMPORTANT: Removed onClick from GooeyNav item mapping as it seems not supported
                // GooeyNav will navigate based on the href provided.
                // For 'Templates' (route type), it will navigate directly to /templates.
                // For scroll types, it will navigate to the #hash.
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

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-800 border-t border-slate-700 px-6 pb-4 space-y-4">
          {navItems.map((item) =>
            item.type === "scroll" ? (
              <ScrollLink
                key={item.label}
                to={item.targetId || ""} // Provide fallback empty string if targetId is undefined
                smooth={true}
                duration={500}
                offset={-70} // Adjust offset if your header height changes
                className="block text-cyan-400 font-medium hover:text-white cursor-pointer py-2" // Added py-2 for better touch target
                onClick={() => handleNavItemClick(item)} // Pass item to close menu
              >
                {item.label}
              </ScrollLink>
            ) : (
              <button // Use a regular button for route navigation in mobile menu
                key={item.label}
                onClick={() => handleNavItemClick(item)} // Handle direct route navigation
                className="w-full text-left block text-cyan-400 font-medium hover:text-white cursor-pointer py-2" // Added py-2 for better touch target
              >
                {item.label}
              </button>
            )
          )}
          <button
            onClick={() => {
              router.push("/signin");
              setMenuOpen(false); // Close menu after navigation
            }}
            className="w-full text-left border border-cyan-400 text-cyan-400 hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition-all"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;