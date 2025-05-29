import React from 'react';
import SpotlightCard from './spotlightcard';


function features() {
  return (
    <section className='bg-gray-900/50 w-full h-[48vw]'>
    <div className='pt-20 text-white font-semibold text-5xl text-center leading-tight'>Why Choose ResumeBuilder Pro?</div>
    <div className='pt-6 text-white font-medium text-3xl text-center leading-tight'>Let's explore the features...</div>
    <div className='flex flex-row justify-evenly'>
        <div>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            // Content goes here
        </SpotlightCard>
        </div>
        <div></div>
        <div></div>
    </div>
    </section>
  )
}

export default features
