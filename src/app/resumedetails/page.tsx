'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik'; 
import * as Yup from 'yup'; //Yup is for validation

import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { BsBagDashFill } from "react-icons/bs";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import Header2 from '../components/header2';
import Footer from '../components/footer';
import { FaProjectDiagram } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";


interface FormValues {
  full_name: string;
  phone: string;
  email: string;
  home: string;
  summary: string;
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
    ).min(1, '*At least one education entry is required'), // Ensure at least one entry
    languages: Yup.array().of(
      Yup.object().shape({
        language: Yup.string().required('*Language is required'),
        proficiency_level: Yup.string().required('*Proficiency level is required'),
      })
    ).min(1, '*At least one language entry is required'), // Ensure at least one entry
    experience: Yup.array().of(
      Yup.object().shape({
        company_name: Yup.string().required('*Company name is required'),
        key_role: Yup.string().required('*Key role is required'),
        start_date: Yup.string().required('*Start date is required'), // Consider more robust date validation
        end_date: Yup.string().required('*End date is required'),
        job_summary: Yup.string().min(30, '*Summary must be at least 30 characters').required('Job summary is required'),
      })
    ),
    project: Yup.array().of(
      Yup.object().shape({
        project_title: Yup.string().required('*Project title is required'),
        project_description: Yup.string().min(20, '*Description must be at least 20 characters').required('Project description is required'),
      })
    ),
    achievement: Yup.array().of(
      Yup.object().shape({
        achievement_title: Yup.string().required('*Achievement title is required'),
        achievement_description: Yup.string().min(20, '*Description must be at least 20 characters').required('Achievement description is required'),
      })
    ),
    extra: Yup.string(),
  });

  return (
    <>
      <Header2 />
      <Formik<FormValues>
        initialValues={{
          full_name: '',
          phone: '',
          email: '',
          home: '',
          summary: '',
          education: [{ institution: '', passing_year: '', grade: '' }],
          languages: [{ language: '', proficiency_level: '' }],
          experience: [{ company_name: '', key_role: '', start_date: '', end_date: '', job_summary: '' }],
          project: [{ project_title: '', project_description: '' }],
          achievement: [{ achievement_title: '', achievement_description: '' }],
          extra: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = { ...values, skills };
          alert(JSON.stringify(formData, null, 2));
          console.log(formData);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <div className='w-full min-h-screen bg-gray-950 text-white px-8 py-12'>
              {/*Personal Information*/}
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

                {/* Address */}
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


                {/* Summary */}
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

              {/*Skills (Still managed by local state, as before) */}
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
                    placeholder="Type a skill and press Enter"
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

              {/* Education */}
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
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            
                            {touched.education?.[index]?.institution && (errors.education?.[index] as any)?.institution && (
                              <div className="text-red-500 text-sm mt-1">
                                {(errors.education?.[index] as any).institution as React.ReactNode}
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
                              
                              {touched.education?.[index]?.passing_year && (errors.education?.[index] as any)?.passing_year && (
                                <div className="text-red-500 text-sm mt-1">
                                  {(errors.education?.[index] as any).passing_year as React.ReactNode}
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

              <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><FaGraduationCap /></p>
                  <p className='text-3xl font-bold'>Education</p>
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
                          {touched.languages?.[index]?.language && (errors.languages?.[index] as any)?.language && (
                            <div className="text-red-500 text-sm mt-1">{(errors.languages?.[index] as any).language as React.ReactNode}</div>
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
                          {touched.languages?.[index]?.proficiency_level && (errors.languages?.[index] as any)?.proficiency_level && (
                            <div className="text-red-500 text-sm mt-1">{(errors.languages?.[index] as any).proficiency_level as React.ReactNode}</div>
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


              {/*Experience */}
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
                            {touched.experience?.[index]?.company_name && (errors.experience?.[index] as any)?.company_name && (
                              <div className="text-red-500 text-sm mt-1">{(errors.experience?.[index] as any).company_name as React.ReactNode}</div>
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
                            {touched.experience?.[index]?.key_role && (errors.experience?.[index] as any)?.key_role && (
                              <div className="text-red-500 text-sm mt-1">{(errors.experience?.[index] as any).key_role as React.ReactNode}</div>
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
                              {touched.experience?.[index]?.start_date && (errors.experience?.[index] as any)?.start_date && (
                                <div className="text-red-500 text-sm mt-1">{(errors.experience?.[index] as any).start_date as React.ReactNode}</div>
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
                              {touched.experience?.[index]?.end_date && (errors.experience?.[index] as any)?.end_date && (
                                <div className="text-red-500 text-sm mt-1">{(errors.experience?.[index] as any).end_date as React.ReactNode}</div>
                              )}
                            </div>
                          </div>

                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`experience.${index}.job_summary`} className="text-lg text-gray-300 font-semibold">Summary</label>
                            <Field
                              as="textarea"
                              rows={5}
                              id={`experience.${index}.job_summary`}
                              name={`experience.${index}.job_summary`}
                              placeholder='Describe your responsibilities and achievements'
                              className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                            />
                            {touched.experience?.[index]?.job_summary && (errors.experience?.[index] as any)?.job_summary && (
                              <div className="text-red-500 text-sm mt-1">{(errors.experience?.[index] as any).job_summary as React.ReactNode}</div>
                            )}
                          </div>

                          {values.experience.length > 1 && (
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

              {/* Projects Section */}
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
                              placeholder='e.g., E-commerce Website'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.project?.[index]?.project_title && (errors.project?.[index] as any)?.project_title && (
                              <div className="text-red-500 text-sm mt-1">{(errors.project?.[index] as any).project_title as React.ReactNode}</div>
                            )}
                          </div>

                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`project.${index}.project_description`} className="text-lg text-gray-300 font-semibold">Description</label>
                            <Field
                              as="textarea"
                              rows={4}
                              id={`project.${index}.project_description`}
                              name={`project.${index}.project_description`}
                              placeholder='Describe your project, technologies used, and key features'
                              className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                            />
                            {touched.project?.[index]?.project_description && (errors.project?.[index] as any)?.project_description && (
                              <div className="text-red-500 text-sm mt-1">{(errors.project?.[index] as any).project_description as React.ReactNode}</div>
                            )}
                          </div>

                          {values.project.length > 1 && (
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


              
                {/* Achievements Section */}
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
                              placeholder='e.g., Hackathon Winner, Certification'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {touched.achievement?.[index]?.achievement_title && (errors.achievement?.[index] as any)?.achievement_title && (
                              <div className="text-red-500 text-sm mt-1">{(errors.achievement?.[index] as any).achievement_title as React.ReactNode}</div>
                            )}
                          </div>

                          <div className='flex flex-col gap-2'>
                            <label htmlFor={`achievement.${index}.achievement_description`} className="text-lg text-gray-300 font-semibold">Description</label>
                            <Field
                              as="textarea"
                              rows={3}
                              id={`achievement.${index}.achievement_description`}
                              name={`achievement.${index}.achievement_description`}
                              placeholder='Describe your achievement and its significance'
                              className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                            />
                            {touched.achievement?.[index]?.achievement_description && (errors.achievement?.[index] as any)?.achievement_description && (
                              <div className="text-red-500 text-sm mt-1">{(errors.achievement?.[index] as any).achievement_description as React.ReactNode}</div>
                            )}
                          </div>

                          {values.achievement.length > 1 && (
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

              {/*Additional Add-ons */}
              <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><BsFillBookmarkPlusFill /></p>
                  <p className='text-3xl font-bold'>Additional add-ons</p>
                </span>
                <Field
                  as="textarea"
                  rows={5}
                  id="extra"
                  name="extra"
                  placeholder='Extras'
                  className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                />
                {touched.extra && errors.extra && <div className="text-red-500 text-sm mt-1">{errors.extra}</div>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className='bg-gradient-to-r from-blue-500 to-cyan-500 w-[25rem] py-3 rounded-lg font-semibold mx-auto block'
              >
                {isSubmitting ? 'Generating...' : 'Generate Resume'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Footer />
    </>
  );
}

export default Page;