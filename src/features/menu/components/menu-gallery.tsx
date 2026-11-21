'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MenuGalleryProps {
    images: string[];
    name: string;
}

export function MenuGallery({ images, name }: MenuGalleryProps) {
    const [activeImage, setActiveImage] = useState(0);

    const hasImages = images.length > 0;
    const selectedImage = images[activeImage] ?? images[0];

    if (!hasImages) {
        return (
            <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-border bg-muted sm:aspect-square">
                <div className="text-center">
                    <span className="text-5xl">🍕</span>
                    <p className="mt-4 text-sm font-medium text-muted-foreground">
                        No image available
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-w-0 space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-sm sm:aspect-square sm:rounded-3xl">
                <Image
                    src={selectedImage}
                    alt={`${name} - Image ${activeImage + 1}`}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:bottom-5 sm:right-5">
                    {activeImage + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
                    {images.map((image, index) => (
                        <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => setActiveImage(index)}
                            aria-label={`View image ${index + 1}`}
                            aria-pressed={activeImage === index}
                            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                                activeImage === index
                                    ? 'border-primary opacity-100'
                                    : 'border-transparent opacity-65 hover:border-primary/50 hover:opacity-100'
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`${name} thumbnail ${index + 1}`}
                                fill
                                sizes="(max-width: 640px) 25vw, 120px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
