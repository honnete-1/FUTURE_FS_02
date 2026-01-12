'use client'

import { authenticate } from "@/actions/auth"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <form action={formAction}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage === 'CredentialSignin' ? 'Invalid credentials' : 'Something went wrong'}</p>
                        )}
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                        <div className="text-center text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
