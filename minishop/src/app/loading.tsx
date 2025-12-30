import { ProductSkeleton } from "@/components/product/ProductSkeleton";
import { ProductToolbar } from "@/components/product/ProductToolbar";

export default function Loading() {
    return (
        <div className="flex flex-col gap-8 -mt-8">
            {/* Hero Placeholder */}
            <div className="-mx-4 h-[400px] bg-slate-100 animate-pulse" />

            {/* Toolbar Placeholder */}
            <div className="pointer-events-none opacity-50">
                <ProductToolbar />
            </div>

            <main className="container mx-auto px-4">
                <div className="mb-6 flex items-center justify-between">
                    <div className="h-8 w-48 bg-slate-100 rounded animate-pulse" />
                    <div className="h-5 w-24 bg-slate-100 rounded animate-pulse" />
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            </main>
        </div>
    );
}
