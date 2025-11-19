"use client";
import Navbar from '@/app/(public)/components/frontpage/NavBar';
import React, { useEffect, useState, useCallback } from "react";
import JobList from "./components/JobList";
import JobFilter from "./components/JobFilter";
import LoadingSpinner from "@/app/(public)/components/ui/LoadingSpinner";
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
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Listings</h1>
                        <p className="text-gray-600 mb-6">Browse jobs and use filters to refine results.</p>
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
                            <LoadingSpinner />
                        ) : error ? (
                            <div className="text-center py-8 text-red-500">{error}</div>
                        ) : (
                            <JobList
                                jobs={showBookmarkedOnly
                                    ? filteredJobs.filter((job) => bookmarkedJobs.includes(job.id))
                                    : filteredJobs}
                                bookmarkedJobs={bookmarkedJobs}
                                onToggleBookmark={toggleBookmark}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
