'use client';
import React, { useState } from 'react';
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { BsBagDashFill } from "react-icons/bs";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

function Page() {
  // skills
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

  //education 
  const [educationList, setEducationList] = useState([
    { institution: '', year: '', grade: '' },
  ]);
  
  const handleEducationChange = (index: number, field: string, value: string) => {
    const updated = [...educationList];
    updated[index][field as keyof typeof updated[0]] = value;
    setEducationList(updated);
  };
  
  const addEducation = () => {
    setEducationList([...educationList, { institution: '', year: '', grade: '' }]);
  };
  
  const removeEducation = (index: number) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  //experience
  const [companyList,setCompanyList]=useState([{company:'' , role:'' , start:'',end:'',summary:''},]);
  const handleCompanyChange = (index:number, field:string, value:string) => {
    const updated = [...companyList];
    updated[index][field as keyof typeof updated[0]] = value;
    setCompanyList(updated);
  };
  const addCompany = ()=>{
    setCompanyList([...companyList, {company: '',role:'',start:'',end:'',summary:''}]);
  };
  const removeCompany = (index:number) =>{
    const updated = [...companyList];
    updated.splice(index,1);
    setCompanyList(updated);
  };

  //languages
  const [languages, setLanguages] = useState([
    { name: '', proficiency: '' },
  ]);
  
  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updated = [...languages];
    updated[index][field as keyof typeof updated[0]] = value;
    setLanguages(updated);
  };
  
  const addLanguage = () => {
    setLanguages([...languages, { name: '', proficiency: '' }]);
  };
  
  const removeLanguage = (index: number) => {
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
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
          <div className="flex justify-start gap-[26rem] mt-5">
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
        <label className='text-lg text-gray-300 font-semibold mt-6'>Professional Summary</label>
        <textarea
          rows={6}
          placeholder='Enter a short paragraph that best describes you'
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

      {/* Education */}
      <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
        <span className='inline-flex gap-2 my-5'>
          <p className='text-cyan-400 text-3xl font-bold'><FaGraduationCap /></p>
          <p className='text-3xl font-bold'>Education</p>
        </span>

        {educationList.map((edu, index) => (
          <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>
            <div className='flex flex-col gap-2'>
              <label className="text-lg text-gray-300 font-semibold">Institution Name</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                placeholder='e.g., VIT University, Vellore'
                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            <div className='flex flex-wrap gap-5'>
              <div className='flex-1'>
                <label className="text-lg text-gray-300 font-semibold">Year of Passing</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  placeholder='e.g., 2027'
                  className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              <div className='flex-1'>
                <label className="text-lg text-gray-300 font-semibold">Grade (Optional)</label>
                <input
                  type="text"
                  value={edu.grade}
                  onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                  placeholder='e.g., 9.0 CGPA'
                  className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            {educationList.length > 1 && (
              <button
                onClick={() => removeEducation(index)}
                className='self-start text-red-400 hover:underline text-sm mt-2'
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addEducation}
          className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
        >
          + Add Another Education
        </button>
      </div>

      {/* Languages Known */}
      <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
        <span className='inline-flex gap-2 my-5'>
          <p className='text-cyan-400 text-3xl font-bold'><IoLanguage /></p>
          <p className='text-3xl font-bold'>Languages Known</p>
        </span>

        {languages.map((lang, index) => (
          <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>
            <div className='flex flex-col gap-2'>
              <label className="text-lg text-gray-300 font-semibold">Language</label>
              <input
                type="text"
                value={lang.name}
                onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                placeholder='e.g., English'
                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className="text-lg text-gray-300 font-semibold">Proficiency Level</label>
              <select
                value={lang.proficiency}
                onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                className='w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
              >
                <option value="">Select proficiency level</option>
                <option value="Native Proficiency">Native Proficiency</option>
                <option value="Bilingual Proficiency">Bilingual Proficiency</option>
                <option value="Professional Proficiency">Professional Proficiency</option>
              </select>
            </div>

            {languages.length > 1 && (
              <button
                onClick={() => removeLanguage(index)}
                className='self-start text-red-400 hover:underline text-sm mt-2'
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addLanguage}
          className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
        >
          + Add Another Language
        </button>
      </div>


      {/*Experience */}
      <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
        <span className='inline-flex gap-2 my-5'>
          <p className='text-cyan-400 text-3xl font-bold'><BsBagDashFill /></p>
          <p className='text-3xl font-bold'>Experience</p>
        </span>

        {companyList.map((exp, index) => (
          <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>

            <div className='flex flex-col gap-2'>
              <label className="text-lg text-gray-300 font-semibold">Company Name</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleCompanyChange(index, 'company', e.target.value)}
                placeholder='e.g., JP Morgan Chase'
                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className="text-lg text-gray-300 font-semibold">Key Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleCompanyChange(index, 'role', e.target.value)}
                placeholder='e.g., Software Developer Engineer'
                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            <div className='flex flex-wrap gap-5'>
              <div className='flex-1'>
                <label className="text-lg text-gray-300 font-semibold">Start Date</label>
                <input
                  type="month"
                  value={exp.start}
                  onChange={(e) => handleCompanyChange(index, 'start', e.target.value)}
                  className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>

              <div className='flex-1'>
                <label className="text-lg text-gray-300 font-semibold">End Date</label>
                <input
                  type="text"
                  value={exp.end}
                  onChange={(e) => handleCompanyChange(index, 'end', e.target.value)}
                  placeholder='e.g., Currently / May, 2025'
                  className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className="text-lg text-gray-300 font-semibold">Summary</label>
              <textarea
                rows={5}
                value={exp.summary}
                onChange={(e) => handleCompanyChange(index, 'summary', e.target.value)}
                placeholder='Describe your responsibilities and achievements'
                className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
              ></textarea>
            </div>

            {companyList.length > 1 && (
              <button
                onClick={() => removeCompany(index)}
                className='self-start text-red-400 hover:underline text-sm mt-2'
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add More Experience Button */}
        <button
          onClick={addCompany}
          className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
        >
          + Add Another Experience
        </button>

      </div>
      <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
        <span className='inline-flex gap-2 my-5'>
          <p className='text-cyan-400 text-3xl font-bold'><BsFillBookmarkPlusFill /></p>
          <p className='text-3xl font-bold'>Additional add-ons</p>
        </span>
        <textarea
          rows={5}
          placeholder='Extras'
          className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
          ></textarea>
      </div>
    </div>
  );
}

export default Page;
