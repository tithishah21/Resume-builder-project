import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";

interface FormValues {
  full_name: string;
  phone: string;
  email: string;
  home: string;
  summary: string;
  skills: string[];
  education: {
    institution: string;
    passing_year: string;
    grade: string;
  }[];
  languages: {
    language: string;
    proficiency_level: string;
  }[];
  experience: {
    company_name: string;
    key_role: string;
    start_date: string;
    end_date: string;
    job_summary: string;
  }[];
  project: {
    project_title: string;
    project_description: string;
  }[];
  achievement: {
    achievement_title: string;
    achievement_description: string;
  }[];
  extra: string;
}

interface ResumePreviewProps {
  formData: FormValues;
  templateName: string | null;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ formData, templateName }) => {

  const displayData = formData;

  if (!displayData || Object.keys(displayData).length === 0) {
    return <div className="text-white text-center">No resume data to display.</div>;
  }

  
  const sectionTitleClasses = "text-xl font-bold mb-3 mt-6";


  switch (templateName) {
    case 'Modern Professional':
      return(
        <div className='flex flex-col md:flex-row bg-white min-h-[1050px] max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden'>
            <div className='flex flex-col bg-gray-800 text-white w-full md:w-1/3 min-w-0 py-8 px-6'>
              
              {/* Name (Modern Professional Template) */}
              <div className='text-center mb-8'>
                <h1 className='text-4xl font-extrabold mb-1'>{displayData.full_name.toUpperCase()}</h1>
                {/* <p className='text-gray-400 text-sm'>Graphic Designer</p>  */}
              </div>
              
              {/* Contact Info (Modern Professional Template)*/}
              <div className='text-left flex flex-col px-2 text-gray-300 mb-16 space-y-4'> 
                <div className='inline-flex items-center gap-2'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800">
                        <IoIosHome size={20}/>
                    </div>
                    <span className="break-all">{displayData.home}</span>
                </div>
                <div className='inline-flex items-center gap-2'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800">
                        <FaPhoneAlt size={16}/>
                    </div>
                    <span className="break-all">{displayData.phone}</span>
                </div>
                <div className='inline-flex items-center gap-2'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800">
                        <IoMail size={20}/>
                    </div>
                    <span className="break-all">{displayData.email}</span>
                </div>
              </div>

              {/* Skills (Modern Professional Template)*/}
              {displayData.skills && displayData.skills.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Skills</h2>
                  <div className="text-gray-200 text-base md:text-lg leading-relaxed flex flex-wrap">
                    {displayData.skills.map((skill, index) => (
                      <span key={index}>
                        {skill}
                        {index !== displayData.skills.length - 1 && <span className="mx-1">&middot;</span>}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages and their proficiency level (Modern Professional Template)*/}
              {displayData.languages && displayData.languages.length > 0 && (
                <section className="mb-8 mt-5"> 
                  <h2 className="text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Languages</h2> 
                  <ul className="space-y-2"> 
                    {displayData.languages.map((lang, index) => (
                      <li key={index} className="text-gray-300 text-sm">
                        <span className="font-semibold">{lang.language}</span>: {lang.proficiency_level}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className='flex flex-col flex-1 bg-white text-gray-800 py-8 px-2 sm:px-6 md:px-8 w-full'> 
              
              {/* Professional Summary (Modern Professional Template)*/}
              <section className="mb-8"> 
                <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Professional Summary</h2> 
                <p className="text-gray-700 text-base leading-relaxed">{displayData.summary}</p>
              </section>

              {/* Experience (Modern Professional Template)*/}
              {displayData.experience && displayData.experience.length > 0 && (
                <section className="mb-8"> 
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Experience</h2> 
                  {displayData.experience.map((exp, index) => (
                    <div key={index} className="mb-6 last:mb-0"> 
                      <h3 className="font-semibold text-lg text-gray-900">{exp.key_role} <span className="font-bold text-gray-600">@ {exp.company_name}</span></h3>
                      <p className="text-gray-500 text-sm mb-2">{exp.start_date} - {exp.end_date}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.job_summary}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Education (Modern Professional Template)*/}
              {displayData.education && displayData.education.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Education</h2> 
                  {displayData.education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0"> 
                      <div className='flex justify-between items-baseline'> 
                        <h3 className="font-semibold text-lg text-gray-900">{edu.institution}</h3>
                        <p className="text-gray-500 text-sm">{edu.passing_year}</p> 
                      </div>
                      <p className="text-gray-600 text-sm">{edu.grade ? `Grade: ${edu.grade}` : ''}</p> 
                    </div>
                  ))}
                </section>
              )}

              {/* Projects (Modern Professional Template)*/}
              {displayData.project && displayData.project.length > 0 && (
                <section className="mb-8"> 
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Projects</h2> {/* Styled heading */}
                  {displayData.project.map((proj, index) => (
                    <div key={index} className="mb-6 last:mb-0"> 
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{proj.project_title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{proj.project_description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Achievements (Modern Professional Template)*/}
              {displayData.achievement && displayData.achievement.length > 0 && (
                <section className="mb-8"> 
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Achievements</h2> {/* Styled heading */}
                  {displayData.achievement.map((ach, index) => (
                    <div key={index} className="mb-6 last:mb-0"> 
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{ach.achievement_title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{ach.achievement_description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Extra Information (Modern Professional Template)*/}
              {displayData.extra && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Additional Information</h2> {/* Styled heading */}
                  <p className="text-gray-700 text-sm leading-relaxed">{displayData.extra}</p>
                </section>
              )}
            </div>
          </div>
      );
      case 'Vibrant & Expressive (Gen Z)':
        return (
          <div className="bg-[#f9e5e1] min-h-[1050px] max-w-full md:max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden px-2 sm:px-4 md:px-8 py-6 md:py-10 text-[#4a4a4a] font-sans">
            {/* Header (Vibrant & Expressive (Gen Z) Template)*/}
            <div className="bg-[#d9747c] text-white p-4 sm:p-8 rounded-t-3xl flex flex-col items-center w-full">
              <h1 className="text-4xl font-bold uppercase">{displayData.full_name}</h1>
              {/* <p className='text-xs text-gray-300 '>Graphic Designer</p> */}
              
              <div className="mt-4 text-sm space-y-1 text-center">
                <p>+91 {displayData.phone}</p>
                <p>{displayData.email}</p>
                <p>{displayData.home}</p>
              </div>
            </div>

            {/* Professional Summary (Vibrant & Expressive (Gen Z) Template) */}
            <div className="bg-[#fff] px-2 sm:px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-b border-gray-300 w-full">
                
                <h2 className="text-xl font-semibold text-[#d9747c] mb-2">About Me</h2>
                <p className="text-sm leading-relaxed">{displayData.summary}</p>
              
            </div>

            
            <div className="bg-[#fefaf7] px-2 sm:px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-gray-300 w-full">
              {/* Education (Vibrant & Expressive (Gen Z) Template) */}
              <div>
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Education</h2>
                {displayData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-sm text-[#777]">{edu.passing_year} • {edu.grade}</p>
                  </div>
                ))}
              </div>

              {/* Experience (Vibrant & Expressive (Gen Z) Template)*/}
              <div>
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Experience</h2>
                {displayData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{exp.key_role}</h3>
                    <p className="text-sm text-[#d9747c] font-semibold">{exp.company_name}</p>
                    <p className="text-sm text-[#777] mb-1">{exp.start_date} → {exp.end_date}</p>
                    <p className="text-sm">{exp.job_summary}</p>
                  </div>
                ))}
              </div>
            </div>

     
            <div className="bg-[#fff] px-2 sm:px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-b border-gray-300 w-full">
              {/* Languages (Vibrant & Expressive (Gen Z) Template)*/}
              <div>
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Language Skills</h2>
                <div className="flex flex-wrap gap-4">
                  {displayData.languages.map((lang, index) => (
                    <span key={index} className="px-4 py-2 bg-[#f5dcdc] rounded-full text-sm font-semibold text-[#4a4a4a] border border-[#d9747c]">
                      {lang.language} • <span className="text-[#d9747c] ml-1">{lang.proficiency_level}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills (Vibrant & Expressive (Gen Z) Template)*/}
              {displayData.skills && displayData.skills.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Skills</h2>
                  <div className="text-[#4a4a4a] text-base md:text-lg leading-relaxed flex flex-wrap">
                    {displayData.skills.map((skill, index) => (
                      <span key={index}>
                        {skill}
                        {index !== displayData.skills.length - 1 && <span className="mx-1">&middot;</span>}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Projects (Vibrant & Expressive (Gen Z) Template)*/}
            {displayData.project?.length > 0 && (
              <div className="bg-[#fefaf7] px-2 sm:px-6 md:px-8 py-6 border-b border-gray-300 w-full">
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Projects</h2>
                {displayData.project.map((proj, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{proj.project_title}</h3>
                    <p className="text-sm">{proj.project_description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements (Vibrant & Expressive (Gen Z) Template)*/}
            {displayData.achievement?.length > 0 && (
              <div className="bg-[#fff] px-2 sm:px-6 md:px-8 py-6 border-b border-gray-300 w-full">
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Achievements</h2>
                {displayData.achievement.map((achieve, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{achieve.achievement_title}</h3>
                    <p className="text-sm">{achieve.achievement_description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Extra (Vibrant & Expressive (Gen Z) Template)*/}
            {displayData.extra && (
              <div className="bg-[#fefaf7] px-2 sm:px-6 md:px-8 py-6 border-b border-gray-300 w-full">
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Extras</h2>
                <p className="text-sm">{displayData.extra}</p>
              </div>
            )}

            
          </div>
        );

      
    case 'Classic Corporate':
      return (
        <div className="bg-white p-2 sm:p-4 md:p-8 font-sans text-gray-800 shadow-lg rounded-lg max-w-full md:max-w-3xl mx-auto border border-gray-200">
          {/* Header - Name, Contact Info (Classic Corporate Template)*/}
          <header className="text-center pb-6 mb-6 border-b border-gray-300">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{displayData.full_name.toUpperCase()}</h1>
            <p className="text-gray-600 text-lg">{displayData.home}</p>
            <div className="flex justify-center gap-8 mt-3 text-gray-600">
              <span className="flex items-center gap-2">
                <FaPhoneAlt size={14} className="text-blue-700"/> {displayData.phone}
              </span>
              <span className="flex items-center gap-2">
                <IoMail size={16} className="text-blue-700"/> {displayData.email}
              </span>
            </div>
          </header>

          {/* Professional Summary (Classic Corporate Template)*/}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Professional Summary</h2>
            <p className="text-gray-700 text-base leading-relaxed">{displayData.summary}</p>
          </section>

          {/* Experience (Classic Corporate Template)*/}
          {displayData.experience && displayData.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Experience</h2>
              {displayData.experience.map((exp, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-lg text-gray-900">{exp.key_role} <span className="font-normal text-gray-600">@ {exp.company_name}</span></h3>
                  <p className="text-gray-500 text-sm mb-1">{exp.start_date} - {exp.end_date}</p>
                  <p className="text-gray-700 text-base leading-relaxed">{exp.job_summary}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education (Classic Corporate Template)*/}
          {displayData.education && displayData.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Education</h2>
              {displayData.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className='flex justify-between items-baseline'>
                  <h3 className="font-semibold text-lg text-gray-900">{edu.institution}</h3>
                  <p className="text-gray-500 text-sm">{edu.passing_year}</p>
                  </div>
                  <p className="text-gray-600 text-base">{edu.grade ? `Grade: ${edu.grade}` : ''}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects (Classic Corporate Template)*/}
          {displayData.project && displayData.project.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Projects</h2>
              {displayData.project.map((proj, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-lg text-gray-900">{proj.project_title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed">{proj.project_description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Achievements (Classic Corporate Template)*/}
          {displayData.achievement && displayData.achievement.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Achievements</h2>
              {displayData.achievement.map((ach, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-lg text-gray-900">{ach.achievement_title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed">{ach.achievement_description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills (Classic Corporate Template)*/}
          {displayData.skills && displayData.skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Skills</h2>
              <div className="text-gray-700 text-base md:text-lg leading-relaxed flex flex-wrap">
                {displayData.skills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                    {index !== displayData.skills.length - 1 && <span className="mx-1">&middot;</span>}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages (Classic Corporate Template)*/}
          {displayData.languages && displayData.languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Languages</h2>
              <ul className="list-disc pl-5 text-base text-gray-700">
                {displayData.languages.map((lang, index) => (
                  <li key={index}>
                    {lang.language} - <span className="font-medium text-blue-700">{lang.proficiency_level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Extra Information (Classic Corporate Template)*/}
          {displayData.extra && (
            <section>
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Additional Information</h2>
              <p className="text-gray-700 text-base leading-relaxed">{displayData.extra}</p>
            </section>
          )}
        </div>
      );
    case 'Tech Minimalist':
      return(
        <div className="min-h-[1050px] bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 md:p-6 font-mono text-cyan-400 overflow-hidden relative max-w-full">
         
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.1) 0px, rgba(0,255,255,0.1) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(0,255,255,0.1) 0px, rgba(0,255,255,0.1) 1px, transparent 1px, transparent 20px)',
            backgroundSize: '20px 20px'
          }}></div>

          
          <div className="absolute inset-0 z-10 p-2 pointer-events-none">
            <div className="border-2 border-cyan-500 rounded-lg h-full w-full opacity-30 animate-pulse"></div>
          </div>

          <div className="relative z-20 max-w-full md:max-w-4xl mx-auto bg-gray-800 bg-opacity-90 rounded-xl shadow-lg p-2 sm:p-6 md:p-8">
            {/* Header - Name, Contact Info (Tech Minimalist Template)*/}
            <header className="text-center mb-8 pb-4 border-b border-cyan-600">
              <h1 className="text-5xl font-bold mb-2 text-lime-400 tracking-wider animate-fade-in-down">
                {displayData.full_name.toUpperCase()}
              </h1>
              <p className="text-gray-400 text-lg mb-4">Software Engineer | AI Enthusiast | Cloud Architect</p> {/* Example tech roles */}
              <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
                <span className="flex items-center gap-2">
                  <IoIosHome size={18} className="text-cyan-400"/> {displayData.home}
                </span>
                <span className="flex items-center gap-2">
                  <FaPhoneAlt size={14} className="text-cyan-400"/> {displayData.phone}
                </span>
                <span className="flex items-center gap-2">
                  <IoMail size={16} className="text-cyan-400"/> {displayData.email}
                </span>
              </div>
            </header>

            {/* Professional Summary (Tech Minimalist Template)*/}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                <span className="relative">
                  <span className="z-10">Abstract</span>
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed border-l-2 border-lime-400 pl-4 py-2 bg-gray-700 bg-opacity-50 rounded-md">
                {displayData.summary}
              </p>
            </section>

            {/* Skills (Tech Minimalist Template)*/}
            {displayData.skills && displayData.skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group">
                  <span className="relative">
                    <span className="z-10">Skill Matrix</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <div className="text-blue-200 text-base md:text-lg leading-relaxed flex flex-wrap">
                  {displayData.skills.map((skill, index) => (
                    <span key={index}>
                      {skill}
                      {index !== displayData.skills.length - 1 && <span className="mx-1">&middot;</span>}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Experience (Tech Minimalist Template)*/}
            {displayData.experience && displayData.experience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                  <span className="relative">
                    <span className="z-10">Chronology</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <div className="space-y-6">
                  {displayData.experience.map((exp, index) => (
                    <div key={index} className="relative pl-6 pb-4 border-l-2 border-dashed border-gray-600 last:border-l-0 last:pb-0">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 bg-cyan-500 rounded-full animate-pulse-light"></div>
                      <h3 className="text-xl font-bold text-lime-400 mb-1">{exp.key_role}</h3>
                      <p className="text-gray-300 text-sm">{exp.company_name} <span className="text-gray-500">({exp.start_date} - {exp.end_date})</span></p>
                      <p className="text-gray-400 text-sm leading-relaxed mt-2">{exp.job_summary}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education (Tech Minimalist Template)*/}
            {displayData.education && displayData.education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                  <span className="relative">
                    <span className="z-10">Knowledge Grid</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <div className="space-y-4">
                  {displayData.education.map((edu, index) => (
                    <div key={index} className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600">
                      <h3 className="font-semibold text-lg text-lime-300">{edu.institution}</h3>
                      <div className="flex justify-between text-gray-400 text-sm mt-1">
                        <span>{edu.passing_year}</span>
                        <span>{edu.grade && `| ${edu.grade}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects (Tech Minimalist Template)*/}
            {displayData.project && displayData.project.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                  <span className="relative">
                    <span className="z-10">Code & Create</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <div className="space-y-6">
                  {displayData.project.map((proj, index) => (
                    <div key={index} className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600 hover:border-cyan-500 transition-colors">
                      <h3 className="font-semibold text-lg text-lime-300 mb-1">{proj.project_title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{proj.project_description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements (Tech Minimalist Template)*/}
            {displayData.achievement && displayData.achievement.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                  <span className="relative">
                    <span className="z-10">Milestones</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <div className="space-y-6">
                  {displayData.achievement.map((ach, index) => (
                    <div key={index} className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600 hover:border-lime-500 transition-colors">
                      <h3 className="font-semibold text-lg text-lime-300 mb-1">{ach.achievement_title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{ach.achievement_description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages (Tech Minimalist Template)*/}
            {displayData.languages && displayData.languages.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                  <span className="relative">
                    <span className="z-10">Language Protocols</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <div className="flex flex-wrap gap-4">
                  {displayData.languages.map((lang, index) => (
                    <div key={index} className="bg-gray-700 bg-opacity-50 px-6 py-3 rounded-full border border-gray-600 text-gray-300 hover:border-cyan-500 transition-colors">
                      <span className="font-bold">{lang.language}</span>
                      <span className="text-lime-400 ml-2">[{lang.proficiency_level.split(' ')[0].toUpperCase()}]</span> {/* Simplified proficiency display */}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Extra Information (Tech Minimalist Template)*/}
            {displayData.extra && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                  <span className="relative">
                    <span className="z-10">Auxiliary Data</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <p className="text-gray-300 text-base leading-relaxed border-l-2 border-lime-400 pl-4 py-2 bg-gray-700 bg-opacity-50 rounded-md">
                  {displayData.extra}
                </p>
              </section>
            )}

            {/* Footer (Tech Minimalist Template)*/}
            <footer className="text-center mt-12 text-gray-500 text-sm">
              <p>&lt;/END TRANSMISSION&gt;</p>
              <p className="mt-2 text-cyan-500">Built with <span className="text-red-500">❤️</span> and Code</p>
            </footer>
          </div>
        </div>
      );
    default:
      return (
        <div className="bg-white p-2 sm:p-4 md:p-8 text-gray-800 font-sans shadow-lg rounded-lg max-w-full md:max-w-2xl mx-auto">
          {/* Header - Name, Contact Info (Default Template)*/}
          <header className="text-center pb-4 mb-6 border-b-2 border-gray-300">
            <h1 className="text-4xl font-extrabold mb-2">{displayData.full_name.toUpperCase()}</h1>
            <p className="text-gray-600">
              {displayData.home}
            </p>
            <div className='flex justify-between text-sm font-boldA'>
              <div><span>+91 </span>{displayData.phone}</div>
              <div>{displayData.email}</div>
            </div>
          </header>

          {/* Professional Summary (Default Template)*/}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{displayData.summary}</p>
          </section>

          {/* Skills (Default Template)*/}
          {displayData.skills && displayData.skills.length > 0 && (
            <section className="mb-6">
              <h2 className={sectionTitleClasses}>Skills</h2>
              <div className="text-blue-700 text-base md:text-lg leading-relaxed flex flex-wrap">
                {displayData.skills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                    {index !== displayData.skills.length - 1 && <span className="mx-1">&middot;</span>}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience (Default Template)*/}
          {displayData.experience && displayData.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">Experience</h2>
              {displayData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg">{exp.key_role} @ {exp.company_name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{exp.start_date} - {exp.end_date}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.job_summary}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education (Default Template)*/}
          {displayData.education && displayData.education.length > 0 && (
            <section className="mb-6">
              <h2 className={sectionTitleClasses}>Education</h2>
              {displayData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className='flex justify-between'>
                  <h3 className="font-semibold text-lg">{edu.institution}</h3>
                  <div>{edu.passing_year}</div>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.grade ? `Grade: (${edu.grade})` : ''}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects (Default Template) */}
          {displayData.project && displayData.project.length > 0 && (
            <section className="mb-6">
              <h2 className={sectionTitleClasses}>Projects</h2>
              {displayData.project.map((proj, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg">{proj.project_title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{proj.project_description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Achievements (Default Template) */}
          {displayData.achievement && displayData.achievement.length > 0 && (
            <section className="mb-6">
              <h2 className={sectionTitleClasses}>Achievements</h2>
              {displayData.achievement.map((ach, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg">{ach.achievement_title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{ach.achievement_description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages (Default Template) */}
          {displayData.languages && displayData.languages.length > 0 && (
            <section className="mb-6">
              <h2 className={sectionTitleClasses}>Languages</h2>
              <ul className="list-disc pl-5 text-sm">
                {displayData.languages.map((lang, index) => (
                  <li key={index}>
                    {lang.language} - <span className="text-blue-700">{lang.proficiency_level}</span> {/* Using default accent color */}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Extra Information (Default Template) */}
          {displayData.extra && (
            <section>
              <h2 className={sectionTitleClasses}>Additional Information</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{displayData.extra}</p>
            </section>
          )}
        </div>
      );
  }
};
export default ResumePreview;