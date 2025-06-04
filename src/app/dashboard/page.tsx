"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import Header from '../components/header';
// import DecryptedText from '../components/decrypted_text';
import RotatingText from '../components/rotating_text';

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
    <div className="h-[70vw] bg-gray-950 text-white p-8">
      <div className="max-w-fit mt-5">
        <div className="flex justify-between items-center mb-8">
          
          <h1 className="text-7xl font-bold">Welcome to Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="ml-[30rem] px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>

      <div className='text-gray-300 text-2xl'>Ready to take your career to the next level? Let's build something amazing.</div>

      <div className="flex items-center space-x-2 text-4xl font-bold mt-20">
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

      <div>
      
      </div>

        <div className="mx-auto items-center w-[60rem] mt-8 bg-[#d1ecf1] text-[#0c5460] rounded-lg p-6 border border-[#bee5eb]">
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
    </>
  );
}