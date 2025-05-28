import LandingPage from "./components/landingpage";
export default function Home() {
  return (
    <>
      {/* Navbar */}
      <div className="bg-slate-900 py-12 border-b border-slate-800 flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-0 lg:pl-9">
              <h1 className="text-2xl lg:text-3xl font-semibold text-white">
                ResumeBuilder Pro
              </h1>
            </div>
            <div className="hidden lg:flex flex-row gap-5 pr-9 justify-center items-center">
              <button className="border-gray-300 border-[0.1rem] rounded-lg px-10 py-1 font-bold hover:bg-slate-600">Sign In</button>
              <button className="border-gray-300 border-[0.1rem] rounded-lg px-10 py-1 font-bold hover:bg-slate-600">Sign Up</button>
            </div>
      </div>
      <LandingPage />
      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 flex flex-col lg:flex-row justify-between items-center lg:px-9">
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
