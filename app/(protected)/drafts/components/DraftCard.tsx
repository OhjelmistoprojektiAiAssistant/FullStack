"use client";
import React, { useState } from "react";
import { Button } from "../../../(public)/components/ui/button";
import { Trash2, Edit, Calendar } from "lucide-react";

interface Draft {
    id: string;
    name: string;
    content: string;
    createdAt: string;
}

interface DraftCardProps {
    draft: Draft;
    onDelete: (id: string) => void;
}

const DraftCard: React.FC<DraftCardProps> = ({ draft, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this draft?")) {
            setIsDeleting(true);
            try {
                const res = await fetch(`/api/auth/deletedrafts?id=${draft.id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    onDelete(draft.id);
                } else {
                    const error = await res.json();
                    alert(`Failed to delete draft: ${error.error || "Unknown error"}`);
                }
            } catch (error) {
                console.error("Error deleting draft:", error);
                alert("Failed to delete draft. Please try again.");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{draft.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(draft.createdAt)}
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFullContent(!showFullContent)}
                    >
                        <Edit className="w-4 h-4 mr-1" />
                        {showFullContent ? "Show Less" : "View Full"}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>

            <div className="text-gray-700">
                <p className="whitespace-pre-wrap">
                    {showFullContent ? draft.content : truncateContent(draft.content)}
                </p>
                {draft.content.length > 150 && !showFullContent && (
                    <button
                        onClick={() => setShowFullContent(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm mt-2"
                    >
                        Read more
                    </button>
                )}
            </div>
        </div>
    );
};

export default DraftCard;