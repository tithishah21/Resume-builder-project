"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import  Footer from '../components/footer';

function Page() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (fullName.trim() === '') {
      setFullNameError('Full name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Enter valid Password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      alert('Account created successfully!');
    }
  };

  return (
    <div>
    <div className="h-screen flex justify-center items-center bg-gray-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl container mx-auto h-[53vw] w-[40vw] px-6 py-16 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col"
      >
        <div className="font-extrabold text-4xl mx-auto">Create Account</div>
        <div className="text-gray-400 mt-5 text-xl mx-auto">
          Join thousands of professionals building standout resumes
        </div>

        <div className="mt-14">
          <label className="text-xl text-white">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium"
          />
          {fullNameError && <div className="text-red-400 mt-1 text-sm">{fullNameError}</div>}
        </div>

        <div className="mt-8">
          <label className="text-xl text-white">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium"
          />
          {emailError && <div className="text-red-400 mt-1 text-sm">{emailError}</div>}
        </div>

        <div className="mt-8">
          <label className="text-xl text-white">Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium"
          />
          <div className="text-gray-400 text-sm mt-2">Password must be at least 8 characters long</div>
          {passwordError && <div className="text-red-400 mt-1 text-sm">{passwordError}</div>}
        </div>

        <button
          type="submit"
          className="mt-14 w-[32rem] py-3 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-md hover:shadow-blue-400 font-bold"
        >
          Create Account
        </button>

        <div className="mt-7 mx-auto">
          <span className="text-gray-400 mt-5 text-lg mr-2">Already have an account?</span>
          <button
            type="button"
            onClick={() => router.push('/signin')}
            className="text-cyan-400 font-bold hover:text-cyan-200"
          >
            Sign in here
          </button>
        </div>
      </form>
    </div>
    <Footer />
    </div>
  );
}

export default Page;
