import { User } from "@/app/generated/prisma";

export interface SessionUser {
    userId: string | undefined;
    email: string | undefined;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}