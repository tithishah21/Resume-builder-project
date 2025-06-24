"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResumePreview from "../components/resumepreview";
import Header2 from "../components/header2";
import Footer from "../components/footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FormValues } from "../components/resumepreview";

function ResumePreviewPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateName = searchParams.get("template");
  const [resumeData, setResumeData] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    // Check login
    const userString = localStorage.getItem("user");
    if (!userString) {
      router.push("/signin");
      return;
    }
    // Try to get resume data from localStorage
    const stored = localStorage.getItem("resumeData");
    if (stored) {
      try {
        setResumeData(JSON.parse(stored));
        setLoading(false);
        return;
      } catch {
        setResumeData(null);
      }
    }
    // Fallback: fetch from Supabase if resumeData is not in localStorage
    const fetchFromSupabase = async () => {
      const user = JSON.parse(userString);
      if (!user.email) {
        setResumeData(null);
        setLoading(false);
        return;
      }
      const { createClient } = await import("../../../utils/supabase/client");
      const supabase = createClient();
      const { data } = await supabase
        .from("resumes")
        .select("*")
        .eq("email", user.email)
        .single();
      setResumeData(data || null);
      setLoading(false);
    };
    fetchFromSupabase();
  }, [router, searchParams]);

  useEffect(() => {
    if (!isGeneratingPdf) return;
    const generateAndDownload = async () => {
      const input = document.getElementById("resume-content");
      if (input) {
        const scale = 2;
        try {
          const canvas = await html2canvas(input, {
            scale: scale,
            useCORS: true,
            logging: true,
            windowWidth: 1024,
            windowHeight: input.scrollHeight,
          });
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * pdfWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
          while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }
          if (resumeData) {
            pdf.save(`${resumeData.full_name || "My_Resume"}-${templateName || "template"}.pdf`);
          }
        } catch {
          alert("Failed to generate PDF. Please try again.");
        } finally {
          setIsGeneratingPdf(false);
        }
      }
    };
    setTimeout(generateAndDownload, 100);
  }, [isGeneratingPdf, resumeData, templateName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-500 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-purple-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">No resume data found.</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-base font-semibold mt-4"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header2 />
      <div className="py-3 bg-gray-950 flex flex-col items-center justify-center min-h-screen pt-3 px-2 sm:px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">Your Resume Preview</h2>
        <div id="resume-content" className="w-full max-w-4xl mx-auto overflow-x-auto">
          <ResumePreview formData={resumeData} templateName={templateName} isGeneratingPdf={isGeneratingPdf} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pb-3 w-full max-w-3xl justify-center">
          <button
            onClick={() => setIsGeneratingPdf(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-base md:text-lg font-semibold w-full sm:w-auto"
          >
            Download PDF
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-base md:text-lg font-semibold w-full sm:w-auto"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function ResumePreviewPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading preview...</div>}>
      <ResumePreviewPageInner />
    </Suspense>
  );
} 