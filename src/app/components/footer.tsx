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
        <div className="flex flex-col items-center text-base lg:text-lg text-gray-400">
          <span>© 2025 ResumeBuilder Pro. All rights reserved.</span>
          <a
            href="https://www.linkedin.com/in/tithi-shah-032a11288"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-gray-500 mt-1 font-extrabold hover:text-cyan-400 transition-colors"
          >
            &lt;Made by Tithi with <span className="text-red-500">♥</span> /&gt;
          </a>
        </div>
      </footer>
    </div>
  )
}

export default footer
