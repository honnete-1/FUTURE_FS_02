"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/store/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuth((state) => state.login);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate basic validation
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        login(email);
        toast.success("Welcome back!");

        if (email.includes("admin")) {
            router.push("/dashboard/admin");
        } else {
            router.push("/dashboard/buyer");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <ShoppingBag className="h-8 w-8 text-primary" />
                            <span className="font-bold text-2xl text-primary">MiniCommerce</span>
                        </Link>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email below to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">Sign in</Button>
                        <div className="text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </div>
                        <div className="mt-4 text-xs text-center text-gray-400">
                            <p>For demo purposes:</p>
                            <p>Admin: admin@minishop.com</p>
                            <p>Buyer: buyer@minishop.com</p>
                            <p>Any password works.</p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
