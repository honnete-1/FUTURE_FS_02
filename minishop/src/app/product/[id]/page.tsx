import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShoppingCart, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ProductActions } from "@/components/product/ProductActions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-gray-500">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <span className="capitalize">{product.category}</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{product.title}</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Gallery Section */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-xl border bg-white p-8">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    {/* Thumbnail placeholders (if we had more images) */}
                    <div className="flex gap-4">
                        {[product.image, product.image, product.image].map((img, i) => (
                            <div key={i} className="h-24 w-24 rounded-lg border bg-white p-2 cursor-pointer hover:border-primary">
                                <img src={img} className="h-full w-full object-contain" alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            {product.title}
                        </h1>
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating.rate)
                                            ? "fill-current"
                                            : "text-gray-200 fill-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">
                                {product.rating.count} reviews
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                        </div>
                        <p className="text-gray-500">Includes taxes and fees</p>
                    </div>

                    <div className="prose prose-sm text-gray-600">
                        <p>{product.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 border-t pt-8">
                        <ProductActions product={product} />

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-8 text-center text-xs text-gray-500">
                            <div className="flex flex-col items-center gap-2">
                                <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                                    <Truck className="h-5 w-5" />
                                </div>
                                <span>Free Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="rounded-full bg-green-50 p-3 text-green-600">
                                    <RefreshCw className="h-5 w-5" />
                                </div>
                                <span>30 Days Return</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="rounded-full bg-purple-50 p-3 text-purple-600">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
