import React from "react";
import { Input } from "../../../(public)/components/ui/input";
import { Slider } from "../../../(public)/components/ui/slider";

interface JobFilterProps {
    filters: {
        title: string;
        location: string;
        minSalary: number;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        title: string;
        location: string;
        minSalary: number;
    }>>;
}

const JobFilter: React.FC<JobFilterProps> = ({ filters, setFilters }) => {
    return (
        <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                    </label>
                    <Input
                        placeholder="Search by job title..."
                        value={filters.title}
                        onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <Input
                        placeholder="Search by location..."
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Salary: ${filters.minSalary.toLocaleString()}
                </label>
                <Slider
                    value={[filters.minSalary]}
                    onValueChange={([value]) => setFilters(prev => ({ ...prev, minSalary: value }))}
                    min={0}
                    max={200000}
                    step={5000}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default JobFilter;
