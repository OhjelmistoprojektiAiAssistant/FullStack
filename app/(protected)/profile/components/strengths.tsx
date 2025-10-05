"use client";
import React from "react";
import { CheckIcon } from "lucide-react";

interface StrengthsProps {
    selectedStrengths: string[];
    handleStrengthToggle: (strength: string) => void;
}

const strengths = [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Teamwork",
    "Adaptability",
    "Creativity",
    "Critical Thinking",
    "Time Management",
    "Attention to Detail",
    "Technical Skills",
    "Project Management",
    "Customer Service",
    "Research",
    "Data Analysis",
    "Public Speaking",
];

const Strengths: React.FC<StrengthsProps> = ({
    selectedStrengths,
    handleStrengthToggle,
}) => {
    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Select Your Strengths
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Choose up to 5 strengths that best describe your professional abilities.
                </p>
                <div className="mt-5">
                    <span className="text-sm font-medium text-gray-700">
                        Selected: {selectedStrengths.length}/5
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {strengths.map((strength) => (
                            <button
                                key={strength}
                                type="button"
                                className={`px-3 py-2 rounded border text-sm ${selectedStrengths.includes(strength)
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                                onClick={() => handleStrengthToggle(strength)}
                                disabled={
                                    !selectedStrengths.includes(strength) &&
                                    selectedStrengths.length >= 5
                                }
                            >
                                {strength}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Strengths;
