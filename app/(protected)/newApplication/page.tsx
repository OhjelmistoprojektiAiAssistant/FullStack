"use client"

import Navbar from '@/app/(public)/components/frontpage/NavBar'
import { Button } from '@/app/(public)/components/ui/button';
import { Copy } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react'

const page = () => {

  const [jobDescription, setJobDescription] = useState("");
  const [toneOption, setToneOption] = useState("");
  const [lengthOption, setLengthOption] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // send api request to create a new application
    const response = await fetch('/api/newApplication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobDescription,
        toneOption,
        lengthOption,
      }),
    });
  }


  function handleCopy(  ): void {
    throw new Error('Function not implemented.');
  }

  function handleReset(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-stone-50 to-stone-100 px-0 relative overflow-hidden">
        <section className="flex flex-col items-center justify-center text-center py-12 px-4 z-10 relative">
          <div className="w-full max-w-6xl bg-white shadow-xl border rounded-xl p-10 space-y-10">
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
                  className="w-full h-[180px] text-base p-4 rounded-lg border border-stone-300 resize-none"
                />
                <p className="mt-2 text-sm text-stone-500 mt-2">
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
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="friendly">Friendly</option>
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
                    onClick={handleCopy}
                    className="absolute top-2 right-2 text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" /> {copied ? "Copied" : "Copy"}
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
        <section className="bg-white  py-20 px-4">
          <h3 className="text-2xl font-semibold text-center text-stone-700 mb-12">
            What people are saying
          </h3>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                quote:
                  "I had tailored letters out in minutes. Game-changer! ✨",
                name: "Bob Jenkins",
                location: "Phoenix, AZ",
              },
              {
                quote:
                  "My application response rate doubled after using CoverSnap. 📈",
                name: "Alicia Romero",
                location: "Austin, TX",
              },
              {
                quote: "Finally — a tool that writes like a real human. 🤖",
                name: "Mark Fields",
                location: "Chicago, IL",
              },
              {
                quote:
                  "Super clean, fast, and zero fluff. Exactly what I needed. ⚡️",
                name: "Priya Mehta",
                location: "San Francisco, CA",
              },
              {
                quote: "I stopped dreading cover letters. That’s huge. 😌",
                name: "Devon Lee",
                location: "New York, NY",
              },
              {
                quote:
                  "Got the job after using AI Career Assistant once. Unbelievable! 🚀",
                name: "Tina Alvarez",
                location: "Miami, FL",
              },
              {
                quote: "The tone and polish were spot on — felt like magic. ✍️",
                name: "David Kim",
                location: "Seattle, WA",
              },
              {
                quote: "Love how fast and simple it is. Total no-brainer. 🙌",
                name: "Sarah Chen",
                location: "Denver, CO",
              },
            ].map(({ quote, name, location }, i) => (
              <div
                key={i}
                className="bg-stone-50 border border-stone-200 rounded-xl shadow-sm p-6 flex flex-col justify-between"
              >
                <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
                <p className="text-stone-600 italic mb-4">“{quote}”</p>
                <p className="text-sm text-stone-500">
                  — {name}, <span className="not-italic">{location}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
        <section
          id="pricing"
          className="bg-white border-t py-24 px-4 text-center"
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
}

export default page