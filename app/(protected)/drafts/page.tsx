import Navbar from '@/app/(public)/components/frontpage/NavBar';
import React from 'react';
import DraftsList from './components/DraftsList';

const page = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Drafts</h1>
            <p className="text-gray-600">
              View and manage your saved application drafts. Create new drafts with AI assistance.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DraftsList />
          </div>
        </div>
      </div>
    </>
  );
}

export default page