import React from 'react';
import SpotlightCard from '../components/spotlightcard';
import { RxLightningBolt } from "react-icons/rx";
import { MdOutlineShield } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";

function features() {
  return (
    <section className='bg-gray-900/50 w-full h-[50vw] scroll-mt-24' id="features">
    <div className='pt-20 text-white font-semibold text-5xl text-center leading-tight'>Why Choose ResumeBuilder Pro?</div>
    <div className='pt-6 text-white font-medium text-3xl text-center leading-tight mb-14'>Let's explore the features...</div>
    <div className='flex flex-row justify-evenly'>
        <div>
        <SpotlightCard className="w-[25vw] h-[27vw] " spotlightColor="rgba(253, 216, 53, 1)">
            <div className="w-[5vw] h-[5vw] bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex justify-center items-center"><RxLightningBolt size={40} /></div>
            <div className='text-2xl font-semibold my-10 leading-tight'>Lightning Fast</div>
            <div className='text-lg'>Create professional resumes in minutes, not hours. The streamlined process gets you results quickly.</div>
        </SpotlightCard>
        </div>
        <div>
        <SpotlightCard className="w-[25vw] h-[27vw]" spotlightColor="rgba(67, 160, 71, 1)">
            <div className="w-[5vw] h-[5vw] bg-gradient-to-r from-lime-400 to-green-700 rounded-lg flex justify-center items-center"><MdOutlineShield size={40}/></div>
            <div className='text-2xl font-semibold my-10 leading-tight'>ATS Optimized</div>
            <div className='text-lg'>All templates are designed to pass Applicant Tracking Systems such that they get noticed by recruiters, thereby maxiizing your interview chances.</div>
        </SpotlightCard>
        </div>
        <div>
        <SpotlightCard className="w-[25vw] h-[27vw]" spotlightColor="rgba(213, 30, 99, 1)">
        <div className="w-[5vw] h-[5vw] bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex justify-center items-center"><FaRegFilePdf size={40}/></div>
            <div className='text-2xl font-semibold my-10 leading-tight'>Export to PDFs</div>
            <div className='text-lg'>Export your resumes to PDFs quickly..</div>
        </SpotlightCard>
        </div>
    </div>
    </section>
  )
}

export default features
