"use client"
import React, { useRef } from 'react';
import VariableProximity from '../components/variable_proximity';
import { Roboto_Flex } from 'next/font/google';
import Image from 'next/image';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
});

function About() {
  const containerRef = useRef(null);

  return (
    <section className="bg-gradient-to-br from-blue-900/20 via-gray-950 to-cyan-900/20 h-[180vw] lg:h-[55vw] w-full px-10 scroll-mt-24" id="about">
      <div
        ref={containerRef}
        style={{ position: 'relative' ,fontSize:'8vw',fontWeight:'bolder', color:'#f8fafc'}}
        className={roboto.className}
      >
        <VariableProximity
          label={'About Me'}
          className="variable-proximity-demo"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
        </div>
        <div className='flex flex-row gap-20'>
          <div>
            <Image
              src="/tithi.jpg"
              alt="profile"
              width={900}
              height={900}
              className="rounded-xl drop-shadow-2xl"
            />
            <div className='mt-5 text-center text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent'>Tithi Shah</div>
          </div>
            <div className='text-lg font-semibold'>
          {`Deeply passionate about harnessing technology to solve real-world problems, I'm a Computer Science student at VIT Vellore currently working as a Software Development Engineer Intern at Intelivita Private Limited, where I build scalable web applications using React, Node.js, Express.js, TypeScript, Next.js, and Firebase.
          
        As the Senior Core Member at IEEE-CS VIT, I've developed the Hackbattle and ARCS websites along with other members and am currently crafting the most impressive frontend for the VIMAANAS (Aero Design Team at VIT) website. My journey has been a blend of innovation and collaboration, where I've also contributed as a Tech Panelist for Hackbattle(Hackathon at VIT), reviewing groundbreaking projects and interacting with brilliant minds during the 36-hour hackathon.

        I'm proud to share that my team won a hackathon with our project PrepMate, a powerful prep tool designed to assist VIT students in exam preparation. PrepMate combines an intuitive and user-friendly frontend with cutting-edge RAG (Retrieval-Augmented Generation) technology, delivering personalized and efficient study experiences.

        Alongside web development, I've built a solid foundation in C, C++, Java, JavaScript, Python, and Object-Oriented Programming (OOPs) concepts, enabling me to write efficient, maintainable code across diverse projects. I also actively sharpen my problem-solving skills by tackling DSA challenges on LeetCode.

        I'm currently diving deep into the world of AI/ML, exploring tools like TensorFlow, Scikit-learn, MLFlow, and Matplotlib to build intelligent solutions.

        I'm excited to continue expanding my technical horizon, embracing new challenges, and contributing to impactful tech solutions. Let's connect!`}
        </div>

        </div>
      
    </section>
  );
}

export default About;
