'use client';
import React from 'react';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';

const resumeTips = [
    {
      title: '📄 Keep it concise',
      description: 'As a fresher or early-career professional, your resume should be no longer than one page. Focus only on your most relevant skills, academic achievements, and experiences that showcase your value. Example: "Final-year CSE student with top 5% GPA and React project selected for Code for Good Hackathon."',
      color: '#5196fd',
    },
    {
      title: '🎯 Tailor your resume',
      description: 'Customize your resume for each job application. Align your experiences, skills, and projects with the specific requirements of the role you\'re applying for to stand out from the competition. Example: Highlight "MongoDB and TypeScript" for a full-stack role if the JD mentions it clearly.',
      color: '#fd521a',
    },
    // {
    //   title: '📊 Use numbers',
    //   description: `Quantify your impact wherever possible. Instead of saying "Improved sales", say "Increased monthly sales by 30%" — numbers provide clarity and credibility to your achievements.`,
    //   color: '#13006c',
    // },
    // {
    //   title: '💬 Start with action verbs',
    //   description: 'Use powerful action verbs like "Led", "Developed", "Built", or "Optimized" to describe your work. This adds energy to your statements and clearly shows what you\'ve contributed.',
    //   color: '#ed649e',
    // },
    // {
    //   title: '🎨 Keep it consistent',
    //   description: `Use a clean and consistent layout with uniform fonts, spacing, and section headings. Avoid using too many colors or design elements that distract from the content.`,
    //   color: '#fd521a',
    // },
    {
      title: '🧠 Prioritize top skills',
      description: `Highlight your strongest and most job-relevant skills at the top of your resume. This ensures recruiters see your key strengths within the first few seconds of reading. Example: "React, Tailwind, Firebase, Supabase" listed in bold at the top of your skills section.`,
      color: '#4CAF50',
    },
    {
      title: '📍 Mention location',
      description: `Always include your current location and your willingness to relocate or work remotely. This makes it easier for recruiters to evaluate your suitability for on-site, hybrid, or remote roles. Example: "Mumbai, India | Open to remote and relocation" right under your name in the header.`,
      color: '#FF9800',
    },
    {
      title: '⚡ Focus on achievements',
      description: 'Don\'t just list job duties — showcase what you achieved in each role. For example, "Redesigned onboarding process, reducing new hire ramp-up time by 40%" shows measurable impact. Example: "Built resume builder used by 500+ students; improved project submission rate by 70%."',
      color:'#9C27B0' ,
    },
  ];
  

const ResumeTipsScroll: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-black' ref={container}>
        {/* Intro Section */}
        <section className='text-white h-[17vh] w-full bg-slate-950 flex items-end justify-center relative pb-0'>
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] bg-[size:74px_74px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
          <h1 className='2xl:text-7xl sm:text-3xl md:text-5xl lg:text-4xl px-4 md:px-8 font-semibold text-center tracking-tight leading-snug'>
          Recruiters decide in 6 seconds—make it count.
          </h1>
        </section>

        {/* Scrollable Tips */}
        <section className='text-white w-full bg-slate-950'>
          {resumeTips.map((tip, i) => {
            const targetScale = 1 - (resumeTips.length - i) * 0.03;
            return (
              <Card
                key={`tip_${i}`}
                i={i}
                title={tip.title}
                description={tip.description}
                color={tip.color}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        
        
      </main>
    </ReactLenis>
  );
};

export default ResumeTipsScroll;

interface CardProps {
  i: number;
  title: string;
  description: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  // Split description and example if present
  let mainDesc = description;
  let example = '';
  // Look for 'For example,' or quoted example
  const exampleMatch = description.match(/(.+?)(?: For example,| Example:| e\.g\.,)?\s*(["“][^"”]+["”].*)?$/i);
  if (exampleMatch) {
    mainDesc = exampleMatch[1].trim();
    if (exampleMatch[2]) {
      example = exampleMatch[2].trim();
    }
  }

  return (
    <div
      ref={container}
      className='h-screen flex items-start justify-center sticky top-0 pt-24'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className='flex flex-col md:flex-row items-center justify-center md:justify-between relative h-auto min-h-[400px] md:h-[400px] w-[90%] max-w-7xl rounded-2xl p-6 md:p-12 origin-top shadow-lg'
      >
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center md:text-left w-full md:w-1/2 mb-6 md:mb-0'>{title}</h2>
        <div className='w-full md:w-1/2 text-center md:text-right'>
             <p className='text-base md:text-lg lg:text-xl text-white leading-relaxed'>{mainDesc}</p>
             {example && (
                 <p className='text-sm md:text-base text-blue-100 italic mt-4'>
                     <span className='font-bold not-italic text-blue-200'>Example:</span> {example}
                 </p>
             )}
         </div>
      </motion.div>
    </div>
  );
};
