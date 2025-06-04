"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GooeyNav from "./gooeynavbar";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const items = [
    { label: "Home", to: "" },
    { label: "Features", to: "features" },
    { label: "Templates", to: "templates" },
    { label: "About Me", to: "about" },
  ];

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
          <h1 className="text-xl font-semibold text-white mx-2">ResumeBuilder Pro</h1>

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
          <h1 className="text-2xl lg:text-3xl font-semibold text-white">
            ResumeBuilder Pro
          </h1>

          {/* GooeyNav */}
          <div style={{ position: "relative" }}>
            <GooeyNav
              items={items.map((item) => ({
                label: item.label,
                href: `#${item.to}`,
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
          {items.map((item) => (
            <ScrollLink
              key={item.label}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="block text-cyan-400 font-medium hover:text-white cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </ScrollLink>
          ))}
          <button
            onClick={() => {
              router.push("/signin");
              setMenuOpen(false);
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
