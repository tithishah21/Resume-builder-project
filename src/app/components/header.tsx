"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import GooeyNav from './gooeynavbar';

function header() {
    const items = [
        { label: "Home", href: "" },
        { label: "Features", href: "#features" },
        { label: "Templates", href: "#" },
        { label: "About Me", href: "#contact" },
      ];
      const router = useRouter();
  return (
    <div className='sticky top-0 z-50 bg-black' id="header">
      <div className="bg-gray-900 py-10 border-b border-slate-800 flex flex-col lg:flex-row justify-between items-center top-0 " >
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
          <button 
          onClick={() => router.push('/signup')}
          className="rounded-lg px-7 py-[0.6rem] font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default header
