// components/Navbar.tsx
'use client';
import { useAuth } from '@/lib/hooks/useAuth';
import { getServerSession } from '@/lib/session';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, logout } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="text-lg font-sans text-blue-700 cursor-pointer"
            onClick={() => router.push("/")}
          >
            AI Career Assistant
          </div>
          <div className="space-x-4">
            {/* Loading skeleton */}
            <div className="animate-pulse flex space-x-2">
              <div className="bg-gray-300 h-8 w-16 rounded"></div>
              <div className="bg-gray-300 h-8 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-lg font-sans text-blue-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          AI Career Assistant
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            // Authenticated user - show app navigation
            <>
             

              <button
                onClick={() => router.push("/joblist")}
                className="text-gray-600 hover:text-blue-950 px-4 py-2 rounded-xl transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="text-gray-600 hover:text-blue-950 px-4 py-2 rounded-xl transition-colors duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="text-gray-600 hover:text-blue-950 px-4 py-2 rounded-xl transition-colors duration-200"
              >
                Profile
              </button>
              <button
                onClick={() => router.push("/drafts")}
                className="text-gray-600 hover:text-blue-950 px-4 py-2 rounded-xl transition-colors duration-200"
              >
                Drafts
              </button>
              <button
                onClick={() => router.push("/newApplication")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg"
              >
                New Application
              </button>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-xl transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            // Unauthenticated user - show login/signup
            <>
              <button
                onClick={() => router.push("/login")}
                className="text-white hover:text-blue-950 px-4 py-2 rounded-xl transition-colors duration-200"
              >
                Log in
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
