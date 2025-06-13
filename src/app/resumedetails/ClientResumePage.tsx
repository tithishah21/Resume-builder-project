'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
// Removed FormikTouched from here
import { Formik, Form, Field, FieldArray, FormikErrors } from 'formik';
import * as Yup from 'yup';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import ResumePreview from '../components/resumepreview'; 

import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { BsBagDashFill } from "react-icons/bs";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

import { FaProjectDiagram } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";

import Header2 from '../components/header2';
import Footer from '../components/footer';

import { createClient } from '../../../utils/supabase/client';

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


type FieldArrayErrors<T> = FormikErrors<T> | FormikErrors<T[]>;

function Page() {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]); 
  const [userId, setUserId] = useState<string | null>(null);
  // const [loadingUser, setLoadingUser] = useState(true);

  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false); 
  const [resumeData, setResumeData] = useState<FormValues | null>(null);

  const [currentStep, setCurrentStep] = useState(0);

  const supabase = createClient();
  const totalSteps = 8;
  const calculateProgress = () => {
    if(showPreview){
      return 100;
    }
    const stepProgress = (currentStep / totalSteps) * 100;
    return Math.round(stepProgress);
  };
  
  const progressPercentage = calculateProgress();

  useEffect(() => {
    const getUserIdFromLocalStorage = () => {
      const storedUserString = localStorage.getItem('user');
      if (storedUserString) {
        try {
          const storedUser = JSON.parse(storedUserString);
          if (storedUser && storedUser.id) {
            setUserId(storedUser.id);
            console.log("User ID retrieved from localStorage:", storedUser.id);
          } else {
            console.warn('User object found in localStorage, but ID is missing or invalid. Clearing local storage.');
            localStorage.removeItem('user');
            setUserId(null);
          }
        } catch (e) {
          console.error('Error parsing user data from localStorage:', e);
          localStorage.removeItem('user');
          setUserId(null);
        }
      } else {
        console.warn('User data not found in localStorage. User might not be logged in.');
        setUserId(null);
      }
      
    };

    const storedResume = localStorage.getItem('resumeData');
    if (storedResume) {
      try {
        const parsedResume: FormValues = JSON.parse(storedResume);
        setResumeData(parsedResume);
        setSkills(parsedResume.skills || []);
        console.log("Loaded resume data from localStorage.");
      } catch (e) {
        console.error("Error parsing resume data:", e);
        localStorage.removeItem('resumeData');
      }
    };

    const getTemplateFromUrl = () => {
      const template = searchParams.get('template');
      if (template) {
        setSelectedTemplate(template);
        console.log('Selected Template from URL:', template);
      } else {
        console.warn('No template selected via URL query parameter. Consider setting a default or redirecting.');
      }
    };

    getUserIdFromLocalStorage();
    getTemplateFromUrl();

  }, [searchParams]);

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

  // --- PDF Download Function ---
  const handleDownloadPdf = async () => {
    if (!showPreview || !resumeData) {
        alert("Please generate the resume preview first before downloading.");
        return;
    }

    const input = document.getElementById('resume-content');
    if (input) {
        const scale = 2; 

        try {
            const canvas = await html2canvas(input, {
                scale: scale,
                useCORS: true,
                logging: true, 
                windowWidth: input.scrollWidth, 
                windowHeight: input.scrollHeight 
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210; 
            const pageHeight = 100; 
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${resumeData.full_name || 'My_Resume'}-${selectedTemplate || 'template'}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    } else {
        console.error("Could not find element with ID 'resume-content'.");
        alert("Resume content not found for PDF generation.");
    }
  };

  // --- Yup Validation Schema ---
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('*Full Name is required'),
    phone: Yup.string().matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number').required('*Phone number is required'),
    email: Yup.string().email('Invalid email address').required('*Email is required'),
    home: Yup.string().min(10, 'Address must be at least 10 characters').required('*Home Address is required'),
    summary: Yup.string().min(50, 'Summary must be at least 50 characters').required('*Professional Summary is required'),
    education: Yup.array().of(
      Yup.object().shape({
        institution: Yup.string().required('*Institution name is required'),
        passing_year: Yup.string().matches(/^\d{4}$/, 'Invalid year (e.g., 2027)').required('*Passing year is required'),
        grade: Yup.string(),
      })
    ).min(1, '*At least one education entry is required'),
    languages: Yup.array().of(
      Yup.object().shape({
        language: Yup.string().required('*Language is required'),
        proficiency_level: Yup.string().required('*Proficiency level is required'),
      })
    ).min(1, '*At least one language entry is required'),
    experience: Yup.array().of(
      Yup.object().shape({
        company_name: Yup.string().required('*Company name is required'),
        key_role: Yup.string().required('*Key role is required'),
        start_date: Yup.string().required('*Start date is required'),
        end_date: Yup.string().required('*End date is required'),
        job_summary: Yup.string().min(30, '*Summary must be at least 30 characters').required('Job summary is required'),
      })
    ),
    project: Yup.array().of(
      Yup.object().shape({
        project_title: Yup.string(),
        project_description: Yup.string(),
      })
    ),
    achievement: Yup.array().of(
      Yup.object().shape({
        achievement_title: Yup.string(),
        achievement_description: Yup.string(),
      })
    ),
    extra: Yup.string(),
  });

  return (
    <>
    {/* Floating elements*/}
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-40 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-cyan-300 rounded-lg opacity-30 animate-spin"></div>
            <div className="absolute bottom-12 left-24 w-10 h-10 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-16 h-16 bg-orange-500 rounded-full opacity-25 animate-pulse"></div>
            <div className="absolute top-[50%] left-1 w-8 h-8 bg-sky-300 rotate-45 opacity-20 animate-spin"></div>
            <div className="absolute top-96 right-2 w-10 h-10 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-[96%] right-10 w-16 h-16 bg-fuchsia-500 rounded-lg opacity-30 animate-pulse"></div>
            <div className="absolute bottom-[30%] left-[10%] w-12 h-12 bg-red-600 rounded-full opacity-25 animate-ping"></div>
          </div>
      <Header2 />

      {!showPreview ? (
  resumeData ? (
    <Formik<FormValues>
      initialValues={{
        ...resumeData,
        skills: skills, // use current skills state
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        if (!userId) {
          alert('User not logged in or user ID not found in local storage. Please log in.');
          setSubmitting(false);
          return;
        }
        setSubmitting(true);

        const formDataToSubmit: FormValues = {
          ...values,
          skills: skills,
        };

        setResumeData(formDataToSubmit);
        setShowPreview(true);

        console.log("Submitting Data to Supabase:", formDataToSubmit);

        try {
          const { data, error } = await supabase
            .from('resumes')
            .insert([{ user_id: userId, ...formDataToSubmit }])
            .select();

          if (error) {
            console.error('Error inserting resume data:', error);
            alert(`Error saving resume: ${error.message}`);
          } else {
            console.log('Resume data inserted successfully:', data);
            alert('Resume saved successfully! Scroll down to see the preview.');
          }
        } catch (err) {
          console.error('Unexpected error during submission:', err);
          alert('An unexpected error occurred.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form>

            <div className='w-full min-h-screen bg-gray-950 text-white px-0 py-0'>

            {/*Progress Bar */}
            <div className="mb-10 top-20 left-0 right-0 z-50 bg-gray-800 h-8 flex items-center justify-start overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#00ffe0] to-[#0077ff] transition-all duration-500 ease-out flex items-center justify-center "
                    style={{ width: `${progressPercentage}%` }}
                >
                    {progressPercentage > 0 && (
                    <span className="text-black text-sm font-semibold whitespace-nowrap">
                        {progressPercentage}% Completed
                    </span>
                    )}
                </div>
                {progressPercentage === 0 && (
                  <span className="absolute left-1/2 -translate-x-1/2 text-gray-400 text-sm font-semibold">
                      {progressPercentage}% Completed
                  </span>
                 )}
            </div>

              {/* Personal Information */}
              {currentStep == 0 && (
                <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><IoPeopleOutline /></p>
                  <p className='text-3xl font-bold'>Personal Information</p>
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-start gap-[26rem] mt-5">
                    <label htmlFor="full_name" className="text-lg text-gray-300 font-semibold">Full Name</label>
                    <label htmlFor="phone" className="text-lg text-gray-300 font-semibold">Phone Number</label>
                  </div>
                  <div className="flex justify-between gap-10">
                    <Field
                      type="text"
                      id="full_name"
                      name="full_name"
                      placeholder='Enter your full name'
                      className="placeholder:text-base w-1/2 px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder='Enter your phone number'
                      className="placeholder:text-base w-1/2 px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                  {touched.full_name && errors.full_name && <div className="text-red-500 text-sm mt-1">{errors.full_name}</div>}
                  {touched.phone && errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                </div>
                <label htmlFor="email" className='text-lg text-gray-300 font-semibold mt-6'>Email Address</label>
                <Field
                  type='email'
                  id="email"
                  name="email"
                  placeholder='Enter your email address'
                  className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                />
                {touched.email && errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                <label htmlFor="home" className='text-lg text-gray-300 font-semibold mt-6'>Home Address</label>
                <Field
                  as="textarea"
                  rows={3}
                  id="home"
                  name="home"
                  placeholder='Enter your home address'
                  className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                />
                {touched.home && errors.home && <div className="text-red-500 text-sm mt-1">{errors.home}</div>}
                <label htmlFor="summary" className='text-lg text-gray-300 font-semibold mt-6'>Professional Summary</label>
                <Field
                  as="textarea"
                  rows={6}
                  id="summary"
                  name="summary"
                  placeholder='Enter a short paragraph that best describes you'
                  className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                />
                {touched.summary && errors.summary && <div className="text-red-500 text-sm mt-1">{errors.summary}</div>}
              </div>
              )}

              

              {/* Skills (managed by local state) */}
              {currentStep == 1 && (
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
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-white hover:text-red-400"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <div className='flex gap-3'>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Type a skill and click on 'Add' button"
                    className='placeholder:text-base flex-1 px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-cyan-400/20'
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold'
                  >
                    Add
                  </button>
                </div>
              </div>
              )}
              

              {/* Education */}
              {currentStep == 2 && (
                <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><FaGraduationCap /></p>
                  <p className='text-3xl font-bold'>Education</p>
                </span>
                <FieldArray name="education">
                  {({ push, remove }) => (
                    <>
                      {values.education.map((edu, index) => (
                        <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`education.${index}.institution`} className="text-lg text-gray-300 font-semibold">Institution Name</label>
                            <Field
                              type="text"
                              id={`education.${index}.institution`}
                              name={`education.${index}.institution`}
                              placeholder='e.g., VIT University, Vellore'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-ring-cyan-400/20"
                            />
                            {touched.education?.[index] &&
                             (errors.education as FieldArrayErrors<typeof values.education>)?.[index] &&
                             typeof (errors.education as FieldArrayErrors<typeof values.education>)[index] === 'object' &&
                             ((errors.education as FormikErrors<typeof values.education[number]>[])[index] as FormikErrors<typeof values.education[number]>).institution && (
                               <div className="text-red-500 text-sm mt-1">
                                 {((errors.education as FormikErrors<typeof values.education[number]>[])[index] as FormikErrors<typeof values.education[number]>).institution}
                               </div>
                             )}
                          </div>
                          <div className='flex flex-wrap gap-5'>
                            <div className='flex-1'>
                              <label htmlFor={`education.${index}.passing_year`} className="text-lg text-gray-300 font-semibold">Year of Passing</label>
                              <Field
                                type="text"
                                id={`education.${index}.passing_year`}
                                name={`education.${index}.passing_year`}
                                placeholder='e.g., 2027'
                                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                              />
                              {touched.education?.[index] &&
                               (errors.education as FieldArrayErrors<typeof values.education>)?.[index] &&
                               typeof (errors.education as FieldArrayErrors<typeof values.education>)[index] === 'object' &&
                               ((errors.education as FormikErrors<typeof values.education[number]>[])[index] as FormikErrors<typeof values.education[number]>).passing_year && (
                                <div className="text-red-500 text-sm mt-1">
                                  {((errors.education as FormikErrors<typeof values.education[number]>[])[index] as FormikErrors<typeof values.education[number]>).passing_year}
                                </div>
                              )}
                            </div>
                            <div className='flex-1'>
                              <label htmlFor={`education.${index}.grade`} className="text-lg text-gray-300 font-semibold">Grade (Optional)</label>
                              <Field
                                type="text"
                                id={`education.${index}.grade`}
                                name={`education.${index}.grade`}
                                placeholder='e.g., 9.0 CGPA'
                                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                              />
                            </div>
                          </div>
                          {values.education.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className='self-start text-red-400 hover:underline text-sm mt-2'
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ institution: '', passing_year: '', grade: '' })}
                        className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
                      >
                        + Add Another Education
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              )}
              

              {/* Languages */}
              {currentStep == 3 && (
                <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><IoLanguage /></p>
                  <p className='text-3xl font-bold'>Languages known</p>
                </span>
                <FieldArray name="languages">
                  {({ push, remove }) => (
                    <>
                      {values.languages.map((lang, index) => (
                        <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`languages.${index}.language`} className="text-lg text-gray-300 font-semibold">Language</label>
                            <Field
                              name={`languages.${index}.language`}
                              placeholder="e.g., English"
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.languages?.[index] &&
                             (errors.languages as FieldArrayErrors<typeof values.languages>)?.[index] &&
                             typeof (errors.languages as FieldArrayErrors<typeof values.languages>)[index] === 'object' &&
                             ((errors.languages as FormikErrors<typeof values.languages[number]>[])[index] as FormikErrors<typeof values.languages[number]>).language && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.languages as FormikErrors<typeof values.languages[number]>[])[index] as FormikErrors<typeof values.languages[number]>).language}
                              </div>
                            )}
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`languages.${index}.proficiency_level`} className="text-lg text-gray-300 font-semibold">Proficiency Level</label>
                            <Field
                              as="select"
                              name={`languages.${index}.proficiency_level`}
                              className='w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                            >
                              <option value="">Select proficiency level</option>
                              <option value="Native Proficiency">Native Proficiency</option>
                              <option value="Bilingual Proficiency">Bilingual Proficiency</option>
                              <option value="Professional Proficiency">Professional Proficiency</option>
                              <option value="Limited Working Proficiency">Limited Working Proficiency</option>
                              <option value="Elementary Proficiency">Elementary Proficiency</option>
                            </Field>
                            {touched.languages?.[index] &&
                             (errors.languages as FieldArrayErrors<typeof values.languages>)?.[index] &&
                             typeof (errors.languages as FieldArrayErrors<typeof values.languages>)[index] === 'object' &&
                             ((errors.languages as FormikErrors<typeof values.languages[number]>[])[index] as FormikErrors<typeof values.languages[number]>).proficiency_level && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.languages as FormikErrors<typeof values.languages[number]>[])[index] as FormikErrors<typeof values.languages[number]>).proficiency_level}
                              </div>
                            )}
                          </div>
                          {values.languages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className='self-start text-red-400 hover:underline text-sm mt-2'
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ language: '', proficiency_level: '' })}
                        className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
                      >
                        + Add Another Language
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              )}
              

              {/* Experience */}
              {currentStep == 4 && (
                <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><BsBagDashFill /></p>
                  <p className='text-3xl font-bold'>Experience</p>
                </span>
                <FieldArray name="experience">
                  {({ push, remove }) => (
                    <>
                      {values.experience.map((exp, index) => (
                        <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`experience.${index}.company_name`} className="text-lg text-gray-300 font-semibold">Company Name</label>
                            <Field
                              type="text"
                              id={`experience.${index}.company_name`}
                              name={`experience.${index}.company_name`}
                              placeholder='e.g., JP Morgan Chase'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.experience?.[index] &&
                             (errors.experience as FieldArrayErrors<typeof values.experience>)?.[index] &&
                             typeof (errors.experience as FieldArrayErrors<typeof values.experience>)[index] === 'object' &&
                             ((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).company_name && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).company_name}
                              </div>
                            )}
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`experience.${index}.key_role`} className="text-lg text-gray-300 font-semibold">Key Role</label>
                            <Field
                              type="text"
                              id={`experience.${index}.key_role`}
                              name={`experience.${index}.key_role`}
                              placeholder='e.g., Software Developer Engineer'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.experience?.[index] &&
                             (errors.experience as FieldArrayErrors<typeof values.experience>)?.[index] &&
                             typeof (errors.experience as FieldArrayErrors<typeof values.experience>)[index] === 'object' &&
                             ((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).key_role && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).key_role}
                              </div>
                            )}
                          </div>
                          <div className='flex flex-wrap gap-5'>
                            <div className='flex-1'>
                              <label htmlFor={`experience.${index}.start_date`} className="text-lg text-gray-300 font-semibold">Start Date</label>
                              <Field
                                type="month"
                                id={`experience.${index}.start_date`}
                                name={`experience.${index}.start_date`}
                                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                              />
                              {touched.experience?.[index] &&
                               (errors.experience as FieldArrayErrors<typeof values.experience>)?.[index] &&
                               typeof (errors.experience as FieldArrayErrors<typeof values.experience>)[index] === 'object' &&
                               ((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).start_date && (
                                <div className="text-red-500 text-sm mt-1">
                                  {((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).start_date}
                                </div>
                              )}
                            </div>
                            <div className='flex-1'>
                              <label htmlFor={`experience.${index}.end_date`} className="text-lg text-gray-300 font-semibold">End Date</label>
                              <Field
                                type="text"
                                id={`experience.${index}.end_date`}
                                name={`experience.${index}.end_date`}
                                placeholder='e.g., Currently / May, 2025'
                                className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                              />
                              {touched.experience?.[index] &&
                               (errors.experience as FieldArrayErrors<typeof values.experience>)?.[index] &&
                               typeof (errors.experience as FieldArrayErrors<typeof values.experience>)[index] === 'object' &&
                               ((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).end_date && (
                                <div className="text-red-500 text-sm mt-1">
                                  {((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).end_date}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`experience.${index}.job_summary`} className="text-lg text-gray-300 font-semibold">Job Summary</label>
                            <Field
                              as="textarea"
                              rows={4}
                              id={`experience.${index}.job_summary`}
                              name={`experience.${index}.job_summary`}
                              placeholder='Summarize your key responsibilities and achievements'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.experience?.[index] &&
                             (errors.experience as FieldArrayErrors<typeof values.experience>)?.[index] &&
                             typeof (errors.experience as FieldArrayErrors<typeof values.experience>)[index] === 'object' &&
                             ((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).job_summary && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.experience as FormikErrors<typeof values.experience[number]>[])[index] as FormikErrors<typeof values.experience[number]>).job_summary}
                              </div>
                            )}
                          </div>
                          {values.experience.length > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className='self-start text-red-400 hover:underline text-sm mt-2'
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ company_name: '', key_role: '', start_date: '', end_date: '', job_summary: '' })}
                        className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
                      >
                        + Add Another Experience
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              )}
              

              {/* Projects */}
              {currentStep == 5 && (
                <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><FaProjectDiagram /></p>
                  <p className='text-3xl font-bold'>Projects</p>
                </span>
                <FieldArray name="project">
                  {({ push, remove }) => (
                    <>
                      {values.project.map((proj, index) => (
                        <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`project.${index}.project_title`} className="text-lg text-gray-300 font-semibold">Project Title</label>
                            <Field
                              type="text"
                              id={`project.${index}.project_title`}
                              name={`project.${index}.project_title`}
                              placeholder='e.g., E-commerce Platform'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.project?.[index] &&
                             (errors.project as FieldArrayErrors<typeof values.project>)?.[index] &&
                             typeof (errors.project as FieldArrayErrors<typeof values.project>)[index] === 'object' &&
                             ((errors.project as FormikErrors<typeof values.project[number]>[])[index] as FormikErrors<typeof values.project[number]>).project_title && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.project as FormikErrors<typeof values.project[number]>[])[index] as FormikErrors<typeof values.project[number]>).project_title}
                              </div>
                            )}
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`project.${index}.project_description`} className="text-lg text-gray-300 font-semibold">Project Description</label>
                            <Field
                              as="textarea"
                              rows={4}
                              id={`project.${index}.project_description`}
                              name={`project.${index}.project_description`}
                              placeholder='Describe your project and your contributions'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.project?.[index] &&
                             (errors.project as FieldArrayErrors<typeof values.project>)?.[index] &&
                             typeof (errors.project as FieldArrayErrors<typeof values.project>)[index] === 'object' &&
                             ((errors.project as FormikErrors<typeof values.project[number]>[])[index] as FormikErrors<typeof values.project[number]>).project_description && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.project as FormikErrors<typeof values.project[number]>[])[index] as FormikErrors<typeof values.project[number]>).project_description}
                              </div>
                            )}
                          </div>
                          {values.project.length > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className='self-start text-red-400 hover:underline text-sm mt-2'
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ project_title: '', project_description: '' })}
                        className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
                      >
                        + Add Another Project
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              )}
              

              {/* Achievements */}
              {currentStep == 6 && (
                <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><FaTrophy /></p>
                  <p className='text-3xl font-bold'>Achievements</p>
                </span>
                <FieldArray name="achievement">
                  {({ push, remove }) => (
                    <>
                      {values.achievement.map((ach, index) => (
                        <div key={index} className='mt-5 flex flex-col gap-4 mb-6 border-b border-gray-700 pb-6'>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`achievement.${index}.achievement_title`} className="text-lg text-gray-300 font-semibold">Achievement Title</label>
                            <Field
                              type="text"
                              id={`achievement.${index}.achievement_title`}
                              name={`achievement.${index}.achievement_title`}
                              placeholder='e.g., Dean’s List'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.achievement?.[index] &&
                             (errors.achievement as FieldArrayErrors<typeof values.achievement>)?.[index] &&
                             typeof (errors.achievement as FieldArrayErrors<typeof values.achievement>)[index] === 'object' &&
                             ((errors.achievement as FormikErrors<typeof values.achievement[number]>[])[index] as FormikErrors<typeof values.achievement[number]>).achievement_title && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.achievement as FormikErrors<typeof values.achievement[number]>[])[index] as FormikErrors<typeof values.achievement[number]>).achievement_title}
                              </div>
                            )}
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`achievement.${index}.achievement_description`} className="text-lg text-gray-300 font-semibold">Achievement Description</label>
                            <Field
                              as="textarea"
                              rows={4}
                              id={`achievement.${index}.achievement_description`}
                              name={`achievement.${index}.achievement_description`}
                              placeholder='Describe your achievement'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.achievement?.[index] &&
                             (errors.achievement as FieldArrayErrors<typeof values.achievement>)?.[index] &&
                             typeof (errors.achievement as FieldArrayErrors<typeof values.achievement>)[index] === 'object' &&
                             ((errors.achievement as FormikErrors<typeof values.achievement[number]>[])[index] as FormikErrors<typeof values.achievement[number]>).achievement_description && (
                              <div className="text-red-500 text-sm mt-1">
                                {((errors.achievement as FormikErrors<typeof values.achievement[number]>[])[index] as FormikErrors<typeof values.achievement[number]>).achievement_description}
                              </div>
                            )}
                          </div>
                          {values.achievement.length > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className='self-start text-red-400 hover:underline text-sm mt-2'
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ achievement_title: '', achievement_description: '' })}
                        className='px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold w-max'
                      >
                        + Add Another Achievement
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              )}
              

              {/* Extra Information */}
              {currentStep == 7 && (
                <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><BsFillBookmarkPlusFill /></p>
                  <p className='text-3xl font-bold'>Extra Information (Optional)</p>
                </span>
                <label htmlFor="extra" className='text-lg text-gray-300 font-semibold mt-2'>Any additional information?</label>
                <Field
                  as="textarea"
                  rows={4}
                  id="extra"
                  name="extra"
                  placeholder='E.g., Hobbies, interests, or any other relevant details.'
                  className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                />
                {touched.extra && errors.extra && <div className="text-red-500 text-sm mt-1">{errors.extra}</div>}
              </div>
              )}

               {/* Navigation Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                {currentStep > 0 && (
                    <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="mb-5 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-lg font-semibold"
                    >
                    Previous
                    </button>
                )}

                {currentStep < 7 && ( 
                    <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="mb-5 px-6 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-lg font-semibold"
                    >
                    Next
                    </button>
                )}

                {currentStep === 7 && ( 
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className='mb-5 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg text-lg font-semibold disabled:opacity-50'
                    >
                    {isSubmitting ? 'Submitting...' : 'Generate Resume'}
                    </button>
                )}
                </div>
            </div>
          </Form>
        )}
      </Formik>
      ):(  <p>No resume data found </p> )):(
        
      <div className="py-3 bg-gray-950 flex flex-col items-center justify-center min-h-screen pt-3"> 
      {/*Resume Preview */}
        <h2 className="text-4xl font-bold text-white mb-8">Your Resume Preview</h2>
        <div id="resume-content"> 
            {resumeData && selectedTemplate ? (
                <ResumePreview formData={resumeData} templateName={selectedTemplate} />
            ) : (
                <p className="text-white">Loading preview... If nothing appears, please go back and try again.</p>
            )}
        </div>

        <div className="flex gap-4 mt-8 pb-3">
            <button
              onClick={handleDownloadPdf}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-lg font-semibold"
            >
              Download PDF
            </button>
            <button
              onClick={() => {
                setShowPreview(false);
                setCurrentStep(7); 
              }} 
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-lg font-semibold"
            >
              Go Back to Edit
            </button>
        </div>
      </div>
    )}

    <Footer />
  </>
);
}

export default Page;