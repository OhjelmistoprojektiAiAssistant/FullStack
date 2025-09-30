import { ProfileEditCardProps, ProfileUpdateRequest } from "@/lib/types/profile";
import { useState } from "react";



export default function ProfileEditCard({ profile, onSave, isEditing, setIsEditing }: ProfileEditCardProps) {
    const [formData, setFormData] = useState<ProfileUpdateRequest>({
        experience: profile?.experience || "",
        education: profile?.education || "",
        skills: profile?.skills || "",
        strengths: profile?.strengths || "",
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);

        try {
            await onSave(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
        } finally {
            setIsSaving(false);
        }
    }

    const handleCancel = () => {
        //reset form data to original profile data
        setFormData({
            experience: profile?.experience || "",
            education: profile?.education || "",
            skills: profile?.skills || "",
            strengths: profile?.strengths || "",
        });
        setIsEditing(false);
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Form fields - different layout for editing vs viewing */}
        {isEditing ? (
          <form className="space-y-4">
            {/* Experience field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Describe your work experience..."
              />
            </div>
            {/* education field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              <textarea
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Describe your education..."
              />
            </div>
            {/* skills field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <textarea
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Describe your skills..."
              />
            </div>
            {/* strengths field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Strengths
              </label>
              <textarea
                value={formData.strengths}
                onChange={(e) =>
                  setFormData({ ...formData, strengths: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Describe your strengths..."
              />
            </div>

           

            {/* Action buttons */}
            <div className="flex space-x-2 pt-4">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* Read-only view */
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Experience</label>
              <p className="mt-1">{profile?.experience || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Education</label>
              <p className="mt-1">{profile?.education || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Skills</label>
              <p className="mt-1">{profile?.skills || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Strengths</label>
              <p className="mt-1">{profile?.strengths || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Experience</label>
              <p className="mt-1">{profile?.experience || "Not provided"}</p>
            </div>
            {/* Similar read-only fields... */}
          </div>
        )}
      </div>
    );
} 