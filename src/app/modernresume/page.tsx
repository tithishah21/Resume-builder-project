'use client';
import React, { useState } from 'react';
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";

function Page() {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput('');
  };

  const removeSkill = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  return (
    <div className='w-full min-h-screen bg-gray-950 text-white px-8 py-12'>

      {/*Personal Information*/}
      <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>

        <span className='inline-flex gap-2 my-5'>
          <p className='text-cyan-400 text-3xl font-bold'><IoPeopleOutline /></p>
          <p className='text-3xl font-bold'>Personal Information</p>
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex justify-start gap-[26rem]">
            <label className="text-lg text-gray-300 font-semibold">Full Name</label>
            <label className="text-lg text-gray-300 font-semibold">Phone Number</label>
          </div>
          <div className="flex justify-between gap-10">
            <input
              type="text"
              placeholder='Enter your full name'
              className="placeholder:text-base w-1/2 px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            <input
              type="tel"
              placeholder='Enter your phone number'
              className="placeholder:text-base w-1/2 px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        <label className='text-lg text-gray-300 font-semibold mt-6'>Email Address</label>
        <input
          type='email'
          placeholder='Enter your email address'
          className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
        />

        {/* Address */}
        <label className='text-lg text-gray-300 font-semibold mt-6'>Home Address</label>
        <textarea
          rows={3}
          placeholder='Enter your home address'
          className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
        />

        {/* Summary */}
        <label className='text-lg text-gray-300 font-semibold mt-6'>Summary</label>
        <textarea
          rows={6}
          placeholder='Enter a short paragraph that describes you the best'
          className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
        />
      </div>

      {/*Skills*/}
      <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
        <span className='inline-flex gap-2 my-5'>
          <p className='text-cyan-400 text-3xl font-bold'><HiOutlineLightBulb /></p>
          <p className='text-3xl font-bold'>Skills</p>
        </span>

        <div className='flex flex-wrap gap-3 mb-4'>
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-cyan-800 font-bold text-white px-4 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="text-white hover:text-red-400"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Input + Add Button */}
        <div className='flex gap-3'>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            placeholder="Type a skill and press Enter"
            className='placeholder:text-base flex-1 px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-cyan-400/20'
          />
          <button
            onClick={addSkill}
            className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold'
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
