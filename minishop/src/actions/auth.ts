'use server'

import bcrypt from "bcryptjs"
import db from "@/lib/db"
import { z } from "zod"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"

const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    role: z.enum(["BUYER", "SELLER"]),
})

export async function signup(prevState: any, formData: FormData) {
    const validatedFields = signupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Account.",
        }
    }

    const { name, email, password, role } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Account. Email might already fail.",
        }
    }

    redirect("/login")
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', Object.fromEntries(formData))
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialSignin'
        }
        throw error
    }
}

export async function resetPassword(email: string) {
    // Mock email sending
    console.log(`[Mock Email Service] Sending password reset link to: ${email}`)
    // In a real app, you would generate a token, save it to DB, and send email via resend/nodemail/etc.
    return { success: true }
}
