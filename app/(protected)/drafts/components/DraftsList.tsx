"use client";
import React, { useState, useEffect } from "react";
import DraftCard from "./DraftCard";
import { Button } from "../../../(public)/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../../(public)/components/ui/LoadingSpinner";

interface Draft {
    id: string;
    name: string;
    content: string;
    createdAt: string;
}

const DraftsList: React.FC = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchDrafts = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/drafts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch drafts");
            }

            setDrafts(data || []);
        } catch (error) {
            console.error("Error fetching drafts:", error);
            setError(error instanceof Error ? error.message : "Failed to load drafts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    const handleDeleteDraft = (deletedId: string) => {
        setDrafts(drafts.filter(draft => draft.id !== deletedId));
    };

    const handleCreateNewDraft = () => {
        router.push("/addDraft");
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <LoadingSpinner size={48} />
                <p className="text-center text-gray-600 mt-4">Loading your drafts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <Button onClick={fetchDrafts} variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Your Drafts ({drafts.length})
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage your saved application drafts
                    </p>
                </div>
                <Button onClick={handleCreateNewDraft} className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    New Draft
                </Button>
            </div>

            {drafts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <div className="max-w-sm mx-auto">
                        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No drafts yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Create your first application draft to get started with AI-powered job applications.
                        </p>
                        <Button onClick={handleCreateNewDraft}>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Draft
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {drafts.map((draft) => (
                        <DraftCard
                            key={draft.id}
                            draft={draft}
                            onDelete={handleDeleteDraft}
                        />
                    ))}
                </div>
            )}

            {drafts.length > 0 && (
                <div className="text-center pt-4">
                    <Button variant="outline" onClick={fetchDrafts}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Drafts
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DraftsList;