"use client";
import React, { useState } from "react";
import { Button } from "../../../(public)/components/ui/button";
import { Save, ArrowLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const DraftForm: React.FC = () => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSave = async () => {
        if (!name.trim()) {
            setError("Please enter a name for your draft");
            return;
        }

        if (!content.trim()) {
            setError("Please enter some content for your draft");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/createDrafts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    content: content.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to save draft");
            }

            // Success - redirect to drafts page
            router.push("/drafts");
        } catch (error) {
            console.error("Error saving draft:", error);
            setError(error instanceof Error ? error.message : "Failed to save draft");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if ((name.trim() || content.trim()) && !confirm("Are you sure you want to leave? Your draft will not be saved.")) {
            return;
        }
        router.push("/drafts");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (error) setError(null); // Clear error when user starts typing
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        if (error) setError(null); // Clear error when user starts typing
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-gray-600 mr-3" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Create New Draft
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Write your job application content below. You can save it as a draft and edit it later.
                        </p>
                    </div>
                </div>

                {/* Draft Name Input */}
                <div className="mb-4">
                    <label htmlFor="draft-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Draft Name
                    </label>
                    <input
                        id="draft-name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="e.g., Software Engineer Application - TechCorp"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        disabled={saving}
                    />
                </div>

                {/* Character Counter */}
                <div className="text-right text-sm text-gray-500 mb-2">
                    {content.length} characters
                </div>

                {/* Content Textarea */}
                <div className="mb-4">
                    <label htmlFor="draft-content" className="block text-sm font-medium text-gray-700 mb-2">
                        Draft Content
                    </label>
                    <textarea
                        id="draft-content"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Start writing your job application content here... 

For example:
- Cover letter content
- Application summary
- Key achievements and qualifications
- Why you're interested in the position

You can format and refine this content later with AI assistance."
                        className="w-full h-80 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        disabled={saving}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={saving}
                        className="flex items-center"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>

                    <div className="flex space-x-3">
                        <Button
                            onClick={handleSave}
                            disabled={saving || !content.trim()}
                            className="flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? "Saving..." : "Save Draft"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-3">
                    💡 Tips for Writing Your Draft
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Include specific examples of your achievements and experience</li>
                    <li>• Mention relevant skills and qualifications for the position</li>
                    <li>• Explain why you're interested in the company and role</li>
                    <li>• Keep the tone professional but personable</li>
                    <li>• Don't worry about perfect formatting - you can refine it later</li>
                </ul>
            </div>
        </div>
    );
};

export default DraftForm;