"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../(public)/components/ui/button";
import PersonalInfo from "./components/personal_info";
import Strengths from "./components/strengths";
import Achievements from "./components/achievements";

export default function ProfilePage() {
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

  // Handle input changes for PersonalInfo and Achievements
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Handle strengths toggle
  const handleStrengthToggle = (strength: string) => {
    setSelectedStrengths((prev) =>
      prev.includes(strength)
        ? prev.filter((s) => s !== strength)
        : prev.length < 5
          ? [...prev, strength]
          : prev
    );
  };

  // Fetch profile data (GET /api/profile)
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

  // Save profile (PUT /api/profile)
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

      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("❌ Failed to save profile");
    }
  };

  if (loading) return <p>Loading your profile...</p>;

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-sm text-gray-500">
          Update your profile to help our AI generate better job applications.
        </p>

        {userInfo.email && (
          <div className="mt-3 text-sm text-gray-700">
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Member since:</strong> {userInfo.memberSince}
            </p>
            {stats.profileCompleteness !== undefined && (
              <p>
                <strong>Profile completeness:</strong>{" "}
                {stats.profileCompleteness}% ✅
              </p>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <PersonalInfo formData={formData} handleChange={handleChange} />
        <Strengths
          selectedStrengths={selectedStrengths}
          handleStrengthToggle={handleStrengthToggle}
        />
        <Achievements formData={formData} handleChange={handleChange} />
        <div className="mt-8 flex justify-end">
          <Button type="submit" size="lg">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
