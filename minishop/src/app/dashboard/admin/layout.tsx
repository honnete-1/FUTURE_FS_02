"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    const navItems = [
        { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/admin/products", label: "Products", icon: Package },
        { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingCart },
        { href: "/dashboard/admin/customers", label: "Customers", icon: Users },
    ];

    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <div className="flex min-h-screen bg-gray-100/50">
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r bg-white shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0">
                    <div className="flex h-16 items-center border-b px-6">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                            <Store className="h-6 w-6" />
                            <span>MiniAdmin</span>
                        </Link>
                    </div>
                    <div className="flex flex-col h-[calc(100vh-4rem)] justify-between py-4">
                        <nav className="space-y-1 px-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="px-4">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64">
                    <div className="container mx-auto p-8">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
