import React, { useRef } from 'react';
import VariableProximity from './variable_proximity';
import { Roboto_Flex } from 'next/font/google';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
});

function Contact() {
  const containerRef = useRef(null);

  return (
    <section className="bg-gradient-to-br from-blue-900/20 via-gray-950 to-cyan-900/20 h-[180vw] lg:h-[48vw] w-full px-10">
      <div
        ref={containerRef}
        style={{ position: 'relative' ,fontSize:'8vw',fontWeight:'bolder'}}
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
        <div className='flex flex-row gap-6'>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
