'use client';

import { useRouter } from 'next/navigation';
import Header from './components/header';
import Footer from './components/footer';
import Image from 'next/image';
import Features from './features/page';
import About from './about/page';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />

      {/* Landing Section */}
      <section className="bg-gradient-to-br from-blue-900/20 via-gray-950 to-cyan-900/20 h-[180vw] lg:h-[48vw] w-full px-10 z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="mt-28">
            <div className="font-extrabold text-8xl leading-tight">Build Your</div>
            <div className="font-extrabold text-8xl bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent">
              Dream Resume
            </div>
            <div className="mt-12 text-[2rem] font-medium">
              Build, edit, and export resumes effortlessly using
              <br />
              professional &amp; sleek templates designed for you.
            </div>
            <button
              onClick={() => router.push('/signup')}
              className="mt-14 py-4 px-16 lg:px-60 rounded-lg text-3xl leading-tight bg-gradient-to-r from-blue-800 to-cyan-400 font-semibold hover:from-blue-900 hover:to-cyan-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              Let&apos;s Get Started
            </button>
          </div>

          {/* Right side image */}
          <div className="ml-10 mt-24 hidden lg:block">
            <Image
              src="/resume.png"
              alt="Resume Illustration"
              width={500}
              height={600}
              className="rounded-xl drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <Features />
      <About />
      <Footer />
    </>
  );
}
