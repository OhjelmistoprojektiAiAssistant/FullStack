'use client';
import React from 'react';
import interview from '../public/images/interview.jpg'

export default function Hero() {
    return (
        <section className="bg-blue-50">
      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-8 px-8 py-16 items-center">
        {/* Left */}
        <div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Land your dream job
          </h1>
          <h2 className="text-3xl text-blue-600 font-semibold mb-6">
            AI-powered applications
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Create tailored job applications in minutes, not hours. Our AI
            analyzes your strengths and the job description to craft the perfect
            application that gets you noticed.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 hover:shadow-xl text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105">
            Get started!
          </button>
          
        </div>

        {/* Right - Testimonial */}
        <div className="relative">
          <img
            src={interview.src}
            alt="Working on computer"
            className="rounded-lg shadow-lg"
          />

        </div>
      </div>

      {/* Features */}
      <div className="px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How AI Career Assistant works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform makes job applications simple, fast, and effective.
        </p>
      </div>
    </section>
    )
}