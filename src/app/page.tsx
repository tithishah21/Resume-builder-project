import LandingPage from "./components/landingpage";
export default function Home() {
  return (
    <>
      {/* Navbar */}
      <div className="bg-gray-900 py-10 border-b border-slate-800 flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-0 lg:pl-9">
              <h1 className="text-2xl lg:text-3xl font-semibold text-white">
                ResumeBuilder Pro
              </h1>
            </div>
            <div className="flex flex-row gap-12 text-lg font-semibold">
              <button className="hover:text-cyan-400">Home</button>
              <button className="hover:text-cyan-400">Features</button>
              <button className="hover:text-cyan-400">Templates</button>
              <button className="hover:text-cyan-400">Contact</button>
            </div>
            <div className="flex flex-row gap-5 pr-9 justify-center items-center">
              <button className=" text-gray-400 bg-gray-200 border-gray-300 border-[0.1rem] rounded-lg px-7 py-[0.6rem] font-bold hover:bg-gray-800 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200">Sign In</button>
              <button className="rounded-lg px-7 py-[0.6rem] font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200">Sign Up</button>
            </div>
      </div>
      <LandingPage />
      {/* Footer */}
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
    </>
  );
}
