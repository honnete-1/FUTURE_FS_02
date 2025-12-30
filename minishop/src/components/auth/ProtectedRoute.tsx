"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/store/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            toast.error("You must be logged in to view this page");
            router.push("/auth/login");
            return;
        }

        if (allowedRoles && !allowedRoles.includes(user.role)) {
            toast.error("You do not have permission to access this page");
            router.push(user.role === "admin" ? "/dashboard/admin" : "/dashboard/buyer");
        }
    }, [user, router, allowedRoles]);

    if (!user) {
        return null; // Or a loading spinner
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
