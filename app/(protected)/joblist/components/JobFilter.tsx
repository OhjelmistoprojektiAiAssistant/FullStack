import React from "react";
import { Input } from "../../../(public)/components/ui/input";

interface JobFilterProps {
    filters: { search: string };
    setFilters: React.Dispatch<React.SetStateAction<{ search: string }>>;
}

const JobFilter: React.FC<JobFilterProps> = ({ filters, setFilters }) => {
    return (
        <div className="flex gap-3">
            <Input
                placeholder="Search by title, company, or location..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="max-w-md"
            />
        </div>
    );
};

export default JobFilter;
