'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegHandPointRight } from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { RiFileSearchLine } from 'react-icons/ri';
import Image from 'next/image';

const templates = [
  { src: '/modern.png', name: 'Modern Professional' },
  { src: '/genz.png', name: 'Vibrant & Expressive' },
  { src: '/classic.png', name: 'Classic Corporate' },
  { src: '/tech.png', name: 'Tech Minimalist' }
];

const steps = [
  {
    title: 'Enter Your Details',
    description: 'Fill in your personal, educational, and professional information.',
    icon: <HiOutlineUserCircle />,
  },
  {
    title: 'Choose a Template',
    description: 'Pick a design that matches your professional style.',
    icon: <IoDocumentTextOutline />,
  },
  {
    title: 'Customize',
    description: 'Tailor your resume with skills, achievements, and languages.',
    icon: <MdOutlineWorkOutline />,
  },
  {
    title: 'Download or Share',
    description: 'Download your resume or share it with a link.',
    icon: <RiFileSearchLine />,
  },
];

const ResumeCreationFlow = () => {
  const router = useRouter();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const cards = cardRefs.current;
      if (!cards.length) return;

      const next = (current + 1) % cards.length;
      const currentCard = cards[current];
      const nextCard = cards[next];

      if (currentCard && nextCard) {
        currentCard.style.zIndex = "0";
        currentCard.style.opacity = "0";
        nextCard.style.zIndex = "1";
        nextCard.style.opacity = "1";
      }

      current = next;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* === Steps Section === */}
      <section id="creation-flow" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 overflow-hidden text-white">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Impress Potential Employers with Your <span className="text-purple-500">Resume</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Follow our step-by-step professional guidance to create a polished resume in minutes, not hours.
            </p>
            <button
              onClick={() => router.push('/templates')}
              className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Create Your Resume Now
            </button>
          </div>

          <div className="bg-blue-100 bg-opacity-10 rounded-lg p-5 mb-16 flex items-center justify-center space-x-3 shadow-md border border-blue-500/30 text-center">
            <FaRegHandPointRight className="text-blue-400 text-2xl animate-pulse" />
            <p className="text-base sm:text-lg text-white font-semibold">
              <span className="text-cyan-300">99% of our users</span> rate their experience positively!
              <span className="block text-xs sm:text-sm text-gray-400 mt-1">*Based on internal user surveys and success stories.</span>
            </p>
          </div>

          <h3 className="text-3xl sm:text-3xl font-extrabold text-center text-white mb-12 mt-20">
            Your Resume, In Just <span className="text-cyan-400">4 Simple Steps</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-blue-500 group md:hover:scale-110 hover:border-gray-700 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-3 -mt-2 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold text-3xl rounded-full flex items-center justify-center shadow-md border-2 border-gray-900 z-10">
                  {index + 1}
                </div>
                <div className="text-5xl mb-6 p-4 rounded-full border-2 border-transparent bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-xl">
                  {step.icon}
                </div>
                <h4 className="text-2xl font-semibold text-white mb-4">{step.title}</h4>
                <p className="text-lg text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Your Existing Template Section === */}
      <section className="relative mb-5 py-5 px-6 bg-gray-950 overflow-hidden text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-11 items-center">
          {/* Left Text + CTA */}
          <div>
            <h2 className="text-4xl sm:text-4xl md:text-6xl font-extrabold mb-12 leading-tight">
              Explore Our <span className="text-green-400">Winning Templates</span>
            </h2>
            <p className="text-lg text-gray-300 mb-0 md:mb-32">
              Choose from our expertly designed resume templates to stand out and land your dream job.
            </p>
            <button
              onClick={() => router.push('/signup')}
              className="px-8 py-4 mb-10 md:mb-56 bg-green-500 hover:bg-green-600 transition-all font-bold text-lg rounded-full hidden md:inline-block"
            >
              Get Started - Build Your Future!
            </button>
          </div>

          {/* Right Template Preview - Desktop only */}
          <div className="relative w-full h-[820px]">
            {templates.map((template, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out rounded-lg overflow-hidden"
                style={{
                  zIndex: index === 0 ? 1 : 0,
                  opacity: index === 0 ? 1 : 0,
                }}
                onClick={() => router.push(`/templates?selected=${template.name}`)}
              >
                <Image
                  src={template.src}
                  alt={template.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/250x350/2f2f2f/cccccc?text=Template';
                  }}
                />
              </div>
            ))}
          </div>
          {/* Mobile: Green button below animation */}
          <button
            onClick={() => router.push('/signup')}
            className="px-8 py-4 mt-8 bg-green-500 hover:bg-green-600 transition-all font-bold text-lg rounded-full w-full md:hidden"
          >
            Get Started - Build Your Future!
          </button>
        </div>
      </section>
    </>
  );
};

export default ResumeCreationFlow;
