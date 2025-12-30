"use client";

import Link from "next/link";
import * as React from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/CartSheet";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { UserNav } from "@/components/layout/UserNav";

function SearchBar() {
    // ... existing SearchBar code
}

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center mx-auto px-4">
                <div className="mr-8 hidden md:flex">
                    {/* ... existing code ... */}
                </div>

                {/* Mobile Menu Button */}
                <div className="mr-2 md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Logo */}
                <div className="flex w-full md:hidden">
                    <span className="font-bold text-lg text-primary">MiniCommerce</span>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Suspense fallback={<div className="h-10 w-full md:w-[300px] rounded-full bg-gray-100" />}>
                            <SearchBar />
                        </Suspense>
                    </div>
                    <CartSheet />
                    <UserNav />
                </div>
            </div>
        </nav>
    );
}
