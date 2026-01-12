'use server'

import db from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const productSchema = z.object({
    title: z.string().min(2),
    price: z.number().min(0),
    description: z.string().min(10),
    category: z.string().min(2),
    image: z.string().url(),
    brand: z.string().optional(),
})

export async function addProduct(prevState: any, formData: FormData) {
    const session = await auth()
    if (!session || !session.user || session.user.role !== "SELLER") {
        return { message: "Unauthorized" }
    }

    const validatedFields = productSchema.safeParse({
        title: formData.get("title"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        category: formData.get("category"),
        image: formData.get("image"),
        brand: formData.get("brand") || "Generic",
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Product.",
        }
    }

    const { title, price, description, category, image, brand } = validatedFields.data

    try {
        await db.product.create({
            data: {
                title,
                price,
                description,
                category,
                image,
                brand: brand || "Generic",
                sellerId: session.user.id,
            },
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Product.",
        }
    }

    revalidatePath("/dashboard/seller")
    return { message: "Product Created" }
}

export async function deleteProduct(id: number) {
    const session = await auth()
    if (!session || !session.user || session.user.role !== "SELLER") {
        return { message: "Unauthorized" }
    }

    try {
        await db.product.delete({
            where: {
                id: id,
                sellerId: session.user.id // Ensure ownership
            },
        })
        revalidatePath("/dashboard/seller")
        return { message: "Deleted Product" }
    } catch (error) {
        return { message: "Database Error: Failed to Delete Product." }
    }
}
