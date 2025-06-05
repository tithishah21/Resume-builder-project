"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

function header2() {
    const router = useRouter();
  return (
    <div className="sticky top-0 z-50 bg-black" id="header2">
    <div className="bg-gray-900 py-6 border-b border-slate-800 flex justify-between items-center px-4 lg:px-9">
    <h1 className="text-xl font-semibold text-white mx-2">ResumeBuilder Pro</h1>
    <button
            onClick={() => router.push('/dashboard')}
            className="mx-4 rounded-lg px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow hover:from-blue-700 hover:to-cyan-600 transition-all"
          >
            Back to Dashboard
          </button>
    </div>
    </div>
    
  )
}

export default header2
