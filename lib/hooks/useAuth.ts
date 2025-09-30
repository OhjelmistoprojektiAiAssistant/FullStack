"use client";

import { useEffect, useState } from "react";
import { AuthState } from "../types/session";
import { useRouter } from "next/navigation";


export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        isLoading: true
    });
    const router = useRouter();

    const checkSession = async () => {
        try {
            const response = await fetch("/api/auth/session", {
                method: "GET",
                credentials: "include", // important cor cookies
                cache: "no-store" // always fetch fresh data
            });

            const data = await response.json();

            if (data.success) {
                setAuthState({
                    isAuthenticated: data.isAuthenticated,
                    user: data.user,
                    isLoading: false
                });
            }
            return authState;
        } catch (error) {
            console.error("Failed to check session", error);
            setAuthState({
                isAuthenticated: false,
                user: null,
                isLoading: false
            });
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    isLoading: false
                });
                //redirect to homne
                router.push("/");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return {
        ...authState,
        logout,
        refreshSession: checkSession
    };
}