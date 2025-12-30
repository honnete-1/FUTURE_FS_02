import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "buyer" | "admin";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AuthState {
    user: User | null;
    login: (email: string, role?: UserRole) => void;
    logout: () => void;
    register: (name: string, email: string, role?: UserRole) => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            login: (email, role = "buyer") => {
                // Mock login logic
                const mockUser: User = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: email.split("@")[0],
                    email,
                    role: email.includes("admin") ? "admin" : role,
                };
                set({ user: mockUser });
            },
            logout: () => set({ user: null }),
            register: (name, email, role = "buyer") => {
                const newUser: User = {
                    id: Math.random().toString(36).substr(2, 9),
                    name,
                    email,
                    role: email.includes("admin") ? "admin" : role,
                };
                set({ user: newUser });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
