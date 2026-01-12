'use client'

import { signup } from "@/actions/auth"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signup, undefined)
    const [role, setRole] = useState("BUYER")

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Choose your account type to get started</CardDescription>
                </CardHeader>
                <Tabs defaultValue="BUYER" onValueChange={setRole} className="w-full">
                    <div className="px-6 mb-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="BUYER">Buyer</TabsTrigger>
                            <TabsTrigger value="SELLER">Seller</TabsTrigger>
                        </TabsList>
                    </div>

                    <form action={formAction}>
                        <input type="hidden" name="role" value={role} />
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" required />
                                {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                                {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
                                {state?.message && !state.errors && <p className="text-red-500 text-sm">{state.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                                {state?.errors?.password && <p className="text-red-500 text-sm">{state.errors.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? "Creating account..." : `Sign up as ${role === 'BUYER' ? 'Buyer' : 'Seller'}`}
                            </Button>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="underline">
                                    Login
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Tabs>
            </Card>
        </div>
    )
}
