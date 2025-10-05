import React from 'react'

import Navbar from '@/app/(public)/components/frontpage/NavBar'
import ProfileClient from '../dashboard/componets/ProfileClient'


const page = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Profile client goes here */}
            <ProfileClient />
          </div>
        </div>
      </div>
    </>
  )
}

export default page