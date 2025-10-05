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
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personal Information
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full name
                        </label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mt-4"
                        >
                            Professional title
                        </label>
                        <Input
                            id="title"
                            placeholder="e.g. Software Engineer"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
