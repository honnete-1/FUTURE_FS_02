"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductActionsProps {
    product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
    const { addItem } = useCart();

    return (
        <div className="flex gap-4">
            <Button
                size="lg"
                className="flex-1 gap-2 text-lg"
                onClick={() => {
                    addItem(product);
                    toast.success(`Added ${product.title} to cart`);
                }}
            >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="px-8">
                Buy Now
            </Button>
        </div>
    );
}
