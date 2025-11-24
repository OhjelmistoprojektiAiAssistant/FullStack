"use client";

import Navbar from "@/app/(public)/components/frontpage/NavBar";
import { Button } from "@/app/(public)/components/ui/button";
import LoadingSpinner from "@/app/(public)/components/ui/LoadingSpinner";
import { saveDraftToDatabase } from "@/lib/draftActions/actions";
import { Copy, Save } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [toneOption, setToneOption] = useState("");
  const [lengthOption, setLengthOption] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [saved, setSaved] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // Handle form submission logic here
      // send api request to create a new application
      const response = await fetch("/api/newApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          length: lengthOption,
          tone: toneOption,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Application created successfully:", data);
        setOutput(data.coverLetter);
      } else {
        console.error("Error creating application:", data);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const result = await saveDraftToDatabase(output);
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000); // reset saved state after 2 seconds
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  function handleReset(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-0 relative overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <section className="flex flex-col items-center justify-center text-center py-16 px-4 relative z-10">
          <div className="w-full max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                AI Cover Letter Generator
              </h1>
              <div className="space-y-2">
                <p className="text-xl text-blue-100">
                  Create personalized cover letters with AI assistance. Input
                  your job details
                </p>
                <p className="text-xl">
                  <span className="text-cyan-300 font-medium">
                    and get professional results
                  </span>
                  <span className="text-blue-100">
                    , tailored to your needs.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

       
        <section className="py-8 px-4 relative z-10">
          <div className="w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 rounded-2xl p-8 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800">
                Generate Your Cover Letter
              </h2>
              <p className="text-stone-600">
                Fill out the form below to create your personalized cover letter
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Job Description *
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Provide the complete job posting to generate the most relevant
                  cover letter
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="tone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tone *
                  </label>
                  <select
                    name="tone"
                    id="tone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={toneOption}
                    onChange={(e) => setToneOption(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">
                      Choose a tone...
                    </option>
                    <option value="startup">Startup</option>
                    <option value="executive">Executive</option>
                    <option value="creative">Creative</option>
                    <option value="technical">Technical</option>
                    <option value="funny">Funny</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Length *
                  </label>
                  <select
                    id="length"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={lengthOption}
                    onChange={(e) => setLengthOption(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">
                      Select length...
                    </option>
                    <option value="minimal">Minimal</option>
                    <option value="short">Short</option>
                    <option value="standard">Standard</option>
                    <option value="elaborate">Elaborate</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[220px] flex items-center justify-center gap-2"
                  disabled={
                    submitLoading ||
                    cooldown > 0 ||
                    !jobDescription.trim() ||
                    !toneOption ||
                    !lengthOption
                  }
                >
                  {submitLoading ? (
                    <>
                      <LoadingSpinner size={20} />
                      <span>Generating...</span>
                    </>
                  ) : (
                    "Generate Cover Letter"
                  )}
                </Button>
              </div>

              <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[300px]">
                {output && (
                  <button
                    type="button"
                    onClick={handleSave}
                    className="absolute top-3 right-3 text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />{" "}
                    {saved ? "Saved" : "Save Draft"}
                  </button>
                )}
                <div
                  className={`text-gray-700 leading-relaxed whitespace-pre-line ${
                    output ? "pr-20" : ""
                  }`}
                >
                  {output || (
                    <div className="text-center text-gray-500 mt-20">
                      <p className="text-lg">
                        Your AI-generated cover letter will appear here
                      </p>
                      <p className="text-sm mt-2">
                        Fill out the form above and click "Generate Cover
                        Letter" to get started
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {output && (
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
                  >
                    Start over
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
