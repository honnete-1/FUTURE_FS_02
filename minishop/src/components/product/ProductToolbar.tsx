"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import { CategoryPills } from "./CategoryPills";

export function ProductToolbar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State initialization froom URL
    const initialMin = Number(searchParams.get("minPrice")) || 0;
    const initialMax = Number(searchParams.get("maxPrice")) || 500;
    const initialBrands = searchParams.get("brands")?.split(",") || [];

    const [priceRange, setPriceRange] = React.useState([initialMin, initialMax]);
    const [selectedBrands, setSelectedBrands] = React.useState<string[]>(initialBrands);

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("minPrice", priceRange[0].toString());
        params.set("maxPrice", priceRange[1].toString());

        if (selectedBrands.length > 0) {
            params.set("brands", selectedBrands.join(","));
        } else {
            params.delete("brands");
        }

        router.replace(`/?${params.toString()}`);
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleSort = (sortValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sortValue);
        router.replace(`/?${params.toString()}`);
    };

    return (
        <div className="sticky top-16 z-30 w-full bg-white/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* Mobile/Tablet Filter Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="py-6 space-y-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold">Price Range</h3>
                                <Slider
                                    max={500}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    className="my-4"
                                />
                                <div className="flex justify-between text-sm">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold">Brands</h3>
                                {["Nordic Gear", "Chrono", "AudioPro", "TechHome", "Basics", "DenimCo", "PureLife", "KeyMaster", "Velocity", "Lumina"].map(brand => (
                                    <div key={brand} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={brand}
                                            checked={selectedBrands.includes(brand)}
                                            onCheckedChange={() => toggleBrand(brand)}
                                        />
                                        <Label htmlFor={brand}>{brand}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button className="w-full" onClick={applyFilters}>Show Results</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                {/* Categories - Horizontal Scroll */}
                <div className="flex-1 overflow-hidden">
                    <CategoryPills />
                </div>

                {/* Sort Trigger */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2 shrink-0">
                            <ArrowDownWideNarrow className="h-4 w-4" />
                            <span className="hidden sm:inline">Sort by</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSort("price_asc")}>
                            Price: Low to High
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("price_desc")}>
                            Price: High to Low
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("rating_desc")}>
                            Top Rated
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
