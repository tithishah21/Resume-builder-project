"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import Header from '../components/header';
// import DecryptedText from '../components/decrypted_text';
import Footer from '../components/footer';
import RotatingText from '../components/rotating_text';
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

export default function PrivatePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/signin');
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
    
    {/* <Header /> */}
    <div className="h-[75vw] bg-gray-950 text-white p-8">
      <div className="w-auto mt-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="ml-[28rem] px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
          >
            Logout
          </button>
        </div>
        <hr style={{borderColor:'gray'}}/>
        <div className="flex items-center space-x-2 text-3xl font-bold mt-10 mb-6">
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
        <span className='text-white'>Resume!</span>
      </div>

      <div className='text-gray-300 text-2xl'>Ready to take your career to the next level? Let's build something amazing.</div>

      

      <div className='flex flex-row justify-evenly mt-7 mx-20'>
        <div className="w-[35vw] h-[33vw] bg-gradient-to-br from-blue-200/100 to-cyan-900/100 border-blue-500/30 p-8 cursor-pointer hover:from-blue-900/70 hover:to-cyan-900/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 rounded-xl justify-center">
            <div className="text-5xl mt-8 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"><FaPlus /></div>
            <div className='text-3xl font-semibold mt-10 mb-5 leading-tight text-center'>Create New Resume</div>
            <div className='text-xl text-center mb-5'>Start fresh with our professional templates designed to get you noticed!</div>
            <button 
            onClick={() => router.push('/templates')}
            className='w-[27.5rem] py-3 bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-800 hover:to-cyan-600 text-white font-semibold rounded-lg mt-5'>Get Started</button>
        </div>
        <div className="w-[35vw] h-[33vw] bg-gradient-to-br from-purple-200/100 to-pink-900/100 border-purple-500/30 p-8 cursor-pointer hover:from-purple-900/70 hover:to-pink-900/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 rounded-xl justify-center">
            <div className="text-5xl mt-8 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"><FiEdit /></div>
            <div className='text-3xl font-semibold mt-10 mb-5 leading-tight text-center'>Edit Your Resume</div>
            <div className='text-xl text-center mb-5'>Update and improve your existing resume with our powerful editor!</div>
            <button className='w-[27.5rem] py-3 outline  text-purple-100 hover:bg-purple-500/10 border-y-1 border-x-1 font-semibold rounded-lg mt-5'>Continue Editing</button>
        </div>
      </div>

        <div className="mx-auto items-center w-[60rem] mt-12 bg-[#d1ecf1] text-[#0c5460] rounded-lg p-6 border border-[#bee5eb]">
          <h3 className="text-lg font-semibold mb-4">Protected Content</h3>
          <p className="text-[#0c5460]">
            This is your private dashboard. Only authenticated users can see this content.
          </p>
          
          <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-600">
            <h4 className="font-medium text-green-400 mb-2">✅ Authentication Status</h4>
            <p className="text-xs text-gray-300">(You are successfully signed in with your custom authentication system)</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}