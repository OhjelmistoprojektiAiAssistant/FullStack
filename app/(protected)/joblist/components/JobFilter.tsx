import React, { useEffect, useState } from "react";
import { Input } from "../../../(public)/components/ui/input";

interface JobFilterValues {
    title: string;
    location: string;
}

interface JobFilterProps {
    filters?: JobFilterValues;
    onSearch: (vals: JobFilterValues) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ filters, onSearch }) => {
    const [title, setTitle] = useState(filters?.title || "");
    const [location, setLocation] = useState(filters?.location || "");

    useEffect(() => {
        if (filters) {
            setTitle(filters.title || "");
            setLocation(filters.location || "");
        }
    }, [filters]);

    const handleSearch = () => {
        onSearch({ title: title.trim(), location: location.trim() });
    };

    return (
        <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <Input
                        placeholder="e.g. Javascript Developer"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input
                        placeholder="e.g. London"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={handleSearch}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTitle("");
                        setLocation("");
                        onSearch({ title: "", location: "" });
                    }}
                    className="inline-flex items-center px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default JobFilter;
