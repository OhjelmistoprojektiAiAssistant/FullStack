"use client";

import Navbar from "@/app/(public)/components/frontpage/NavBar";
import { Button } from "@/app/(public)/components/ui/button";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  }

  function handleReset(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-0 relative overflow-hidden">
        {/* AI-inspired animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:44px_44px]"></div>

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

          {/* Circuit-like lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="circuit"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 50 L20 50 L20 20 L50 20 L50 0"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-blue-400"
                />
                <path
                  d="M50 100 L50 80 L80 80 L80 50 L100 50"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-indigo-400"
                />
                <circle
                  cx="20"
                  cy="50"
                  r="2"
                  fill="currentColor"
                  className="text-cyan-400"
                />
                <circle
                  cx="50"
                  cy="20"
                  r="2"
                  fill="currentColor"
                  className="text-blue-400"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="2"
                  fill="currentColor"
                  className="text-indigo-400"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
        </div>
        <section className="flex flex-col items-center justify-center text-center py-12 px-4 z-10 relative">
          <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 rounded-2xl p-10 space-y-10 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 md:text-4xl">
                {" "}
                Create New Job Application
              </h1>
              <p className="mt-2 text-lg text-stone-600">
                Fill out the form below to create a new job application.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <label
                  htmlFor="jobDescription"
                  className="text-stone-700 font-medium text-lg mb-2 block"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here"
                  className="w-full h-[180px] text-base p-4 rounded-lg border border-stone-300 resize-none bg-white"
                />
                <p className="mt-2 text-sm text-stone-400">
                  Please provide a detailed description of the job you are
                  applying for.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="tone"
                    className="block text-stone-700 font-medium mb-1"
                  >
                    Select Tone
                  </label>
                  <select
                    name="tone"
                    id="tone"
                    className="w-full border border-stone-300 rounded  px-3 py-2 bg-white text-stone-700"
                    value={toneOption}
                    onChange={(e) => setToneOption(e.target.value)}
                  >
                    <option value="professional">Startup</option>
                    <option value="casual">Executive</option>
                    <option value="friendly">Creative</option>
                    <option value="friendly">Technical</option>
                    <option value="friendly">Funny</option>
                    <option value="friendly">Professional</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="length"
                    className="block text-stone-700 font-medium mb-1"
                  >
                    Length:
                  </label>
                  <select
                    id="length"
                    className="w-full border border-stone-300 rounded px-3 py-2 bg-white text-stone-700"
                    value={lengthOption}
                    onChange={(e) => setLengthOption(e.target.value)}
                  >
                    <option value="minimal">Minimal</option>
                    <option value="short">Short</option>
                    <option value="standard">Standard</option>
                    <option value="elaborate">Elaborate</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-stone-900 text-white hover:bg-black px-6 py-2 rounded-md cursor-pointer"
                  disabled={loading || cooldown > 0}
                >
                  {loading
                    ? "Generating..."
                    : cooldown > 0
                    ? `Please wait ${cooldown}s`
                    : "Generate Cover Letter"}
                </Button>
              </div>

              {/* Output Panel */}
              <div className="relative bg-stone-50 border border-stone-200 p-5 rounded-lg shadow-sm whitespace-pre-line min-h-[240px]">
                {output && (
                  <button
                    type="button"
                    onClick={handleSave}
                    className="absolute top-2 right-2 text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />{" "}
                    {saved ? "Saved" : "Save"}
                  </button>
                )}
                <p className={`text-stone-600 ${output ? "mt-8" : ""}`}>
                  {output || "Your AI-generated cover letter will appear here."}
                </p>
              </div>
              {output && (
                <button
                  onClick={handleReset}
                  className="text-sm text-pink-600 hover:underline mt-4 cursor-pointer"
                >
                  Start over
                </button>
              )}
            </form>
          </div>
        </section>

        <section
          id="pricing"
          className="bg-white/90 backdrop-blur-sm border-t border-white/20 py-24 px-4 text-center relative z-10"
        >
          <div id="pricing" className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-stone-800">
              Simple, Fair Pricing
            </h2>
            <p className="text-stone-600 mb-6">
              Get unlimited lifetime access for a one-time payment.
            </p>
            <div className="inline-block border rounded-xl shadow-sm p-6 bg-pink-50">
              <div className="text-4xl font-extrabold text-pink-600 mb-2">
                $5
              </div>
              <p className="text-stone-700 mb-4">Lifetime unlock</p>
              <ul className="text-sm text-stone-600 space-y-2 text-left">
                <li>✅ Unlimited cover letters</li>
                <li>✅ Resume-based personalization</li>
                <li>✅ Future features included</li>
              </ul>
            </div>
          </div>
          <Link
            href="https://buy.stripe.com/{YOUR_STRIPE_ID}" // add your stripe buy url here
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 text-white px-5 py-2 mt-4 rounded-md text-lg font-semibold hover:bg-pink-700 transition"
          >
            Buy Now for $5
          </Link>
        </section>
        <footer className="text-center text-base text-stone-400 py-12 z-10 relative">
          &copy; AI Career Assistant 2025
        </footer>
      </main>
    </>
  );
};

export default page;
