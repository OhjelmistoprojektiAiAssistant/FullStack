"use client";
import Navbar from '@/app/(public)/components/frontpage/NavBar';
import React, { useEffect, useState, useCallback } from "react";
import JobList from "./components/JobList";
import JobFilter from "./components/JobFilter";
import { JobListDto } from "./components/dto/jobListDto";

export default function JobPage() {
    const [jobs, setJobs] = useState<JobListDto[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<JobListDto[]>([]);
    const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        title: "",
        location: "",
    });
    const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

    const fetchJobs = useCallback(async (searchFilters?: { title?: string; location?: string }) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            // results_per_page and content-type are useful defaults
            params.set("results_per_page", "50");
            params.set("content-type", "application/json");

            if (searchFilters) {
                if (searchFilters.title) params.set("what", searchFilters.title);
                if (searchFilters.location) params.set("where", searchFilters.location);
            }

            const res = await fetch(`/api/jobs?${params.toString()}`);
            const data = await res.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch jobs');
            }

            setJobs(data.jobs || []);
            setFilteredJobs(data.jobs || []);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
            setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
            setJobs([]);
            setFilteredJobs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // initial load
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Bookmark handling
    const toggleBookmark = (id: string) => {
        setBookmarkedJobs((prev) =>
            prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
        );
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-0 relative overflow-hidden">
                {/* AI-inspired animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:44px_44px]"></div>

                    {/* Floating orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

                    {/* Circuit-like lines */}
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

                    {/* Gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
                </div>

                <section className="flex flex-col items-center justify-center text-center py-12 px-4 z-10 relative">
                    <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 rounded-2xl p-10 space-y-10 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 md:text-4xl">
                                Job Listings
                            </h1>
                            <p className="mt-2 text-lg text-stone-600">
                                Search and discover job opportunities. Bookmark positions that interest you.
                            </p>
                        </div>
                        
                        <div className="text-left">
                            <JobFilter filters={filters} onSearch={(vals) => {
                                // update local filters and fetch from API (title/location only)
                                setFilters({ title: vals.title, location: vals.location });
                                fetchJobs({ title: vals.title || undefined, location: vals.location || undefined });
                            }} />
                            <div className="mb-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="showBookmarked"
                                    checked={showBookmarkedOnly}
                                    onChange={e => setShowBookmarkedOnly(e.target.checked)}
                                />
                                <label htmlFor="showBookmarked" className="text-sm text-gray-700">
                                    Show only bookmarked jobs
                                </label>
                            </div>
                            {loading ? (
                                <div className="text-center py-8 text-gray-500">
                                    Loading jobs...
                                </div>
                            ) : error ? (
                                <div className="text-center py-8 text-red-500">
                                    {error}
                                </div>
                            ) : (
                                <JobList
                                    jobs={showBookmarkedOnly
                                        ? filteredJobs.filter(job => bookmarkedJobs.includes(job.id))
                                        : filteredJobs}
                                    bookmarkedJobs={bookmarkedJobs}
                                    onToggleBookmark={toggleBookmark}
                                />
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
