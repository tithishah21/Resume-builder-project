// /src/app/signin/page.tsx
import React from 'react'

function page() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-950 text-white">
      <div className='rounded-xl container mx-auto h-[53vw] w-[40vw] px-6 py-16 flex justify-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col'>
        <div className='font-extrabold text-4xl mx-auto'>Create Account</div>
        <div className='text-gray-400 mt-5 text-xl mx-auto'>
          Join thousand of professionals building standout resumes
        </div>
        

        <div className='mt-14'>
            <label className='text-xl text-white'>Full Name</label>
            <input
                type="text"
                placeholder='Enter your full name'
                className='mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium'
            />
        </div>

        
        <div className='mt-8'>
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
          </div>
          <input
            type="password"
            placeholder='Create password'
            className='mt-3 py-2 px-3 w-[32rem] rounded-lg bg-gray-800 border border-gray-600 placeholder:text-white placeholder:font-medium'
          />
        </div>
        
        <div className='text-gray-400 text-sm mt-2'>Password must be atleast 8 characters long</div>
        
        <button className='mt-14 w-[32rem] py-3 text-lg rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-md hover:shadow-blue-400 font-bold'>Create Account</button>

        <div className='mt-7 mx-auto'>
          <span className='text-gray-400 mt-5 text-lg mr-2'>Already have an account?</span>
          <button className='text-cyan-400 font-bold hover:text-cyan-200'>Sign in here</button>
        </div>
      </div>
    </div>
  )
}

export default page
