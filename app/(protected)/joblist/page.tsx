"use client";
import Navbar from '@/app/(public)/components/frontpage/NavBar';
import React, { useEffect, useState } from "react";
import JobList from "././components/JobList";
import JobFilter from "././components/JobFilter";

export default function JobPage() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
    const [filters, setFilters] = useState({ search: "" });

    // Fetch jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch("https://api.example.com/jobs"); //VAIHDA OIKEAN API KANSSA
                const data = await res.json();
                setJobs(data);
                setFilteredJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            }
        };
        fetchJobs();
    }, []);

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
