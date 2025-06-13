"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import Header from '../components/header';
// import DecryptedText from '../components/decrypted_text';
import Footer from '../components/footer';
import RotatingText from '../components/rotating_text';
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { createClient } from '../../../utils/supabase/client';

interface User {
  name?: string;
  email?: string;
  // Add more fields as needed
}

export default function PrivatePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user'); 
      router.push('/signin');
      return;
    }
    
    setLoading(false);
  }, [router]);

  const handleEditResume = async () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
      return;
    }
    const parsedUser = JSON.parse(userData);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('email', parsedUser.email)
      .single();
    if (error || !data) {
      console.log("No resume found. Redirecting to create page...");
      alert("No resume found! Edit your resume by first creating resume");
      router.push('/templates');
      return;
    }
  
    // Save the resume data in localStorage or state to prefill
    localStorage.setItem('resumeData', JSON.stringify(data));
  
    router.push('/resumedetails');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-black" id="header2">
        <div className="bg-gray-900 py-6 border-b border-slate-800 flex justify-between items-center px-4 lg:px-9">
          <h1 className="text-xl font-semibold text-white mx-2">ResumeBuilder Pro&apos;s Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="ml-[28rem] px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="h-[68vw] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white p-8">
        <div className="w-auto">
          <div className="flex items-center space-x-2 text-5xl font-bold mt-3 mb-4">
            <span className="text-white">Build</span>
            <RotatingText
              texts={['Impactful', 'Creative', 'Professional', 'Stunning', 'Smart']}
              mainClassName="bg-cyan-300 text-black px-3 py-1 rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-110%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
            <span className="text-white">Resume!</span>
          </div>

          <div className="text-gray-300 text-xl mb-12">
            Ready to take your career to the next level? Let&apos;s build something amazing.
          </div>

          <div className="flex flex-row justify-evenly mt-7 mx-20">
            {/* Create Resume Card */}
            <div className="w-[35vw] h-[33vw] bg-gradient-to-br from-blue-200/100 to-cyan-950/100 border-blue-500/30 p-8 cursor-pointer hover:from-blue-900/70 hover:to-cyan-900/70 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgb(0,0,0,0.25)] rounded-xl justify-center">
              <div className="text-5xl mt-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <FaPlus />
              </div>
              <div className="text-5xl font-extrabold mt-3 mb-5 tracking-tight leading-tight text-center">Create New Resume</div>
              <div className="text-lg text-center mb-5">Launch your journey with confidence!</div>
              <button 
                onClick={() => router.push('/templates')}
                className="w-[27.5rem] py-3 bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-800 hover:to-cyan-600 text-white font-semibold rounded-lg mt-5"
              >
                Get Started
              </button>
            </div>

            {/* Edit Resume Card */}
            <div className="w-[35vw] h-[33vw] bg-gradient-to-br from-purple-200/100 to-pink-900/100 border-purple-500/30 p-8 cursor-pointer hover:from-purple-900/70 hover:to-pink-900/70 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgb(0,0,0,0.25)] rounded-xl justify-center">
              <div className="text-5xl mt-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <FiEdit />
              </div>
              <div className="text-5xl font-extrabold mt-3 mb-5 tracking-tight leading-tight text-center">Edit Your <br/>Resume </div>
              <div className="text-lg text-center mb-5 ">Update your existing resume with our powerful editor!</div>
              <button onClick={handleEditResume}
              className="w-[27.5rem] py-3 outline text-purple-100 hover:bg-purple-500/10 border-y-1 border-x-1 font-semibold rounded-lg mt-5">
                Continue Editing
              </button>
            </div>
          </div>

          {/* Authentication Status */}
          <div className="mx-auto items-center w-[60rem] mt-12 bg-[#d1ecf1] text-[#0c5460] rounded-lg p-6 border border-[#bee5eb]">
            <h3 className="text-lg font-semibold mb-4">Protected Content</h3>
            <p>This is your private dashboard. Only authenticated users can see this content.</p>
            
            <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-600">
              <h4 className="font-medium text-green-400 mb-2">✅ Authentication Status</h4>
              <p className="text-xs text-gray-300">
                (You are successfully signed in with your custom authentication system)
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
