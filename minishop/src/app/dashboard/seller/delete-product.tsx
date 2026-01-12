'use client'

import { deleteProduct } from "@/actions/product"
import { Button } from "@/components/ui/button"

export function DeleteProduct({ id }: { id: number }) {
    return (
        <form action={async () => {
            await deleteProduct(id)
        }} className="absolute top-2 right-2 z-20">
            <Button variant="destructive" size="sm" type="submit">Delete</Button>
        </form>
    )
}
