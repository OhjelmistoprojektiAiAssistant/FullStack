export interface SessionUser {
    userId: string | undefined;
    email: string | undefined;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    isLoading: boolean;
}