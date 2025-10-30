"use client";
import Navbar from '@/app/(public)/components/frontpage/NavBar';
import React, { useEffect, useState } from "react";
import JobList from "././components/JobList";
import JobFilter from "././components/JobFilter";
import { JobListDto } from './components/dto/jobListDto';
    
export default function JobPage() {
    const [jobs, setJobs] = useState<JobListDto[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<JobListDto[]>([]); 
    const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
    const [filters, setFilters] = useState({ search: "" });

  
    // Fetch jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("/api/jobs");
                const data = await response.json();
                if (!data.success) {
                    throw new Error(data.error || "Failed to fetch jobs");
                }

                setJobs(data.jobs);
                setFilteredJobs(data.jobs);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            }
        };
        fetchJobs();
    }, []); //when addinng filters add [filters] here for auto update

    // Handle filtering
    useEffect(() => {
        const filtered = jobs.filter((job: any) =>
            job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.location.toLowerCase().includes(filters.search.toLowerCase())
        );
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
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
                        <JobFilter filters={filters} setFilters={setFilters} />
                        <JobList
                            jobs={filteredJobs}
                            bookmarkedJobs={bookmarkedJobs}
                            onToggleBookmark={toggleBookmark}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
