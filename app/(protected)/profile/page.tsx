import React from 'react'
import { getProfile, updateProfile } from "@/lib/routes/profile"


const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">Manage your career profile and information.</p>
        </div>
      </div>
    </div>
  )
}

export default page