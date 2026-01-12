'use client'

import { addProduct } from "@/actions/product"
import { useActionState } from "react" // Wait, 'react-dom' or 'react'? Next.js 15 uses react. Next 14 uses react-dom. 
// "react": "19.2.3" in package.json implies Next 15/canary or highly experimental. Nextjs 16.1.1!
// Next.js 16? Use 'react'.
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AddProductForm() {
    const [state, formAction, isPending] = useActionState(addProduct, undefined)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Product Title" required />
                            {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input id="price" name="price" type="number" step="0.01" placeholder="99.99" required />
                            {state?.errors?.price && <p className="text-red-500 text-sm">{state.errors.price}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" placeholder="Electronics, Clothing..." required />
                        {state?.errors?.category && <p className="text-red-500 text-sm">{state.errors.category}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input id="image" name="image" placeholder="https://..." required />
                        {state?.errors?.image && <p className="text-red-500 text-sm">{state.errors.image}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Product details..." required />
                        {state?.errors?.description && <p className="text-red-500 text-sm">{state.errors.description}</p>}
                    </div>

                    {state?.message && !state.errors && (
                        <p className={state.message.includes("Created") ? "text-green-500" : "text-red-500"}>
                            {state.message}
                        </p>
                    )}

                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Adding..." : "Add Product"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
