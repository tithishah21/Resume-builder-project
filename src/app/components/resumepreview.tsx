import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
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
    phone: "+1 (555) 123-4567",
    email: "alex.jordan@email.com",
    home: "San Francisco, CA",
    summary: "Creative and tech-savvy digital native with a passion for innovative design and cutting-edge technology. Experienced in creating viral content and building engaging user experiences.",
    skills: ["React", "TypeScript", "Figma", "TikTok Marketing", "UI/UX Design", "Social Media Strategy"],
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
        job_summary: "Built responsive web applications reaching 100K+ users. Implemented modern UI/UX designs that increased user engagement by 45%."
      }
    ],
    project: [
      {
        project_title: "EcoTracker App",
        project_description: "Developed a sustainability tracking app using React Native. Won 1st place at HackTheClimate hackathon."
      }
    ],
    achievement: [
      {
        achievement_title: "Forbes 30 Under 30 Nominee",
        achievement_description: "Nominated for technology category for innovative work in sustainable tech solutions."
      }
    ],
    extra: "Passionate about sustainable technology, mental health advocacy, and creating inclusive digital spaces."
  };

  const displayData = formData && Object.keys(formData).length > 0 ? formData : sampleData;

  if (!displayData) {
    return <div className="text-white text-center">No resume data to display.</div>;
  }

  //Template-specific styling 
  let containerClasses = "p-8 text-black shadow-lg rounded-lg";
  let headerClasses = "text-center pb-4 mb-6 border-b";
  let sectionTitleClasses = "text-xl font-bold mb-3 mt-6";
  let accentColor = "text-blue-600";

  switch (templateName) {
    case 'Modern Professional':
      containerClasses = "bg-white p-8 text-gray-800 font-sans shadow-lg rounded-lg max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b-2 border-gray-300";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2";
      accentColor = "text-blue-700";
      break;
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
                  <span><IoMdMail /></span>
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
      containerClasses = "bg-white p-8 text-gray-700 font-serif shadow-lg rounded-lg max-w-2xl mx-auto border border-gray-200";
      headerClasses = "text-center pb-4 mb-6 border-b border-gray-400";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide";
      accentColor = "text-green-700"; 
      break;
    case 'Tech Minimalist':
      containerClasses = "bg-gray-900 p-8 text-white font-mono shadow-2xl rounded-xl max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b border-gray-700";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-cyan-400 uppercase tracking-widest";
      accentColor = "text-lime-400";
      break;
    default:
      containerClasses = "bg-white p-8 text-gray-800 font-sans shadow-lg rounded-lg max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b-2 border-gray-300";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2";
      accentColor = "text-blue-700";
  }

  return (
    <div className={containerClasses}>
      {/* Header - Name, Contact Info */}
      <header className={headerClasses}>
        <h1 className="text-4xl font-extrabold mb-2">{displayData.full_name}</h1>
        <p className="text-gray-600">
          {displayData.phone} | {displayData.email} | {displayData.home}
        </p>
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
          <ul className="flex flex-wrap gap-2 text-sm">
            {displayData.skills.map((skill, index) => (
              <li key={index} className={`px-3 py-1 rounded-full bg-gray-200 ${accentColor.replace('text-', 'bg-')}`}>
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
              <h3 className="font-semibold text-lg">{exp.key_role} at {exp.company_name}</h3>
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
              <h3 className="font-semibold text-lg">{edu.institution}</h3>
              <p className="text-gray-600 text-sm">{edu.passing_year} {edu.grade ? `(${edu.grade})` : ''}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
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

      {/* Achievements */}
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

      {/* Languages */}
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

      {/* Extra Information */}
      {displayData.extra && (
        <section>
          <h2 className={sectionTitleClasses}>Additional Information</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{displayData.extra}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;