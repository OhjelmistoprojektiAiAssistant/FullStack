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
        <div className="bg-stone-50 border border-stone-200 rounded-xl shadow-sm">
            <div className="px-6 py-6">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-stone-800 mb-2">
                        Professional Strengths
                    </h3>
                    <p className="text-stone-600">
                        Choose up to 5 strengths that best describe your professional abilities.
                    </p>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <span className="text-base font-medium text-stone-700">
                        Selected Strengths
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-800 bg-stone-200 px-3 py-1 rounded-full">
                            {selectedStrengths.length}/5
                        </span>
                        {selectedStrengths.length === 5 && (
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                Complete ✓
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {strengths.map((strength) => {
                        const isSelected = selectedStrengths.includes(strength);
                        const isDisabled = !isSelected && selectedStrengths.length >= 5;

                        return (
                            <button
                                key={strength}
                                type="button"
                                className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${isSelected
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-md transform scale-105"
                                        : isDisabled
                                            ? "bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed"
                                            : "bg-white text-stone-700 border-stone-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                                    }`}
                                onClick={() => handleStrengthToggle(strength)}
                                disabled={isDisabled}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {isSelected && <CheckIcon className="w-4 h-4" />}
                                    <span>{strength}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {selectedStrengths.length < 5 && (
                    <p className="mt-4 text-sm text-stone-500">
                        Select {5 - selectedStrengths.length} more strength{5 - selectedStrengths.length === 1 ? '' : 's'} to complete this section.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Strengths;
