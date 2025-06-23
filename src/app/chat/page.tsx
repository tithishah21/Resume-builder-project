"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import Header2 from '../components/header2';
import Footer from '../components/footer';
import TrueFocus from '../components/truefocus';

// Define the structure of a chat message
interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

// This is the Chat Page component!
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [resumeContext, setResumeContext] = useState<string | null>(null);

  const supabase = createClient();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // This helper robot automatically scrolls down when a new message appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // This helper robot runs ONCE when you open the chat room
  useEffect(() => {
    const initializeChat = async () => {
      // Try to get user email from localStorage (like in edit resume)
      let userEmail = null;
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          userEmail = parsedUser.email;
        } catch {}
      }
      // Fallback: get from Supabase auth if not in localStorage
      if (!userEmail) {
        const { data: { user } } = await supabase.auth.getUser();
        userEmail = user?.email;
      }
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (userEmail) {
        const { data: resume } = await supabase
          .from('resumes')
          .select('skills, experience, project')
          .eq('email', userEmail)
          .single();

        let initialMessage = "";
        if (resume) {
          // Define types for experience and project
          type Experience = { key_role: string };
          type Project = { project_title: string };
          const context = `
            The user has the following skills: ${resume.skills?.join(', ') || 'Not specified'}.
            Their experience includes: ${(resume.experience as Experience[] | undefined)?.map((e) => e.key_role).join(', ') || 'Not specified'}.
            Their projects include: ${(resume.project as Project[] | undefined)?.map((p) => p.project_title).join(', ') || 'Not specified'}.
          `;
          setResumeContext(context);
          initialMessage = `Hello! I've reviewed your resume. It looks like you have experience with skills like ${resume.skills?.join(', ') || '...various technologies'}. I'm ready to help you practice for your interview by providing you with a list of both technical and behavioral questions that you can practice answering.`;
        } else {
          initialMessage = "Hello! I'm your AI Interview Coach. It looks like you haven't created a resume with us yet. To get started, please tell me what job role or skills you'd like to practice for.";
        }
        setMessages([{ role: 'model', content: initialMessage, timestamp }]);
      } else {
        setMessages([{ role: 'model', content: "Welcome! Please sign in to use the AI Interview Coach.", timestamp }]);
      }
      setInitialLoading(false);
    };

    initializeChat();
  }, [supabase]);

  // This function runs when you click the "Send" button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = { role: 'user', content: input, timestamp };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, resumeContext }),
      });

      if (!response.body) throw new Error("No response body.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let modelResponse = '';
      const modelTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'model', content: '', timestamp: modelTimestamp }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        modelResponse += decoder.decode(value);
        setMessages(prev => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].content = modelResponse;
          return updatedMessages;
        });
      }

    } catch (error) {
      console.error("Error communicating with AI:", error);
      const errorTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later.", timestamp: errorTimestamp }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .neural-grid {
          background-color: #0A0A0F;
          background-image: 
            linear-gradient(rgba(0, 194, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 194, 255, 0.07) 1px, transparent 1px);
          background-size: 3rem 3rem;
        }
      `}</style>
      <Header2 />
      <div className="neural-grid text-white min-h-screen flex flex-col">
        <h1 className="text-center text-xl md:text-2xl font-mono text-cyan-300/80 py-16 tracking-widest">
            <TrueFocus 
                sentence="AI Interview Coach"
                manualMode={false}
                blurAmount={5}
                borderColor="blue"
                animationDuration={2}
                pauseBetweenAnimations={1}
                />
        </h1>
        <div className="flex-1 overflow-y-auto px-4 md:px-8 space-y-8">
          {initialLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <FaRobot className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-2" />}
                <div className={`max-w-xl p-4 rounded-lg ${msg.role === 'user' ? 'bg-pink-500/10 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,194,255,0.2)]'}`}>
                  <p className="whitespace-pre-wrap text-white/90">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-2 text-right">{msg.timestamp}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-start gap-4 justify-start">
              <FaRobot className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-2" />
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(0,194,255,0.2)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 bg-black/10 backdrop-blur-sm sticky bottom-0 z-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message..."
              className="flex-1 p-3 bg-transparent border-b-2 border-pink-500/40 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-0 transition-colors"
              disabled={isLoading || initialLoading}
            />
            <button
              type="submit"
              className="p-3 bg-pink-500/10 border border-pink-500/50 rounded-lg text-white hover:bg-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all"
              disabled={isLoading || initialLoading}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
