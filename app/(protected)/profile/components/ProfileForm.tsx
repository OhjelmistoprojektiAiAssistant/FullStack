"use client";
import React from "react";
import PersonalInfo from "./personal_info";
import Strengths from "./strengths";
import Achievements from "./achievements";
import { Button } from "../../../(public)/components/ui/button";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
    formData: {
        name: string;
        title: string;
        education: string;
        experience: string;
        skills: string;
    };
    selectedStrengths: string[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleStrengthToggle: (strength: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    formData,
    selectedStrengths,
    handleChange,
    handleStrengthToggle,
    handleSubmit,
}) => {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        await handleSubmit(e);
        router.push("/dashboard");
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <PersonalInfo formData={formData} handleChange={handleChange} />
            <Strengths
                selectedStrengths={selectedStrengths}
                handleStrengthToggle={handleStrengthToggle}
            />
            <Achievements formData={formData} handleChange={handleChange} />

            <div className="flex justify-center pt-6">
                <Button
                    type="submit"
                    size="lg"
                    className="bg-stone-900 text-white hover:bg-black px-8 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    Save Profile & Continue
                </Button>
            </div>
        </form>
    );
};

export default ProfileForm;