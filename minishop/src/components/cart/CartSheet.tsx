"use client";

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
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
import { useCart } from "@/store/useCart";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSheet() {
    const { items, removeItem, updateQuantity } = useCart();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                            {items.length}
                        </span>
                    )}
                    <span className="sr-only">Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
                </SheetHeader>

                <div className="flex h-full flex-col justify-between pb-6 pt-4">
                    <div className="flex-1 overflow-y-auto pr-2">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center space-y-2 text-gray-500">
                                <ShoppingCart className="h-12 w-12 opacity-20" />
                                <p>Your cart is empty</p>
                                <SheetClose asChild>
                                    <Button variant="link">Continue Shopping</Button>
                                </SheetClose>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 border-b pb-4">
                                        <div className="h-20 w-20 overflow-hidden rounded border bg-white p-2">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex justify-between">
                                                <h4 className="line-clamp-2 text-sm font-medium mr-2">
                                                    {item.title}
                                                </h4>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 rounded-md border p-1">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity - 1)
                                                        }
                                                        className="p-1 hover:bg-gray-100"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-xs w-4 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity + 1)
                                                        }
                                                        className="p-1 hover:bg-gray-100"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <div className="font-semibold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="space-y-4 border-t pt-4">
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <SheetFooter className="sm:flex-col gap-2">
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full" size="lg">
                                        Checkout
                                    </Button>
                                </Link>
                                <SheetClose asChild>
                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
