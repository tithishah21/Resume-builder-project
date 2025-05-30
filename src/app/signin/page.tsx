// /src/app/signin/page.tsx
import React from 'react'

function page() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-950 text-white">
        <div className='rounded-xl container mx-auto h-[40vw] w-[40vw] px-6 py-16 flex justify-center items-center border bg-gray-900/50 border-gray-700 backdrop-blur-sm flex-col'>
          <div className='font-extrabold text-4xl'>Welcome Back</div>
          <div className='text-gray-400 mt-5 text-xl'>
          Sign in to your account to continue
          </div>

        </div>
    </div>
  )
}

export default page