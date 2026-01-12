import { auth } from "@/auth"
import db from "@/lib/db"
import { AddProductForm } from "./add-product-form"
import { ProductCard } from "@/components/product/ProductCard"
import { deleteProduct } from "@/actions/product"
import { DeleteProduct } from "./delete-product"
import { Product } from "@prisma/client"

export default async function SellerDashboard() {
    const session = await auth()
    if (!session || !session.user) return <div>Unauthorized</div>

    const products = await db.product.findMany({
        where: { sellerId: session.user.id },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {session.user.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <AddProductForm />
                </div>

                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-2xl font-semibold">My Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((product: Product) => (
                            <div key={product.id} className="relative group">
                                <ProductCard product={{
                                    ...product,
                                    rating: { rate: product.ratingRate, count: product.ratingCount }
                                }} />
                                <DeleteProduct id={product.id} />
                            </div>
                        ))}
                        {products.length === 0 && (
                            <p className="text-muted-foreground">No products yet. Add your first one!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
