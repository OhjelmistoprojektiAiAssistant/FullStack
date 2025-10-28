import React from 'react';
import Navbar from '@/app/(public)/components/frontpage/NavBar';
import DraftForm from './components/DraftForm';

const page = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Draft</h1>
                        <p className="text-gray-600">
                            Create a new application draft that you can save, edit, and refine later.
                        </p>
                    </div>
                    <DraftForm />
                </div>
            </div>
        </>
    );
}

export default page