"use client";
import { useRouter } from 'next/navigation';
import LandingPage from "./components/landingpage";
import GooeyNav from './components/gooeynavbar';

export default function Home() {
  const router = useRouter();

  const items = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "Templates", href: "#" },
    { label: "About Me", href: "#" },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="bg-gray-900 py-10 border-b border-slate-800 flex flex-col lg:flex-row justify-between items-center top-0 sticky z-50" id="header">
        <div className="mb-0 lg:pl-9">
          <h1 className="text-2xl lg:text-3xl font-semibold text-white">
            ResumeBuilder Pro
          </h1>
        </div>
        <div style={{ position: 'relative' }}>
          <GooeyNav
            items={items}
            particleCount={10}
            particleDistances={[60, 10]}
            particleR={300}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
        <div className="flex flex-row gap-5 pr-9 justify-center items-center">
          <button
            onClick={() => router.push('/signin')}
            className="border-[0.1rem] rounded-lg px-7 py-[0.6rem] font-bold :bg-gray-800 border-cyan-400 text-cyan-400 hover:bg-slate-800 transition-all duration-200"
          >
            Sign In
          </button>
          <button className="rounded-lg px-7 py-[0.6rem] font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
            Sign Up
          </button>
        </div>
      </div>

      <LandingPage />

      {/* Footer */}
      <footer className="py-10 bg-gray-900 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center lg:px-9">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-semibold text-white">
            ResumeBuilder Pro
          </h1>
        </div>
        <div className="text-base lg:text-lg text-gray-400">
          © 2025 ResumeBuilder Pro. All rights reserved.
        </div>
      </footer>
    </>
  );
}
