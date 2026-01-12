"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"
import { resetPassword } from "@/actions/auth"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsPending(true)

        // Call server action
        await resetPassword(email)

        setIsPending(false)
        setIsSubmitted(true)
        toast.success("Password reset instructions sent")
    }

    if (isSubmitted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Check your email</CardTitle>
                        <CardDescription>
                            We have sent password reset instructions to <strong>{email}</strong>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Please check your email inbox and spam folder. The link will expire in 1 hour.
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button asChild className="w-full">
                            <Link href="/login">Back to Login</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>Enter your email address and we'll send you a link to reset your password.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Sending..." : "Send Reset Link"}
                        </Button>
                        <div className="text-center text-sm">
                            <Link href="/login" className="underline">
                                Back to Login
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
