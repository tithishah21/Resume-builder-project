import React from 'react'

function footer() {
  return (
    <div>
      <footer className="py-10 bg-gray-900 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center lg:px-9">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-semibold text-white">
            ResumeBuilder Pro
          </h1>
        </div>
        <div className="text-base lg:text-lg text-gray-400">
          © 2025 ResumeBuilder Pro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default footer
