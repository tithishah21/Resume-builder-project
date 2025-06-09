
import React from 'react';

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
  if (!formData) {
    return <div className="text-white text-center">No resume data to display.</div>;
  }

  // --- Template-specific styling classes ---
  let containerClasses = "p-8 text-black shadow-lg rounded-lg";
  let headerClasses = "text-center pb-4 mb-6 border-b";
  let sectionTitleClasses = "text-xl font-bold mb-3 mt-6";
  let accentColor = "text-blue-600"; // Default accent

  switch (templateName) {
    case 'Modern Professional':
      containerClasses = "bg-white p-8 text-gray-800 font-sans shadow-lg rounded-lg max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b-2 border-gray-300";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2";
      accentColor = "text-blue-700";
      break;
    case 'Vibrant & Expressive (Gen Z)':
      containerClasses = "bg-gradient-to-br from-purple-100 to-pink-100 p-8 text-gray-900 font-mono shadow-xl rounded-2xl max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b-4 border-pink-400";
      sectionTitleClasses = "text-2xl font-extrabold mb-4 mt-8 text-purple-700 relative after:absolute after:w-10 after:h-1 after:bg-pink-500 after:-bottom-2 after:left-1/2 after:-translate-x-1/2";
      accentColor = "text-pink-600";
      break;
    case 'Classic Corporate':
      containerClasses = "bg-white p-8 text-gray-700 font-serif shadow-lg rounded-lg max-w-2xl mx-auto border border-gray-200";
      headerClasses = "text-center pb-4 mb-6 border-b border-gray-400";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-800 uppercase tracking-wide";
      accentColor = "text-green-700"; // Or deep blue
      break;
    case 'Tech Minimalist':
      containerClasses = "bg-gray-900 p-8 text-white font-mono shadow-2xl rounded-xl max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b border-gray-700";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-cyan-400 uppercase tracking-widest";
      accentColor = "text-lime-400"; // Or orange from template
      break;
    default:
      // Default styles if no template is selected or recognized
      containerClasses = "bg-white p-8 text-gray-800 font-sans shadow-lg rounded-lg max-w-2xl mx-auto";
      headerClasses = "text-center pb-4 mb-6 border-b-2 border-gray-300";
      sectionTitleClasses = "text-xl font-bold mb-3 mt-6 text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2";
      accentColor = "text-blue-700";
  }


  return (
    <div className={containerClasses}>
      {/* Header - Name, Contact Info */}
      <header className={headerClasses}>
        <h1 className="text-4xl font-extrabold mb-2">{formData.full_name}</h1>
        <p className="text-gray-600">
          {formData.phone} | {formData.email} | {formData.home}
        </p>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className={sectionTitleClasses}>Professional Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed">{formData.summary}</p>
      </section>

      {/* Skills */}
      {formData.skills && formData.skills.length > 0 && (
        <section className="mb-6">
          <h2 className={sectionTitleClasses}>Skills</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {formData.skills.map((skill, index) => (
              <li key={index} className={`px-3 py-1 rounded-full bg-gray-200 ${accentColor.replace('text-', 'bg-')}`}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {formData.experience && formData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className={sectionTitleClasses}>Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg">{exp.key_role} at {exp.company_name}</h3>
              <p className="text-gray-600 text-sm mb-1">{exp.start_date} - {exp.end_date}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{exp.job_summary}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {formData.education && formData.education.length > 0 && (
        <section className="mb-6">
          <h2 className={sectionTitleClasses}>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg">{edu.institution}</h3>
              <p className="text-gray-600 text-sm">{edu.passing_year} {edu.grade ? `(${edu.grade})` : ''}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {formData.project && formData.project.length > 0 && (
        <section className="mb-6">
          <h2 className={sectionTitleClasses}>Projects</h2>
          {formData.project.map((proj, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg">{proj.project_title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{proj.project_description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {formData.achievement && formData.achievement.length > 0 && (
        <section className="mb-6">
          <h2 className={sectionTitleClasses}>Achievements</h2>
          {formData.achievement.map((ach, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg">{ach.achievement_title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{ach.achievement_description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {formData.languages && formData.languages.length > 0 && (
        <section className="mb-6">
          <h2 className={sectionTitleClasses}>Languages</h2>
          <ul className="list-disc pl-5 text-sm">
            {formData.languages.map((lang, index) => (
              <li key={index}>
                {lang.language} - <span className={accentColor}>{lang.proficiency_level}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Extra Information */}
      {formData.extra && (
        <section>
          <h2 className={sectionTitleClasses}>Additional Information</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{formData.extra}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;