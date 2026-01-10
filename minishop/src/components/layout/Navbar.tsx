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
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = React.useState(searchParams.get("q") || "");

    const handleSearch = (term: string) => {
        setQuery(term);
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        router.replace(`/?${params.toString()}`);
    };

    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary md:w-[300px]"
            />
        </div>
    );
}

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center mx-auto px-4">
                <div className="mr-8 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-xl text-primary">
                            MiniCommerce
                        </span>
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/?category=electronics" className="hover:text-primary transition-colors">
                            Deals
                        </Link>
                        <Link href="/?sort=rating_desc" className="hover:text-primary transition-colors">
                            Best Sellers
                        </Link>
                    </div>
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
