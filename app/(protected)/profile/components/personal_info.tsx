"use client";
import React from "react";
import { Input } from "../../../(public)/components/ui/input";

// This interface now accepts *extra fields* without error
interface PersonalInfoProps {
    formData: {
        name: string;
        title: string;
        [key: string]: any; // ✅ allows other fields (education, experience, etc.)
    };
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, handleChange }) => {
    return (
        <div className="bg-stone-50 border border-stone-200 rounded-xl shadow-sm">
            <div className="px-6 py-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-6">
                    Personal Information
                </h3>

                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-stone-700 font-medium text-base mb-2"
                        >
                            Full Name
                        </label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full text-base p-4 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="title"
                            className="block text-stone-700 font-medium text-base mb-2"
                        >
                            Professional Title
                        </label>
                        <Input
                            id="title"
                            placeholder="e.g. Software Engineer, Product Manager, Designer"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full text-base p-4 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-2 text-sm text-stone-500">
                            Your professional title or desired position
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
