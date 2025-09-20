'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  return (
        <section className="bg-gradient-to-b from-blue-100 to-white">
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
            <button
              onClick={() => router.push('/register')}
              className="bg-blue-600 hover:bg-blue-700 hover:shadow-xl text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105">
            Get started!
          </button>
          
        </div>

        {/* Right - Testimonial */}
        <div className="relative">
          <Image
            src="/images/interview.jpg"
              className="rounded-lg shadow-lg"
              alt="Interview"
              width={1200}                  // required when src is a string
              height={800}
              priority
          />
        </div>
      </div>
    </section>
    )
}