// /src/app/signin/page.tsx
"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {
  const router = useRouter();
  return (
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
          />
        </div>

        
        <div className='mt-8'>
          <div className='flex justify-between items-center'>
            <label className='text-xl text-white'>Password</label>
            <button className='text-cyan-400 hover:text-cyan-200 transition-colors font-medium text-lg'>
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            placeholder='Enter your password'
            className='mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium'
          />
        </div>
        
        <span>
        <input type='checkbox' className='mt-8 w-4 h-4 rounded-xl'/>
        <label className='ml-2'>Remember me</label>
        </span>
        
        <button className='mt-14 w-[32rem] py-3 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-md hover:shadow-blue-400 font-bold'>Sign In</button>

        <div className='mt-7 mx-auto'>
          <span className='text-gray-400 mt-5 text-lg mr-2'>Don't have an account?</span>
          <button onClick={() => router.push('/signup')}
          className='text-cyan-400 font-bold hover:text-cyan-200'>Sign up here</button>
        </div>
      </div>
    </div>
  )
}

export default page
