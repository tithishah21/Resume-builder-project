'use client';
import React from 'react';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';

const resumeTips = [
    {
      title: '📄 Keep it concise',
      description: 'As a fresher or early-career professional, your resume should be no longer than one page. Focus only on your most relevant skills, academic achievements, and experiences that showcase your value.',
      color: '#5196fd',
    },
    {
      title: '🎯 Tailor your resume',
      description: 'Customize your resume for each job application. Align your experiences, skills, and projects with the specific requirements of the role you\'re applying for to stand out from the competition.',
      color: '#8f89ff',
    },
    {
      title: '📊 Use numbers',
      description: `Quantify your impact wherever possible. Instead of saying "Improved sales", say "Increased monthly sales by 30%" — numbers provide clarity and credibility to your achievements.`,
      color: '#13006c',
    },
    {
      title: '💬 Start with action verbs',
      description: 'Use powerful action verbs like "Led", "Developed", "Built", or "Optimized" to describe your work. This adds energy to your statements and clearly shows what you\'ve contributed.',
      color: '#ed649e',
    },
    {
      title: '🎨 Keep it consistent',
      description: `Use a clean and consistent layout with uniform fonts, spacing, and section headings. Avoid using too many colors or design elements that distract from the content.`,
      color: '#fd521a',
    },
    {
      title: '🧠 Prioritize top skills',
      description: `Highlight your strongest and most job-relevant skills at the top of your resume. This ensures recruiters see your key strengths within the first few seconds of reading.`,
      color: '#4CAF50',
    },
    {
      title: '📍 Mention location',
      description: `Always include your current location and your willingness to relocate or work remotely. This makes it easier for recruiters to evaluate your suitability for on-site, hybrid, or remote roles.`,
      color: '#9C27B0',
    },
    {
      title: '⚡ Focus on achievements',
      description: 'Don\'t just list job duties — showcase what you achieved in each role. For example, "Redesigned onboarding process, reducing new hire ramp-up time by 40%" shows measurable impact.',
      color: '#FF9800',
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
        <section className='text-white h-[13vh] w-full bg-slate-950 flex items-end justify-center relative pb-0'>
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
          <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[20%]'>
            Pro Tips to Build a Resume That Stands Out 🚀
          </h1>
        </section>

        {/* Scrollable Tips */}
        <section className='text-white w-full bg-slate-950'>
          {resumeTips.map((tip, i) => {
            const targetScale = 1 - (resumeTips.length - i) * 0.01;
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

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 15}px)`,
        }}
        className='flex flex-row items-center justify-between relative -top-[10%] h-[300px] w-[75%] rounded-lg p-10 origin-top shadow-lg'
      >
        <h2 className='text-5xl font-bold text-white text-left w-1/2'>{title}</h2>
        <p className='text-lg text-white text-right w-1/2'>{description}</p>
      </motion.div>
    </div>
  );
};
