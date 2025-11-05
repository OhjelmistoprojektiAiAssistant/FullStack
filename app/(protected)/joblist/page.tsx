"use client";
import Navbar from '@/app/(public)/components/frontpage/NavBar';
import React, { useEffect, useState } from "react";
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
        minSalary: 0,
    });

    // Fetch jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/jobs");
                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.error || 'Failed to fetch jobs');
                }

                // Use data.jobs instead of data directly
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
        };
        fetchJobs();
    }, []);

    // Handle filtering
    useEffect(() => {
        if (!jobs.length) return;

        const filtered = jobs.filter((job) => {
            const titleMatch = job.title.toLowerCase().includes(filters.title.toLowerCase());
            const locationMatch = job.location.toLowerCase().includes(filters.location.toLowerCase());
            const salaryMatch = !filters.minSalary || (
                job.salaryRange &&
                parseInt(job.salaryRange.replace(/[^0-9]/g, '')) >= filters.minSalary
            );

            return titleMatch && locationMatch && salaryMatch;
        });
        setFilteredJobs(filtered);
    }, [filters, jobs]);

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
                        <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
                        <JobFilter filters={filters} setFilters={setFilters} />
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
                                jobs={filteredJobs}
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
