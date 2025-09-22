"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    async function Logout() {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        router.push("/login");
    }
    return (
        <button
            onClick={Logout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
            Logout
        </button>
    )
}