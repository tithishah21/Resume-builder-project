import React from 'react';
import SpotlightCard from './spotlightcard';
// import { RxLightningBolt } from "react-icons/rx";

function features() {
  return (
    <section className='bg-gray-900/50 w-full h-[48vw]'>
    <div className='pt-20 text-white font-semibold text-5xl text-center leading-tight'>Why Choose ResumeBuilder Pro?</div>
    <div className='pt-6 text-white font-medium text-3xl text-center leading-tight mb-12'>Let's explore the features...</div>
    <div className='flex flex-row justify-evenly'>
        <div>
        <SpotlightCard className="w-[25vw] h-[25vw] bg-gray-800/50 border-gray-700" spotlightColor="rgba(253, 216, 53, 1)">
            <div className="w-[5vw] h-[5vw] bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg"></div>
            <div className='text-2xl font-semibold my-10 leading-tight'>Lightning Fast</div>
            <div className='text-lg'>Create professional resumes in minutes, not hours. The streamlined process gets you results quickly.</div>
        </SpotlightCard>
        </div>
        <div>
        <SpotlightCard className="w-[25vw] h-[25vw] bg-gray-800/50 border-gray-700" spotlightColor="rgba(67, 160, 71, 1)">
            <div className="w-[5vw] h-[5vw] bg-gradient-to-r from-lime-400 to-green-700 rounded-lg"></div>
            <div className='text-2xl font-semibold my-10 leading-tight'>ATS Optimized</div>
            <div className='text-lg'>All templates are designed to pass Applicant Tracking Systems such that they get noticed by recruiters, thereby maxiizing your interview chances.</div>
        </SpotlightCard>
        </div>
        <div>
        <SpotlightCard className="w-[25vw] h-[25vw] bg-gray-800/50 border-gray-700" spotlightColor="rgba(213, 30, 99, 1)">
        <div className="w-[5vw] h-[5vw] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg"></div>
            <div className='text-2xl font-semibold my-10 leading-tight'>Export to PDFs</div>
            <div className='text-lg'>Export your resumes to PDFs quickly..</div>
        </SpotlightCard>
        </div>
    </div>
    </section>
  )
}

export default features
