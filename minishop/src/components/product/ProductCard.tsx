"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    return (
        <div className="group relative rounded-xl border bg-white p-4 transition-all hover:shadow-lg">
            {/* Wishlist Button */}
            <button className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100 p-8">
                <Link href={`/product/${product.id}`}>
                    <div className="relative h-full w-full">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </Link>
            </div>

            {/* Content */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="capitalize">{product.category}</span>
                    <div className="flex items-center">
                        <Star className="mr-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating.rate} ( {product.rating.count} )</span>
                    </div>
                </div>

                <Link href={`/product/${product.id}`}>
                    <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-primary h-10">
                        {product.title}
                    </h3>
                </Link>
                <div className="text-xs text-gray-400">{product.brand}</div>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <Button size="sm" className="rounded-full gap-2" onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                        toast.success(`Added ${product.title} to cart`);
                    }}>
                        <ShoppingCart className="h-4 w-4" />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
}
