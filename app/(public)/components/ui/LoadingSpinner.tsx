"use client"

import React from "react";

const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 40 }) => {
    const s = size;
    return (
        <div className="flex items-center justify-center py-8">
            <svg
                className="animate-spin text-blue-600"
                width={s}
                height={s}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
        </div>
    );
};

export default LoadingSpinner;
