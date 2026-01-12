"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag, User, LogOut, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            // @ts-ignore
            if (session?.user?.role !== "BUYER") {
                router.push("/dashboard/seller"); // Redirect if wrong role
            }
        }
    }, [status, session, router]);

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    const navItems = [
        { href: "/dashboard/buyer", label: "Marketplace", icon: Store }, // Changed label/icon
        { href: "/dashboard/buyer/orders", label: "My Orders", icon: ShoppingBag },
        { href: "/dashboard/buyer/profile", label: "Profile", icon: User },
    ];

    if (status === "loading") return <div className="p-8">Loading...</div>;
    if (!session?.user) return null;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r bg-white shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                        <Store className="h-6 w-6" />
                        <span>MiniShop</span>
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
    );
}
