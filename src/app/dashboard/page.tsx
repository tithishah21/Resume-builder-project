"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '../components/footer';
import RotatingText from '../components/rotating_text';
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { createClient } from '../../../utils/supabase/client';
import { FaRobot } from 'react-icons/fa';
import ResumeTipsScroll from '../components/stackcard';
// import ScrollReveal from '../components/scrollreveal';
interface User {
  name?: string;
  email?: string;
  // Add more fields as needed
}

export default function PrivatePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasResume, setHasResume] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Check if user has a resume
      const supabase = createClient();
      supabase
        .from('resumes')
        .select('*')
        .eq('email', parsedUser.email.toLowerCase())
        .single()
        .then(({ data }) => setHasResume(!!data));
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user'); 
      router.push('/signin');
      return;
    }
    setLoading(false);
  }, [router]);

  const handleEditResume = () => {
    // Optionally, you can set a flag in localStorage if you want to distinguish edit mode
    localStorage.setItem('editMode', 'true');
    // Redirect to templates page
    router.push('/templates?edit=true');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-500 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-purple-400 text-2xl animate-spin flex items-center justify-center border-t-purple-700 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-black" id="header2">
        <div className="bg-gray-900 py-4 px-4 border-b border-slate-800 flex flex-row justify-between items-center">
          <h1 className="text-base font-semibold text-white mx-2 whitespace-pre-line break-words">ResumeBuilder Pro&apos;s Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="min-h-screen-90 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-2 sm:px-4 py-6 sm:py-8">
        <div className="w-full">
          <div className="flex items-center space-x-2 text-3xl sm:text-5xl font-bold mt-3 mb-4 flex-wrap">
            <span className="text-white">Build</span>
            <RotatingText
              texts={['Impactful', 'Creative', 'Professional', 'Stunning', 'Smart']}
              mainClassName="bg-gradient-to-r from-blue-800 to-purple-600 text-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg"
              staggerFrom="last"
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
            <span className="text-white">Resume!</span>
          </div>

          <div className="text-gray-300 text-base sm:text-xl mb-10 sm:mb-12">
            Ready to take your career to the next level? Let&apos;s build something amazing.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {/* Create Resume Card */}
            <div className={`w-full max-w-xs sm:max-w-md h-auto bg-gradient-to-br from-blue-200/100 to-cyan-950/100 border-blue-500/30 p-4 sm:p-8 cursor-pointer hover:from-blue-900/70 hover:to-cyan-900/70 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgb(0,0,0,0.25)] rounded-xl mx-auto flex flex-col justify-center mb-0 ${hasResume ? 'opacity-50 pointer-events-none' : ''}`} title={hasResume ? 'You already have a resume. Edit it or delete to create a new one.' : ''}>
              <div className="text-4xl sm:text-5xl mt-2 sm:mt-4 w-14 h-14 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <FaPlus />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold mt-3 mb-3 sm:mb-5 tracking-tight leading-tight text-center">Create New Resume</div>
              <div className="text-sm sm:text-lg text-center mb-3 sm:mb-5">Launch your journey with confidence! Create resumes with 4 different templates!</div>
              <button 
                onClick={() => router.push('/templates')}
                className="w-full sm:w-auto max-w-xs md:px-24 lg:px-28 py-2 sm:py-3 bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-800 hover:to-cyan-600 text-white font-semibold rounded-lg mt-2 sm:mt-5 mx-auto"
                disabled={!!hasResume}
              >
                Get Started
              </button>
              {hasResume && <div className="text-xs text-center text-gray-700 mt-2">You already have a resume. Edit it or delete to create a new one.</div>}
            </div>

            {/* Edit Resume Card */}
            <div className={`w-full max-w-xs sm:max-w-md h-auto bg-gradient-to-br from-purple-200/100 to-pink-900/100 border-purple-500/30 p-4 sm:p-8 cursor-pointer hover:from-purple-900/70 hover:to-pink-900/70 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgb(0,0,0,0.25)] rounded-xl mx-auto flex flex-col justify-center mb-0 ${!hasResume ? 'opacity-50 pointer-events-none' : ''}`} title={!hasResume ? 'No resume found. Create one first!' : ''}>
              <div className="text-4xl sm:text-5xl mt-2 sm:mt-4 w-14 h-14 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <FiEdit />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold mt-3 mb-3 sm:mb-5 tracking-tight leading-tight text-center">Edit Your Resume </div>
              <div className="text-sm sm:text-lg text-center mb-3 sm:mb-5 ">Update your existing resume with our powerful editor!</div>
              <button onClick={handleEditResume}
                className="w-full sm:w-auto max-w-xs md:px-24 lg:px-24 py-2 sm:py-3 outline text-purple-100 hover:bg-purple-500/10 border-y-1 border-x-1 font-semibold rounded-lg mt-2 sm:mt-5 mx-auto"
                disabled={hasResume === false}
              >
                Continue Editing
              </button>
              {!hasResume && <div className="text-xs text-center text-gray-700 mt-2">No resume found. Create one first!</div>}
            </div>
            
            {/* AI prep card */}
            <div className="w-full max-w-xs sm:max-w-md h-auto bg-gradient-to-br from-lime-200/100 to-green-900/100 border-green-500/30 p-4 sm:p-8 cursor-pointer hover:from-lime-900/70 hover:to-emerald-900/70 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgb(0,0,0,0.25)] rounded-xl mx-auto flex flex-col justify-center mb-0">
              <div className="text-4xl sm:text-5xl mt-2 sm:mt-4 w-14 h-14 sm:w-24 sm:h-24 bg-gradient-to-r from-green-300 to-green-900 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <FaRobot />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold mt-3 mb-3 sm:mb-5 tracking-tight leading-tight text-center">Interview Prep with AI</div>
              <div className="text-sm sm:text-lg text-center mb-3 sm:mb-5 ">Practice your interview skills with AI-powered questions!</div>
              
              <button className="w-full sm:w-auto max-w-xs md:px-24 lg:px-24 py-2 sm:py-3 bg-gradient-to-r from-green-700 to-emerald-500 hover:from-green-800 hover:to-emerald-600 font-semibold rounded-lg mt-2 sm:mt-5 mx-auto">
                Start Practicing
              </button>
            </div>
          </div>

          
          
        </div>
      </div>
      <div className="">
        <ResumeTipsScroll />
      </div>
      {/* <div>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-center text-sm"
          textClassName='text-sm text-blue-600'
        >
          Recruiters decide in 6 seconds—make it count.
        </ScrollReveal>
      </div> 
      <br /> */}
      <Footer />
    </>
  );
}
