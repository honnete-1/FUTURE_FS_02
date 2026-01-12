"use client";

import * as React from "react";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, LayoutDashboard } from "lucide-react";

export function UserNav() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
        router.refresh();
    };

    if (!mounted || status === "loading") {
        return (
            <div className="flex items-center gap-2">
                <Button variant="ghost" disabled>Log in</Button>
                <Button disabled>Sign up</Button>
            </div>
        );
    }

    if (!session || !session.user) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Sign up</Link>
                </Button>
            </div>
        );
    }

    const user = session.user;
    const initials = user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";

    // @ts-ignore
    const role = user.role;
    const dashboardLink = role === "SELLER" || role === "ADMIN" ? "/dashboard/seller" : "/dashboard/buyer";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || "/avatars/01.png"} alt={user.name || "User"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-primary font-bold">{role}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={dashboardLink} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`${dashboardLink}/profile`} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
