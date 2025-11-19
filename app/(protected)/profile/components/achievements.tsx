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
        <div className="bg-stone-50 border border-stone-200 rounded-xl shadow-sm">
            <div className="px-6 py-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-6">
                    Education & Experience
                </h3>
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="education"
                            className="block text-stone-700 font-medium text-base mb-2"
                        >
                            Education Background
                        </label>
                        <textarea
                            id="education"
                            rows={4}
                            className="w-full text-base p-4 rounded-lg border border-stone-300 resize-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. Bachelor of Science in Computer Science from University Name, Master's Degree, Certifications..."
                            value={formData.education}
                            onChange={handleChange}
                        />
                        <p className="mt-2 text-sm text-stone-500">
                            Include degrees, certifications, and relevant coursework
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="experience"
                            className="block text-stone-700 font-medium text-base mb-2"
                        >
                            Work Experience
                        </label>
                        <textarea
                            id="experience"
                            rows={6}
                            className="w-full text-base p-4 rounded-lg border border-stone-300 resize-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. Software Engineer at Tech Company (2020-2024): Developed web applications using React and Node.js. Led a team of 3 developers..."
                            value={formData.experience}
                            onChange={handleChange}
                        />
                        <p className="mt-2 text-sm text-stone-500">
                            Detail your professional experience, achievements, and key responsibilities
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="skills"
                            className="block text-stone-700 font-medium text-base mb-2"
                        >
                            Technical Skills
                        </label>
                        <textarea
                            id="skills"
                            rows={4}
                            className="w-full text-base p-4 rounded-lg border border-stone-300 resize-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. Programming: JavaScript, Python, Java | Frameworks: React, Node.js, Django | Tools: Git, Docker, AWS..."
                            value={formData.skills}
                            onChange={handleChange}
                        />
                        <p className="mt-2 text-sm text-stone-500">
                            List your technical skills, programming languages, frameworks, and tools
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Achievements;
