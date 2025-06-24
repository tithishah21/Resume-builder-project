💼 RESUME BUILDER PRO — AI-POWERED RESUME CREATION PLATFORM


ResumeBuilderPro is a fully responsive, full-stack web application designed to simplify and supercharge the resume-building process for users of all experience levels. From elegant template selection to an intelligent AI-powered interview preparation chatbot, this project is packed with thoughtfully engineered features, modern design, and seamless user experience.

🚀 FEATURES AT A GLANCE:- 

- Responsive Landing Page
  -Beautifully animated with Tailwind CSS + ShadCN. Includes:
    - Features section with smooth reveal animations 
    - Step-by-step resume creation guide 
    - Live template showcase with motion-based card stacks
    - Templates page with faded animation
    - Dashboard page with stackCrad animation
  
- Authentication (Sign In/Sign Up)
  - User authentication powered by Supabase
  - Secure and encrypted password storage 
  - Email stored in localStorage for session management
  
- AI-Powered Interview Prep Chatbot
  - Integrated with Gemini API 
  - Reads resume data (excluding personal info) 
  - Generates behavioral + technical interview questions & answers  
  - Tailored responses based on user's actual resume content 
  - Triggered if a resume exists, else youve to input yur skills and experience.
  
- Template Selection Page
  - Four distinct templates:
    - Modern Professional 
    - Vibrant & Expressive 
    - Classic Corporate 
    - Tech Minimalist 
  - Cards flip on click to preview layout before selection
  
- Resume Form (Step-Based UI)
  - User-friendly, dynamic form
  - Integrated with Formik + Yup for:
    - Field validation  
    - Real-time error handling 
    - Dynamic field arrays (skills, education, etc.)
  - Built-in loaders & transitions for a smooth experience 
  - Resume Editing Mode: 
  - "Continue Editing" button pre-fills the form using data fetched from Supabase 
  - "Resume Preview" allows template switching without changing the content
  
- PDF Export
  - Resume preview rendered with html2canvas 
  - Downloadable as a well-styled, clean PDF document


🧑‍💻 Tech Stack:-

- Frontend
  - Next.js (App Router) + TypeScript for scalable architecture 
  - Tailwind CSS + ShadCN for utility-first styling and components
  - Zustand for lightweight and reactive global state management
  - ESLint for consistent code quality and formatting
  - Suspense + searchParams logic for async data loading (e.g. templates)
  - Forms & Validation
  - Formik for state-managed forms
  - Yup for schema-based validation

- Backend
  - Supabase for:
    - Authentication
    - Encrypted password handling
    - Resume data CRUD operations
    - Secure API access

- AI Integration
  - Gemini API to power the smart chatbot
  - Dynamic routing (route.ts) used to pass prompt and resume context
  - On-demand interview generation

- Deployment
  - Vercel for fast and reliable deployment
  - Docker-ready mindset for production readiness

🛡️ Other Highlights
- All user data is stored securely via Supabase policies
- Templates and form access managed using query parameters
- Each page has a loading state for seamless user experience
- Modular design using reusable components
- Clean separation between UI, logic, and state
  
📸 Live Preview:-
👉 https://resume-builder-project-flame.vercel.app


💡 ResumeBuilderPro is more than a tool — it's an intelligent platform that makes resume creation feel effortless and powerful, with AI features that go beyond what most web apps offer.
