"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import Footer from '../components/footer';
import { createClient } from '../../../utils/supabase/client';
import bcrypt from 'bcryptjs';

function page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
  
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
  
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }
  
    if (!isValid) return;
  
    setIsLoading(true);
  
    try {
      const supabase = createClient();
      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .maybeSingle()
  
      console.log("Fetch result:", { users, fetchError }); 
  
      if (fetchError) {
        console.error("Database error:", fetchError);
        setEmailError("Invalid email or password. Please try again.");
        return;
      }
  
      if (!users) {
        console.log("No user found with this email");
        setEmailError("Invalid email or password. Please try again..");
        return;
      }
  
      console.log("User found:", users); 
      //comparing password with the hashed password
      const passwordMatch = await bcrypt.compare(password, users.password);
      console.log("Password match:", passwordMatch); 
  
      if (!passwordMatch) {
        console.log("Password doesn't match");
        setEmailError("Invalid email or password. Please try again...");
        return;
      }
  
      //stroing the user infor in "users" table created by me
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify({
          id: users.id,
          email: users.email,
        }));
      }
  
      console.log("User signed in successfully:", users);
      router.push('/private');
      
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
      setEmailError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  async function testBcrypt() {
    const plain = "mysecretpassword";
    const hash = await bcrypt.hash(plain, 10);
    console.log("Generated Hash:", hash);
  
    const match = await bcrypt.compare(plain, hash);
    console.log("Compare with correct password:", match); 
  
    const match2 = await bcrypt.compare("wrongpassword", hash);
    console.log("Compare with wrong password:", match2); 
  }
  
  

  return (
    <div>
      <div className="h-screen flex justify-center items-center bg-gray-950 text-white">
        <div className='rounded-xl container mx-auto h-[50vw] w-[40vw] px-6 py-16 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col'>
          <div className='font-extrabold text-4xl mx-auto'>Welcome Back</div>
          <div className='text-gray-400 mt-5 text-xl mx-auto'>
            Sign in to your account to continue
          </div>

          <div className='mt-14'>
            <label className='text-xl text-white'>Email Address</label>
            <input
              type="email"
              placeholder='Enter your email'
              className='mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            {emailError && <p className='text-red-500 text-xs mt-1'>{emailError}</p>}
          </div>

          <div className='mt-8'>
            <div className='flex justify-between items-center'>
              <label className='text-xl text-white'>Password</label>
              <button 
                type="button"
                className='text-cyan-400 hover:text-cyan-200 transition-colors font-medium text-lg'
                onClick={() => {
                  console.log("Forgot password clicked");
                }}
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              placeholder='Enter your password'
              className='mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSignIn();
                }
              }}
            />
            {passwordError && <p className='text-red-500 text-xs mt-1'>{passwordError}</p>}
          </div>

          <span>
            <input type='checkbox' className='mt-8 w-4 h-4 rounded-xl' />
            <label className='ml-2'>Remember me</label>
          </span>

          <button 
            onClick={handleSignIn}
            disabled={isLoading}
            className='mt-14 w-[32rem] py-3 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-md hover:shadow-blue-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className='mt-7 mx-auto'>
            <span className='text-gray-400 mt-5 text-lg mr-2'>Don't have an account?</span>
            <button 
              onClick={() => router.push('/signup')}
              className='text-cyan-400 font-bold hover:text-cyan-200'
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

export default page;