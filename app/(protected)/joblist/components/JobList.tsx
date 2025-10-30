import React from "react";
import JobCard from "./JobCard";
import { JobListDto } from "./dto/jobListDto";

interface JobListProps {
    jobs: JobListDto[];
    bookmarkedJobs: string[];
    onToggleBookmark: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, bookmarkedJobs, onToggleBookmark }) => {
    if (jobs.length === 0) return <p>No jobs found.</p>;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    isBookmarked={bookmarkedJobs.includes(job.id)}
                    onToggleBookmark={onToggleBookmark}
                />
            ))}
        </div>
    );
};

export default JobList;
