"use client";
import React from "react";

interface AchievementsProps {
    formData: {
        education: string;
        experience: string;
        skills: string;
    };
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const Achievements: React.FC<AchievementsProps> = ({ formData, handleChange }) => {
    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Education & Experience
                </h3>
                <div className="mt-5 space-y-6">
                    <div>
                        <textarea
                            id="education"
                            rows={3}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g. Bachelor of Science in Computer Science..."
                            value={formData.education}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <textarea
                            id="experience"
                            rows={5}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g. Software Engineer at Tech Company..."
                            value={formData.experience}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Achievements;
