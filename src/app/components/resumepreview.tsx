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
  // Sample data for demonstration
  const sampleData: FormValues = {
    full_name: "Alex Jordan",
    phone: "555-123-4567", // Simplified for display
    email: "alex.jordan@email.com",
    home: "San Francisco, CA",
    summary: "Creative and tech-savvy digital native with a passion for innovative design and cutting-edge technology. Experienced in creating viral content and building engaging user experiences.",
    skills: ["React", "TypeScript", "Figma", "UI/UX Design", "Digital Marketing", "Project Management"], // Added more skills for realistic display
    education: [
      {
        institution: "Stanford University",
        passing_year: "2024",
        grade: "3.8 GPA"
      }
    ],
    languages: [
      { language: "English", proficiency_level: "Native" },
      { language: "Spanish", proficiency_level: "Fluent" }
    ],
    experience: [
      {
        company_name: "TechFlow Startup",
        key_role: "Frontend Developer Intern",
        start_date: "June 2023",
        end_date: "Present",
        job_summary: "Developed and maintained responsive web applications, contributing to a 45% increase in user engagement. Collaborated with design teams to translate wireframes into high-fidelity UI."
      },
      {
        company_name: "Creative Solutions Agency",
        key_role: "Graphic Design Assistant",
        start_date: "Jan 2022",
        end_date: "May 2023",
        job_summary: "Assisted lead designers in creating visual content for various marketing campaigns. Contributed to brand guideline development and managed client assets."
      }
    ],
    project: [
      {
        project_title: "EcoTracker Mobile App",
        project_description: "Led the development of a React Native application to track personal carbon footprints, featuring data visualization and eco-friendly tips. Achieved 1st place in the 'HackTheClimate' hackathon (2023)."
      },
      {
        project_title: "Portfolio Website Redesign",
        project_description: "Redesigned and re-developed personal portfolio using Next.js and Tailwind CSS, focusing on a responsive and visually appealing user experience. Improved load times by 30%."
      }
    ],
    achievement: [
      {
        achievement_title: "Dean's List Honoree",
        achievement_description: "Recognized for academic excellence in multiple semesters at Stanford University (2021-2024)."
      },
      {
        achievement_title: "Community Outreach Award",
        achievement_description: "Awarded for organizing and leading a successful local community technology workshop series (2023)."
      }
    ],
    extra: "Passionate about sustainable technology, mental health advocacy, and fostering inclusive digital communities. Volunteer web developer for local non-profit organizations. Eager to contribute creativity and technical skills to impactful projects."
  };

  const displayData = formData && Object.keys(formData).length > 0 ? formData : sampleData;

  if (!displayData) {
    return <div className="text-white text-center">No resume data to display.</div>;
  }

  // Common styling variables (can be overridden by template cases)
  // These are now ONLY defaults if no case matches, or for shared utility classes.
  // Specific template styles will be defined directly within their return blocks.
  let containerClasses = "p-8 text-black shadow-lg rounded-lg";
  let headerClasses = "pb-4 mb-6 border-b";
  let sectionTitleClasses = "text-xl font-bold mb-3 mt-6";
  let accentColor = "text-blue-600"; // Default accent color


  switch (templateName) {
    case 'Modern Professional':
      return(
        // Main container for the Modern Professional template
        <div className='flex flex-row bg-white min-h-[1050px] max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden'> {/* Added max-w, mx-auto, shadow, rounded, overflow */}

            {/* Left Column - Dark Background */}
            <div className='flex flex-col bg-gray-800 text-white w-1/3 min-w-[200px] py-10 px-6'> {/* Adjusted width to 1/3, added min-width */}
              
              {/* Name */}
              <div className='text-center mb-8'>
                <h1 className='text-4xl font-extrabold mb-1'>{displayData.full_name.toUpperCase()}</h1>
                <p className='text-gray-400 text-sm'>Graphic Designer</p> {/* Example static role for this template */}
              </div>
              
              {/* Contact Info */}
              <div className='text-left flex flex-col px-4 text-gray-300 mb-16 space-y-4'> {/* Increased px, added space-y */}
                <div className='inline-flex items-center gap-3'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800"> {/* White circle */}
                        <IoIosHome size={20}/>
                    </div>
                    {displayData.home}
                </div>
                <div className='inline-flex items-center gap-3'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800"> {/* White circle */}
                        <FaPhoneAlt size={16}/>
                    </div>
                    {displayData.phone}
                </div>
                <div className='inline-flex items-center gap-3'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800"> {/* White circle */}
                        <IoMail size={16}/> {/* Set a size for consistency */}
                    </div>
                    {displayData.email}
                </div>
              </div>

              {/* Skills */}
              {displayData.skills && displayData.skills.length > 0 && (
                <section className="mb-8"> {/* Increased mb */}
                  <h2 className="text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Skills</h2> {/* Styled heading */}
                  <ul className="flex flex-wrap gap-2">
                    {displayData.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-gray-200 px-3 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600 transition-colors" // Adjusted styling for skills
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Languages and their proficiency level */}
              {displayData.languages && displayData.languages.length > 0 && (
                <section className="mb-8 mt-5"> {/* Increased mb */}
                  <h2 className="text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Languages</h2> {/* Styled heading */}
                  <ul className="space-y-2"> {/* Removed list-disc, list-inside, px-11 from ul */}
                    {displayData.languages.map((lang, index) => (
                      <li key={index} className="text-gray-300 text-sm"> {/* Simplified li style */}
                        <span className="font-semibold">{lang.language}</span>: {lang.proficiency_level}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Right Column - Lighter Background */}
            <div className='flex flex-col flex-1 bg-white text-gray-800 py-10 px-8'> {/* Used flex-1, added px */}
              
              {/* Professional Summary */}
              <section className="mb-8"> {/* Increased mb */}
                <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Professional Summary</h2> {/* Styled heading */}
                <p className="text-gray-700 text-base leading-relaxed">{displayData.summary}</p> {/* Adjusted text size */}
              </section>

              {/* Experience */}
              {displayData.experience && displayData.experience.length > 0 && (
                <section className="mb-8"> {/* Increased mb */}
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Experience</h2> {/* Styled heading */}
                  {displayData.experience.map((exp, index) => (
                    <div key={index} className="mb-6 last:mb-0"> {/* Added last:mb-0 */}
                      <h3 className="font-semibold text-lg text-gray-900">{exp.key_role} <span className="font-bold text-gray-600">@ {exp.company_name}</span></h3>
                      <p className="text-gray-500 text-sm mb-2">{exp.start_date} - {exp.end_date}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.job_summary}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Education */}
              {displayData.education && displayData.education.length > 0 && (
                <section className="mb-8"> {/* Increased mb */}
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Education</h2> {/* Styled heading */}
                  {displayData.education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0"> {/* Added last:mb-0 */}
                      <div className='flex justify-between items-baseline'> {/* Align items */}
                        <h3 className="font-semibold text-lg text-gray-900">{edu.institution}</h3>
                        <p className="text-gray-500 text-sm">{edu.passing_year}</p> {/* Moved year to right */}
                      </div>
                      <p className="text-gray-600 text-sm">{edu.grade ? `Grade: ${edu.grade}` : ''}</p> {/* Removed parentheses */}
                    </div>
                  ))}
                </section>
              )}

              {/* Projects - ADDED HERE, below Education */}
              {displayData.project && displayData.project.length > 0 && (
                <section className="mb-8"> {/* Increased mb */}
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Projects</h2> {/* Styled heading */}
                  {displayData.project.map((proj, index) => (
                    <div key={index} className="mb-6 last:mb-0"> {/* Added last:mb-0 */}
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{proj.project_title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{proj.project_description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Achievements - ADDED HERE, below Projects */}
              {displayData.achievement && displayData.achievement.length > 0 && (
                <section className="mb-8"> {/* Increased mb */}
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Achievements</h2> {/* Styled heading */}
                  {displayData.achievement.map((ach, index) => (
                    <div key={index} className="mb-6 last:mb-0"> {/* Added last:mb-0 */}
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{ach.achievement_title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{ach.achievement_description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Extra Information */}
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
          <div className="bg-[#f9e5e1] min-h-[1050px] max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden px-6 py-10 text-[#4a4a4a] font-sans">
            {/* Header */}
            <div className="bg-[#d9747c] text-white p-8 rounded-t-3xl flex flex-col items-center">
              <h1 className="text-4xl font-bold uppercase">{displayData.full_name}</h1>
              
              <div className="mt-4 text-sm space-y-1 text-center">
                <p>+91 {displayData.phone}</p>
                <p>{displayData.email}</p>
                <p>{displayData.home}</p>
              </div>
            </div>

            {/* Biography + Social */}
            <div className="bg-[#fff] px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-300">
              
                <h2 className="text-xl font-semibold text-[#d9747c] mb-2">Biography</h2>
                <p className="text-sm leading-relaxed">{displayData.summary}</p>
              
            </div>

            {/* Education + Experience */}
            <div className="bg-[#fefaf7] px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-300">
              {/* Education */}
              <div>
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Education</h2>
                {displayData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-sm text-[#777]">{edu.passing_year} • {edu.grade}</p>
                  </div>
                ))}
              </div>

              {/* Experience */}
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

            {/* Languages + Skills */}
            <div className="bg-[#fff] px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-300">
              {/* Languages */}
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

              {/* Skills */}
              <div>
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {displayData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#f5dcdc] rounded-lg text-sm text-[#4a4a4a] border border-[#d9747c]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            {displayData.project?.length > 0 && (
              <div className="bg-[#fefaf7] px-8 py-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Projects</h2>
                {displayData.project.map((proj, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{proj.project_title}</h3>
                    <p className="text-sm">{proj.project_description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {displayData.achievement?.length > 0 && (
              <div className="bg-[#fff] px-8 py-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Achievements</h2>
                {displayData.achievement.map((achieve, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{achieve.achievement_title}</h3>
                    <p className="text-sm">{achieve.achievement_description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Extra */}
            {displayData.extra && (
              <div className="bg-[#fefaf7] px-8 py-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-[#d9747c] mb-4 uppercase">Extras</h2>
                <p className="text-sm">{displayData.extra}</p>
              </div>
            )}

            
          </div>
        );

      
    case 'Classic Corporate':
      // Problem: This case was missing a 'return' statement, causing the default to always render.
      // Now, it will explicitly return its own JSX structure.
      return (
        <div className="bg-white p-8 font-sans text-gray-800 shadow-lg rounded-lg max-w-3xl mx-auto border border-gray-200">
          {/* Header - Name, Contact Info */}
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

          {/* Professional Summary */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Professional Summary</h2>
            <p className="text-gray-700 text-base leading-relaxed">{displayData.summary}</p>
          </section>

          {/* Experience */}
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

          {/* Education */}
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

          {/* Projects */}
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

          {/* Achievements */}
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

          {/* Skills */}
          {displayData.skills && displayData.skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2">Skills</h2>
              <ul className="flex flex-wrap gap-2 text-sm">
                {displayData.skills.map((skill, index) => (
                  <li key={index} className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
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

          {/* Extra Information */}
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
        <div className="min-h-[1050px] bg-gradient-to-br from-gray-900 to-black p-6 font-mono text-cyan-400 overflow-hidden relative">
          {/* Background grid/circuitry pattern */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.1) 0px, rgba(0,255,255,0.1) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(0,255,255,0.1) 0px, rgba(0,255,255,0.1) 1px, transparent 1px, transparent 20px)',
            backgroundSize: '20px 20px'
          }}></div>

          {/* Glowing border effect */}
          <div className="absolute inset-0 z-10 p-2 pointer-events-none">
            <div className="border-2 border-cyan-500 rounded-lg h-full w-full opacity-30 animate-pulse"></div>
          </div>

          <div className="relative z-20 max-w-4xl mx-auto bg-gray-800 bg-opacity-90 rounded-xl shadow-lg p-8">
            {/* Header - Name, Contact Info */}
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

            {/* Professional Summary */}
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

            {/* Skills */}
            {displayData.skills && displayData.skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block group"> {/* Added group for hover */}
                  <span className="relative">
                    <span className="z-10">Skill Matrix</span>
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 opacity-50 z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {displayData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-1 rounded text-sm bg-blue-700 bg-opacity-70 text-blue-200 border border-blue-500 transform hover:scale-105 transition-all duration-200 shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
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

            {/* Education */}
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

            {/* Projects */}
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

            {/* Achievements */}
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

            {/* Languages */}
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

            {/* Extra Information */}
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

            {/* Footer */}
            <footer className="text-center mt-12 text-gray-500 text-sm">
              <p>&lt;/END TRANSMISSION&gt;</p>
              <p className="mt-2 text-cyan-500">Built with <span className="text-red-500">❤️</span> and Code</p>
            </footer>
          </div>
        </div>
      );
    default:
      // This default case acts as a fallback if templateName is null or unmatched
      return (
        <div className="bg-white p-8 text-gray-800 font-sans shadow-lg rounded-lg max-w-2xl mx-auto">
          {/* Header - Name, Contact Info */}
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

          {/* Professional Summary */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{displayData.summary}</p>
          </section>

          {/* Skills */}
          {displayData.skills && displayData.skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">Skills</h2>
              <ul className="flex flex-wrap gap-2 text-sm text-center items-center">
                {displayData.skills.map((skill, index) => (
                  <li key={index} className={`text-center align-middle justify-center px-3 py-1 rounded-full bg-gray-200 text-blue-700`}> {/* Using default accent color */}
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Experience */}
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

          {/* Education */}
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