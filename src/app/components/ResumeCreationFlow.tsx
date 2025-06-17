'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const templates = [
  { src: '/modern.png', name: 'Modern Professional' },
  { src: '/genz.png', name: 'Vibrant & Expressive' },
  { src: '/classic.png', name: 'Classic Corporate' },
  { src: '/tech.png', name: 'Tech Minimalist' }
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
    <section className="relative py-24 px-6 bg-gray-950 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Text + CTA */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Explore Our <span className="text-green-400">Winning Templates</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Choose from our expertly designed resume templates to stand out and land your dream job.
          </p>
          <button
            onClick={() => router.push('/resumedetails')}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 transition-all font-bold text-lg rounded-full"
          >
            Get Started - Build Your Future!
          </button>
        </div>

        {/* Right Template Preview (NO extra padding now) */}
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
          <img
            src={template.src}
            alt={template.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/250x350/2f2f2f/cccccc?text=Template';
            }}
          />
        </div>
      ))}

        </div>
      </div>
    </section>
  );
};

export default ResumeCreationFlow;
