"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Footer from '../components/footer';
import { createClient } from '../../../utils/supabase/client'; 
import bcrypt from 'bcryptjs';
import { FaArrowLeft } from 'react-icons/fa';

function Page() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let isValid = true;
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
  
    if (fullName.trim().length < 2) {
      setFullNameError('Full name must be at least 2 characters long');
      isValid = false;
    }
  
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
  
    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      isValid = false;
    }
  
    if (!isValid) return;

    setIsLoading(true);

      try {
        const supabase = createClient();
        // Hash password
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const { error } = await supabase.from('users').insert([
          {
            full_name: fullName,
            email,
            password: hashedPassword,
            created_at: new Date().toISOString()
          }
        ]);

        if (error) {
          if (error.message.includes('duplicate key')) {
            setEmailError('An account with this email already exists. Try signing in instead.');
          } else {
            setGeneralError(error.message);
          }
          return;
        }

        
        alert('Account created successfully! You can now sign in.');
        localStorage.removeItem('resumeData');
        localStorage.removeItem('skills');
        localStorage.removeItem('userId');
        setFullName('');
        setEmail('');
        setPassword('');

        router.push('/signin');
      } catch (err) {
        console.error('Unexpected error during signup:', err);
        setGeneralError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }

  };

  return (
    <div>
      <button
        className="absolute top-6 left-6 text-cyan-400 hover:text-cyan-600 text-3xl z-50"
        onClick={() => router.push('/')}
        aria-label="Go back"
      >
        <FaArrowLeft />
      </button>
      <div className="min-h-screen flex justify-center lg:pt-12 lg:pb-12 bg-gray-950 text-white">
        <form
          onSubmit={handleSubmit}
          className="lg:rounded-xl container mx-auto w-full max-w-lg px-6 sm:px-10 py-10 sm:py-16 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col"
        >
          <div className="font-extrabold text-4xl mx-auto">Create Account</div>
          <div className="text-gray-400 mt-5 text-xl mx-auto text-center">
            Join thousands of professionals building standout resumes
          </div>

          {generalError && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
              {generalError}
            </div>
          )}

          <div className="mt-14">
            <label className="text-xl text-white">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              className="mt-3 py-2 px-3 w-full rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium disabled:opacity-50"
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
              disabled={isLoading}
              className="mt-3 py-2 px-3 w-full rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium disabled:opacity-50"
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
              disabled={isLoading}
              className="mt-3 py-2 px-3 w-full rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium disabled:opacity-50"
            />
            <div className="text-gray-400 text-sm mt-2">
              Password must be at least 8 characters with uppercase, lowercase, and numbers
            </div>
            {passwordError && <div className="text-red-400 mt-1 text-sm">{passwordError}</div>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-14 w-full py-3 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-md hover:shadow-blue-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="mt-7 mx-auto">
            <span className="text-gray-400 mt-5 text-lg mr-2">Already have an account?</span>
            <button
              type="button"
              onClick={() => router.push('/signin')}
              disabled={isLoading}
              className="text-cyan-400 font-bold hover:text-cyan-200 disabled:opacity-50"
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