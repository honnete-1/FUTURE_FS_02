import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">MiniCommerce</h3>
                        <p className="text-sm text-gray-500">
                            Your trusted platform for premium tech and lifestyle products.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-primary">All Products</Link></li>
                            <li><Link href="/?sort=rating_desc" className="hover:text-primary">Best Sellers</Link></li>
                            <li><Link href="/?category=electronics" className="hover:text-primary">Deals</Link></li>
                            <li><Link href="/?category=jewelery" className="hover:text-primary">Jewelery</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Categories</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/?category=men's clothing" className="hover:text-primary">Men's Fashion</Link></li>
                            <li><Link href="/?category=women's clothing" className="hover:text-primary">Women's Fashion</Link></li>
                            <li><Link href="/?category=home" className="hover:text-primary">Home & Living</Link></li>
                            <li><Link href="/?category=sport" className="hover:text-primary">Sports</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a></li>
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} MiniCommerce. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
