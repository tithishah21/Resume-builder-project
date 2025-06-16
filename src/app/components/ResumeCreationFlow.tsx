// src/components/ResumeCreationFlow.tsx
'use client'; // This component will run on the client side

import React from 'react';
import { useRouter } from 'next/navigation'; // For navigation to other pages

// Import icons from react-icons. Ensure you have 'react-icons' installed: npm install react-icons
import { FaRegHandPointRight, FaCheckCircle, FaDownload } from 'react-icons/fa';
import { FaLaptopCode, FaWrench } from 'react-icons/fa6'; // Using Fa6 for newer icons if available

const ResumeCreationFlow = () => {
  const router = useRouter(); // Initialize useRouter hook for navigation

  // Define the steps for the "How It Works" section
  const steps = [
    {
      icon: <FaLaptopCode />, // Icon for the step
      title: 'Choose a Template', // Title for the step
      description: 'Select from our ATS-friendly, professionally designed templates tailored for various industries.' // Description
    },
    {
      icon: <FaWrench />, // Icon for the step
      title: 'Customize Your Content',
      description: 'Fill in your experience, education, skills, and projects using our guided, step-by-step form.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Review & Refine',
      description: 'See instant changes with our live preview. Make quick edits to ensure everything is perfect.'
    },
    {
      icon: <FaDownload />,
      title: 'Download & Apply',
      description: 'Export your polished resume as a PDF and start applying to your dream jobs with confidence!'
    }
  ];

  // Define paths to your resume template preview images
  // IMPORTANT: Replace these with actual paths to images in your /public folder.
  // For example, if you have 'public/images/modern.jpg', the path here would be '/images/modern.jpg'
  const templates = [
    '/assets/template-modern-professional.jpg', // Placeholder image path 1
    '/assets/template-vibrant-expressive.jpg', // Placeholder image path 2
    '/assets/template-classic-corporate.jpg', // Placeholder image path 3
    '/assets/template-tech-minimalist.jpg'    // Placeholder image path 4
  ];

  // Fallback function for image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If an image fails to load, replace its source with a generic placeholder
    e.currentTarget.src = "https://placehold.co/200x280/2f2f2f/cccccc?text=Template";
    e.currentTarget.onerror = null; // Prevent infinite looping if placeholder also fails
  };

  return (
    <section id="creation-flow" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 overflow-hidden">
      {/* Background elements: Subtle abstract shapes/lines (SVG) */}
      {/* These SVG paths are animated via CSS keyframes defined in globals.css */}
      

      {/* Main content wrapped in a div with higher z-index to sit above background */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Headline Section (Inspired by your image_87c783.jpg) */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Impress Potential Employers with Your <span className="text-purple-500">Resume</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Follow our step-by-step professional guidance to create a polished resume in minutes, not hours.
          </p>
          <button
            onClick={() => router.push('/resumedetails')} // Navigates to the resume details/form page
            className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Create Your Resume Now
          </button>
        </div>

        {/* Social Proof Banner (Inspired by your image_87c6c5.jpg top banner) */}
        <div className="bg-blue-100 bg-opacity-10 rounded-lg p-5 mb-16 flex items-center justify-center space-x-3 shadow-md border border-blue-500/30 text-center">
          <FaRegHandPointRight className="text-blue-400 text-2xl animate-pulse" /> {/* Animated icon */}
          <p className="text-base sm:text-lg text-white font-semibold"> {/* Adjusted text size for responsiveness */}
            <span className="text-cyan-300">92% of our users</span> rate their experience positively!
            <span className="block text-xs sm:text-sm text-gray-400 mt-1">*Based on internal user surveys and success stories.</span> {/* Adjusted text size */}
          </p>
        </div>

        {/* How It Works - Step-by-Step Guide (ENHANCED) */}
        <h3 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-12 mt-20">
          Your Resume, In Just <span className="text-cyan-400">4 Simple Steps</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              // Added relative for step number positioning, group for hover, and improved hover effects
              className="relative bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-700
                         group transform hover:scale-105 hover:border-blue-500 transition-all duration-300 overflow-hidden"
            >
              {/* Step Number Badge */}
              <div className="absolute top-0 right-0 -mr-3 -mt-2 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold text-3xl rounded-full flex items-center justify-center shadow-md border-2 border-gray-900 z-10">
                {index + 1}
              </div>

              {/* Icon Container with Gradient Background */}
              <div className="text-5xl mb-6 p-4 rounded-full border-2 border-transparent bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-xl
                          group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300">
                {step.icon} {/* Render the icon */}
              </div>

              <h4 className="text-2xl font-semibold text-white mb-4">{step.title}</h4>
              <p className="text-lg text-gray-300">{step.description}</p>

              {/* Subtle Shine Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300
                          transform -rotate-45 scale-150 group-hover:scale-100 group-hover:translate-x-full group-hover:translate-y-full animate-shine"></div>
            </div>
          ))}
        </div>

        {/* Template Showcase (Inspired by your image_87c783.jpg right side) */}
        <h3 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-12 mt-20">
          Explore Our <span className="text-green-400">Winning Templates</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 justify-items-center">
          {templates.map((src, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-500">
              <img
                src={src} // Source for the template image
                alt={`Resume Template ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
                onError={handleImageError} // Call fallback on error
              />
            </div>
          ))}
        </div>

        {/* Final Call to Action */}
        <div className="text-center mt-20">
          <button
            onClick={() => router.push('/resumedetails')} // Navigates to the resume details/form page
            className="px-10 py-5 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold text-2xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Get Started - Build Your Future!
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResumeCreationFlow;
