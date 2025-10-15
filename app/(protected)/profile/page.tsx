import React from "react";
import Navbar from "@/app/(public)/components/frontpage/NavBar";
import ProfileClient from "./components/ProfileClients";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ProfileClient />
          </div>
        </div>
      </div>
    </>
  );
}