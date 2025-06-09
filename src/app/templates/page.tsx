"use client";
import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { FaBriefcase, FaPalette } from 'react-icons/fa';
import { MdCorporateFare } from "react-icons/md";
import { IoBulb } from "react-icons/io5";
import Header2 from '../components/header2';
import Footer from '../components/footer';

function Page() { 
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true); 

    useEffect(() => {
        const checkLoginStatus = () => {
            if (typeof window !== 'undefined') {
                const userString = localStorage.getItem('user');
                if (userString) {
                    try {
                        const user = JSON.parse(userString);
                       
                        if (user && user.id) {
                            setIsLoggedIn(true);
                        }
                    } catch (e) {
                        console.error("Error parsing user data from localStorage:", e);

                        localStorage.removeItem('user');
                        setIsLoggedIn(false);
                    }
                }
            }
            setLoadingAuth(false); 
        };

        checkLoginStatus();
    }, []); 

    const handleSelectTemplate = () => {
        if (isLoggedIn) {
            router.push('/resumedetails');
        } else {
            alert('Please sign in to create a resume.');
            router.push('/signin');
        }
    };

    if (loadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Header2 />
            <div className='w-full min-h-screen bg-gray-950 text-white px-8 py-12'>
                <h1 className='text-5xl text-center font-bold'>Choose Your Template</h1>
                <div className='text-center text-2xl text-gray-400 font-medium mt-10 mb-20'>
                    Select a professional template that best represents your career goals and industry.
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto'>

                    <div className='bg-[#0f172a] rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-blue-500/20 transition duration-300'>
                        <div className='bg-gradient-to-r from-blue-500 to-cyan-400 h-32 w-full rounded-lg mb-6' />
                        <h2 className='text-xl font-semibold mb-2'>Modern Professional</h2>
                        <span className='inline-flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-full mb-4'>
                            <FaBriefcase className='mr-2' /> Professional
                        </span>
                        <p className='text-gray-400 mb-6'>
                            Clean lines, subtle design, and strategic use of white space for a polished, impactful presentation.
                        </p>
                        <button
                            onClick={handleSelectTemplate} // Use the new handler
                            className='w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-md text-white font-medium hover:scale-105 transition'>
                            Select Template
                        </button>
                    </div>

                    <div className='bg-[#0f172a] rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-pink-500/20 transition duration-300'>
                        <div className='bg-gradient-to-r from-pink-500 to-purple-500 h-32 w-full rounded-lg mb-6' />
                        <h2 className='text-xl font-semibold mb-2'>Vibrant & Expressive (Gen Z)</h2>
                        <span className='inline-flex items-center text-sm bg-pink-600 text-white px-3 py-1 rounded-full mb-4'>
                            <FaPalette className='mr-2' /> Creative
                        </span>
                        <p className='text-gray-400 mb-6'>
                            Eye-catching design ideal for creative industries and design roles.
                        </p>
                        <button
                            onClick={handleSelectTemplate} // Use the new handler
                            className='w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-md text-white font-medium hover:scale-105 transition'>
                            Select Template
                        </button>
                    </div>

                    <div className='bg-[#0f172a] rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-pink-500/20 transition duration-300'>
                        <div className='bg-gradient-to-r from-lime-400 to-green-500 h-32 w-full rounded-lg mb-6' />
                        <h2 className='text-xl font-semibold mb-2'>Classic Corporate</h2>
                        <span className='inline-flex items-center text-sm bg-lime-600 text-white px-3 py-1 rounded-full mb-4'>
                            <MdCorporateFare className='mr-2' /> Corporate
                        </span>
                        <p className='text-gray-400 mb-6'>
                            Traditional format perfect for corporate environments and formal industries.
                        </p>
                        <button
                            onClick={handleSelectTemplate} // Use the new handler
                            className='w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-md text-white font-medium hover:scale-105 transition'>
                            Select Template
                        </button>
                    </div>

                    <div className='bg-[#0f172a] rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-pink-500/20 transition duration-300'>
                        <div className='bg-gradient-to-r from-orange-400 to-red-600 h-32 w-full rounded-lg mb-6' />
                        <h2 className='text-xl font-semibold mb-2'>Tech Minimalist</h2>
                        <span className='inline-flex items-center text-sm bg-orange-600 text-white px-3 py-1 rounded-full mb-4'>
                            <IoBulb className='mr-2' /> Technology
                        </span>
                        <p className='text-gray-400 mb-6'>
                            Highlighting skills and achievements with a clear, concise format optimized for data-driven and engineering roles.
                        </p>
                        <button
                            onClick={handleSelectTemplate} // Use the new handler
                            className='w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-md text-white font-medium hover:scale-105 transition'>
                            Select Template
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Page;