"use client";

import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import LoadingSpinner from "../../../(public)/components/ui/LoadingSpinner";

const ProfileClients = () => {
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        education: "",
        experience: "",
        skills: "",
    });
    const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
    const [userInfo, setUserInfo] = useState<{ email?: string; memberSince?: string }>({});
    const [stats, setStats] = useState<{ profileCompleteness?: number }>({});
    const [loading, setLoading] = useState(true);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleStrengthToggle = (strength: string) => {
        setSelectedStrengths((prev) =>
            prev.includes(strength)
                ? prev.filter((s) => s !== strength)
                : prev.length < 5
                    ? [...prev, strength]
                    : prev
        );
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/profile");
                const json = await res.json();

                if (!res.ok || !json.success) {
                    console.error("Failed to load profile:", json.error?.message);
                    return;
                }

                const data = json.data;
                const profile = data.profile || {};

                setFormData({
                    name: profile.name ?? "",
                    title: profile.title ?? "",
                    education: profile.education ?? "",
                    experience: profile.experience ?? "",
                    skills: profile.skills ?? "",
                });

                setSelectedStrengths(
                    profile.strengths ? profile.strengths.split(",") : []
                );

                setUserInfo({
                    email: data.user?.email,
                    memberSince: data.user?.memberSince,
                });

                setStats({
                    profileCompleteness: data.stats?.profileCompleteness,
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    strengths: selectedStrengths.join(","),
                }),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.error?.message || "Failed to save profile");
            }

            // Profile updated successfully, no alert needed
        } catch (err) {
            console.error("Error saving profile:", err);
            // Failed to save profile, no alert needed
        }
    };

    if (loading) return (
        <div className="text-center">
            <LoadingSpinner size={48} />
        </div>
    );

    return (
        <>
            <ProfileHeader userInfo={userInfo} stats={stats} />
            <ProfileForm
                formData={formData}
                selectedStrengths={selectedStrengths}
                handleChange={handleChange}
                handleStrengthToggle={handleStrengthToggle}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default ProfileClients;