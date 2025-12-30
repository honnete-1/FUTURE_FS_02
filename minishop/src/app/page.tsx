import { Suspense } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data";
import { Hero } from "@/components/layout/Hero";
import { ProductToolbar } from "@/components/product/ProductToolbar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;

  const category = typeof params.category === 'string' ? params.category : undefined;
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : undefined;
  const minPrice = typeof params.minPrice === 'string' ? Number(params.minPrice) : 0;
  const maxPrice = typeof params.maxPrice === 'string' ? Number(params.maxPrice) : 500;
  const brands = typeof params.brands === 'string' ? params.brands.split(',') : [];
  const sort = typeof params.sort === 'string' ? params.sort : undefined;

  let filteredProducts = products.filter((product) => {
    // 1. Search Query
    if (query && !product.title.toLowerCase().includes(query) && !product.description.toLowerCase().includes(query)) {
      return false;
    }

    // 2. Category
    if (category && product.category.toLowerCase() !== category) {
      return false;
    }

    // 3. Price Range
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    // 4. Brands
    if (brands.length > 0 && (!product.brand || !brands.includes(product.brand))) {
      return false;
    }

    return true;
  });

  if (sort) {
    if (sort === "price_asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "rating_desc") {
      filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }

  return (
    <div className="flex flex-col gap-8 -mt-8">
      {/* Full Width Hero */}
      {!query && !category && (
        <div className="-mx-4">
          <Hero />
        </div>
      )}

      {/* Sticky Toolbar */}
      <div className="sticky top-16 z-30 w-full bg-white/80 backdrop-blur-md border-b">
        <Suspense fallback={<div className="h-16" />}>
          <ProductToolbar />
        </Suspense>
      </div>

      <main className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {query ? `Search results for "${query}"` : category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "Latest Arrivals"}
          </h2>
          <span className="text-sm font-medium text-gray-500">{filteredProducts.length} Products</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
