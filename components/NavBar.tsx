// components/Navbar.tsx
'use client';
import React from 'react';


export default function Navbar() {
  return (
    
    <>
      <nav className='bg-white shadow-md'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='text-lg font-sans text-blue-700'>AI Career Assistant</div>
          <div className='space-x-4'>
            <button className='text-gray-600 hover:text-blue-700 px-4 py-2 rounded-xl transition-colors duration-200'>Log in</button>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg'>Sign up</button>
          </div>
        </div>
      </nav>
    </>
  );
}
