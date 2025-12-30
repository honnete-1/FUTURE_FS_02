import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-gray-900 text-white rounded-3xl mx-4 mt-4">
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16 sm:py-24 lg:py-32">
                <div className="max-w-xl">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                        Elevate Your Lifestyle
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">
                        Discover a curated collection of premium tech, fashion, and home essentials designed for modern living.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
                            Shop Now <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                            View Deals
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
