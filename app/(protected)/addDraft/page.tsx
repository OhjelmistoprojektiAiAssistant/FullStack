import React from 'react';
import Navbar from '@/app/(public)/components/frontpage/NavBar';
import DraftForm from './components/DraftForm';

const page = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-0 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:44px_44px]"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

                    <svg
                        className="absolute inset-0 w-full h-full opacity-10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="circuit"
                                x="0"
                                y="0"
                                width="100"
                                height="100"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M0 50 L20 50 L20 20 L50 20 L50 0"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    fill="none"
                                    className="text-blue-400"
                                />
                                <path
                                    d="M50 100 L50 80 L80 80 L80 50 L100 50"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    fill="none"
                                    className="text-indigo-400"
                                />
                                <circle
                                    cx="20"
                                    cy="50"
                                    r="2"
                                    fill="currentColor"
                                    className="text-cyan-400"
                                />
                                <circle
                                    cx="50"
                                    cy="20"
                                    r="2"
                                    fill="currentColor"
                                    className="text-blue-400"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="2"
                                    fill="currentColor"
                                    className="text-indigo-400"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#circuit)" />
                    </svg>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
                </div>

                <section className="flex flex-col items-center justify-center text-center py-12 px-4 z-10 relative">
                    <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 rounded-2xl p-10 space-y-10 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 md:text-4xl">
                                Create New Draft
                            </h1>
                            <p className="mt-2 text-lg text-stone-600">
                                Create a new application draft that you can save, edit, and refine later.
                            </p>
                        </div>
                        
                        <div className="text-left">
                            <DraftForm />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default page