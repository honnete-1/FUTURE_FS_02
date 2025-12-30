"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function ProductFilters() {
    const [priceRange, setPriceRange] = React.useState([20, 1130]);

    return (
        <div className="space-y-8">
            {/* Price Range */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Price Range</h3>
                    <Button variant="link" className="h-auto p-0 text-xs text-gray-500">
                        Reset
                    </Button>
                </div>
                <div className="pt-2">
                    <Slider
                        defaultValue={[20, 1130]}
                        max={2000}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-4"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                        ${priceRange[0]}
                    </div>
                    <div className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                        ${priceRange[1]}
                    </div>
                </div>
            </div>

            {/* Star Rating */}
            <div className="space-y-4">
                <h3 className="font-semibold">Star Rating</h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center space-x-2">
                            <Checkbox id={`star-${stars}`} />
                            <label
                                htmlFor={`star-${stars}`}
                                className="flex flex-1 cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                <div className="flex items-center text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < stars ? "fill-current" : "text-gray-200 fill-gray-200"}`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-400 font-normal">& up</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Brand</h3>
                    <Button variant="link" className="h-auto p-0 text-xs text-gray-500">
                        Reset
                    </Button>
                </div>
                <div className="space-y-2">
                    {["Adidas", "Columbia", "Nike", "Xiaomi", "Asics"].map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                            <Checkbox id={`brand-${brand}`} />
                            <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
