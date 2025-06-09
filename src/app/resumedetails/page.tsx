'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

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

import { createClient } from '../../../utils/supabase/client';

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

type FieldArrayErrors<T> = FormikErrors<T> | FormikErrors<T[]>;

function Page() {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  // userId will store the string representation from localStorage
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const supabase = createClient();

    useEffect(() => {
      const getUserIdFromLocalStorage = () => {
        const storedUserString = localStorage.getItem('user'); // Get the stringified user object
        if (storedUserString) {
          try {
            const storedUser = JSON.parse(storedUserString);
            if (storedUser && storedUser.id) {
              setUserId(storedUser.id);
              console.log("User ID retrieved from localStorage:", storedUser.id);
            } else {
              console.warn('User object found in localStorage, but ID is missing or invalid.');
            }
          } catch (e) {
            console.error('Error parsing user data from localStorage:', e);
          }
        } else {
          console.warn('User data not found in localStorage. User might not be logged in or ID not stored after login.');
        }
        setLoadingUser(false);
      };

      getUserIdFromLocalStorage();
    }, []);

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
        // validationSchema={validationSchema} // Uncomment this when ready
        onSubmit={async (values, { setSubmitting }) => {
          if (!userId) {
            alert('User not logged in or user ID not found in local storage. Please log in.');
            setSubmitting(false);
            return;
          }

          const formDataToSubmit = {
            user_id: userId, 
            full_name: values.full_name,
            phone: values.phone,
            email: values.email,
            home: values.home,
            summary: values.summary,
            skills: skills,
            education: values.education,
            languages: values.languages,
            experience: values.experience,
            project: values.project,
            achievement: values.achievement,
            extra: values.extra,
          };

          console.log("Submitting Data:", formDataToSubmit);

          try {
            const { data, error } = await supabase
              .from('resumes')
              .insert([formDataToSubmit])
              .select();

            if (error) {
              console.error('Error inserting resume data:', error);
              alert(`Error saving resume: ${error.message}`);
            } else {
              console.log('Resume data inserted successfully:', data);
              alert('Resume saved successfully!');
            }
          } catch (err) {
            console.error('Unexpected error during submission:', err);
            alert('An unexpected error occurred.');
          } finally {
            setSubmitting(false);
          }
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
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-ring-cyan-400/20"
                            />

                            {/* Corrected type checking for education errors */}
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

                              {/* Corrected type checking for education errors */}
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

                {/*Languages */}
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
                          {/* Corrected type checking for languages errors */}
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
                          {/* Corrected type checking for languages errors */}
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
                            {/* Corrected type checking for experience errors */}
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
                            {/* Corrected type checking for experience errors */}
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
                              {/* Corrected type checking for experience errors */}
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
                              {/* Corrected type checking for experience errors */}
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
                              placeholder='Summarize your responsibilities and achievements'
                              className="placeholder:text-base w-full px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                            />
                            {/* Corrected type checking for experience errors */}
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

              {/*Projects */}
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
                              placeholder='Describe your project, technologies used, and your role.'
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

              {/*Achievements */}
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
                              placeholder='e.g., Awarded "Employee of the Year"'
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
                              placeholder='Describe the achievement and its impact.'
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

              {/*Extra */}
              <div className='rounded-xl container mx-auto h-auto w-[70vw] px-6 py-5 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col mb-10'>
                <span className='inline-flex gap-2 my-5'>
                  <p className='text-cyan-400 text-3xl font-bold'><BsFillBookmarkPlusFill /></p>
                  <p className='text-3xl font-bold'>Extra Information (Optional)</p>
                </span>

                <label htmlFor="extra" className='text-lg text-gray-300 font-semibold mt-6'>Additional Details</label>
                <Field
                  as="textarea"
                  rows={4}
                  id="extra"
                  name="extra"
                  placeholder='Any other information you want to include (e.g., hobbies, interests, volunteering).'
                  className='placeholder:text-base px-5 text-lg py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
                />
              </div>

              {/* Submit Button */}
              <div className='flex justify-center mt-10'>
                <button
                  type="submit"
                  className='px-8 py-4 bg-green-600 hover:bg-green-500 text-white text-xl font-bold rounded-lg transition-all duration-300'
                  disabled={isSubmitting || loadingUser} // Disable if loading user ID or submitting
                >
                  {isSubmitting ? 'Saving Resume...' : 'Save Resume'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Footer />
    </>
  );
}

export default Page;