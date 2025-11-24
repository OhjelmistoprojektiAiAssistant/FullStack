"use client";
import Navbar from "@/app/(public)/components/frontpage/NavBar";
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
  const [filters, setFilters] = useState({ title: "", location: "" });
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const fetchJobs = useCallback(
    async (searchFilters?: { title?: string; location?: string }) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("results_per_page", "50");
        params.set("content-type", "application/json");

        if (searchFilters) {
          if (searchFilters.title) params.set("what", searchFilters.title);
          if (searchFilters.location)
            params.set("where", searchFilters.location);
        }

        const res = await fetch(`/api/jobs?${params.toString()}`);
        const data = await res.json();

        if (!data.success)
          throw new Error(data.error || "Failed to fetch jobs");

        setJobs(data.jobs || []);
        setFilteredJobs(data.jobs || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const toggleBookmark = (id: string) => {
    setBookmarkedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-0 relative overflow-hidden">
        {/* Background FX */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-16 px-4 relative z-10">
          <div className="w-full max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                    Every job in one place
                </h1>
              <div className="space-y-2">
                <p className="text-xl text-blue-100">
                  Find open jobs easily on Ai Career Assistant. Also check out
                </p>
                <p className="text-xl">
                  <span className="text-cyan-300 font-medium">
                    New Application
                </span>
                  <span className="text-blue-100">
                    , to help you land your next opportunity.
                  </span>
                </p>
              </div>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row items-stretch gap-2 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center px-4 py-3 gap-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Etsi työpaikkaa, yritystä tai alaa"
                  value={filters.title}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="flex-1 text-gray-700 placeholder-gray-400 border-none outline-none text-lg"
                />
              </div>

              <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

              <div className="flex-1 flex items-center px-4 py-3 gap-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Sijainti"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="flex-1 text-gray-700 placeholder-gray-400 border-none outline-none text-lg"
                />
              </div>

              <button
                onClick={() =>
                  fetchJobs({
                    title: filters.title || undefined,
                    location: filters.location || undefined,
                  })
                }
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 text-lg"
              >
                Etsi
              </button>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-8 px-4 relative z-10">
          <div className="w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 rounded-2xl p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-800">
                  Job Listings
                </h2>
                <p className="text-stone-600">
                  {filteredJobs.length} jobs found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showBookmarked"
                  checked={showBookmarkedOnly}
                  onChange={(e) => setShowBookmarkedOnly(e.target.checked)}
                  className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                />
                <label
                  htmlFor="showBookmarked"
                  className="text-sm text-gray-700 font-medium"
                >
                  Show only bookmarked jobs
                </label>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <LoadingSpinner size={48} />
                <p className="text-gray-600 mt-4 text-lg">Loading jobs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 text-lg font-medium">{error}</div>
                <button
                  onClick={() => fetchJobs()}
                  className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <JobList
                jobs={
                  showBookmarkedOnly
                    ? filteredJobs.filter((job) =>
                        bookmarkedJobs.includes(job.id)
                      )
                    : filteredJobs
                }
                bookmarkedJobs={bookmarkedJobs}
                onToggleBookmark={toggleBookmark}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
