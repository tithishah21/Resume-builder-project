'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Assuming you use Image component for the landing image
import Header from './components/header';
import Footer from './components/footer';
import Features from './features/page';
// import About from './about/page'; // REMOVED: No longer needed

// Import the new combined section component
import ResumeCreationFlow from './components/ResumeCreationFlow';


export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />

      {/* Landing Section (Hero) */}
      <section id='hero-section' className="bg-gradient-to-br from-blue-900/20 via-gray-950 to-cyan-900/20 h-[180vw] lg:h-[48vw] w-full px-10 z-10 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-10 max-w-9xl w-full">
          <div className="mt-28 lg:mt-0 flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="font-extrabold text-5xl sm:text-7xl lg:text-[5.6rem] leading-tight text-white">Build Your</div>
            <div className="font-extrabold text-5xl sm:text-7xl lg:text-[5.6rem] bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent mt-2 mb-4">
              Dream Resume
            </div>
            <div className="mt-8 text-lg sm:text-2xl lg:text-[2rem] font-medium text-gray-300 max-w-2xl mb-4">
              Build, edit, and export resumes effortlessly using
              
              professional &amp; sleek templates designed for you.
            </div>
            <button
              onClick={() => router.push('/signup')}
              className="mt-12 py-3 px-8 sm:py-4 sm:px-16 lg:px-52 rounded-lg text-xl sm:text-3xl leading-tight bg-gradient-to-r from-blue-800 to-cyan-400 font-semibold hover:from-blue-900 hover:to-cyan-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              Let&apos;s Get Started
            </button>
          </div>

          {/* Right side image */}
          <div className="mt-10 lg:mt-24 flex-1 flex justify-center lg:justify-end items-center">
            <Image
              src="/resume.png" // Ensure this path is correct in your public folder
              alt="Resume Illustration"
              width={500}
              height={600}
              className="rounded-xl drop-shadow-2xl max-w-[80%] h-auto lg:max-w-full" // Responsive adjustments
              priority
            />
          </div>
        </div>
      </section>

      <Features />

      {/* --- NEW SECTION ADDED HERE --- */}
      <ResumeCreationFlow />

      <Footer />
    </>
  );
}
