'use client';
import React from 'react';
import SpotlightCard from '../components/spotlightcard';
import { RxLightningBolt } from 'react-icons/rx';
import { MdOutlineShield } from 'react-icons/md';
import { FaRegFilePdf } from 'react-icons/fa6';
import { FaRobot } from 'react-icons/fa';

function Features() {
  return (
    <section className="bg-black w-full min-h-[50vw] scroll-mt-24" id="features-section">
      <div className="pt-20 text-white font-semibold text-3xl sm:text-4xl md:text-5xl text-center leading-tight">
        Why Choose ResumeBuilder Pro?
      </div>
      <div className="pt-6 text-white font-medium text-lg sm:text-2xl md:text-3xl text-center leading-tight mb-8 md:mb-14">
        Let&apos;s explore the features...
      </div>

      <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 md:gap-0 pb-5 text-white">
        {/* Lightning Fast */}
        <div>
          <SpotlightCard
            className="w-full max-w-xs md:w-[25vw] md:h-[27vw]"
            spotlightColor="rgba(253, 216, 53, 1)"
          >
            <div className="w-16 h-16 md:w-[5vw] md:h-[5vw] bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex justify-center items-center">
              <RxLightningBolt size={40} />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-semibold my-6 md:my-10 leading-tight">Lightning Fast</div>
            <div className="text-base sm:text-lg">
              Create professional resumes in minutes, not hours. The streamlined process gets you
              results quickly.
            </div>
          </SpotlightCard>
        </div>

        {/* ATS Optimized */}
        <div>
          <SpotlightCard
            className="w-full max-w-xs md:w-[25vw] md:h-[27vw]"
            spotlightColor="rgba(67, 160, 71, 1)"
          >
            <div className="w-16 h-16 md:w-[5vw] md:h-[5vw] bg-gradient-to-r from-lime-400 to-green-700 rounded-lg flex justify-center items-center">
              <MdOutlineShield size={40} />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-semibold my-6 md:my-10 leading-tight">ATS Optimized</div>
            <div className="text-base sm:text-lg">
              All templates are designed to pass Applicant Tracking Systems so they get noticed by
              recruiters, maximizing your chances of getting an interview.
            </div>
          </SpotlightCard>
        </div>

        {/* Export to PDFs */}
        <div>
          <SpotlightCard
            className="w-full max-w-xs md:w-[25vw] md:h-[27vw]"
            spotlightColor="rgba(213, 30, 99, 1)"
          >
            <div className="w-16 h-16 md:w-[5vw] md:h-[5vw] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex justify-center items-center">
              <FaRegFilePdf size={40} />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-semibold my-6 md:my-10 leading-tight">Export to PDFs</div>
            <div className="text-base sm:text-lg">Export your resumes to professional-looking PDF files with a single click.</div>
          </SpotlightCard>
        </div>

        {/* AI Interview Prep */}
        <div>
          <SpotlightCard
            className="w-full max-w-xs md:w-[25vw] md:h-[27vw]"
            spotlightColor="rgba(0, 123, 255, 1)" // blue
          >
            <div className="w-16 h-16 md:w-[5vw] md:h-[5vw] bg-gradient-to-r from-cyan-400 to-blue-700 rounded-lg flex justify-center items-center">
              <FaRobot size={40} />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-semibold my-6 md:my-10 leading-tight">
              AI Interview Prep
            </div>
            <div className="text-base sm:text-lg">
              Practice real interview questions with an AI-powered coach. Get instant feedback and tailored questions to help you ace your next interview!
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default Features;
