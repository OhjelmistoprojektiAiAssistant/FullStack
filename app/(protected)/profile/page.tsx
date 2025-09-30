import React from 'react'

import Navbar from '@/app/(public)/components/frontpage/NavBar'


const page = () => {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Profile client goes here */}
        </div>
      </div>
      </div>
    </>
  )
}

export default page