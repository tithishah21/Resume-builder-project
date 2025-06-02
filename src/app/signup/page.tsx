"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Footer from '../components/footer';
import { createClient } from '../../../utils/supabase/client'; 

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
  
    // Validate password
    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      isValid = false;
    }
  
    if (!isValid) return;

    setIsLoading(true);
  
    try {
      const supabase = createClient();
  
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            display_name: fullName
          }
        }
      });
  
      if (error) {
        
        if (error.message.includes('User already registered')) {
          setEmailError('An account with this email already exists. Try signing in instead.');
        } else if (error.message.includes('Password should be at least')) {
          setPasswordError(error.message);
        } else if (error.message.includes('Unable to validate email address')) {
          setEmailError('Please enter a valid email address');
        } else {
          setGeneralError(error.message);
        }
        return;
      }
  
      if (data.user) {
        
        alert('Account created successfully! Please check your email to confirm your account before signing in.');
        setFullName('');
        setEmail('');
        setPassword('');
        
        // Redirect to signin
        router.push('/signin');
      }
    } catch (err) {
      console.error('Unexpected error during signup:', err);
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
              className="mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium disabled:opacity-50"
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
              className="mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium disabled:opacity-50"
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
              className="mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium disabled:opacity-50"
            />
            <div className="text-gray-400 text-sm mt-2">
              Password must be at least 8 characters with uppercase, lowercase, and numbers
            </div>
            {passwordError && <div className="text-red-400 mt-1 text-sm">{passwordError}</div>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-14 w-[32rem] py-3 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-md hover:shadow-blue-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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