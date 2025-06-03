"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PrivatePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in via your custom auth
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
      localStorage.removeItem('user'); // Clear corrupted data
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
    return null; // This prevents flash of content before redirect
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to Private Area</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p className="text-lg">Hello <span className="text-cyan-400 font-medium">{user?.email}</span>!</p>
          <p className="text-gray-400 mt-2">User ID: {user?.id}</p>
        </div>

        <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Protected Content</h3>
          <p className="text-gray-300">
            This is your private dashboard. Only authenticated users can see this content.
          </p>
          
          <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-600">
            <h4 className="font-medium text-green-400 mb-2">✅ Authentication Status</h4>
            <p className="text-sm text-gray-300">You are successfully signed in with your custom authentication system.</p>
          </div>
        </div>
      </div>
    </div>
  );
}