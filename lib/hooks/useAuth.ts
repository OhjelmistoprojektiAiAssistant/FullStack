"use client";

import { useEffect, useState } from "react";
import { AuthState } from "../types/session";
import { useRouter } from "next/navigation";

/* how to use this hook:
    1. import the hook
    2. call the hook in your component
    3. use the returned values (isAuthenticated, user, isLoading, logout, refreshSession) in your client component
    Example:
    import { useAuth } from '@/lib/hooks/useAuth';
    const { isAuthenticated, user, isLoading, logout, refreshSession } = useAuth(); 
    now you can use isAuthenticated to check if the user is logged in, user to get user info,
    isLoading to show a loading state, logout to log the user out and refreshSession to manually refresh the session data
*/  
export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        isLoading: true
    });
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const checkSession = async () => {
        try {
            const response = await fetch("/api/auth/session", {
                method: "GET",
                credentials: "include", // important for cookies
                cache: "no-store" // always fetch fresh data
            });

            const data = await response.json();

            setAuthState({
                isAuthenticated: data.isAuthenticated || false,
                user: data.user || null,
                isLoading: false
            });
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
        setMounted(true);
        checkSession();
    }, []);

    return {
        ...authState,
        isLoading: authState.isLoading || !mounted,
        logout,
        refreshSession: checkSession
    };
}