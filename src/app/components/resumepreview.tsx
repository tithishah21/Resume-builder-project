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
    summary: "Highly motivated Software Engineer with a passion for developing innovative solutions and optimizing system performance. Experienced in full-stack development and cloud technologies.",
    skills: ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker", "Kubernetes", "SQL", "CI/CD"], // Tech-focused skills
    education: [
      {
        institution: "University of California, Berkeley",
        passing_year: "2022",
        grade: "B.S. in Computer Science"
      }
    ],
    languages: [
      { language: "English", proficiency_level: "Native" },
      { language: "German", proficiency_level: "Professional Working" }
    ],
    experience: [
      {
        company_name: "InnovateTech Solutions",
        key_role: "Senior Software Engineer",
        start_date: "Jan 2024",
        end_date: "Present",
        job_summary: "Designed and implemented scalable backend services using Node.js and AWS Lambda, improving API response times by 30%. Led a team of 3 junior developers in agile sprints."
      },
      {
        company_name: "Global Data Corp",
        key_role: "Software Engineer",
        start_date: "July 2022",
        end_date: "Dec 2023",
        job_summary: "Developed and maintained data pipelines using Python and Apache Kafka. Optimized database queries, reducing data processing time by 20%. Collaborated on cross-functional teams."
      }
    ],
    project: [
      {
        project_title: "Distributed Chat System",
        project_description: "Built a real-time distributed chat application with WebSockets and Redis, supporting thousands of concurrent users. Implemented end-to-end encryption."
      },
      {
        project_title: "AI-Powered Code Review Tool",
        project_description: "Developed a tool using Python and TensorFlow to automate code review suggestions, integrating with GitHub pull requests. Reduced review time by 15%."
      }
    ],
    achievement: [
      {
        achievement_title: "AWS Certified Developer – Associate",
        achievement_description: "Certified in designing and deploying cloud-based applications on Amazon Web Services (2023)."
      },
      {
        achievement_title: "Top Performer Award - InnovateTech",
        achievement_description: "Recognized for outstanding contributions to the core product development, leading to a significant increase in user retention (2024)."
      }
    ],
    extra: "Active contributor to open-source projects (check my GitHub!). Passionate about cybersecurity, machine learning, and competitive programming. Always learning new technologies and exploring innovative solutions."
  };

  const displayData = formData && Object.keys(formData).length > 0 ? formData : sampleData;

  if (!displayData) {
    return <div className="text-white text-center">No resume data to display.</div>;
  }

  // Common styling variables (can be overridden by template cases)
  let containerClasses = "p-8 text-black shadow-lg rounded-lg";
  let headerClasses = "pb-4 mb-6 border-b";
  let sectionTitleClasses = "text-xl font-bold mb-3 mt-6";
  let accentColor = "text-blue-600"; // Default accent color

  switch (templateName) {
    case 'Modern Professional':
      return(
        // Main container for the Modern Professional template
        <div className='flex flex-row bg-white min-h-[1050px] max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden'>

            {/* Left Column - Dark Background */}
            <div className='flex flex-col bg-gray-800 text-white w-1/3 min-w-[200px] py-10 px-6'>
              
              {/* Name */}
              <div className='text-center mb-8'>
                <h1 className='text-4xl font-extrabold mb-1'>{displayData.full_name.toUpperCase()}</h1>
                <p className='text-gray-400 text-sm'>Graphic Designer</p>
              </div>
              
              {/* Contact Info */}
              <div className='text-left flex flex-col px-4 text-gray-300 mb-16 space-y-4'>
                <div className='inline-flex items-center gap-3'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800">
                        <IoIosHome size={20}/>
                    </div>
                    {displayData.home}
                </div>
                <div className='inline-flex items-center gap-3'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800">
                        <FaPhoneAlt size={16}/>
                    </div>
                    {displayData.phone}
                </div>
                <div className='inline-flex items-center gap-3'>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800">
                        <IoMail size={16}/>
                    </div>
                    {displayData.email}
                </div>
              </div>

              {/* Skills */}
              {displayData.skills && displayData.skills.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Skills</h2>
                  <ul className="flex flex-wrap gap-2">
                    {displayData.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-gray-200 px-3 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Languages and their proficiency level */}
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

            {/* Right Column - Lighter Background */}
            <div className='flex flex-col flex-1 bg-white text-gray-800 py-10 px-8'>
              
              {/* Professional Summary */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Professional Summary</h2>
                <p className="text-gray-700 text-base leading-relaxed">{displayData.summary}</p>
              </section>

              {/* Experience */}
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

              {/* Education */}
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

              {/* Projects - ADDED HERE, below Education */}
              {displayData.project && displayData.project.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Projects</h2>
                  {displayData.project.map((proj, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{proj.project_title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{proj.project_description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Achievements - ADDED HERE, below Projects */}
              {displayData.achievement && displayData.achievement.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Achievements</h2>
                  {displayData.achievement.map((ach, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{ach.achievement_title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{ach.achievement_description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Extra Information */}
              {displayData.extra && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">Additional Information</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{displayData.extra}</p>
                </section>
              )}
            </div>
          </div>
      );
    case 'Vibrant & Expressive (Gen Z)':
      return (
        <div className="min-h-screen bg-[#dc73a7] p-4 font-sans">

          <div className="relative  backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto border-4 border-white/50">
            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>

            {/* Header */}
            <header className="text-center mb-8 relative">
              <div className="inline-block relative">
                <h1 className="text-5xl font-black mb-4">
                  {displayData.full_name.toUpperCase()}
                </h1>
                
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-gray-700 font-medium">
                
                <span className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full border-2 border-purple-300">
                <span><FaPhoneAlt /></span>
                   {displayData.phone}
                </span>
                
                <span className="flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full border-2 border-pink-300">
                  <span><IoMail /></span>
                   {displayData.email}
                </span>
                <span className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border-2 border-orange-300">
                  <span><IoIosHome /></span>
                   {displayData.home}
                </span>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-8">
              <h2 className="text-3xl font-extrabold mb-4 text-purple-700 relative inline-block">
                ✨ About Me
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
              </h2>
              <p className="text-gray-800 text-lg leading-relaxed bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-pink-500 shadow-lg">
                {displayData.summary}
              </p>
            </section>

            {/* Skills */}
            {displayData.skills && displayData.skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-pink-700 relative inline-block">
                  🚀 Skills & Superpowers
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {/* Note: If you want skill bars, this mapping needs to be adjusted in the parent component
                      to pass objects like { name: 'Skill Name', level: 90 } or define skillsWithLevels here. */}
                  {displayData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-full text-white font-bold text-sm transform hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg ${
                        index % 6 === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        index % 6 === 1 ? 'bg-gradient-to-r from-pink-500 to-orange-500' :
                        index % 6 === 2 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                        index % 6 === 3 ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                        index % 6 === 4 ? 'bg-gradient-to-r from-teal-500 to-cyan-500' :
                        'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`}
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
                <h2 className="text-3xl font-extrabold mb-6 text-orange-700 relative inline-block">
                  💼 Work Experience
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </h2>
                <div className="space-y-6">
                  {displayData.experience.map((exp, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{exp.key_role}</h3>
                      <h4 className="text-lg font-semibold text-orange-600 mb-2">{exp.company_name}</h4>
                      <p className="text-sm text-gray-600 mb-3 font-mono bg-white/50 px-3 py-1 rounded-full inline-block">
                        {exp.start_date} → {exp.end_date}
                      </p>
                      <p className="text-gray-700 leading-relaxed">{exp.job_summary}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {displayData.education && displayData.education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-teal-700 relative inline-block">
                  🎓 Education
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-green-500 rounded-full"></div>
                </h2>
                <div className="space-y-4">
                  {displayData.education.map((edu, index) => (
                    <div key={index} className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-2xl border-l-4 border-teal-500 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800">{edu.institution}</h3>
                      <p className="text-teal-600 font-semibold">
                        {edu.passing_year} {edu.grade && `• ${edu.grade}`}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {displayData.project && displayData.project.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-cyan-700 relative inline-block">
                  🛠️ Cool Projects
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                </h2>
                <div className="space-y-6">
                  {displayData.project.map((proj, index) => (
                    <div key={index} className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl border-l-4 border-cyan-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{proj.project_title}</h3>
                      <p className="text-gray-700 leading-relaxed">{proj.project_description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {displayData.achievement && displayData.achievement.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 relative inline-block">
                  🏆 Achievements & Wins
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </h2>
                <div className="space-y-6">
                  {displayData.achievement.map((ach, index) => (
                    <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-l-4 border-yellow-500 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{ach.achievement_title}</h3>
                      <p className="text-gray-700 leading-relaxed">{ach.achievement_description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {displayData.languages && displayData.languages.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-green-700 relative inline-block">
                  🌍 Languages
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                </h2>
                <div className="flex flex-wrap gap-4">
                  {displayData.languages.map((lang, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-100 to-teal-100 px-6 py-3 rounded-full border-2 border-green-300 shadow-lg">
                      <span className="font-bold text-gray-800">{lang.language}</span>
                      <span className="text-green-600 ml-2">• {lang.proficiency_level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Extra Information */}
            {displayData.extra && (
              <section className="mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 relative inline-block">
                  ✨ More About Me
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </h2>
                <p className="text-gray-800 text-lg leading-relaxed bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-l-4 border-indigo-500 shadow-lg">
                  {displayData.extra}
                </p>
              </section>
            )}

            {/* Footer decorative element */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 text-2xl">
                <span className="animate-bounce">🌟</span>
                <span className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                  Thanks for checking out my resume!
                </span>
                <span className="animate-bounce">🌟</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 'Classic Corporate':
      containerClasses = "bg-white p-8 text-gray-700 font-sans shadow-lg rounded-lg max-w-2xl mx-auto border border-gray-200";
      headerClasses = "text-center pb-4 mb-6 border-b border-gray-400";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide";
      accentColor = "text-green-700";
      break;
    case 'Tech Minimalist':
      // This is the template we are generating based on the image image_3cad21.png
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
                <h2 className="text-2xl font-bold mb-4 text-cyan-400 relative inline-block">
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
      // Default template structure (if no templateName matches)
      containerClasses = "bg-white p-8 text-gray-800 font-sans shadow-lg rounded-lg max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b-2 border-gray-300";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2";
      accentColor = "text-blue-700";

      return (
        <div className={containerClasses}>
          {/* Header - Name, Contact Info */}
          <header className={headerClasses}>
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
            <h2 className={sectionTitleClasses}>Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{displayData.summary}</p>
          </section>

          {/* Skills */}
          {displayData.skills && displayData.skills.length > 0 && (
            <section className="mb-6">
              <h2 className={sectionTitleClasses}>Skills</h2>
              <ul className="flex flex-wrap gap-2 text-sm text-center items-center">
                {displayData.skills.map((skill, index) => (
                  <li key={index} className={`text-center align-middle justify-center px-3 py-1 rounded-full bg-gray-200 ${accentColor.replace('text-', 'bg-')}`}>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Experience */}
          {displayData.experience && displayData.experience.length > 0 && (
            <section className="mb-6">
              <h2 className={sectionTitleClasses}>Experience</h2>
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
                    {lang.language} - <span className={accentColor}>{lang.proficiency_level}</span>
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