import { auth } from "@/auth"
import db from "@/lib/db"
import { ProductCard } from "@/components/product/ProductCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

export default async function BuyerDashboardPage() {
    const session = await auth()
    if (!session?.user) return <div>Unauthorized</div>

    // Fetch orders for this user
    const dbOrders = await db.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 5
    })

    // Fetch all products for Marketplace
    const products = await db.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session.user.name}!</h1>
                <p className="text-muted-foreground">Pick your favorite items from the marketplace.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dbOrders.length}</div>
                        <p className="text-xs text-muted-foreground">Total orders placed</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Marketplace</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={{
                            ...product,
                            rating: { rate: product.ratingRate, count: product.ratingCount }
                        }} />
                    ))}
                </div>
            </div>
        </div>
    )
}
