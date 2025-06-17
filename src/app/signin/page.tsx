'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/footer';
import { createClient } from '../../../utils/supabase/client';
import bcrypt from 'bcryptjs';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = async () => {
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (error || !user) {
        setEmailError('Invalid email or password. Please try again.');
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password as string);
      if (!passwordMatch) {
        setEmailError('Invalid email or password. Please try again.');
        return;
      }
      

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: user.id,
            name: user.full_name,
            email: user.email,
          })
        );
      }

      router.push('/dashboard');
    } catch (err) {
      console.error('Error during sign-in:', err);
      setEmailError('Unexpected error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen flex justify-center items-center bg-gray-950 text-white">
        <div className="rounded-xl container mx-auto w-full max-w-lg px-6 sm:px-10 py-10 sm:py-16 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col">
          <h1 className="font-extrabold text-4xl text-center">Welcome Back</h1>
          <p className="text-gray-400 mt-5 text-xl text-center">
            Sign in to your account to continue
          </p>

          {/* Email Field */}
          <div className="mt-14">
            <label className="text-xl text-white">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-3 py-2 px-3 w-full rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              disabled={isLoading}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Password Field */}
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <label className="text-xl text-white">Password</label>
              <button
                type="button"
                className="text-cyan-400 hover:text-cyan-200 transition-colors font-medium text-lg"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-3 py-2 px-3 w-full rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSignIn();
                }
              }}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="mt-8 flex items-center">
            <input type="checkbox" className="w-4 h-4 rounded-xl" />
            <label className="ml-2 text-white">Remember me</label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="mt-14 w-full py-3 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-blue-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Redirect to Sign Up */}
          <div className="mt-7 text-center">
            <span className="text-gray-400 text-lg mr-2">
              Don&#39;t have an account?
            </span>
            <button
              onClick={() => router.push('/signup')}
              className="text-cyan-400 font-bold hover:text-cyan-200"
              disabled={isLoading}
            >
              Sign up here
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
