import React from 'react'
import LogoutButton from "../../(auth)/components/logout-button";

const page = () => {

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dasboard</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">View your dashboard here.</p>
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}

export default page;