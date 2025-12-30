"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
    "All Categories",
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
    "Fashion",
    "Home",
    "Sport",
];

export function CategoryPills() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "All Categories";

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All Categories") {
            params.delete("category");
        } else {
            params.set("category", category.toLowerCase());
        }
        router.replace(`/?${params.toString()}`);
    };

    return (
        <div className="flex w-full items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => {
                const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
                return (
                    <Button
                        key={cat}
                        variant={isActive ? "default" : "secondary"}
                        size="sm"
                        onClick={() => handleCategoryClick(cat)}
                        className={cn(
                            "rounded-full whitespace-nowrap",
                            isActive ? "bg-primary text-primary-foreground" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        )}
                    >
                        {cat}
                    </Button>
                );
            })}
        </div>
    );
}
