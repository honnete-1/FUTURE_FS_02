"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/store/useCart";
import { useAdminStore } from "@/store/useAdminStore";
import { useAuth } from "@/store/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const { placeOrder } = useAdminStore();
    const { user } = useAuth();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Simple form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });

    const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            placeOrder({
                userId: user?.id || "guest",
                items: items.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                total: cartTotal,
            });

            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (!mounted) {
        return null;
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 rounded-full bg-green-100 p-6 text-green-600">
                    <CheckCircle2 className="h-16 w-16" />
                </div>
                <h1 className="mb-4 text-3xl font-bold">Order Confirmed!</h1>
                <p className="mb-8 max-w-md text-gray-500">
                    Thank you for your purchase. We have sent a confirmation email to{" "}
                    <span className="font-medium text-gray-900">{formData.email}</span>.
                </p>
                <Link href="/">
                    <Button size="lg">Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link href="/">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">Checkout</h1>
                        <p className="text-gray-500">
                            Please enter your details to complete your purchase.
                        </p>
                    </div>

                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Contact Information</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        required
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        required
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Shipping Address</h2>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    required
                                    placeholder="123 Main St"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        required
                                        placeholder="New York"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <Input
                                        id="zip"
                                        name="zip"
                                        required
                                        placeholder="10001"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Payment Details</h2>
                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                    id="cardNumber"
                                    name="cardNumber"
                                    required
                                    placeholder="0000 0000 0000 0000"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input
                                        id="expiry"
                                        name="expiry"
                                        required
                                        placeholder="MM/YY"
                                        value={formData.expiry}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input
                                        id="cvc"
                                        name="cvc"
                                        required
                                        placeholder="123"
                                        value={formData.cvc}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="sticky top-24 rounded-lg border bg-gray-50 p-6">
                    <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                    <div className="mb-6 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="line-clamp-1 flex-1 pr-4">{item.title} (x{item.quantity})</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mb-6 border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button
                        className="w-full"
                        size="lg"
                        type="submit"
                        form="checkout-form"
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                    <div className="mt-4 text-center text-xs text-gray-500">
                        Secure Checkout powered by Stripe (Simulated)
                    </div>
                </div>
            </div>
        </div>
    );
}
