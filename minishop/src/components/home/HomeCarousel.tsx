"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HomeCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false })
    )

    const slides = [
        {
            id: 1,
            title: "Summer Collection",
            subtitle: "Up to 50% Off",
            description: "Discover the hottest trends for the season.",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=3270&auto=format&fit=crop",
            cta: "Shop Now",
            link: "/?category=clothing"
        },
        {
            id: 2,
            title: "New Electronics",
            subtitle: "Latest Gadgets",
            description: "Upgrade your tech game with our new arrivals.",
            image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=3270&auto=format&fit=crop",
            cta: "View Deals",
            link: "/?category=electronics"
        },
        {
            id: 3,
            title: "Premium Jewelry",
            subtitle: "Elegant & Timeless",
            description: "Shine bright with our exclusive jewelry collection.",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=3270&auto=format&fit=crop",
            cta: "Explore",
            link: "/?category=jewelery"
        },
    ]

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full relative"
        >
            <CarouselContent>
                {slides.map((slide) => (
                    <CarouselItem key={slide.id}>
                        <div className="relative h-[500px] w-full overflow-hidden">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover brightness-75"
                                priority={slide.id === 1}
                            />
                            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 text-white bg-gradient-to-r from-black/60 to-transparent">
                                <h3 className="text-xl font-medium mb-2 text-primary-Foreground/90">{slide.subtitle}</h3>
                                <h1 className="text-5xl md:text-7xl font-bold mb-4">{slide.title}</h1>
                                <p className="text-lg md:text-xl mb-8 max-w-lg text-gray-200">{slide.description}</p>
                                <Button size="lg" className="w-fit text-lg h-12 px-8" asChild>
                                    <Link href={slide.link}>{slide.cta}</Link>
                                </Button>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/30 border-none text-white hidden md:flex" />
            <CarouselNext className="right-4 bg-white/10 hover:bg-white/30 border-none text-white hidden md:flex" />
        </Carousel>
    )
}
