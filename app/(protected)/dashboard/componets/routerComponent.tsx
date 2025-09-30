"use client";

import { useRouter } from "next/navigation";


export default function RouterComponent() {

    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/profile")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >Profile</button>
    )
}